/**
 * Seed Data Generator for Dog Crap Workout Tracker
 * Creates realistic training data for Chris and Denis
 * 150 workouts from January 2024 to January 2025
 */

import { EXERCISE_DATABASE, PLAN_A_MUSCLES, PLAN_B_MUSCLES } from './exercises';
import { saveData } from './storage';

/**
 * Generate a random number between min and max
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Generate a random float between min and max with 1 decimal
 */
const randomFloat = (min, max) => Math.round((Math.random() * (max - min) + min) * 2) / 2;

/**
 * Get random item from array
 */
const randomItem = (array) => array[random(0, array.length - 1)];

/**
 * Generate UUID
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate progressive weight increases (simulating strength gains)
 */
const generateProgressiveWeight = (baseWeight, sessionNumber, totalSessions) => {
  const progressionFactor = sessionNumber / totalSessions;
  const increase = baseWeight * 0.15 * progressionFactor; // 15% increase over the year
  const variation = randomFloat(-2.5, 2.5); // Small random variation
  return Math.round((baseWeight + increase + variation) * 2) / 2;
};

/**
 * Generate rest-pause sets for an exercise
 */
const generateSets = (baseWeight, sessionNumber, totalSessions, difficulty = 'medium') => {
  const weight = generateProgressiveWeight(baseWeight, sessionNumber, totalSessions);

  // Rest-pause pattern: declining reps
  const sets = [];
  let repRanges;

  if (difficulty === 'hard') {
    repRanges = [
      { min: 8, max: 12 },
      { min: 4, max: 7 },
      { min: 2, max: 5 },
      { min: 1, max: 3 }
    ];
  } else if (difficulty === 'easy') {
    repRanges = [
      { min: 12, max: 15 },
      { min: 7, max: 10 },
      { min: 4, max: 6 },
      { min: 2, max: 4 }
    ];
  } else {
    repRanges = [
      { min: 10, max: 12 },
      { min: 5, max: 8 },
      { min: 3, max: 5 },
      { min: 1, max: 3 }
    ];
  }

  const numSets = random(2, 4); // 2-4 mini-sets

  for (let i = 0; i < numSets; i++) {
    const range = repRanges[i];
    sets.push({
      set_number: i + 1,
      weight_kg: weight,
      reps: random(range.min, range.max),
      created_at: new Date().toISOString()
    });
  }

  return sets;
};

/**
 * Generate exercises for a workout
 */
const generateExercises = (plan, sessionNumber, totalSessions, userProfile) => {
  const muscles = plan === 'A' ? PLAN_A_MUSCLES : PLAN_B_MUSCLES;
  const exercises = [];

  // Select 3-5 muscle groups for this workout
  const numMuscles = random(3, 5);
  const selectedMuscles = [];

  for (let i = 0; i < numMuscles; i++) {
    const muscle = muscles[i % muscles.length];
    if (!selectedMuscles.includes(muscle)) {
      selectedMuscles.push(muscle);
    }
  }

  selectedMuscles.forEach(muscle => {
    const exerciseList = EXERCISE_DATABASE[muscle];
    const exercise = randomItem(exerciseList);

    // Different base weights for Chris vs Denis, and different exercises
    const baseWeights = userProfile.baseWeights[muscle] || 80;
    const difficulty = randomItem(['easy', 'medium', 'hard']);

    exercises.push({
      id: generateUUID(),
      muscle_group: muscle,
      exercise_name: exercise,
      sets: generateSets(baseWeights, sessionNumber, totalSessions, difficulty),
      created_at: new Date().toISOString()
    });
  });

  return exercises;
};

/**
 * Generate workout notes
 */
const generateNotes = () => {
  const noteOptions = [
    null, // 30% chance of no notes
    null,
    null,
    "Felt strong today, good session!",
    "Bit tired, didn't sleep well",
    "New PR on bench press!",
    "Shoulders feeling tight",
    "Great pump today",
    "Lower back a bit sore",
    "Increased weight on squats",
    "Deload week, focusing on form",
    "Back to training after rest day",
    "Excellent energy levels",
    "Modified exercises due to minor strain",
    "Best workout this week!",
    "Tried new exercise variation",
    "Volume felt easier than last time",
    "Need more rest between sets next time",
    "Diet on point, feeling lean",
    "Post-vacation workout, felt rusty"
  ];

  return randomItem(noteOptions);
};

/**
 * Generate date between start and end
 */
const generateWorkoutDate = (startDate, dayOffset) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0];
};

/**
 * User profiles with base strengths
 */
const userProfiles = {
  chris: {
    baseWeights: {
      'Chest': 95,
      'Shoulders': 70,
      'Triceps': 80,
      'Back Width': 85,
      'Back Thickness': 100,
      'Biceps': 35,
      'Forearms': 30,
      'Quads': 120,
      'Hamstrings': 90,
      'Calves': 110
    }
  },
  denis: {
    baseWeights: {
      'Chest': 85,
      'Shoulders': 65,
      'Triceps': 70,
      'Back Width': 80,
      'Back Thickness': 95,
      'Biceps': 32,
      'Forearms': 28,
      'Quads': 110,
      'Hamstrings': 85,
      'Calves': 100
    }
  }
};

/**
 * Generate all workouts for both users
 */
export const generateSeedData = () => {
  const workouts = [];
  const startDate = new Date('2024-01-01');

  // Generate 75 workouts per user = 150 total
  const workoutsPerUser = 75;

  // Chris workouts
  for (let i = 0; i < workoutsPerUser; i++) {
    const plan = i % 2 === 0 ? 'A' : 'B'; // Alternate between Plan A and B
    const dayOffset = Math.floor((365 / workoutsPerUser) * i) + random(0, 2); // Spread across year

    workouts.push({
      id: generateUUID(),
      user_id: 'chris',
      date: generateWorkoutDate(startDate, dayOffset),
      plan: plan,
      notes: generateNotes(),
      exercises: generateExercises(plan, i, workoutsPerUser, userProfiles.chris),
      created_at: new Date().toISOString()
    });
  }

  // Denis workouts
  for (let i = 0; i < workoutsPerUser; i++) {
    const plan = i % 2 === 0 ? 'A' : 'B';
    const dayOffset = Math.floor((365 / workoutsPerUser) * i) + random(0, 2);

    workouts.push({
      id: generateUUID(),
      user_id: 'denis',
      date: generateWorkoutDate(startDate, dayOffset),
      plan: plan,
      notes: generateNotes(),
      exercises: generateExercises(plan, i, workoutsPerUser, userProfiles.denis),
      created_at: new Date().toISOString()
    });
  }

  // Sort by date
  workouts.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    users: {
      chris: { id: 'chris', name: 'Chris' },
      denis: { id: 'denis', name: 'Denis' }
    },
    workouts: workouts,
    currentUser: 'chris'
  };
};

/**
 * Load seed data into LocalStorage
 */
export const seedDatabase = () => {
  const data = generateSeedData();
  saveData(data);
  return data;
};

/**
 * Get statistics about seed data
 */
export const getSeedDataStats = () => {
  const data = generateSeedData();

  const chrisWorkouts = data.workouts.filter(w => w.user_id === 'chris');
  const denisWorkouts = data.workouts.filter(w => w.user_id === 'denis');

  const totalExercises = data.workouts.reduce((sum, w) => sum + w.exercises.length, 0);
  const totalSets = data.workouts.reduce((sum, w) => {
    return sum + w.exercises.reduce((s, e) => s + e.sets.length, 0);
  }, 0);

  return {
    totalWorkouts: data.workouts.length,
    chrisWorkouts: chrisWorkouts.length,
    denisWorkouts: denisWorkouts.length,
    totalExercises: totalExercises,
    totalSets: totalSets,
    dateRange: {
      start: data.workouts[0].date,
      end: data.workouts[data.workouts.length - 1].date
    }
  };
};
