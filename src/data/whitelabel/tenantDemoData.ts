import { Activity, Building2, Database, QrCode, Server, ShieldAlert, Sparkles, UsersRound, WalletCards } from "lucide-react";

export type TenantRecord = {
  id: string;
  companyName: string;
  companyCode: string;
  industry: string;
  website: string;
  gst: string;
  country: string;
  timezone: string;
  currency: string;
  language: string;
  dataRegion: string;
  companyLogo: string;
  companyBanner: string;
  plan: string;
  revenue: string;
  storageUsed: string;
  apiUsage: string;
  qrGenerated: string;
  customerCount: string;
  status: string;
};

export const tenantKpis = [
  { id: "total", label: "Total Companies", value: 428, target: "Global tenants", progress: 82, icon: Building2 },
  { id: "trial", label: "Trial Companies", value: 46, target: "Evaluation", progress: 38, icon: Sparkles },
  { id: "active", label: "Active Companies", value: 342, target: "Paying tenants", progress: 78, icon: Activity },
  { id: "suspended", label: "Suspended Companies", value: 12, target: "Policy or billing", progress: 12, icon: ShieldAlert },
  { id: "expired", label: "Expired Companies", value: 28, target: "Renewal pool", progress: 24, icon: ShieldAlert },
  { id: "revenue", label: "Revenue", value: "₹42.8Cr", target: "FY 2026", progress: 74, icon: WalletCards },
  { id: "storage", label: "Storage Used", value: "182TB", target: "Across regions", progress: 66, icon: Database },
  { id: "api", label: "API Usage", value: "184M", target: "Monthly calls", progress: 72, icon: Server },
  { id: "qr", label: "QR Generated", value: "1.8B", target: "Lifetime", progress: 88, icon: QrCode },
  { id: "customers", label: "Customer Count", value: "42.4M", target: "Consumer profiles", progress: 81, icon: UsersRound },
];

export const tenants: TenantRecord[] = [
  { id: "TEN-1001", companyName: "Apex Industrial Coatings", companyCode: "APX", industry: "Paints & Coatings", website: "apex.example", gst: "27AABCA1234F1Z5", country: "India", timezone: "Asia/Kolkata", currency: "INR", language: "English", dataRegion: "India West", companyLogo: "apex-logo.svg", companyBanner: "apex-banner.jpg", plan: "Enterprise", revenue: "₹8.2Cr", storageUsed: "42TB", apiUsage: "48M", qrGenerated: "420M", customerCount: "8.4M", status: "Active" },
  { id: "TEN-1002", companyName: "ColorMax Coatings", companyCode: "CMX", industry: "Decorative Paints", website: "colormax.example", gst: "27AACCU8841P1Z2", country: "India", timezone: "Asia/Kolkata", currency: "INR", language: "English", dataRegion: "India West", companyLogo: "colormax-logo.svg", companyBanner: "colormax-banner.jpg", plan: "Growth", revenue: "₹2.1Cr", storageUsed: "18TB", apiUsage: "22M", qrGenerated: "180M", customerCount: "3.2M", status: "Trial" },
  { id: "TEN-1003", companyName: "TileBond Systems", companyCode: "TBS", industry: "Construction Chemicals", website: "tilebond.example", gst: "33AADCT5590K1Z8", country: "India", timezone: "Asia/Kolkata", currency: "INR", language: "English", dataRegion: "India South", companyLogo: "tilebond-logo.svg", companyBanner: "tilebond-banner.jpg", plan: "Professional", revenue: "₹4.8Cr", storageUsed: "31TB", apiUsage: "36M", qrGenerated: "310M", customerCount: "5.1M", status: "Active" },
  { id: "TEN-1004", companyName: "FixMate Industries", companyCode: "FIX", industry: "Adhesives", website: "fixmate.example", gst: "07AAECP4418R1Z9", country: "India", timezone: "Asia/Kolkata", currency: "INR", language: "Hindi", dataRegion: "India North", companyLogo: "fixmate-logo.svg", companyBanner: "fixmate-banner.jpg", plan: "Starter", revenue: "₹72L", storageUsed: "8TB", apiUsage: "9M", qrGenerated: "76M", customerCount: "1.1M", status: "Suspended" },
];

export const tenantTrendData = [
  { month: "Jan", companies: 284, revenue: 3.1, subscriptions: 238, storage: 112 },
  { month: "Feb", companies: 306, revenue: 3.4, subscriptions: 254, storage: 126 },
  { month: "Mar", companies: 334, revenue: 3.7, subscriptions: 278, storage: 138 },
  { month: "Apr", companies: 362, revenue: 3.9, subscriptions: 302, storage: 152 },
  { month: "May", companies: 394, revenue: 4.1, subscriptions: 324, storage: 166 },
  { month: "Jun", companies: 428, revenue: 4.4, subscriptions: 342, storage: 182 },
];

export const tenantUsers = [
  { id: "USR-1", name: "Nisha Kapoor", role: "Tenant Admin", department: "IT", company: "Apex Industrial Coatings", invitation: "Accepted", status: "Active" },
  { id: "USR-2", name: "Rahul Mehta", role: "Billing Admin", department: "Finance", company: "ColorMax Coatings", invitation: "Pending", status: "Invited" },
  { id: "USR-3", name: "Pooja Sen", role: "Security Admin", department: "Compliance", company: "TileBond Systems", invitation: "Accepted", status: "Active" },
];
