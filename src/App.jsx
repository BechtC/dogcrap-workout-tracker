import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NewWorkout from './components/NewWorkout';
import WorkoutHistory from './components/WorkoutHistory';
import Analytics from './components/Analytics';
import Competition from './components/Competition';
import WorkoutTemplateManager from './components/WorkoutTemplateManager';
import Settings from './components/Settings';

function AppContent() {
  const { view } = useApp();

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-workout':
        return <NewWorkout />;
      case 'history':
        return <WorkoutHistory />;
      case 'analytics':
        return <Analytics />;
      case 'competition':
        return <Competition />;
      case 'templates':
        return <WorkoutTemplateManager />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main>{renderView()}</main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-200">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Dog Crap Workout Tracker v1.1.2 - Built for Chris & Denis</p>
          <p className="mt-1">Rest-Pause Training Logger • Data stored locally in your browser</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
