import React, { useState } from "react";
import FieldSelector from "./FieldSelector";
import DynamicField from "./DynamicField";
import "./App.css";

function App() {
  const [fields, setFields] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState([]);
  const [shareableLink, setShareableLink] = useState("");

  const addField = (type) => {
    const id = Date.now();
    let label = "";

    if (type === "text") label = "Text Field";
    else if (type === "email") label = "Email Field";
    else if (type === "phone") label = "Phone Field";
    else if (type === "age") label = "Age Field";
    else label = type.charAt(0).toUpperCase() + type.slice(1);

    setFields([...fields, { id, type, label, value: "" }]);
  };

  const updateFieldValue = (id, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = [
      ...fields.map((f) => ({ type: f.type, value: f.value })),
    ];
    setLastSubmittedData(combinedData);
    setShowPopup(true);

    // Store form data in localStorage
    const formData = JSON.stringify(combinedData);
    localStorage.setItem("formData", formData);

    // Generate a shareable link
    const link = window.location.href + "?formData=" + encodeURIComponent(formData);
    setShareableLink(link);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Link copied to clipboard!");
  };

  const loadFormDataFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const formData = urlParams.get("formData");
    if (formData) {
      const decodedData = JSON.parse(decodeURIComponent(formData));
      setFields(decodedData.map(f => ({ ...f, value: "" }))); // Reset values, but keep structure
    }
  };

  React.useEffect(() => {
    loadFormDataFromURL();
  }, []);

  return (
    <div className="App">
      <h2>🧠 Dynamic Form Builder</h2>

      <FieldSelector onAddField={addField} />

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div className="field-box" key={field.id}>
            <label>
              Field #{index + 1} ({field.label})
            </label>
            <DynamicField
              field={field}
              onChange={updateFieldValue}
              onRemove={removeField}
            />
          </div>
        ))}
        <button type="submit">Submit Form</button>
      </form>

      {/* Display submitted data */}
      {lastSubmittedData.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3>📋 Submitted Data:</h3>
          <ul>
            {lastSubmittedData.map((item, index) => (
              <li key={index}>
                <strong>Type:</strong> {item.type} <br />
                <strong>Value:</strong> {item.value || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shareable Link */}
      {shareableLink && (
        <div>
          <h3>🔗 Shareable Link:</h3>
          <input
            type="text"
            value={shareableLink}
            readOnly
            style={{ width: "80%" }}
          />
          <button onClick={handleShareLink}>Copy Link</button>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>🎉 Form Created Successfully!</h3>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
