import React, { useState } from 'react';

function FieldSelector({ onAddField }) {
  const [fieldType, setFieldType] = useState('text');  // Default to 'text' field

  const handleAdd = () => {
    onAddField(fieldType);  // Pass selected field type to the parent
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Dropdown for selecting field type */}
      <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
        <option value="text">Text</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
      </select>
      <button onClick={handleAdd}>Add Field</button>
    </div>
  );
}

export default FieldSelector;
