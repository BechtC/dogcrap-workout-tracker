import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  getExerciseProgression,
  getVolumeProgression,
  getUniqueExercises,
  formatChartDate,
  getPersonalRecords
} from '../utils/calculations';

const Analytics = () => {
  const { workouts } = useApp();
  const [selectedExercise, setSelectedExercise] = useState('');

  const uniqueExercises = getUniqueExercises(workouts);
  const volumeData = getVolumeProgression(workouts);
  const personalRecords = getPersonalRecords(workouts);

  const exerciseProgressionData = selectedExercise
    ? getExerciseProgression(workouts, selectedExercise)
    : [];

  // Format data for charts
  const volumeChartData = volumeData.map((d) => ({
    ...d,
    date: formatChartDate(d.date),
    planA: d.plan === 'A' ? d.volume : 0,
    planB: d.plan === 'B' ? d.volume : 0
  }));

  const strengthChartData = exerciseProgressionData.map((d) => ({
    ...d,
    date: formatChartDate(d.date)
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Analytics & Progress</h2>

      {workouts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600 dark:text-gray-400">
            No workout data yet. Start tracking to see your progress!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Personal Records */}
          {Object.keys(personalRecords).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                🏆 Personal Records
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {Object.entries(personalRecords).map(([exercise, records]) => (
                  <div
                    key={exercise}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="font-semibold text-gray-800 dark:text-white mb-2">
                      {exercise}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Max Weight:</span>
                        <span className="font-medium">
                          {records.maxWeight.value} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Max Reps:</span>
                        <span className="font-medium">
                          {records.maxReps.value}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Max Volume:</span>
                        <span className="font-medium">
                          {Math.round(records.maxVolume.value)} kg
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volume Progression */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Volume Progression Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Volume (kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="planA" fill="#3b82f6" name="Plan A" stackId="a" />
                <Bar dataKey="planB" fill="#22c55e" name="Plan B" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Strength Progression */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Strength Progression by Exercise
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Exercise
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an exercise...</option>
                {uniqueExercises.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
            </div>

            {selectedExercise ? (
              exerciseProgressionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={strengthChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis
                      yAxisId="left"
                      label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: 'Total Reps', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="maxWeight"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Max Weight (kg)"
                      dot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="totalReps"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Total Reps"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No data for this exercise
                </div>
              )
            ) : (
              <div className="text-center py-12 text-gray-400">
                Select an exercise to view progression
              </div>
            )}
          </div>

          {/* Volume by Exercise Chart */}
          {selectedExercise && exerciseProgressionData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {selectedExercise} - Volume Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={strengthChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Volume (kg)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Volume (kg)"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Analytics;
