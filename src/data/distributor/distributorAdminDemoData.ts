import { Award, BadgeCheck, Boxes, CreditCard, HandCoins, MapPinned, PackageSearch, RotateCcw, ShoppingCart, Truck, UserCheck, WalletCards } from "lucide-react";

export const distributorDashboardData = {
  kpis: [
    { id: "total", label: "Total Distributors", value: "248", target: "18 territories", progress: 86, icon: Truck },
    { id: "active", label: "Active Distributors", value: "214", target: "86% active", progress: 86, icon: BadgeCheck },
    { id: "inactive", label: "Inactive Distributors", value: "17", target: "Reactivation", progress: 28, icon: UserCheck },
    { id: "pending", label: "Pending Approval", value: "17", target: "KYC queue", progress: 34, icon: UserCheck },
    { id: "orders", label: "Monthly Orders", value: "12.8K", target: "+14% MoM", progress: 73, icon: ShoppingCart },
    { id: "sales", label: "Monthly Sales", value: "$8.4M", target: "Distributor sales", progress: 78, icon: HandCoins },
    { id: "inventory", label: "Inventory Value", value: "$32.6M", target: "Channel stock", progress: 71, icon: Boxes },
    { id: "outstanding", label: "Outstanding Amount", value: "$1.8M", target: "Credit exposure", progress: 48, icon: CreditCard },
    { id: "collections", label: "Collections", value: "$6.1M", target: "This month", progress: 68, icon: CreditCard },
    { id: "wallet", label: "Wallet Balance", value: "618K pts", target: "Reward liability", progress: 61, icon: WalletCards },
    { id: "rewards", label: "Reward Points", value: "2.4M", target: "Earned points", progress: 66, icon: Award },
    { id: "dealers", label: "Dealer Network Size", value: "8,420", target: "Mapped dealers", progress: 82, icon: MapPinned },
  ],
  topDistributors: [
    { id: "TD-1", name: "Apex Industrial Supply", sales: "$1.84M", rank: "#1", status: "Active" },
    { id: "TD-2", name: "Northline Distribution", sales: "$1.12M", rank: "#2", status: "Active" },
    { id: "TD-3", name: "Southern Trade Network", sales: "$740K", rank: "#3", status: "Pending Approval" },
  ],
  recentDistributors: [
    { id: "RD-1", name: "Eastern Channel Co.", city: "Kolkata", status: "On Hold" },
    { id: "RD-2", name: "Southern Trade Network", city: "Chennai", status: "Pending Approval" },
    { id: "RD-3", name: "Apex Industrial Supply", city: "Mumbai", status: "Active" },
  ],
  pendingCollections: [
    { id: "PC-1", title: "Southern Trade Network", detail: "$218K overdue since Jul 04", status: "Overdue" },
    { id: "PC-2", title: "Eastern Channel Co.", detail: "$312K due Jul 15", status: "Outstanding" },
    { id: "PC-3", title: "Apex Industrial Supply", detail: "$64.2K partially paid", status: "Partially Paid" },
  ],
  lowStockAlerts: [
    { id: "LS-1", title: "LAM-PRM-8X4", detail: "South territory inventory below reorder level.", status: "Low Stock" },
    { id: "LS-2", title: "KIT-CON-12", detail: "East hub damaged stock requires replacement.", status: "Damaged" },
    { id: "LS-3", title: "PNT-SQR-10L", detail: "Campaign stock reserve is trending high.", status: "Reserved" },
  ],
  aiInsights: [
    { id: "AI-1", title: "Collection priority", detail: "Route Southern Trade Network collections before approving new high-value orders.", status: "Overdue" },
    { id: "AI-2", title: "Dealer activation", detail: "Apex can grow 12% by activating dormant dealers in West tier-2 cities.", status: "Active" },
    { id: "AI-3", title: "Return risk", detail: "Eastern Channel return rate is above baseline on tool kit batches.", status: "At Risk" },
  ],
};

export const distributorAnalyticsData = [
  { month: "Jan", growth: 18, sales: 1.8, collections: 1.1, inventory: 72, dealer: 54, region: 62, returns: 4, rewards: 8 },
  { month: "Feb", growth: 22, sales: 2.2, collections: 1.4, inventory: 76, dealer: 58, region: 66, returns: 5, rewards: 12 },
  { month: "Mar", growth: 28, sales: 2.8, collections: 1.8, inventory: 81, dealer: 64, region: 71, returns: 6, rewards: 18 },
  { month: "Apr", growth: 31, sales: 3.1, collections: 2.0, inventory: 79, dealer: 69, region: 76, returns: 7, rewards: 23 },
  { month: "May", growth: 37, sales: 3.7, collections: 2.5, inventory: 84, dealer: 74, region: 82, returns: 8, rewards: 29 },
  { month: "Jun", growth: 42, sales: 4.2, collections: 2.9, inventory: 78, dealer: 81, region: 88, returns: 6, rewards: 36 },
];

export const distributorWalletTransactions = [
  { id: "DWT-1", reference: "DST-WAL-001", type: "Credit", source: "Scheme Achievement", points: "84,000", cashback: "$8,400", payout: "Pending", date: "2026-07-02" },
  { id: "DWT-2", reference: "DST-WAL-002", type: "Debit", source: "Reward Redemption", points: "22,000", cashback: "$0", payout: "Completed", date: "2026-07-03" },
  { id: "DWT-3", reference: "DST-WAL-003", type: "Credit", source: "Dealer Activation Bonus", points: "18,400", cashback: "$1,120", payout: "Approved", date: "2026-07-04" },
];

export const distributorRewardData = [
  { id: "DR-1", reward: "Monsoon Growth Bonus", distributor: "Apex Industrial Supply", points: "84,000", status: "Active" },
  { id: "DR-2", reward: "Dealer Activation Booster", distributor: "Northline Distribution", points: "42,800", status: "Achieved" },
  { id: "DR-3", reward: "Collection Discipline Reward", distributor: "Southern Trade Network", points: "18,200", status: "At Risk" },
];

export const distributorDocumentsData = [
  { id: "DOC-1", document: "GST", status: "Verified", updated: "2026-06-18" },
  { id: "DOC-2", document: "PAN", status: "Verified", updated: "2026-06-18" },
  { id: "DOC-3", document: "Agreement", status: "Pending Approval", updated: "2026-06-28" },
  { id: "DOC-4", document: "KYC", status: "Review", updated: "2026-07-02" },
  { id: "DOC-5", document: "Bank documents", status: "Verified", updated: "2026-06-24" },
  { id: "DOC-6", document: "Certificates", status: "Verified", updated: "2026-07-01" },
];

export const distributorAuditTimelineData = [
  { id: "DA-1", title: "Profile updates", description: "Payment terms and contact person updated.", timestamp: "Today 10:20", tone: "info" },
  { id: "DA-2", title: "Orders", description: "Distributor order DORD-2026-9001 moved to approved.", timestamp: "Today 09:40", tone: "success" },
  { id: "DA-3", title: "Payments", description: "Partial bank transfer reconciled with invoice.", timestamp: "Yesterday", tone: "info" },
  { id: "DA-4", title: "Collections", description: "Collection follow-up assigned to Finance South.", timestamp: "Jul 04, 2026", tone: "warning" },
  { id: "DA-5", title: "Rewards", description: "Scheme achievement points credited to wallet.", timestamp: "Jul 03, 2026", tone: "success" },
  { id: "DA-6", title: "Inventory", description: "Low stock alert generated for LAM-PRM-8X4.", timestamp: "Jul 03, 2026", tone: "danger" },
  { id: "DA-7", title: "Returns", description: "Credit note pending for damaged tool kit batch.", timestamp: "Jul 02, 2026", tone: "warning" },
];
