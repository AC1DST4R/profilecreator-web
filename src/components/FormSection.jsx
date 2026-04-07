import React from "react";

export default function FormSection({ section, data, handleChange }) {
  const inputs = Object.keys(data).map(key => (
    <div key={key} style={{ marginBottom: 10 }}>
      <label>{key}</label>
      <input
        type="text"
        value={data[key]}
        onChange={e => handleChange(section, key, e.target.value)}
        style={{ width: "100%", padding: 5 }}
      />
    </div>
  ));

  return <div style={{ marginBottom: 20 }}>{inputs}</div>;
}
