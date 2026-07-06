export const domains = [
  { id: "DOM-1001", domain: "admin.apex.example", type: "Custom Domain", ssl: "Valid", dnsVerification: "Verified", preview: "Ready", status: "Active" },
  { id: "DOM-1002", domain: "rewards.apex.example", type: "Consumer PWA", ssl: "Pending", dnsVerification: "Pending", preview: "Blocked", status: "Pending" },
  { id: "DOM-1003", domain: "api.apex.example", type: "API", ssl: "Valid", dnsVerification: "Verified", preview: "Ready", status: "Active" },
];

export const mobileBranding = [
  { id: "MOB-1", item: "Android Branding", value: "Apex Rewards", field: "Package Name", technical: "com.apex.rewards", status: "Active" },
  { id: "MOB-2", item: "iOS Branding", value: "Apex Rewards", field: "Bundle ID", technical: "io.apex.rewards", status: "Active" },
  { id: "MOB-3", item: "Splash Screen", value: "Dark splash", field: "Asset", technical: "splash-dark.png", status: "Review" },
  { id: "MOB-4", item: "Firebase Config Placeholder", value: "Not connected", field: "Config", technical: "firebase-placeholder.json", status: "Pending" },
];
