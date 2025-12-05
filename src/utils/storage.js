/**
 * LocalStorage utility for Dog Crap Workout Tracker
 * Handles all data persistence with auto-save and data validation
 */

const STORAGE_KEY = 'dogcrap_workout_data';

// Initial data structure
const getInitialData = () => ({
  users: {
    chris: { id: 'chris', name: 'Chris' },
    denis: { id: 'denis', name: 'Denis' }
  },
  workouts: [],
  currentUser: 'chris'
});

/**
 * Load data from LocalStorage
 */
export const loadData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initialData = getInitialData();
      saveData(initialData);
      return initialData;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading data from LocalStorage:', error);
    return getInitialData();
  }
};

/**
 * Save data to LocalStorage
 */
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data to LocalStorage:', error);
    if (error.name === 'QuotaExceededError') {
      alert('LocalStorage limit exceeded! Please export and backup your data.');
    }
    return false;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  const data = loadData();
  return data.currentUser || 'chris';
};

/**
 * Set current user
 */
export const setCurrentUser = (userId) => {
  const data = loadData();
  data.currentUser = userId;
  saveData(data);
};

/**
 * Get all workouts for a specific user
 */
export const getUserWorkouts = (userId) => {
  const data = loadData();
  return data.workouts.filter(w => w.user_id === userId);
};

/**
 * Add a new workout
 */
export const addWorkout = (workout) => {
  const data = loadData();
  const newWorkout = {
    id: generateUUID(),
    created_at: new Date().toISOString(),
    ...workout
  };
  data.workouts.push(newWorkout);
  saveData(data);
  return newWorkout;
};

/**
 * Update an existing workout
 */
export const updateWorkout = (workoutId, updates) => {
  const data = loadData();
  const index = data.workouts.findIndex(w => w.id === workoutId);
  if (index !== -1) {
    data.workouts[index] = { ...data.workouts[index], ...updates };
    saveData(data);
    return data.workouts[index];
  }
  return null;
};

/**
 * Delete a workout
 */
export const deleteWorkout = (workoutId) => {
  const data = loadData();
  data.workouts = data.workouts.filter(w => w.id !== workoutId);
  saveData(data);
};

/**
 * Get the last workout for a specific plan and user
 */
export const getLastWorkoutForPlan = (userId, plan) => {
  const workouts = getUserWorkouts(userId);
  const planWorkouts = workouts.filter(w => w.plan === plan);
  if (planWorkouts.length === 0) return null;

  return planWorkouts.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )[0];
};

/**
 * Export data as CSV
 */
export const exportToCSV = (userId = null) => {
  const data = loadData();
  const workouts = userId ? getUserWorkouts(userId) : data.workouts;

  const csvRows = [];
  csvRows.push('Date,User,Plan,Muscle Group,Exercise,Set Number,Weight (kg),Reps,Notes');

  workouts.forEach(workout => {
    const user = data.users[workout.user_id]?.name || workout.user_id;
    const notes = (workout.notes || '').replace(/"/g, '""'); // Escape quotes

    if (workout.exercises && workout.exercises.length > 0) {
      workout.exercises.forEach(exercise => {
        if (exercise.sets && exercise.sets.length > 0) {
          exercise.sets.forEach(set => {
            csvRows.push(
              `${workout.date},${user},${workout.plan},${exercise.muscle_group},${exercise.exercise_name},${set.set_number},${set.weight_kg},${set.reps},"${notes}"`
            );
          });
        }
      });
    }
  });

  return csvRows.join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (userId = null) => {
  const csv = exportToCSV(userId);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const userName = userId || 'all';
  const date = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `dogcrap_workouts_${userName}_${date}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export full backup as JSON
 */
export const exportBackup = () => {
  const data = loadData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `dogcrap_backup_${date}.json`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Import backup from JSON
 */
export const importBackup = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    // Validate data structure
    if (!data.users || !data.workouts) {
      throw new Error('Invalid backup file structure');
    }
    saveData(data);
    return true;
  } catch (error) {
    console.error('Error importing backup:', error);
    return false;
  }
};

/**
 * Generate UUID (simple version for browser compatibility)
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Get storage size in MB
 */
export const getStorageSize = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return 0;
  return new Blob([data]).size / (1024 * 1024); // Size in MB
};

/**
 * Check if storage is near limit (>8MB)
 */
export const isStorageNearLimit = () => {
  return getStorageSize() > 8;
};

/**
 * Get the last time a specific exercise was performed by a user
 * Returns the most recent exercise data including sets, weight, and reps
 */
export const getLastExerciseData = (userId, exerciseName) => {
  const workouts = getUserWorkouts(userId);

  // Sort workouts by date (most recent first)
  const sortedWorkouts = workouts.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  // Find the most recent workout containing this exercise
  for (const workout of sortedWorkouts) {
    if (workout.exercises && workout.exercises.length > 0) {
      const exercise = workout.exercises.find(
        ex => ex.exercise_name === exerciseName
      );

      if (exercise) {
        return {
          date: workout.date,
          plan: workout.plan,
          muscle_group: exercise.muscle_group,
          exercise_name: exercise.exercise_name,
          sets: exercise.sets || [],
          workout_notes: workout.notes
        };
      }
    }
  }

  return null;
};

/**
 * Parse CSV string and convert to workout objects
 * CSV format: Date,User,Plan,Muscle Group,Exercise,Set Number,Weight (kg),Reps,Notes
 */
export const parseCSV = (csvString) => {
  try {
    const lines = csvString.trim().split('\n');

    if (lines.length < 2) {
      throw new Error('CSV file is empty or invalid');
    }

    // Skip header row
    const dataLines = lines.slice(1);

    // Group rows by workout (date + user + plan)
    const workoutMap = new Map();

    dataLines.forEach((line, index) => {
      // Handle quoted fields with commas
      const regex = /("(?:[^"]|"")*"|[^,]+)(?=\s*,|\s*$)/g;
      const fields = [];
      let match;

      while ((match = regex.exec(line)) !== null) {
        let field = match[1];
        // Remove surrounding quotes and unescape double quotes
        if (field.startsWith('"') && field.endsWith('"')) {
          field = field.slice(1, -1).replace(/""/g, '"');
        }
        fields.push(field.trim());
      }

      if (fields.length < 9) {
        console.warn(`Skipping malformed line ${index + 2}: ${line}`);
        return;
      }

      const [date, user, plan, muscleGroup, exercise, setNumber, weightKg, reps, notes] = fields;

      // Create workout key
      const workoutKey = `${date}|${user}|${plan}`;

      if (!workoutMap.has(workoutKey)) {
        workoutMap.set(workoutKey, {
          date,
          user_id: user.toLowerCase(),
          plan,
          exercises: [],
          notes: notes || ''
        });
      }

      const workout = workoutMap.get(workoutKey);

      // Find or create exercise
      let exerciseObj = workout.exercises.find(
        e => e.muscle_group === muscleGroup && e.exercise_name === exercise
      );

      if (!exerciseObj) {
        exerciseObj = {
          muscle_group: muscleGroup,
          exercise_name: exercise,
          sets: []
        };
        workout.exercises.push(exerciseObj);
      }

      // Add set
      exerciseObj.sets.push({
        set_number: parseInt(setNumber) || 1,
        weight_kg: parseFloat(weightKg) || 0,
        reps: parseInt(reps) || 0
      });
    });

    return Array.from(workoutMap.values());
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw new Error(`CSV parsing failed: ${error.message}`);
  }
};

/**
 * Import workouts from CSV
 * @param {string} csvString - CSV content
 * @param {string} strategy - 'replace', 'merge', or 'smart'
 * @returns {object} - Import statistics
 */
export const importFromCSV = (csvString, strategy = 'merge') => {
  try {
    const parsedWorkouts = parseCSV(csvString);

    if (parsedWorkouts.length === 0) {
      throw new Error('No valid workouts found in CSV');
    }

    const data = loadData();
    let imported = 0;
    let skipped = 0;
    let replaced = 0;

    if (strategy === 'replace') {
      // Replace all workouts
      data.workouts = parsedWorkouts.map(w => ({
        id: generateUUID(),
        created_at: new Date().toISOString(),
        ...w
      }));
      imported = parsedWorkouts.length;
    } else if (strategy === 'merge') {
      // Add all workouts without checking duplicates
      parsedWorkouts.forEach(workout => {
        data.workouts.push({
          id: generateUUID(),
          created_at: new Date().toISOString(),
          ...workout
        });
        imported++;
      });
    } else if (strategy === 'smart') {
      // Smart merge: avoid duplicates based on date, user, and plan
      parsedWorkouts.forEach(workout => {
        const exists = data.workouts.some(
          w => w.date === workout.date &&
               w.user_id === workout.user_id &&
               w.plan === workout.plan
        );

        if (exists) {
          skipped++;
        } else {
          data.workouts.push({
            id: generateUUID(),
            created_at: new Date().toISOString(),
            ...workout
          });
          imported++;
        }
      });
    }

    saveData(data);

    return {
      success: true,
      imported,
      skipped,
      replaced: strategy === 'replace' ? imported : 0,
      total: parsedWorkouts.length
    };
  } catch (error) {
    console.error('Error importing CSV:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
