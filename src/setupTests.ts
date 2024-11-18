// src/setupTests.ts

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Mock the clipboard API
Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
    },
  });
  
  // Optionally, mock window.alert if your tests use it
  global.alert = jest.fn();