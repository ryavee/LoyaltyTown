import { ArrowDownToLine, ArrowRightLeft, ArrowUpFromLine, Boxes, Grid3X3, PackageX, Warehouse } from "lucide-react";

export type WarehouseStatus = "Active" | "High Utilization" | "Maintenance" | "Inactive";
export type BinStatus = "Available" | "Occupied" | "Reserved" | "Blocked";

export type WarehouseRecord = {
  id: string;
  name: string;
  code: string;
  factory: string;
  address: string;
  location: string;
  manager: string;
  phone: string;
  email: string;
  capacity: string;
  storageType: string;
  utilization: string;
  status: WarehouseStatus;
};

export type BinRecord = {
  id: string;
  warehouse: string;
  binNumber: string;
  rack: string;
  floor: string;
  zone: string;
  capacity: string;
  availableCapacity: string;
  status: BinStatus;
};

export const warehouseKpis = [
  { id: "total", label: "Total Warehouses", value: 8, target: "4 regions", progress: 86, icon: Warehouse },
  { id: "utilization", label: "Storage Utilization", value: "78%", target: "84% threshold", progress: 78, icon: Boxes },
  { id: "inbound", label: "Today's Inbound", value: "24.1K", target: "+12% vs plan", progress: 72, icon: ArrowDownToLine },
  { id: "outbound", label: "Today's Outbound", value: "18.7K", target: "96.4% SLA", progress: 81, icon: ArrowUpFromLine },
  { id: "transfers", label: "Pending Transfers", value: 42, target: "7 urgent", progress: 54, icon: ArrowRightLeft },
  { id: "low-stock", label: "Low Stock Items", value: 128, target: "18 critical", progress: 48, icon: PackageX },
  { id: "blocked", label: "Blocked Stock", value: "6.4K", target: "QC hold", progress: 38, icon: Grid3X3 },
];

export const warehouses: WarehouseRecord[] = [
  {
    id: "WH-001",
    name: "Central Finished Goods Warehouse",
    code: "WH-CFG-01",
    factory: "Pune Smart Factory",
    address: "Plot 42, Industrial Estate",
    location: "Pune, Maharashtra",
    manager: "Neha Kulkarni",
    phone: "+91 98765 21001",
    email: "neha.kulkarni@loyaltytown.demo",
    capacity: "120,000 units",
    storageType: "Ambient / Pallet",
    utilization: "82%",
    status: "Active",
  },
  {
    id: "WH-002",
    name: "West Regional Distribution Center",
    code: "WH-WDC-02",
    factory: "Ahmedabad Factory",
    address: "Logistics Park, Gate 3",
    location: "Ahmedabad, Gujarat",
    manager: "Rahul Mehta",
    phone: "+91 98765 21002",
    email: "rahul.mehta@loyaltytown.demo",
    capacity: "86,000 units",
    storageType: "Bulk / Rack",
    utilization: "74%",
    status: "Active",
  },
  {
    id: "WH-003",
    name: "South Contractor Fulfillment Hub",
    code: "WH-SFH-03",
    factory: "Chennai Factory",
    address: "SIPCOT Logistics Block",
    location: "Chennai, Tamil Nadu",
    manager: "Meera Iyer",
    phone: "+91 98765 21003",
    email: "meera.iyer@loyaltytown.demo",
    capacity: "64,000 units",
    storageType: "Mixed / Secure",
    utilization: "91%",
    status: "High Utilization",
  },
  {
    id: "WH-004",
    name: "Returns Inspection Hub",
    code: "WH-RMA-04",
    factory: "Noida Assembly Unit",
    address: "Sector 88 Returns Park",
    location: "Noida, Uttar Pradesh",
    manager: "Aman Verma",
    phone: "+91 98765 21004",
    email: "aman.verma@loyaltytown.demo",
    capacity: "28,000 units",
    storageType: "Quarantine / Inspection",
    utilization: "63%",
    status: "Active",
  },
];

export const bins: BinRecord[] = [
  { id: "BIN-001", warehouse: "Central Finished Goods Warehouse", binNumber: "A-01-04", rack: "A-01", floor: "Ground", zone: "Zone A", capacity: "2,400", availableCapacity: "520", status: "Occupied" },
  { id: "BIN-002", warehouse: "Central Finished Goods Warehouse", binNumber: "B-07-12", rack: "B-07", floor: "Ground", zone: "Zone B", capacity: "1,800", availableCapacity: "1,120", status: "Available" },
  { id: "BIN-003", warehouse: "South Contractor Fulfillment Hub", binNumber: "S-03-09", rack: "S-03", floor: "Mezzanine", zone: "Secure", capacity: "1,100", availableCapacity: "120", status: "Reserved" },
  { id: "BIN-004", warehouse: "Returns Inspection Hub", binNumber: "R-02-08", rack: "R-02", floor: "Ground", zone: "Quarantine", capacity: "900", availableCapacity: "0", status: "Blocked" },
];

export const warehouseTabs = ["Overview", "Inventory", "Bins", "Inbound", "Outbound", "Transfers", "Returns", "Analytics", "Documents", "History", "Audit"];

export const warehouseTrendData = [
  { day: "Mon", inbound: 24, outbound: 18, utilization: 76, blocked: 4 },
  { day: "Tue", inbound: 32, outbound: 26, utilization: 78, blocked: 5 },
  { day: "Wed", inbound: 28, outbound: 31, utilization: 81, blocked: 7 },
  { day: "Thu", inbound: 44, outbound: 36, utilization: 83, blocked: 6 },
  { day: "Fri", inbound: 41, outbound: 39, utilization: 82, blocked: 4 },
  { day: "Sat", inbound: 22, outbound: 19, utilization: 79, blocked: 3 },
];

export const warehouseActivities = [
  { id: "ACT-001", title: "Inbound ASN received", description: "Dock 01 accepted supplier delivery for ADH-PRO-20KG", timestamp: "12 min ago" },
  { id: "ACT-002", title: "Dispatch wave released", description: "Bay 04 prepared 18 dealer orders for West region", timestamp: "24 min ago" },
  { id: "ACT-003", title: "Cycle count variance opened", description: "South hub variance requires supervisor review", timestamp: "46 min ago" },
  { id: "ACT-004", title: "Returns inspection completed", description: "316 contractor kits moved to restocking queue", timestamp: "1 hr ago" },
];
