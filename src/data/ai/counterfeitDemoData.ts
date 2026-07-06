export const counterfeitAlerts = [
  { id: "CF-1001", alert: "QR clone cluster", product: "WeatherShield Pro Paint", batch: "BATCH-WSP-441", region: "Mumbai West", riskScore: 96, status: "High" },
  { id: "CF-1002", alert: "Batch mismatch", product: "TileBond Ultra", batch: "BATCH-TBU-118", region: "Chennai OMR", riskScore: 82, status: "Review" },
  { id: "CF-1003", alert: "Product risk spike", product: "FixMate Adhesive", batch: "BATCH-FIX-290", region: "Delhi North", riskScore: 74, status: "Monitor" },
];

export const regionRiskRows = [
  { id: "RR-1", region: "West", qrClone: "High", batchRisk: "Medium", productRisk: "High", riskScore: 86, status: "Review" },
  { id: "RR-2", region: "North", qrClone: "Medium", batchRisk: "Low", productRisk: "Medium", riskScore: 61, status: "Monitor" },
  { id: "RR-3", region: "South", qrClone: "Low", batchRisk: "Medium", productRisk: "Low", riskScore: 44, status: "Ready" },
];
