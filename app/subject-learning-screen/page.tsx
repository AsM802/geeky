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
  },
  neuroscience: {
    slug: 'neuroscience',
    title: 'Neuroscience',
    category: 'Sciences · Life',
    badge: 'Synapse Unlocked',
    icon: '🧠',
    desc: 'Neural pathways, cognitive behavior, synaptic plasticity, and neuroanatomy mapped to Harvard Medical School curriculum.',
    modulesCount: 18,
    learners: '12.4K',
    avgRating: 4.7,
    xpEarned: 1100,
    completionPct: 50,
    completedModules: 9,
    modules: [
      { id: 1, title: 'Neuroanatomy & Synaptic Transmission', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'Sensory Systems & Perceptual Processing', duration: '4h', status: 'active' },
      { id: 3, title: 'Synaptic Plasticity & Memory Consolidation', duration: '5h', status: 'locked' }
    ]
  },
  economics: {
    slug: 'economics',
    title: 'Economics',
    category: 'Finance · Business',
    badge: 'Trading Unlocked',
    icon: '📈',
    desc: 'Microeconomics, macroeconomics, game theory, and behavioral economics based on London School of Economics syllabus.',
    modulesCount: 22,
    learners: '16.9K',
    avgRating: 4.8,
    xpEarned: 1540,
    completionPct: 30,
    completedModules: 6,
    modules: [
      { id: 1, title: 'Supply, Demand, and Market Equilibrium', duration: '2.5h', progress: 100, status: 'completed' },
      { id: 2, title: 'Game Theory & Nash Equilibrium Paradigms', duration: '3.5h', status: 'active' },
      { id: 3, title: 'Fiscal Policy & Central Banking Systems', duration: '4h', status: 'locked' }
    ]
  },
  chemistry: {
    slug: 'chemistry',
    title: 'Chemistry',
    category: 'Sciences · Core',
    badge: 'Reactor Unlocked',
    icon: '🧪',
    desc: 'Organic synthesis, molecular thermodynamics, spectroscopy, and chemical kinetics aligned with Stanford chemistry courses.',
    modulesCount: 15,
    learners: '9.2K',
    avgRating: 4.6,
    xpEarned: 880,
    completionPct: 60,
    completedModules: 9,
    modules: [
      { id: 1, title: 'Atomic Structure & Periodic Trends', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'Thermodynamics & Reaction Kinetics', duration: '4h', status: 'active' },
      { id: 3, title: 'Spectroscopy & Structural Characterization', duration: '4.5h', status: 'locked' }
    ]
  },
  cs: {
    slug: 'cs',
    title: 'Computer Science',
    category: 'Engineering · Technology',
    badge: 'IDE Unlocked',
    icon: '💻',
    desc: 'Data structures, asymptotic complexity, compilation theory, and systems engineering modeled on Stanford CS106.',
    modulesCount: 30,
    learners: '25.4K',
    avgRating: 4.9,
    xpEarned: 2400,
    completionPct: 75,
    completedModules: 22,
    modules: [
      { id: 1, title: 'Algorithmic Complexity & Big O notation', duration: '2.5h', progress: 100, status: 'completed' },
      { id: 2, title: 'Advanced Graph Theory & Dijkstra’s Pathfinding', duration: '4h', progress: 95, status: 'completed' },
      { id: 3, title: 'Compiler Optimizations & Lexical Parsing', duration: '5h', status: 'active' }
    ]
  },
  literature: {
    slug: 'literature',
    title: 'Literature',
    category: 'Humanities · Classics',
    badge: 'Poet Unlocked',
    icon: '📚',
    desc: 'Comparative literature, Shakespearean drama, post-colonial theory, and narrative structures.',
    modulesCount: 12,
    learners: '7.8K',
    avgRating: 4.5,
    xpEarned: 740,
    completionPct: 83,
    completedModules: 10,
    modules: [
      { id: 1, title: 'Classical Epic Poetry & Homeric Metaphors', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'Shakespearean Tragedies & Dramatic Soliloquies', duration: '3.5h', status: 'active' }
    ]
  },
  politics: {
    slug: 'politics',
    title: 'Politics & Global Governance',
    category: 'Social Sciences',
    badge: 'Congress Unlocked',
    icon: '🌐',
    desc: 'Political systems, international relations, policy frameworks, and comparative geopolitics.',
    modulesCount: 16,
    learners: '11.1K',
    avgRating: 4.7,
    xpEarned: 950,
    completionPct: 25,
    completedModules: 4,
    modules: [
      { id: 1, title: 'Foundations of Modern Statehood & Sovereignty', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'International Relations Theory & Realism', duration: '3.5h', status: 'active' }
    ]
  },
  ai: {
    slug: 'ai',
    title: 'Artificial Intelligence',
    category: 'Engineering · Advanced',
    badge: 'Neural Unlocked',
    icon: '🤖',
    desc: 'Deep learning, neural network architectures, transformer models, and alignment ethics.',
    modulesCount: 25,
    learners: '31.2K',
    avgRating: 4.9,
    xpEarned: 2900,
    completionPct: 12,
    completedModules: 3,
    modules: [
      { id: 1, title: 'Linear Algebra & Optimization for ML', duration: '4h', progress: 100, status: 'completed' },
      { id: 2, title: 'Transformer Architectures & Self-Attention', duration: '6h', status: 'active' }
    ]
  },
  psychology: {
    slug: 'psychology',
    title: 'Psychology',
    category: 'Social Sciences',
    badge: 'Mind Unlocked',
    icon: '🔬',
    desc: 'Behavioral patterns, cognitive psychology, emotional regulation, and neurological anomalies.',
    modulesCount: 20,
    learners: '14.8K',
    avgRating: 4.7,
    xpEarned: 1300,
    completionPct: 40,
    completedModules: 8,
    modules: [
      { id: 1, title: 'Cognitive Biases & Heuristics of Choice', duration: '3h', progress: 100, status: 'completed' },
      { id: 2, title: 'Behavioral Conditioning & Neuroplasticity', duration: '4h', status: 'active' }
    ]
  }
};

function SubjectLearningContent() {
  const searchParams = useSearchParams();
  const subjectSlug = searchParams.get('s') || 'philosophy';
  
  // Use the local database record as the initial state so the page renders instantly
  const [currentSubject, setCurrentSubject] = useState<SubjectDetail | null>(
    subjectsDatabase[subjectSlug] || subjectsDatabase['philosophy']
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'papers' | 'blogs' | 'quizzes' | 'flashcards'>('overview');

  React.useEffect(() => {
    // Silently fetch progress updates from MongoDB in the background
    fetch(`/api/subjects?s=${subjectSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCurrentSubject(data);
        }
      })
      .catch(() => {});
  }, [subjectSlug]);

  if (!currentSubject) {
    return <div className="p-8 text-center text-red-400 font-heading">Subject not found in the archives.</div>;
  }

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

          {/* Hero Stats - Math-Proportioned Circular Medallions (Pi = 3.14 Theme) */}
          <div className="lg:ml-auto flex items-center gap-4 flex-wrap justify-center">
            {/* Medallion 1: Modules */}
            <div className="w-20 h-20 rounded-full border-2 border-black flex flex-col items-center justify-center bg-gradient-to-b from-[#16213E]/80 to-[#0F3460]/95 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group hover:border-[#D4AF37] transition-all">
              <span className="text-[9px] uppercase tracking-wider text-[#A0B2C6] font-semibold">Modules</span>
              <span className="text-sm font-bold font-mono text-[#D4AF37]">{currentSubject.modulesCount}</span>
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 pointer-events-none scale-95"></div>
            </div>
            
            {/* Medallion 2: Learners */}
            <div className="w-20 h-20 rounded-full border-2 border-black flex flex-col items-center justify-center bg-gradient-to-b from-[#16213E]/80 to-[#0F3460]/95 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group hover:border-cyan-400 transition-all">
              <span className="text-[9px] uppercase tracking-wider text-[#A0B2C6] font-semibold">Learners</span>
              <span className="text-sm font-bold font-mono text-cyan-400">{currentSubject.learners}</span>
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 pointer-events-none scale-95"></div>
            </div>

            {/* Medallion 3: Avg Rating */}
            <div className="w-20 h-20 rounded-full border-2 border-black flex flex-col items-center justify-center bg-gradient-to-b from-[#16213E]/80 to-[#0F3460]/95 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group hover:border-amber-400 transition-all">
              <span className="text-[9px] uppercase tracking-wider text-[#A0B2C6] font-semibold">Rating</span>
              <span className="text-sm font-bold font-mono text-amber-400">★{currentSubject.avgRating}</span>
              <div className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none scale-95"></div>
            </div>

            {/* Medallion 4: XP Earned */}
            <div className="w-20 h-20 rounded-full border-2 border-black flex flex-col items-center justify-center bg-gradient-to-b from-[#16213E]/80 to-[#0F3460]/95 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative group hover:border-[#D4AF37] transition-all">
              <span className="text-[9px] uppercase tracking-wider text-[#A0B2C6] font-semibold">XP</span>
              <span className="text-xs font-bold font-mono text-[#D4AF37]">⚡{currentSubject.xpEarned}</span>
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 pointer-events-none scale-95"></div>
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
            <div className="relative p-4 md:p-8 overflow-hidden bg-black/30 rounded-xl border border-white/5">
              <div className="text-center max-w-md mx-auto mb-8">
                <h3 className="text-lg font-bold text-white font-heading">Scholarly Progress Scroll</h3>
                <p className="text-xs text-[#A0B2C6]">Ascend the academic path by completing research modules.</p>
              </div>

              {/* Serpentine Timeline Container */}
              <div className="winding-path-container">
                <div className="winding-path-line"></div>

                {currentSubject.modules.map((m, idx) => {
                  const isEven = idx % 2 === 0;
                  const alignClass = isEven ? 'node-left' : 'node-right';
                  
                  return (
                    <div key={m.id} className={`path-node-wrapper ${alignClass}`}>
                      {/* Central Path Circle */}
                      <div className={`path-node-circle ${
                        m.status === 'completed'
                          ? 'node-completed'
                          : m.status === 'active'
                          ? 'node-active'
                          : 'node-locked'
                      }`}>
                        {m.status === 'completed' ? '📜' : m.status === 'active' ? '🔥' : '🔒'}
                      </div>

                      {/* Detail Card alongside */}
                      <div className={`node-details-card bg-[#16213E]/85 border border-black p-4 rounded-xl shadow-2xl hover:border-[#D4AF37] transition-all relative ${
                        isEven ? 'mr-10 md:mr-16' : 'ml-10 md:ml-16'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Scroll {idx + 1}</span>
                          <span className="text-[10px] text-[#A0B2C6] font-mono">{m.duration}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white leading-tight mb-2">{m.title}</h4>
                        
                        {m.status === 'completed' && (
                          <div className="flex items-center gap-2">
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 animate-pulse" style={{ width: `${m.progress || 100}%` }}></div>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-400 font-mono">{m.progress || 100}%</span>
                          </div>
                        )}
                        {m.status === 'active' && (
                          <span className="text-[9px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full animate-pulse inline-block">
                            Study Active
                          </span>
                        )}
                        {m.status === 'locked' && (
                          <span className="text-[9px] font-bold bg-white/5 text-gray-500 border border-white/5 px-2 py-0.5 rounded-full inline-block">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
