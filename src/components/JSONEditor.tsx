// src/components/JSONEditor.tsx

import React, { useCallback } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
// Import JSON mode for CodeMirror
import 'codemirror/mode/javascript/javascript';

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
  onClear: () => void; // New prop for clearing the JSON
}

const JSONEditor: React.FC<JSONEditorProps> = React.memo(
  ({ value, onChange, error, onClear }) => {
    // Handler for changes in the CodeMirror editor
    const handleBeforeChange = useCallback(
      (editor: any, data: any, newValue: string) => {
        console.log('CodeMirror Change:', newValue); // Debugging
        onChange(newValue);
      },
      [onChange]
    );

    // Function to copy JSON to clipboard
    const copyToClipboard = useCallback(() => {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          alert('JSON copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy JSON.');
        });
    }, [value]);

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">JSON Editor</h2>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Copy Form JSON
            </button>
            <button
              onClick={onClear}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Clear
            </button>
          </div>
        </div>
        <CodeMirror
          value={value}
          options={{
            mode: { name: 'javascript', json: true },
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true,
          }}
          onBeforeChange={handleBeforeChange}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    );
  }
);

export default JSONEditor;