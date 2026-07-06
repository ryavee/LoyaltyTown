export const models = [
  { id: "MDL-1001", model: "Fraud Detection v4", useCase: "QR and wallet abuse", version: "4.2.1", accuracy: "96.2%", drift: "Low", retrained: "2026-06-28", optIn: "Enabled", status: "Active" },
  { id: "MDL-1002", model: "Demand Forecast v3", useCase: "SKU demand", version: "3.8.0", accuracy: "93.6%", drift: "Medium", retrained: "2026-06-20", optIn: "Enabled", status: "Active" },
  { id: "MDL-1003", model: "OCR Receipt v2", useCase: "Receipt verification", version: "2.9.4", accuracy: "94.8%", drift: "Low", retrained: "2026-06-18", optIn: "Tenant controlled", status: "Active" },
  { id: "MDL-1004", model: "Recommendation Engine v5", useCase: "Next best action", version: "5.1.0", accuracy: "88.4%", drift: "Watch", retrained: "2026-06-25", optIn: "Enabled", status: "Review" },
];

export const aiReports = [
  { id: "AIR-1", report: "Fraud Accuracy Report", metric: "Precision / Recall", score: "96.2%", owner: "AI Governance", status: "Ready" },
  { id: "AIR-2", report: "Forecast Accuracy Report", metric: "MAPE", score: "6.4%", owner: "Planning", status: "Ready" },
  { id: "AIR-3", report: "OCR Accuracy Report", metric: "Extraction confidence", score: "94.8%", owner: "Finance Ops", status: "Ready" },
  { id: "AIR-4", report: "Recommendation Performance Report", metric: "Conversion lift", score: "+12.1%", owner: "Growth", status: "Review" },
  { id: "AIR-5", report: "AI Decision Audit Report", metric: "Decision traceability", score: "99.1%", owner: "Compliance", status: "Ready" },
];
