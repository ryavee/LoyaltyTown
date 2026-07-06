import {
  AlertTriangle,
  Award,
  BadgeCheck,
  Crown,
  Gift,
  HandCoins,
  ReceiptText,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";

export type LoyaltyStatus = "Active" | "Draft" | "Published" | "Pending" | "Approved" | "Failed" | "Hold" | "Completed";

export type RewardRule = {
  id: string;
  ruleName: string;
  ruleType: string;
  audience: string;
  productScope: string;
  earningLogic: string;
  fraudGuard: string;
  status: LoyaltyStatus;
};

export type WalletRow = {
  id: string;
  owner: string;
  ownerType: string;
  walletBalance: string;
  points: string;
  cashback: string;
  holds: string;
  payoutStatus: LoyaltyStatus;
  tier: string;
};

export type RewardCatalogRow = {
  id: string;
  rewardName: string;
  rewardType: string;
  stock: string;
  eligibility: string;
  pointsCost: string;
  redemptionLimit: string;
  status: LoyaltyStatus;
};

export const loyaltyAdminDashboardData = {
  kpis: [
    { id: "members", label: "Total Members", value: "3.8M", target: "All owner types", progress: 84, icon: UsersRound },
    { id: "issued", label: "Points Issued", value: "42.8M", target: "This quarter", progress: 72, icon: HandCoins },
    { id: "redeemed", label: "Points Redeemed", value: "18.4M", target: "Burn rate", progress: 58, icon: Gift },
    { id: "cashback", label: "Cashback Paid", value: "$482K", target: "Settled payouts", progress: 64, icon: WalletCards },
    { id: "pending", label: "Pending Payouts", value: "$92K", target: "Approval queue", progress: 38, icon: ReceiptText },
    { id: "tiers", label: "Active Tiers", value: "5", target: "Bronze to Diamond", progress: 100, icon: Crown },
    { id: "redemptions", label: "Redemptions", value: "284K", target: "+14% MoM", progress: 68, icon: Trophy },
    { id: "fraud", label: "Fraud Holds", value: "128", target: "Risk review", progress: 24, icon: AlertTriangle },
    { id: "expiring", label: "Expiring Points", value: "2.4M", target: "Next 30 days", progress: 42, icon: Award },
    { id: "liability", label: "Wallet Liability", value: "$4.9M", target: "Outstanding", progress: 79, icon: BadgeCheck },
  ],
  insights: [
    "Dealer wallets hold 41% of outstanding liability; expiry nudges can reduce exposure this month.",
    "Contractor scan rules are driving the fastest tier progression in West and South regions.",
    "Fraud holds are concentrated in duplicate QR scan earning rules above 3 scans per hour.",
    "Cashback payout reconciliation is stable, but pending payout approvals are up 12% week over week.",
  ],
};

export const rewardRuleDemoData: RewardRule[] = [
  { id: "RULE-1001", ruleName: "QR Scan First Activation", ruleType: "QR Scan", audience: "Customers", productScope: "All serialized products", earningLogic: "100 points on verified first scan", fraudGuard: "Device + geo velocity", status: "Published" },
  { id: "RULE-1002", ruleName: "Dealer Monthly Target", ruleType: "Dealer Target", audience: "Dealers", productScope: "Smart Pumps", earningLogic: "2% cashback after target achievement", fraudGuard: "Order validation", status: "Active" },
  { id: "RULE-1003", ruleName: "Contractor Scan Bonus", ruleType: "Contractor Scan", audience: "Contractors", productScope: "Cement Boards", earningLogic: "25 points per approved QR scan", fraudGuard: "Duplicate scan hold", status: "Active" },
  { id: "RULE-1004", ruleName: "Retailer Festival Sale", ruleType: "Retailer Sale", audience: "Retailers", productScope: "Premium Fittings", earningLogic: "Tiered voucher rewards", fraudGuard: "Invoice OCR match", status: "Draft" },
  { id: "RULE-1005", ruleName: "Referral Chain Bonus", ruleType: "Referral", audience: "Customers", productScope: "All categories", earningLogic: "500 points per verified referral", fraudGuard: "Mobile + device uniqueness", status: "Published" },
];

export const walletDemoData: WalletRow[] = [
  { id: "WAL-7001", owner: "Aarav Sharma", ownerType: "Customer", walletBalance: "$428", points: "18,240", cashback: "$84", holds: "$0", payoutStatus: "Approved", tier: "Gold" },
  { id: "WAL-7002", owner: "Prakash Dealer Hub", ownerType: "Dealer", walletBalance: "$18,420", points: "842,000", cashback: "$4,820", holds: "$720", payoutStatus: "Pending", tier: "Platinum" },
  { id: "WAL-7003", owner: "Metro Distribution Co.", ownerType: "Distributor", walletBalance: "$42,900", points: "1.8M", cashback: "$12,200", holds: "$2,100", payoutStatus: "Hold", tier: "Diamond" },
  { id: "WAL-7004", owner: "BuildRight Retail", ownerType: "Retailer", walletBalance: "$6,480", points: "320,400", cashback: "$1,920", holds: "$0", payoutStatus: "Approved", tier: "Gold" },
  { id: "WAL-7005", owner: "Ravi Contractor", ownerType: "Contractor", walletBalance: "$1,284", points: "92,140", cashback: "$420", holds: "$80", payoutStatus: "Pending", tier: "Silver" },
];

export const walletLedgerDemoData = [
  { id: "TXN-1", date: "2026-07-06", type: "Credit", source: "QR Scan", points: "+100", cashback: "$0", balance: "$428", status: "Completed" },
  { id: "TXN-2", date: "2026-07-05", type: "Debit", source: "Reward Redemption", points: "-1,200", cashback: "$0", balance: "$421", status: "Completed" },
  { id: "TXN-3", date: "2026-07-04", type: "Hold", source: "Duplicate Scan Review", points: "0", cashback: "$80", balance: "$421", status: "Hold" },
  { id: "TXN-4", date: "2026-07-03", type: "Credit", source: "Referral", points: "+500", cashback: "$10", balance: "$421", status: "Completed" },
];

export const rewardCatalogDemoData: RewardCatalogRow[] = [
  { id: "RWD-501", rewardName: "Instant Cashback", rewardType: "Cashback", stock: "Unlimited", eligibility: "Gold+", pointsCost: "2,000", redemptionLimit: "2/month", status: "Active" },
  { id: "RWD-502", rewardName: "Retail Coupon 10%", rewardType: "Coupon", stock: "18,000", eligibility: "All Members", pointsCost: "800", redemptionLimit: "5/month", status: "Active" },
  { id: "RWD-503", rewardName: "Amazon Gift Voucher", rewardType: "Gift Voucher", stock: "4,200", eligibility: "Silver+", pointsCost: "3,500", redemptionLimit: "1/month", status: "Active" },
  { id: "RWD-504", rewardName: "Training Masterclass", rewardType: "Training", stock: "800 seats", eligibility: "Contractors", pointsCost: "1,200", redemptionLimit: "1/quarter", status: "Draft" },
  { id: "RWD-505", rewardName: "Premium Tool Kit", rewardType: "Merchandise", stock: "640", eligibility: "Platinum+", pointsCost: "12,000", redemptionLimit: "1/year", status: "Active" },
];

export const redemptionDemoData = [
  { id: "RED-901", member: "Aarav Sharma", ownerType: "Customer", reward: "Amazon Gift Voucher", points: "3,500", queue: "Approval", fulfillment: "Pending dispatch", date: "2026-07-06", status: "Pending" },
  { id: "RED-902", member: "Prakash Dealer Hub", ownerType: "Dealer", reward: "Instant Cashback", points: "20,000", queue: "Approved", fulfillment: "Settlement queued", date: "2026-07-05", status: "Approved" },
  { id: "RED-903", member: "Ravi Contractor", ownerType: "Contractor", reward: "Training Masterclass", points: "1,200", queue: "Completed", fulfillment: "Seat confirmed", date: "2026-07-04", status: "Completed" },
  { id: "RED-904", member: "BuildRight Retail", ownerType: "Retailer", reward: "Retail Coupon 10%", points: "800", queue: "Failed", fulfillment: "Coupon expired", date: "2026-07-03", status: "Failed" },
];

export const cashbackDemoData = {
  rules: [
    { id: "CBR-1", rule: "Dealer Target Cashback", audience: "Dealers", rate: "2%", cap: "$5,000/month", reconciliation: "Order matched", status: "Active" },
    { id: "CBR-2", rule: "Retail Sell-out Cashback", audience: "Retailers", rate: "1.5%", cap: "$1,200/month", reconciliation: "Invoice OCR", status: "Draft" },
    { id: "CBR-3", rule: "Contractor Project Cashback", audience: "Contractors", rate: "Flat $25", cap: "$500/month", reconciliation: "Project approval", status: "Active" },
  ],
  payouts: [
    { id: "PAY-1", owner: "Prakash Dealer Hub", ownerType: "Dealer", amount: "$4,820", method: "Bank Transfer", settlement: "2026-07-08", status: "Pending" },
    { id: "PAY-2", owner: "Metro Distribution Co.", ownerType: "Distributor", amount: "$12,200", method: "Bank Transfer", settlement: "2026-07-09", status: "Hold" },
    { id: "PAY-3", owner: "BuildRight Retail", ownerType: "Retailer", amount: "$1,920", method: "UPI", settlement: "2026-07-05", status: "Approved" },
    { id: "PAY-4", owner: "Ravi Contractor", ownerType: "Contractor", amount: "$420", method: "UPI", settlement: "2026-07-04", status: "Failed" },
  ],
};

export const tierDemoData = [
  { id: "TIER-1", name: "Bronze", threshold: "0 points", members: "1.4M", benefits: "Base earn rate, starter coupons", progression: 100, color: "from-amber-700 to-amber-500" },
  { id: "TIER-2", name: "Silver", threshold: "10K points", members: "920K", benefits: "1.2x earn, cashback access", progression: 74, color: "from-slate-500 to-slate-300" },
  { id: "TIER-3", name: "Gold", threshold: "50K points", members: "480K", benefits: "1.5x earn, priority rewards", progression: 58, color: "from-yellow-500 to-amber-300" },
  { id: "TIER-4", name: "Platinum", threshold: "150K points", members: "118K", benefits: "2x earn, premium vouchers", progression: 42, color: "from-cyan-500 to-blue-400" },
  { id: "TIER-5", name: "Diamond", threshold: "500K points", members: "18K", benefits: "Exclusive experiences, concierge", progression: 24, color: "from-violet-500 to-fuchsia-400" },
];

export const leaderboardDemoData = [
  { id: "LB-1", rank: 1, name: "Metro Distribution Co.", type: "Distributor", region: "West", points: "1.8M", redemptions: "420", status: "Active" },
  { id: "LB-2", rank: 2, name: "Prakash Dealer Hub", type: "Dealer", region: "North", points: "842K", redemptions: "188", status: "Active" },
  { id: "LB-3", rank: 3, name: "BuildRight Retail", type: "Retailer", region: "East", points: "320K", redemptions: "96", status: "Active" },
  { id: "LB-4", rank: 4, name: "Ravi Contractor", type: "Contractor", region: "West", points: "92K", redemptions: "28", status: "Active" },
  { id: "LB-5", rank: 5, name: "Aarav Sharma", type: "Customer", region: "South", points: "18K", redemptions: "8", status: "Active" },
];

export const achievementDemoData = [
  { id: "ACH-1", badge: "First Scan", milestone: "Complete first verified QR scan", audience: "Customers", earned: "1.8M", status: "Active" },
  { id: "ACH-2", badge: "Dealer Champion", milestone: "Hit 3 monthly sales targets", audience: "Dealers", earned: "4,820", status: "Active" },
  { id: "ACH-3", badge: "Contractor Pro", milestone: "Register 10 verified projects", audience: "Contractors", earned: "18,420", status: "Active" },
  { id: "ACH-4", badge: "Referral Builder", milestone: "Bring 5 verified referrals", audience: "All Members", earned: "92,000", status: "Draft" },
];

export const loyaltyAnalyticsData = [
  { month: "Jan", issued: 8.2, redeemed: 1.2, cashback: 0.22, redemptions: 42, tiers: 18, liability: 2.4, fraud: 32, roi: 3.1 },
  { month: "Feb", issued: 9.1, redeemed: 1.5, cashback: 0.28, redemptions: 51, tiers: 22, liability: 2.8, fraud: 38, roi: 3.4 },
  { month: "Mar", issued: 11.4, redeemed: 1.9, cashback: 0.34, redemptions: 63, tiers: 27, liability: 3.2, fraud: 44, roi: 3.8 },
  { month: "Apr", issued: 13.2, redeemed: 2.3, cashback: 0.38, redemptions: 78, tiers: 31, liability: 3.8, fraud: 51, roi: 4.1 },
  { month: "May", issued: 16.8, redeemed: 2.7, cashback: 0.44, redemptions: 91, tiers: 36, liability: 4.3, fraud: 62, roi: 4.5 },
  { month: "Jun", issued: 19.4, redeemed: 3.2, cashback: 0.52, redemptions: 108, tiers: 42, liability: 4.9, fraud: 71, roi: 4.9 },
];
