import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  CircleIcon,
  TrendingUpIcon,
  FlagIcon,
  HeartIcon,
  BookIcon,
  BriefcaseIcon,
} from 'lucide-react';

// Define types for goals
interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'Personal' | 'Professional' | 'Health' | 'Learning';
}

const GoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Meditation',
      description: 'Meditate for 15 minutes each day',
      progress: 60,
      category: 'Health',
    },
    {
      id: '2',
      title: 'Learn React',
      description: 'Complete advanced React course',
      progress: 40,
      category: 'Learning',
    },
    {
      id: '3',
      title: 'Read Books',
      description: 'Read 2 books this month',
      progress: 75,
      category: 'Personal',
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Personal' as Goal['category'],
  });

  const updateGoalProgress = (id: string, newProgress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, progress: Math.min(100, Math.max(0, newProgress)) }
          : goal
      )
    );
  };

  const addNewGoal = () => {
    if (newGoal.title.trim() && newGoal.description.trim()) {
      const goal: Goal = {
        id: (goals.length + 1).toString(),
        ...newGoal,
        progress: 0,
      };
      setGoals([...goals, goal]);
      // Reset new goal form
      setNewGoal({ title: '', description: '', category: 'Personal' });
    }
  };

  const getCategoryIcon = (category: Goal['category']) => {
    const iconClasses = 'w-5 h-5 mr-2';
    switch (category) {
      case 'Health':
        return <HeartIcon className={iconClasses} />;
      case 'Learning':
        return <BookIcon className={iconClasses} />;
      case 'Professional':
        return <BriefcaseIcon className={iconClasses} />;
      default:
        return <FlagIcon className={iconClasses} />;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-200 flex items-center">
            <TrendingUpIcon className="w-6 h-6 mr-2 text-emerald-500" />
            Goals Tracker
          </h2>
          <button
            onClick={() =>
              document
                .getElementById('new-goal-modal')
                ?.classList.remove('hidden')
            }
            className="text-emerald-500 hover:text-emerald-400 transition-colors font-medium"
          >
            + Add Goal
          </button>
        </div>

        {/* Goals List */}
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-zinc-900 rounded-lg p-4 flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(goal.category)}
                  <span className="font-medium text-zinc-200">
                    {goal.title}
                  </span>
                </div>
                <span className="text-sm text-zinc-400">{goal.progress}%</span>
              </div>
              <p className="text-sm text-zinc-400">{goal.description}</p>
              <div className="bg-zinc-700 rounded-full h-2 w-full overflow-hidden">
                <div
                  className="bg-emerald-500 rounded-full h-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    updateGoalProgress(goal.id, goal.progress - 10)
                  }
                  className="px-2 py-1 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600"
                >
                  -
                </button>
                <button
                  onClick={() =>
                    updateGoalProgress(goal.id, goal.progress + 10)
                  }
                  className="px-2 py-1 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div
          id="new-goal-modal"
          className="fixed inset-0 bg-black/70 flex items-center justify-center hidden z-50"
        >
          <div className="bg-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">
              Create New Goal
            </h3>
            <input
              type="text"
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
              className="w-full p-2 mb-3 bg-zinc-900 text-zinc-200 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Goal Description"
              value={newGoal.description}
              onChange={(e) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
              className="w-full p-2 mb-3 bg-zinc-900 text-zinc-200 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select
              value={newGoal.category}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  category: e.target.value as Goal['category'],
                })
              }
              className="w-full p-2 mb-4 bg-zinc-900 text-zinc-200 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Personal">Personal</option>
              <option value="Professional">Professional</option>
              <option value="Health">Health</option>
              <option value="Learning">Learning</option>
            </select>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  document
                    .getElementById('new-goal-modal')
                    ?.classList.add('hidden')
                }
                className="px-4 py-2 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={addNewGoal}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GoalsTracker;
