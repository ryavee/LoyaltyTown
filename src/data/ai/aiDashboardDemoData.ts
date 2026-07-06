import { BadgeCheck, Bot, BrainCircuit, ChartNoAxesCombined, Eye, PackageSearch, ScanText, ShieldAlert, Sparkles, TriangleAlert } from "lucide-react";

export const aiKpis = [
  { id: "predictions", label: "AI Predictions", value: "1.8M", target: "This month", progress: 82, icon: BrainCircuit },
  { id: "fraud", label: "Fraud Alerts", value: 428, target: "Review queue", progress: 48, icon: ShieldAlert },
  { id: "forecast", label: "Forecast Accuracy", value: "93.6%", target: "+3.4% QoQ", progress: 94, icon: ChartNoAxesCombined },
  { id: "ocr", label: "OCR Processed", value: "84.2K", target: "Receipts", progress: 76, icon: ScanText },
  { id: "recommendations", label: "Recommendations Generated", value: "2.4M", target: "Next best action", progress: 84, icon: Sparkles },
  { id: "counterfeit", label: "Counterfeit Risk", value: "0.8%", target: "Low risk", progress: 18, icon: TriangleAlert },
  { id: "demand", label: "Demand Alerts", value: 72, target: "Planning signals", progress: 41, icon: PackageSearch },
  { id: "inventory", label: "Inventory Alerts", value: 116, target: "Stock risk", progress: 52, icon: PackageSearch },
  { id: "decisions", label: "AI Assisted Decisions", value: "18.6K", target: "Workflows", progress: 79, icon: Bot },
  { id: "confidence", label: "Model Confidence", value: "91.8%", target: "Weighted avg", progress: 92, icon: BadgeCheck },
];

export const aiTrendData = [
  { month: "Jan", fraud: 42, forecast: 78, actual: 74, ocr: 88, recommendations: 18, demand: 61, inventory: 44 },
  { month: "Feb", fraud: 48, forecast: 82, actual: 79, ocr: 90, recommendations: 24, demand: 66, inventory: 48 },
  { month: "Mar", fraud: 61, forecast: 86, actual: 84, ocr: 91, recommendations: 32, demand: 72, inventory: 54 },
  { month: "Apr", fraud: 74, forecast: 89, actual: 87, ocr: 93, recommendations: 41, demand: 80, inventory: 63 },
  { month: "May", fraud: 88, forecast: 91, actual: 90, ocr: 94, recommendations: 52, demand: 86, inventory: 70 },
  { month: "Jun", fraud: 103, forecast: 94, actual: 92, ocr: 96, recommendations: 68, demand: 94, inventory: 78 },
];

export const aiInsights = [
  { id: "INS-1", title: "Counterfeit Risk", insight: "Duplicate scan density increased near two warehouse-adjacent regions.", severity: "High" },
  { id: "INS-2", title: "Demand Alert", insight: "WeatherShield Pro 20L demand is forecasted 18% above current replenishment plan.", severity: "Review" },
  { id: "INS-3", title: "OCR Quality", insight: "Receipt confidence improved after invoice template normalization.", severity: "Ready" },
  { id: "INS-4", title: "Recommendation Lift", insight: "Reward recommendations improved repeat scan conversion by 12.4%.", severity: "Ready" },
];

export const aiDecisionRows = [
  { id: "AID-1001", decision: "Reorder suggestion", module: "Inventory", confidence: "94%", owner: "Planning", status: "Approved" },
  { id: "AID-1002", decision: "Fraud review", module: "QR Security", confidence: "91%", owner: "Fraud Ops", status: "Review" },
  { id: "AID-1003", decision: "Campaign segment", module: "Marketing", confidence: "88%", owner: "Growth", status: "Ready" },
];
