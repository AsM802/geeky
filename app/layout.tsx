'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  return (
    <html lang="en" className="dark">
      <body className="h-screen bg-[#1A1A2E] text-[#E8DCC8] flex overflow-hidden font-body">
        {/* Persistent Sidebar Navigation */}
        <aside className={`relative flex flex-col bg-[#16213E] border-r border-[#B8860B]/30 flex-shrink-0 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#0F3460] border border-[#B8860B] flex items-center justify-center flex-shrink-0 text-xl">
              🏛️
            </div>
            {!sidebarCollapsed && (
              <span className="font-heading font-bold text-xl tracking-wider bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
                Geeky
              </span>
            )}
          </div>

          {/* Toggle Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-[#16213E] border border-[#B8860B] flex items-center justify-center z-20 text-[#D4AF37] hover:bg-[#0F3460] transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>

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
                      <span>Debate & Discuss</span>
                      <span className="text-[10px] font-bold bg-[#B8860B]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">12</span>
                    </div>
                  )}
                </Link>
              </div>
            </div>

            {/* Subjects Quick Access */}
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

            {/* Account Links */}
            <div>
              {!sidebarCollapsed && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/70 px-2 mb-2">Account</p>
              )}
              <div className="space-y-1 text-xs text-[#A0B2C6]">
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer block">
                  <span>🏆</span> {!sidebarCollapsed && <span>Leaderboard</span>}
                </Link>
                <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer block">
                  <span>🔑</span> {!sidebarCollapsed && <span>Sign In</span>}
                </Link>
              </div>
            </div>
          </div>

          {/* User Profile Footer */}
          {!sidebarCollapsed && (
            <Link href="/profile" className="p-3 border-t border-white/10 bg-[#0F3460]/40 flex items-center gap-3 hover:bg-[#0F3460] transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4AF37] flex items-center justify-center font-bold text-xs text-[#1A1A2E]">
                AK
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Arjun Kapoor</p>
                <p className="text-[10px] text-[#A0B2C6] truncate">Lvl 14 · 8,420 XP</p>
              </div>
              <span className="text-orange-500 text-sm">🔥</span>
            </Link>
          )}
        </aside>

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
                <span className="text-xs font-bold font-mono text-[#D4AF37]">8,420 XP</span>
              </div>

              <Link href="/login" className="px-3 py-1.5 text-xs text-[#D4AF37] border border-[#B8860B]/40 rounded-lg hover:bg-[#B8860B]/10 transition-colors">
                Sign In
              </Link>

              <Link href="/register" className="px-3 py-1.5 text-xs bg-[#B8860B] text-[#1A1A2E] font-bold rounded-lg hover:bg-[#D4AF37] transition-colors">
                Sign Up
              </Link>
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
