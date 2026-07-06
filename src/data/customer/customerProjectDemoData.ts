export type CustomerProjectRecord = {
  id: string;
  projectName: string;
  customer: string;
  products: string;
  scans: string;
  warranty: string;
  status: string;
};

export const customerProjects: CustomerProjectRecord[] = [
  { id: "CPJ-1001", projectName: "Skyline Tower Exterior", customer: "Aarav Sharma", products: "WeatherShield Pro", scans: "386", warranty: "6 active", status: "Active" },
  { id: "CPJ-1002", projectName: "Home Renovation", customer: "Nisha Kapoor", products: "Smart QR Paint Bucket", scans: "42", warranty: "2 active", status: "Completed" },
  { id: "CPJ-1003", projectName: "OMR Retail Plaza", customer: "Urban Build Co.", products: "TileBond Ultra", scans: "244", warranty: "11 active", status: "At Risk" },
];
