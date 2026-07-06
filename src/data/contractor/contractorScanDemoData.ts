export type ContractorScanRecord = {
  id: string;
  qrCode: string;
  product: string;
  sku: string;
  batch: string;
  scanDate: string;
  project: string;
  dealer: string;
  location: string;
  rewardStatus: string;
  riskScore: string;
};

export const contractorScans: ContractorScanRecord[] = [
  { id: "CSC-1001", qrCode: "LT-WS-908771", product: "WeatherShield Pro", sku: "WSP-20L-EXT", batch: "BAT-WSP-742", scanDate: "2026-07-05", project: "Skyline Tower Exterior", dealer: "Metro Build Mart", location: "Mumbai", rewardStatus: "Rewarded", riskScore: "Low" },
  { id: "CSC-1002", qrCode: "LT-LX-771208", product: "Luxury Emulsion", sku: "LUX-10L-IV", batch: "BAT-LUX-384", scanDate: "2026-07-04", project: "Bandra Premium Villa", dealer: "Urban Paint Point", location: "Mumbai", rewardStatus: "Pending", riskScore: "Low" },
  { id: "CSC-1003", qrCode: "LT-TB-441902", product: "TileBond Ultra", sku: "TBU-25KG", batch: "BAT-TBU-992", scanDate: "2026-07-03", project: "OMR Retail Plaza", dealer: "Southern Contractor Store", location: "Chennai", rewardStatus: "Rewarded", riskScore: "Medium" },
  { id: "CSC-1004", qrCode: "LT-FM-118290", product: "FixMate", sku: "FIX-5KG", batch: "BAT-FIX-141", scanDate: "2026-07-02", project: "Noida Modular Block", dealer: "Prime Hardware Hub", location: "Noida", rewardStatus: "Review", riskScore: "High" },
];
