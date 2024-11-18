// src/__tests__/App.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  // Clear all mock function calls and instances
  jest.clearAllMocks();
});

test('renders JSON Editor and Form Preview', async () => {
  render(<App />);
  
  const jsonEditor = await screen.findByText(/JSON Editor/i);
  const formPreview = await screen.findByText(/Form Preview/i);
  
  expect(jsonEditor).toBeInTheDocument();
  expect(formPreview).toBeInTheDocument();
});

test('toggles dark mode', async () => {
  render(<App />);
  
  const toggleButton = screen.getByRole('button', { name: /dark mode/i });
  
  // Initially in light mode
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  
  // Toggle to dark mode
  fireEvent.click(toggleButton);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  
  // Toggle back to light mode
  fireEvent.click(toggleButton);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});

test('copies JSON to clipboard and shows alert', async () => {
  render(<App />);
  
  const copyButton = screen.getByRole('button', { name: /copy/i }); // Adjust the role/name as per your button
  
  fireEvent.click(copyButton);
  
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.any(String));
  expect(global.alert).toHaveBeenCalledWith('JSON copied to clipboard!');
});