import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { fullName, username, email, password } = body;

    if (!fullName || !username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Username or email already registered' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      fullName,
      username,
      email,
      passwordHash,
      level: 1,
      xp: 0,
      streak: 1
    });

    return NextResponse.json({
      message: 'Account registered successfully',
      user: {
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        level: newUser.level,
        xp: newUser.xp,
        streak: newUser.streak
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
