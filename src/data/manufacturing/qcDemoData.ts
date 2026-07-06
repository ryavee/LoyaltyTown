export type QCStatus = "Passed" | "Failed" | "QC Hold" | "Rework";

export type QCRecord = {
  id: string;
  inspectionNumber: string;
  productionOrder: string;
  batch: string;
  product: string;
  sku: string;
  inspector: string;
  checklist: string;
  passedQuantity: string;
  rejectedQuantity: string;
  defectType: string;
  severity: string;
  status: QCStatus;
  photos: string;
  remarks: string;
};

export type ScrapRecord = {
  id: string;
  rejectedQuantity: string;
  scrapReason: string;
  batch: string;
  product: string;
  sku: string;
  factory: string;
  qcInspector: string;
  status: string;
  qrVoidStatus: string;
  securityAlert: string;
};

export const qcInspections: QCRecord[] = [
  { id: "QC-001", inspectionNumber: "QI-7781", productionOrder: "PO-2026-1042", batch: "BAT-901", product: "LT Shield Pro", sku: "SHIELD-PRO-20KG", inspector: "Sara Iyer", checklist: "Viscosity + Seal", passedQuantity: "14,420", rejectedQuantity: "440", defectType: "Seal variation", severity: "Low", status: "Passed", photos: "4", remarks: "Minor reject within tolerance." },
  { id: "QC-002", inspectionNumber: "QI-7782", productionOrder: "PO-2026-1044", batch: "BAT-904", product: "LT Pump Motor", sku: "PUMP-MOTOR-1HP", inspector: "Naveen Das", checklist: "Torque + Surface", passedQuantity: "8,920", rejectedQuantity: "580", defectType: "Surface finish", severity: "High", status: "QC Hold", photos: "9", remarks: "Hold queue until supervisor review." },
  { id: "QC-003", inspectionNumber: "QI-7783", productionOrder: "PO-2026-1045", batch: "BAT-908", product: "LT Bond Max", sku: "BOND-MAX-10KG", inspector: "Amit Jain", checklist: "Weight + Label", passedQuantity: "42,000", rejectedQuantity: "0", defectType: "None", severity: "None", status: "Passed", photos: "2", remarks: "Ready for QR activation." },
];

export const scrapRows: ScrapRecord[] = [
  { id: "SCR-001", rejectedQuantity: "580", scrapReason: "Surface finish defect", batch: "BAT-904", product: "LT Pump Motor", sku: "PUMP-MOTOR-1HP", factory: "Chennai Assembly Hub", qcInspector: "Naveen Das", status: "Scrap Pending", qrVoidStatus: "Pending", securityAlert: "Enabled" },
  { id: "SCR-002", rejectedQuantity: "440", scrapReason: "Seal variation", batch: "BAT-901", product: "LT Shield Pro", sku: "SHIELD-PRO-20KG", factory: "Pune Smart Factory", qcInspector: "Sara Iyer", status: "Scrapped", qrVoidStatus: "Voided", securityAlert: "Enabled" },
];

export const qcTabs = ["Overview", "Checklist", "Defects", "Photos", "Batch Impact", "Recall Risk", "Timeline", "Audit Log"];

export const qualityChecklist = [
  { id: "CHK-001", check: "Weight tolerance", result: "Passed", owner: "QC Inspector" },
  { id: "CHK-002", check: "QR print readiness", result: "Passed", owner: "Factory Admin" },
  { id: "CHK-003", check: "Surface finish", result: "Rework", owner: "QC Supervisor" },
];
