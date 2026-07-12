'use client';

import React, { useState } from 'react';

interface Debate {
  id: number;
  author: string;
  avatar: string;
  stance: 'For' | 'Against' | 'Neutral';
  countryCode: string;
  title: string;
  tag: string;
  content: string;
  support: number;
  challenge: number;
  replies: number;
  tags: string[];
  userVoted: 'support' | 'challenge' | null;
}

const initialDebates: Debate[] = [
  {
    id: 1,
    author: 'Hypatia_Alexandria',
    avatar: '🏛️',
    stance: 'Against',
    countryCode: 'EN',
    title: 'Scholar of Philosophy',
    tag: '#Philosophy',
    content: 'Can determinism and moral responsibility coexist? A compatibilist case: Hard determinism seems to under-cut blame and praise entirely. But compatibilism argues that freedom just means acting without external compulsion - not the absence of causal determination. Is this a semantic sleight of hand?',
    support: 142,
    challenge: 384,
    replies: 3,
    tags: ['Free Will', 'Determinism', 'Moral Responsibility'],
    userVoted: null
  },
  {
    id: 2,
    author: 'Quantum_Curator',
    avatar: '🌌',
    stance: 'For',
    countryCode: 'JP',
    title: 'Physics Fellow',
    tag: '#QuantumPhysics',
    content: 'Large Language Models do not and cannot possess genuine understanding. Searle’s Chinese Room argument predates LLMs but applies directly: syntactic manipulation, however sophisticated, is not semantic understanding. GPT-class models pass rules without comprehension. Or do they?',
    support: 318,
    challenge: 142,
    replies: 12,
    tags: ['LLMs', 'Chinese Room', 'Understanding', 'AI Cognition'],
    userVoted: null
  },
  {
    id: 3,
    author: 'Political_Observer',
    avatar: '🌐',
    stance: 'For',
    countryCode: 'EN',
    title: 'Politics Scholar',
    tag: '#PoliticalScience',
    content: 'Democratic backsliding is inevitable in majoritarian systems without constitutional courts. Hungary, Turkey, and India’s recent trajectories suggest that electoral majorities alone cannot protect liberal norms. Counter-majoritarian institutions are essential — but are they themselves democratically legitimate?',
    support: 167,
    challenge: 398,
    replies: 0,
    tags: ['Democracy', 'Constitutionalism', 'Rule of Law', 'Populism'],
    userVoted: null
  }
];

export default function DebatePage() {
  const [debates, setDebates] = useState<Debate[]>(initialDebates);
  const [motionText, setMotionText] = useState('');
  const [selectedTag, setSelectedTag] = useState('#Philosophy');
  const [selectedStance, setSelectedStance] = useState<'For' | 'Against' | 'Neutral'>('For');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');

  const handleVote = (id: number, type: 'support' | 'challenge') => {
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        let support = d.support;
        let challenge = d.challenge;
        let userVoted = d.userVoted;

        if (userVoted === type) {
          userVoted = null;
          if (type === 'support') support--;
          if (type === 'challenge') challenge--;
        } else {
          if (userVoted === 'support') support--;
          if (userVoted === 'challenge') challenge--;
          userVoted = type;
          if (type === 'support') support++;
          if (type === 'challenge') challenge++;
        }
        return { ...d, support, challenge, userVoted };
      })
    );
  };

  const handlePostMotion = () => {
    if (!motionText.trim()) return;
    const newDebate: Debate = {
      id: Date.now(),
      author: 'Agniv_Scholar',
      avatar: '🏛️',
      stance: selectedStance,
      countryCode: 'IN',
      title: 'Apprentice Philosopher',
      tag: selectedTag,
      content: motionText,
      support: 1,
      challenge: 0,
      replies: 0,
      tags: [selectedTag.replace('#', '')],
      userVoted: 'support'
    };
    setDebates([newDebate, ...debates]);
    setMotionText('');
  };

  const filteredDebates = debates.filter((d) => {
    const matchesSearch = d.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || d.tag.toLowerCase().includes(subjectFilter.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="relative pb-3 border-b border-white/10">
        <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">Debate & Discussions</h1>
        <p className="text-[#A0B2C6] mt-1">Structured academic debate. Present motions, defend stances, and evaluate logical proofs.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      {/* Real-time Global Arena Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-[#16213E]/80 border border-white/10 p-4 rounded-xl items-center shadow-xl">
        <div className="text-center md:border-r border-white/5">
          <span className="text-[10px] text-[#A0B2C6] uppercase tracking-wider block">Active Threads</span>
          <span className="text-lg font-bold font-mono text-[#D4AF37] mt-0.5 block">284</span>
        </div>
        <div className="text-center md:border-r border-white/5">
          <span className="text-[10px] text-[#A0B2C6] uppercase tracking-wider block">Online Now</span>
          <span className="text-lg font-bold font-mono text-cyan-400 mt-0.5 block">1,842</span>
        </div>
        <div className="text-center md:border-r border-white/5">
          <span className="text-[10px] text-[#A0B2C6] uppercase tracking-wider block">Countries</span>
          <span className="text-lg font-bold font-mono text-white mt-0.5 block">94</span>
        </div>
        <div className="text-center md:border-r border-white/5">
          <span className="text-[10px] text-[#A0B2C6] uppercase tracking-wider block">Debates Today</span>
          <span className="text-lg font-bold font-mono text-orange-400 mt-0.5 block">47</span>
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-center">
          <button 
            onClick={() => document.getElementById('post-card')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-2 bg-[#B8860B] hover:bg-[#D4AF37] text-[#1A1A2E] font-bold text-xs rounded-lg uppercase tracking-wider shadow"
          >
            + Start Debate
          </button>
        </div>
      </div>

      {/* Main Debate View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Feed (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters & Search Row */}
          <div className="bg-[#16213E]/85 border border-white/10 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2 rounded-lg text-xs">
              <span>🔍</span>
              <input 
                type="text" 
                placeholder="Search debates by topic, subject, or contributor..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-white placeholder-[#6B7C93]"
              />
            </div>
            
            <div className="flex gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-none">
              {['All', 'Philosophy', 'Physics', 'Neuroscience', 'Economics', 'Chemistry', 'CS'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubjectFilter(sub)}
                  className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    subjectFilter === sub ? 'bg-[#D4AF37] text-[#1A1A2E]' : 'bg-[#0F3460] text-[#A0B2C6]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Create Motion Card */}
          <div id="post-card" className="bg-[#16213E] border border-[#B8860B]/40 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="font-heading text-sm font-bold text-[#D4AF37] uppercase tracking-wider">⚡ Present a Motion for Discourse</h3>
            <textarea
              value={motionText}
              onChange={(e) => setMotionText(e.target.value)}
              placeholder="State your thesis or argument clearly (e.g. 'UBI is the only viable economic shock absorber in an automation-dense landscape')..."
              className="w-full h-24 bg-[#0F3460] border border-white/10 rounded-lg p-3 text-[#E8DCC8] placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B] text-xs resize-none"
            />
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex gap-2">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="bg-[#0F3460] border border-white/10 text-white rounded px-2 py-1 text-xs outline-none"
                >
                  <option value="#Philosophy">#Philosophy</option>
                  <option value="#QuantumPhysics">#Physics</option>
                  <option value="#Neuroscience">#Neuroscience</option>
                  <option value="#Economics">#Economics</option>
                  <option value="#ComputerScience">#ComputerScience</option>
                </select>
                <select
                  value={selectedStance}
                  onChange={(e) => setSelectedStance(e.target.value as any)}
                  className="bg-[#0F3460] border border-white/10 text-white rounded px-2 py-1 text-xs outline-none"
                >
                  <option value="For">For Stance</option>
                  <option value="Against">Against Stance</option>
                  <option value="Neutral">Neutral Stance</option>
                </select>
              </div>
              <button
                onClick={handlePostMotion}
                className="px-5 py-2 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold text-xs rounded-lg uppercase tracking-wider"
              >
                Publish Motion
              </button>
            </div>
          </div>

          {/* Debates Stream */}
          <div className="space-y-4">
            {filteredDebates.map((d) => (
              <div key={d.id} className="bg-[#16213E] border border-white/10 p-6 rounded-xl space-y-4 hover:border-[#D4AF37]/50 transition-all shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-lg">
                      {d.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#E8DCC8] text-xs">{d.author}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          d.stance === 'For' ? 'bg-emerald-500/20 text-emerald-400' : d.stance === 'Against' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {d.stance} · {d.countryCode}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A0B2C6]">{d.title}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-[10px] font-bold rounded">
                    {d.tag}
                  </span>
                </div>

                <p className="text-xs text-[#E8DCC8] leading-relaxed font-sans">{d.content}</p>

                {/* Sub-tags inside motion */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {d.tags.map((t, idx) => (
                    <span key={idx} className="text-[9px] text-[#A0B2C6] bg-black/30 px-2 py-0.5 rounded border border-white/5">#{t}</span>
                  ))}
                </div>

                {/* Interactive Action Bars */}
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVote(d.id, 'support')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                        d.userVoted === 'support'
                          ? 'bg-emerald-500/25 border-emerald-500 text-emerald-400'
                          : 'border-white/10 text-[#A0B2C6] hover:border-emerald-500'
                      }`}
                    >
                      🤝 Support ({d.support})
                    </button>
                    <button
                      onClick={() => handleVote(d.id, 'challenge')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                        d.userVoted === 'challenge'
                          ? 'bg-red-500/25 border-red-500 text-red-400'
                          : 'border-white/10 text-[#A0B2C6] hover:border-red-500'
                      }`}
                    >
                      ⚔️ Challenge ({d.challenge})
                    </button>
                  </div>
                  <span className="text-[10px] text-[#6B7C93] font-semibold font-mono">💬 {d.replies} replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar panels (1/3 Width) */}
        <div className="space-y-6">
          
          {/* Top Debaters List */}
          <div className="bg-[#16213E] border border-white/10 p-5 rounded-xl">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest pb-2 border-b border-white/5 mb-3">
              🏆 Top Debaters This Month
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Yuki', xp: '8.4k', score: '96.2 accuracy' },
                { name: 'Elena', xp: '7.2k', score: '94.8 accuracy' },
                { name: 'Marcus', xp: '5.9k', score: '91.7 accuracy' },
                { name: 'Ingrid', xp: '5.3k', score: '89.4 accuracy' },
                { name: 'James', xp: '4.8k', score: '88.5 accuracy' }
              ].map((db, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#A0B2C6] font-mono">#{idx+1}</span>
                    <span className="font-semibold text-white">{db.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[#D4AF37] block font-bold">{db.xp}</span>
                    <span className="text-[9px] text-[#6B7C93] block">{db.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Argument Score */}
          <div className="bg-[#16213E] border border-white/10 p-5 rounded-xl">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest pb-2 border-b border-white/5 mb-3">
              🤖 AI Argument Score
            </h3>
            <p className="text-[10px] text-[#A0B2C6] leading-relaxed mb-3">
              Each reply is scored by AI on logical validity, evidence quality, and counterpoint engagement. Scores above 90 earn bonus XP.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#A0B2C6]">Logical Validity</span>
                <span className="font-bold text-white font-mono">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A0B2C6]">Evidence Quality</span>
                <span className="font-bold text-white font-mono">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A0B2C6]">Counterpoint Engagement</span>
                <span className="font-bold text-white font-mono">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A0B2C6]">Originality</span>
                <span className="font-bold text-white font-mono">15%</span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-[#16213E] border border-white/10 p-5 rounded-xl">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest pb-2 border-b border-white/5 mb-3">
              📈 Trending Topics
            </h3>
            <div className="space-y-3">
              {[
                { topic: 'Consciousness & AI', counts: '142 debates' },
                { topic: 'UBI Feasibility', counts: '89 debates' },
                { topic: 'Free Will', counts: '76 debates' },
                { topic: 'Democratic Erosion', counts: '62 debates' },
                { topic: 'Quantum Mechanics & Reality', counts: '54 debates' }
              ].map((tp, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white truncate max-w-[160px]">{tp.topic}</span>
                  <span className="text-[10px] text-purple-400 font-semibold">{tp.counts}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
