import { CalendarClock, DatabaseZap, Download, FileBarChart, FileCheck2, FileWarning, UsersRound } from "lucide-react";

export const reportKpis = [
  { id: "total", label: "Total Reports", value: 248, target: "Catalog reports", progress: 82, icon: FileBarChart },
  { id: "scheduled", label: "Scheduled Reports", value: 64, target: "Active schedules", progress: 71, icon: CalendarClock },
  { id: "generated", label: "Generated Reports", value: "18.4K", target: "This month", progress: 76, icon: FileCheck2 },
  { id: "failed", label: "Failed Reports", value: 28, target: "Retry queue", progress: 14, icon: FileWarning },
  { id: "downloaded", label: "Reports Downloaded", value: "12.7K", target: "Exports", progress: 68, icon: Download },
  { id: "users", label: "Active Users", value: 418, target: "BI users", progress: 72, icon: UsersRound },
  { id: "exports", label: "Export Jobs", value: 892, target: "CSV, XLSX, PDF, JSON", progress: 64, icon: Download },
  { id: "freshness", label: "Data Freshness", value: "12m", target: "Last refresh", progress: 91, icon: DatabaseZap },
];

export const reportUsageTrend = [
  { month: "Jan", usage: 820, exports: 420, sales: 180, qr: 140, finance: 90 },
  { month: "Feb", usage: 940, exports: 510, sales: 210, qr: 166, finance: 110 },
  { month: "Mar", usage: 1120, exports: 680, sales: 246, qr: 188, finance: 132 },
  { month: "Apr", usage: 1380, exports: 760, sales: 284, qr: 221, finance: 160 },
  { month: "May", usage: 1620, exports: 840, sales: 320, qr: 260, finance: 184 },
  { month: "Jun", usage: 1840, exports: 980, sales: 364, qr: 296, finance: 212 },
];

export const reportCategories = [
  "Sales Reports",
  "QR Reports",
  "Product Reports",
  "Inventory Reports",
  "Warehouse Reports",
  "Dealer Reports",
  "Distributor Reports",
  "Retailer Reports",
  "Contractor Reports",
  "Customer Reports",
  "Campaign Reports",
  "Loyalty Reports",
  "Wallet Reports",
  "Warranty Reports",
  "Finance Reports",
  "GST Reports",
  "AI Reports",
  "Audit Reports",
].map((category, index) => ({
  id: `RPT-CAT-${String(index + 1).padStart(2, "0")}`,
  title: category,
  description: `${category} with filters, date ranges, export actions, preview tables, chart previews, and schedule options.`,
  owner: ["Sales Ops", "QR Ops", "Manufacturing", "Finance", "Analytics", "Audit"][index % 6],
  downloads: `${(index + 4) * 128}`,
  status: index % 5 === 0 ? "Review" : "Ready",
}));

export const reportPreviewRows = [
  { id: "ROW-1", metric: "Revenue", current: "₹3.42Cr", previous: "₹3.10Cr", variance: "+10.3%", status: "Ready" },
  { id: "ROW-2", metric: "QR Scans", current: "8.4M", previous: "7.6M", variance: "+10.5%", status: "Ready" },
  { id: "ROW-3", metric: "Warranty Claims", current: "324", previous: "286", variance: "+13.2%", status: "Review" },
  { id: "ROW-4", metric: "Wallet Liability", current: "₹1.8Cr", previous: "₹1.6Cr", variance: "+12.5%", status: "Ready" },
];
