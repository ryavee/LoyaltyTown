export type DealerWarrantyRecord = {
  id: string;
  customer: string;
  product: string;
  sku: string;
  qrCode: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  claimStatus: "Active" | "Pending" | "Claim" | "Rejected";
};

export const dealerWarranties: DealerWarrantyRecord[] = [
  { id: "DWRN-001", customer: "Aarav Contractors", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", qrCode: "ADH-2026-014224", warrantyStartDate: "2026-07-05", warrantyEndDate: "2027-07-05", claimStatus: "Active" },
  { id: "DWRN-002", customer: "North Interiors", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", qrCode: "PNT-2607-008811", warrantyStartDate: "2026-07-04", warrantyEndDate: "2027-07-04", claimStatus: "Pending" },
  { id: "DWRN-003", customer: "Sen Renovations", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", qrCode: "LAM-GS1-004210", warrantyStartDate: "2026-06-21", warrantyEndDate: "2027-06-21", claimStatus: "Claim" },
];
