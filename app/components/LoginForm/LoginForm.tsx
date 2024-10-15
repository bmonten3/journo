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
        // Handle incomplete status (e.g., 2FA required)
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
          message: 'Invalid username and/or password. Please  try again.',
        }));
      }
      console.error('Error during sign in/up:', err);
    }
  };

  return (
    <section className=" bg-gray-900">
      <div
        className={`container flex items-center justify-center min-h-screen px-6 mx-auto transition-all duration-500 ease-in-out transform ${
          fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <form onSubmit={handleFormSubmit} className="w-full max-w-md">
          {formState.message && (
            <div className="bg-red-800 text-red-200 border border-red-600 rounded p-2 mb-4 text-center">
              {formState.message}
            </div>
          )}
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <a
              onClick={() => toggleView()}
              className={`cursor-pointer w-1/3 pb-4 font-medium text-center capitalize border-b ${
                isSignIn
                  ? 'border-blue-500 text-gray-800 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 dark:border-gray-400'
              }`}
            >
              Sign In
            </a>
            <a
              onClick={() => toggleView()}
              className={`cursor-pointer w-1/3 pb-4 font-medium text-center capitalize border-b ${
                !isSignIn
                  ? 'border-blue-500 text-gray-800 dark:text-white'
                  : 'text-gray-500 dark:text-gray-300 dark:border-gray-400'
              }`}
            >
              Sign Up
            </a>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              name="username"
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
            />
          </div>
          {formState.zodErrors.username && (
            <p className="text-red-500 text-sm text-center mt-3 -mb-3">
              {formState.zodErrors.username[0]}
            </p>
          )}

          {!isSignIn && (
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                name="email"
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>
          )}
          {formState.zodErrors.email && (
            <p className="text-red-500 text-sm text-center mt-3 -mb-3">
              {formState.zodErrors.email[0]}
            </p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              name="password"
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>
          {formState.zodErrors.password && (
            <p className="text-red-500 text-sm  text-center mt-3 -mb-3">
              {formState.zodErrors.password[0]}
            </p>
          )}

          {errors.length > 0 && (
            <ul className="mt-2 text-red-500">
              {errors.map((error) => (
                <li key={error.code}>{error.message}</li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <Submit label={isSignIn ? 'Sign In' : 'Sign Up'} />

            <div className="mt-6 text-center ">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleView();
                }}
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
