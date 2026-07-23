const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.geekyedu.in';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  let accessToken = '';
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('geeky_access_token') || '';
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401) {
    // Handle Token Refresh
    if (typeof window === 'undefined') return response; // Server-side, just return

    const refreshToken = localStorage.getItem('geeky_refresh_token');
    if (!refreshToken) {
      localStorage.removeItem('geeky_access_token');
      localStorage.removeItem('geeky_refresh_token');
      localStorage.removeItem('geeky_session');
      window.location.href = '/login';
      return response;
    }

    if (isRefreshing) {
      // Queue the request until refresh is done
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
          return fetch(`${API_URL}${endpoint}`, config);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`, // API expects it as Bearer
        },
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        // Assuming the API returns { access_token, refresh_token } or similar
        const newAccessToken = data.accessToken || data.access_token || data.token;
        const newRefreshToken = data.refreshToken || data.refresh_token || refreshToken;
        
        localStorage.setItem('geeky_access_token', newAccessToken);
        localStorage.setItem('geeky_refresh_token', newRefreshToken);
        
        processQueue(null, newAccessToken);
        
        config.headers = { ...config.headers, Authorization: `Bearer ${newAccessToken}` };
        return fetch(`${API_URL}${endpoint}`, config);
      } else {
        throw new Error('Refresh failed');
      }
    } catch (error) {
      processQueue(error, null);
      localStorage.removeItem('geeky_access_token');
      localStorage.removeItem('geeky_refresh_token');
      localStorage.removeItem('geeky_session');
      window.location.href = '/login';
      return response; // Return the 401
    } finally {
      isRefreshing = false;
    }
  }

  return response;
}
