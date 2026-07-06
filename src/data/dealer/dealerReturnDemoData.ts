export type DealerReturnRecord = {
  id: string;
  returnNumber: string;
  dealer: string;
  product: string;
  sku: string;
  batch: string;
  quantity: string;
  reason: string;
  photos: string;
  status: "Requested" | "Inspection" | "Replacement" | "Credit Note" | "Rejected";
};

export const dealerReturns: DealerReturnRecord[] = [
  { id: "DRTN-001", returnNumber: "DRTN-2026-001", dealer: "Metro Build Mart", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", quantity: "18", reason: "Packaging damage", photos: "3 photos", status: "Inspection" },
  { id: "DRTN-002", returnNumber: "DRTN-2026-002", dealer: "Prime Hardware Hub", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", quantity: "14", reason: "Leakage", photos: "5 photos", status: "Replacement" },
  { id: "DRTN-003", returnNumber: "DRTN-2026-003", dealer: "Eastern Pro Dealer", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", quantity: "8", reason: "Missing components", photos: "2 photos", status: "Credit Note" },
];
