'use client';

import React, { useState } from 'react';
import { genAiApiPrompt } from '@/lib/genAiApi';
import { Sparkles, Loader } from 'lucide-react';

interface GeneratePromptProps {
  setGeneratedSuggestion: (suggestion: string) => void; // Updated prop to pass suggestion back to parent
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
      setGeneratedSuggestion(generatedPrompt); // Pass generated prompt back to parent
    } catch (error) {
      console.error('Error generating prompt:', error);
      setGeneratedSuggestion('Could not generate a suggestion, try again.'); // Provide feedback on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePrompt}
      disabled={isLoading}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center w-full"
    >
      {isLoading ? (
        <Loader className="animate-spin mr-2" size={18} />
      ) : (
        <Sparkles className="mr-2" size={18} />
      )}
      {isLoading ? 'Generating...' : 'Generate Prompt'}
    </button>
  );
};

export default GeneratePrompt;
