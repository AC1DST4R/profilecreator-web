import React from "react";
import { saveAs } from "file-saver";

export default function XmlOutput({ formData }) {
  const generateXml = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<plist version="1.0">\n<dict>\n`;
    // General
    const general = formData.general;
    xml += `<key>PayloadDisplayName</key><string>${general.displayName}</string>\n`;
    xml += `<key>PayloadIdentifier</key><string>${general.identifier}</string>\n`;
    xml += `<key>PayloadDescription</key><string>${general.description}</string>\n`;
    xml += `<key>Platform</key><string>${general.platform}</string>\n`;

    // Wi-Fi
    if (formData.wifi.ssid) {
      xml += `<key>WiFi</key><dict>\n<key>SSID_STR</key><string>${formData.wifi.ssid}</string>\n`;
      if (formData.wifi.password)
        xml += `<key>Password</key><string>${formData.wifi.password}</string>\n`;
      xml += `</dict>\n`;
    }

    // MDM
    if (formData.mdm.serverURL) {
      xml += `<key>MDM</key><dict>\n<key>ServerURL</key><string>${formData.mdm.serverURL}</string>\n`;
      if (formData.mdm.removalPassword)
        xml += `<key>RemovalPassword</key><string>${formData.mdm.removalPassword}</string>\n`;
      xml += `</dict>\n`;
    }

    // Restrictions
    if (formData.restrictions.keys) {
      xml += `<key>Restrictions</key><dict>\n`;
      formData.restrictions.keys.split(",").forEach(k => {
        xml += `<key>${k.trim()}</key><true/>\n`;
      });
      xml += `</dict>\n`;
    }

    // System
    const sys = formData.system;
    if (sys.wallpaper) xml += `<key>Wallpaper</key><string>${sys.wallpaper}</string>\n`;
    if (sys.lockMessage) xml += `<key>LockScreenMessage</key><string>${sys.lockMessage}</string>\n`;
    if (sys.allowedPaths) {
      xml += `<key>AllowedPaths</key><array>\n`;
      sys.allowedPaths.split(",").forEach(p => xml += `<string>${p.trim()}</string>\n`);
      xml += `</array>\n`;
    }
    if (sys.systemExtensions) {
      xml += `<key>SystemExtensions</key><array>\n`;
      sys.systemExtensions.split(",").forEach(e => xml += `<string>${e.trim()}</string>\n`);
      xml += `</array>\n`;
    }

    xml += `</dict>\n</plist>`;
    return xml;
  };

  const download = () => {
    const blob = new Blob([generateXml()], { type: "application/xml" });
    saveAs(blob, "profile.mobileconfig");
  };

  return (
    <div>
      <h2>Generated XML</h2>
      <textarea
        readOnly
        value={generateXml()}
        style={{ width: "100%", height: 300 }}
      />
      <button onClick={download} style={{ marginTop: 10, padding: 10 }}>
        Download .mobileconfig
      </button>
    </div>
  );
}
