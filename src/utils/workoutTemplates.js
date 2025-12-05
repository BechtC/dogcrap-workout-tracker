/**
 * Workout Templates based on Denis's Training Plan
 * 6 variations: A1, A2, A3, B1, B2, B3
 */

export const WORKOUT_TEMPLATES = {
  A1: {
    name: 'Plan A1',
    description: 'Upper Body - Incline Focus',
    plan: 'A',
    exercises: [
      {
        muscle_group: 'Chest',
        exercise_name: 'Incline Barbell Bench Press',
        technique: 'Rest-Pause (3 mini-sets)',
        target_reps: '11-15 total',
        alternatives: ['Incline DB Press', 'Incline Smith Machine Press']
      },
      {
        muscle_group: 'Shoulders',
        exercise_name: 'Dumbbell Shoulder Press',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Barbell Military Press', 'Machine Shoulder Press']
      },
      {
        muscle_group: 'Triceps',
        exercise_name: 'Close-Grip Bench Press',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Dips', 'Reverse Grip Bench Press']
      },
      {
        muscle_group: 'Back Width',
        exercise_name: 'Pull-ups',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Wide-Grip Lat Pulldowns', 'Hammer Strength Pulldown']
      },
      {
        muscle_group: 'Back Thickness',
        exercise_name: 'Deadlifts',
        technique: '1-2 Straight Sets',
        target_reps: '6-12',
        alternatives: ['Barbell Rows', 'T-Bar Rows']
      }
    ]
  },

  A2: {
    name: 'Plan A2',
    description: 'Upper Body - Flat Focus',
    plan: 'A',
    exercises: [
      {
        muscle_group: 'Chest',
        exercise_name: 'Flat Barbell Bench Press',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Flat DB Press', 'Hammer Strength Chest Press']
      },
      {
        muscle_group: 'Shoulders',
        exercise_name: 'Cable Lateral Raises',
        technique: 'Rest-Pause',
        target_reps: '11-20 total',
        alternatives: ['Dumbbell Lateral Raises', 'Machine Laterals']
      },
      {
        muscle_group: 'Triceps',
        exercise_name: 'Skull Crushers',
        technique: 'Rest-Pause',
        target_reps: '15-30 total',
        alternatives: ['Overhead Extensions', 'Crossbody Extensions']
      },
      {
        muscle_group: 'Back Width',
        exercise_name: 'Close-Grip Pulldowns',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Neutral-Grip Pulldowns', 'Low-to-High Cable Row']
      },
      {
        muscle_group: 'Back Thickness',
        exercise_name: 'Barbell Rows',
        technique: '1-2 Straight Sets',
        target_reps: '6-12',
        alternatives: ['Dumbbell Rows', 'Hammer Strength Row']
      }
    ]
  },

  A3: {
    name: 'Plan A3',
    description: 'Upper Body - Machine Focus',
    plan: 'A',
    exercises: [
      {
        muscle_group: 'Chest',
        exercise_name: 'Incline Machine Press',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Incline Hammer Strength', 'Cable Flyes Incline']
      },
      {
        muscle_group: 'Shoulders',
        exercise_name: 'Standing Shoulder Press Machine',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Seated Shoulder Press', 'Smith Machine Press']
      },
      {
        muscle_group: 'Triceps',
        exercise_name: 'EZ-Bar Lying Extensions',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Cable Overhead Extension', 'Machine Dips']
      },
      {
        muscle_group: 'Back Width',
        exercise_name: 'Lat Pulldown Machine',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Assisted Pull-ups', 'Cable Pulldowns']
      },
      {
        muscle_group: 'Back Thickness',
        exercise_name: 'Seated Row Machine',
        technique: 'Rest-Pause',
        target_reps: '6-12',
        alternatives: ['Cable Rows', 'T-Bar Rows']
      }
    ]
  },

  B1: {
    name: 'Plan B1',
    description: 'Legs & Arms - Squat Focus',
    plan: 'B',
    exercises: [
      {
        muscle_group: 'Biceps',
        exercise_name: 'Standing Barbell Curls',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Dumbbell Curls', 'Preacher Curls']
      },
      {
        muscle_group: 'Forearms',
        exercise_name: 'Hammer Curls',
        technique: '1 Straight Set',
        target_reps: '12-20',
        alternatives: ['Reverse Curls', 'Wrist Curls']
      },
      {
        muscle_group: 'Quads',
        exercise_name: 'Squats',
        technique: '1 heavy set + 1 Widowmaker',
        target_reps: '6-10 + 20 reps',
        alternatives: ['Leg Press', 'Hack Squats']
      },
      {
        muscle_group: 'Hamstrings',
        exercise_name: 'Romanian Deadlifts',
        technique: 'Rest-Pause',
        target_reps: '15-30 total',
        alternatives: ['Lying Leg Curls', 'Good Mornings']
      },
      {
        muscle_group: 'Calves',
        exercise_name: 'Standing Calf Raises',
        technique: '1 set with slow negatives',
        target_reps: '10-12',
        alternatives: ['Seated Calf Raises', 'Donkey Raises']
      }
    ]
  },

  B2: {
    name: 'Plan B2',
    description: 'Legs & Arms - Leg Press Focus',
    plan: 'B',
    exercises: [
      {
        muscle_group: 'Biceps',
        exercise_name: 'Alternating Dumbbell Curls',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Cable Curls', 'Concentration Curls']
      },
      {
        muscle_group: 'Forearms',
        exercise_name: 'Reverse Cable Curls',
        technique: '1 Straight Set',
        target_reps: '12-20',
        alternatives: ['Zottman Curls', 'Behind-Back Wrist Curls']
      },
      {
        muscle_group: 'Quads',
        exercise_name: 'Leg Press',
        technique: '1 heavy set + 1 Widowmaker',
        target_reps: '6-10 + 20 reps',
        alternatives: ['Hack Squats', 'Front Squats']
      },
      {
        muscle_group: 'Hamstrings',
        exercise_name: 'Lying Leg Curls',
        technique: 'Rest-Pause',
        target_reps: '15-30 total',
        alternatives: ['Seated Leg Curls', 'Nordic Ham Curls']
      },
      {
        muscle_group: 'Calves',
        exercise_name: 'Seated Calf Raises',
        technique: '1 set with slow negatives',
        target_reps: '10-12',
        alternatives: ['Leg Press Calf Raises', 'Single Leg Raises']
      }
    ]
  },

  B3: {
    name: 'Plan B3',
    description: 'Legs & Arms - Machine Variation',
    plan: 'B',
    exercises: [
      {
        muscle_group: 'Biceps',
        exercise_name: 'Standing Dumbbell Curls',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: ['Cable Curls', 'Machine Curls']
      },
      {
        muscle_group: 'Forearms',
        exercise_name: 'Hammer Preacher Curls',
        technique: '1 Straight Set',
        target_reps: '12-20',
        alternatives: ['Reverse Preacher', 'Cable Reverse Curls']
      },
      {
        muscle_group: 'Quads',
        exercise_name: 'Leg Press',
        technique: '1 heavy set + 1 Widowmaker',
        target_reps: '6-10 + 20 reps',
        alternatives: ['Smith Machine Squats', 'Hack Squats']
      },
      {
        muscle_group: 'Hamstrings',
        exercise_name: 'Seated Leg Curls',
        technique: 'Rest-Pause',
        target_reps: '15-30 total',
        alternatives: ['Lying Leg Curls', 'Single Leg Curls']
      },
      {
        muscle_group: 'Calves',
        exercise_name: 'Calf Press Machine',
        technique: '1 set with slow negatives',
        target_reps: '10-12',
        alternatives: ['Standing Calf Raises', 'Seated Calf Raises']
      }
    ]
  }
};

/**
 * Get custom templates from localStorage
 */
export const getCustomTemplates = () => {
  const saved = localStorage.getItem('dogcrap_custom_templates');
  return saved ? JSON.parse(saved) : {};
};

/**
 * Get all templates (built-in + custom)
 */
export const getAllTemplates = () => {
  return {
    ...WORKOUT_TEMPLATES,
    ...getCustomTemplates()
  };
};

/**
 * Get template by ID (checks both built-in and custom)
 */
export const getTemplate = (templateId) => {
  const allTemplates = getAllTemplates();
  return allTemplates[templateId] || null;
};

/**
 * Get all templates for a specific plan (includes custom templates)
 */
export const getTemplatesForPlan = (plan) => {
  const allTemplates = getAllTemplates();
  return Object.entries(allTemplates)
    .filter(([id, template]) => template.plan === plan)
    .map(([id, template]) => ({ id, ...template }));
};

/**
 * Get all template IDs (includes custom templates)
 */
export const getAllTemplateIds = () => {
  const allTemplates = getAllTemplates();
  return Object.keys(allTemplates);
};

/**
 * Format template info for display
 */
export const formatTemplateInfo = (templateId) => {
  const template = getTemplate(templateId);
  if (!template) return null;

  return {
    id: templateId,
    name: template.name,
    description: template.description,
    exerciseCount: template.exercises.length,
    muscleGroups: [...new Set(template.exercises.map(e => e.muscle_group))]
  };
};
