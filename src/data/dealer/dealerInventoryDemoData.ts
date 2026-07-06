export type DealerInventoryRecord = {
  id: string;
  product: string;
  sku: string;
  batch: string;
  dealer: string;
  quantity: string;
  available: string;
  reserved: string;
  sold: string;
  damaged: string;
  expiry: string;
  status: "Healthy" | "Low Stock" | "Damaged" | "Near Expiry";
};

export const dealerInventory: DealerInventoryRecord[] = [
  { id: "DINV-01", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", dealer: "Metro Build Mart", quantity: "1,840", available: "1,240", reserved: "280", sold: "320", damaged: "8", expiry: "2027-03-18", status: "Healthy" },
  { id: "DINV-02", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", dealer: "Prime Hardware Hub", quantity: "4,210", available: "3,350", reserved: "860", sold: "1,120", damaged: "14", expiry: "2027-01-12", status: "Healthy" },
  { id: "DINV-03", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", dealer: "Southern Contractor Store", quantity: "640", available: "220", reserved: "420", sold: "880", damaged: "26", expiry: "2026-09-08", status: "Low Stock" },
  { id: "DINV-04", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", dealer: "Eastern Pro Dealer", quantity: "284", available: "168", reserved: "116", sold: "312", damaged: "18", expiry: "2028-05-30", status: "Damaged" },
];
