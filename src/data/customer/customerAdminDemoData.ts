import { Award, BadgeCheck, Gift, MapPin, QrCode, ShieldCheck, Ticket, TrendingUp, UserCheck, Users, WalletCards } from "lucide-react";

export const customerDashboardData = {
  kpis: [
    { id: "total", label: "Total Customers", value: "3.4M", target: "Global base", progress: 86, icon: Users },
    { id: "today", label: "New Customers Today", value: "18,420", target: "+12% vs avg", progress: 74, icon: UserCheck },
    { id: "qr-registered", label: "QR Registered Customers", value: "2.18M", target: "Post scan", progress: 78, icon: QrCode },
    { id: "repeat", label: "Repeat Customers", value: "1.1M", target: "+9% QoQ", progress: 64, icon: BadgeCheck },
    { id: "wallet", label: "Wallet Balance", value: "82.4M pts", target: "Liability", progress: 67, icon: WalletCards },
    { id: "rewards", label: "Rewards Earned", value: "12.8M", target: "Points issued", progress: 74, icon: Award },
    { id: "warranty", label: "Warranty Activations", value: "184K", target: "QR assisted", progress: 61, icon: ShieldCheck },
    { id: "support", label: "Support Tickets", value: "42.8K", target: "Open + closed", progress: 44, icon: Ticket },
    { id: "referrals", label: "Referrals", value: "92K", target: "Referral funnel", progress: 54, icon: Gift },
    { id: "cities", label: "Top Cities", value: "186", target: "Active markets", progress: 82, icon: MapPin },
    { id: "growth", label: "Customer Growth", value: "24.6%", target: "Monthly", progress: 79, icon: TrendingUp },
    { id: "conversion", label: "Scan Conversion Rate", value: "68.4%", target: "+4.2 pts", progress: 68, icon: QrCode },
  ],
  recentCustomers: [
    { id: "RC-1", name: "Aarav Sharma", city: "Pune", source: "QR Scan", status: "Active" },
    { id: "RC-2", name: "Nisha Kapoor", city: "Mumbai", source: "Consumer App", status: "Active" },
    { id: "RC-3", name: "Urban Build Co.", city: "Chennai", source: "Dealer Upload", status: "At Risk" },
  ],
  recentRewardCredits: [
    { id: "RW-1", customer: "Aarav Sharma", reward: "2,400 pts", source: "QR Scan", status: "Completed" },
    { id: "RW-2", customer: "Nisha Kapoor", reward: "$18 cashback", source: "Campaign", status: "Pending" },
    { id: "RW-3", customer: "Urban Build Co.", reward: "8,000 pts", source: "Referral", status: "Completed" },
  ],
  aiInsights: [
    { id: "AI-1", title: "Scan Conversion Lift", severity: "Opportunity", detail: "Customers who see reward value before OTP complete registration 13% more often." },
    { id: "AI-2", title: "Warranty Activation Gap", severity: "Action", detail: "Mumbai customers scan genuine products but skip warranty activation on premium paint SKUs." },
    { id: "AI-3", title: "At-risk Customer Cluster", severity: "Risk", detail: "High-LTV contractors with duplicate scans should receive support outreach and QR education." },
  ],
};

export const customerAnalyticsData = [
  { month: "Jan", acquisition: 24, repeatScan: 12, rewards: 8, warranty: 7, city: 11, product: 18, campaign: 6 },
  { month: "Feb", acquisition: 30, repeatScan: 16, rewards: 11, warranty: 9, city: 14, product: 21, campaign: 8 },
  { month: "Mar", acquisition: 38, repeatScan: 21, rewards: 14, warranty: 12, city: 17, product: 26, campaign: 11 },
  { month: "Apr", acquisition: 46, repeatScan: 27, rewards: 19, warranty: 15, city: 20, product: 31, campaign: 14 },
  { month: "May", acquisition: 55, repeatScan: 34, rewards: 25, warranty: 19, city: 24, product: 38, campaign: 18 },
  { month: "Jun", acquisition: 64, repeatScan: 42, rewards: 31, warranty: 23, city: 29, product: 45, campaign: 22 },
];

export const scanToRegistrationFunnel = [
  { stage: "QR Scanned", value: 100 },
  { stage: "Product Verified", value: 92 },
  { stage: "OTP Completed", value: 78 },
  { stage: "Registered", value: 68 },
  { stage: "Warranty", value: 42 },
  { stage: "Reward", value: 36 },
];

export const customerScanJourneyData = [
  { id: "journey-1", label: "Product scanned", value: "WeatherShield Pro" },
  { id: "journey-2", label: "QR code", value: "LT-WS-908771" },
  { id: "journey-3", label: "Batch", value: "QRB-2026-001 / BCH-2026-001" },
  { id: "journey-4", label: "Location", value: "Pune, Maharashtra" },
  { id: "journey-5", label: "Device", value: "Android / Chrome WebView" },
  { id: "journey-6", label: "IP", value: "103.24.18.42" },
  { id: "journey-7", label: "Scan result", value: "Genuine" },
  { id: "journey-8", label: "Risk score", value: "18 / Low" },
  { id: "journey-9", label: "Reward status", value: "Credited" },
  { id: "journey-10", label: "Warranty status", value: "Activated" },
];

export const customerScanTimelineData = [
  { id: "st-1", title: "QR Scanned", description: "Customer scanned product QR from mobile device.", timestamp: "10:22 AM", tone: "info" },
  { id: "st-2", title: "Product Verified", description: "Product, serial and batch resolved as genuine.", timestamp: "10:22 AM", tone: "success" },
  { id: "st-3", title: "OTP Completed", description: "Mobile number verified with OTP placeholder.", timestamp: "10:23 AM", tone: "success" },
  { id: "st-4", title: "Customer Registered", description: "Customer profile linked to QR scan journey.", timestamp: "10:24 AM", tone: "success" },
  { id: "st-5", title: "Warranty Activated", description: "Warranty certificate generated for scanned product.", timestamp: "10:25 AM", tone: "info" },
  { id: "st-6", title: "Reward Credited", description: "Scan reward credited to wallet ledger.", timestamp: "10:26 AM", tone: "success" },
  { id: "st-7", title: "Wallet Updated", description: "Wallet balance and expiry schedule recalculated.", timestamp: "10:26 AM", tone: "info" },
];

export const customerAuditLogData = [
  { id: "AUD-1", action: "Created", actor: "QR Registration", source: "Public Scan", timestamp: "2026-07-05 10:24" },
  { id: "AUD-2", action: "Warranty Activated", actor: "Warranty Engine", source: "QR Journey", timestamp: "2026-07-05 10:25" },
  { id: "AUD-3", action: "Reward Credited", actor: "Loyalty Engine", source: "Campaign Rule", timestamp: "2026-07-05 10:26" },
];
