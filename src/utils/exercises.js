/**
 * Exercise database based on requirements
 * Plan A: Chest, Shoulders, Triceps, Back Width, Back Thickness
 * Plan B: Biceps, Forearms, Quads, Hamstrings, Calves
 */

export const PLAN_A_MUSCLES = [
  'Chest',
  'Shoulders',
  'Triceps',
  'Back Width',
  'Back Thickness'
];

export const PLAN_B_MUSCLES = [
  'Biceps',
  'Forearms',
  'Quads',
  'Hamstrings',
  'Calves'
];

export const EXERCISE_DATABASE = {
  'Chest': [
    'Flat Barbell Bench Press',
    'Incline Barbell Bench Press',
    'Flat Dumbbell Press',
    'Incline Dumbbell Press',
    'Dumbbell Flyes',
    'Cable Crossovers',
    'Dips (Chest)',
    'Push-ups (Weighted)'
  ],
  'Shoulders': [
    'Barbell Overhead Press',
    'Dumbbell Overhead Press',
    'Arnold Press',
    'Lateral Raises',
    'Front Raises',
    'Rear Delt Flyes',
    'Face Pulls',
    'Upright Rows'
  ],
  'Triceps': [
    'Close-Grip Bench Press',
    'Tricep Dips',
    'Skull Crushers',
    'Cable Pushdowns',
    'Overhead Tricep Extension',
    'Diamond Push-ups'
  ],
  'Back Width': [
    'Pull-ups',
    'Lat Pulldowns',
    'Wide-Grip Rows',
    'T-Bar Rows',
    'Cable Rows',
    'Straight-Arm Pulldowns'
  ],
  'Back Thickness': [
    'Barbell Rows',
    'Dumbbell Rows',
    'Deadlifts',
    'Rack Pulls',
    'Seated Cable Rows',
    'Chest-Supported Rows'
  ],
  'Biceps': [
    'Barbell Curls',
    'Dumbbell Curls',
    'Hammer Curls',
    'Preacher Curls',
    'Concentration Curls',
    'Cable Curls',
    'Incline Dumbbell Curls'
  ],
  'Forearms': [
    'Wrist Curls',
    'Reverse Wrist Curls',
    'Hammer Curls',
    'Farmer Walks',
    'Reverse Curls',
    'Plate Pinches'
  ],
  'Quads': [
    'Barbell Squats',
    'Front Squats',
    'Leg Press',
    'Hack Squats',
    'Lunges',
    'Bulgarian Split Squats',
    'Leg Extensions'
  ],
  'Hamstrings': [
    'Romanian Deadlifts',
    'Leg Curls',
    'Stiff-Leg Deadlifts',
    'Good Mornings',
    'Glute-Ham Raises',
    'Nordic Curls'
  ],
  'Calves': [
    'Standing Calf Raises',
    'Seated Calf Raises',
    'Donkey Calf Raises',
    'Calf Press on Leg Press',
    'Single-Leg Calf Raises'
  ]
};

/**
 * Get exercises for a specific muscle group
 */
export const getExercisesForMuscle = (muscleGroup) => {
  return EXERCISE_DATABASE[muscleGroup] || [];
};

/**
 * Get muscle groups for a specific plan
 */
export const getMusclesForPlan = (plan) => {
  return plan === 'A' ? PLAN_A_MUSCLES : PLAN_B_MUSCLES;
};

/**
 * Get all exercises across all muscle groups
 */
export const getAllExercises = () => {
  return Object.values(EXERCISE_DATABASE).flat();
};

/**
 * Search exercises by name
 */
export const searchExercises = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  Object.entries(EXERCISE_DATABASE).forEach(([muscle, exercises]) => {
    exercises.forEach(exercise => {
      if (exercise.toLowerCase().includes(lowerQuery)) {
        results.push({ muscle, exercise });
      }
    });
  });

  return results;
};
