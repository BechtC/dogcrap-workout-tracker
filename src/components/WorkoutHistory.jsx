import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getWorkoutStats, formatDate } from '../utils/calculations';
import WorkoutDetail from './WorkoutDetail';

const WorkoutHistory = () => {
  const { workouts, setActiveWorkout, setView } = useApp();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [filterPlan, setFilterPlan] = useState('all');

  const filteredWorkouts = workouts
    .filter((w) => filterPlan === 'all' || w.plan === filterPlan)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleViewDetails = (workout) => {
    setSelectedWorkout(workout);
  };

  if (selectedWorkout) {
    return (
      <WorkoutDetail
        workout={selectedWorkout}
        onBack={() => setSelectedWorkout(null)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Workout History</h2>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPlan('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterPlan === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Plans
          </button>
          <button
            onClick={() => setFilterPlan('A')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterPlan === 'A'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Plan A
          </button>
          <button
            onClick={() => setFilterPlan('B')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterPlan === 'B'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Plan B
          </button>
        </div>
      </div>

      {/* Workouts List */}
      {filteredWorkouts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">No workouts found</p>
          <button
            onClick={() => setView('new-workout')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Your First Workout
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkouts.map((workout) => {
            const stats = getWorkoutStats(workout);
            return (
              <div
                key={workout.id}
                onClick={() => handleViewDetails(workout)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transition border-l-4"
                style={{
                  borderLeftColor: workout.plan === 'A' ? '#3b82f6' : '#22c55e'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                    workout.plan === 'A' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {workout.plan}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Volume</div>
                    <div className="font-bold text-gray-800">
                      {stats.totalVolume.toLocaleString()} kg
                    </div>
                  </div>
                </div>

                <div className="font-semibold text-gray-800 dark:text-white mb-1">
                  {formatDate(workout.date)}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Exercises</div>
                    <div className="font-semibold">{stats.exerciseCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Sets</div>
                    <div className="font-semibold">{stats.totalSets}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Reps</div>
                    <div className="font-semibold">{stats.totalReps}</div>
                  </div>
                </div>

                {workout.notes && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 p-2 rounded">
                    "{workout.notes.substring(0, 60)}
                    {workout.notes.length > 60 ? '...' : ''}"
                  </div>
                )}

                {workout.exercises && workout.exercises.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Exercises:</div>
                    <div className="flex flex-wrap gap-1">
                      {workout.exercises.slice(0, 3).map((ex, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {ex.exercise_name}
                        </span>
                      ))}
                      {workout.exercises.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{workout.exercises.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
