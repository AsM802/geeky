'use client';

import React, { useState } from 'react';

const flashcardsData = [
  {
    type: 'Concept • Philosophy',
    prompt: 'What is the core distinction between Epistemology and Metaphysics?',
    answer: 'Epistemology is the study of knowledge and belief justification ("how we know"), whereas Metaphysics is the study of fundamental reality and existence ("what exists").'
  },
  {
    type: 'Formula • Physics',
    prompt: 'What is the Heisenberg Uncertainty Principle formulation for position and momentum?',
    answer: 'Δx · Δp ≥ ℏ / 2. It establishes a fundamental limit to the precision with which certain pairs of physical properties can be known simultaneously.'
  },
  {
    type: 'Timeline • History',
    prompt: 'When did the Fall of the Western Roman Empire conventionally occur?',
    answer: '476 CE, marked by the abdication of Emperor Romulus Augustulus to the Germanic chieftain Odoacer.'
  }
];

const quizQuestions = [
  {
    question: "Which philosopher proposed the 'Allegory of the Cave' to illustrate the theory of Forms?",
    options: ["Aristotle", "Plato", "Socrates", "Epicurus"],
    correct: 1,
    explanation: "Plato presented the Allegory of the Cave in Book VII of 'The Republic' to contrast sensory appearance with true intelligible Reality."
  },
  {
    question: "In quantum physics, what does Bell's Theorem demonstrate?",
    options: [
      "Light behaves strictly as a classical particle",
      "No local hidden variable theory can reproduce all quantum predictions",
      "Electrons revolve around nucleus in fixed planetary orbits",
      "Energy is continuous rather than quantized"
    ],
    correct: 1,
    explanation: "Bell's Theorem showed that local realism is incompatible with statistical predictions of quantum mechanics, verified experimentally."
  },
  {
    question: "What is the time complexity of searching a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correct: 2,
    explanation: "Because a balanced BST halves the search space at each step, its search operations run in logarithmic time O(log n)."
  }
];

export default function RecallPage() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subjectSlug, setSubjectSlug] = useState('philosophy');

  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const { fetchClient } = await import('../../lib/apiClient');
      const res = await fetchClient(`/api/recall/flashcards?s=${subjectSlug}`);
      const data = await res.json();
      if (!data.error) {
        setFlashcards(data);
      }
    } catch (_) {}
    setLoading(false);
  };

  React.useEffect(() => {
    fetchFlashcards();
  }, [subjectSlug]);

  const handleRateCard = async (score: 'again' | 'hard' | 'good') => {
    const currentCard = flashcards[cardIdx];
    if (!currentCard) return;

    setIsFlipped(false);
    
    // Optimistic / delayed progression
    setTimeout(() => {
      setCardIdx((prev) => (prev + 1) % flashcards.length);
    }, 300);

    try {
      const { fetchClient } = await import('../../lib/apiClient');
      await fetchClient('/api/recall/flashcards', {
        method: 'POST',
        body: JSON.stringify({ cardId: currentCard._id, score }),
      });
    } catch (_) {}
  };

  const handleSelectQuizOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizIdx((prev) => (prev + 1) % quizQuestions.length);
  };

  const currentCard = flashcards[cardIdx];
  const currentQuiz = quizQuestions[quizIdx];

  return (
    <div className="space-y-8">
      <div className="relative pb-3 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold text-[#E8DCC8]">Active Recall Engine</h1>
          <p className="text-[#A0B2C6] mt-1">Automated SM-2 spaced repetition flashcards and adaptive difficulty quizzes.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Active Subject:</span>
          <select
            value={subjectSlug}
            onChange={(e) => setSubjectSlug(e.target.value)}
            className="bg-[#16213E] border border-[#B8860B]/40 rounded px-3 py-1 text-xs text-white outline-none cursor-pointer focus:border-[#D4AF37]"
          >
            <option value="philosophy">Philosophy 🏛️</option>
            <option value="physics">Physics 🌌</option>
            <option value="neuroscience">Neuroscience 🧠</option>
            <option value="economics">Economics 📈</option>
            <option value="cs">Computer Science 💻</option>
          </select>
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"></div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 py-3 font-heading text-lg rounded-xl border transition-all ${
            activeTab === 'flashcards'
              ? 'bg-[#0F3460] border-[#B8860B] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'bg-[#16213E] border-white/10 text-[#A0B2C6]'
          }`}
        >
          🎴 Flashcards Burst
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-3 font-heading text-lg rounded-xl border transition-all ${
            activeTab === 'quiz'
              ? 'bg-[#0F3460] border-[#B8860B] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'bg-[#16213E] border-white/10 text-[#A0B2C6]'
          }`}
        >
          📝 Adaptive Quiz
        </button>
      </div>

      {activeTab === 'flashcards' ? (
        /* Flashcard View */
        <div className="space-y-6">
          {loading ? (
            <div className="p-12 text-center text-[#D4AF37] font-heading">Consulting the library scrolls...</div>
          ) : !currentCard ? (
            <div className="p-12 text-center text-[#A0B2C6]">No flashcards available in this subject archive yet.</div>
          ) : (
            <>
              <div className="perspective-1000 max-w-2xl h-96 mx-auto">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`relative w-full h-full cursor-pointer transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#16213E] to-[#0F3460] border-2 border-[#B8860B] rounded-2xl p-8 flex flex-col justify-center items-center text-center backface-hidden shadow-2xl">
                    <span className="absolute top-6 left-6 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                      {currentCard.type}
                    </span>
                    <h2 className="font-heading text-2xl text-[#E8DCC8] mb-4">{currentCard.prompt}</h2>
                    <span className="text-sm italic text-[#6B7C93]">Click card to reveal answer</span>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0F3460] to-[#16213E] border-2 border-[#B8860B] rounded-2xl p-8 flex flex-col justify-center items-center text-center backface-hidden rotate-y-180 shadow-2xl">
                    <span className="absolute top-6 left-6 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                      Answer Key
                    </span>
                    <p className="text-lg text-[#E8DCC8] leading-relaxed">{currentCard.answer}</p>
                  </div>
                </div>
              </div>

              {isFlipped && (
                <div className="flex justify-center gap-4 max-w-md mx-auto animate-fadeIn">
                  <button onClick={() => handleRateCard('again')} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all">
                    Repeat (Again)
                  </button>
                  <button onClick={() => handleRateCard('hard')} className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition-all">
                    Hard
                  </button>
                  <button onClick={() => handleRateCard('good')} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all">
                    Mastered (Good)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* Adaptive Quiz View */
        <div className="bg-[#16213E] border border-[#B8860B]/40 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl space-y-6">
          <div className="flex justify-between text-sm text-[#A0B2C6]">
            <span>Question {quizIdx + 1} of {quizQuestions.length}</span>
            <span>Difficulty: <strong className="text-[#D4AF37]">Adaptive (Medium)</strong></span>
          </div>

          <h2 className="font-heading text-xl font-bold text-[#E8DCC8]">{currentQuiz.question}</h2>

          <div className="space-y-3">
            {currentQuiz.options.map((opt, idx) => {
              let btnStyle = 'bg-[#0F3460] border-white/10 hover:border-[#B8860B]/40 text-[#E8DCC8]';
              if (selectedOption !== null) {
                if (idx === currentQuiz.correct) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-red-500/20 border-red-500 text-red-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuizOption(idx)}
                  className={`w-full p-4 border rounded-lg text-left transition-all ${btnStyle}`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg border text-sm ${
              selectedOption === currentQuiz.correct
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-red-500/10 border-red-500/40 text-red-400'
            }`}>
              <strong>{selectedOption === currentQuiz.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> {currentQuiz.explanation}
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextQuizQuestion}
              className="w-full py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#1A1A2E] font-bold rounded-lg hover:brightness-110 transition-all"
            >
              Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
