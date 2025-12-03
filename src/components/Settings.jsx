import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  downloadCSV,
  exportBackup,
  importBackup,
  getStorageSize,
  isStorageNearLimit
} from '../utils/storage';
import { seedDatabase, getSeedDataStats } from '../utils/seedData';

const Settings = () => {
  const { currentUser, refreshWorkouts } = useApp();
  const [importStatus, setImportStatus] = useState('');
  const [seedStatus, setSeedStatus] = useState('');

  const storageSize = getStorageSize();
  const nearLimit = isStorageNearLimit();

  const handleExportCSV = () => {
    downloadCSV(currentUser);
    alert('CSV exported successfully!');
  };

  const handleExportAllCSV = () => {
    downloadCSV(null);
    alert('All data exported to CSV successfully!');
  };

  const handleExportBackup = () => {
    exportBackup();
    alert('Backup created successfully!');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const success = importBackup(result);
        if (success) {
          setImportStatus('success');
          alert('Backup restored successfully! Please refresh the page.');
          setTimeout(() => window.location.reload(), 1000);
        } else {
          setImportStatus('error');
          alert('Error restoring backup. Please check the file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSeedData = () => {
    const stats = getSeedDataStats();
    const confirm = window.confirm(
      `🎲 Load Demo Data?\n\n` +
      `This will create ${stats.totalWorkouts} workouts:\n` +
      `• ${stats.chrisWorkouts} for Chris\n` +
      `• ${stats.denisWorkouts} for Denis\n` +
      `• ${stats.totalExercises} exercises\n` +
      `• ${stats.totalSets} total sets\n` +
      `• Date range: ${stats.dateRange.start} to ${stats.dateRange.end}\n\n` +
      `⚠️ This will REPLACE all existing data!\n` +
      `Export a backup first if you want to keep current data.`
    );

    if (!confirm) return;

    try {
      seedDatabase();
      setSeedStatus('success');
      alert('✅ Demo data loaded successfully!\n\nThe page will now reload.');
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setSeedStatus('error');
      alert('❌ Error loading demo data: ' + error.message);
    }
  };

  const handleClearData = () => {
    const confirm1 = window.confirm(
      '⚠️ WARNING: This will delete ALL workout data. Are you sure?'
    );
    if (!confirm1) return;

    const confirm2 = window.confirm(
      '⚠️ FINAL WARNING: This action cannot be undone! Have you exported a backup?'
    );
    if (!confirm2) return;

    localStorage.clear();
    alert('All data cleared. The page will now reload.');
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings & Data Management</h2>

      <div className="space-y-6">
        {/* Storage Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Storage Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Used:</span>
              <span className="font-semibold">
                {storageSize.toFixed(2)} MB / 10 MB
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  nearLimit ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min((storageSize / 10) * 100, 100)}%` }}
              ></div>
            </div>

            {nearLimit && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                ⚠️ Storage is near capacity! Consider exporting and archiving old data.
              </div>
            )}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Export Data</h3>

          <div className="space-y-3">
            <button
              onClick={handleExportCSV}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-between"
            >
              <span>📊 Export My Workouts (CSV)</span>
              <span className="text-sm opacity-75">
                {currentUser === 'chris' ? 'Chris' : 'Denis'} only
              </span>
            </button>

            <button
              onClick={handleExportAllCSV}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-between"
            >
              <span>📊 Export All Workouts (CSV)</span>
              <span className="text-sm opacity-75">Chris + Denis</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition"
            >
              💾 Create Full Backup (JSON)
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <strong>Tip:</strong> Export regularly to prevent data loss! CSV is great for
            spreadsheets, JSON backup preserves all data.
          </div>
        </div>

        {/* Demo Data (Testing) */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-800 mb-4">🎲 Demo Data for Testing</h3>

          <p className="text-sm text-purple-700 mb-4">
            Load realistic training data (150 workouts for Chris & Denis from Jan 2024 to Jan 2025)
            to test all features including analytics and progression charts.
          </p>

          <button
            onClick={handleLoadSeedData}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition shadow-md"
          >
            🎲 Load 150 Demo Workouts
          </button>

          {seedStatus === 'success' && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✓ Demo data loaded successfully!
            </div>
          )}

          {seedStatus === 'error' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              ✗ Error loading demo data
            </div>
          )}

          <div className="mt-4 p-3 bg-purple-100 border border-purple-300 rounded-lg text-sm text-purple-800">
            <strong>What you'll get:</strong>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>75 workouts for Chris (Plan A & B alternating)</li>
              <li>75 workouts for Denis (Plan A & B alternating)</li>
              <li>Progressive weight increases over time</li>
              <li>Realistic rest-pause sets (2-4 mini-sets)</li>
              <li>Random workout notes</li>
              <li>Full year of training data to analyze</li>
            </ul>
          </div>

          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
            <strong>⚠️ Warning:</strong> This will replace all existing data! Export a backup first if needed.
          </div>
        </div>

        {/* Import/Restore */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Restore Backup</h3>

          <div className="mb-4">
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition">
                <div className="text-4xl mb-2">📁</div>
                <div className="font-medium text-gray-700 mb-1">
                  Click to select backup file
                </div>
                <div className="text-sm text-gray-500">
                  Upload a JSON backup file to restore data
                </div>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          {importStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              ✓ Backup restored successfully!
            </div>
          )}

          {importStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              ✗ Error restoring backup. Please check the file.
            </div>
          )}

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
            <strong>Warning:</strong> Importing a backup will overwrite all existing data!
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Danger Zone</h3>

          <p className="text-sm text-red-600 mb-4">
            The following action is irreversible. Make sure you have exported your data
            before proceeding.
          </p>

          <button
            onClick={handleClearData}
            className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition"
          >
            🗑️ Clear All Data
          </button>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Dog Crap Workout Tracker</strong> v1.0
            </p>
            <p>Rest-Pause Training Logger for Chris & Denis</p>
            <p className="pt-3 border-t border-gray-200">
              Built with React, Tailwind CSS, and Recharts
            </p>
            <p>Data stored locally in your browser (LocalStorage)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
