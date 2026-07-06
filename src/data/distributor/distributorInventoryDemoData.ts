export type DistributorInventoryStatus = "Healthy" | "Low Stock" | "Reserved" | "Damaged" | "Expired";

export type DistributorInventoryRecord = {
  id: string;
  product: string;
  sku: string;
  batch: string;
  distributor: string;
  quantity: string;
  available: string;
  reserved: string;
  damaged: string;
  expiry: string;
  warehouse: string;
  status: DistributorInventoryStatus;
};

export const distributorInventory: DistributorInventoryRecord[] = [
  { id: "DINV-001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", distributor: "Apex Industrial Supply", quantity: "18,420", available: "16,240", reserved: "2,180", damaged: "18", expiry: "2027-03-18", warehouse: "West RDC", status: "Healthy" },
  { id: "DINV-002", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", distributor: "Northline Distribution", quantity: "42,810", available: "34,210", reserved: "8,600", damaged: "42", expiry: "2027-01-12", warehouse: "North Hub", status: "Healthy" },
  { id: "DINV-003", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", distributor: "Southern Trade Network", quantity: "9,640", available: "5,520", reserved: "4,120", damaged: "75", expiry: "2026-09-08", warehouse: "South Hub", status: "Low Stock" },
  { id: "DINV-004", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", distributor: "Eastern Channel Co.", quantity: "1,284", available: "850", reserved: "316", damaged: "118", expiry: "2028-05-30", warehouse: "East Hub", status: "Damaged" },
];
