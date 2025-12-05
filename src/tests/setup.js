import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

global.localStorage = localStorageMock;

// Cleanup after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.className = '';
});

// Setup before each test
beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});
