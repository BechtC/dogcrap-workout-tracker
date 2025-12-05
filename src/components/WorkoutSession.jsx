import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getMusclesForPlan, getExercisesForMuscleWithCustom, addCustomExercise } from '../utils/exercises';
import { calculateTotalReps, getWorkoutStats } from '../utils/calculations';
import { getTemplate } from '../utils/workoutTemplates';

const WorkoutSession = () => {
  const {
    activeWorkout,
    setView,
    addExerciseToWorkout,
    addSetToExercise,
    updateSetInExercise,
    deleteSetFromExercise,
    deleteExerciseFromWorkout,
    saveWorkout,
    getLastExercise
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
  const [showTemplateGuide, setShowTemplateGuide] = useState(true);

  const muscles = getMusclesForPlan(activeWorkout.plan);
  const template = activeWorkout.template ? getTemplate(activeWorkout.template) : null;
  const exercises = currentExercise.muscle_group
    ? getExercisesForMuscleWithCustom(currentExercise.muscle_group)
    : [];

  // Get last workout data for the selected exercise
  const lastExerciseData = currentExercise.exercise_name
    ? getLastExercise(currentExercise.exercise_name)
    : null;

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

      {/* Template Guide */}
      {template && showTemplateGuide && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <div>
                <div className="font-bold text-purple-800 dark:text-purple-300">{template.name}</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">{template.description}</div>
              </div>
            </div>
            <button
              onClick={() => setShowTemplateGuide(false)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
            >
              ✕ Hide
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">
              Recommended Exercises:
            </div>
            {template.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded text-sm"
              >
                <span className="font-semibold text-purple-700 dark:text-purple-300 min-w-[30px]">
                  {idx + 1}.
                </span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {exercise.muscle_group}: {exercise.exercise_name}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">
                    {exercise.technique} • {exercise.target_reps}
                  </div>
                  {exercise.alternatives && exercise.alternatives.length > 0 && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Alternatives: {exercise.alternatives.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded text-xs text-purple-800 dark:text-purple-300">
            💡 <strong>Tip:</strong> This is a suggested workout structure. You can follow it exactly or customize as needed!
          </div>
        </div>
      )}

      {!template && !showTemplateGuide && (
        <button
          onClick={() => setShowTemplateGuide(true)}
          className="mb-6 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 text-sm"
        >
          📋 Show Template Guide
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Add New Exercise */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add Exercise</h3>

          {/* Muscle Group Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

          {/* Last Workout Reference */}
          {lastExerciseData && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <div className="font-bold text-blue-800 dark:text-blue-300 mb-1">
                    Last Time You Did This Exercise
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">
                    {new Date(lastExerciseData.date).toLocaleDateString('de-DE')} - Plan {lastExerciseData.plan}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {lastExerciseData.sets.map((set, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm p-2 bg-blue-100 dark:bg-blue-800/40 rounded"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-medium w-12">Set {set.set_number}</span>
                    <span className="font-bold text-blue-800 dark:text-blue-200">
                      {set.weight_kg} kg × {set.reps} reps
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                Total: {calculateTotalReps(lastExerciseData.sets)} reps
              </div>
            </div>
          )}

          {/* Mini-Sets Entry */}
          {currentExercise.exercise_name && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                Mini-Sets (Rest-Pause)
              </h4>

              {/* Current Sets List */}
              {currentExercise.sets.length > 0 && (
                <div className="mb-4 space-y-2">
                  {currentExercise.sets.map((set, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
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
                        className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Add Custom Exercise
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
