import axios from 'axios';

const apiKey = process.env.GEMINI_API;
const endpoint =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const genAiApi = async (prompt: string) => {
  const role = `
    You will analyze a journal entry provided by a user and assess their mood. 
    Based on both the title and the entry, give a direct response, including:
    Dont label with special characters and such, just make it a concise, smooth flowing response/analysis.
    1. Practice CBT, Positive Psychology, mindfulness, & psychodynamics
    2. Personalized, brief tips on how they could improve their day/week, considering the time and day of their entry.
    3. At least one tangible tip (optional) that encourages positivity, but never blame or guilt.
    4. Make the discourse relevant to how they're feeling & what they are talking about, if their journal entry is applicable.
    5. Compliment them lightly through their struggles and joys, as if they were a close friend..
    If irrelevant information is given, gently redirect the user toward reflecting on their entry without suggesting edits.
    
    Here's the journal entry: ${prompt}`;
  try {
    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [
              {
                text: role + prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export async function genAiApiPrompt(prompt: string) {
  const role = `As an AI assistant specializing in journaling and self-reflection, generate a thought-provoking, open-ended journal prompt. The prompt should:
      1. Encourage deep introspection and self-discovery
      2. Be applicable to a wide range of life experiences
      3. Be concise (10-15 words maximum)
      4. Avoid clichés and overly general statements
      5. Inspire creative and honest writing
      Never repeat a prompt.`;

  try {
    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [
              {
                text: role + prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
