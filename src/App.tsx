// src/App.tsx
import React, { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import FormPreview from './components/FormPreview';
import { FormSchema } from './interface/schema';
import useDarkMode from './hooks/useDarkMode';
import debounce from 'lodash.debounce';

// Lazy load JSONEditor for performance optimization
const JSONEditor = React.lazy(() => import('./components/JSONEditor'));

const defaultJSON = `{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" },
        { "value": "retail", "label": "Retail" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },
        { "value": "short", "label": "Short-term (1-3 months)" },
        { "value": "medium", "label": "Medium-term (3-6 months)" },
        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}`;

const App: React.FC = () => {
  const [json, setJson] = useState<string>(defaultJSON);
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [error, setError] = useState<string>('');
  const [darkMode, toggleDarkMode] = useDarkMode();

  // Debounce JSON parsing to enhance performance
  const debouncedHandleJsonChange = useMemo(
    () =>
      debounce((value: string) => {
        setJson(value);
        try {
          const parsed: FormSchema = JSON.parse(value);
          setSchema(parsed);
          setError('');
        } catch (e: any) {
          setError(e.message);
          setSchema(null);
        }
      }, 300),
    []
  );

  useEffect(() => {
    // Cleanup debounce on unmount
    return () => {
      debouncedHandleJsonChange.cancel();
    };
  }, [debouncedHandleJsonChange]);

  const handleJsonChange = useCallback(
    (value: string) => {
      debouncedHandleJsonChange(value);
    },
    [debouncedHandleJsonChange]
  );
  

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex justify-end p-4">
      <button
  onClick={toggleDarkMode}
  className="bg-gray-200 dark:bg-gray-700 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
>
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <div className="md:w-1/2 p-4 overflow-auto">
          <Suspense fallback={<div>Loading Editor...</div>}>
            <JSONEditor value={json} onChange={handleJsonChange} error={error} />
          </Suspense>
        </div>
        <div className="md:w-1/2 p-4 overflow-auto">
          <FormPreview schema={schema} />
        </div>
      </div>
    </div>
  );
};

export default App;