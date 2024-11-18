// src/interfaces/schema.ts
export interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

export interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: Validation;
}

export interface Option {
  value: string;
  label: string;
}

export interface Validation {
  pattern: string;
  message: string;
}