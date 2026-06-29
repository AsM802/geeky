'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created successfully!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#16213E] border border-[#B8860B]/40 p-8 rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#0F3460] border border-[#B8860B] flex items-center justify-center mx-auto text-3xl">
            📜
          </div>
          <h2 className="font-heading text-3xl font-bold text-white">Join Geeky Gymnasium</h2>
          <p className="text-xs text-[#A0B2C6]">Begin your credential-blind university learning journey today.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Arjun Kapoor"
              className="w-full px-4 py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Public Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="scholar_arj"
              className="w-full px-4 py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="arjun@example.com"
              className="w-full px-4 py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Create Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 bg-[#0F3460] border border-white/10 rounded-lg text-white text-sm placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold rounded-lg hover:brightness-110 transition-all text-sm uppercase tracking-wider shadow-lg"
          >
            Create Scholarly Codex
          </button>
        </form>

        <p className="text-center text-xs text-[#A0B2C6] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D4AF37] font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
