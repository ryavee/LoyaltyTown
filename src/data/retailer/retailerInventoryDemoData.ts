export type RetailerInventoryRecord = {
  id: string; product: string; sku: string; batch: string; retailer: string; quantity: string; available: string; reserved: string; sold: string; damaged: string; expiry: string; status: "Healthy" | "Low Stock" | "Damaged" | "Near Expiry";
};
export const retailerInventory: RetailerInventoryRecord[] = [
  { id: "RINV-001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", retailer: "Urban Paint Point", quantity: "840", available: "520", reserved: "80", sold: "240", damaged: "6", expiry: "2027-03-18", status: "Healthy" },
  { id: "RINV-002", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", retailer: "Prime Hardware Retail", quantity: "1,210", available: "820", reserved: "120", sold: "270", damaged: "8", expiry: "2027-01-12", status: "Healthy" },
  { id: "RINV-003", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", retailer: "South Contractor Counter", quantity: "240", available: "64", reserved: "90", sold: "86", damaged: "12", expiry: "2026-09-08", status: "Low Stock" },
  { id: "RINV-004", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", retailer: "East Home Supply", quantity: "184", available: "118", reserved: "24", sold: "42", damaged: "14", expiry: "2028-05-30", status: "Damaged" },
];
