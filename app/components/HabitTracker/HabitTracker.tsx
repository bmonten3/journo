import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

// Types
type Habit = {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompleted?: Date;
};

// Hooks
const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Meditate for 10 minutes',
      frequency: 'daily',
      streak: 0,
    },
    {
      id: '2',
      name: 'Read a Book',
      description: 'Read 30 minutes',
      frequency: 'daily',
      streak: 0,
    },
    {
      id: '3',
      name: 'Weekly Review',
      description: 'Reflect on the past week',
      frequency: 'weekly',
      streak: 0,
    },
  ]);

  const completeHabit = (habitId: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            streak: habit.streak + 1,
            lastCompleted: new Date(),
          };
        }
        return habit;
      })
    );
  };

  const resetHabit = (habitId: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            streak: 0,
          };
        }
        return habit;
      })
    );
  };

  const addNewHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]);
  };

  return { habits, completeHabit, resetHabit, addNewHabit };
};

const HabitList: React.FC<{
  habits: Habit[];
  completeHabit: (id: string) => void;
  resetHabit: (id: string) => void;
}> = ({ habits, completeHabit, resetHabit }) => (
  <div className="space-y-4">
    {habits.map((habit) => (
      <div
        key={habit.id}
        className="flex items-center justify-between bg-zinc-900 p-4 rounded-lg"
      >
        <div>
          <h3 className="font-semibold text-zinc-100">{habit.name}</h3>
          <p className="text-zinc-400 text-sm">{habit.description}</p>
          <span className="text-xs text-zinc-500">
            {habit.frequency === 'daily' ? 'Daily' : 'Weekly'} | Streak:{' '}
            {habit.streak}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => completeHabit(habit.id)}
            className="text-emerald-500 hover:text-emerald-400 transition"
          >
            <CheckCircle2 />
          </button>
          <button
            onClick={() => resetHabit(habit.id)}
            className="text-red-500 hover:text-red-400 transition"
          >
            <RotateCcw />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const HabitForm: React.FC<{ addNewHabit: (habit: Habit) => void }> = ({
  addNewHabit,
}) => {
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    frequency: 'daily' as 'daily' | 'weekly',
  });

  const handleSubmit = () => {
    if (newHabit.name.trim() === '') return;

    const habitToAdd: Habit = {
      id: (Math.random() * 1000).toString(), // Generating a random ID for simplicity
      ...newHabit,
      streak: 0,
    };

    addNewHabit(habitToAdd);
    setNewHabit({ name: '', description: '', frequency: 'daily' });
  };

  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Habit Name"
        value={newHabit.name}
        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
        className="bg-zinc-700/50 text-zinc-100 rounded-lg p-2 col-span-1"
      />
      <input
        type="text"
        placeholder="Description"
        value={newHabit.description}
        onChange={(e) =>
          setNewHabit({ ...newHabit, description: e.target.value })
        }
        className="bg-zinc-700/50 text-zinc-100 rounded-lg p-2 col-span-1"
      />
      <select
        value={newHabit.frequency}
        onChange={(e) =>
          setNewHabit({
            ...newHabit,
            frequency: e.target.value as 'daily' | 'weekly',
          })
        }
        className="bg-zinc-700/50 text-zinc-100 rounded-lg p-2 col-span-1"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button
        onClick={handleSubmit}
        className="col-span-3 bg-emerald-600/80 text-white rounded-lg p-2 hover:bg-emerald-500 transition"
      >
        Add Habit
      </button>
    </div>
  );
};

const HabitTracker: React.FC = () => {
  const { habits, completeHabit, resetHabit, addNewHabit } = useHabits();

  return (
    <div className="bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/30 h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-zinc-100">Habit Tracker</h2>

      {/* New Habit Input */}
      <HabitForm addNewHabit={addNewHabit} />

      {/* Habit List */}
      <HabitList
        habits={habits}
        completeHabit={completeHabit}
        resetHabit={resetHabit}
      />
    </div>
  );
};

export default HabitTracker;
