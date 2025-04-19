import React from "react";

const DynamicField = ({ field, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    onChange(field.id, e.target.value);
  };

  return (
    <div className="dynamic-field">
      {field.type === "text" ? (
        <input
          type="text"
          value={field.value}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
      ) : field.type === "dropdown" ? (
        <select value={field.value} onChange={handleInputChange}>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      ) : field.type === "checkbox" ? (
        <input
          type="checkbox"
          checked={field.value === "on"}
          onChange={(e) => onChange(field.id, e.target.checked ? "on" : "off")}
        />
      ) : null}
      <button className="remove-btn" onClick={() => onRemove(field.id)}>
        ❌ Remove
      </button>
    </div>
  );
};

export default DynamicField;
