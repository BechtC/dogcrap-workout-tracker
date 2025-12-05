import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMusclesForPlan } from '../utils/exercises';
import { getTemplatesForPlan } from '../utils/workoutTemplates';
import WorkoutSession from './WorkoutSession';

const NewWorkout = () => {
  const { createWorkout, getLastWorkout, currentUser } = useApp();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    plan: 'A',
    template: '',
    notes: ''
  });
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const muscles = getMusclesForPlan(formData.plan);
  const lastWorkout = getLastWorkout(formData.plan);
  const availableTemplates = getTemplatesForPlan(formData.plan);

  const handleStartWorkout = () => {
    const workout = createWorkout(formData);
    setWorkoutStarted(true);
  };

  if (workoutStarted) {
    return <WorkoutSession />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Start New Workout</h2>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Workout Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Plan Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Training Plan
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setFormData({ ...formData, plan: 'A', template: '' })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.plan === 'A'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
              }`}
            >
              <div className="font-bold text-lg mb-2">Plan A</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Upper Body Focus
              </div>
            </button>

            <button
              onClick={() => setFormData({ ...formData, plan: 'B', template: '' })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.plan === 'B'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
              }`}
            >
              <div className="font-bold text-lg mb-2">Plan B</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Legs & Arms Focus
              </div>
            </button>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Workout Template (Optional)
          </label>
          <select
            value={formData.template}
            onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">No Template (Free Workout)</option>
            {availableTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
          {formData.template && (
            <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg text-sm">
              <div className="font-medium text-purple-800 dark:text-purple-300 mb-1">
                📋 Template Preview
              </div>
              <div className="text-purple-700 dark:text-purple-400">
                {availableTemplates.find(t => t.id === formData.template)?.exerciseCount} exercises pre-selected
              </div>
            </div>
          )}
        </div>

        {/* Muscle Groups Preview */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Muscle Groups for Plan {formData.plan}:
          </div>
          <div className="flex flex-wrap gap-2">
            {muscles.map((muscle) => (
              <span
                key={muscle}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.plan === 'A'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Last Workout Reference */}
        {lastWorkout && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 dark:text-yellow-400">💡</span>
              <div className="flex-1">
                <div className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                  Last Plan {formData.plan} Workout
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-400">
                  {new Date(lastWorkout.date).toLocaleDateString('de-DE')} - {' '}
                  {lastWorkout.exercises?.length || 0} exercises completed
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="How are you feeling? Any goals for today?"
            maxLength={500}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {formData.notes.length}/500
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartWorkout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Start Workout →
        </button>
      </div>

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="font-medium text-blue-800 dark:text-blue-300 mb-2">💪 Rest-Pause Training Tips</div>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Work to failure on first mini-set</li>
          <li>• Rest for 15 deep breaths (~45 seconds)</li>
          <li>• Repeat for 2-4 total mini-sets</li>
          <li>• Track each mini-set weight and reps accurately</li>
        </ul>
      </div>
    </div>
  );
};

export default NewWorkout;
