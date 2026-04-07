import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tabs from "./components/Tabs";
import FormSection from "./components/FormSection";
import XmlOutput from "./components/XmlOutput";

function App() {
  const [formData, setFormData] = useState({
    general: { displayName: "", identifier: "", description: "", platform: "iOS" },
    wifi: { ssid: "", password: "" },
    mdm: { serverURL: "", removalPassword: "" },
    restrictions: { keys: "" },
    system: { wallpaper: "", lockMessage: "", allowedPaths: "", systemExtensions: "" }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>ProfileCreator Web</h1>
      <Tabs sections={Object.keys(formData)} />
      {Object.keys(formData).map(section => (
        <FormSection
          key={section}
          section={section}
          data={formData[section]}
          handleChange={handleChange}
        />
      ))}
      <XmlOutput formData={formData} />
    </div>
  );
}

export default App;
