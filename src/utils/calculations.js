/**
 * Calculation utilities for workout analytics
 */

/**
 * Calculate total reps for an exercise
 */
export const calculateTotalReps = (sets) => {
  if (!sets || sets.length === 0) return 0;
  return sets.reduce((total, set) => total + (set.reps || 0), 0);
};

/**
 * Calculate total volume for an exercise (Weight × Reps)
 */
export const calculateExerciseVolume = (sets) => {
  if (!sets || sets.length === 0) return 0;
  return sets.reduce((total, set) => {
    return total + ((set.weight_kg || 0) * (set.reps || 0));
  }, 0);
};

/**
 * Calculate total volume for a workout
 */
export const calculateWorkoutVolume = (workout) => {
  if (!workout.exercises || workout.exercises.length === 0) return 0;

  return workout.exercises.reduce((total, exercise) => {
    return total + calculateExerciseVolume(exercise.sets);
  }, 0);
};

/**
 * Get max weight used in an exercise
 */
export const getMaxWeight = (sets) => {
  if (!sets || sets.length === 0) return 0;
  return Math.max(...sets.map(set => set.weight_kg || 0));
};

/**
 * Get workout statistics
 */
export const getWorkoutStats = (workout) => {
  const exerciseCount = workout.exercises?.length || 0;
  const totalSets = workout.exercises?.reduce((total, ex) =>
    total + (ex.sets?.length || 0), 0) || 0;
  const totalReps = workout.exercises?.reduce((total, ex) =>
    total + calculateTotalReps(ex.sets), 0) || 0;
  const totalVolume = calculateWorkoutVolume(workout);

  return {
    exerciseCount,
    totalSets,
    totalReps,
    totalVolume: Math.round(totalVolume)
  };
};

/**
 * Get progression data for a specific exercise across workouts
 */
export const getExerciseProgression = (workouts, exerciseName) => {
  const progressionData = [];

  workouts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach(workout => {
      workout.exercises?.forEach(exercise => {
        if (exercise.exercise_name === exerciseName) {
          const maxWeight = getMaxWeight(exercise.sets);
          const totalReps = calculateTotalReps(exercise.sets);
          const volume = calculateExerciseVolume(exercise.sets);

          progressionData.push({
            date: workout.date,
            maxWeight,
            totalReps,
            volume,
            workout_id: workout.id
          });
        }
      });
    });

  return progressionData;
};

/**
 * Get volume progression across all workouts
 */
export const getVolumeProgression = (workouts) => {
  return workouts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(workout => ({
      date: workout.date,
      plan: workout.plan,
      volume: calculateWorkoutVolume(workout),
      workout_id: workout.id
    }));
};

/**
 * Get all unique exercises from workouts
 */
export const getUniqueExercises = (workouts) => {
  const exercises = new Set();

  workouts.forEach(workout => {
    workout.exercises?.forEach(exercise => {
      exercises.add(exercise.exercise_name);
    });
  });

  return Array.from(exercises).sort();
};

/**
 * Calculate personal records
 */
export const getPersonalRecords = (workouts) => {
  const records = {};

  workouts.forEach(workout => {
    workout.exercises?.forEach(exercise => {
      const exerciseName = exercise.exercise_name;
      const maxWeight = getMaxWeight(exercise.sets);
      const totalReps = calculateTotalReps(exercise.sets);
      const volume = calculateExerciseVolume(exercise.sets);

      if (!records[exerciseName]) {
        records[exerciseName] = {
          maxWeight: { value: maxWeight, date: workout.date },
          maxReps: { value: totalReps, date: workout.date },
          maxVolume: { value: volume, date: workout.date }
        };
      } else {
        if (maxWeight > records[exerciseName].maxWeight.value) {
          records[exerciseName].maxWeight = { value: maxWeight, date: workout.date };
        }
        if (totalReps > records[exerciseName].maxReps.value) {
          records[exerciseName].maxReps = { value: totalReps, date: workout.date };
        }
        if (volume > records[exerciseName].maxVolume.value) {
          records[exerciseName].maxVolume = { value: volume, date: workout.date };
        }
      }
    });
  });

  return records;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Format date for chart display
 */
export const formatChartDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    month: 'short',
    day: 'numeric'
  });
};
