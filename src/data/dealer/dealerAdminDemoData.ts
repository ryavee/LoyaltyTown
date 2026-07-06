import { Award, BadgeCheck, Boxes, ClipboardList, Clock, CreditCard, QrCode, ShieldCheck, Store, TrendingUp, UserCheck, WalletCards } from "lucide-react";

export const dealerDashboardData = {
  kpis: [
    { id: "total", label: "Total Dealers", value: "1,840", target: "All territories", progress: 84, icon: Store },
    { id: "active", label: "Active Dealers", value: "1,592", target: "86% active", progress: 86, icon: BadgeCheck },
    { id: "inactive", label: "Inactive Dealers", value: "184", target: "Win-back queue", progress: 38, icon: Clock },
    { id: "pending", label: "Pending Approval", value: "64", target: "KYC queue", progress: 32, icon: UserCheck },
    { id: "orders", label: "Monthly Orders", value: "8.2K", target: "+11% MoM", progress: 72, icon: ClipboardList },
    { id: "sales", label: "Monthly Sales", value: "$4.8M", target: "+18% MoM", progress: 78, icon: CreditCard },
    { id: "inventory", label: "Inventory Value", value: "$18.4M", target: "Dealer stock", progress: 69, icon: Boxes },
    { id: "rewards", label: "Reward Points", value: "1.8M", target: "Earned points", progress: 69, icon: Award },
    { id: "wallet", label: "Wallet Balance", value: "493K pts", target: "Dealer pool", progress: 61, icon: WalletCards },
    { id: "projects", label: "Projects Registered", value: "3,284", target: "Active + proposal", progress: 64, icon: TrendingUp },
    { id: "customers", label: "Customer Registrations", value: "42.6K", target: "Dealer assisted", progress: 74, icon: UserCheck },
    { id: "warranty", label: "Warranty Activations", value: "12.4K", target: "This month", progress: 66, icon: ShieldCheck },
  ],
  topDealers: [
    { id: "TD-1", name: "Metro Build Mart", sales: "$484K", rank: "#1", status: "Active" },
    { id: "TD-2", name: "Prime Hardware Hub", sales: "$392K", rank: "#2", status: "Active" },
    { id: "TD-3", name: "Southern Contractor Store", sales: "$218K", rank: "#3", status: "Pending Approval" },
  ],
  recentDealers: [
    { id: "RD-1", name: "Eastern Pro Dealer", city: "Kolkata", status: "On Hold" },
    { id: "RD-2", name: "Southern Contractor Store", city: "Chennai", status: "Pending Approval" },
    { id: "RD-3", name: "Metro Build Mart", city: "Mumbai", status: "Active" },
  ],
  alerts: [
    { id: "AL-1", title: "Low stock risk", detail: "Southern Contractor Store needs laminate replenishment in 3 days.", status: "Low Stock" },
    { id: "AL-2", title: "GST document expiring", detail: "Eastern Pro Dealer KYC requires certificate refresh.", status: "Pending" },
    { id: "AL-3", title: "Warranty spike", detail: "Prime Hardware Hub claim trend is above territory baseline.", status: "Claim" },
  ],
  aiInsights: [
    { id: "AI-1", title: "Territory expansion", detail: "West region can add 12 dealers without channel overlap.", status: "Active" },
    { id: "AI-2", title: "Reward optimization", detail: "Shift top dealers from cashback to tier boosters for better retention.", status: "Earned" },
    { id: "AI-3", title: "Counterfeit education", detail: "Dealers with duplicate customer scans should receive QR verification collateral.", status: "Pending" },
  ],
};

export const dealerAnalyticsData = [
  { month: "Jan", growth: 24, sales: 1.2, qr: 18, rewards: 8, region: 62, ranking: 74, customers: 12, warranty: 7, inventory: 48 },
  { month: "Feb", growth: 30, sales: 1.5, qr: 24, rewards: 12, region: 66, ranking: 78, customers: 15, warranty: 9, inventory: 54 },
  { month: "Mar", growth: 38, sales: 2.1, qr: 32, rewards: 18, region: 71, ranking: 82, customers: 22, warranty: 12, inventory: 60 },
  { month: "Apr", growth: 46, sales: 2.4, qr: 41, rewards: 23, region: 76, ranking: 86, customers: 28, warranty: 15, inventory: 66 },
  { month: "May", growth: 55, sales: 2.9, qr: 52, rewards: 29, region: 82, ranking: 88, customers: 34, warranty: 19, inventory: 72 },
  { month: "Jun", growth: 64, sales: 3.4, qr: 68, rewards: 36, region: 88, ranking: 92, customers: 42, warranty: 23, inventory: 81 },
];

export const dealerQrActivityData = [
  { month: "Jan", generated: 120, activated: 82, scans: 460, duplicate: 8, counterfeit: 2 },
  { month: "Feb", generated: 148, activated: 104, scans: 580, duplicate: 10, counterfeit: 3 },
  { month: "Mar", generated: 190, activated: 146, scans: 740, duplicate: 12, counterfeit: 4 },
  { month: "Apr", generated: 240, activated: 188, scans: 920, duplicate: 14, counterfeit: 5 },
  { month: "May", generated: 280, activated: 230, scans: 1120, duplicate: 18, counterfeit: 6 },
  { month: "Jun", generated: 340, activated: 286, scans: 1380, duplicate: 22, counterfeit: 7 },
];

export const dealerWalletTransactions = [
  { id: "DWT-1", reference: "DWT-2026-001", type: "Credit", source: "Quarterly Target Bonus", points: "24,000", cashback: "$1,200", settlement: "Settled", date: "2026-07-02" },
  { id: "DWT-2", reference: "DWT-2026-002", type: "Debit", source: "Reward Redemption", points: "8,000", cashback: "$0", settlement: "Completed", date: "2026-07-03" },
  { id: "DWT-3", reference: "DWT-2026-003", type: "Credit", source: "Scan Activation Bonus", points: "12,400", cashback: "$420", settlement: "Pending", date: "2026-07-04" },
];

export const dealerDocumentsData = [
  { id: "DOC-1", document: "GST", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-2", document: "PAN", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-3", document: "Agreement", status: "Pending", updated: "2026-06-28" },
  { id: "DOC-4", document: "KYC", status: "Review", updated: "2026-07-02" },
  { id: "DOC-5", document: "Certificates", status: "Verified", updated: "2026-07-01" },
  { id: "DOC-6", document: "Images", status: "Verified", updated: "2026-07-04" },
];

export const dealerAuditTimelineData = [
  { id: "DA-1", title: "Profile Updates", description: "Contact person and payment terms updated.", timestamp: "Today 10:20", tone: "info" },
  { id: "DA-2", title: "Orders", description: "Order DORD-2026-4401 approved for dispatch.", timestamp: "Today 09:40", tone: "success" },
  { id: "DA-3", title: "Rewards", description: "Quarterly bonus points credited to dealer wallet.", timestamp: "Yesterday", tone: "success" },
  { id: "DA-4", title: "QR", description: "Duplicate scan education alert assigned to dealer team.", timestamp: "Jul 04, 2026", tone: "warning" },
  { id: "DA-5", title: "Inventory", description: "Low stock event generated for LAM-PRM-8X4.", timestamp: "Jul 03, 2026", tone: "danger" },
];
