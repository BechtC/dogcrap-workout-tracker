/**
 * Exercise Registry - Centralized database of all exercises
 * Combines built-in exercises from templates with user-created custom exercises
 */

import { WORKOUT_TEMPLATES } from './workoutTemplates';

/**
 * Standard muscle group categories
 */
export const MUSCLE_GROUPS = [
  'Chest',
  'Shoulders',
  'Triceps',
  'Back Width',
  'Back Thickness',
  'Biceps',
  'Forearms',
  'Quads',
  'Hamstrings',
  'Calves'
];

/**
 * Extract all unique exercises from built-in templates
 */
const extractBuiltInExercises = () => {
  const exerciseMap = new Map();

  // Iterate through all templates and collect exercises
  Object.values(WORKOUT_TEMPLATES).forEach(template => {
    template.exercises.forEach(exercise => {
      const key = `${exercise.muscle_group}|${exercise.exercise_name}`.toLowerCase();

      if (!exerciseMap.has(key)) {
        exerciseMap.set(key, {
          muscle_group: exercise.muscle_group,
          exercise_name: exercise.exercise_name,
          technique: exercise.technique,
          target_reps: exercise.target_reps,
          alternatives: exercise.alternatives || [],
          isBuiltIn: true
        });
      }
    });
  });

  return Array.from(exerciseMap.values());
};

/**
 * Built-in exercises extracted from templates
 */
export const BUILT_IN_EXERCISES = extractBuiltInExercises();

/**
 * Get custom exercises from localStorage
 */
export const getCustomExercises = () => {
  const saved = localStorage.getItem('dogcrap_custom_exercises');
  return saved ? JSON.parse(saved) : [];
};

/**
 * Save custom exercises to localStorage
 */
export const saveCustomExercises = (exercises) => {
  localStorage.setItem('dogcrap_custom_exercises', JSON.stringify(exercises));
};

/**
 * Get all exercises (built-in + custom)
 */
export const getAllExercises = () => {
  return [...BUILT_IN_EXERCISES, ...getCustomExercises()];
};

/**
 * Get exercises filtered by muscle group
 */
export const getExercisesByMuscleGroup = (muscleGroup) => {
  const allExercises = getAllExercises();
  return allExercises.filter(ex => ex.muscle_group === muscleGroup);
};

/**
 * Search for an exercise by name (case-insensitive)
 */
export const findExerciseByName = (exerciseName) => {
  const allExercises = getAllExercises();
  return allExercises.find(
    ex => ex.exercise_name.toLowerCase() === exerciseName.toLowerCase()
  );
};

/**
 * Check if an exercise already exists (case-insensitive)
 */
export const exerciseExists = (exerciseName, muscleGroup = null) => {
  const allExercises = getAllExercises();
  return allExercises.some(ex => {
    const nameMatch = ex.exercise_name.toLowerCase() === exerciseName.toLowerCase();
    if (muscleGroup) {
      return nameMatch && ex.muscle_group === muscleGroup;
    }
    return nameMatch;
  });
};

/**
 * Add a new custom exercise
 */
export const addCustomExercise = (exercise) => {
  // Check if exercise already exists
  if (exerciseExists(exercise.exercise_name, exercise.muscle_group)) {
    throw new Error(`Exercise "${exercise.exercise_name}" already exists for ${exercise.muscle_group}`);
  }

  // Validate required fields
  if (!exercise.muscle_group || !exercise.exercise_name) {
    throw new Error('Muscle group and exercise name are required');
  }

  const customExercises = getCustomExercises();
  const newExercise = {
    muscle_group: exercise.muscle_group,
    exercise_name: exercise.exercise_name,
    technique: exercise.technique || 'Rest-Pause',
    target_reps: exercise.target_reps || '11-15 total',
    alternatives: exercise.alternatives || [],
    isBuiltIn: false,
    createdAt: new Date().toISOString()
  };

  customExercises.push(newExercise);
  saveCustomExercises(customExercises);

  return newExercise;
};

/**
 * Delete a custom exercise
 */
export const deleteCustomExercise = (exerciseName, muscleGroup) => {
  const customExercises = getCustomExercises();
  const filtered = customExercises.filter(ex =>
    !(ex.exercise_name.toLowerCase() === exerciseName.toLowerCase() &&
      ex.muscle_group === muscleGroup)
  );

  saveCustomExercises(filtered);
  return filtered.length < customExercises.length; // Returns true if deleted
};

/**
 * Get exercise statistics
 */
export const getExerciseStats = () => {
  const builtIn = BUILT_IN_EXERCISES;
  const custom = getCustomExercises();

  return {
    totalExercises: builtIn.length + custom.length,
    builtInExercises: builtIn.length,
    customExercises: custom.length,
    byMuscleGroup: MUSCLE_GROUPS.reduce((acc, group) => {
      const count = getAllExercises().filter(ex => ex.muscle_group === group).length;
      if (count > 0) {
        acc[group] = count;
      }
      return acc;
    }, {})
  };
};

/**
 * Get unique muscle groups from all exercises
 * (includes custom muscle groups that users might have added)
 */
export const getAllMuscleGroups = () => {
  const allExercises = getAllExercises();
  const groups = new Set(allExercises.map(ex => ex.muscle_group));
  return Array.from(groups).sort();
};

/**
 * Format exercise for display
 */
export const formatExerciseDisplay = (exercise) => {
  return {
    label: exercise.exercise_name,
    value: exercise.exercise_name,
    muscleGroup: exercise.muscle_group,
    technique: exercise.technique,
    targetReps: exercise.target_reps,
    alternatives: exercise.alternatives,
    isBuiltIn: exercise.isBuiltIn
  };
};

/**
 * Get suggested alternatives for an exercise
 * (finds exercises in the same muscle group)
 */
export const getSuggestedAlternatives = (muscleGroup, excludeExercise = null) => {
  const exercises = getExercisesByMuscleGroup(muscleGroup);
  return exercises
    .filter(ex => ex.exercise_name !== excludeExercise)
    .map(ex => ex.exercise_name);
};
