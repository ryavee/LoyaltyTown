import { BadgeIndianRupee, CircleGauge, PackageCheck, QrCode, ShieldAlert, TrendingUp, UsersRound, WalletCards } from "lucide-react";

export const biKpis = [
  { id: "revenue", label: "Revenue", value: "₹42.8Cr", target: "+18.4% YoY", progress: 82, icon: BadgeIndianRupee },
  { id: "sell-in", label: "Sell-in", value: "₹18.7Cr", target: "Distributor billing", progress: 74, icon: TrendingUp },
  { id: "sell-out", label: "Sell-out", value: "₹15.2Cr", target: "Retail movement", progress: 69, icon: TrendingUp },
  { id: "qr", label: "QR Scans", value: "8.4M", target: "Consumer scans", progress: 86, icon: QrCode },
  { id: "customers", label: "Customer Growth", value: "+24.6%", target: "Monthly growth", progress: 78, icon: UsersRound },
  { id: "dealers", label: "Dealer Performance", value: "91.2%", target: "Active network", progress: 91, icon: CircleGauge },
  { id: "inventory", label: "Inventory Health", value: "87%", target: "Healthy stock", progress: 87, icon: PackageCheck },
  { id: "roi", label: "Campaign ROI", value: "4.8x", target: "Blended ROI", progress: 80, icon: TrendingUp },
  { id: "warranty", label: "Warranty Cost", value: "₹72L", target: "Monthly liability", progress: 42, icon: ShieldAlert },
  { id: "wallet", label: "Wallet Liability", value: "₹1.8Cr", target: "Reward accrual", progress: 64, icon: WalletCards },
  { id: "fraud", label: "Fraud Risk", value: "Low", target: "0.8% flagged", progress: 22, icon: ShieldAlert },
];

export const biTrendData = [
  { month: "Jan", revenue: 2.1, sellIn: 1.4, sellOut: 1.1, scans: 5.2, customers: 18, risk: 1.4 },
  { month: "Feb", revenue: 2.4, sellIn: 1.6, sellOut: 1.3, scans: 5.8, customers: 20, risk: 1.2 },
  { month: "Mar", revenue: 2.7, sellIn: 1.8, sellOut: 1.5, scans: 6.4, customers: 21, risk: 1.0 },
  { month: "Apr", revenue: 2.9, sellIn: 2.0, sellOut: 1.7, scans: 7.1, customers: 22, risk: 0.9 },
  { month: "May", revenue: 3.1, sellIn: 2.2, sellOut: 1.8, scans: 7.8, customers: 23, risk: 0.8 },
  { month: "Jun", revenue: 3.42, sellIn: 2.4, sellOut: 2.0, scans: 8.4, customers: 24.6, risk: 0.8 },
];

export const executiveInsights = [
  { id: "BI-1", title: "Sales BI", insight: "Sell-out growth is strongest in West and South regions.", impact: "High" },
  { id: "BI-2", title: "Channel BI", insight: "Top 12% dealers drive 48% of warranty registrations.", impact: "Medium" },
  { id: "BI-3", title: "Product BI", insight: "Premium products show better scan-to-registration conversion.", impact: "High" },
  { id: "BI-4", title: "AI Insights BI", insight: "Fraud risk remains low but duplicate scans rose in two cities.", impact: "Watch" },
];
