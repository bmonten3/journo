'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth, useSignIn, useSignUp } from '@clerk/nextjs';
import Submit from '../Submit/Submit';
import { useRouter } from 'next/navigation';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { registerUser, signInUser } from '@/lib/actions/userActions';
import { ZodError } from 'zod';

const LoginForm = () => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const [formState, setFormState] = useState({
    error: null as string | null,
    zodErrors: {} as Record<string, string[]>,
    message: '',
  });
  const {
    signIn,
    isLoaded: isSignInLoaded,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    signUp,
    isLoaded: isSignUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();

  const toggleView = () => {
    setFadeIn(false);
    setTimeout(() => {
      setIsSignIn((prevState) => !prevState);
      setFormState({ error: null, zodErrors: {}, message: '' });
      setErrors([]);
      setFadeIn(true);
    }, 300);
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setFormState({ error: null, zodErrors: {}, message: '' });

    const formData = new FormData(event.currentTarget);

    try {
      let result;
      if (isSignIn) {
        if (!signIn) throw new Error('Sign-in is not available');
        result = await signInUser(formData, signIn, setSignInActive);
      } else {
        if (!signUp) throw new Error('Sign-up is not available');
        result = await registerUser(formData, signUp, setSignUpActive);
      }

      if (result.status === 'complete') {
        if (isSignIn && setSignInActive) {
          await setSignInActive({ session: result.createdSessionId });
        } else if (!isSignIn && setSignUpActive) {
          await setSignUpActive({ session: result.createdSessionId });
        }

        router.replace('/dashboard');
      } else if (result.zodErrors) {
        setFormState((prevState) => ({
          ...prevState,
          zodErrors: result.zodErrors,
          message:
            result.message || 'Validation failed. Please check the form.',
        }));
      } else if (result.error) {
        setFormState((prevState) => ({
          ...prevState,
          error: result.error,
          message: 'An error occurred. Please check credentials and try again.',
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          message: 'Additional verification required. Please try again.',
        }));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
        setFormState((prevState) => ({
          ...prevState,
          message: 'An error occurred. Please check the form for errors.',
        }));
      } else if (err instanceof ZodError) {
        setFormState((prevState) => ({
          ...prevState,
          zodErrors: err.flatten().fieldErrors as Record<string, string[]>,
          message: 'Validation failed. Please check the form.',
        }));
      } else if (err instanceof Error) {
        setFormState((prevState) => ({
          ...prevState,
          error: err.message,
          message: 'Invalid username and/or password. Please try again.',
        }));
      }
      console.error('Error during sign in/up:', err);
    }
  };

  return (
    <section className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-zinc-100">
      <div
        className={`container flex items-center justify-center min-h-screen px-6 mx-auto transition-all duration-500 ease-in-out transform ${
          fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-zinc-900/80 p-8 rounded-lg shadow-lg border border-zinc-700/30"
        >
          {formState.message && (
            <div className="bg-red-800 text-red-200 border border-red-600 rounded p-2 mb-4 text-center">
              {formState.message}
            </div>
          )}
          <div className="flex justify-center mx-auto mb-6">
            <img
              className="w-auto h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="logo"
            />
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <a
              onClick={() => toggleView()}
              className={`cursor-pointer w-1/3 pb-4 font-medium text-center capitalize border-b ${
                isSignIn
                  ? 'border-blue-500 text-zinc-200'
                  : 'text-zinc-400 dark:text-zinc-300 dark:border-zinc-500'
              }`}
            >
              Sign In
            </a>
            <a
              onClick={() => toggleView()}
              className={`cursor-pointer w-1/3 pb-4 font-medium text-center capitalize border-b ${
                !isSignIn
                  ? 'border-blue-500 text-zinc-200'
                  : 'text-zinc-400 dark:text-zinc-300 dark:border-zinc-500'
              }`}
            >
              Sign Up
            </a>
          </div>

          <div className="relative flex items-center mt-6">
            <input
              name="username"
              type="text"
              className="block w-full py-3 text-zinc-700 bg-white border rounded-lg px-4 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none"
              placeholder="Username"
            />
          </div>
          {formState.zodErrors.username && (
            <p className="text-red-500 text-sm text-center mt-3">
              {formState.zodErrors.username[0]}
            </p>
          )}

          {!isSignIn && (
            <div className="relative flex items-center mt-6">
              <input
                name="email"
                type="email"
                className="block w-full py-3 text-zinc-700 bg-white border rounded-lg px-4 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none"
                placeholder="Email"
              />
            </div>
          )}
          <div className="relative flex items-center mt-6">
            <input
              name="password"
              type="password"
              className="block w-full py-3 text-zinc-700 bg-white border rounded-lg px-4 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-300 focus:outline-none"
              placeholder="Password"
            />
          </div>

          {formState.zodErrors.password && (
            <p className="text-red-500 text-sm text-center mt-3">
              {formState.zodErrors.password[0]}
            </p>
          )}
          <div className="py-4 mt-2">
            <Submit label={isSignIn ? 'Sign In' : 'Sign Up'} />
          </div>

          <div className="text-center mt-4 text-sm text-zinc-300">
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleView}
              className="text-blue-500 hover:underline"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
