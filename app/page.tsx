'use client';

import React from 'react';
import Link from 'next/link';

export default function AgoraHome() {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="relative pb-3 border-b border-white/10">
        <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">The Agora</h1>
        <p className="text-[#A0B2C6] mt-1">Your central hub for daily intellectual discourse and active learning.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Idea Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#16213E] to-[#0F3460] border border-[#B8860B]/40 rounded-2xl p-8 shadow-2xl">
            <span className="inline-block px-3 py-1 bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase rounded-md mb-4">
              Today's Concept • Philosophy
            </span>
            <blockquote className="font-heading text-2xl italic text-[#E8DCC8] leading-relaxed mb-4">
              "An unexamined life is not worth living. Virtue is knowledge, and true wisdom lies in knowing that you know nothing."
            </blockquote>
            <p className="text-[#D4AF37] font-semibold text-base mb-6">
              — Socrates (The Socratic Method)
            </p>
            <Link
              href="/recall"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold rounded-lg shadow-lg hover:brightness-110 transition-all"
            >
              <span>⚡</span> Deep Dive into Ancient Philosophy
            </Link>
          </div>

          {/* Quick Navigation Quadrants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/codex" className="bg-[#16213E] border border-white/10 hover:border-[#B8860B]/50 p-6 rounded-xl hover:-translate-y-1 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📜</div>
              <h3 className="font-heading text-lg font-bold text-[#E8DCC8]">Browse Codex</h3>
              <p className="text-sm text-[#A0B2C6]">Explore 200+ university-grade curricula</p>
            </Link>

            <Link href="/recall" className="bg-[#16213E] border border-white/10 hover:border-[#B8860B]/50 p-6 rounded-xl hover:-translate-y-1 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="font-heading text-lg font-bold text-[#E8DCC8]">Quick Revise</h3>
              <p className="text-sm text-[#A0B2C6]">5-minute spaced repetition burst</p>
            </Link>

            <Link href="/debate" className="bg-[#16213E] border border-white/10 hover:border-[#B8860B]/50 p-6 rounded-xl hover:-translate-y-1 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏟️</div>
              <h3 className="font-heading text-lg font-bold text-[#E8DCC8]">Debate Arena</h3>
              <p className="text-sm text-[#A0B2C6]">Engage in structured academic discourse</p>
            </Link>

            <Link href="/profile" className="bg-[#16213E] border border-white/10 hover:border-[#B8860B]/50 p-6 rounded-xl hover:-translate-y-1 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="font-heading text-lg font-bold text-[#E8DCC8]">Scholarly Rank</h3>
              <p className="text-sm text-[#A0B2C6]">Check global position & achievements</p>
            </Link>
          </div>
        </div>

        {/* Sidebar Activity Feed (1/3 width) */}
        <div className="space-y-6">
          <div className="bg-[#16213E] border border-white/10 rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold text-[#D4AF37] pb-3 border-b border-white/10 mb-4">
              ⚡ Scholar Activity Feed
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start pb-4 border-b border-white/5">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-sm text-[#A0B2C6]">
                    <strong className="text-[#E8DCC8]">You</strong> unlocked the <em className="text-[#D4AF37]">Dialectician</em> badge in Ancient Ethics.
                  </p>
                  <span className="text-xs text-[#6B7C93] block mt-1">2 hours ago</span>
                </div>
              </div>

              <div className="flex gap-3 items-start pb-4 border-b border-white/5">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-sm text-[#A0B2C6]">
                    Streak extended to <strong className="text-orange-500">14 Days</strong>! Shield protection active.
                  </p>
                  <span className="text-xs text-[#6B7C93] block mt-1">Yesterday</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-sm text-[#A0B2C6]">
                    <strong className="text-[#E8DCC8]">Hypatia_Alexandria</strong> replied to your motion in Quantum Ethics.
                  </p>
                  <span className="text-xs text-[#6B7C93] block mt-1">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
