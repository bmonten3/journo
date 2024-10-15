'use client';
import JournalEntry from '../components/JournalEntry/JournalEntry';
import SidePanel from '../components/SidePanel/SidePanel';
import React, { useState } from 'react';
import GenAiAgent from '../components/GenAiAgent/GenAiAgent';
import Logo from '../components/Logo/Logo';
import MoodTracker from '../components/MoodTracker/MoodTracker';
import MobileNav from '@/app/components/MobileNav/MobileNav';
import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState('');
  const [isMoodTrackerVisible, setIsMoodTrackerVisible] = useState(false);

  const handleMoodSubmit = (mood: number) => {
    console.log(`Mood saved: ${mood}`); // Here you would typically save the mood to your database
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header with Logo */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <UserButton />
          <span className="ml-4 font-medium truncate text-white">
            {user?.username}
          </span>
        </div>
        <button
          onClick={() => setIsMoodTrackerVisible(true)}
          className="md:hidden px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
        >
          Log Mood
        </button>
        <button
          onClick={() => setIsMoodTrackerVisible(true)}
          className="hidden md:block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
        >
          Log Mood
        </button>
      </div>

      {/* Mood Tracker Modal */}
      {isMoodTrackerVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-gray-800 bg-opacity-75">
          <MoodTracker
            onClose={() => setIsMoodTrackerVisible(false)}
            onMoodSubmit={handleMoodSubmit}
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Main content area for mobile */}
        <div className="flex-grow overflow-auto p-4 space-y-4 md:hidden">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <JournalEntry setPrompt={setPrompt} />
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <GenAiAgent prompt={prompt} />
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <PomodoroTimer />
            </div>
          </div>
        </div>

        {/* SidePanel for larger screens */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <SidePanel />
        </div>

        {/* Main content area for larger screens */}
        <div className="sm:hidden md:flex p-4 space-x-4 flex-grow">
          <div className="grid grid-cols-1 lg:grid-flow-row lg:h-full 2xl:w-1/2 lg:w-full m:w-full gap-3">
            <div className="bg-gray-800 rounded-lg shadow-xl p-2 ">
              <JournalEntry setPrompt={setPrompt} />
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl p-2 ">
              <GenAiAgent prompt={prompt} />
            </div>
          </div>
          <div className="w-80 ">
            <PomodoroTimer />
          </div>
        </div>
      </div>

      {/* Bottom Navigation (MobileNav is hidden on larger screens) */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
