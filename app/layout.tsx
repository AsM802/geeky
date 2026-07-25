'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { fetchClient } from '../lib/apiClient';
import GeekyLogo from '../components/GeekyLogo';
import { showToast } from '../lib/toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [user, setUser] = useState<{ fullName: string; username: string; level: number; xp: number; streak: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; variant: 'info' | 'success' | 'warning' | 'error' } | null>(null);
  const [activeApiRequests, setActiveApiRequests] = useState(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const isLoading = activeApiRequests > 0 || routeLoading;
  const toastTimerRef = React.useRef<number | null>(null);

  const loadSession = async () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('geeky_session');
      const accessToken = localStorage.getItem('geeky_access_token');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (_) {}
      } else {
        setUser(null);
      }

      if (!accessToken) {
        return;
      }

      // Fetch fresh data from API silently
      try {
        const res = await fetchClient('/api/auth/me', { skipAuthRedirect: true });
        if (res.ok) {
          const freshData = await res.json();
          const userObj = freshData.user || freshData;
          setUser(userObj);
          localStorage.setItem('geeky_session', JSON.stringify(userObj));
        } else {
          setUser(null);
          localStorage.removeItem('geeky_session');
        }
      } catch (e) {
        setUser(null);
        localStorage.removeItem('geeky_session');
      }
    }
  };

  const applyTheme = (themeName: string) => {
    const root = document.documentElement;
    const themes: Record<string, { primary: string; secondary: string; accent: string; glow: string }> = {
      hermes: { primary: '#181613', secondary: '#25221E', accent: '#CD7F32', glow: 'rgba(205, 127, 50, 0.4)' },
      hestia: { primary: '#1D120D', secondary: '#2C1B14', accent: '#D35400', glow: 'rgba(211, 84, 0, 0.4)' },
      ares: { primary: '#1B0808', secondary: '#2C1010', accent: '#E74C3C', glow: 'rgba(231, 76, 60, 0.4)' },
      athena: { primary: '#0E1B15', secondary: '#1A2F24', accent: '#D4AF37', glow: 'rgba(212, 175, 55, 0.4)' },
      apollo: { primary: '#211D12', secondary: '#332D1B', accent: '#F1C40F', glow: 'rgba(241, 196, 15, 0.4)' },
      zeus: { primary: '#0A1220', secondary: '#14223A', accent: '#0083B0', glow: 'rgba(0, 131, 176, 0.4)' }
    };
    const active = themes[themeName] || themes['athena'];
    root.style.setProperty('--primary-theme', active.primary);
    root.style.setProperty('--secondary-theme', active.secondary);
    root.style.setProperty('--accent-theme', active.accent);
    root.style.setProperty('--glow-theme', active.glow);
  };

  React.useEffect(() => {
    loadSession();
    const savedTheme = localStorage.getItem('geeky_god_theme') || 'athena';
    applyTheme(savedTheme);

    const handleThemeChange = () => {
      const activeTheme = localStorage.getItem('geeky_god_theme') || 'athena';
      applyTheme(activeTheme);
    };

    window.addEventListener('storage', loadSession);
    window.addEventListener('geeky_theme_update', handleThemeChange);
    return () => {
      window.removeEventListener('storage', loadSession);
      window.removeEventListener('geeky_theme_update', handleThemeChange);
    };
  }, [pathname]);

  React.useEffect(() => {
    const handleRouteClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const anchor = target.closest('a');
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (targetAttr && targetAttr !== '_self') {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          return;
        }
      } catch {
        return;
      }

      setRouteLoading(true);
    };

    window.addEventListener('click', handleRouteClick, true);
    return () => window.removeEventListener('click', handleRouteClick, true);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  React.useEffect(() => {
    if (!routeLoading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (window.location.href !== currentUrl) {
        setCurrentUrl(window.location.href);
        setRouteLoading(false);
      }
    }, 120);

    const timeoutId = window.setTimeout(() => {
      setRouteLoading(false);
    }, 2500);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [routeLoading, currentUrl]);

  React.useEffect(() => {
    const handleApiLoading = (event: Event) => {
      const customEvent = event as CustomEvent<{ delta: number }>;
      const delta = customEvent.detail?.delta;
      if (typeof delta !== 'number') {
        return;
      }
      setActiveApiRequests((current) => Math.max(0, current + delta));
    };

    window.addEventListener('geeky-api-loading', handleApiLoading as EventListener);
    return () => {
      window.removeEventListener('geeky-api-loading', handleApiLoading as EventListener);
    };
  }, []);

  React.useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string; variant?: 'info' | 'success' | 'warning' | 'error' }>;
      const message = customEvent.detail?.message;

      if (!message) {
        return;
      }

      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }

      setToast({ message, variant: customEvent.detail?.variant || 'info' });
      toastTimerRef.current = window.setTimeout(() => {
        setToast(null);
        toastTimerRef.current = null;
      }, 3500);
    };

    window.addEventListener('geeky-toast', handleToastEvent as EventListener);
    return () => {
      window.removeEventListener('geeky-toast', handleToastEvent as EventListener);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('geeky_session');
    localStorage.removeItem('geeky_access_token');
    localStorage.removeItem('geeky_refresh_token');
    setUser(null);
    showToast('You have been signed out. Redirecting home...', 'info');
    router.push('/');
  };

  const subjectsList = [
    { name: 'Philosophy', slug: 'philosophy', icon: '🏛️' },
    { name: 'Physics', slug: 'physics', icon: '🌌' },
    { name: 'Neuroscience', slug: 'neuroscience', icon: '🧠' },
    { name: 'Economics', slug: 'economics', icon: '📈' },
    { name: 'Chemistry', slug: 'chemistry', icon: '🧪' },
    { name: 'Comp. Science', slug: 'cs', icon: '💻' },
    { name: 'Literature', slug: 'literature', icon: '📚' },
    { name: 'Politics', slug: 'politics', icon: '🌐' },
    { name: 'Artificial Intel.', slug: 'ai', icon: '🤖', badge: 'New' },
    { name: 'Psychology', slug: 'psychology', icon: '🔬' },
  ];

  const toastStyles: Record<'info' | 'success' | 'warning' | 'error', string> = {
    info: 'border-[#D4AF37]/40 bg-[#16213E]/95 text-[#F8EFCF]',
    success: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100',
    warning: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
    error: 'border-red-400/40 bg-red-500/10 text-red-100',
  };

  const toastIcons: Record<'info' | 'success' | 'warning' | 'error', string> = {
    info: '✨',
    success: '✓',
    warning: '⚠',
    error: '✕',
  };

  return (
    <html lang="en" className="dark">
      <body className="h-screen bg-black text-[#E8DCC8] flex overflow-hidden font-body">
        <div className="animated-bg" />
        {isLoading && (
          <>
            <div className="fixed inset-x-0 top-0 h-1 z-[70] overflow-hidden">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B]" />
            </div>
            <div className="fixed inset-0 z-[65] pointer-events-none flex items-start justify-center px-4 pt-24">
              <div className="rounded-full bg-[#0F3460]/90 border border-[#D4AF37]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#D4AF37] shadow-2xl backdrop-blur-sm">
                Loading…
              </div>
            </div>
          </>
        )}
        {toast && (
          <div className="fixed right-4 top-4 z-[60] max-w-sm">
            <div className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${toastStyles[toast.variant]}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-sm">{toastIcons[toast.variant]}</div>
                <div>
                  <p className="text-sm font-semibold">{toast.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Persistent Sidebar Navigation (only shown to authenticated users) */}
        {user ? (
          <aside className={`relative flex flex-col bg-[#16213E] border-r border-[#B8860B]/30 flex-shrink-0 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}>
            {/* Brand Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/10 h-16">
              {!sidebarCollapsed ? (
                <>
                  <Link href="/">
                    <GeekyLogo collapsed={false} />
                  </Link>
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="w-6 h-6 rounded border border-[#B8860B]/40 text-[#D4AF37] hover:bg-white/5 flex items-center justify-center transition-colors text-xs"
                    title="Collapse Sidebar"
                  >
                    ←
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="w-full h-full flex items-center justify-center text-[#D4AF37] hover:bg-white/5 transition-colors text-lg"
                  title="Expand Sidebar"
                >
                  <GeekyLogo collapsed={true} />
                </button>
              )}
            </div>

            {/* Sidebar Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
              {/* Main Navigation */}
              <div>
                {!sidebarCollapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/70 px-2 mb-2">Main</p>
                )}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      pathname === '/' ? 'bg-[#0F3460] text-[#D4AF37] border border-[#B8860B]/40' : 'text-[#A0B2C6] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">📊</span>
                    {!sidebarCollapsed && <span>Dashboard</span>}
                  </Link>

                  {user && (
                    <>
                      <Link
                        href="/subject-learning-screen"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          pathname === '/subject-learning-screen' ? 'bg-[#0F3460] text-[#D4AF37] border border-[#B8860B]/40' : 'text-[#A0B2C6] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">📜</span>
                        {!sidebarCollapsed && <span>Subjects</span>}
                      </Link>
 
                      <Link
                        href="/debate-discussions"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          pathname === '/debate-discussions' ? 'bg-[#0F3460] text-[#D4AF37] border border-[#B8860B]/40' : 'text-[#A0B2C6] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">💬</span>
                        {!sidebarCollapsed && (
                          <div className="flex-1 flex items-center justify-between">
                            <span>Debate & Discussions</span>
                            <span className="text-[10px] font-bold bg-[#B8860B]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">12</span>
                          </div>
                        )}
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {user && (
                <div>
                  {!sidebarCollapsed && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/70 px-2 mb-2">Subjects</p>
                  )}
                  <div className="space-y-1">
                    {subjectsList.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/subject-learning-screen?s=${sub.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#A0B2C6] hover:text-white hover:bg-white/5 transition-all"
                      >
                        <span>{sub.icon}</span>
                        {!sidebarCollapsed && (
                          <div className="flex-1 flex items-center justify-between">
                            <span>{sub.name}</span>
                            {sub.badge && (
                              <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                                {sub.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Links */}
              <div>
                {!sidebarCollapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/70 px-2 mb-2">Account</p>
                )}
                <div className="space-y-1 text-xs text-[#A0B2C6]">
                    {user && (
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer block">
                        <span>🏆</span> {!sidebarCollapsed && <span>Leaderboard</span>}
                      </Link>
                    )}
                    {!user && (
                      <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer block">
                        <span>🔑</span> {!sidebarCollapsed && <span>Sign In</span>}
                      </Link>
                    )}
                </div>
              </div>
            </div>

            {/* User Profile Footer */}
            {!sidebarCollapsed && (
              user ? (
                <Link href="/profile" className="p-3 border-t border-white/10 bg-[#0F3460]/40 flex items-center gap-3 hover:bg-[#0F3460] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4AF37] flex items-center justify-center font-bold text-xs text-[#1A1A2E]">
                    {user.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
                    <p className="text-[10px] text-[#A0B2C6] truncate">Lvl {user.level} · {user.xp.toLocaleString()} XP</p>
                  </div>
                  <span className="text-orange-500 text-sm">🔥</span>
                </Link>
              ) : (
                <Link href="/login" className="p-3 border-t border-white/10 bg-[#0F3460]/20 flex items-center justify-center gap-2 hover:bg-[#0F3460]/40 transition-colors text-xs text-[#D4AF37] font-semibold">
                  <span>🔑</span> Log In to Save Progress
                </Link>
              )
            )}
          </aside>
        ) : null}

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header Bar */}
          <header className="h-14 bg-[#16213E] border-b border-[#B8860B]/30 flex items-center justify-between px-6 gap-4 flex-shrink-0 z-10">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 text-sm text-[#A0B2C6] bg-[#0F3460]/50 border border-white/10 px-3 py-1.5 rounded-lg">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Search subjects, modules, research papers..."
                  className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-[#6B7C93]"
                />
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono">⌘K</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#0F3460] border border-[#B8860B]/40 rounded-lg px-3 py-1.5">
                <span className="text-xs text-[#D4AF37]">⚡</span>
                <span className="text-xs font-bold font-mono text-[#D4AF37]">
                  {user ? `${user.xp.toLocaleString()} XP` : '0 XP'}
                </span>
              </div>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-1.5 text-xs text-[#D4AF37] border border-[#B8860B]/40 rounded-lg hover:bg-[#B8860B]/10 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="px-3 py-1.5 text-xs bg-[#B8860B] text-[#1A1A2E] font-bold rounded-lg hover:bg-[#D4AF37] transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* View Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
