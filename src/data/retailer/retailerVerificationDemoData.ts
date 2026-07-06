export type ProductVerificationRecord = {
  id: string; qrCode: string; product: string; sku: string; batch: string; verificationResult: "Genuine" | "Duplicate Alert" | "Counterfeit Risk"; scanLocation: string; scanTime: string; customer: string; retailer: string; riskScore: number;
};
export const productVerifications: ProductVerificationRecord[] = [
  { id: "VER-001", qrCode: "ADH-2026-014224", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", verificationResult: "Genuine", scanLocation: "Mumbai", scanTime: "2026-07-05 10:12", customer: "Aarav Homecare", retailer: "Urban Paint Point", riskScore: 8 },
  { id: "VER-002", qrCode: "PNT-2607-008811", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", verificationResult: "Genuine", scanLocation: "Delhi", scanTime: "2026-07-04 16:20", customer: "North Interiors", retailer: "Prime Hardware Retail", riskScore: 12 },
  { id: "VER-003", qrCode: "LAM-GS1-004210", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", verificationResult: "Duplicate Alert", scanLocation: "Kolkata", scanTime: "2026-07-03 14:48", customer: "Sen Renovations", retailer: "East Home Supply", riskScore: 78 },
];
