import { BadgePercent, Bell, Gift, Mail, Megaphone, MessageCircle, QrCode, Send, TrendingUp, UsersRound } from "lucide-react";

export const marketingKpis = [
  { id: "total", label: "Total Campaigns", value: 248, target: "All channels", progress: 82, icon: Megaphone },
  { id: "active", label: "Active Campaigns", value: 42, target: "Live now", progress: 68, icon: BadgePercent },
  { id: "completed", label: "Completed Campaigns", value: 164, target: "This year", progress: 74, icon: Megaphone },
  { id: "revenue", label: "Campaign Revenue", value: "$4.2M", target: "+18% QoQ", progress: 76, icon: TrendingUp },
  { id: "roi", label: "ROI", value: "4.8x", target: "Blended ROI", progress: 84, icon: TrendingUp },
  { id: "qr", label: "QR Activations", value: "682K", target: "Campaign scans", progress: 71, icon: QrCode },
  { id: "rewards", label: "Reward Claims", value: "128K", target: "Verified claims", progress: 64, icon: Gift },
  { id: "referrals", label: "Referral Conversions", value: "18.4K", target: "Converted", progress: 58, icon: UsersRound },
  { id: "email", label: "Email Open Rate", value: "38.6%", target: "+4.2%", progress: 61, icon: Mail },
  { id: "sms", label: "SMS Delivery", value: "97.2%", target: "Delivered", progress: 97, icon: Send },
  { id: "whatsapp", label: "WhatsApp Delivery", value: "92.8%", target: "Delivered", progress: 92, icon: MessageCircle },
  { id: "push", label: "Push Delivery", value: "81.4%", target: "Delivered", progress: 81, icon: Bell },
];

export const marketingTrendData = [
  { month: "Jan", performance: 42, roi: 2.8, rewards: 18, referrals: 4, email: 32, sms: 88, whatsapp: 82, push: 64 },
  { month: "Feb", performance: 48, roi: 3.1, rewards: 24, referrals: 6, email: 34, sms: 91, whatsapp: 85, push: 68 },
  { month: "Mar", performance: 61, roi: 3.6, rewards: 31, referrals: 8, email: 36, sms: 94, whatsapp: 88, push: 72 },
  { month: "Apr", performance: 74, roi: 4.0, rewards: 39, referrals: 11, email: 37, sms: 95, whatsapp: 90, push: 76 },
  { month: "May", performance: 88, roi: 4.4, rewards: 47, referrals: 14, email: 38, sms: 96, whatsapp: 92, push: 79 },
  { month: "Jun", performance: 103, roi: 4.8, rewards: 61, referrals: 18, email: 39, sms: 97, whatsapp: 93, push: 81 },
];

export const marketingSuggestions = [
  "Move QR reward reminders to WhatsApp for high-value consumers; delivery is 11% higher than push.",
  "Warranty campaigns are generating the best post-scan conversion quality this month.",
  "Contractor referral rewards should be capped by region to protect ROI.",
  "Email engagement is strongest for dealer digest templates sent on Tuesday mornings.",
];
