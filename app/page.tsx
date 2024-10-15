import { auth } from '@clerk/nextjs/server';

import Link from 'next/link';

export default async function LandingPage() {
  const { userId } = auth();

  let href = userId ? '/dashboard' : '/get-started';
  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col h-screen">
      <header className="bg-gradient-to-r from-purple-600 to-blue-700 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Journo</h1>
          <div>
            <Link
              href={href}
              className="text-white font-semibold px-3 py-1 hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              href={href}
              className="bg-gray-800 text-blue-400 px-3 py-1 rounded-md font-semibold shadow-lg hover:bg-gray-700 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          Your Daily Journaling Companion
        </h2>
        <p className="text-gray-400 mb-6 text-base md:text-lg max-w-xs md:max-w-xl mx-auto">
          Capture your thoughts, track your progress, and improve your mental
          clarity. Start journaling with Journo, an accessible way to decompress
          & receive valuable feedback from scholarly sources.
        </p>
        <Link
          href={href}
          className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-semibold hover:bg-purple-500 transition duration-200"
        >
          Get Started
        </Link>
        <br></br>
        <p className="text-gray-400 italic  mb-6 text-base md:text-lg max-w-xs md:max-w-xl mx-auto">
          Powered by Gemini from Google.
        </p>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Journo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
