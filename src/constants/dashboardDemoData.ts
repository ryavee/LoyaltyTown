export const executiveKpis = [
  { id: "products", label: "Total Products", value: "8,420", target: "+6.8% vs last month", progress: 72, icon: "PackageCheck" },
  { id: "qr-generated", label: "Total QR Generated", value: "12.8M", target: "+18.4% generation velocity", progress: 86, icon: "QrCode" },
  { id: "scans", label: "Total Scans", value: "9.8M", target: "98.7% scan success", progress: 91, icon: "ScanLine" },
  { id: "customers", label: "Active Customers", value: "3.4M", target: "+19.1% active wallets", progress: 79, icon: "Users" },
  { id: "dealers", label: "Dealers", value: "42.7K", target: "96.2% active network", progress: 88, icon: "Store" },
  { id: "distributors", label: "Distributors", value: "2,184", target: "94% fulfillment SLA", progress: 82, icon: "Truck" },
  { id: "retailers", label: "Retailers", value: "128K", target: "+7.4% channel growth", progress: 75, icon: "ShoppingBag" },
  { id: "contractors", label: "Contractors", value: "64K", target: "41% repeat engagement", progress: 68, icon: "Wrench" },
  { id: "wallet-liability", label: "Wallet Liability", value: "$3.82M", target: "Projected rewards reserve", progress: 61, icon: "WalletCards" },
  { id: "rewards-redeemed", label: "Rewards Redeemed", value: "1.28M", target: "+24.5% redemption lift", progress: 84, icon: "Gift" },
  { id: "warranty-claims", label: "Warranty Claims", value: "8,931", target: "96.2% SLA health", progress: 77, icon: "ShieldCheck" },
  { id: "counterfeit-alerts", label: "Counterfeit Alerts", value: "1,284", target: "4 high-risk clusters", progress: 34, icon: "AlertTriangle" },
  { id: "campaigns", label: "Active Campaigns", value: "36", target: "18% conversion uplift", progress: 69, icon: "Megaphone" },
  { id: "revenue", label: "Monthly Revenue", value: "$18.42M", target: "+14.8% period growth", progress: 87, icon: "LineChart" },
];

export const trendData = [
  { month: "Jan", qrScans: 5.2, sales: 8.1, customers: 2.2, dealers: 74, campaigns: 2.4, wallet: 1.8, warranty: 420, regions: 61 },
  { month: "Feb", qrScans: 5.8, sales: 8.8, customers: 2.4, dealers: 78, campaigns: 2.9, wallet: 2.2, warranty: 390, regions: 64 },
  { month: "Mar", qrScans: 6.4, sales: 9.7, customers: 2.7, dealers: 82, campaigns: 3.2, wallet: 2.7, warranty: 440, regions: 69 },
  { month: "Apr", qrScans: 7.1, sales: 10.4, customers: 2.9, dealers: 88, campaigns: 3.8, wallet: 3.1, warranty: 470, regions: 74 },
  { month: "May", qrScans: 8.4, sales: 11.2, customers: 3.1, dealers: 91, campaigns: 4.3, wallet: 3.6, warranty: 410, regions: 81 },
  { month: "Jun", qrScans: 9.8, sales: 12.8, customers: 3.4, dealers: 96, campaigns: 5.1, wallet: 4.2, warranty: 360, regions: 87 },
];

export const regionScanData = [
  { region: "North", scans: 2.84, alerts: 218 },
  { region: "West", scans: 2.46, alerts: 146 },
  { region: "South", scans: 2.12, alerts: 184 },
  { region: "East", scans: 1.58, alerts: 96 },
  { region: "Central", scans: 0.82, alerts: 42 },
];

export const aiInsights = [
  { id: "demand", title: "Demand Forecast", detail: "Industrial adhesives are projected to rise 12% in West zone over the next 30 days.", severity: "Opportunity" },
  { id: "inventory", title: "Low Inventory Alert", detail: "317 SKUs are below reorder threshold across North and Central warehouses.", severity: "Action" },
  { id: "counterfeit", title: "Counterfeit Risk", detail: "Replay scan patterns are concentrated around 4 dealer clusters.", severity: "Risk" },
  { id: "inactive-dealers", title: "Inactive Dealers", detail: "1,642 dealers have not placed secondary orders in 45 days.", severity: "Attention" },
  { id: "top-product", title: "High Performing Product", detail: "LT Shield Pro contributed 18.6% of verified scan-driven revenue.", severity: "Win" },
  { id: "campaign", title: "Campaign Recommendation", detail: "Referral mechanics outperform coupon offers by 2.3x for contractors.", severity: "Recommendation" },
  { id: "warranty", title: "Warranty Claim Spike", detail: "Pump motor claims increased 9.4% after a batch-level dispatch window.", severity: "Investigate" },
];

export const quickActions = [
  { id: "product", label: "Create Product", route: "/products/create", icon: "PackageCheck" },
  { id: "qr", label: "Generate QR Batch", route: "/qr-generation/create", icon: "QrCode" },
  { id: "dealer", label: "Add Dealer", route: "/dealers/create", icon: "Store" },
  { id: "distributor", label: "Add Distributor", route: "/distributors/create", icon: "Truck" },
  { id: "campaign", label: "Create Campaign", route: "/campaign-builder", icon: "Megaphone" },
  { id: "reports", label: "View Reports", route: "/reports", icon: "FileBarChart" },
  { id: "ai", label: "Open AI Assistant", route: "/ai-assistant", icon: "Bot" },
];

export const recentActivities = [
  { id: "activity-1", title: "QR batch generated", description: "Batch QRB-90842 created for LT Shield Pro.", timestamp: "8 min ago", icon: "QrCode", tone: "info" },
  { id: "activity-2", title: "New customer registered", description: "Consumer profile created from mobile scan journey.", timestamp: "14 min ago", icon: "Users", tone: "success" },
  { id: "activity-3", title: "Dealer added", description: "Prime Build Mart approved in West channel.", timestamp: "28 min ago", icon: "Store", tone: "info" },
  { id: "activity-4", title: "Reward redeemed", description: "Contractor redeemed 4,500 points for gift card.", timestamp: "43 min ago", icon: "Gift", tone: "success" },
  { id: "activity-5", title: "Warranty claim submitted", description: "Claim WR-31842 opened for motor assembly.", timestamp: "1 hr ago", icon: "ShieldCheck", tone: "warning" },
  { id: "activity-6", title: "Campaign launched", description: "Monsoon contractor referral journey went live.", timestamp: "2 hr ago", icon: "Megaphone", tone: "info" },
  { id: "activity-7", title: "Counterfeit scan flagged", description: "Repeated QR scan detected outside expected region.", timestamp: "3 hr ago", icon: "AlertTriangle", tone: "danger" },
];

export const topProducts = [
  { id: "P-001", product: "LT Shield Pro", category: "Industrial Adhesive", scans: "1.42M", revenue: "$2.84M", status: "Leading" },
  { id: "P-002", product: "LT Bond Max", category: "Construction Chemical", scans: "1.08M", revenue: "$2.16M", status: "Growth" },
  { id: "P-003", product: "LT Seal Guard", category: "Waterproofing", scans: "842K", revenue: "$1.74M", status: "Stable" },
];

export const topDealers = [
  { id: "D-102", dealer: "Prime Build Mart", region: "West", orders: "842", revenue: "$684K", status: "Elite" },
  { id: "D-118", dealer: "Metro Industrial Supply", region: "North", orders: "798", revenue: "$642K", status: "Elite" },
  { id: "D-147", dealer: "Apex Hardware Hub", region: "South", orders: "624", revenue: "$512K", status: "Active" },
];

export const topRegions = [
  { id: "R-01", region: "North", scans: "2.84M", dealers: "12.4K", revenue: "$5.12M", status: "Ahead" },
  { id: "R-02", region: "West", scans: "2.46M", dealers: "10.8K", revenue: "$4.86M", status: "Ahead" },
  { id: "R-03", region: "South", scans: "2.12M", dealers: "9.7K", revenue: "$4.04M", status: "On Track" },
];

export const recentWarrantyClaims = [
  { id: "WR-31842", customer: "Asha Mehta", product: "LT Pump Motor", priority: "High", age: "2h", status: "Submitted" },
  { id: "WR-31819", customer: "BuildRight Contractors", product: "LT Seal Guard", priority: "Medium", age: "5h", status: "Review" },
  { id: "WR-31794", customer: "Ravi Electricals", product: "LT Shield Pro", priority: "Low", age: "1d", status: "Approved" },
];

export const recentQrBatches = [
  { id: "QRB-90842", product: "LT Shield Pro", quantity: "250K", factory: "Pune Factory", status: "Generated" },
  { id: "QRB-90817", product: "LT Bond Max", quantity: "180K", factory: "Surat Factory", status: "Printed" },
  { id: "QRB-90788", product: "LT Seal Guard", quantity: "120K", factory: "Chennai Factory", status: "Mapped" },
];
