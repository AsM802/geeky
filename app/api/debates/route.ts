import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Debate from '@/models/Debate';

export async function GET() {
  try {
    await dbConnect();
    const debates = await Debate.find({}).sort({ createdAt: -1 });
    return NextResponse.json(debates);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { author, avatar, title, tag, content } = body;

    if (!author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newDebate = await Debate.create({
      author,
      avatar: avatar || '🏛️',
      title: title || 'Apprentice Philosopher',
      tag: tag || '#Philosophy',
      content,
      support: 1,
      challenge: 0,
      votes: { [author]: 'support' }
    });

    return NextResponse.json(newDebate, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
