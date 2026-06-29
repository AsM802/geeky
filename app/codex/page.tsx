'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Subject {
  id: string;
  title: string;
  domain: string;
  icon: string;
  desc: string;
  hours: number;
  progress: number;
  curriculum: { num: number; title: string; meta: string }[];
}

const subjectsData: Subject[] = [
  {
    id: 'ancient-philosophy',
    title: 'Ancient Greek Philosophy',
    domain: 'Philosophy & Ethics',
    icon: '🏛️',
    desc: 'From Thales to Aristotle: tracing the origins of Western metaphysics, epistemology, and ethics.',
    hours: 24,
    progress: 65,
    curriculum: [
      { num: 1, title: 'The Pre-Socratics & Natural Philosophy', meta: 'Video Lesson • 45 mins' },
      { num: 2, title: 'Socratic Dialogue & The Elenchus Method', meta: 'Paper Summary • 30 mins' },
      { num: 3, title: 'Plato: Theory of Forms & The Republic', meta: 'Book Digest • 60 mins' },
      { num: 4, title: 'Aristotle: Nicomachean Ethics & Categorical Logic', meta: 'AI Flashcards • 15 mins' }
    ]
  },
  {
    id: 'quantum-mechanics',
    title: 'Quantum Mechanics & Reality',
    domain: 'Physics & Cosmos',
    icon: '🌌',
    desc: 'Wave-particle duality, superposition, quantum entanglement, and interpretations of reality.',
    hours: 32,
    progress: 40,
    curriculum: [
      { num: 1, title: 'The Double-Slit Experiment & Wave Functions', meta: 'Video Lesson • 50 mins' },
      { num: 2, title: 'Schrödinger Equation & Measurement Problem', meta: 'Paper Summary • 40 mins' },
      { num: 3, title: 'EPR Paradox & Bell’s Theorem Proofs', meta: 'Research Paper • 75 mins' }
    ]
  },
  {
    id: 'algorithms-complexity',
    title: 'Algorithms & Computational Complexity',
    domain: 'Computer Science',
    icon: '💻',
    desc: 'Asymptotic analysis, graph theory, P vs NP paradigms, and algorithmic optimization.',
    hours: 28,
    progress: 85,
    curriculum: [
      { num: 1, title: 'Asymptotic Growth & Divide-and-Conquer', meta: 'Video Lesson • 40 mins' },
      { num: 2, title: 'Graph Algorithms: Dijkstra & A* Pathfinding', meta: 'Interactive Quiz • 20 mins' },
      { num: 3, title: 'NP-Completeness & Reduction Proofs', meta: 'Book Digest • 55 mins' }
    ]
  },
  {
    id: 'ancient-civilisations',
    title: 'Ancient Mediterranean Civilisations',
    domain: 'History & Civilisations',
    icon: '🏺',
    desc: 'Comparative analysis of Bronze Age collapse, Mesopotamian law codes, and Hellenistic empires.',
    hours: 20,
    progress: 20,
    curriculum: [
      { num: 1, title: 'The Code of Hammurabi & Early Jurisprudence', meta: 'Paper Digest • 35 mins' },
      { num: 2, title: 'The Late Bronze Age Collapse (1200 BCE)', meta: 'Video Lesson • 45 mins' }
    ]
  }
];

export default function CodexPage() {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const domains = ['all', 'Philosophy & Ethics', 'Physics & Cosmos', 'Computer Science', 'History & Civilisations'];

  const filteredSubjects = selectedDomain === 'all'
    ? subjectsData
    : subjectsData.filter(s => s.domain === selectedDomain);

  return (
    <div className="space-y-8">
      <div className="relative pb-3 border-b border-white/10">
        <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">The Codex Library</h1>
        <p className="text-[#A0B2C6] mt-1">Curated university-grade curricula structured into digital manuscripts.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      {!selectedSubject ? (
        <div className="space-y-6">
          {/* Domain Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedDomain === domain
                    ? 'bg-[#B8860B]/20 border border-[#B8860B] text-[#D4AF37]'
                    : 'bg-[#16213E] border border-white/10 text-[#A0B2C6] hover:text-white'
                }`}
              >
                {domain === 'all' ? 'All Domains' : domain}
              </button>
            ))}
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubject(sub)}
                className="bg-[#16213E] border border-white/10 border-l-4 border-l-[#B8860B] hover:border-l-[#D4AF37] hover:border-white/20 p-6 rounded-xl cursor-pointer hover:-translate-y-1 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#D4AF37]">{sub.domain}</span>
                    <span className="text-3xl">{sub.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#E8DCC8] mb-2">{sub.title}</h3>
                  <p className="text-sm text-[#A0B2C6] line-clamp-2 mb-6">{sub.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-xs text-[#A0B2C6]">
                    <span>{sub.hours} Est. Hours</span>
                    <span>{sub.progress}% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Detail Illuminated Manuscript View */
        <div className="bg-[#16213E] border border-[#B8860B]/40 rounded-2xl p-8 shadow-2xl space-y-6">
          <button
            onClick={() => setSelectedSubject(null)}
            className="text-[#D4AF37] font-semibold flex items-center gap-2 hover:underline"
          >
            ← Return to Library Catalogue
          </button>

          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{selectedSubject.domain}</span>
              <h2 className="font-heading text-3xl font-bold text-[#E8DCC8] mt-1">{selectedSubject.title}</h2>
              <p className="text-[#A0B2C6] mt-2 max-w-2xl">{selectedSubject.desc}</p>
            </div>
            <span className="text-5xl">{selectedSubject.icon}</span>
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm text-[#A0B2C6]">
              <span>Curriculum Completion Progress</span>
              <span>{selectedSubject.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" style={{ width: `${selectedSubject.progress}%` }}></div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="font-heading text-xl font-bold text-[#D4AF37] mb-4">Illuminated Sub-topics Curriculum</h3>
            <div className="space-y-3">
              {selectedSubject.curriculum.map((item) => (
                <div key={item.num} className="bg-[#0F3460] border border-white/10 p-4 rounded-lg flex items-center justify-between hover:border-[#B8860B]/40 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="w-9 h-9 rounded-full bg-[#B8860B]/20 border border-[#B8860B] text-[#D4AF37] font-heading font-bold flex items-center justify-center">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#E8DCC8]">{item.title}</h4>
                      <span className="text-xs text-[#A0B2C6]">{item.meta}</span>
                    </div>
                  </div>
                  <Link href="/recall" className="px-4 py-1.5 bg-[#B8860B] text-[#1A1A2E] text-xs font-bold rounded hover:bg-[#D4AF37] transition-all">
                    Study
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
