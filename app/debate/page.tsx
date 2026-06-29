'use client';

import React, { useState } from 'react';

interface Debate {
  id: number;
  author: string;
  avatar: string;
  title: string;
  tag: string;
  content: string;
  support: number;
  challenge: number;
  userVoted: 'support' | 'challenge' | null;
}

const initialDebates: Debate[] = [
  {
    id: 1,
    author: 'Hypatia_Alexandria',
    avatar: '🏛️',
    title: 'Scholar of Philosophy',
    tag: '#Philosophy',
    content: 'Motion: Virtue Ethics provides a far more robust framework for modern autonomous artificial intelligence systems than consequentialist utilitarianism.',
    support: 142,
    challenge: 19,
    userVoted: null
  },
  {
    id: 2,
    author: 'Quantum_Curator',
    avatar: '🌌',
    title: 'Physics Fellow',
    tag: '#QuantumPhysics',
    content: 'Motion: The Many-Worlds Interpretation of Quantum Mechanics is epistemologically more parsimonious than the Copenhagen collapse model because it avoids wave-function collapse mechanisms.',
    support: 98,
    challenge: 45,
    userVoted: null
  }
];

export default function DebatePage() {
  const [debates, setDebates] = useState<Debate[]>(initialDebates);
  const [motionText, setMotionText] = useState('');
  const [selectedTag, setSelectedTag] = useState('#Philosophy');

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
      author: 'Scholar Agniv',
      avatar: '🏛️',
      title: 'Apprentice Philosopher',
      tag: selectedTag,
      content: motionText,
      support: 1,
      challenge: 0,
      userVoted: 'support'
    };
    setDebates([newDebate, ...debates]);
    setMotionText('');
  };

  return (
    <div className="space-y-8">
      <div className="relative pb-3 border-b border-white/10">
        <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">The Amphitheatre</h1>
        <p className="text-[#A0B2C6] mt-1">Structured academic debate arena. Present motions, support arguments, or post rebuttals.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Debate Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Motion Card */}
          <div className="bg-[#16213E] border border-[#B8860B]/40 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="font-heading text-lg font-bold text-[#D4AF37]">⚡ Present a Motion for Discourse</h3>
            <textarea
              value={motionText}
              onChange={(e) => setMotionText(e.target.value)}
              placeholder="Frame an academic motion or argument (e.g., 'Resolved: Artificial General Intelligence requires embodiment to achieve true semantic understanding')..."
              className="w-full h-24 bg-[#0F3460] border border-white/10 rounded-lg p-3 text-[#E8DCC8] placeholder-[#6B7C93] focus:outline-none focus:border-[#B8860B]"
            />
            <div className="flex justify-between items-center">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-[#0F3460] border border-white/10 text-[#E8DCC8] rounded px-3 py-1.5 text-sm"
              >
                <option value="#Philosophy">#Philosophy</option>
                <option value="#QuantumPhysics">#QuantumPhysics</option>
                <option value="#Ethics">#Ethics</option>
                <option value="#ComputerScience">#ComputerScience</option>
              </select>
              <button
                onClick={handlePostMotion}
                className="px-5 py-2 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold text-sm rounded-lg hover:brightness-110 transition-all"
              >
                Publish Motion
              </button>
            </div>
          </div>

          {/* Debates Stream */}
          <div className="space-y-4">
            {debates.map((debate) => (
              <div key={debate.id} className="bg-[#16213E] border border-white/10 hover:border-[#B8860B]/40 p-6 rounded-xl space-y-4 transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#B8860B]/20 border border-[#B8860B] flex items-center justify-center text-lg">
                      {debate.avatar}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#E8DCC8] text-sm">{debate.author}</h4>
                      <span className="text-xs text-[#D4AF37]">{debate.title}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-xs font-bold rounded">
                    {debate.tag}
                  </span>
                </div>

                <p className="text-[#E8DCC8] leading-relaxed">{debate.content}</p>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => handleVote(debate.id, 'support')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${
                      debate.userVoted === 'support'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'border-white/10 text-[#A0B2C6] hover:border-[#B8860B]'
                    }`}
                  >
                    🤝 Support ({debate.support})
                  </button>
                  <button
                    onClick={() => handleVote(debate.id, 'challenge')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${
                      debate.userVoted === 'challenge'
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'border-[#B8860B]'
                    }`}
                  >
                    ⚔️ Challenge ({debate.challenge})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Active Motions */}
        <div className="space-y-6">
          <div className="bg-[#16213E] border border-white/10 rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold text-[#D4AF37] pb-3 border-b border-white/10 mb-4">
              🔥 Actively Debated Motions
            </h3>
            <div className="space-y-4 text-sm text-[#A0B2C6]">
              <div className="pb-3 border-b border-white/5">
                <strong className="text-[#D4AF37] block">#QuantumEthics</strong>
                <p className="italic text-[#E8DCC8] mt-1">Is deterministic physics compatible with moral responsibility?</p>
                <span className="text-xs text-[#6B7C93] block mt-1">42 Arguments • 180 Votes</span>
              </div>
              <div>
                <strong className="text-[#D4AF37] block">#AIPhilosophy</strong>
                <p className="italic text-[#E8DCC8] mt-1">Can large language models possess genuine intentionality?</p>
                <span className="text-xs text-[#6B7C93] block mt-1">89 Arguments • 312 Votes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
