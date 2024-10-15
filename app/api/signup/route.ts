// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db'; // Adjust this import path as needed

export async function POST(request: NextRequest) {
  try {
    const { username, clerkId } = await request.json();

    // Create a table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clerkId TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        createdOn DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert a new user
    await db.execute({
      sql: 'INSERT INTO users (clerkId, username) VALUES (?, ?)',
      args: [clerkId, username],
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed')
    ) {
      return NextResponse.json(
        { error: 'Sorry, username already exists.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
