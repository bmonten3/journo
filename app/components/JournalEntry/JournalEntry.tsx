'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [isEditingContent, setIsEditingContent] = useState(false); // Track content editing
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (!isEditingContent) {
      setIsEditingContent(true); // Mark content as being edited
    }
  };

  const handleOnCancel = () => {
    setContent('');
    setTitle('Journal Entry Title');
    setIsEditingTitle(false);
    setGeneratedSuggestion('');
    setIsEditingContent(false); // Reset content editing state
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
        background: '#3f3f46',
        color: '#d4d4d8',
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
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.select();
      }
    }, 0);
  };

  // Only show the buttons when the user is editing content
  const showButtons = isEditingContent || content !== ''; // If the content has changed or the user is editing

  return (
    <div className="space-y-4 bg-zinc-800/30 p-6 rounded-xl shadow-xl border border-zinc-700/50 backdrop-blur-sm">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-emerald-400 font-bold flex justify-center items-center">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              name="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="bg-transparent text-emerald-400 border-b border-emerald-500 focus:outline-none focus:ring-0"
              autoFocus
            />
          ) : (
            <span onClick={handleTitleEditClick}>{title}</span>
          )}
          <Pencil
            className="ml-3 cursor-pointer text-zinc-400 hover:text-emerald-500"
            size={24}
            onClick={handleTitleEditClick}
          />
        </h1>
      </div>
      <div className="space-y-3">
        <GeneratePrompt setGeneratedSuggestion={setGeneratedSuggestion} />
        {generatedSuggestion && (
          <p className="text-zinc-400 text-center italic text-sm mt-2">
            {generatedSuggestion}
          </p>
        )}
      </div>
      <textarea
        ref={textareaRef}
        name="content"
        value={content}
        onChange={handleInput}
        placeholder="Write your journal entry here..."
        className="w-full h-64 px-4 py-2 rounded-md resize-none text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200 bg-zinc-900/80 border-none"
      />
      {/* Conditionally render buttons */}
      {showButtons && (
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-red-600/80 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 flex items-center"
            onClick={handleOnCancel}
          >
            <X className="mr-2" size={18} />
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-emerald-600/80 text-white rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200 flex items-center"
            onClick={handleOnSave}
          >
            <Save className="mr-2" size={18} />
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default JournalEntry;
