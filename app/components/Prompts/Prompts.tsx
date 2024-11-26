'use client';
import React, { useState } from 'react';
import { genAiApiPrompt } from '@/lib/genAiApi';

interface GeneratePromptProps {
  setGeneratedSuggestion: (suggestion: string) => void;
}

const GeneratePrompt: React.FC<GeneratePromptProps> = ({
  setGeneratedSuggestion,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    setIsLoading(true);
    try {
      const prompt = ''; // Define a default or dynamic prompt if needed
      const generatedPrompt = await genAiApiPrompt(prompt);
      setGeneratedSuggestion(generatedPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setGeneratedSuggestion('Could not generate a suggestion, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 rounded-xl shadow-xl p-4 border border-zinc-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-200">
          AI Prompt Generator
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        >
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V19a2.5 2.5 0 0 1-4.96.39 2.5 2.5 0 0 1-2.48-3.14L5 10.5H4a2.5 2.5 0 0 1-2.33-3.53L6 3l3.5 1zm6.5 14h2a2.5 2.5 0 0 0 2-4l-4-4" />
        </svg>
      </div>
      <button
        onClick={handleGeneratePrompt}
        disabled={isLoading}
        className={`w-full py-3 rounded-lg text-white font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 ${
          isLoading
            ? 'bg-zinc-600 cursor-not-allowed'
            : 'bg-emerald-600/80 hover:bg-emerald-500'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V19a2.5 2.5 0 0 1-4.96.39 2.5 2.5 0 0 1-2.48-3.14L5 10.5H4a2.5 2.5 0 0 1-2.33-3.53L6 3l3.5 1zm6.5 14h2a2.5 2.5 0 0 0 2-4l-4-4" />
            </svg>
            Generate Prompt
          </div>
        )}
      </button>
    </div>
  );
};

export default GeneratePrompt;
