import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

export const schemaCreateJournalEntry = z.object({
  title: z
    .string()
    .min(1, { message: 'Title must be at least 1 character.' })
    .max(35, {
      message: 'Title must be between 1 and 35 characters',
    }),
  content: z
    .string()
    .min(1, { message: 'Journal Entry must be at least 1 word.' }),
});

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export const createJournalEntry = async (
  journal_title: string,
  journal_content: string
) => {
  const validatedFields = schemaCreateJournalEntry.safeParse({
    title: journal_title,
    content: journal_content,
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { title, content } = validatedFields.data;

  try {
    const response = await fetch(`${NEXT_PUBLIC_URL}/api/journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.error || 'Journal Entry failed to save',
      };
    }
    return response;
  } catch (error) {
    console.error('Save error:', error);
    return {
      error: 'An unexpected error occurred during journal entry save',
    };
  }
};
