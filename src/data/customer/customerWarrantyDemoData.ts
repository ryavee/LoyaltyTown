export type CustomerWarrantyRecord = {
  id: string;
  claimNumber: string;
  customer: string;
  product: string;
  registeredDate: string;
  expiryDate: string;
  claimStatus: string;
  timeline: string;
};

export const customerWarranties: CustomerWarrantyRecord[] = [
  { id: "CWR-1001", claimNumber: "WRN-88101", customer: "Aarav Sharma", product: "WeatherShield Pro", registeredDate: "2026-07-03", expiryDate: "2029-07-03", claimStatus: "Registered", timeline: "Activated" },
  { id: "CWR-1002", claimNumber: "WRN-88102", customer: "Nisha Kapoor", product: "Smart QR Paint Bucket", registeredDate: "2026-07-02", expiryDate: "2028-07-02", claimStatus: "Claim Open", timeline: "Inspection" },
  { id: "CWR-1003", claimNumber: "WRN-88103", customer: "Urban Build Co.", product: "TileBond Ultra", registeredDate: "2026-06-28", expiryDate: "2028-06-28", claimStatus: "Closed", timeline: "Resolved" },
];
