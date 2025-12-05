import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component that uses the theme hook
const TestComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme-status">
        {isDarkMode ? 'dark' : 'light'}
      </div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage and document classes before each test
    localStorage.clear();
    document.documentElement.className = '';
  });

  describe('Theme Initialization', () => {
    it('should default to light mode when no preference is saved', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      expect(status.textContent).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should load dark mode from localStorage when saved', () => {
      localStorage.setItem('dogcrap_theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      expect(status.textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should load light mode from localStorage when saved', () => {
      localStorage.setItem('dogcrap_theme', 'light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      expect(status.textContent).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle from light to dark mode', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      const toggleButton = screen.getByTestId('toggle-button');

      // Initial state: light mode
      expect(status.textContent).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Toggle to dark mode
      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(status.textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle from dark to light mode', () => {
      localStorage.setItem('dogcrap_theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      const toggleButton = screen.getByTestId('toggle-button');

      // Initial state: dark mode
      expect(status.textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Toggle to light mode
      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(status.textContent).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      const toggleButton = screen.getByTestId('toggle-button');

      // Start: light
      expect(status.textContent).toBe('light');

      // Toggle 1: light -> dark
      act(() => {
        fireEvent.click(toggleButton);
      });
      expect(status.textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Toggle 2: dark -> light
      act(() => {
        fireEvent.click(toggleButton);
      });
      expect(status.textContent).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Toggle 3: light -> dark
      act(() => {
        fireEvent.click(toggleButton);
      });
      expect(status.textContent).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should save light mode to localStorage', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(localStorage.getItem('dogcrap_theme')).toBe('light');
    });

    it('should save dark mode to localStorage when toggled', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(localStorage.getItem('dogcrap_theme')).toBe('dark');
    });

    it('should update localStorage on every toggle', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      // Toggle to dark
      act(() => {
        fireEvent.click(toggleButton);
      });
      expect(localStorage.getItem('dogcrap_theme')).toBe('dark');

      // Toggle back to light
      act(() => {
        fireEvent.click(toggleButton);
      });
      expect(localStorage.getItem('dogcrap_theme')).toBe('light');
    });
  });

  describe('Document Class Management', () => {
    it('should add "dark" class to document.documentElement in dark mode', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove "dark" class from document.documentElement in light mode', () => {
      localStorage.setItem('dogcrap_theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      // Start in dark mode
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Toggle to light mode
      act(() => {
        fireEvent.click(toggleButton);
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid localStorage value gracefully', () => {
      localStorage.setItem('dogcrap_theme', 'invalid_value');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const status = screen.getByTestId('theme-status');
      // Should default to light mode for invalid values
      expect(status.textContent).toBe('light');
    });

    it('should throw error when useTheme is used outside ThemeProvider', () => {
      // Mock console.error to avoid test output pollution
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within ThemeProvider');

      console.error = originalError;
    });
  });
});
