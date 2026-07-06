import { Banknote, CalendarClock, CreditCard, FileText, ReceiptText, TrendingUp, WalletCards } from "lucide-react";

export const financeKpis = [
  { id: "total-revenue", label: "Total Revenue", value: "₹42.8Cr", target: "Platform lifetime", progress: 84, icon: Banknote },
  { id: "monthly-revenue", label: "Monthly Revenue", value: "₹3.42Cr", target: "+18.4% MoM", progress: 72, icon: TrendingUp },
  { id: "annual-revenue", label: "Annual Revenue", value: "₹31.6Cr", target: "FY 2026", progress: 69, icon: TrendingUp },
  { id: "receivables", label: "Outstanding Receivables", value: "₹1.18Cr", target: "412 invoices", progress: 41, icon: FileText },
  { id: "payables", label: "Outstanding Payables", value: "₹62.4L", target: "Vendor queue", progress: 34, icon: ReceiptText },
  { id: "gst", label: "Total GST Collected", value: "₹5.84Cr", target: "This FY", progress: 77, icon: ReceiptText },
  { id: "pending-invoices", label: "Pending Invoices", value: 284, target: "Awaiting payment", progress: 48, icon: CalendarClock },
  { id: "paid-invoices", label: "Paid Invoices", value: "12.6K", target: "Closed invoices", progress: 86, icon: FileText },
  { id: "failed-payments", label: "Failed Payments", value: 37, target: "Needs action", progress: 16, icon: CreditCard },
  { id: "subscriptions", label: "Active Subscriptions", value: 428, target: "Tenant accounts", progress: 68, icon: WalletCards },
  { id: "mrr", label: "MRR", value: "₹2.18Cr", target: "Recurring", progress: 73, icon: TrendingUp },
  { id: "arr", label: "ARR", value: "₹26.1Cr", target: "Projected", progress: 71, icon: TrendingUp },
];

export const financeTrendData = [
  { month: "Jan", revenue: 2.1, subscriptions: 292, invoices: 72, upi: 34, cards: 24, bank: 18, mrr: 1.48, gst: 0.38 },
  { month: "Feb", revenue: 2.4, subscriptions: 318, invoices: 76, upi: 36, cards: 25, bank: 19, mrr: 1.56, gst: 0.42 },
  { month: "Mar", revenue: 2.7, subscriptions: 345, invoices: 81, upi: 39, cards: 24, bank: 21, mrr: 1.68, gst: 0.48 },
  { month: "Apr", revenue: 2.9, subscriptions: 371, invoices: 84, upi: 41, cards: 23, bank: 22, mrr: 1.82, gst: 0.52 },
  { month: "May", revenue: 3.1, subscriptions: 402, invoices: 88, upi: 44, cards: 22, bank: 23, mrr: 1.96, gst: 0.56 },
  { month: "Jun", revenue: 3.42, subscriptions: 428, invoices: 91, upi: 47, cards: 21, bank: 25, mrr: 2.18, gst: 0.64 },
];

export const revenueCards = [
  { id: "enterprise", title: "Enterprise Revenue", value: "₹1.86Cr", description: "Large manufacturer tenants and annual contracts." },
  { id: "subscriptions", title: "Subscription Revenue", value: "₹2.18Cr", description: "MRR across Starter, Growth, Professional, and Enterprise." },
  { id: "usage", title: "Usage Revenue", value: "₹38.4L", description: "QR, messaging, AI, and storage add-ons." },
];

export const financeInsights = [
  "Enterprise plan renewals account for 61% of projected ARR expansion this quarter.",
  "Receivables older than 30 days are concentrated in three distributor-led tenant accounts.",
  "UPI is the fastest growing payment method for dealer and retailer-facing invoices.",
  "GST collections are aligned with invoice growth; export-ready monthly summaries are staged.",
];
