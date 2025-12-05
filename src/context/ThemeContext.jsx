import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize state and immediately sync with DOM
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dogcrap_theme');
    const shouldBeDark = saved === 'dark';

    // Immediately apply to DOM during initialization
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return shouldBeDark;
  });

  // Sync DOM whenever state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dogcrap_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dogcrap_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
