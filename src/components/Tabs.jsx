import React, { useState } from "react";

export default function Tabs({ sections }) {
  const [active, setActive] = useState(sections[0]);

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      {sections.map(section => (
        <div
          key={section}
          onClick={() => setActive(section)}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
            background: active === section ? "#4CAF50" : "#ddd",
            color: active === section ? "white" : "black",
            borderRadius: 8
          }}
        >
          {section.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
