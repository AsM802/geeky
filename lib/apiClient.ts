const API_URL = process.env.NEXT_PUBLIC_API_URL || '';


let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((entry) => {
    if (error) {
      entry.reject(error);
    } else {
      entry.resolve(token);
    }
  });
  failedQueue = [];
};

const dispatchLoadingEvent = (delta: number) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('geeky-api-loading', { detail: { delta } }));
  }
};

export async function fetchClient(endpoint: string, options: RequestInit & { skipAuthRedirect?: boolean } = {}) {
  const { skipAuthRedirect, ...fetchOptions } = options;
  let accessToken = '';

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('geeky_access_token') || '';
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: 'Bearer ' + accessToken } : {}),
    ...fetchOptions.headers,
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  const executeFetch = async () => {
    dispatchLoadingEvent(1);
    try {
      return await fetch(`${API_URL}${endpoint}`, config);
    } finally {
      dispatchLoadingEvent(-1);
    }
  };
  const response = await executeFetch();

  if (response.status !== 401) {
    return response;
  }

  if (typeof window === 'undefined' || skipAuthRedirect) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('geeky_session');
      localStorage.removeItem('geeky_access_token');
      localStorage.removeItem('geeky_refresh_token');
    }
    return response;
  }

  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('geeky_refresh_token') : '';
  if (!refreshToken) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('geeky_access_token');
      localStorage.removeItem('geeky_refresh_token');
      localStorage.removeItem('geeky_session');
      window.location.href = '/login';
    }
    return response;
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((token) => {
      if (!token) {
        throw new Error('Token refresh failed');
      }
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token,
      };
      return fetch(`${API_URL}${endpoint}`, config);
    });
  }

  isRefreshing = true;

  try {
    const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + refreshToken,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshRes.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await refreshRes.json();
    const newAccessToken = data.accessToken || data.access_token || data.token;
    const newRefreshToken = data.refreshToken || data.refresh_token || refreshToken;
    if (!newAccessToken) {
      throw new Error('Refresh response missing access token');
    }

    localStorage.setItem('geeky_access_token', newAccessToken);
    localStorage.setItem('geeky_refresh_token', newRefreshToken);
    processQueue(null, newAccessToken);

    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + newAccessToken,
    };

    return fetch(`${API_URL}${endpoint}`, config);
  } catch (error) {
    processQueue(error, null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('geeky_access_token');
      localStorage.removeItem('geeky_refresh_token');
      localStorage.removeItem('geeky_session');
      window.location.href = '/login';
    }
    return response;
  } finally {
    isRefreshing = false;
  }
}
