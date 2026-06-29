/**
 * Geeky Application Logic - Intellectual Self-Learning Platform
 */

// Application State
const state = {
  currentView: 'agora',
  theme: 'dark',
  streak: 14,
  xp: 4850,
  globalRank: 12344,
  activeDomain: 'all',
  currentQuizIndex: 0,
  quizScore: 0,
  quizAnswered: false
};

// Mock Subjects Data (Modeled on PRD Section 4.5)
const subjectsData = [
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

// Mock Flashcards Data
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

let currentFlashcardIdx = 0;

// Mock Quiz Questions
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

// Mock Debate Posts Data
const debatesData = [
  {
    id: 1,
    author: 'Hypatia_Alexandria',
    avatar: '🏛️',
    title: 'Scholar of Philosophy',
    tag: '#Philosophy',
    content: 'Motion: Virtue Ethics provides a far more robust framework for modern autonomous artificial intelligence systems than consequentialist utilitarism.',
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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderSubjects();
  renderQuizQuestion();
  renderDebates();
});

// Navigation View Switcher
function switchView(viewName) {
  state.currentView = viewName;
  
  // Update Navbar Active States
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const activeNavItem = document.getElementById(`nav-${viewName}`);
  if (activeNavItem) activeNavItem.classList.add('active');

  // Update View Sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const activeView = document.getElementById(`view-${viewName}`);
  if (activeView) activeView.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dark/Light Theme Toggle
function toggleTheme() {
  const htmlEl = document.documentElement;
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', state.theme);
  document.getElementById('theme-toggle-btn').textContent = state.theme === 'dark' ? '🌙' : '☀️';
}

// Subjects Library Methods
function renderSubjects() {
  const container = document.getElementById('subjects-grid-container');
  if (!container) return;

  const filtered = state.activeDomain === 'all' 
    ? subjectsData 
    : subjectsData.filter(s => s.domain === state.activeDomain);

  container.innerHTML = filtered.map(subject => `
    <div class="subject-card" onclick="viewSubjectDetail('${subject.id}')">
      <div>
        <div class="subject-header">
          <span class="subject-domain">${subject.domain}</span>
          <span class="subject-icon">${subject.icon}</span>
        </div>
        <h3 class="subject-title">${subject.title}</h3>
        <p class="subject-desc">${subject.desc}</p>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
          <span>${subject.hours} Estimated Hours</span>
          <span>${subject.progress}% Completed</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${subject.progress}%;"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterDomain(domainName) {
  state.activeDomain = domainName;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent.includes(domainName) || (domainName === 'all' && chip.textContent.includes('All')));
  });
  renderSubjects();
}

function viewSubjectDetail(subjectId) {
  const subject = subjectsData.find(s => s.id === subjectId);
  if (!subject) return;

  document.getElementById('subjects-grid-container').style.display = 'none';
  document.getElementById('domain-filters-container').style.display = 'none';
  
  const detailView = document.getElementById('subject-detail-view');
  detailView.style.display = 'block';

  document.getElementById('detail-domain').textContent = subject.domain;
  document.getElementById('detail-title').textContent = subject.title;
  document.getElementById('detail-desc').textContent = subject.desc;
  document.getElementById('detail-icon').textContent = subject.icon;
  document.getElementById('detail-progress-pct').textContent = `${subject.progress}%`;
  document.getElementById('detail-progress-fill').style.width = `${subject.progress}%`;

  const curriculumContainer = document.getElementById('curriculum-list-container');
  curriculumContainer.innerHTML = subject.curriculum.map(item => `
    <div class="curriculum-item">
      <div class="item-left">
        <div class="item-number">${item.num}</div>
        <div>
          <div class="item-title">${item.title}</div>
          <div class="item-meta">${item.meta}</div>
        </div>
      </div>
      <button class="action-btn" style="padding:0.4rem 1rem; font-size:0.85rem;" onclick="startSubjectStudy('${subject.id}')">Study</button>
    </div>
  `).join('');
}

function hideSubjectDetail() {
  document.getElementById('subject-detail-view').style.display = 'none';
  document.getElementById('subjects-grid-container').style.display = 'grid';
  document.getElementById('domain-filters-container').style.display = 'flex';
}

function startSubjectStudy(subjectId) {
  switchView('recall');
}

// Active Recall Methods
function switchRecallTab(tab) {
  document.getElementById('tab-flashcards').classList.toggle('active', tab === 'flashcards');
  document.getElementById('tab-quiz').classList.toggle('active', tab === 'quiz');

  document.getElementById('recall-flashcards-container').style.display = tab === 'flashcards' ? 'block' : 'none';
  document.getElementById('recall-quiz-container').style.display = tab === 'quiz' ? 'block' : 'none';
}

function flipCard() {
  const card = document.getElementById('flashcard-card');
  card.classList.toggle('flipped');
  const controls = document.getElementById('sm2-controls-panel');
  if (card.classList.contains('flipped')) {
    controls.style.display = 'flex';
  }
}

function rateFlashcard(rating) {
  // Update state/XP
  state.xp += 15;
  updateUserStats();

  // Reset Card state and show next
  const card = document.getElementById('flashcard-card');
  card.classList.remove('flipped');
  document.getElementById('sm2-controls-panel').style.display = 'none';

  currentFlashcardIdx = (currentFlashcardIdx + 1) % flashcardsData.length;
  const nextCard = flashcardsData[currentFlashcardIdx];

  setTimeout(() => {
    document.getElementById('card-type').textContent = nextCard.type;
    document.getElementById('card-question').textContent = nextCard.prompt;
    document.getElementById('card-answer').textContent = nextCard.answer;
  }, 300);
}

// Quiz Engine Methods
function renderQuizQuestion() {
  const q = quizQuestions[state.currentQuizIndex];
  if (!q) return;

  state.quizAnswered = false;
  document.getElementById('quiz-q-num').textContent = state.currentQuizIndex + 1;
  document.getElementById('quiz-question-text').textContent = q.question;
  
  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.style.display = 'none';
  document.getElementById('next-quiz-btn').style.display = 'none';

  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="option-btn" onclick="selectQuizOption(${idx})">${String.fromCharCode(65 + idx)}. ${opt}</button>
  `).join('');
}

function selectQuizOption(selectedIdx) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;

  const q = quizQuestions[state.currentQuizIndex];
  const buttons = document.querySelectorAll('.option-btn');
  const feedbackBox = document.getElementById('quiz-feedback-box');

  buttons.forEach((btn, idx) => {
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIdx === q.correct) {
    state.quizScore++;
    state.xp += 35;
    feedbackBox.style.background = 'rgba(46, 204, 113, 0.15)';
    feedbackBox.style.border = '1px solid #2ECC71';
    feedbackBox.style.color = '#2ECC71';
    feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
  } else {
    feedbackBox.style.background = 'rgba(231, 76, 60, 0.15)';
    feedbackBox.style.border = '1px solid #E74C3C';
    feedbackBox.style.color = '#E74C3C';
    feedbackBox.innerHTML = `<strong>✗ Incorrect.</strong> ${q.explanation}`;
  }

  feedbackBox.style.display = 'block';
  document.getElementById('next-quiz-btn').style.display = 'flex';
  updateUserStats();
}

function nextQuestion() {
  state.currentQuizIndex = (state.currentQuizIndex + 1) % quizQuestions.length;
  renderQuizQuestion();
}

// Debate Arena Methods
function renderDebates() {
  const container = document.getElementById('debate-feed-container');
  if (!container) return;

  container.innerHTML = debatesData.map(debate => `
    <div class="debate-post-card">
      <div class="post-header">
        <div class="author-info">
          <div class="author-avatar">${debate.avatar}</div>
          <div>
            <div class="author-name">${debate.author}</div>
            <div class="author-title">${debate.title}</div>
          </div>
        </div>
        <span class="card-tag">${debate.tag}</span>
      </div>
      <p class="post-content">${debate.content}</p>
      <div class="post-actions">
        <button class="vote-btn ${debate.userVoted === 'support' ? 'supported' : ''}" onclick="voteDebate(${debate.id}, 'support')">
          <span>🤝 Support</span> <strong>(${debate.support})</strong>
        </button>
        <button class="vote-btn ${debate.userVoted === 'challenge' ? 'challenged' : ''}" onclick="voteDebate(${debate.id}, 'challenge')">
          <span>⚔️ Challenge</span> <strong>(${debate.challenge})</strong>
        </button>
      </div>
    </div>
  `).join('');
}

function voteDebate(id, voteType) {
  const debate = debatesData.find(d => d.id === id);
  if (!debate) return;

  if (debate.userVoted === voteType) {
    debate.userVoted = null;
    if (voteType === 'support') debate.support--;
    if (voteType === 'challenge') debate.challenge--;
  } else {
    if (debate.userVoted === 'support') debate.support--;
    if (debate.userVoted === 'challenge') debate.challenge--;
    debate.userVoted = voteType;
    if (voteType === 'support') debate.support++;
    if (voteType === 'challenge') debate.challenge++;
    state.xp += 10;
    updateUserStats();
  }
  renderDebates();
}

function postNewDebate() {
  const input = document.getElementById('new-motion-input');
  const tagSelect = document.getElementById('debate-tag-select');
  const text = input.value.trim();

  if (!text) return;

  debatesData.unshift({
    id: Date.now(),
    author: 'Scholar Agniv',
    avatar: '🏛️',
    title: 'Apprentice Philosopher',
    tag: tagSelect.value,
    content: text,
    support: 1,
    challenge: 0,
    userVoted: 'support'
  });

  input.value = '';
  state.xp += 25;
  updateUserStats();
  renderDebates();
}

// User Stats Updating
function updateUserStats() {
  const xpDisplay = document.getElementById('user-xp-display');
  if (xpDisplay) xpDisplay.textContent = `${state.xp.toLocaleString()} / 5,000 XP`;
}
