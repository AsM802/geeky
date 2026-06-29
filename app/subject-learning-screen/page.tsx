'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface ModuleItem {
  id: number;
  title: string;
  duration: string;
  progress?: number;
  status: 'completed' | 'active' | 'locked';
}

interface SubjectDetail {
  slug: string;
  title: string;
  category: string;
  badge: string;
  icon: string;
  desc: string;
  modulesCount: number;
  learners: string;
  avgRating: number;
  xpEarned: number;
  completionPct: number;
  completedModules: number;
  modules: ModuleItem[];
}

const subjectsDatabase: Record<string, SubjectDetail> = {
  philosophy: {
    slug: 'philosophy',
    title: 'Philosophy',
    category: 'Humanities · Ivy Core',
    badge: 'Debate Unlocked',
    icon: '🏛️',
    desc: 'Epistemology, metaphysics, ethics, logic, and the philosophy of mind — from Plato to Wittgenstein, grounded in Oxford and Harvard syllabi.',
    modulesCount: 24,
    learners: '14.2K',
    avgRating: 4.8,
    xpEarned: 1240,
    completionPct: 68,
    completedModules: 16,
    modules: [
      { id: 1, title: 'Introduction to Epistemology', duration: '2.5h', progress: 88, status: 'completed' },
      { id: 2, title: "Plato's Theory of Forms", duration: '3h', progress: 92, status: 'completed' },
      { id: 3, title: 'Aristotelian Logic & Categorical Syllogisms', duration: '2h', progress: 76, status: 'completed' },
      { id: 4, title: 'Descartes and Rationalism', duration: '2.5h', progress: 84, status: 'completed' },
      { id: 5, title: 'Empiricism: Hume and Locke', duration: '3h', progress: 90, status: 'completed' },
      { id: 6, title: "Kant's Critique of Pure Reason", duration: '4h', status: 'active' },
      { id: 7, title: 'Hegelian Dialectics', duration: '3h', status: 'locked' },
      { id: 8, title: 'Nietzsche and Existentialism', duration: '3.5h', status: 'locked' }
    ]
  },
  physics: {
    slug: 'physics',
    title: 'Physics & Quantum Mechanics',
    category: 'Sciences · Advanced',
    badge: 'Lab Unlocked',
    icon: '🌌',
    desc: 'Classical mechanics, thermodynamics, electromagnetism, and quantum superposition based on MIT and Caltech courses.',
    modulesCount: 20,
    learners: '18.5K',
    avgRating: 4.9,
    xpEarned: 1850,
    completionPct: 45,
    completedModules: 9,
    modules: [
      { id: 1, title: 'Newtonian Kinematics & Gravity', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'Maxwell Equations & Electromagnetism', duration: '4h', progress: 85, status: 'completed' },
      { id: 3, title: 'Quantum Superposition & Bell Inequalities', duration: '5h', status: 'active' },
      { id: 4, title: 'General Relativity & Spacetime Curvature', duration: '6h', status: 'locked' }
    ]
  }
};

function SubjectLearningContent() {
  const searchParams = useSearchParams();
  const subjectSlug = searchParams.get('s') || 'philosophy';
  const currentSubject = subjectsDatabase[subjectSlug] || subjectsDatabase['philosophy'];

  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'papers' | 'blogs' | 'quizzes' | 'flashcards'>('overview');

  return (
    <div className="space-y-6">
      {/* Hero Card Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#16213E] via-[#0F3460] to-[#1A1A2E] border border-[#B8860B]/30 rounded-2xl p-8 shadow-2xl">
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#0F3460] border border-[#B8860B] flex items-center justify-center flex-shrink-0 text-3xl">
              {currentSubject.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{currentSubject.category}</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  {currentSubject.badge}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white font-heading">{currentSubject.title}</h1>
              <p className="text-sm text-[#A0B2C6] mt-1 max-w-lg">{currentSubject.desc}</p>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="lg:ml-auto flex flex-wrap gap-3">
            <div className="bg-[#16213E]/60 border border-white/10 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] text-[#A0B2C6] block">Modules</span>
              <span className="text-sm font-bold font-mono text-[#D4AF37]">{currentSubject.modulesCount}</span>
            </div>
            <div className="bg-[#16213E]/60 border border-white/10 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] text-[#A0B2C6] block">Learners</span>
              <span className="text-sm font-bold font-mono text-cyan-400">{currentSubject.learners}</span>
            </div>
            <div className="bg-[#16213E]/60 border border-white/10 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] text-[#A0B2C6] block">Avg Rating</span>
              <span className="text-sm font-bold font-mono text-amber-400">★ {currentSubject.avgRating}</span>
            </div>
            <div className="bg-[#16213E]/60 border border-white/10 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] text-[#A0B2C6] block">XP Earned</span>
              <span className="text-sm font-bold font-mono text-[#D4AF37]">⚡ {currentSubject.xpEarned}</span>
            </div>
          </div>
        </div>

        {/* Course Completion Bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">Course Completion</span>
            <span className="text-xs font-bold font-mono text-[#D4AF37]">{currentSubject.completionPct}%</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" style={{ width: `${currentSubject.completionPct}%` }}></div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#A0B2C6]">
            <span>{currentSubject.completedModules} of {currentSubject.modulesCount} modules completed</span>
            <span>🔒 {currentSubject.modulesCount - currentSubject.completedModules} modules remaining</span>
          </div>
        </div>
      </div>

      {/* Content Tabs Navigation */}
      <div className="bg-[#16213E] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'videos', label: 'Videos', icon: '▶' },
            { id: 'papers', label: 'Research Papers', icon: '📄' },
            { id: 'blogs', label: 'Blogs & News', icon: '📰' },
            { id: 'quizzes', label: 'AI Quizzes', icon: '📝', badge: 'AI' },
            { id: 'flashcards', label: 'Flashcards', icon: '🎴' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#B8860B] text-[#D4AF37] bg-[#0F3460]/40'
                  : 'border-transparent text-[#A0B2C6] hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-bold bg-[#B8860B]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-3">Module Progress & Curriculum</h3>
              <div className="space-y-2">
                {currentSubject.modules.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${
                      m.status === 'completed'
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : m.status === 'active'
                        ? 'border-[#B8860B] bg-[#0F3460]/40'
                        : 'border-white/10 opacity-50'
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      m.status === 'completed' ? 'bg-emerald-400' : m.status === 'active' ? 'bg-[#D4AF37] animate-pulse' : 'bg-gray-500'
                    }`} />
                    <p className="text-xs font-semibold text-white flex-1">{m.title}</p>
                    <span className="text-[10px] text-[#A0B2C6]">{m.duration}</span>
                    {m.progress && (
                      <span className="text-[10px] font-bold font-mono text-emerald-400">{m.progress}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0F3460] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="h-40 bg-black/40 rounded-lg flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform">▶</div>
                <h4 className="font-bold text-white text-sm">Oxford Lecture 1: What is Epistemology?</h4>
                <p className="text-xs text-[#A0B2C6]">Curated video with AI transcripts and chapter markers.</p>
              </div>
            </div>
          )}

          {activeTab === 'papers' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#0F3460] border border-white/10 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-sm">Gettier: Is Justified True Belief Knowledge? (1963)</h4>
                  <p className="text-xs text-[#A0B2C6]">Landmark 3-page research paper challenging classical JTB definition.</p>
                </div>
                <button className="px-3 py-1.5 bg-[#B8860B] text-[#1A1A2E] text-xs font-bold rounded">Read Paper</button>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#0F3460] border border-white/10 rounded-xl">
                <h4 className="font-bold text-white text-sm">Modern Reflections on Cartesian Doubt in the AI Era</h4>
                <p className="text-xs text-[#A0B2C6] mt-1">Curated longform essay exploring simulation theory and Descartes' demon.</p>
              </div>
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="p-6 bg-[#0F3460] border border-[#B8860B]/40 rounded-xl text-center space-y-4">
              <h4 className="font-heading text-lg font-bold text-[#D4AF37]">AI Adaptive Quiz Generator</h4>
              <p className="text-xs text-[#A0B2C6]">Generate a custom 5-question test based on your recent module progress.</p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold text-xs rounded-lg">
                Start Adaptive Quiz
              </button>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="p-6 bg-[#0F3460] border border-[#B8860B]/40 rounded-xl text-center space-y-4">
              <h4 className="font-heading text-lg font-bold text-[#D4AF37]">SM-2 Spaced Repetition Decks</h4>
              <p className="text-xs text-[#A0B2C6]">12 cards ready for revision today in {currentSubject.title}.</p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold text-xs rounded-lg">
                Launch 5-Min Burst
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubjectLearningScreen() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">Loading subject data...</div>}>
      <SubjectLearningContent />
    </Suspense>
  );
}
