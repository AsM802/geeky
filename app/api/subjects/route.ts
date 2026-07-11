import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('s');

    if (slug) {
      const subject = await Subject.findOne({ slug });
      if (!subject) {
        return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
      }
      return NextResponse.json(subject);
    }

    const subjects = await Subject.find({});
    return NextResponse.json(subjects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
