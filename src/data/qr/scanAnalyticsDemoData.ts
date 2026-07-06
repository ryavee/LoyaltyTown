export const generationTrend = [
  { month: "Jan", generated: 1.8, scans: 1.2, activations: 0.4 },
  { month: "Feb", generated: 2.4, scans: 1.6, activations: 0.7 },
  { month: "Mar", generated: 3.1, scans: 2.2, activations: 0.9 },
  { month: "Apr", generated: 4.2, scans: 3.4, activations: 1.2 },
  { month: "May", generated: 5.7, scans: 4.8, activations: 1.8 },
  { month: "Jun", generated: 7.4, scans: 6.2, activations: 2.4 },
];

export const regionScans = [
  { region: "West", scans: 248, users: 86 },
  { region: "North", scans: 196, users: 72 },
  { region: "South", scans: 184, users: 66 },
  { region: "East", scans: 112, users: 41 },
];

export const deviceScans = [
  { name: "Android", scans: 58 },
  { name: "iOS", scans: 27 },
  { name: "Web", scans: 10 },
  { name: "Dealer App", scans: 5 },
];

export const scanSourceRows = [
  { id: "SRC-001", source: "Consumer App", scans: "1.8M", uniqueUsers: "640K", repeatScans: "18%", country: "India", state: "Maharashtra", city: "Pune", device: "Android", browser: "Chrome" },
  { id: "SRC-002", source: "Dealer App", scans: "920K", uniqueUsers: "120K", repeatScans: "24%", country: "India", state: "Gujarat", city: "Ahmedabad", device: "Android", browser: "App WebView" },
  { id: "SRC-003", source: "Public Web", scans: "640K", uniqueUsers: "310K", repeatScans: "12%", country: "India", state: "Tamil Nadu", city: "Chennai", device: "iOS", browser: "Safari" },
];
