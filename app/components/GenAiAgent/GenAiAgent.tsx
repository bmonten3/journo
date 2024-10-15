'use client';
import React, { useState, useEffect } from 'react';
import { genAiApi } from '@/lib/genAiApi';
import { MessageSquare, Loader } from 'lucide-react';

interface GenAiAgentProps {
  prompt: string | null | undefined;
}

const GenAiAgent: React.FC<GenAiAgentProps> = ({ prompt }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      const fetchResponse = async () => {
        setLoading(true);

        try {
          const result = await genAiApi(prompt);
          setResponse(result);
        } catch (error) {
          console.error('Error:', error);
          setResponse('An error occurred while generating the content.');
        }

        setLoading(false);
      };

      fetchResponse();
    }
  }, [prompt]);

  return (
    <div className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-indigo-300 flex items-center">
        <MessageSquare className="mr-2" size={24} />
        I'm not a therapist but...
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-indigo-500" size={32} />
        </div>
      ) : response ? (
        <div className="bg-gray-700 rounded-md p-4 shadow-inner">
          <p className="text-gray-200 leading-relaxed">{response}</p>
        </div>
      ) : (
        <p className="text-gray-400 italic">
          Tell me about your day or mood, I'm all ears.
        </p>
      )}
    </div>
  );
};

export default GenAiAgent;
