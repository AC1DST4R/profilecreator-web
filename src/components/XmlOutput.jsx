import React from "react";
import { saveAs } from "file-saver";
import { buildXml } from "../utils/xmlGenerator";
import { generateUUID } from "../utils/uuid";

export default function XmlOutput({ formData }) {
  const generateXml = () => {
    // Optional: inject UUIDs into payloads
    const dataWithUUIDs = {
      ...formData,
      general: { ...formData.general, payloadUUID: generateUUID() },
      wifi: { ...formData.wifi, payloadUUID: generateUUID() },
      mdm: { ...formData.mdm, payloadUUID: generateUUID() },
      restrictions: { ...formData.restrictions, payloadUUID: generateUUID() },
      system: { ...formData.system, payloadUUID: generateUUID() }
    };
    return buildXml(dataWithUUIDs);
  };

  const download = () => {
    const blob = new Blob([generateXml()], { type: "application/xml" });
    saveAs(blob, "profile.mobileconfig");
  };

  return (
    <div>
      <h2>Generated XML</h2>
      <textarea readOnly value={generateXml()} style={{ width: "100%", height: 300 }} />
      <button onClick={download} style={{ marginTop: 10, padding: 10 }}>Download .mobileconfig</button>
    </div>
  );
}
