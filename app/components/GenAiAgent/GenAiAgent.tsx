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
    <div className="bg-zinc-800/30 p-6 rounded-lg shadow-lg border border-zinc-700/50 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
        <MessageSquare className="text-emerald-400" size={24} />
        I'm not a therapist but...
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <Loader className="animate-spin text-emerald-500" size={28} />
        </div>
      ) : response ? (
        <div className="bg-zinc-900 p-4 rounded-md shadow-inner border border-zinc-600 mt-4">
          <p className="text-zinc-300">{response}</p>
        </div>
      ) : (
        <p className="text-zinc-400 italic mt-4">
          Tell me about your day or mood. I'm all ears.
        </p>
      )}
    </div>
  );
};

export default GenAiAgent;
