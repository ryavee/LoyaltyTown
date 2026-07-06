export type InboundStatus = "Pending Verification" | "Inspection" | "Accepted" | "Rejected" | "Posted";
export type DispatchStatus = "Picking" | "Packing" | "Ready" | "In Transit" | "Delivered";
export type TransferStatus = "Requested" | "Approved" | "In Transit" | "Completed" | "Rejected";

export type InboundRecord = {
  id: string;
  grnNumber: string;
  supplier: string;
  warehouse: string;
  product: string;
  sku: string;
  batch: string;
  quantity: string;
  inspector: string;
  status: InboundStatus;
};

export type DispatchRecord = {
  id: string;
  dispatchNumber: string;
  warehouse: string;
  customer: string;
  dealer: string;
  distributor: string;
  transporter: string;
  vehicle: string;
  driver: string;
  dispatchDate: string;
  expectedDelivery: string;
  status: DispatchStatus;
};

export type TransferRecord = {
  id: string;
  fromWarehouse: string;
  toWarehouse: string;
  products: string;
  batch: string;
  quantity: string;
  requestedBy: string;
  approvedBy: string;
  status: TransferStatus;
};

export const inboundRows: InboundRecord[] = [
  { id: "INB-2401", grnNumber: "GRN-2407-001", supplier: "Pune Smart Factory", warehouse: "Central Finished Goods Warehouse", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", batch: "BTH-2407-001", quantity: "4,200", inspector: "Ritu Sharma", status: "Accepted" },
  { id: "INB-2402", grnNumber: "GRN-2407-002", supplier: "Ahmedabad Factory", warehouse: "West Regional Distribution Center", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", batch: "BTH-2407-024", quantity: "8,100", inspector: "Arjun Patel", status: "Inspection" },
  { id: "INB-2403", grnNumber: "GRN-2407-003", supplier: "Chennai Factory", warehouse: "South Contractor Fulfillment Hub", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", batch: "BTH-2406-117", quantity: "2,400", inspector: "Priya Nair", status: "Pending Verification" },
];

export const dispatchRows: DispatchRecord[] = [
  { id: "DSP-8841", dispatchNumber: "DSP-2407-8841", warehouse: "West Regional Distribution Center", customer: "B2B Dealer Network", dealer: "Shakti Paints", distributor: "WestLine Distribution", transporter: "BlueDart Surface", vehicle: "GJ-01-TX-8841", driver: "Manoj Singh", dispatchDate: "2026-07-05", expectedDelivery: "2026-07-07", status: "Ready" },
  { id: "DSP-8842", dispatchNumber: "DSP-2407-8842", warehouse: "Central Finished Goods Warehouse", customer: "Industrial Contractors", dealer: "BuildPro Pune", distributor: "Maha Supply Co", transporter: "Delhivery Freight", vehicle: "MH-12-TR-4450", driver: "Sandeep More", dispatchDate: "2026-07-05", expectedDelivery: "2026-07-06", status: "In Transit" },
  { id: "DSP-8843", dispatchNumber: "DSP-2407-8843", warehouse: "South Contractor Fulfillment Hub", customer: "Retail Chain South", dealer: "Chennai Materials", distributor: "SouthHub Logistics", transporter: "VRL Logistics", vehicle: "TN-09-LG-2210", driver: "Kannan R", dispatchDate: "2026-07-04", expectedDelivery: "2026-07-06", status: "Delivered" },
];

export const transferRows: TransferRecord[] = [
  { id: "TRF-5520", fromWarehouse: "Central Finished Goods Warehouse", toWarehouse: "South Contractor Fulfillment Hub", products: "Premium Laminate Sheet", batch: "BTH-2406-117", quantity: "2,400", requestedBy: "Demand Planning", approvedBy: "Warehouse Director", status: "Approved" },
  { id: "TRF-5521", fromWarehouse: "West Regional Distribution Center", toWarehouse: "Central Finished Goods Warehouse", products: "Smart QR Paint Bucket", batch: "BTH-2407-024", quantity: "1,600", requestedBy: "Sales Ops", approvedBy: "Regional Manager", status: "In Transit" },
  { id: "TRF-5522", fromWarehouse: "Returns Inspection Hub", toWarehouse: "Central Finished Goods Warehouse", products: "Contractor Tool Kit", batch: "RMA-2407-018", quantity: "316", requestedBy: "Returns Team", approvedBy: "Quality Lead", status: "Requested" },
];
