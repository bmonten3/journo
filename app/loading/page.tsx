'use server';

import { db } from '@/db/db';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function validateUserAndSignIn() {
  const user = await currentUser();
  revalidatePath('/loading');
  console.log(user?.username);
  if (user) {
    // Check if the user exists in your local database
    const match = await db.execute({
      sql: 'SELECT clerkId FROM users WHERE clerkId = ?',
      args: [user.id], // Check uniqueness based on Clerk's user ID
    });

    if (match) {
      // Redirect to dashboard if the user exists in the database
      redirect('/dashboard');
    } else {
      console.log('User does not exist in the database');
    }
  } else {
    console.log('User is not signed in');
  }
}

const Loading = async () => {
  // Call the function to validate user and potentially redirect
  await validateUserAndSignIn();

  // Return a loading state if no redirection happened
  return <div>loading...</div>;
};

export default Loading;
