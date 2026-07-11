const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://app1:Tv8ut0MUHwP52bJY@cluster0.5zp4y4m.mongodb.net/geeky?retryWrites=true&w=majority';

const subjectsData = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB Cluster.');
    const db = client.db('geeky');
    const collection = db.collection('subjects');

    // Clear existing
    await collection.deleteMany({});
    console.log('Cleared existing subjects.');

    // Seed
    await collection.insertMany(subjectsData);
    console.log('Successfully seeded subjects into MongoDB!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seed();
