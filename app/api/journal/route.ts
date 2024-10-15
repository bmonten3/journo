import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { title, content } = await request.json();

    // Create a table if it doesn't exist
    await db.execute(`
    CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clerkId TEXT NOT NULL,
        username TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (clerkId) REFERENCES users(clerkId) ON DELETE CASCADE,
         FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
      )
    `);

    const user_name = await db.execute({
      sql: 'SELECT username FROM users WHERE clerkId = ?',
      args: [userId],
    });

    const username = user_name.rows[0].username;
    // Insert a new entry
    const result = await db.execute({
      sql: 'INSERT INTO journal_entries (clerkId, username, title, content) VALUES (?, ?,?, ?)',
      args: [userId, username, title, content],
    });

    return NextResponse.json(
      {
        message: 'Journal entry created successfully',
        id: Number(result.lastInsertRowid), // Convert BigInt to a number
      },
      { status: 201 }
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
