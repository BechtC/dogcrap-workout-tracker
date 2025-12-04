import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMusclesForPlan, getExercisesForMuscleWithCustom, addCustomExercise } from '../utils/exercises';
import { calculateTotalReps, getWorkoutStats } from '../utils/calculations';

const WorkoutSession = () => {
  const {
    activeWorkout,
    setView,
    addExerciseToWorkout,
    addSetToExercise,
    updateSetInExercise,
    deleteSetFromExercise,
    deleteExerciseFromWorkout,
    saveWorkout
  } = useApp();

  const [currentExercise, setCurrentExercise] = useState({
    muscle_group: '',
    exercise_name: '',
    sets: []
  });

  const [currentSet, setCurrentSet] = useState({
    weight_kg: '',
    reps: ''
  });

  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [exercisesKey, setExercisesKey] = useState(0); // Force re-render

  const muscles = getMusclesForPlan(activeWorkout.plan);
  const exercises = currentExercise.muscle_group
    ? getExercisesForMuscleWithCustom(currentExercise.muscle_group)
    : [];

  const handleAddSet = () => {
    if (!currentSet.weight_kg || !currentSet.reps) {
      alert('Please enter both weight and reps');
      return;
    }

    const newSet = {
      weight_kg: parseFloat(currentSet.weight_kg),
      reps: parseInt(currentSet.reps)
    };

    setCurrentExercise({
      ...currentExercise,
      sets: [...currentExercise.sets, newSet]
    });

    setCurrentSet({ weight_kg: currentSet.weight_kg, reps: '' });
  };

  const handleRemoveSet = (index) => {
    setCurrentExercise({
      ...currentExercise,
      sets: currentExercise.sets.filter((_, i) => i !== index)
    });
  };

  const handleSaveExercise = () => {
    if (!currentExercise.muscle_group || !currentExercise.exercise_name) {
      alert('Please select muscle group and exercise');
      return;
    }

    if (currentExercise.sets.length === 0) {
      alert('Please add at least one set');
      return;
    }

    addExerciseToWorkout(activeWorkout.id, currentExercise);

    // Reset form
    setCurrentExercise({
      muscle_group: '',
      exercise_name: '',
      sets: []
    });
    setCurrentSet({ weight_kg: '', reps: '' });
  };

  const handleFinishWorkout = () => {
    if (activeWorkout.exercises?.length === 0) {
      const confirm = window.confirm('No exercises added. Finish anyway?');
      if (!confirm) return;
    }

    setView('dashboard');
  };

  const handleAddCustomExercise = () => {
    if (!currentExercise.muscle_group) {
      alert('Please select a muscle group first');
      return;
    }

    if (!newExerciseName.trim()) {
      alert('Please enter an exercise name');
      return;
    }

    const success = addCustomExercise(currentExercise.muscle_group, newExerciseName.trim());

    if (success) {
      // Set the newly added exercise as selected
      setCurrentExercise({
        ...currentExercise,
        exercise_name: newExerciseName.trim()
      });
      setNewExerciseName('');
      setShowAddExerciseModal(false);
      setExercisesKey(prev => prev + 1); // Force re-render to show new exercise
      alert(`✅ "${newExerciseName.trim()}" added to ${currentExercise.muscle_group}!`);
    } else {
      alert('This exercise already exists in this muscle group');
    }
  };

  const stats = getWorkoutStats(activeWorkout);

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              Plan {activeWorkout.plan} - {new Date(activeWorkout.date).toLocaleDateString('de-DE')}
            </h2>
            <p className="text-blue-100">Rest-Pause Training Session</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.exerciseCount}</div>
              <div className="text-xs text-blue-100">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.totalSets}</div>
              <div className="text-xs text-blue-100">Total Sets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.totalReps}</div>
              <div className="text-xs text-blue-100">Total Reps</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Add New Exercise */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add Exercise</h3>

          {/* Muscle Group Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Muscle Group
            </label>
            <select
              value={currentExercise.muscle_group}
              onChange={(e) =>
                setCurrentExercise({
                  ...currentExercise,
                  muscle_group: e.target.value,
                  exercise_name: ''
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select muscle group...</option>
              {muscles.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle}
                </option>
              ))}
            </select>
          </div>

          {/* Exercise Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise
            </label>
            <div className="flex gap-2">
              <select
                key={exercisesKey}
                value={currentExercise.exercise_name}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    exercise_name: e.target.value
                  })
                }
                disabled={!currentExercise.muscle_group}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select exercise...</option>
                {exercises.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowAddExerciseModal(true)}
                disabled={!currentExercise.muscle_group}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                title="Add custom exercise"
              >
                + New
              </button>
            </div>
          </div>

          {/* Mini-Sets Entry */}
          {currentExercise.exercise_name && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-gray-800 mb-3">
                Mini-Sets (Rest-Pause)
              </h4>

              {/* Current Sets List */}
              {currentExercise.sets.length > 0 && (
                <div className="mb-4 space-y-2">
                  {currentExercise.sets.map((set, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="font-semibold text-gray-700 w-16">
                        Set {index + 1}
                      </div>
                      <div className="flex-1 flex gap-2 text-sm">
                        <span className="font-medium">{set.weight_kg} kg</span>
                        <span className="text-gray-400">×</span>
                        <span className="font-medium">{set.reps} reps</span>
                      </div>
                      <button
                        onClick={() => handleRemoveSet(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="text-sm font-medium text-blue-600">
                    Total Reps: {calculateTotalReps(currentExercise.sets)}
                  </div>
                </div>
              )}

              {/* Add Set Form */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={currentSet.weight_kg}
                    onChange={(e) =>
                      setCurrentSet({ ...currentSet, weight_kg: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('reps-input')?.focus();
                      }
                    }}
                    placeholder="87.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Reps
                  </label>
                  <input
                    id="reps-input"
                    type="number"
                    value={currentSet.reps}
                    onChange={(e) =>
                      setCurrentSet({ ...currentSet, reps: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSet();
                      }
                    }}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleAddSet}
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition mb-3"
              >
                + Add Mini-Set
              </button>

              <button
                onClick={handleSaveExercise}
                disabled={currentExercise.sets.length === 0}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                ✓ Save Exercise
              </button>
            </div>
          )}
        </div>

        {/* Right: Completed Exercises */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Completed Exercises
          </h3>

          {activeWorkout.exercises?.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <p>No exercises added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeWorkout.exercises?.map((exercise, exIdx) => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {exercise.exercise_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {exercise.muscle_group}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        deleteExerciseFromWorkout(activeWorkout.id, exercise.id)
                      }
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-1">
                    {exercise.sets?.map((set, setIdx) => (
                      <div
                        key={setIdx}
                        className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded"
                      >
                        <span className="text-gray-600 w-12">#{set.set_number}</span>
                        <span className="font-medium">
                          {set.weight_kg} kg × {set.reps} reps
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 text-sm font-medium text-blue-600">
                    Total: {calculateTotalReps(exercise.sets)} reps
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Finish Workout Button */}
          <div className="mt-6 pt-6 border-t">
            <button
              onClick={handleFinishWorkout}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              ✓ Finish Workout
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Exercise Modal */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Add Custom Exercise
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Muscle Group
              </label>
              <input
                type="text"
                value={currentExercise.muscle_group}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Name
              </label>
              <input
                type="text"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomExercise();
                  }
                }}
                placeholder="e.g., Cable Chest Flyes"
                autoFocus
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be saved for future workouts
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddExerciseModal(false);
                  setNewExerciseName('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomExercise}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSession;
