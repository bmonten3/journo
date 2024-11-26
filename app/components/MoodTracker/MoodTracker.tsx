import React, { useState } from 'react';
import { Smile, Meh, Frown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createMoodEntry } from '@/lib/actions/moodActions';
import { useRouter } from 'next/navigation';

interface MoodTrackerProps {
  onClose: () => void;
  onMoodSubmit: (mood: number) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onClose, onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number>(50);
  const router = useRouter();

  const handleSave = async () => {
    const moodName = getMoodName();

    onMoodSubmit(selectedMood);

    toast('Current mood saved!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        marginBottom: '1.4rem',
        background: '#3f3f46',
        color: '#d4d4d8',
      },
    });

    try {
      let result;
      result = await createMoodEntry(moodName, selectedMood);

      if (result) {
        console.log('mood updated!');
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Save error:', error);
      return {
        error: 'An unexpected error occurred during mood entry save',
      };
    }
    onClose();
  };

  const getMoodName = () => {
    if (selectedMood >= 80) return 'Great';
    if (selectedMood >= 60) return 'Content';
    if (selectedMood >= 40) return 'Neutral';
    if (selectedMood >= 20) return 'Subpar';
    return 'Awful';
  };

  const getMoodIcon = () => {
    if (selectedMood >= 80)
      return <ThumbsUp className="text-emerald-500" size={36} />;
    if (selectedMood >= 60)
      return <Smile className="text-blue-500" size={36} />;
    if (selectedMood >= 40)
      return <Meh className="text-yellow-500" size={36} />;
    if (selectedMood >= 20)
      return <Frown className="text-orange-500" size={36} />;
    return <ThumbsDown className="text-red-500" size={36} />;
  };

  return (
    <div className="bg-zinc-800/60 rounded-xl shadow-xl p-6 max-w-lg mx-auto w-full border border-zinc-700/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4 text-center">
        How are we feeling right now?
      </h2>
      <div className="flex justify-center mb-4">{getMoodIcon()}</div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={selectedMood}
        onChange={(e) => setSelectedMood(Number(e.target.value))}
        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-zinc-300 text-sm mt-4">
        <span>Awful</span>
        <span>Great</span>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-emerald-600/80 text-white rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-200 flex items-center"
        >
          Save Mood
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
