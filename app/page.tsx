import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function LandingPage() {
  const { userId } = auth();
  let href = userId ? '/dashboard' : '/get-started';

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-zinc-100">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-700/50 bg-zinc-900/60 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-200">
            Journo
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={href}
            className="text-white font-semibold px-3 py-1 hover:text-gray-300"
          >
            Login
          </Link>
          <Link
            href={href}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-500 transition duration-200"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Your Daily Journaling Companion
        </h2>
        <p className="text-zinc-400 mb-6 text-base md:text-lg max-w-xs md:max-w-xl mx-auto">
          Capture your thoughts, track your progress, and improve your mental
          clarity. Start journaling with Journo, an accessible way to decompress
          & receive valuable feedback from scholarly sources.
        </p>
        <Link
          href={href}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-500 transition duration-200"
        >
          Get Started
        </Link>
        <p className="text-zinc-400 italic mt-4 text-base md:text-lg max-w-xs md:max-w-xl mx-auto">
          Powered by Gemini from Google.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-800 text-zinc-300 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Journo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
