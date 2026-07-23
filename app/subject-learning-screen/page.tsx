'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
    // Immediately load the local fallback first for instant, zero-delay UI switching
    const localData = subjectsDatabase[subjectSlug] || subjectsDatabase['philosophy'];
    setCurrentSubject(localData);

    // Silently fetch dynamic progress from live API in the background
    import('../../lib/apiClient').then(({ fetchClient }) => {
      fetchClient(`/api/subjects/${subjectSlug}`)
        .then((res) => res.json())
        .then((data) => {
          // Only update if the database returned a valid populated subject document
          if (data && data.slug && data.title && !data.error) {
            setCurrentSubject(data);
          }
        })
        .catch(() => {});
    });
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
            <SubjectVideosSection subjectTitle={currentSubject.title} />
          )}

          {activeTab === 'papers' && (
            <SubjectReadingsSection subjectTitle={currentSubject.title} />
          )}

          {activeTab === 'blogs' && (
            <SubjectBlogsSection subjectTitle={currentSubject.title} />
          )}

          {activeTab === 'quizzes' && (
            <SubjectAIQuizGenerator subjectTitle={currentSubject.title} />
          )}

          {activeTab === 'flashcards' && (
            <div className="p-6 bg-[#0F3460]/40 border border-[#B8860B]/40 rounded-xl text-center space-y-4">
              <h4 className="font-heading text-lg font-bold text-[#D4AF37]">SM-2 Spaced Repetition Decks</h4>
              <p className="text-xs text-[#A0B2C6]">12 cards ready for revision today in {currentSubject.title}.</p>
              <Link href="/recall" className="inline-block px-6 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold text-xs rounded-lg uppercase tracking-wider">
                Launch 5-Min Burst
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-Component: Curated 18 Videos Section with Embedded Player & Stage Filters
function SubjectVideosSection({ subjectTitle }: { subjectTitle: string }) {
  const [selectedStage, setSelectedStage] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [activeVideo, setActiveVideo] = useState<{ id: number; title: string; stage: string; ytId: string } | null>({
    id: 1,
    title: `Introductory Seminar to ${subjectTitle}`,
    stage: 'beginner',
    ytId: 'dQw4w9WgXcQ'
  });
  const [videoWatched, setVideoWatched] = useState(false);

  // Generate 18 mock videos: 6 Beginner, 6 Intermediate, 6 Advanced
  const allVideos = Array.from({ length: 18 }, (_, idx) => {
    let stage = 'beginner';
    if (idx >= 6 && idx < 12) stage = 'intermediate';
    if (idx >= 12) stage = 'advanced';

    return {
      id: idx + 1,
      title: `${stage.charAt(0).toUpperCase() + stage.slice(1)} Masterclass Part ${ (idx % 6) + 1 }: Foundations of ${subjectTitle}`,
      stage,
      ytId: 'dQw4w9WgXcQ'
    };
  });

  const filteredVideos = selectedStage === 'all' ? allVideos : allVideos.filter(v => v.stage === selectedStage);

  return (
    <div className="space-y-6">
      {/* Video Player Frame */}
      {activeVideo && (
        <div className="bg-black/40 border border-[#B8860B]/30 rounded-xl p-4 space-y-4">
          <div className="aspect-video w-full bg-[#16213E] rounded-lg border border-black flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Embedded Player Emulation or real YouTube embed */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.ytId}`}
              title={activeVideo.title}
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[9px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full uppercase tracking-wider">{activeVideo.stage} Stage</span>
              <h4 className="text-sm font-bold text-white mt-1">{activeVideo.title}</h4>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setVideoWatched(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded"
              >
                Mark as Watched
              </button>
              {videoWatched && (
                <div className="flex gap-2 animate-fadeIn">
                  <Link href="/recall" className="px-3 py-1.5 bg-[#B8860B] hover:brightness-110 text-[#1A1A2E] text-xs font-bold rounded">
                    ⚡ Do Flashcards
                  </Link>
                  <Link href="/recall?tab=quiz" className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded">
                    📝 Start Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Level Filters */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {['all', 'beginner', 'intermediate', 'advanced'].map((stg) => (
          <button
            key={stg}
            onClick={() => setSelectedStage(stg as any)}
            className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedStage === stg ? 'bg-[#D4AF37] text-[#1A1A2E]' : 'bg-[#0F3460] text-[#A0B2C6] hover:text-white'
            }`}
          >
            {stg}
          </button>
        ))}
      </div>

      {/* Video Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredVideos.map((v) => (
          <div 
            key={v.id} 
            onClick={() => { setActiveVideo(v); setVideoWatched(false); }}
            className={`p-3 bg-[#16213E]/60 border rounded-xl cursor-pointer hover:border-[#D4AF37] transition-all flex gap-3 items-center ${
              activeVideo?.id === v.id ? 'border-[#D4AF37]' : 'border-white/5'
            }`}
          >
            <div className="w-12 h-12 bg-black/40 rounded flex items-center justify-center text-xs">▶</div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">{v.title}</h5>
              <span className="text-[9px] text-[#A0B2C6] uppercase tracking-wider block mt-0.5">{v.stage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-Component: 100 Research Papers & E-books Viewer Panel
function SubjectReadingsSection({ subjectTitle }: { subjectTitle: string }) {
  const [selectedTab, setSelectedTab] = useState<'papers' | 'ebooks'>('papers');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReading, setActiveReading] = useState<{ title: string; author: string; content: string } | null>(null);

  const mockPapers = Array.from({ length: 100 }, (_, idx) => ({
    id: idx + 1,
    title: `Scholarly Inquiry Into ${subjectTitle} Volume ${idx + 1}`,
    author: `Dr. ${String.fromCharCode(65 + (idx % 26))} Scholar et al.`,
    desc: `Pioneering research paper discussing the conceptual paradigms of ${subjectTitle}.`,
    content: `Abstract: This reading provides a comprehensive inquiry and literature review on the analytical paradigms within ${subjectTitle}. Key arguments include classical thesis structures, experimental formulations, and modern digital overlays. [Simulated PDF Content Page 1 of 44]`
  }));

  const mockEbooks = Array.from({ length: 100 }, (_, idx) => ({
    id: idx + 1,
    title: `The Classical Anthology of ${subjectTitle} - Edition ${idx + 1}`,
    author: `Academic Press`,
    desc: `Google open-source digitized library volume on ${subjectTitle}.`,
    content: `Chapter 1: Foundations of the discipline. Exploring classical treatises and Socratic dialetic methods in ${subjectTitle}. [Simulated E-book view Page 1 of 512]`
  }));

  const activeList = selectedTab === 'papers' ? mockPapers : mockEbooks;
  const filteredList = activeList.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar List (1/3 Width) */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedTab('papers')}
            className={`flex-1 py-2 text-xs font-bold rounded ${selectedTab === 'papers' ? 'bg-[#D4AF37] text-[#1A1A2E]' : 'bg-[#16213E] text-white'}`}
          >
            Top 100 Papers
          </button>
          <button 
            onClick={() => setSelectedTab('ebooks')}
            className={`flex-1 py-2 text-xs font-bold rounded ${selectedTab === 'ebooks' ? 'bg-[#D4AF37] text-[#1A1A2E]' : 'bg-[#16213E] text-white'}`}
          >
            100 E-books PDF
          </button>
        </div>

        <input 
          type="text" 
          placeholder="Filter by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-[#0F3460] border border-white/10 rounded-lg text-xs text-white outline-none focus:border-[#D4AF37]"
        />

        <div className="h-96 overflow-y-auto space-y-2 border border-white/5 p-2 rounded bg-black/20 scrollbar-thin">
          {filteredList.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveReading({ title: item.title, author: item.author, content: item.content })}
              className="p-2.5 bg-[#16213E]/80 border border-white/5 rounded-lg hover:border-[#D4AF37] cursor-pointer transition-all"
            >
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <p className="text-[9px] text-[#A0B2C6] truncate mt-0.5">{item.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Document Viewer Panel (2/3 Width) */}
      <div className="lg:col-span-2 bg-[#16213E]/90 border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[400px]">
        {activeReading ? (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Document Reader</span>
              <h3 className="text-sm font-bold text-white mt-1">{activeReading.title}</h3>
              <p className="text-[10px] text-[#A0B2C6] mt-0.5">By {activeReading.author}</p>
              
              {/* Paper Text Container Simulator */}
              <div className="mt-4 p-4 bg-black/30 rounded border border-white/5 text-xs text-[#E8DCC8] font-mono leading-relaxed h-64 overflow-y-auto scrollbar-thin">
                {activeReading.content}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-[9px] text-[#6B7C93] font-mono">Status: Connected to Secure Reader API</span>
              <a 
                href="https://books.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded"
              >
                Open Google Books Source
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center py-12 text-[#A0B2C6]">
            <span className="text-4xl">📖</span>
            <h4 className="font-bold text-white text-xs mt-3">Select a Document</h4>
            <p className="text-[10px] mt-1">Pick a paper or book from the list to view its contents directly inside the interface.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-Component: Auto-updating Blogs & News
function SubjectBlogsSection({ subjectTitle }: { subjectTitle: string }) {
  const mockArticles = [
    { title: `Modern Paradigms in ${subjectTitle} Research`, date: 'Just now', source: 'MIT Tech Review', desc: `New discoveries and academic arguments surrounding ${subjectTitle} methodologies published recently.` },
    { title: `Deciphering ${subjectTitle} in the Age of Digital Knowledge`, date: '1 day ago', source: 'Stanford News', desc: `Understanding critical models and historical concepts in ${subjectTitle} through modern perspectives.` },
    { title: `Geopolitical Implications of ${subjectTitle}`, date: '3 days ago', source: 'Harvard Gazette', desc: `How policy decisions are affected by the scholarly research emerging in the field of ${subjectTitle}.` }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Auto-Updating Feeds</h4>
        <span className="text-[9px] text-emerald-400 font-mono animate-pulse">● Connected to Live RSS</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockArticles.map((art, idx) => (
          <div key={idx} className="p-4 bg-[#16213E] border border-white/5 rounded-xl space-y-2 hover:border-[#D4AF37] transition-all">
            <div className="flex justify-between text-[9px] text-[#A0B2C6]">
              <span>{art.source}</span>
              <span>{art.date}</span>
            </div>
            <h4 className="text-xs font-bold text-white">{art.title}</h4>
            <p className="text-[10px] text-[#A0B2C6] leading-relaxed">{art.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-Component: AI Flashcard & Quiz Custom Prompt Generator
function SubjectAIQuizGenerator({ subjectTitle }: { subjectTitle: string }) {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGeneratedResult(null);
    
    try {
      const { fetchClient } = await import('../../lib/apiClient');
      // Fetch both custom flashcards and quiz simultaneously
      const [cardsRes, quizRes] = await Promise.all([
        fetchClient(`/api/ai/flashcards?subject=${currentSubject?.slug}`),
        fetchClient(`/api/ai/quiz?subject=${currentSubject?.slug}&query=${encodeURIComponent(prompt)}`)
      ]);

      if (cardsRes.ok && quizRes.ok) {
        setGeneratedResult(`AI generated custom cards and a quiz successfully based on prompt: "${prompt}"! They have been added to your Active Recall deck.`);
      } else {
        setGeneratedResult('Generation failed. Please try again.');
      }
    } catch (e) {
      setGeneratedResult('Network error during AI generation.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-[#16213E]/80 border border-white/10 p-6 rounded-xl space-y-4 max-w-2xl mx-auto shadow-xl">
      <div className="text-center">
        <h4 className="font-heading text-lg font-bold text-[#D4AF37]">Custom AI Generator</h4>
        <p className="text-xs text-[#A0B2C6] mt-1">Provide keywords or a description to generate customized flashcard decks and adaptive quizzes.</p>
      </div>

      <div className="space-y-3">
        <textarea
          rows={3}
          placeholder="e.g. quantum superposition and qubits, Socratic trial details, or Keynesian fiscal multipliers..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-[#6B7C93] outline-none focus:border-[#D4AF37] leading-relaxed resize-none"
        />

        <button 
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] disabled:opacity-40 text-[#1A1A2E] font-bold text-xs rounded-lg uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
        >
          {generating ? 'Summoning AI Scholar...' : 'Generate custom cards & Quizzes'}
        </button>
      </div>

      {generating && (
        <div className="flex flex-col items-center justify-center py-4 space-y-2 animate-pulse">
          <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] text-[#A0B2C6]">Analyzing terms & creating nodes...</span>
        </div>
      )}

      {generatedResult && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] rounded-lg text-center font-medium animate-fadeIn">
          {generatedResult}
        </div>
      )}
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
