'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logged in successfully as Scholar!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#16213E] border border-[#B8860B]/40 p-8 rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#0F3460] border border-[#B8860B] flex items-center justify-center mx-auto text-3xl">
            🏛️
          </div>
          <h2 className="font-heading text-3xl font-bold text-white">Welcome Back to Geeky</h2>
          <p className="text-xs text-[#A0B2C6]">Enter your scholarly credentials to access your Codex and active streaks.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                Email Address or Username
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@geeky.edu or @hypatia"
                className="w-full px-4 py-3 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  Password
                </label>
                <a href="#" className="text-xs text-[#A0B2C6] hover:text-[#D4AF37]">Forgot Password?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold rounded-lg hover:brightness-110 transition-all text-sm uppercase tracking-wider shadow-lg"
          >
            Sign In to Gymnasium
          </button>
        </form>

        {/* OAuth Social Login */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-4">
          <span className="text-xs text-[#6B7C93] uppercase tracking-widest block">Or Continue With</span>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-xs font-medium text-white hover:border-[#B8860B] transition-all flex items-center justify-center gap-2">
              <span>🌐</span> Google
            </button>
            <button className="py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-xs font-medium text-white hover:border-[#B8860B] transition-all flex items-center justify-center gap-2">
              <span>🍎</span> Apple
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#A0B2C6] mt-6">
          Not a member yet?{' '}
          <Link href="/register" className="text-[#D4AF37] font-bold hover:underline">
            Register for an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
