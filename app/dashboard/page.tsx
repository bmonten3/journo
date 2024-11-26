'use client';

import { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import SidePanel from '../components/SidePanel/SidePanel';
import MobileNav from '@/app/components/MobileNav/MobileNav';
import TailwindLoader from '../components/Custom/TailwindLoader';

// Lazy load components with Next.js dynamic imports
const JournalEntry = dynamic(
  () => import('../components/JournalEntry/JournalEntry'),
  {
    ssr: false,
    loading: () => <TailwindLoader />,
  }
);
const GenAiAgent = dynamic(
  () => import('../components/GenAiAgent/GenAiAgent'),
  {
    ssr: false,
    loading: () => <TailwindLoader />,
  }
);
const PomodoroTimer = dynamic(
  () => import('../components/GoalsTracker/GoalsTracker'),
  {
    ssr: false,
    loading: () => <TailwindLoader />,
  }
);
const HabitTracker = dynamic(
  () => import('../components/HabitTracker/HabitTracker'),
  {
    ssr: false,
    loading: () => <TailwindLoader />,
  }
);
const MoodTracker = dynamic(
  () => import('../components/MoodTracker/MoodTracker'),
  {
    ssr: false,
    loading: () => <TailwindLoader />,
  }
);

export default function Dashboard() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState('');
  const [isMoodTrackerVisible, setIsMoodTrackerVisible] = useState(false);

  const handleMoodSubmit = (mood: number) => {
    console.log(`Mood saved: ${mood}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-zinc-100">
      {/* Top Navbar */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-700/50 bg-zinc-900/60 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="font-medium truncate text-zinc-200">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMoodTrackerVisible(true)}
            className="px-4 py-2 bg-emerald-600/80 text-white rounded-lg hover:bg-emerald-500 
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 
            transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log Mood
          </button>
          <UserButton />
        </div>
      </div>

      {/* Mood Tracker Modal */}
      {isMoodTrackerVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/60 backdrop-blur-sm">
          <MoodTracker
            onClose={() => setIsMoodTrackerVisible(false)}
            onMoodSubmit={handleMoodSubmit}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden flex-grow overflow-auto p-4 space-y-4 pb-24">
          <JournalEntry setPrompt={setPrompt} />
          <GenAiAgent prompt={prompt} />
          <PomodoroTimer />
          <HabitTracker />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-grow">
          <div className="w-64 flex-shrink-0 bg-zinc-800/40 border-r border-zinc-700/30">
            <SidePanel />
          </div>
          <div className="flex-grow p-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
            <JournalEntry setPrompt={setPrompt} />
            <GenAiAgent prompt={prompt} />
            <PomodoroTimer />
            <HabitTracker />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-800/60 border-t border-zinc-700/50 z-50">
        <MobileNav />
      </div>
    </div>
  );
}
