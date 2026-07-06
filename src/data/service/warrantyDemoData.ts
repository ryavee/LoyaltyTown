import { BadgeCheck, Clock, ShieldCheck, Smile, ThumbsDown, ThumbsUp, Wrench } from "lucide-react";

export type WarrantyRecord = {
  id: string;
  customer: string;
  product: string;
  sku: string;
  serialNumber: string;
  qrCode: string;
  purchaseDate: string;
  invoice: string;
  dealer: string;
  retailer: string;
  warrantyType: string;
  warrantyStart: string;
  warrantyEnd: string;
  region: string;
  status: string;
};

export const warrantyKpis = [
  { id: "active", label: "Active Warranties", value: "184K", target: "Registered products", progress: 78, icon: ShieldCheck },
  { id: "expired", label: "Expired Warranties", value: "28K", target: "Renewal pool", progress: 34, icon: Clock },
  { id: "registrations", label: "Warranty Registrations", value: "18.6K", target: "This month", progress: 66, icon: BadgeCheck },
  { id: "pending", label: "Claims Pending", value: 324, target: "Approval queue", progress: 42, icon: Clock },
  { id: "approved", label: "Claims Approved", value: 892, target: "This quarter", progress: 72, icon: ThumbsUp },
  { id: "rejected", label: "Claims Rejected", value: 86, target: "Policy exceptions", progress: 18, icon: ThumbsDown },
  { id: "replacement", label: "Replacement Requests", value: 128, target: "Open RMAs", progress: 36, icon: Wrench },
  { id: "repair", label: "Repair Requests", value: 246, target: "Assigned jobs", progress: 54, icon: Wrench },
  { id: "resolution", label: "Average Resolution Time", value: "38h", target: "-6h QoQ", progress: 62, icon: Clock },
  { id: "csat", label: "Customer Satisfaction", value: "92.4%", target: "CSAT", progress: 92, icon: Smile },
];

export const warranties: WarrantyRecord[] = [
  { id: "WRN-1001", customer: "Aarav Sharma", product: "WeatherShield Pro Paint", sku: "WSP-20L-EXT", serialNumber: "SN-WSP-882901", qrCode: "LT-GENUINE-1001", purchaseDate: "2026-07-01", invoice: "INV-MBM-9011", dealer: "Metro Build Mart", retailer: "Urban Paint Point", warrantyType: "Standard", warrantyStart: "2026-07-05", warrantyEnd: "2029-07-05", region: "West", status: "Active" },
  { id: "WRN-1002", customer: "Nisha Kapoor", product: "Luxury Emulsion", sku: "LUX-10L-IV", serialNumber: "SN-LUX-441092", qrCode: "LT-USED-1002", purchaseDate: "2026-06-24", invoice: "INV-UPP-3308", dealer: "Urban Paint Point", retailer: "Urban Paint Point", warrantyType: "Extended", warrantyStart: "2026-06-28", warrantyEnd: "2028-06-28", region: "West", status: "Registered" },
  { id: "WRN-1003", customer: "Urban Build Co.", product: "TileBond Ultra", sku: "TBU-25KG", serialNumber: "SN-TBU-761882", qrCode: "LT-TB-441902", purchaseDate: "2026-06-18", invoice: "INV-SCS-7712", dealer: "Southern Contractor Store", retailer: "South Contractor Counter", warrantyType: "Project", warrantyStart: "2026-06-20", warrantyEnd: "2028-06-20", region: "South", status: "Inspection" },
  { id: "WRN-1004", customer: "Riya Batra", product: "FixMate Adhesive", sku: "FIX-5KG", serialNumber: "SN-FIX-119020", qrCode: "LT-FM-118290", purchaseDate: "2025-06-11", invoice: "INV-PHH-1190", dealer: "Prime Hardware Hub", retailer: "Prime Hardware Retail", warrantyType: "Standard", warrantyStart: "2025-06-12", warrantyEnd: "2026-06-12", region: "North", status: "Expired" },
];

export const warrantyTrendData = [
  { month: "Jan", warranties: 12, claims: 2.4, products: 9, region: 7, reasons: 3, resolution: 48, csat: 86, cost: 0.42 },
  { month: "Feb", warranties: 16, claims: 2.8, products: 12, region: 9, reasons: 4, resolution: 46, csat: 88, cost: 0.48 },
  { month: "Mar", warranties: 22, claims: 3.4, products: 16, region: 11, reasons: 5, resolution: 43, csat: 89, cost: 0.52 },
  { month: "Apr", warranties: 28, claims: 3.9, products: 20, region: 14, reasons: 6, resolution: 41, csat: 91, cost: 0.58 },
  { month: "May", warranties: 34, claims: 4.7, products: 24, region: 17, reasons: 7, resolution: 39, csat: 92, cost: 0.64 },
  { month: "Jun", warranties: 42, claims: 5.8, products: 29, region: 21, reasons: 9, resolution: 38, csat: 92.4, cost: 0.72 },
];

export const warrantyInsights = [
  "Paint claims are trending up in humid regions; inspect storage and application guidance.",
  "Replacement requests are highest for products activated through dealer-assisted warranty flows.",
  "Average resolution improved by 6 hours after technician routing changes.",
  "Claims with invoice and QR proof are approved 34% faster than manual submissions.",
];
