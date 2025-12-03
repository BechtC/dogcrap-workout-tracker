import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMusclesForPlan } from '../utils/exercises';
import WorkoutSession from './WorkoutSession';

const NewWorkout = () => {
  const { createWorkout, getLastWorkout, currentUser } = useApp();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    plan: 'A',
    notes: ''
  });
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const muscles = getMusclesForPlan(formData.plan);
  const lastWorkout = getLastWorkout(formData.plan);

  const handleStartWorkout = () => {
    const workout = createWorkout(formData);
    setWorkoutStarted(true);
  };

  if (workoutStarted) {
    return <WorkoutSession />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Start New Workout</h2>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Plan Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Training Plan
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setFormData({ ...formData, plan: 'A' })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.plan === 'A'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-bold text-lg mb-2">Plan A</div>
              <div className="text-sm text-gray-600">
                Upper Body Focus
              </div>
            </button>

            <button
              onClick={() => setFormData({ ...formData, plan: 'B' })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.plan === 'B'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-bold text-lg mb-2">Plan B</div>
              <div className="text-sm text-gray-600">
                Legs & Arms Focus
              </div>
            </button>
          </div>
        </div>

        {/* Muscle Groups Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">
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
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <div className="flex-1">
                <div className="font-medium text-yellow-800 mb-1">
                  Last Plan {formData.plan} Workout
                </div>
                <div className="text-sm text-yellow-700">
                  {new Date(lastWorkout.date).toLocaleDateString('de-DE')} - {' '}
                  {lastWorkout.exercises?.length || 0} exercises completed
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="How are you feeling? Any goals for today?"
            maxLength={500}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
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
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="font-medium text-blue-800 mb-2">💪 Rest-Pause Training Tips</div>
        <ul className="text-sm text-blue-700 space-y-1">
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
