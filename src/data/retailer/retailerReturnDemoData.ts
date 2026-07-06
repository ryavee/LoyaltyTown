export type RetailerReturnRecord = { id: string; returnNumber: string; retailer: string; product: string; sku: string; batch: string; quantity: string; reason: string; photos: string; status: "Requested" | "Inspection" | "Replacement" | "Credit Note" | "Rejected"; };
export const retailerReturns: RetailerReturnRecord[] = [
  { id: "RRTN-001", returnNumber: "RRTN-2026-001", retailer: "Urban Paint Point", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", quantity: "6", reason: "Packaging damage", photos: "3 photos", status: "Inspection" },
  { id: "RRTN-002", returnNumber: "RRTN-2026-002", retailer: "Prime Hardware Retail", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", quantity: "8", reason: "Leakage", photos: "5 photos", status: "Replacement" },
];
