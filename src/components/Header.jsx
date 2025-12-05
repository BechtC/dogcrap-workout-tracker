import { useApp } from '../context/AppContext';

const Header = () => {
  const { currentUser, switchUser, setView, view } = useApp();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-gray-900 text-white shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">💪</div>
            <div>
              <h1 className="text-2xl font-bold">Dog Crap Tracker</h1>
              <p className="text-xs text-blue-100">Rest-Pause Training Logger</p>
            </div>
          </div>

          {/* User Selection */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Training as:</span>
            <div className="flex gap-2 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => switchUser('chris')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  currentUser === 'chris'
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Chris
              </button>
              <button
                onClick={() => switchUser('denis')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  currentUser === 'denis'
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Denis
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex gap-2 border-t border-blue-500 pt-3">
          <button
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'dashboard'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('new-workout')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'new-workout'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            + New Workout
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'history'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setView('analytics')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'analytics'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setView('competition')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'competition'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Competition
          </button>
          <button
            onClick={() => setView('settings')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              view === 'settings'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-white/20'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
