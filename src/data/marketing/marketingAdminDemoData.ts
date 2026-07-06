import {
  BadgePercent,
  Gift,
  Mail,
  Megaphone,
  MessageCircle,
  QrCode,
  Send,
  Target,
  TrendingUp,
  Trophy,
  UsersRound,
  Wallet,
} from "lucide-react";

export type CampaignStatus = "Active" | "Draft" | "Scheduled" | "Completed" | "Paused" | "Archived";

export type CampaignRow = {
  id: string;
  campaignName: string;
  campaignType: string;
  products: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  rewardType: string;
  participants: string;
  conversions: string;
  roi: string;
  status: CampaignStatus;
};

export const marketingDashboardData = {
  kpis: [
    { id: "total", label: "Total Campaigns", value: "248", target: "All programs", progress: 82, icon: Megaphone },
    { id: "active", label: "Active Campaigns", value: "42", target: "Live now", progress: 68, icon: Target },
    { id: "draft", label: "Draft Campaigns", value: "31", target: "Awaiting review", progress: 44, icon: BadgePercent },
    { id: "completed", label: "Completed Campaigns", value: "164", target: "This year", progress: 74, icon: Trophy },
    { id: "qr", label: "QR Activations", value: "682K", target: "+22% MoM", progress: 71, icon: QrCode },
    { id: "registrations", label: "Customer Registrations", value: "128K", target: "Scan driven", progress: 64, icon: UsersRound },
    { id: "claims", label: "Reward Claims", value: "94K", target: "Verified", progress: 61, icon: Gift },
    { id: "referrals", label: "Referral Conversions", value: "18.4K", target: "Converted", progress: 58, icon: UsersRound },
    { id: "revenue", label: "Revenue Influenced", value: "$4.2M", target: "+18% QoQ", progress: 76, icon: TrendingUp },
    { id: "roi", label: "Campaign ROI", value: "4.8x", target: "Blended", progress: 84, icon: TrendingUp },
    { id: "email", label: "Email Open Rate", value: "38.6%", target: "+4.2%", progress: 61, icon: Mail },
    { id: "whatsapp", label: "WhatsApp Delivery", value: "92.8%", target: "Delivered", progress: 92, icon: MessageCircle },
  ],
  insights: [
    "Dealer QR activation is outperforming target by 18% in North region.",
    "Move warranty reminders to WhatsApp for premium appliance buyers.",
    "Contractor referral CPA is rising in West region; cap milestone rewards before month-end.",
    "Festival launch audiences should exclude inactive wallets to protect reward liability.",
  ],
  recommendedCampaigns: [
    { id: "REC-1", title: "Dormant Dealer Reactivation", detail: "Target 420 inactive dealers with wallet booster and QR training.", lift: "+12% order lift" },
    { id: "REC-2", title: "Warranty Registration Nudge", detail: "Send scan-triggered WhatsApp to customers with unregistered products.", lift: "+18K activations" },
    { id: "REC-3", title: "Contractor Milestone Push", detail: "Tiered points for verified project uploads in high-growth cities.", lift: "3.6x ROI" },
  ],
};

export const campaignDemoData: CampaignRow[] = [
  { id: "CMP-9001", campaignName: "Dealer QR Activation Drive", campaignType: "Dealer", products: "Smart Pumps, Valves", startDate: "2026-07-08", endDate: "2026-08-08", targetAudience: "Dealers / North", rewardType: "Points + Cashback", participants: "18,420", conversions: "6,842", roi: "4.8x", status: "Active" },
  { id: "CMP-9002", campaignName: "Warranty Registration Festival", campaignType: "Warranty", products: "All Appliances", startDate: "2026-07-15", endDate: "2026-09-02", targetAudience: "Consumers / Tier 1", rewardType: "Scratch Card", participants: "42,120", conversions: "16,310", roi: "5.4x", status: "Scheduled" },
  { id: "CMP-9003", campaignName: "Contractor Monsoon Rewards", campaignType: "Contractor", products: "Cement Boards", startDate: "2026-06-20", endDate: "2026-07-31", targetAudience: "Contractors / West", rewardType: "Milestone Rewards", participants: "8,912", conversions: "3,126", roi: "3.2x", status: "Active" },
  { id: "CMP-9004", campaignName: "Product Launch QR Journey", campaignType: "Product Launch", products: "Eco Motor X2", startDate: "2026-08-01", endDate: "2026-09-15", targetAudience: "Dealers + Consumers", rewardType: "Coupon", participants: "2,480", conversions: "Draft", roi: "Pending", status: "Draft" },
  { id: "CMP-9005", campaignName: "Retailer Sell-out Booster", campaignType: "Retailer", products: "Premium Fittings", startDate: "2026-05-02", endDate: "2026-06-30", targetAudience: "Retailers / East", rewardType: "Gift Voucher", participants: "11,804", conversions: "4,298", roi: "3.9x", status: "Completed" },
];

export const campaignChartData = [
  { month: "Jan", performance: 42, roi: 2.8, registrations: 18, rewards: 12, activations: 26, email: 32, sms: 88, whatsapp: 82, push: 64 },
  { month: "Feb", performance: 51, roi: 3.1, registrations: 24, rewards: 18, activations: 33, email: 34, sms: 91, whatsapp: 85, push: 68 },
  { month: "Mar", performance: 63, roi: 3.6, registrations: 31, rewards: 26, activations: 45, email: 36, sms: 94, whatsapp: 88, push: 72 },
  { month: "Apr", performance: 78, roi: 4.0, registrations: 39, rewards: 32, activations: 59, email: 37, sms: 95, whatsapp: 90, push: 76 },
  { month: "May", performance: 91, roi: 4.4, registrations: 47, rewards: 41, activations: 72, email: 38, sms: 96, whatsapp: 92, push: 79 },
  { month: "Jun", performance: 108, roi: 4.8, registrations: 61, rewards: 54, activations: 86, email: 39, sms: 97, whatsapp: 93, push: 81 },
];

export const landingPageDemoData = {
  blocks: ["Hero Banner", "Product Images", "Registration Form", "OTP Toggle", "Terms", "Privacy", "Video Placeholder", "FAQ", "Success Screen"],
  themes: ["Industrial Premium", "Festival Rewards", "Warranty Trust", "Dealer Launch"],
};

export const couponDemoData = [
  { id: "CPN-1", name: "WELCOME500", type: "Cash Discount", issued: "24,000", redeemed: "8,420", expiry: "2026-08-31", status: "Active" },
  { id: "CPN-2", name: "QRPLUS10", type: "Percentage", issued: "18,500", redeemed: "6,210", expiry: "2026-09-15", status: "Scheduled" },
  { id: "CPN-3", name: "DEALERBOOST", type: "Channel Coupon", issued: "4,800", redeemed: "2,112", expiry: "2026-07-31", status: "Active" },
];

export const scratchCardDemoData = [
  { id: "SCR-1", name: "Festival Scratch Pool", rewards: "Points, Cashback, Coupon", winners: "12,820", budget: "$82K", status: "Active" },
  { id: "SCR-2", name: "Warranty Scratch", rewards: "Voucher, Points", winners: "6,104", budget: "$38K", status: "Scheduled" },
];

export const spinWheelDemoData = [
  { id: "SPN-1", name: "Retail Spin Wheel", rewards: "Cashback, Gift, Coupon", probability: "12 bands", spins: "18,920", status: "Active" },
  { id: "SPN-2", name: "Contractor Bonus Wheel", rewards: "Points, Training, Voucher", probability: "8 bands", spins: "7,440", status: "Draft" },
];

export const segmentDemoData = [
  { id: "SEG-1", name: "High Value QR Activators", audience: "Consumers", size: "48,200", rule: "3+ scans and wallet balance > 500", status: "Dynamic" },
  { id: "SEG-2", name: "Inactive Dealers", audience: "Dealers", size: "420", rule: "No activity for 45 days", status: "Dynamic" },
  { id: "SEG-3", name: "Warranty Pending", audience: "Consumers", size: "31,860", rule: "Verified product but no warranty", status: "Saved" },
];

export const channelDemoData = {
  email: [
    { id: "EM-1", template: "Warranty Registration Nudge", campaigns: "12", delivery: "98.1%", open: "38.6%", click: "8.4%", status: "Active" },
    { id: "EM-2", template: "Dealer Digest", campaigns: "8", delivery: "97.4%", open: "42.3%", click: "11.2%", status: "Active" },
  ],
  sms: [
    { id: "SM-1", template: "OTP Registration", campaigns: "18", delivery: "97.2%", open: "N/A", click: "4.1%", status: "Active" },
    { id: "SM-2", template: "Reward Expiry", campaigns: "7", delivery: "95.9%", open: "N/A", click: "6.7%", status: "Scheduled" },
  ],
  whatsapp: [
    { id: "WA-1", template: "Reward Claimed", campaigns: "14", delivery: "92.8%", open: "71.4%", click: "18.2%", status: "Active" },
    { id: "WA-2", template: "Campaign Reminder", campaigns: "10", delivery: "91.6%", open: "68.1%", click: "15.7%", status: "Active" },
  ],
  push: [
    { id: "PS-1", template: "Wallet Credited", campaigns: "9", delivery: "81.4%", open: "29.8%", click: "9.6%", status: "Active" },
    { id: "PS-2", template: "Offer Ending", campaigns: "6", delivery: "78.2%", open: "24.4%", click: "7.9%", status: "Draft" },
  ],
};

export const surveyDemoData = [
  { id: "SRV-1", name: "Warranty CSAT", responses: "12,400", nps: "62", csat: "84%", status: "Active" },
  { id: "SRV-2", name: "Dealer Experience NPS", responses: "1,920", nps: "48", csat: "78%", status: "Active" },
  { id: "SRV-3", name: "Product Launch Feedback", responses: "Draft", nps: "Pending", csat: "Pending", status: "Draft" },
];

export const analyticsDemoData = [
  { id: "AN-1", label: "Campaign ROI", value: "4.8x", detail: "+0.6x vs last quarter", icon: TrendingUp },
  { id: "AN-2", label: "Registrations", value: "128K", detail: "QR and landing page sourced", icon: UsersRound },
  { id: "AN-3", label: "Reward Distribution", value: "$482K", detail: "Across wallet, voucher, coupon", icon: Wallet },
  { id: "AN-4", label: "Referral Performance", value: "18.4K", detail: "Converted referral chains", icon: Send },
];
