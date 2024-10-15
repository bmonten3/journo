import { SignIn, useClerk } from '@clerk/nextjs';
import { schemaRegisterUser, schemaSignInUser } from './auth';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export const registerUser = async (
  formData: FormData,
  signUp: any,
  setActive: any
) => {
  const validatedFields = schemaRegisterUser.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields',
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const result = await signUp.create({
      username,
      password,
    });

    if (result.status === 'complete') {
      // After successful Clerk registration, store user in your local DB
      const response = await fetch(`${NEXT_PUBLIC_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          clerkId: result.createdUserId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed in local DB');
      }

      return result;
    } else {
      // Handle incomplete status (e.g., email verification needed)
      return {
        status: 'incomplete',
        message:
          'Please check your email to complete the registration process.',
      };
    }
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      return {
        error:
          error.message || 'An unexpected error occurred during registration',
      };
    }
    return {
      error: 'An unexpected error occurred during registration',
    };
  }
};

export const signInUser = async (
  formData: FormData,
  signIn: any,
  setActive: any
) => {
  const validatedFields = schemaSignInUser.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields',
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const result = await signIn.create({
      identifier: username,
      password,
    });
    if (result.status === 'complete') {
      setActive({ session: result.createdSessionId });
      // Check if user exists in local database
      const response = await fetch(`${NEXT_PUBLIC_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: result,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            error: 'User not found in local database. Please contact support.',
          };
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed in local DB');
        }
      }

      const userData = await response.json();
      return { ...result, localUser: userData.user };
    } else {
      // Handle incomplete status (e.g., 2FA required)
      return {
        status: 'incomplete',
        message: 'Additional verification required. Please check your email.',
      };
    }
  } catch (error) {
    console.error('Sign In error:', error);
    if (error instanceof Error) {
      return {
        error: error.message || 'An unexpected error occurred during sign in',
      };
    }
    return {
      error: 'An unexpected error occurred during sign in',
    };
  }
};
