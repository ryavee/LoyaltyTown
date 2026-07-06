export type CustomerScanRecord = {
  id: string;
  qrCode: string;
  customer: string;
  product: string;
  scanType: "Verification" | "Duplicate" | "Counterfeit Alert" | "Activation";
  location: string;
  device: string;
  scanDate: string;
  status: string;
};

export const customerScans: CustomerScanRecord[] = [
  { id: "CSC-1001", qrCode: "LT-WS-908771", customer: "Aarav Sharma", product: "WeatherShield Pro", scanType: "Activation", location: "Pune", device: "Android", scanDate: "2026-07-05", status: "Verified" },
  { id: "CSC-1002", qrCode: "LT-LX-771208", customer: "Nisha Kapoor", product: "Smart QR Paint Bucket", scanType: "Verification", location: "Mumbai", device: "iOS", scanDate: "2026-07-04", status: "Genuine" },
  { id: "CSC-1003", qrCode: "LT-TB-441902", customer: "Urban Build Co.", product: "TileBond Ultra", scanType: "Duplicate", location: "Chennai", device: "Web", scanDate: "2026-07-03", status: "Review" },
  { id: "CSC-1004", qrCode: "LT-FM-118290", customer: "Riya Batra", product: "FixMate", scanType: "Counterfeit Alert", location: "Delhi", device: "Android", scanDate: "2026-07-02", status: "High Risk" },
];
