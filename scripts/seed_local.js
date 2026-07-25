/*
  Seed script for local or Atlas MongoDB.
  Usage:
    MONGODB_URI="your_mongo_uri" node scripts/seed_local.js

  Reads MONGODB_URI from environment. Will abort if not provided.
*/

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Copy .env.example to .env.local and set it, or pass MONGODB_URI on the command line.');
  process.exit(1);
}

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
  }
];

async function seed() {
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB.');
    const dbName = (new URL(MONGODB_URI.startsWith('mongodb+srv') ? ('mongodb+srv://' + MONGODB_URI.split('mongodb+srv://')[1]) : MONGODB_URI)).pathname.replace('/', '') || 'geeky';
    const db = client.db(dbName || 'geeky');
    const subjectsColl = db.collection('subjects');

    // Clear existing subjects
    await subjectsColl.deleteMany({});
    console.log('Cleared existing subjects.');

    // Insert sample subjects
    await subjectsColl.insertMany(subjectsData);
    console.log('Inserted subjects.');

    // Optional demo user
    try {
      const usersColl = db.collection('users');
      const existing = await usersColl.findOne({ username: 'demo' });
      if (!existing) {
        const passwordHash = await bcrypt.hash('password123', 10);
        await usersColl.insertOne({ fullName: 'Demo User', username: 'demo', email: 'demo@example.com', passwordHash, level: 1, xp: 0, streak: 0, achievements: [] });
        console.log('Inserted demo user: username=demo password=password123');
      } else {
        console.log('Demo user already exists, skipping user seed.');
      }
    } catch (uErr) {
      console.warn('User seed skipped or failed:', uErr.message);
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

seed();
