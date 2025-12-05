import { useTheme } from '../context/ThemeContext';

const ThemeDebug = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '20px',
      background: 'red',
      color: 'white',
      borderRadius: '8px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>Theme Debug:</div>
      <div>isDarkMode: {isDarkMode ? 'TRUE' : 'FALSE'}</div>
      <div>HTML class: {document.documentElement.className}</div>
      <div>LocalStorage: {localStorage.getItem('dogcrap_theme')}</div>
      <button
        onClick={toggleTheme}
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeDebug;
