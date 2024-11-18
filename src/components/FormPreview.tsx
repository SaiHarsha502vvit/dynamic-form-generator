// src/components/FormPreview.tsx
import React, { useCallback, useMemo } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { FormSchema, Field, Option } from '../interface/schema';

interface FormPreviewProps {
  schema: FormSchema | null;
}

const FormPreview: React.FC<FormPreviewProps> = React.memo(({ schema }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const onSubmit: SubmitHandler<any> = useCallback((data) => {
    console.log(data);
    setSubmittedData(data);
    alert('Form submitted successfully!');
    reset();
  }, [reset]);

  const downloadJSON = useCallback(() => {
    if (!submittedData) return;
    const blob = new Blob([JSON.stringify(submittedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form_submission.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [submittedData]);

  const renderField = useCallback((field: Field) => {
    const { id, type, label, required, placeholder, options, validation } = field;
    const validationRules: any = {};

    if (required) {
      validationRules.required = 'This field is required';
    }

    if (validation?.pattern) {
      validationRules.pattern = {
        value: new RegExp(validation.pattern),
        message: validation.message,
      };
    }

    const inputClass = `mt-1 p-2 border rounded w-full ${
      errors[id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    } bg-white dark:bg-gray-700 transition-colors duration-200`;

    return (
      <div className="mb-4" key={id}>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        {type === 'text' || type === 'email' ? (
          <input
            type={type}
            {...register(id, validationRules)}
            placeholder={placeholder}
            className={inputClass}
          />
        ) : type === 'textarea' ? (
          <textarea
            {...register(id, validationRules)}
            placeholder={placeholder}
            className={`${inputClass} h-24`}
          />
        ) : type === 'select' && options ? (
          <select
            {...register(id, validationRules)}
            className={inputClass}
          >
            <option value="">Select...</option>
            {options.map((option: Option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : type === 'radio' && options ? (
          <div>
            {options.map((option: Option) => (
              <label key={option.value} className="mr-4">
                <input
                  type="radio"
                  value={option.value}
                  {...register(id, validationRules)}
                  className="mr-1"
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : null}
        {errors[id]?.message && <span className="text-red-500">{errors[id]?.message as string}</span>}
      </div>
    );
  }, [errors, register]);

  const renderedFields = useMemo(() => {
    if (!schema) return null;
    return schema.fields.map((field: Field) => renderField(field));
  }, [schema, renderField]);

  if (!schema) {
    return <div className="text-red-500">Invalid JSON schema.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Form Preview</h2>
        {submittedData && (
          <button
            onClick={downloadJSON}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Download Submission
          </button>
        )}
      </div>
      <h3 className="text-lg mb-2">{schema.formTitle}</h3>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderedFields}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      {submittedData && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h3 className="text-lg font-bold">Submitted Data:</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
});

export default FormPreview;