import { useState, useEffect } from 'react';
import { WORKOUT_TEMPLATES } from '../utils/workoutTemplates';
import {
  MUSCLE_GROUPS,
  getExercisesByMuscleGroup,
  addCustomExercise,
  getAllExercises
} from '../utils/exerciseRegistry';

const WorkoutTemplateManager = () => {
  // Load custom templates from localStorage
  const [customTemplates, setCustomTemplates] = useState(() => {
    const saved = localStorage.getItem('dogcrap_custom_templates');
    return saved ? JSON.parse(saved) : {};
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state for new/edit template
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    plan: 'A',
    exercises: []
  });

  // Exercise form state
  const [exerciseForm, setExerciseForm] = useState({
    muscle_group: '',
    exercise_name: '',
    technique: 'Rest-Pause',
    target_reps: '11-15 total',
    alternatives: []
  });

  // Exercise selection mode: 'existing' or 'new'
  const [exerciseMode, setExerciseMode] = useState('existing');

  // Available exercises for selected muscle group
  const [availableExercises, setAvailableExercises] = useState([]);

  // Save to localStorage whenever customTemplates change
  useEffect(() => {
    localStorage.setItem('dogcrap_custom_templates', JSON.stringify(customTemplates));
  }, [customTemplates]);

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      plan: 'A',
      exercises: []
    });
  };

  const handleEdit = (templateId) => {
    const template = customTemplates[templateId];
    setIsCreating(true);
    setEditingId(templateId);
    setFormData({
      id: templateId,
      name: template.name,
      description: template.description,
      plan: template.plan,
      exercises: [...template.exercises]
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      plan: 'A',
      exercises: []
    });
    setExerciseForm({
      muscle_group: '',
      exercise_name: '',
      technique: 'Rest-Pause',
      target_reps: '11-15 total',
      alternatives: []
    });
    setExerciseMode('existing');
    setAvailableExercises([]);
  };

  // Handle muscle group selection
  const handleMuscleGroupChange = (muscleGroup) => {
    setExerciseForm(prev => ({
      ...prev,
      muscle_group: muscleGroup,
      exercise_name: '',
      technique: 'Rest-Pause',
      target_reps: '11-15 total',
      alternatives: []
    }));

    // Load exercises for this muscle group
    if (muscleGroup) {
      const exercises = getExercisesByMuscleGroup(muscleGroup);
      setAvailableExercises(exercises);
      setExerciseMode('existing');
    } else {
      setAvailableExercises([]);
    }
  };

  // Handle exercise selection from dropdown
  const handleExerciseSelection = (exerciseName) => {
    if (exerciseName === '__new__') {
      // Switch to "Create New Exercise" mode
      setExerciseMode('new');
      setExerciseForm(prev => ({
        ...prev,
        exercise_name: '',
        technique: 'Rest-Pause',
        target_reps: '11-15 total',
        alternatives: []
      }));
    } else {
      // Load selected exercise data
      const exercise = availableExercises.find(ex => ex.exercise_name === exerciseName);
      if (exercise) {
        setExerciseForm(prev => ({
          ...prev,
          exercise_name: exercise.exercise_name,
          technique: exercise.technique,
          target_reps: exercise.target_reps,
          alternatives: exercise.alternatives || []
        }));
        setExerciseMode('existing');
      }
    }
  };

  const handleAddExercise = () => {
    if (!exerciseForm.muscle_group || !exerciseForm.exercise_name) {
      alert('Please fill in muscle group and exercise name');
      return;
    }

    // If creating a new exercise, add it to the registry
    if (exerciseMode === 'new') {
      try {
        addCustomExercise({
          muscle_group: exerciseForm.muscle_group,
          exercise_name: exerciseForm.exercise_name,
          technique: exerciseForm.technique,
          target_reps: exerciseForm.target_reps,
          alternatives: exerciseForm.alternatives
        });
      } catch (error) {
        // Exercise might already exist, that's ok - just use it
        console.log('Exercise may already exist:', error.message);
      }
    }

    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, { ...exerciseForm }]
    }));

    // Reset exercise form
    const currentMuscleGroup = exerciseForm.muscle_group;
    setExerciseForm({
      muscle_group: currentMuscleGroup,
      exercise_name: '',
      technique: 'Rest-Pause',
      target_reps: '11-15 total',
      alternatives: []
    });
    setExerciseMode('existing');

    // Refresh available exercises for the current muscle group
    if (currentMuscleGroup) {
      const exercises = getExercisesByMuscleGroup(currentMuscleGroup);
      setAvailableExercises(exercises);
    }
  };

  const handleRemoveExercise = (index) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleSaveTemplate = () => {
    if (!formData.id || !formData.name || formData.exercises.length === 0) {
      alert('Please provide template ID, name, and at least one exercise');
      return;
    }

    // Check if ID already exists (when creating new)
    if (!editingId && (WORKOUT_TEMPLATES[formData.id] || customTemplates[formData.id])) {
      alert('Template ID already exists. Please choose a different ID.');
      return;
    }

    const newTemplate = {
      name: formData.name,
      description: formData.description,
      plan: formData.plan,
      exercises: formData.exercises
    };

    if (editingId && editingId !== formData.id) {
      // If ID changed during edit, remove old and add new
      const updated = { ...customTemplates };
      delete updated[editingId];
      updated[formData.id] = newTemplate;
      setCustomTemplates(updated);
    } else {
      // Normal save
      setCustomTemplates(prev => ({
        ...prev,
        [formData.id]: newTemplate
      }));
    }

    alert(`Template "${formData.name}" saved successfully!`);
    handleCancel();
  };

  const handleDeleteTemplate = (templateId) => {
    if (!confirm(`Are you sure you want to delete template "${customTemplates[templateId].name}"?`)) {
      return;
    }

    const updated = { ...customTemplates };
    delete updated[templateId];
    setCustomTemplates(updated);
  };

  const handleAlternativeChange = (value) => {
    const alternatives = value.split(',').map(s => s.trim()).filter(s => s);
    setExerciseForm(prev => ({ ...prev, alternatives }));
  };

  // Combine built-in and custom templates for display
  const allTemplates = {
    builtin: WORKOUT_TEMPLATES,
    custom: customTemplates
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Workout Template Manager</h2>
        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Create Custom Template
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border-2 border-blue-500">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {editingId ? 'Edit Template' : 'Create New Template'}
          </h3>

          {/* Template Info */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template ID *
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toUpperCase() }))}
                  placeholder="e.g., A4, B4, CUSTOM1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Plan Type *
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="A">Plan A (Upper Body)</option>
                  <option value="B">Plan B (Legs & Arms)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Plan A4 - Custom Upper"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., Upper Body - Heavy Compound Focus"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Exercise List */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Exercises ({formData.exercises.length})
            </h4>

            {formData.exercises.length > 0 && (
              <div className="space-y-2 mb-4">
                {formData.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {exercise.exercise_name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.muscle_group} • {exercise.technique} • {exercise.target_reps}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(index)}
                      className="text-red-600 hover:text-red-700 font-medium ml-4"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Exercise Form */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Add Exercise</h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Muscle Group *
                  </label>
                  <select
                    value={exerciseForm.muscle_group}
                    onChange={(e) => handleMuscleGroupChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Select Muscle Group --</option>
                    {MUSCLE_GROUPS.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Exercise *
                  </label>
                  {!exerciseForm.muscle_group ? (
                    <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Select muscle group first
                    </div>
                  ) : (
                    <select
                      value={exerciseMode === 'new' ? '__new__' : exerciseForm.exercise_name}
                      onChange={(e) => handleExerciseSelection(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">-- Select Exercise --</option>
                      {availableExercises.map(exercise => (
                        <option key={exercise.exercise_name} value={exercise.exercise_name}>
                          {exercise.exercise_name} {exercise.isBuiltIn ? '' : '(Custom)'}
                        </option>
                      ))}
                      <option value="__new__">➕ Create New Exercise</option>
                    </select>
                  )}
                </div>

                {exerciseMode === 'new' && (
                  <>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Exercise Name *
                      </label>
                      <input
                        type="text"
                        value={exerciseForm.exercise_name}
                        onChange={(e) => setExerciseForm(prev => ({ ...prev, exercise_name: e.target.value }))}
                        placeholder="e.g., Cable Flyes"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Technique
                  </label>
                  <input
                    type="text"
                    value={exerciseForm.technique}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, technique: e.target.value }))}
                    placeholder="e.g., Rest-Pause, Straight Sets"
                    disabled={exerciseMode === 'existing' && !exerciseForm.exercise_name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Reps
                  </label>
                  <input
                    type="text"
                    value={exerciseForm.target_reps}
                    onChange={(e) => setExerciseForm(prev => ({ ...prev, target_reps: e.target.value }))}
                    placeholder="e.g., 11-15 total"
                    disabled={exerciseMode === 'existing' && !exerciseForm.exercise_name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Alternative Exercises (comma-separated)
                </label>
                <input
                  type="text"
                  value={exerciseForm.alternatives.join(', ')}
                  onChange={(e) => handleAlternativeChange(e.target.value)}
                  placeholder="e.g., Dumbbell Press, Machine Press"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={handleAddExercise}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                + Add Exercise
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSaveTemplate}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              💾 Save Template
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Built-in Templates */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Built-in Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(allTemplates.builtin).map(([id, template]) => (
            <div
              key={id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
                  {id}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  Plan {template.plan}
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                {template.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {template.description}
              </p>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                📋 {template.exercises.length} exercises
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Templates */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Custom Templates ({Object.keys(customTemplates).length})
        </h3>

        {Object.keys(customTemplates).length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <div className="text-4xl mb-3">📝</div>
            <div className="text-gray-600 dark:text-gray-400 mb-2">
              No custom templates yet
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Click "Create Custom Template" to get started
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(customTemplates).map(([id, template]) => (
              <div
                key={id}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-bold">
                    {id}
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    Plan {template.plan}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description || 'Custom template'}
                </p>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  📋 {template.exercises.length} exercises
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutTemplateManager;
