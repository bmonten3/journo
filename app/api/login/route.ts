// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (userId) {
    try {
      // Fetch user
      const result = await db.execute({
        sql: 'SELECT * FROM users WHERE clerkId = ?',
        args: [userId],
      });

      if (!result.rows || result.rows.length === 0) {
        await clerkClient.sessions.revokeSession(userId);
        return NextResponse.json({
          message: 'User not in database. User Clerk session signed out.',
        });
      }

      const signedInUser = result.rows[0];
      return NextResponse.json({ signedInUser }, { status: 200 });
    } catch (error) {
      console.error('Error in login endpoint:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: `No active session found ${console.log(userId)}` },
      { status: 400 }
    );
  }
}
