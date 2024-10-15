import { z } from 'zod';

export const schemaCreateJournalEntry = z.object({
  moodName: z
    .string()
    .min(1, { message: 'Name must be at least 1 character.' })
    .max(35, {
      message: 'Title must be between 1 and 35 characters',
    }),
  moodScore: z
    .number()
    .min(0, { message: 'score cannot be negative' })
    .max(100),
});

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export const createMoodEntry = async (
  mood_icon: string,
  mood_score: number
) => {
  const validatedFields = schemaCreateJournalEntry.safeParse({
    moodName: mood_icon,
    moodScore: mood_score,
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { moodName, moodScore } = validatedFields.data;

  try {
    const response = await fetch(`${NEXT_PUBLIC_URL}/api/mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moodName, moodScore }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.error || 'Mood Entry failed to save',
      };
    }
    return response;
  } catch (error) {
    console.error('Save error:', error);
    return {
      error: 'An unexpected error occurred during Mood Entry save',
    };
  }
};
