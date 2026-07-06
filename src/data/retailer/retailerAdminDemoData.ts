import { Award, BadgeCheck, ClipboardList, PackageCheck, ReceiptText, RotateCcw, ShieldCheck, Store, Users, WalletCards } from "lucide-react";

export const retailerDashboardData = {
  kpis: [
    { id: "total", label: "Total Retailers", value: "3,240", target: "All territories", progress: 84, icon: Store },
    { id: "active", label: "Active Retailers", value: "2,864", target: "88% active", progress: 88, icon: BadgeCheck },
    { id: "inactive", label: "Inactive Retailers", value: "280", target: "Reactivation", progress: 32, icon: Store },
    { id: "pending", label: "Pending Approval", value: "96", target: "KYC queue", progress: 32, icon: Store },
    { id: "sales", label: "Monthly Sales", value: "$2.7M", target: "+12% MoM", progress: 72, icon: ReceiptText },
    { id: "orders", label: "Monthly Orders", value: "5.8K", target: "Retail orders", progress: 68, icon: ClipboardList },
    { id: "verification", label: "Product Verifications", value: "42.8K", target: "Retail scans", progress: 78, icon: PackageCheck },
    { id: "registrations", label: "Consumer Registrations", value: "18.4K", target: "This month", progress: 70, icon: Users },
    { id: "warranty", label: "Warranty Assistance", value: "9.6K", target: "Assisted", progress: 61, icon: ShieldCheck },
    { id: "wallet", label: "Wallet Balance", value: "386K pts", target: "Retailer pool", progress: 59, icon: WalletCards },
    { id: "rewards", label: "Reward Points", value: "1.2M", target: "Earned points", progress: 64, icon: Award },
    { id: "returns", label: "Return Requests", value: "128", target: "Open cases", progress: 34, icon: RotateCcw },
  ],
  topRetailers: [
    { id: "TR-1", name: "Urban Paint Point", sales: "$184K", rank: "#1", status: "Active" },
    { id: "TR-2", name: "Prime Hardware Retail", sales: "$96K", rank: "#2", status: "Active" },
    { id: "TR-3", name: "East Home Supply", sales: "$64K", rank: "#3", status: "On Hold" },
  ],
  recentRetailers: [
    { id: "RR-1", name: "South Contractor Counter", city: "Chennai", status: "Pending Approval" },
    { id: "RR-2", name: "East Home Supply", city: "Kolkata", status: "On Hold" },
    { id: "RR-3", name: "Urban Paint Point", city: "Mumbai", status: "Active" },
  ],
  warrantyAssistance: [
    { id: "WA-1", title: "Aarav Homecare", detail: "Industrial Adhesive Pro warranty active.", status: "Active" },
    { id: "WA-2", title: "North Interiors", detail: "Smart QR Paint Bucket claim assistance pending.", status: "Pending" },
  ],
  aiInsights: [
    { id: "AI-1", title: "Verification conversion", detail: "Urban Paint Point converts verified scans into warranty 16% above West baseline.", status: "Verified" },
    { id: "AI-2", title: "Offer lift", detail: "Festival Cashback can be extended to Prime Hardware Retail for higher redemptions.", status: "Active" },
    { id: "AI-3", title: "Return risk", detail: "East Home Supply return rate is elevated for laminate batches.", status: "At Risk" },
  ],
};

export const retailerAnalyticsData = [
  { month: "Jan", growth: 18, sales: 0.8, verification: 2.1, registrations: 1.4, rewards: 0.3, region: 58, wallet: 0.4, warranty: 7 },
  { month: "Feb", growth: 24, sales: 1.1, verification: 2.7, registrations: 1.8, rewards: 0.4, region: 62, wallet: 0.6, warranty: 9 },
  { month: "Mar", growth: 31, sales: 1.4, verification: 3.4, registrations: 2.2, rewards: 0.7, region: 68, wallet: 0.8, warranty: 12 },
  { month: "Apr", growth: 38, sales: 1.8, verification: 4.1, registrations: 2.8, rewards: 0.9, region: 74, wallet: 1.0, warranty: 16 },
  { month: "May", growth: 46, sales: 2.2, verification: 4.9, registrations: 3.4, rewards: 1.1, region: 80, wallet: 1.4, warranty: 20 },
  { month: "Jun", growth: 55, sales: 2.7, verification: 5.8, registrations: 4.2, rewards: 1.5, region: 86, wallet: 1.8, warranty: 24 },
];

export const retailerWalletTransactions = [
  { id: "RWT-1", reference: "RTL-WAL-001", type: "Credit", source: "Verification Assist Bonus", points: "18,200", cashback: "$840", payout: "Pending", date: "2026-07-02" },
  { id: "RWT-2", reference: "RTL-WAL-002", type: "Debit", source: "Reward Redemption", points: "6,400", cashback: "$0", payout: "Completed", date: "2026-07-03" },
  { id: "RWT-3", reference: "RTL-WAL-003", type: "Credit", source: "Offer Earnings", points: "9,800", cashback: "$420", payout: "Approved", date: "2026-07-04" },
];

export const retailerDocumentsData = [
  { id: "DOC-1", document: "GST", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-2", document: "PAN", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-3", document: "Agreement", status: "Pending Approval", updated: "2026-06-28" },
  { id: "DOC-4", document: "KYC", status: "Inspection", updated: "2026-07-02" },
  { id: "DOC-5", document: "Bank documents", status: "Verified", updated: "2026-06-24" },
  { id: "DOC-6", document: "Store images", status: "Verified", updated: "2026-07-01" },
];

export const retailerAuditTimelineData = [
  { id: "RA-1", title: "Profile updates", description: "Store contact and dealer mapping updated.", timestamp: "Today 10:20", tone: "info" },
  { id: "RA-2", title: "Sales", description: "Sale verified with QR scan and invoice placeholder.", timestamp: "Today 09:40", tone: "success" },
  { id: "RA-3", title: "Orders", description: "Retailer order moved to packed.", timestamp: "Yesterday", tone: "info" },
  { id: "RA-4", title: "Verification", description: "Duplicate scan alert reviewed by retailer desk.", timestamp: "Jul 04, 2026", tone: "warning" },
  { id: "RA-5", title: "Warranty", description: "Warranty assistance completed for consumer purchase.", timestamp: "Jul 03, 2026", tone: "success" },
  { id: "RA-6", title: "Wallet", description: "Offer earnings credited to retailer wallet.", timestamp: "Jul 03, 2026", tone: "success" },
  { id: "RA-7", title: "Returns", description: "Return replacement queued after inspection.", timestamp: "Jul 02, 2026", tone: "warning" },
];
