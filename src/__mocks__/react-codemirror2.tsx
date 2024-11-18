// src/__mocks__/react-codemirror2.tsx
import React from 'react';

const Controlled = ({ value, onBeforeChange }: any) => (
  <textarea
    value={value}
    onChange={(e) => onBeforeChange(null, null, e.target.value)}
  />
);

export { Controlled };