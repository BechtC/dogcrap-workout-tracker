import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getUserWorkouts } from '../utils/storage';
import {
  getPersonalRecords,
  getUniqueExercises,
  calculateWorkoutVolume,
  getMaxWeight,
  calculateTotalReps,
  calculateExerciseVolume
} from '../utils/calculations';

const Competition = () => {
  const { workouts } = useApp();
  const [selectedView, setSelectedView] = useState('overview'); // overview, exercise-detail, progress

  // Get workouts for each user
  const chrisWorkouts = getUserWorkouts('chris');
  const denisWorkouts = getUserWorkouts('denis');

  // Calculate overall stats
  const chrisStats = calculateOverallStats(chrisWorkouts);
  const denisStats = calculateOverallStats(denisWorkouts);

  // Get PRs for each user
  const chrisPRs = getPersonalRecords(chrisWorkouts);
  const denisPRs = getPersonalRecords(denisWorkouts);

  // Get all exercises from both users
  const allExercises = [
    ...new Set([
      ...getUniqueExercises(chrisWorkouts),
      ...getUniqueExercises(denisWorkouts)
    ])
  ].sort();

  // Calculate exercise comparisons
  const exerciseComparisons = compareExercises(allExercises, chrisPRs, denisPRs);

  // Calculate who's winning
  const scorecard = calculateScorecard(exerciseComparisons);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🏆 Competition Zone</h2>
        <p className="text-gray-600">Chris vs Denis - May the best lifter win!</p>
      </div>

      {/* View Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedView === 'overview'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedView('exercise-detail')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedView === 'exercise-detail'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Exercise by Exercise
        </button>
        <button
          onClick={() => setSelectedView('progress')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedView === 'progress'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Progress Battle
        </button>
      </div>

      {/* Overview Section */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Scorecard */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Overall Scorecard</h3>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="text-4xl font-bold">{scorecard.chris}</div>
                <div className="text-purple-100">Chris Wins</div>
              </div>
              <div className="text-center">
                <div className="text-6xl">🏆</div>
                <div className="text-sm text-purple-100 mt-2">
                  {scorecard.chris > scorecard.denis
                    ? 'Chris Leads!'
                    : scorecard.denis > scorecard.chris
                    ? 'Denis Leads!'
                    : 'Tied!'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{scorecard.denis}</div>
                <div className="text-purple-100">Denis Wins</div>
              </div>
            </div>
          </div>

          {/* Overall Stats Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chris Stats */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💪</div>
                <h3 className="text-xl font-bold text-blue-800">Chris</h3>
              </div>
              <div className="space-y-3">
                <StatRow
                  label="Total Workouts"
                  value={chrisStats.totalWorkouts}
                  winner={chrisStats.totalWorkouts >= denisStats.totalWorkouts}
                />
                <StatRow
                  label="Total Volume (kg)"
                  value={chrisStats.totalVolume.toLocaleString()}
                  winner={chrisStats.totalVolume >= denisStats.totalVolume}
                />
                <StatRow
                  label="Avg Volume/Workout"
                  value={Math.round(chrisStats.avgVolume).toLocaleString()}
                  winner={chrisStats.avgVolume >= denisStats.avgVolume}
                />
                <StatRow
                  label="Total Exercises"
                  value={chrisStats.totalExercises}
                  winner={chrisStats.totalExercises >= denisStats.totalExercises}
                />
                <StatRow
                  label="Total Reps"
                  value={chrisStats.totalReps.toLocaleString()}
                  winner={chrisStats.totalReps >= denisStats.totalReps}
                />
              </div>
            </div>

            {/* Denis Stats */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">💪</div>
                <h3 className="text-xl font-bold text-green-800">Denis</h3>
              </div>
              <div className="space-y-3">
                <StatRow
                  label="Total Workouts"
                  value={denisStats.totalWorkouts}
                  winner={denisStats.totalWorkouts >= chrisStats.totalWorkouts}
                />
                <StatRow
                  label="Total Volume (kg)"
                  value={denisStats.totalVolume.toLocaleString()}
                  winner={denisStats.totalVolume >= chrisStats.totalVolume}
                />
                <StatRow
                  label="Avg Volume/Workout"
                  value={Math.round(denisStats.avgVolume).toLocaleString()}
                  winner={denisStats.avgVolume >= chrisStats.avgVolume}
                />
                <StatRow
                  label="Total Exercises"
                  value={denisStats.totalExercises}
                  winner={denisStats.totalExercises >= chrisStats.totalExercises}
                />
                <StatRow
                  label="Total Reps"
                  value={denisStats.totalReps.toLocaleString()}
                  winner={denisStats.totalReps >= chrisStats.totalReps}
                />
              </div>
            </div>
          </div>

          {/* Top 5 Battles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Closest Battles</h3>
            <div className="space-y-3">
              {exerciseComparisons
                .filter(ex => ex.christWeightDiff !== null)
                .sort((a, b) => Math.abs(a.weightDiff) - Math.abs(b.weightDiff))
                .slice(0, 5)
                .map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏅'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{ex.exercise}</div>
                      <div className="text-sm text-gray-600">
                        Chris: {ex.chrisWeight}kg vs Denis: {ex.denisWeight}kg
                        <span className="ml-2 text-purple-600 font-medium">
                          (Diff: {Math.abs(ex.weightDiff).toFixed(1)}kg)
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl">
                      {ex.weightDiff > 0 ? '🔵' : ex.weightDiff < 0 ? '🟢' : '🟡'}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Exercise Detail Section */}
      {selectedView === 'exercise-detail' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-4 gap-2 p-3 bg-gray-100 rounded-lg font-semibold text-sm mb-2">
              <div>Exercise</div>
              <div className="text-center">Chris (Max Weight)</div>
              <div className="text-center">Denis (Max Weight)</div>
              <div className="text-center">Winner</div>
            </div>

            {exerciseComparisons.map((ex, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 gap-2 p-3 border-b border-gray-100 hover:bg-gray-50 items-center"
              >
                <div className="font-medium text-gray-800">{ex.exercise}</div>
                <div className={`text-center ${ex.weightWinner === 'chris' ? 'text-blue-600 font-bold' : ''}`}>
                  {ex.chrisWeight ? `${ex.chrisWeight} kg` : '-'}
                  {ex.chrisReps && (
                    <span className="text-xs text-gray-500 ml-1">({ex.chrisReps} reps)</span>
                  )}
                </div>
                <div className={`text-center ${ex.weightWinner === 'denis' ? 'text-green-600 font-bold' : ''}`}>
                  {ex.denisWeight ? `${ex.denisWeight} kg` : '-'}
                  {ex.denisReps && (
                    <span className="text-xs text-gray-500 ml-1">({ex.denisReps} reps)</span>
                  )}
                </div>
                <div className="text-center text-2xl">
                  {ex.weightWinner === 'chris' ? '🔵' : ex.weightWinner === 'denis' ? '🟢' : '➖'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Battle Section */}
      {selectedView === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompetitiveMetricCard
              title="Consistency King"
              chrisValue={chrisStats.totalWorkouts}
              denisValue={denisStats.totalWorkouts}
              unit="workouts"
              icon="📅"
            />
            <CompetitiveMetricCard
              title="Volume Beast"
              chrisValue={chrisStats.totalVolume}
              denisValue={denisStats.totalVolume}
              unit="kg total"
              icon="📊"
            />
            <CompetitiveMetricCard
              title="Rep Monster"
              chrisValue={chrisStats.totalReps}
              denisValue={denisStats.totalReps}
              unit="reps"
              icon="🔢"
            />
          </div>

          {/* Muscle Group Champions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Muscle Group Champions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getMuscleGroupChampions(exerciseComparisons).map((group, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-2">{group.muscle}</div>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 ${group.winner === 'chris' ? 'text-blue-600' : 'text-gray-400'}`}>
                      <span className="text-xl">💪</span>
                      <span className="font-medium">Chris: {group.chrisWins}</span>
                    </div>
                    <div className="text-2xl">
                      {group.winner === 'chris' ? '🔵' : group.winner === 'denis' ? '🟢' : '➖'}
                    </div>
                    <div className={`flex items-center gap-2 ${group.winner === 'denis' ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className="font-medium">Denis: {group.denisWins}</span>
                      <span className="text-xl">💪</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strength Gap Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Biggest Strength Gaps</h3>
            <div className="space-y-3">
              {exerciseComparisons
                .filter(ex => ex.weightDiff !== null && Math.abs(ex.weightDiff) > 5)
                .sort((a, b) => Math.abs(b.weightDiff) - Math.abs(a.weightDiff))
                .slice(0, 10)
                .map((ex, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{ex.exercise}</div>
                        <div className="text-sm text-gray-600">
                          {ex.weightDiff > 0 ? 'Chris' : 'Denis'} ahead by{' '}
                          <span className="font-bold text-purple-600">
                            {Math.abs(ex.weightDiff).toFixed(1)} kg
                          </span>
                          {' '}({Math.abs(ex.percentDiff).toFixed(1)}%)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${ex.weightDiff > 0 ? 'text-blue-600' : 'text-green-600'} font-medium`}>
                          {ex.weightDiff > 0 ? ex.chrisWeight : ex.denisWeight} kg
                        </div>
                        <div className="text-xs text-gray-500">vs {ex.weightDiff > 0 ? ex.denisWeight : ex.chrisWeight} kg</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${ex.weightDiff > 0 ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(Math.abs(ex.percentDiff), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const StatRow = ({ label, value, winner }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className={`font-semibold ${winner ? 'text-green-600' : 'text-gray-700'}`}>
      {value} {winner && '👑'}
    </span>
  </div>
);

const CompetitiveMetricCard = ({ title, chrisValue, denisValue, unit, icon }) => {
  const chrisWins = chrisValue > denisValue;
  const denisWins = denisValue > chrisValue;
  const tied = chrisValue === denisValue;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="font-bold text-gray-800">{title}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className={`text-center p-3 rounded-lg ${chrisWins ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
          <div className="text-xs text-gray-600 mb-1">Chris</div>
          <div className="font-bold text-lg">{chrisValue.toLocaleString()}</div>
          {chrisWins && <div className="text-xl mt-1">👑</div>}
        </div>
        <div className={`text-center p-3 rounded-lg ${denisWins ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
          <div className="text-xs text-gray-600 mb-1">Denis</div>
          <div className="font-bold text-lg">{denisValue.toLocaleString()}</div>
          {denisWins && <div className="text-xl mt-1">👑</div>}
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">{unit}</div>
    </div>
  );
};

// Helper Functions
function calculateOverallStats(workouts) {
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, w) => sum + calculateWorkoutVolume(w), 0);
  const totalExercises = workouts.reduce((sum, w) => sum + (w.exercises?.length || 0), 0);
  const totalReps = workouts.reduce((sum, w) => {
    return sum + (w.exercises?.reduce((s, e) => s + calculateTotalReps(e.sets), 0) || 0);
  }, 0);

  return {
    totalWorkouts,
    totalVolume,
    avgVolume: totalWorkouts > 0 ? totalVolume / totalWorkouts : 0,
    totalExercises,
    totalReps
  };
}

function compareExercises(exercises, chrisPRs, denisPRs) {
  return exercises.map(exercise => {
    const chrisPR = chrisPRs[exercise];
    const denisPR = denisPRs[exercise];

    const chrisWeight = chrisPR?.maxWeight.value || null;
    const denisWeight = denisPR?.maxWeight.value || null;

    let weightDiff = null;
    let percentDiff = null;
    let weightWinner = null;

    if (chrisWeight !== null && denisWeight !== null) {
      weightDiff = chrisWeight - denisWeight;
      percentDiff = ((weightDiff / denisWeight) * 100);
      weightWinner = chrisWeight > denisWeight ? 'chris' : denisWeight > chrisWeight ? 'denis' : 'tie';
    } else if (chrisWeight !== null) {
      weightWinner = 'chris';
    } else if (denisWeight !== null) {
      weightWinner = 'denis';
    }

    return {
      exercise,
      chrisWeight,
      denisWeight,
      chrisReps: chrisPR?.maxReps.value || null,
      denisReps: denisPR?.maxReps.value || null,
      weightDiff,
      percentDiff,
      weightWinner
    };
  });
}

function calculateScorecard(comparisons) {
  let chris = 0;
  let denis = 0;

  comparisons.forEach(comp => {
    if (comp.weightWinner === 'chris') chris++;
    else if (comp.weightWinner === 'denis') denis++;
  });

  return { chris, denis };
}

function getMuscleGroupChampions(comparisons) {
  const muscleGroups = ['Chest', 'Shoulders', 'Triceps', 'Back Width', 'Back Thickness',
                        'Biceps', 'Forearms', 'Quads', 'Hamstrings', 'Calves'];

  return muscleGroups.map(muscle => {
    const muscleComps = comparisons.filter(c =>
      c.exercise.toLowerCase().includes(muscle.toLowerCase())
    );

    let chrisWins = 0;
    let denisWins = 0;

    muscleComps.forEach(comp => {
      if (comp.weightWinner === 'chris') chrisWins++;
      else if (comp.weightWinner === 'denis') denisWins++;
    });

    return {
      muscle,
      chrisWins,
      denisWins,
      winner: chrisWins > denisWins ? 'chris' : denisWins > chrisWins ? 'denis' : 'tie'
    };
  }).filter(g => g.chrisWins > 0 || g.denisWins > 0);
}

export default Competition;
