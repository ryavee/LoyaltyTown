export type RetailerSaleRecord = {
  id: string; saleNumber: string; retailer: string; customer: string; product: string; sku: string; qrCode: string; quantity: string; saleAmount: string; paymentMode: string; saleDate: string; verificationStatus: "Verified" | "Pending" | "Risk"; warrantyAssistanceStatus: "Completed" | "Pending" | "Not Required";
};
export const retailerSales: RetailerSaleRecord[] = [
  { id: "RSAL-001", saleNumber: "SALE-2026-001", retailer: "Urban Paint Point", customer: "Aarav Homecare", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", qrCode: "ADH-2026-014224", quantity: "4", saleAmount: "$168", paymentMode: "UPI", saleDate: "2026-07-05", verificationStatus: "Verified", warrantyAssistanceStatus: "Completed" },
  { id: "RSAL-002", saleNumber: "SALE-2026-002", retailer: "Prime Hardware Retail", customer: "North Interiors", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", qrCode: "PNT-2607-008811", quantity: "6", saleAmount: "$348", paymentMode: "Card", saleDate: "2026-07-04", verificationStatus: "Verified", warrantyAssistanceStatus: "Pending" },
  { id: "RSAL-003", saleNumber: "SALE-2026-003", retailer: "East Home Supply", customer: "Sen Renovations", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", qrCode: "LAM-GS1-004210", quantity: "2", saleAmount: "$172", paymentMode: "Cash", saleDate: "2026-07-03", verificationStatus: "Risk", warrantyAssistanceStatus: "Not Required" },
];
