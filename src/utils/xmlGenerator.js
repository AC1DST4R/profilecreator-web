import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

export function buildXml(formData) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<plist version="1.0">\n<dict>\n`;

  const general = formData.general;
  xml += `<key>PayloadDisplayName</key><string>${general.displayName}</string>\n`;
  xml += `<key>PayloadIdentifier</key><string>${general.identifier}</string>\n`;
  xml += `<key>PayloadDescription</key><string>${general.description}</string>\n`;
  xml += `<key>Platform</key><string>${general.platform}</string>\n`;

  const wifi = formData.wifi;
  if (wifi.ssid) {
    xml += `<key>WiFi</key><dict>\n<key>SSID_STR</key><string>${wifi.ssid}</string>\n`;
    if (wifi.password) xml += `<key>Password</key><string>${wifi.password}</string>\n`;
    xml += `</dict>\n`;
  }

  const mdm = formData.mdm;
  if (mdm.serverURL) {
    xml += `<key>MDM</key><dict>\n<key>ServerURL</key><string>${mdm.serverURL}</string>\n`;
    if (mdm.removalPassword) xml += `<key>RemovalPassword</key><string>${mdm.removalPassword}</string>\n`;
    xml += `</dict>\n`;
  }

  const restrictions = formData.restrictions;
  if (restrictions.keys) {
    xml += `<key>Restrictions</key><dict>\n`;
    restrictions.keys.split(",").forEach(k => xml += `<key>${k.trim()}</key><true/>\n`);
    xml += `</dict>\n`;
  }

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
}
