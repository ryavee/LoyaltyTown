export type ReturnStatus = "Inspection" | "Approval" | "Restocking" | "Replacement" | "Scrap";

export type ReturnRecord = {
  id: string;
  returnNumber: string;
  source: string;
  product: string;
  sku: string;
  quantity: string;
  inspection: string;
  approval: string;
  resolution: string;
  status: ReturnStatus;
};

export const returnRows: ReturnRecord[] = [
  { id: "RTN-1008", returnNumber: "RTN-2407-1008", source: "Dealer Return", product: "Contractor Tool Kit", sku: "KIT-CON-12", quantity: "316", inspection: "In Progress", approval: "Pending", resolution: "Restocking", status: "Inspection" },
  { id: "RTN-1009", returnNumber: "RTN-2407-1009", source: "Customer Return", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", quantity: "42", inspection: "Completed", approval: "Approved", resolution: "Replacement", status: "Replacement" },
  { id: "RTN-1010", returnNumber: "RTN-2407-1010", source: "Distributor Return", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", quantity: "75", inspection: "Completed", approval: "Approved", resolution: "Scrap", status: "Scrap" },
];

export const reverseLogisticsRows = [
  { id: "REV-001", request: "Pickup Request", owner: "RMA Desk", queue: "Dealer returns", status: "Scheduled" },
  { id: "REV-002", request: "Collection", owner: "3PL Partner", queue: "Customer returns", status: "In Transit" },
  { id: "REV-003", request: "Inspection", owner: "Quality Team", queue: "Quarantine", status: "Inspection" },
  { id: "REV-004", request: "Destroy", owner: "Compliance", queue: "Scrap stock", status: "Approval" },
];
