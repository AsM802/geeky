'use client';

import React from 'react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="relative pb-3 border-b border-white/10">
        <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">Scholarly Profile</h1>
        <p className="text-[#A0B2C6] mt-1">Your personal Codex recording intellectual milestones, XP progression, and academic rank.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      {/* Profile Banner */}
      <div className="bg-gradient-to-br from-[#16213E] to-[#0F3460] border border-[#B8860B]/40 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="w-24 h-24 rounded-full bg-[#B8860B]/20 border-4 border-[#D4AF37] flex items-center justify-center text-5xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          🏛️
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="font-heading text-3xl font-bold text-[#E8DCC8]">Scholar Agniv</h2>
          <span className="inline-block px-3 py-1 bg-[#B8860B]/20 border border-[#B8860B] text-[#D4AF37] text-xs font-bold rounded-full">
            Title: Apprentice Philosopher
          </span>
          <div className="space-y-1 pt-2 max-w-md mx-auto md:mx-0">
            <div className="flex justify-between text-xs text-[#A0B2C6]">
              <span>Level Progress (Level 12)</span>
              <span>4,850 / 5,000 XP</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" style={{ width: '97%' }}></div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
          <span className="text-xs uppercase text-[#6B7C93] block font-semibold">Global Academic Rank</span>
          <span className="font-heading text-4xl font-bold text-[#D4AF37]">#12,344</span>
          <span className="text-xs text-[#A0B2C6] block mt-1">Top 2.5% Globally</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#16213E] border border-white/10 p-6 rounded-xl text-center space-y-1">
          <span className="font-heading text-3xl font-bold text-[#D4AF37]">14</span>
          <span className="text-xs text-[#A0B2C6] block uppercase tracking-wider">Subjects Studied</span>
        </div>
        <div className="bg-[#16213E] border border-white/10 p-6 rounded-xl text-center space-y-1">
          <span className="font-heading text-3xl font-bold text-[#D4AF37]">94%</span>
          <span className="text-xs text-[#A0B2C6] block uppercase tracking-wider">Avg Quiz Score</span>
        </div>
        <div className="bg-[#16213E] border border-white/10 p-6 rounded-xl text-center space-y-1">
          <span className="font-heading text-3xl font-bold text-[#D4AF37]">420</span>
          <span className="text-xs text-[#A0B2C6] block uppercase tracking-wider">Cards Revised</span>
        </div>
        <div className="bg-[#16213E] border border-white/10 p-6 rounded-xl text-center space-y-1">
          <span className="font-heading text-3xl font-bold text-[#D4AF37]">18</span>
          <span className="text-xs text-[#A0B2C6] block uppercase tracking-wider">Debates Won</span>
        </div>
      </div>

      {/* Achievements Shelf */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#E8DCC8]">Unlocked Achievements & Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#16213E] border border-white/10 hover:border-[#B8860B] p-6 rounded-xl text-center space-y-2 transition-all">
            <span className="text-4xl block mb-2">📜</span>
            <h4 className="font-bold text-[#E8DCC8]">First Scroll</h4>
            <p className="text-xs text-[#A0B2C6]">Completed first university-grade lesson</p>
          </div>

          <div className="bg-[#16213E] border border-white/10 hover:border-[#B8860B] p-6 rounded-xl text-center space-y-2 transition-all">
            <span className="text-4xl block mb-2">🏛️</span>
            <h4 className="font-bold text-[#E8DCC8]">Dialectician</h4>
            <p className="text-xs text-[#A0B2C6]">Won 10 community-voted academic debates</p>
          </div>

          <div className="bg-[#16213E] border border-white/10 hover:border-[#B8860B] p-6 rounded-xl text-center space-y-2 transition-all">
            <span className="text-4xl block mb-2">🌌</span>
            <h4 className="font-bold text-[#E8DCC8]">Polymath</h4>
            <p className="text-xs text-[#A0B2C6]">Studied across 5 different domain faculties</p>
          </div>

          <div className="bg-[#16213E] border border-white/10 hover:border-[#B8860B] p-6 rounded-xl text-center space-y-2 transition-all">
            <span className="text-4xl block mb-2">🔮</span>
            <h4 className="font-bold text-[#E8DCC8]">Oracle</h4>
            <p className="text-xs text-[#A0B2C6]">Achieved 100% on 10 consecutive adaptive quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
