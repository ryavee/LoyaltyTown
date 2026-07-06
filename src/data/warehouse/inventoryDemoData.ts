import { AlertTriangle, Boxes, Clock3, PackageCheck, PackageSearch, PackageX, ShieldAlert, TrendingUp } from "lucide-react";

export type InventoryStatus = "Healthy" | "Low Stock" | "Out Of Stock" | "Near Expiry" | "Blocked" | "Damaged";

export type InventoryRecord = {
  id: string;
  product: string;
  sku: string;
  batch: string;
  warehouse: string;
  bin: string;
  availableQty: string;
  reservedQty: string;
  blockedQty: string;
  damagedQty: string;
  mrp: string;
  costPrice: string;
  sellingPrice: string;
  expiry: string;
  status: InventoryStatus;
};

export const inventoryKpis = [
  { id: "total", label: "Total Inventory", value: "72.1M", target: "All warehouses", progress: 72, icon: Boxes },
  { id: "low", label: "Low Stock", value: 128, target: "18 critical", progress: 42, icon: AlertTriangle },
  { id: "out", label: "Out Of Stock", value: 17, target: "Needs replenishment", progress: 20, icon: PackageX },
  { id: "expiry", label: "Near Expiry", value: 64, target: "Next 45 days", progress: 34, icon: Clock3 },
  { id: "blocked", label: "Blocked Stock", value: "6.4K", target: "QC / legal", progress: 38, icon: ShieldAlert },
  { id: "damaged", label: "Damaged Stock", value: "1.2K", target: "Awaiting scrap", progress: 18, icon: PackageSearch },
  { id: "value", label: "Inventory Value", value: "$42.8M", target: "Cost basis", progress: 79, icon: PackageCheck },
  { id: "aging", label: "Inventory Aging", value: "38d", target: "Median age", progress: 55, icon: TrendingUp },
];

export const inventoryRows: InventoryRecord[] = [
  { id: "INV-1001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", warehouse: "Central Finished Goods Warehouse", bin: "A-01-04", availableQty: "18,420", reservedQty: "2,180", blockedQty: "120", damagedQty: "18", mrp: "$42", costPrice: "$21", sellingPrice: "$38", expiry: "2027-03-18", status: "Healthy" },
  { id: "INV-1002", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", warehouse: "West Regional Distribution Center", bin: "B-07-12", availableQty: "42,810", reservedQty: "8,600", blockedQty: "0", damagedQty: "42", mrp: "$58", costPrice: "$29", sellingPrice: "$52", expiry: "2027-01-12", status: "Healthy" },
  { id: "INV-1003", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", warehouse: "South Contractor Fulfillment Hub", bin: "S-03-09", availableQty: "9,640", reservedQty: "4,120", blockedQty: "480", damagedQty: "75", mrp: "$86", costPrice: "$48", sellingPrice: "$79", expiry: "2026-09-08", status: "Low Stock" },
  { id: "INV-1004", product: "Contractor Tool Kit", sku: "KIT-CON-12", batch: "RMA-2407-018", warehouse: "Returns Inspection Hub", bin: "R-02-08", availableQty: "1,284", reservedQty: "316", blockedQty: "920", damagedQty: "118", mrp: "$120", costPrice: "$72", sellingPrice: "$109", expiry: "2028-05-30", status: "Blocked" },
];

export const movementRows = [
  { id: "MOV-8841", sku: "ADH-PRO-20KG", type: "Inbound", quantity: "+4,200", source: "Pune Smart Factory", destination: "Central Warehouse", status: "Posted" },
  { id: "MOV-8842", sku: "PNT-SQR-10L", type: "Reservation", quantity: "-8,600", source: "West Warehouse", destination: "Dealer Orders", status: "Reserved" },
  { id: "MOV-8843", sku: "LAM-PRM-8X4", type: "Adjustment", quantity: "-28", source: "Cycle Count", destination: "South Warehouse", status: "Review" },
  { id: "MOV-8844", sku: "KIT-CON-12", type: "Return", quantity: "+316", source: "RMA Hub", destination: "Returns Inspection", status: "Inspection" },
];

export const inventoryTrendData = [
  { week: "W1", stock: 72, reserved: 18, aging: 34, turnover: 4.1 },
  { week: "W2", stock: 76, reserved: 22, aging: 36, turnover: 4.4 },
  { week: "W3", stock: 69, reserved: 26, aging: 39, turnover: 3.9 },
  { week: "W4", stock: 81, reserved: 24, aging: 38, turnover: 4.7 },
  { week: "W5", stock: 84, reserved: 31, aging: 41, turnover: 4.6 },
  { week: "W6", stock: 79, reserved: 35, aging: 38, turnover: 4.8 },
];

export const inventoryTabs = ["Overview", "Stock Movement", "Adjustment", "Cycle Count", "Reconciliation", "Ledger", "Timeline", "Analytics", "Audit"];

export const analyticsTiles = [
  "Inventory Turnover",
  "Stock Aging",
  "Warehouse Utilization",
  "Dead Stock",
  "ABC Analysis",
  "Fast Moving",
  "Slow Moving",
  "Forecast",
];
