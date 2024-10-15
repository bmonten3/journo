'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Coffee } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      if (!isBreak) {
        // Work session completed
        setSessionsCompleted((sessions) => sessions + 1);
        if (sessionsCompleted === 3) {
          // Long break after 4 work sessions
          setTime(15 * 60); // 15 minutes long break
          setSessionsCompleted(0);
        } else {
          setTime(5 * 60); // 5 minutes short break
        }
        setIsBreak(true);
      } else {
        // Break completed, start new work session
        setTime(25 * 60);
        setIsBreak(false);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, sessionsCompleted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setIsBreak(false);
    setSessionsCompleted(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center h-full">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4">
        Pomodoro Timer
      </h2>
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <div
          className={`text-6xl font-bold ${isBreak ? 'text-green-400' : 'text-red-400'}`}
        >
          {formatTime(time)}
        </div>
        <div className="text-xl text-gray-300">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={toggleTimer}
            className={`p-3 rounded-full ${
              isActive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500`}
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center space-x-2">
        <Coffee size={24} className="text-yellow-500" />
        <span className="text-gray-300">Sessions: {sessionsCompleted}/4</span>
      </div>
    </div>
  );
};

export default PomodoroTimer;
