import React from "react";
import DynamicField from "./DynamicField";

const FormPreview = ({ fields, onChange, onRemove, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <DynamicField key={field.id} field={field} onChange={onChange} onRemove={onRemove} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPreview;
