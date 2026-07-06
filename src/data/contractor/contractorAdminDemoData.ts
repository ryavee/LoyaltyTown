import { Award, BadgeCheck, Banknote, ClipboardList, GraduationCap, Hammer, ScanLine, ShieldCheck, Ticket, Users, WalletCards } from "lucide-react";

export const contractorDashboardData = {
  kpis: [
    { id: "total", label: "Total Contractors", value: "8,420", target: "All channels", progress: 86, icon: Users },
    { id: "active", label: "Active Contractors", value: "7,168", target: "85% active", progress: 85, icon: BadgeCheck },
    { id: "kyc", label: "Pending KYC", value: "284", target: "KYC queue", progress: 38, icon: ShieldCheck },
    { id: "scans", label: "Monthly Scans", value: "182K", target: "Scan-to-earn", progress: 76, icon: ScanLine },
    { id: "projects", label: "Projects Registered", value: "1,268", target: "This month", progress: 71, icon: ClipboardList },
    { id: "points", label: "Reward Points", value: "3.8M", target: "Earned points", progress: 74, icon: Award },
    { id: "wallet", label: "Wallet Balance", value: "$428K", target: "Liability", progress: 62, icon: WalletCards },
    { id: "cashback", label: "Cashback Earned", value: "$94K", target: "+14% MoM", progress: 68, icon: Banknote },
    { id: "training", label: "Training Completed", value: "4,820", target: "Certified skills", progress: 64, icon: GraduationCap },
    { id: "certificates", label: "Certificates Issued", value: "3,316", target: "Valid", progress: 58, icon: ShieldCheck },
    { id: "referrals", label: "Referral Count", value: "914", target: "Conversion funnel", progress: 52, icon: Users },
    { id: "support", label: "Support Tickets", value: "146", target: "Open tickets", progress: 31, icon: Ticket },
  ],
  topContractors: [
    { id: "TC-1", name: "Aman Verma", scans: "1,284 scans", rank: "#1", status: "Active" },
    { id: "TC-2", name: "Sonia Fernandes", scans: "946 scans", rank: "#2", status: "Active" },
    { id: "TC-3", name: "R. Kannan", scans: "612 scans", rank: "#3", status: "Pending Verification" },
  ],
  recentContractors: [
    { id: "RC-1", name: "Riya Patel", city: "Noida", status: "On Hold" },
    { id: "RC-2", name: "R. Kannan", city: "Chennai", status: "Pending Verification" },
    { id: "RC-3", name: "Aman Verma", city: "Mumbai", status: "Active" },
  ],
  aiInsights: [
    { id: "AI-1", title: "Scan-to-earn lift", detail: "Painter contractors with training completion scan 21% more products.", status: "Active" },
    { id: "AI-2", title: "KYC priority", detail: "Pending KYC contractors should be cleared before cashback payout cycle.", status: "Pending" },
    { id: "AI-3", title: "Referral quality", detail: "North zone installer referrals are converting fastest this month.", status: "Rewarded" },
  ],
};

export const contractorAnalyticsData = [
  { month: "Jan", growth: 1.2, scans: 18, rewards: 0.7, projects: 0.5, training: 0.4, referrals: 0.2, products: 7, wallet: 0.8 },
  { month: "Feb", growth: 1.5, scans: 24, rewards: 0.9, projects: 0.7, training: 0.6, referrals: 0.3, products: 9, wallet: 1.1 },
  { month: "Mar", growth: 1.9, scans: 31, rewards: 1.3, projects: 1.0, training: 0.8, referrals: 0.5, products: 11, wallet: 1.4 },
  { month: "Apr", growth: 2.4, scans: 39, rewards: 1.7, projects: 1.4, training: 1.1, referrals: 0.7, products: 13, wallet: 1.8 },
  { month: "May", growth: 2.9, scans: 48, rewards: 2.2, projects: 1.8, training: 1.5, referrals: 0.9, products: 16, wallet: 2.2 },
  { month: "Jun", growth: 3.4, scans: 58, rewards: 2.8, projects: 2.3, training: 1.9, referrals: 1.2, products: 19, wallet: 2.7 },
];

export const contractorWalletTransactions = [
  { id: "CWT-1", reference: "CTR-WAL-001", type: "Credit", source: "Scan-to-earn", points: "18,200", cashback: "$420", payout: "Pending", date: "2026-07-02" },
  { id: "CWT-2", reference: "CTR-WAL-002", type: "Debit", source: "Reward Redemption", points: "8,000", cashback: "$0", payout: "Completed", date: "2026-07-03" },
  { id: "CWT-3", reference: "CTR-WAL-003", type: "Credit", source: "Referral Bonus", points: "4,800", cashback: "$180", payout: "Approved", date: "2026-07-04" },
];

export const contractorDocumentsData = [
  { id: "DOC-1", document: "KYC", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-2", document: "ID Proof", status: "Verified", updated: "2026-06-20" },
  { id: "DOC-3", document: "Certificates", status: "Valid", updated: "2026-07-01" },
  { id: "DOC-4", document: "License", status: "Expiring Soon", updated: "2026-07-02" },
  { id: "DOC-5", document: "Bank documents", status: "Verified", updated: "2026-06-24" },
  { id: "DOC-6", document: "Project photos", status: "Review", updated: "2026-07-04" },
];

export const contractorAuditTimelineData = [
  { id: "CA-1", title: "Profile updates", description: "Dealer mapping and specialization updated.", timestamp: "Today 10:20", tone: "info" },
  { id: "CA-2", title: "KYC changes", description: "ID proof verified and KYC status updated.", timestamp: "Today 09:40", tone: "success" },
  { id: "CA-3", title: "Projects", description: "Site photos uploaded for Skyline Tower Exterior.", timestamp: "Yesterday", tone: "info" },
  { id: "CA-4", title: "Scans", description: "Scan-to-earn event credited for WeatherShield Pro.", timestamp: "Jul 04, 2026", tone: "success" },
  { id: "CA-5", title: "Wallet", description: "Cashback payout moved to pending settlement.", timestamp: "Jul 03, 2026", tone: "warning" },
  { id: "CA-6", title: "Rewards", description: "Premium Tool Kit redemption approved.", timestamp: "Jul 03, 2026", tone: "success" },
  { id: "CA-7", title: "Training", description: "Premium Paint Application certificate issued.", timestamp: "Jul 02, 2026", tone: "info" },
  { id: "CA-8", title: "Support", description: "Payout ticket opened by contractor.", timestamp: "Jul 01, 2026", tone: "warning" },
];
