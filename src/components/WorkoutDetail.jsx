import { useApp } from '../context/AppContext';
import { getWorkoutStats, formatDate, calculateTotalReps } from '../utils/calculations';

const WorkoutDetail = ({ workout, onBack }) => {
  const { removeWorkout, setView } = useApp();
  const stats = getWorkoutStats(workout);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      removeWorkout(workout.id);
      onBack();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back to History
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-2xl ${
                workout.plan === 'A' ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {workout.plan}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Plan {workout.plan} Workout
                </h2>
                <p className="text-gray-600">{formatDate(workout.date)}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-medium text-sm"
          >
            Delete Workout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.exerciseCount}</div>
            <div className="text-xs text-gray-600">Exercises</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.totalSets}</div>
            <div className="text-xs text-gray-600">Total Sets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.totalReps}</div>
            <div className="text-xs text-gray-600">Total Reps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {stats.totalVolume.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Volume (kg)</div>
          </div>
        </div>

        {/* Notes */}
        {workout.notes && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-medium text-yellow-800 mb-1">Notes</div>
            <div className="text-yellow-700">{workout.notes}</div>
          </div>
        )}

        {/* Exercises */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Exercises</h3>

          {workout.exercises && workout.exercises.length > 0 ? (
            <div className="space-y-4">
              {workout.exercises.map((exercise, idx) => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-lg p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg text-gray-800">
                        {idx + 1}. {exercise.exercise_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {exercise.muscle_group}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Reps</div>
                      <div className="text-lg font-bold text-blue-600">
                        {calculateTotalReps(exercise.sets)}
                      </div>
                    </div>
                  </div>

                  {/* Sets Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs text-gray-600">
                          <th className="px-3 py-2 rounded-tl">Mini-Set</th>
                          <th className="px-3 py-2">Weight (kg)</th>
                          <th className="px-3 py-2">Reps</th>
                          <th className="px-3 py-2 rounded-tr">Volume (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exercise.sets?.map((set, setIdx) => (
                          <tr key={setIdx} className="border-t border-gray-100">
                            <td className="px-3 py-2 font-medium text-gray-700">
                              Set {set.set_number}
                            </td>
                            <td className="px-3 py-2">{set.weight_kg}</td>
                            <td className="px-3 py-2">{set.reps}</td>
                            <td className="px-3 py-2 font-medium">
                              {(set.weight_kg * set.reps).toFixed(0)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300 font-bold bg-gray-50">
                          <td className="px-3 py-2" colSpan="2">Total</td>
                          <td className="px-3 py-2">{calculateTotalReps(exercise.sets)}</td>
                          <td className="px-3 py-2">
                            {exercise.sets
                              ?.reduce((sum, s) => sum + s.weight_kg * s.reps, 0)
                              .toFixed(0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No exercises recorded for this workout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
