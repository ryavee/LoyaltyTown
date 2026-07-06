import { AlertTriangle, CheckCircle2, Clock3, Gift, QrCode, ScanLine, ShieldAlert, Zap } from "lucide-react";

export type QrBatchStatus = "Generated" | "Active" | "Paused" | "Archived" | "Expired";
export type QrType = "Static" | "Dynamic" | "Secure" | "Encrypted" | "GS1 Digital Link";

export type QrBatchRecord = {
  id: string;
  batchName: string;
  batchNumber: string;
  product: string;
  sku: string;
  factory: string;
  warehouse: string;
  quantity: string;
  qrType: QrType;
  prefix: string;
  serialFormat: string;
  campaign: string;
  startSerial: string;
  endSerial: string;
  manufacturingDate: string;
  expiryDate: string;
  status: QrBatchStatus;
  generated?: string;
  printed?: string;
  activated?: string;
  claimed?: string;
};

export const qrDashboardKpis = [
  { id: "generated", label: "Total QR Generated", value: "72.4M", target: "All batches", progress: 82, icon: QrCode },
  { id: "active", label: "Active QR Codes", value: "58.1M", target: "80.2%", progress: 80, icon: CheckCircle2 },
  { id: "claimed", label: "Claimed QR Codes", value: "18.6M", target: "Consumer claims", progress: 64, icon: Gift },
  { id: "unused", label: "Unused QR Codes", value: "11.2M", target: "Inventory pool", progress: 42, icon: Clock3 },
  { id: "expired", label: "Expired QR Codes", value: "1.8M", target: "Needs archive", progress: 18, icon: AlertTriangle },
  { id: "duplicate", label: "Duplicate Scan Alerts", value: 384, target: "24 high risk", progress: 32, icon: ShieldAlert },
  { id: "counterfeit", label: "Counterfeit Alerts", value: 76, target: "Open cases", progress: 22, icon: ShieldAlert },
  { id: "today-scans", label: "Today's Scans", value: "248K", target: "+14% vs avg", progress: 71, icon: ScanLine },
  { id: "today-activations", label: "Today's Activations", value: "42K", target: "New claims", progress: 62, icon: Zap },
  { id: "today-rewards", label: "Today's Rewards", value: "18K", target: "Issued rewards", progress: 55, icon: Gift },
];

export const qrBatches: QrBatchRecord[] = [
  { id: "QRB-2026-001", batchName: "Adhesive Pro July Batch", batchNumber: "BCH-2026-001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", factory: "Pune Smart Factory", warehouse: "Central Finished Goods Warehouse", quantity: "18,420", qrType: "Secure", prefix: "ADH", serialFormat: "ADH-YYYY-######", campaign: "Contractor Monsoon Rewards", startSerial: "ADH-2026-000001", endSerial: "ADH-2026-018420", manufacturingDate: "2026-07-01", expiryDate: "2027-03-18", status: "Active", generated: "18,420", printed: "16,880", activated: "8,420", claimed: "5,280" },
  { id: "QRB-2026-002", batchName: "Smart Paint Consumer Pack", batchNumber: "BCH-2026-002", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", factory: "Ahmedabad Factory", warehouse: "West Regional Distribution Center", quantity: "42,810", qrType: "Dynamic", prefix: "PNT", serialFormat: "PNT-YYMM-######", campaign: "Retail Scan Cashback", startSerial: "PNT-2607-000001", endSerial: "PNT-2607-042810", manufacturingDate: "2026-06-28", expiryDate: "2027-01-12", status: "Generated", generated: "42,810", printed: "31,220", activated: "12,880", claimed: "6,420" },
  { id: "QRB-2026-003", batchName: "Laminate GS1 Export Batch", batchNumber: "BCH-2026-003", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", factory: "Chennai Factory", warehouse: "South Contractor Fulfillment Hub", quantity: "9,640", qrType: "GS1 Digital Link", prefix: "LAM", serialFormat: "GTIN-BATCH-SERIAL", campaign: "Dealer Growth Program", startSerial: "LAM-GS1-000001", endSerial: "LAM-GS1-009640", manufacturingDate: "2026-06-24", expiryDate: "2026-09-08", status: "Active", generated: "9,640", printed: "9,640", activated: "4,210", claimed: "2,112" },
  { id: "QRB-2026-004", batchName: "Contractor Kit Archive", batchNumber: "BCH-2026-004", product: "Contractor Tool Kit", sku: "KIT-CON-12", factory: "Noida Assembly Unit", warehouse: "Returns Inspection Hub", quantity: "1,284", qrType: "Encrypted", prefix: "KIT", serialFormat: "KIT-SEC-######", campaign: "Training Reward Drop", startSerial: "KIT-SEC-000001", endSerial: "KIT-SEC-001284", manufacturingDate: "2026-06-18", expiryDate: "2028-05-30", status: "Archived", generated: "1,284", printed: "1,284", activated: "684", claimed: "312" },
];

export const qrBatchTabs = ["Overview", "QR Codes", "Print Jobs", "Downloads", "Analytics", "History", "Audit Log"];

export const latestActivations = [
  { id: "ACT-001", title: "QR activated", description: "ADH-2026-014224 claimed by contractor in Pune", timestamp: "4 min ago" },
  { id: "ACT-002", title: "Warranty started", description: "PNT-2607-008811 activated through consumer portal", timestamp: "12 min ago" },
  { id: "ACT-003", title: "Reward issued", description: "LAM-GS1-004210 mapped to dealer scan reward", timestamp: "18 min ago" },
];

export const topQrProducts = [
  { product: "Smart QR Paint Bucket", scans: "18.9M", conversion: "36%" },
  { product: "Industrial Adhesive Pro", scans: "12.8M", conversion: "29%" },
  { product: "Premium Laminate Sheet", scans: "4.8M", conversion: "22%" },
  { product: "Contractor Tool Kit", scans: "922K", conversion: "18%" },
];
