'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Pencil, Save, X } from 'lucide-react';
import GeneratePrompt from '../Prompts/Prompts';
import { createJournalEntry } from '@/lib/actions/journalActions';
import { useRouter } from 'next/navigation';

interface JournalEntryProps {
  setPrompt: (value: string) => void;
}

function JournalEntry({ setPrompt }: JournalEntryProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Journal Entry Title');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [generatedSuggestion, setGeneratedSuggestion] = useState('');
  const router = useRouter();
  // Create a reference for the textarea and the title input
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleOnCancel = () => {
    setContent('');
    setTitle('Journal Entry Title');
    setIsEditingTitle(false);
    setGeneratedSuggestion('');
  };

  const handleOnSave = async () => {
    const now = new Date();
    const timeString = now.toString();
    const entry = content;
    setPrompt(
      `Title: "${title}" - Journal Entry: "${entry}" - Today's date and time: ${timeString}`
    );

    toast('Proud of you!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        marginBottom: '1.4rem',
        background: '#4B5563',
        color: '#F3F4F6',
      },
    });
    setIsEditingTitle(false);

    try {
      let result;

      result = await createJournalEntry(title, content);

      if (result) {
        console.log('journals updated!');
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Save error:', error);
      return {
        error: 'An unexpected error occurred during journal entry save',
      };
    }
  };

  const handleTitleEditClick = () => {
    setIsEditingTitle(true);
    // Set a timeout to focus and select text in the title input
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.select(); // Select the input content
      }
    }, 0);
  };

  return (
    <div className="space-y-4 bg-gray-800 p-1 rounded-lg shadow-lg">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-indigo-300 font-bold flex justify-center items-center">
          {isEditingTitle ? (
            <input
              ref={titleInputRef} // Attach the ref to the title input
              name="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => setIsEditingTitle(false)} // Exit editing mode on blur
              className="bg-transparent text-indigo-300 border-b border-indigo-500 focus:outline-none focus:ring-0"
              autoFocus
            />
          ) : (
            <span onClick={handleTitleEditClick}>{title}</span> // Handle title edit click
          )}
          <Pencil
            className="ml-3 cursor-pointer"
            size={24}
            onClick={handleTitleEditClick} // Edit title on click
          />
        </h1>
      </div>
      <div className="space-y-3">
        <GeneratePrompt setGeneratedSuggestion={setGeneratedSuggestion} />
        {generatedSuggestion && (
          <p className="text-gray-400 text-center italic text-sm mt-2">
            {generatedSuggestion}
          </p>
        )}
      </div>
      <textarea
        ref={textareaRef}
        name="content" // Attach the ref to the textarea
        value={content}
        onChange={handleInput}
        placeholder="Write your journal entry here..."
        className="w-full h-64 px-4 py-2 rounded-md resize-none text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        style={{
          border: 'none',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#1F2937',
        }}
      />
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 flex items-center"
          onClick={handleOnCancel}
        >
          <X className="mr-2" size={18} />
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 flex items-center"
          onClick={handleOnSave}
        >
          <Save className="mr-2" size={18} />
          Save
        </button>
      </div>
    </div>
  );
}

export default JournalEntry;
