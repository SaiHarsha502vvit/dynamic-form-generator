// src/components/JSONEditor.tsx
import React, { useCallback } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

const JSONEditor: React.FC<JSONEditorProps> = React.memo(({ value, onChange, error }) => {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(value).then(
      () => {
        alert('JSON copied to clipboard!');
      },
      () => {
        alert('Failed to copy JSON.');
      }
    );
  }, [value]);

  const handleBeforeChange = useCallback(
    (editor: any, data: any, value: string) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">JSON Editor</h2>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Copy Form JSON
        </button>
      </div>
      <CodeMirror
        value={value}
        options={{
          mode: 'application/json',
          lineNumbers: true,
          theme: 'default',
          readOnly: false,
          lineWrapping: true,
          gutters: ['CodeMirror-linenumbers'],
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
        }}
        onBeforeChange={handleBeforeChange}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
});

export default JSONEditor;