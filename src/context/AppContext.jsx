import { createContext, useContext, useState, useEffect } from 'react';
import {
  loadData,
  saveData,
  getCurrentUser,
  setCurrentUser as saveCurrentUser,
  getUserWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  getLastWorkoutForPlan
} from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard, new-workout, workout-detail

  // Load user workouts on user change
  useEffect(() => {
    refreshWorkouts();
  }, [currentUser]);

  const refreshWorkouts = () => {
    const userWorkouts = getUserWorkouts(currentUser);
    setWorkouts(userWorkouts);
  };

  const switchUser = (userId) => {
    setCurrentUserState(userId);
    saveCurrentUser(userId);
    setActiveWorkout(null);
    setView('dashboard');
  };

  const createWorkout = (workoutData) => {
    const newWorkout = addWorkout({
      ...workoutData,
      user_id: currentUser,
      exercises: []
    });
    setActiveWorkout(newWorkout);
    refreshWorkouts();
    return newWorkout;
  };

  const saveWorkout = (workoutId, updates) => {
    const updated = updateWorkout(workoutId, updates);
    if (updated) {
      refreshWorkouts();
      if (activeWorkout?.id === workoutId) {
        setActiveWorkout(updated);
      }
    }
    return updated;
  };

  const removeWorkout = (workoutId) => {
    deleteWorkout(workoutId);
    refreshWorkouts();
    if (activeWorkout?.id === workoutId) {
      setActiveWorkout(null);
      setView('dashboard');
    }
  };

  const addExerciseToWorkout = (workoutId, exercise) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const newExercise = {
      id: generateId(),
      ...exercise,
      sets: exercise.sets || []
    };

    const updatedExercises = [...(workout.exercises || []), newExercise];
    return saveWorkout(workoutId, { exercises: updatedExercises });
  };

  const updateExerciseInWorkout = (workoutId, exerciseId, updates) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const updatedExercises = (workout.exercises || []).map(ex =>
      ex.id === exerciseId ? { ...ex, ...updates } : ex
    );

    return saveWorkout(workoutId, { exercises: updatedExercises });
  };

  const deleteExerciseFromWorkout = (workoutId, exerciseId) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const updatedExercises = (workout.exercises || []).filter(ex => ex.id !== exerciseId);
    return saveWorkout(workoutId, { exercises: updatedExercises });
  };

  const addSetToExercise = (workoutId, exerciseId, setData) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const exercise = workout.exercises?.find(ex => ex.id === exerciseId);
    if (!exercise) return null;

    const newSet = {
      set_number: (exercise.sets?.length || 0) + 1,
      ...setData,
      created_at: new Date().toISOString()
    };

    const updatedSets = [...(exercise.sets || []), newSet];
    return updateExerciseInWorkout(workoutId, exerciseId, { sets: updatedSets });
  };

  const updateSetInExercise = (workoutId, exerciseId, setIndex, updates) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const exercise = workout.exercises?.find(ex => ex.id === exerciseId);
    if (!exercise) return null;

    const updatedSets = (exercise.sets || []).map((set, idx) =>
      idx === setIndex ? { ...set, ...updates } : set
    );

    return updateExerciseInWorkout(workoutId, exerciseId, { sets: updatedSets });
  };

  const deleteSetFromExercise = (workoutId, exerciseId, setIndex) => {
    const workout = workouts.find(w => w.id === workoutId) || activeWorkout;
    if (!workout) return null;

    const exercise = workout.exercises?.find(ex => ex.id === exerciseId);
    if (!exercise) return null;

    const updatedSets = (exercise.sets || [])
      .filter((_, idx) => idx !== setIndex)
      .map((set, idx) => ({ ...set, set_number: idx + 1 }));

    return updateExerciseInWorkout(workoutId, exerciseId, { sets: updatedSets });
  };

  const getLastWorkout = (plan) => {
    return getLastWorkoutForPlan(currentUser, plan);
  };

  const value = {
    // State
    currentUser,
    workouts,
    activeWorkout,
    view,

    // Actions
    switchUser,
    setView,
    createWorkout,
    saveWorkout,
    removeWorkout,
    setActiveWorkout,

    // Exercise actions
    addExerciseToWorkout,
    updateExerciseInWorkout,
    deleteExerciseFromWorkout,

    // Set actions
    addSetToExercise,
    updateSetInExercise,
    deleteSetFromExercise,

    // Utilities
    refreshWorkouts,
    getLastWorkout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Helper function
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
