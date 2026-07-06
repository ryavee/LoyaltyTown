export type DistributorReturnStatus = "Requested" | "Inspection" | "Approval" | "Replacement" | "Credit Note" | "Rejected";

export type DistributorReturnRecord = {
  id: string;
  returnNumber: string;
  distributor: string;
  product: string;
  sku: string;
  batch: string;
  quantity: string;
  reason: string;
  photos: string;
  status: DistributorReturnStatus;
};

export const distributorReturns: DistributorReturnRecord[] = [
  { id: "DRTN-001", returnNumber: "DRTN-2026-001", distributor: "Apex Industrial Supply", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", quantity: "120", reason: "Packaging damage", photos: "3 photos", status: "Inspection" },
  { id: "DRTN-002", returnNumber: "DRTN-2026-002", distributor: "Northline Distribution", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", quantity: "42", reason: "Leakage", photos: "5 photos", status: "Approval" },
  { id: "DRTN-003", returnNumber: "DRTN-2026-003", distributor: "Southern Trade Network", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", quantity: "75", reason: "Edge damage", photos: "8 photos", status: "Credit Note" },
  { id: "DRTN-004", returnNumber: "DRTN-2026-004", distributor: "Eastern Channel Co.", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", quantity: "18", reason: "Missing components", photos: "2 photos", status: "Replacement" },
];
