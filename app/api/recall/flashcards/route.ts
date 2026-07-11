import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Flashcard from '@/models/Flashcard';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('s') || 'philosophy';

    let cards = await Flashcard.find({ subjectSlug: subject });

    // Seed default cards if collection is empty for this subject
    if (cards.length === 0) {
      const defaults = [
        {
          subjectSlug: subject,
          type: 'Concept • ' + subject.charAt(0).toUpperCase() + subject.slice(1),
          prompt: 'What is the core distinction between Epistemology and Metaphysics?',
          answer: 'Epistemology is the study of knowledge and belief justification ("how we know"), whereas Metaphysics is the study of fundamental reality and existence ("what exists").'
        },
        {
          subjectSlug: subject,
          type: 'Formula • ' + subject.charAt(0).toUpperCase() + subject.slice(1),
          prompt: 'State the base formulation of standard definition of knowledge in classics.',
          answer: 'Justified True Belief (JTB) — a proposition must be believed, must be true, and must be justified to count as knowledge.'
        }
      ];
      cards = await Flashcard.insertMany(defaults);
    }

    return NextResponse.json(cards);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Updates spacing parameters using SuperMemo SM-2 Math (TRD Section 5.1)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { cardId, score } = body; // score: 'again' | 'hard' | 'good'

    if (!cardId || !score) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const card = await Flashcard.findById(cardId);
    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    // Map string scores to SM-2 qualities (0-5 scale)
    let quality = 4; // default 'good'
    if (score === 'again') quality = 1;
    if (score === 'hard') quality = 3;
    if (score === 'good') quality = 5;

    let repetitions = card.repetitions;
    let interval = card.interval;
    let easeFactor = card.easeFactor;

    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    }

    // Ease Factor formula: EF_new = max(1.3, EF_prev + 0.1 - (5-quality)*(0.08 + (5-quality)*0.02))
    easeFactor = easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (easeFactor < 1.3) easeFactor = 1.3;

    // Calculate next review timestamp
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    card.repetitions = repetitions;
    card.interval = interval;
    card.easeFactor = easeFactor;
    card.nextReview = nextReview;

    await card.save();

    return NextResponse.json({
      message: 'Spaced repetition schedule updated',
      card: {
        id: card._id,
        repetitions,
        interval,
        easeFactor,
        nextReview
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
