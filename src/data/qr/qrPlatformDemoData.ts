import {
  AlertTriangle,
  BadgeCheck,
  Boxes,
  Fingerprint,
  Gift,
  Globe2,
  PackageCheck,
  QrCode,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

export const qrExecutiveKpis = [
  { id: "total-generated", label: "Total QR Generated", value: "184.2M", target: "Across all products", progress: 92, icon: QrCode },
  { id: "today-generated", label: "Today's QR Generated", value: "1.28M", target: "+18% vs avg", progress: 78, icon: Zap },
  { id: "total-scans", label: "Total Scans", value: "42.8M", target: "Verified scans", progress: 84, icon: ScanLine },
  { id: "unique-customers", label: "Unique Customers", value: "8.4M", target: "First-party identities", progress: 72, icon: Users },
  { id: "duplicate-scans", label: "Duplicate Scans", value: "18.6K", target: "Open clusters", progress: 34, icon: Fingerprint },
  { id: "counterfeit", label: "Counterfeit Alerts", value: "426", target: "67 critical", progress: 28, icon: ShieldAlert },
  { id: "gs1", label: "GS1 Products", value: "6,420", target: "Digital Link ready", progress: 81, icon: Globe2 },
  { id: "batches", label: "QR Batches", value: "18,942", target: "Active batch registry", progress: 76, icon: Boxes },
  { id: "campaigns", label: "Active Campaigns", value: "148", target: "Scan-linked", progress: 64, icon: Gift },
  { id: "protected", label: "Products Protected", value: "7,812", target: "Secure QR enabled", progress: 88, icon: ShieldCheck },
  { id: "activation", label: "Activation Rate", value: "68.4%", target: "+4.2 pts", progress: 68, icon: BadgeCheck },
  { id: "warranty", label: "Warranty Activations", value: "2.16M", target: "QR-assisted", progress: 71, icon: ShieldCheck },
];

export const qrGenerationTrend = [
  { month: "Jan", generated: 18.2, scans: 7.4, risk: 42, activations: 3.8 },
  { month: "Feb", generated: 21.8, scans: 8.9, risk: 39, activations: 4.6 },
  { month: "Mar", generated: 27.4, scans: 11.2, risk: 48, activations: 5.8 },
  { month: "Apr", generated: 32.1, scans: 14.4, risk: 52, activations: 7.2 },
  { month: "May", generated: 38.6, scans: 18.8, risk: 61, activations: 9.6 },
  { month: "Jun", generated: 46.1, scans: 23.4, risk: 57, activations: 12.8 },
];

export const qrRegionWiseScans = [
  { region: "North", scans: 8.2, customers: 2.1 },
  { region: "West", scans: 7.6, customers: 1.9 },
  { region: "South", scans: 8.9, customers: 2.4 },
  { region: "East", scans: 4.2, customers: 1.1 },
  { region: "Central", scans: 3.9, customers: 0.9 },
];

export const qrDeviceTypes = [
  { name: "Android", scans: 58 },
  { name: "iOS", scans: 24 },
  { name: "Dealer App", scans: 11 },
  { name: "Web", scans: 7 },
];

export const qrScanSources = [
  { source: "Consumer Scan", scans: 18.4, conversion: 34 },
  { source: "Dealer App", scans: 9.6, conversion: 42 },
  { source: "Retail POS", scans: 6.8, conversion: 28 },
  { source: "Warranty Flow", scans: 4.2, conversion: 51 },
];

export const qrTopProducts = [
  { id: "prod-1", name: "Premium Cement 50kg", scans: "8.4M", activations: "3.2M", risk: "Low" },
  { id: "prod-2", name: "AquaShield Coat", scans: "5.1M", activations: "1.8M", risk: "Medium" },
  { id: "prod-3", name: "UltraBond Adhesive", scans: "4.7M", activations: "1.6M", risk: "Low" },
];

export const qrTopDealers = [
  { id: "dealer-1", name: "Metro Infra Supply", region: "North", scans: "842K", conversion: "39%" },
  { id: "dealer-2", name: "Shree BuildMart", region: "West", scans: "718K", conversion: "34%" },
  { id: "dealer-3", name: "Dakshin Traders", region: "South", scans: "684K", conversion: "36%" },
];

export const qrTopCampaigns = [
  { id: "camp-1", name: "Monsoon Contractor Rewards", scans: "2.8M", rewards: "482K", roi: "4.8x" },
  { id: "camp-2", name: "Dealer Growth Program", scans: "1.9M", rewards: "318K", roi: "3.9x" },
  { id: "camp-3", name: "Warranty Education", scans: "1.2M", rewards: "118K", roi: "2.6x" },
];

export const qrRecentScans = [
  { id: "scan-1", serial: "ADH-2026-014224", product: "Industrial Adhesive Pro", city: "Pune", device: "Android", risk: "Low", time: "4 min ago" },
  { id: "scan-2", serial: "PNT-2607-008811", product: "Smart QR Paint Bucket", city: "Ahmedabad", device: "Dealer App", risk: "Medium", time: "11 min ago" },
  { id: "scan-3", serial: "LAM-GS1-004210", product: "Premium Laminate Sheet", city: "Jaipur", device: "Web", risk: "Critical", time: "18 min ago" },
];

export const qrWarrantyActivations = [
  { id: "war-1", customer: "Rohit Kumar", product: "AquaShield Coat", serial: "AQS-2026-821144", status: "Activated" },
  { id: "war-2", customer: "Sahana Buildcon", product: "FlexiPipe Pro", serial: "FLX-2026-441018", status: "Certificate Sent" },
  { id: "war-3", customer: "Nikhil Shah", product: "UltraBond Adhesive", serial: "UBD-2026-118421", status: "Activated" },
];

export const qrAiInsights = [
  { id: "ai-1", title: "Counterfeit Corridor", severity: "Critical", detail: "Duplicate scan velocity is elevated across Delhi-Jaipur for laminate GS1 batches." },
  { id: "ai-2", title: "Activation Opportunity", severity: "Opportunity", detail: "Warranty activation conversion can improve by 9% if rewards are shown before registration." },
  { id: "ai-3", title: "Print Queue Risk", severity: "Watch", detail: "Two Zebra queues have delayed secure label jobs for high-volume batches." },
  { id: "ai-4", title: "GS1 Readiness", severity: "Good", detail: "82% of protected products have valid GTIN and resolver-ready templates." },
];

export const qrBatchKpis = [
  { id: "batches", label: "Total Batches", value: "18,942", target: "All QR runs", progress: 84, icon: Boxes },
  { id: "generated", label: "Generated", value: "184.2M", target: "Serials generated", progress: 92, icon: QrCode },
  { id: "printed", label: "Printed", value: "162.8M", target: "Label output", progress: 81, icon: PackageCheck },
  { id: "activated", label: "Activated", value: "42.6M", target: "Consumer/channel", progress: 68, icon: BadgeCheck },
  { id: "claimed", label: "Claimed", value: "28.4M", target: "Reward/warranty", progress: 58, icon: Gift },
  { id: "paused", label: "Paused", value: "218", target: "Review queue", progress: 22, icon: AlertTriangle },
];

export const qrPrintJobs = [
  { id: "PJ-001", job: "Adhesive Pro Labels", printer: "Zebra ZT411", batch: "QRB-2026-001", quantity: "18,420", status: "Printing" },
  { id: "PJ-002", job: "GS1 Export Labels", printer: "Honeywell PX940", batch: "QRB-2026-003", quantity: "9,640", status: "Queued" },
  { id: "PJ-003", job: "Retail Cashback Labels", printer: "TSC MB240", batch: "QRB-2026-002", quantity: "42,810", status: "Failed" },
];

export const qrTemplateData = [
  { id: "tpl-1", name: "GS1 Secure Label", logoPosition: "Top", color: "Cyan", frame: "Rounded", label: "Warranty + Reward", status: "Active" },
  { id: "tpl-2", name: "Consumer Verification", logoPosition: "Center", color: "Slate", frame: "Square", label: "Verify Product", status: "Draft" },
  { id: "tpl-3", name: "Export Pallet Label", logoPosition: "Bottom", color: "Black", frame: "Industrial", label: "GS1 Digital Link", status: "Active" },
];
