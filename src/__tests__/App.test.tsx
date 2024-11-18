// src/__tests__/App.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  (global.alert as jest.Mock).mockClear();
  (navigator.clipboard.writeText as jest.Mock).mockClear();
});

test('renders JSON Editor and Form Preview', async () => {
  render(<App />);
  
  // Use findByText which returns a promise and waits for the element to appear
  const editorElement = await screen.findByText(/JSON Editor/i);
  const previewElement = await screen.findByText(/Form Preview/i);
  
  expect(editorElement).toBeInTheDocument();
  expect(previewElement).toBeInTheDocument();
});

test('toggles dark mode', async () => {
  render(<App />);
  const toggleButton = await screen.findByRole('button', { name: /toggle dark mode/i });
  
  // Initially, dark mode should be off
  expect(document.documentElement).not.toHaveClass('dark');
  
  // Click the toggle button
  fireEvent.click(toggleButton);
  
  // Wait for the dark mode class to be added
  await waitFor(() => {
    expect(document.documentElement).toHaveClass('dark');
  });
  
  // Click again to toggle back
  fireEvent.click(toggleButton);
  
  // Wait for the dark mode class to be removed
  await waitFor(() => {
    expect(document.documentElement).not.toHaveClass('dark');
  });
});

test('copies JSON to clipboard and shows alert', async () => {
  render(<App />);
  
  const copyButton = await screen.findByRole('button', { name: /copy form json/i });
  
  // Mock the clipboard
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
  });
  
  fireEvent.click(copyButton);
  
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.any(String));
  
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('JSON copied to clipboard!');
  });
});