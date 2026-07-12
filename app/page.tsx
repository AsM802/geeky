'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const [user, setUser] = useState<{ fullName: string; username: string; level: number; xp: number; streak: number } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('geeky_session');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (_) {}
      }
    }
  }, []);

  const scholarName = user ? user.fullName.split(' ')[0] : 'Arjun';
  const streakDays = user ? user.streak : 14;
  const currentXp = user ? user.xp : 8420;
  const currentLvl = user ? user.level : 14;

  const activeSubjects = [
    { name: 'Philosophy', category: 'Humanities', progress: 68, activeDays: '8d', style: 'border-[#D4AF37]/40 bg-amber-500/5', badgeColor: 'bg-amber-500/20 text-[#D4AF37]' },
    { name: 'Physics', category: 'Sciences', progress: 45, activeDays: '1d', style: 'border-cyan-500/30 bg-cyan-500/5', badgeColor: 'bg-cyan-500/20 text-cyan-400' },
    { name: 'Neuroscience', category: 'Life Sciences', progress: 82, activeDays: '14d', style: 'border-emerald-500/30 bg-emerald-500/5', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { name: 'Economics', category: 'Social Sciences', progress: 51, activeDays: '2d', style: 'border-purple-500/30 bg-purple-500/5', badgeColor: 'bg-purple-500/20 text-purple-400' },
    { name: 'Chemistry', category: 'Sciences', progress: 29, activeDays: '4d', style: 'border-pink-500/30 bg-pink-500/5', badgeColor: 'bg-pink-500/20 text-pink-400' },
    { name: 'Computer Science', category: 'Engineering', progress: 73, activeDays: '5d', style: 'border-blue-500/30 bg-blue-500/5', badgeColor: 'bg-blue-500/20 text-blue-400' },
    { name: 'Literature', category: 'Humanities', progress: 38, activeDays: '5d', style: 'border-indigo-500/30 bg-indigo-500/5', badgeColor: 'bg-indigo-500/20 text-indigo-400' },
    { name: 'Political Science', category: 'Social Sciences', progress: 62, activeDays: '6d', style: 'border-teal-500/30 bg-teal-500/5', badgeColor: 'bg-teal-500/20 text-teal-400' }
  ];

  const achievements = [
    { title: 'First Steps', xp: '+50 XP', desc: 'Completed first module', unlocked: true, icon: '🌱' },
    { title: 'Week Warrior', xp: '+150 XP', desc: 'Maintained a 7-day streak', unlocked: true, icon: '🔥' },
    { title: 'Debater', xp: '+100 XP', desc: 'Participated in a live debate', unlocked: true, icon: '💬' },
    { title: 'Perfect Score', xp: '+250 XP', desc: 'Aced 3 quizzes in a row', unlocked: true, icon: '💯' },
    { title: 'Polymath', xp: '+200 XP', desc: 'Unlocked modules in 5 subjects', unlocked: true, icon: '🎓' },
    { title: 'Iron Will', xp: '+500 XP', desc: 'Read 20 academic papers', unlocked: false, icon: '🛡️' },
    { title: 'Subject Master', xp: '+400 XP', desc: '100% completion in one subject', unlocked: false, icon: '👑' },
    { title: 'Elite Scholar', xp: '+1000 XP', desc: 'Reached Level 50', unlocked: false, icon: '🏛️' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Alert Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#16213E] to-[#0F3460] border border-[#B8860B]/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#E8DCC8]">Good afternoon, {scholarName} 👋</h1>
            <p className="text-sm text-[#A0B2C6] mt-1">You have a <strong className="text-orange-400 font-semibold">{streakDays}-day streak</strong> - keep it going today.</p>
          </div>
          <span className="text-[10px] text-[#6B7C93] uppercase tracking-widest font-mono">● Last synced just now</span>
        </div>

        {/* Level & XP Progression */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-3">
            <div className="flex justify-between items-center text-xs font-semibold text-white mb-2">
              <span className="uppercase tracking-wider text-[#D4AF37]">EXPERIENCE POINTS</span>
              <span className="font-mono text-[#D4AF37]">{currentXp.toLocaleString()} XP</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
              <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" style={{ width: `${(currentXp % 10000) / 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-[#A0B2C6]">
              <span>Progress to Level {currentLvl + 1}</span>
              <span>{(currentXp % 10000).toLocaleString()} / 10,000</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center font-bold text-lg text-[#D4AF37] font-mono shadow-[0_0_12px_rgba(212,175,55,0.3)]">
              {currentLvl}
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Scholar Level</p>
              <p className="text-[9px] text-[#A0B2C6] mt-0.5">⚡ +340 XP this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Metrics Row (Rank / Streak / Cards / Accuracy / Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Stats Grid (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Global Rank Card */}
            <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex flex-col justify-between relative group hover:border-[#D4AF37]/50 transition-all">
              <div className="text-xl">🏆</div>
              <div className="mt-4">
                <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">GLOBAL RANK</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">#1,247</span>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">▲ +183 places today</span>
              </div>
            </div>

            {/* Streak Card */}
            <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex flex-col justify-between relative group hover:border-orange-500/50 transition-all">
              <div className="text-xl">🔥</div>
              <div className="mt-4">
                <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">CURRENT STREAK</span>
                <span className="text-2xl font-bold font-mono text-orange-400 mt-1 block">{streakDays} days</span>
                <span className="text-[10px] text-red-400 font-semibold block mt-1">⚠️ At risk today</span>
              </div>
            </div>

            {/* Quiz Accuracy Card */}
            <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex flex-col justify-between relative group hover:border-cyan-500/50 transition-all">
              <div className="text-xl">🎯</div>
              <div className="mt-4">
                <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">QUIZ ACCURACY</span>
                <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">78.4%</span>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">▲ +1.2% this week</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cards Reviewed */}
            <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">CARDS REVIEWED</span>
                <span className="text-2xl font-bold font-mono text-white mt-1">1,842</span>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">▲ +124 today</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#D4AF37] font-bold block">342</span>
                <span className="text-[9px] text-[#A0B2C6] uppercase">due reviews</span>
              </div>
            </div>

            {/* Debate Contributions */}
            <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">DEBATE CONTRIBUTIONS</span>
                <span className="text-2xl font-bold font-mono text-white mt-1">38</span>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-1">▲ +5 this week</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-400 font-bold block">3</span>
                <span className="text-[9px] text-[#A0B2C6] uppercase">active arenas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Weekly Study & Recent activity (1/3 Width) */}
        <div className="bg-[#16213E]/80 border border-white/10 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Weekly Study Activity</h3>
            {/* Bar Chart Mock */}
            <div className="flex items-end justify-between h-24 gap-2 pt-2">
              {[
                { day: 'Mon', hours: 40 },
                { day: 'Tue', hours: 65 },
                { day: 'Wed', hours: 25 },
                { day: 'Thu', hours: 85 },
                { day: 'Fri', hours: 50 },
                { day: 'Sat', hours: 90 },
                { day: 'Sun', hours: 10 }
              ].map((b, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full bg-[#0F3460] rounded hover:bg-[#D4AF37] transition-all relative group" style={{ height: `${b.hours}%` }}>
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-[9px] text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{(b.hours/10).toFixed(1)}h</span>
                  </div>
                  <span className="text-[9px] text-[#A0B2C6]">{b.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block">RECENT ACTIVITY</span>
            <div className="flex gap-2.5 items-start mt-2">
              <span className="text-base mt-0.5">📝</span>
              <div>
                <p className="text-xs font-medium text-white">Scored 90% on Epistemology Quiz</p>
                <p className="text-[9px] text-[#A0B2C6]">Philosophy · 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Subjects Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Active Subjects</h3>
          <Link href="/subject-learning-screen" className="text-xs text-[#D4AF37] hover:underline font-semibold">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activeSubjects.slice(0, 4).map((sub, idx) => (
            <Link key={idx} href={`/subject-learning-screen?s=${sub.name.toLowerCase() === 'computer science' ? 'cs' : sub.name.toLowerCase()}`}>
              <div className={`p-4 border rounded-xl shadow hover:border-[#D4AF37] transition-all relative flex flex-col justify-between h-32 ${sub.style}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${sub.badgeColor}`}>
                      {sub.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-2 leading-tight">{sub.name}</h4>
                  </div>
                  <span className="text-xs text-[#6B7C93]">🔥 {sub.activeDays}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[9px] text-[#A0B2C6] mb-1 font-mono">
                    <span>Completion</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37]" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Achievements Shelf */}
      <div className="bg-[#16213E]/60 border border-white/10 p-5 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Achievements Shelf</h3>
          <span className="text-[10px] text-[#A0B2C6] font-mono">5 / 8 unlocked</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-8 gap-3">
          {achievements.map((ac, idx) => (
            <div key={idx} className={`p-3 rounded-lg border border-black/40 text-center flex flex-col justify-between items-center h-28 relative group transition-all ${
              ac.unlocked ? 'bg-[#0F3460]/40 border-[#B8860B]/20' : 'bg-black/30 opacity-40'
            }`}>
              <div className="text-2xl mt-1">{ac.icon}</div>
              <div>
                <h5 className="text-[10px] font-bold text-white truncate w-full">{ac.title}</h5>
                <span className="text-[8px] font-bold text-[#D4AF37] block mt-0.5">{ac.xp}</span>
              </div>
              
              {/* Hover description popup tooltip */}
              <div className="absolute bottom-full mb-2 bg-black text-[9px] text-[#A0B2C6] p-2 rounded shadow-xl w-32 left-1/2 transform -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 leading-tight">
                {ac.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
