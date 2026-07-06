import { Activity, Building2, Database, HardDrive, QrCode, Server, ShieldCheck, UsersRound, WalletCards, Wifi } from "lucide-react";

export const platformKpis = [
  { id: "companies", label: "Total Companies", value: 428, target: "Global tenants", progress: 82, icon: Building2 },
  { id: "trials", label: "Trial Companies", value: 46, target: "Evaluation", progress: 38, icon: Activity },
  { id: "enterprise", label: "Enterprise Customers", value: 86, target: "Strategic accounts", progress: 72, icon: ShieldCheck },
  { id: "monthly", label: "Monthly Revenue", value: "₹4.4Cr", target: "+18% MoM", progress: 76, icon: WalletCards },
  { id: "arr", label: "ARR", value: "₹52.8Cr", target: "Projected", progress: 81, icon: WalletCards },
  { id: "mrr", label: "MRR", value: "₹4.4Cr", target: "Recurring", progress: 78, icon: WalletCards },
  { id: "qr", label: "Total QR Generated", value: "1.8B", target: "Lifetime", progress: 88, icon: QrCode },
  { id: "consumers", label: "Total Consumers", value: "42.4M", target: "Profiles", progress: 84, icon: UsersRound },
  { id: "dealers", label: "Total Dealers", value: "184K", target: "Channel", progress: 74, icon: Building2 },
  { id: "distributors", label: "Total Distributors", value: "18.2K", target: "Network", progress: 68, icon: Building2 },
  { id: "wallet", label: "Total Wallet Balance", value: "₹8.6Cr", target: "Liability", progress: 64, icon: WalletCards },
  { id: "rewards", label: "Total Rewards", value: "12.8M", target: "Issued", progress: 79, icon: Activity },
  { id: "api", label: "Total API Calls", value: "184M", target: "This month", progress: 72, icon: Wifi },
  { id: "storage", label: "Storage Used", value: "182TB", target: "Regional", progress: 66, icon: HardDrive },
  { id: "sessions", label: "Active Sessions", value: "92.4K", target: "Now", progress: 58, icon: Server },
];

export const platformTrendData = [
  { month: "Jan", companies: 284, revenue: 3.1, api: 112, storage: 112, health: 99.91 },
  { month: "Feb", companies: 306, revenue: 3.4, api: 126, storage: 126, health: 99.94 },
  { month: "Mar", companies: 334, revenue: 3.7, api: 142, storage: 138, health: 99.95 },
  { month: "Apr", companies: 362, revenue: 3.9, api: 158, storage: 152, health: 99.96 },
  { month: "May", companies: 394, revenue: 4.1, api: 171, storage: 166, health: 99.98 },
  { month: "Jun", companies: 428, revenue: 4.4, api: 184, storage: 182, health: 99.99 },
];

export const healthWidgets = [
  { id: "cpu", title: "CPU Usage", value: "48%", status: "Operational", description: "Cluster average across production workloads." },
  { id: "memory", title: "Memory Usage", value: "62%", status: "Operational", description: "Application and worker nodes." },
  { id: "database", title: "Database", value: "99.99%", status: "Operational", description: "Primary and replica availability." },
  { id: "redis", title: "Redis", value: "7ms", status: "Operational", description: "Cache and rate-limit latency." },
  { id: "queue", title: "Queue", value: "1.8K", status: "Watch", description: "Pending jobs across queues." },
  { id: "workers", title: "Background Workers", value: "142", status: "Operational", description: "Active worker processes." },
];

export const platformAnalytics = [
  { id: "ANA-1", metric: "Revenue Analytics", value: "₹4.4Cr", change: "+18%", status: "Growing" },
  { id: "ANA-2", metric: "Usage Analytics", value: "184M API", change: "+12%", status: "Healthy" },
  { id: "ANA-3", metric: "Growth Analytics", value: "428 tenants", change: "+8.6%", status: "Growing" },
  { id: "ANA-4", metric: "Feature Usage", value: "72%", change: "+9%", status: "Healthy" },
  { id: "ANA-5", metric: "Tenant Analytics", value: "342 active", change: "+11%", status: "Healthy" },
];

export const systemSettings = [
  { id: "SET-1", setting: "SMTP", provider: "SES", environment: "Production", status: "Active" },
  { id: "SET-2", setting: "SMS", provider: "Twilio", environment: "Production", status: "Active" },
  { id: "SET-3", setting: "WhatsApp", provider: "Meta Cloud", environment: "Production", status: "Active" },
  { id: "SET-4", setting: "Firebase", provider: "Firebase", environment: "Staging", status: "Review" },
  { id: "SET-5", setting: "Storage", provider: "S3", environment: "Production", status: "Active" },
  { id: "SET-6", setting: "CDN", provider: "CloudFront", environment: "Production", status: "Active" },
  { id: "SET-7", setting: "Queue", provider: "BullMQ", environment: "Production", status: "Watch" },
];
