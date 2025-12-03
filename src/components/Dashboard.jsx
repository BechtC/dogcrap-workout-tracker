import { useApp } from '../context/AppContext';
import { getWorkoutStats, formatDate } from '../utils/calculations';

const Dashboard = () => {
  const { workouts, setView, setActiveWorkout, currentUser } = useApp();

  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalWorkouts = workouts.length;
  const planACount = workouts.filter(w => w.plan === 'A').length;
  const planBCount = workouts.filter(w => w.plan === 'B').length;

  const totalVolume = workouts.reduce((sum, w) => {
    return sum + getWorkoutStats(w).totalVolume;
  }, 0);

  const handleViewWorkout = (workout) => {
    setActiveWorkout(workout);
    setView('workout-detail');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {currentUser === 'chris' ? 'Chris' : 'Denis'}!
        </h2>
        <p className="text-gray-600">Track your Dog Crap training progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 font-medium">Total Workouts</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{totalWorkouts}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 font-medium">Plan A Sessions</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{planACount}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 font-medium">Plan B Sessions</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{planBCount}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="text-sm text-gray-600 font-medium">Total Volume (kg)</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">
            {totalVolume.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Workouts</h3>
          <button
            onClick={() => setView('history')}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View All →
          </button>
        </div>

        {recentWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏋️</div>
            <p className="text-gray-600 mb-4">No workouts yet!</p>
            <button
              onClick={() => setView('new-workout')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start Your First Workout
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentWorkouts.map((workout) => {
              const stats = getWorkoutStats(workout);
              return (
                <div
                  key={workout.id}
                  onClick={() => handleViewWorkout(workout)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      workout.plan === 'A' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {workout.plan}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Plan {workout.plan} - {formatDate(workout.date)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stats.exerciseCount} exercises • {stats.totalSets} sets • {stats.totalReps} reps
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Volume</div>
                    <div className="font-bold text-gray-800">
                      {stats.totalVolume.toLocaleString()} kg
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setView('new-workout')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-3"
        >
          <span className="text-2xl">+</span>
          <span className="font-semibold text-lg">Start New Workout</span>
        </button>

        <button
          onClick={() => setView('analytics')}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center gap-3"
        >
          <span className="text-2xl">📊</span>
          <span className="font-semibold text-lg">View Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
