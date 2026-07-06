export type ProductionStatus = "Planned" | "In Production" | "Completed" | "QC Hold" | "Cancelled";

export type ProductionOrderRecord = {
  id: string;
  orderNumber: string;
  factory: string;
  productionLine: string;
  product: string;
  sku: string;
  plannedQuantity: string;
  actualQuantity: string;
  productionDate: string;
  shift: string;
  supervisor: string;
  status: ProductionStatus;
  remarks: string;
};

export type ProductionLineRecord = {
  id: string;
  lineName: string;
  lineCode: string;
  factory: string;
  capacityPerShift: string;
  machineCount: string;
  operatorCount: string;
  status: string;
  currentProductionOrder: string;
};

export const productionOrders: ProductionOrderRecord[] = [
  { id: "PO-001", orderNumber: "PO-2026-1042", factory: "Pune Smart Factory", productionLine: "Adhesive Line A", product: "LT Shield Pro", sku: "SHIELD-PRO-20KG", plannedQuantity: "18,000", actualQuantity: "14,860", productionDate: "2026-07-05", shift: "Shift A", supervisor: "Anika Rao", status: "In Production", remarks: "Running on target with QR readiness enabled." },
  { id: "PO-002", orderNumber: "PO-2026-1043", factory: "Surat Coatings Plant", productionLine: "Coating Line B", product: "LT Bond Max", sku: "BOND-MAX-10KG", plannedQuantity: "42,000", actualQuantity: "0", productionDate: "2026-07-06", shift: "Shift B", supervisor: "Rohan Mehta", status: "Planned", remarks: "Material staging complete." },
  { id: "PO-003", orderNumber: "PO-2026-1044", factory: "Chennai Assembly Hub", productionLine: "Assembly Line C", product: "LT Pump Motor", sku: "PUMP-MOTOR-1HP", plannedQuantity: "9,500", actualQuantity: "8,920", productionDate: "2026-07-04", shift: "Shift C", supervisor: "Sara Iyer", status: "QC Hold", remarks: "Surface inspection checkpoint failed." },
];

export const productionLines: ProductionLineRecord[] = [
  { id: "LINE-001", lineName: "Adhesive Line A", lineCode: "ADH-A", factory: "Pune Smart Factory", capacityPerShift: "24,000", machineCount: "8", operatorCount: "22", status: "Running", currentProductionOrder: "PO-2026-1042" },
  { id: "LINE-002", lineName: "Coating Line B", lineCode: "COAT-B", factory: "Surat Coatings Plant", capacityPerShift: "42,000", machineCount: "11", operatorCount: "28", status: "Idle", currentProductionOrder: "PO-2026-1043" },
  { id: "LINE-003", lineName: "Assembly Line C", lineCode: "ASM-C", factory: "Chennai Assembly Hub", capacityPerShift: "12,000", machineCount: "6", operatorCount: "18", status: "QC Hold", currentProductionOrder: "PO-2026-1044" },
];

export const productionTabs = ["Overview", "Materials", "QC Checkpoints", "Output", "Rejected Units", "Batch Link", "QR Readiness", "Timeline", "Audit Log"];
export const productionLineTabs = ["Overview", "Performance", "Throughput", "Downtime", "Reject Rate", "History", "Audit"];

export const productionChartData = [
  { day: "Mon", throughput: 74, downtime: 3.2, rejectRate: 1.2 },
  { day: "Tue", throughput: 82, downtime: 2.4, rejectRate: 1.0 },
  { day: "Wed", throughput: 79, downtime: 4.1, rejectRate: 1.8 },
  { day: "Thu", throughput: 88, downtime: 2.1, rejectRate: 0.9 },
  { day: "Fri", throughput: 91, downtime: 1.8, rejectRate: 0.7 },
];
