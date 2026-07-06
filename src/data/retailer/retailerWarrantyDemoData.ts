export type RetailerWarrantyRecord = { id: string; customer: string; product: string; sku: string; qrCode: string; warrantyStartDate: string; warrantyEndDate: string; claimStatus: "Active" | "Pending" | "Claim" | "Rejected"; };
export const retailerWarranties: RetailerWarrantyRecord[] = [
  { id: "RWRN-001", customer: "Aarav Homecare", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", qrCode: "ADH-2026-014224", warrantyStartDate: "2026-07-05", warrantyEndDate: "2027-07-05", claimStatus: "Active" },
  { id: "RWRN-002", customer: "North Interiors", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", qrCode: "PNT-2607-008811", warrantyStartDate: "2026-07-04", warrantyEndDate: "2027-07-04", claimStatus: "Pending" },
];
