export type FraudAlertRecord = {
  id: string;
  alertId: string;
  fraudType: string;
  entity: string;
  region: string;
  riskScore: number;
  confidence: string;
  owner: string;
  status: string;
};

export const fraudAlerts: FraudAlertRecord[] = [
  { id: "FRD-1001", alertId: "FRAUD-88201", fraudType: "Duplicate Scan", entity: "LT-QR-882019", region: "Mumbai West", riskScore: 94, confidence: "96%", owner: "Fraud Ops", status: "High" },
  { id: "FRD-1002", alertId: "FRAUD-88202", fraudType: "Geo Velocity", entity: "Dealer DLR-441", region: "Delhi North", riskScore: 86, confidence: "91%", owner: "Security", status: "Review" },
  { id: "FRD-1003", alertId: "FRAUD-88203", fraudType: "Wallet Abuse", entity: "Wallet WLT-771", region: "Pune", riskScore: 73, confidence: "88%", owner: "Loyalty Ops", status: "Monitor" },
  { id: "FRD-1004", alertId: "FRAUD-88204", fraudType: "Fake Warranty Claim", entity: "Claim CLM-88203", region: "Chennai", riskScore: 81, confidence: "90%", owner: "Warranty Ops", status: "Review" },
  { id: "FRD-1005", alertId: "FRAUD-88205", fraudType: "Suspicious Payout", entity: "Payout POT-2026", region: "Hyderabad", riskScore: 68, confidence: "84%", owner: "Finance Ops", status: "Monitor" },
  { id: "FRD-1006", alertId: "FRAUD-88206", fraudType: "QR Clone", entity: "Batch QRB-4490", region: "Ahmedabad", riskScore: 97, confidence: "98%", owner: "QR Security", status: "High" },
];

export const riskRules = [
  { id: "RULE-1", rule: "Duplicate scan threshold", condition: "Same QR > 5 scans / 30m", owner: "QR Security", status: "Active" },
  { id: "RULE-2", rule: "Geo velocity", condition: "Distance impossible within scan time", owner: "Fraud Ops", status: "Active" },
  { id: "RULE-3", rule: "Wallet abuse", condition: "Reward claim velocity exceeds baseline", owner: "Loyalty Ops", status: "Review" },
];
