export const manufacturerDashboardKpis = [
  { id: "products", label: "Total Products", value: "12,840", target: "+8.4%", progress: 82, icon: "Package" },
  { id: "skus", label: "Active SKUs", value: "48,216", target: "+5.1%", progress: 76, icon: "Boxes" },
  { id: "qr-generated", label: "QR Generated", value: "184.2M", target: "+18.7%", progress: 91, icon: "QrCode" },
  { id: "qr-scans", label: "QR Scans", value: "32.8M", target: "+14.2%", progress: 84, icon: "ScanLine" },
  { id: "customers", label: "Customers Acquired", value: "2.46M", target: "+11.9%", progress: 73, icon: "Users" },
  { id: "dealers", label: "Active Dealers", value: "18,420", target: "+3.8%", progress: 68, icon: "Store" },
  { id: "distributors", label: "Active Distributors", value: "2,184", target: "+2.9%", progress: 64, icon: "Truck" },
  { id: "campaigns", label: "Active Campaigns", value: "126", target: "+9.6%", progress: 71, icon: "Megaphone" },
  { id: "wallet", label: "Wallet Liability", value: "$4.82M", target: "-1.3%", progress: 58, icon: "WalletCards" },
  { id: "warranty", label: "Warranty Claims", value: "8,942", target: "+4.5%", progress: 62, icon: "ShieldCheck" },
  { id: "revenue", label: "Revenue", value: "$42.6M", target: "+16.4%", progress: 88, icon: "LineChart" },
  { id: "counterfeit", label: "Counterfeit Alerts", value: "318", target: "-6.2%", progress: 42, icon: "AlertTriangle" },
];

export const manufacturerTrendData = [
  { month: "Jan", scans: 2.4, activations: 1.8, customers: 0.22, warranty: 480, wallet: 1.2, roi: 18 },
  { month: "Feb", scans: 2.9, activations: 2.1, customers: 0.28, warranty: 510, wallet: 1.38, roi: 22 },
  { month: "Mar", scans: 3.4, activations: 2.6, customers: 0.35, warranty: 560, wallet: 1.52, roi: 25 },
  { month: "Apr", scans: 4.1, activations: 3.1, customers: 0.42, warranty: 610, wallet: 1.68, roi: 31 },
  { month: "May", scans: 4.8, activations: 3.7, customers: 0.51, warranty: 680, wallet: 1.86, roi: 35 },
  { month: "Jun", scans: 5.6, activations: 4.4, customers: 0.63, warranty: 740, wallet: 2.08, roi: 41 },
];

export const manufacturerDealerPerformance = [
  { region: "North", dealers: 4180, revenue: 12.4, scans: 8.2 },
  { region: "West", dealers: 3920, revenue: 10.8, scans: 7.6 },
  { region: "South", dealers: 4680, revenue: 11.6, scans: 8.9 },
  { region: "East", dealers: 2840, revenue: 5.9, scans: 4.2 },
  { region: "Central", dealers: 2800, revenue: 4.7, scans: 3.9 },
];

export const manufacturerRegionScans = [
  { region: "Maharashtra", scans: 6.8, activations: 4.9 },
  { region: "Gujarat", scans: 4.9, activations: 3.6 },
  { region: "Karnataka", scans: 4.4, activations: 3.2 },
  { region: "Tamil Nadu", scans: 3.8, activations: 2.7 },
  { region: "Delhi NCR", scans: 3.2, activations: 2.3 },
];

export const manufacturerAiInsights = [
  { id: "demand", title: "Demand Forecast", severity: "Opportunity", detail: "North and South regions are projected to exceed SKU demand by 12 percent in the next 30 days." },
  { id: "counterfeit", title: "Counterfeit Risk", severity: "Risk", detail: "Repeated scans for two premium SKUs increased around three border districts." },
  { id: "dealer-inactivity", title: "Dealer Inactivity", severity: "Watch", detail: "186 dealers have not activated QR-linked sales in the last 21 days." },
  { id: "inventory", title: "Low Inventory Alert", severity: "Action", detail: "Fast-moving waterproofing SKUs may fall below reorder threshold within 9 days." },
  { id: "campaign", title: "Campaign Recommendation", severity: "Opportunity", detail: "Bundle cashback with warranty registration to improve conversion for new customers." },
  { id: "warranty", title: "Warranty Spike Alert", severity: "Investigate", detail: "Warranty claim volume for batch BT-2048 is 18 percent above trailing average." },
];

export const manufacturerQuickActions = [
  { id: "create-product", label: "Create Product", route: "/products/create", icon: "Package" },
  { id: "generate-qr", label: "Generate QR Batch", route: "/qr/generate", icon: "QrCode" },
  { id: "add-dealer", label: "Add Dealer", route: "/dealers/create", icon: "Store" },
  { id: "create-campaign", label: "Create Campaign", route: "/campaigns/create", icon: "Megaphone" },
  { id: "reports", label: "View Reports", route: "/reports", icon: "FileBarChart" },
  { id: "ai", label: "Open AI Assistant", route: "/ai-assistant", icon: "Bot" },
];

export const manufacturerRecentActivities = [
  { id: "act-1", title: "QR batch generated", description: "1.2M secure QR codes generated for Premium Cement 50kg.", timestamp: "8 min ago", icon: "QrCode", tone: "success" },
  { id: "act-2", title: "Customer registered", description: "A new contractor customer activated warranty through public scan.", timestamp: "18 min ago", icon: "Users", tone: "info" },
  { id: "act-3", title: "Dealer onboarded", description: "Shree BuildMart approved in West region with active wallet.", timestamp: "42 min ago", icon: "Store", tone: "success" },
  { id: "act-4", title: "Warranty claim submitted", description: "Claim WC-7811 submitted with photo evidence for inspection.", timestamp: "1 hr ago", icon: "ShieldCheck", tone: "warning" },
  { id: "act-5", title: "Reward redeemed", description: "Gold tier dealer redeemed a training voucher reward.", timestamp: "2 hrs ago", icon: "Gift", tone: "info" },
  { id: "act-6", title: "Campaign launched", description: "Monsoon contractor referral campaign published to WhatsApp.", timestamp: "3 hrs ago", icon: "Megaphone", tone: "success" },
];

export const manufacturerTopProducts = [
  { id: "prod-1", product: "Premium Cement 50kg", category: "Cement", scans: "4.8M", revenue: "$8.4M", status: "Leading" },
  { id: "prod-2", product: "UltraBond Adhesive", category: "Adhesives", scans: "3.2M", revenue: "$5.1M", status: "Growth" },
  { id: "prod-3", product: "AquaShield Coat", category: "Waterproofing", scans: "2.9M", revenue: "$4.8M", status: "Leading" },
  { id: "prod-4", product: "FlexiPipe Pro", category: "Pipes", scans: "2.2M", revenue: "$3.7M", status: "Stable" },
];

export const manufacturerTopDealers = [
  { id: "dealer-1", dealer: "Metro Infra Supply", region: "North", orders: "1,284", revenue: "$2.8M", status: "Elite" },
  { id: "dealer-2", dealer: "Shree BuildMart", region: "West", orders: "1,102", revenue: "$2.2M", status: "Growth" },
  { id: "dealer-3", dealer: "Dakshin Traders", region: "South", orders: "984", revenue: "$2.0M", status: "Elite" },
  { id: "dealer-4", dealer: "Eastern Materials", region: "East", orders: "642", revenue: "$1.1M", status: "Watch" },
];

export const manufacturerTopRegions = [
  { id: "region-1", region: "North", scans: "8.2M", dealers: "4,180", revenue: "$12.4M", status: "Ahead" },
  { id: "region-2", region: "South", scans: "8.9M", dealers: "4,680", revenue: "$11.6M", status: "Ahead" },
  { id: "region-3", region: "West", scans: "7.6M", dealers: "3,920", revenue: "$10.8M", status: "Stable" },
  { id: "region-4", region: "East", scans: "4.2M", dealers: "2,840", revenue: "$5.9M", status: "Growth" },
];

export const manufacturerRecentQrBatches = [
  { id: "QRB-90821", product: "Premium Cement 50kg", quantity: "1,200,000", factory: "Pune Factory", status: "Generated" },
  { id: "QRB-90820", product: "UltraBond Adhesive", quantity: "480,000", factory: "Surat Factory", status: "Printed" },
  { id: "QRB-90819", product: "AquaShield Coat", quantity: "320,000", factory: "Chennai Factory", status: "Mapped" },
];

export const manufacturerWarrantyClaims = [
  { id: "WC-7811", customer: "Rohit Kumar", product: "AquaShield Coat", priority: "High", age: "2h", status: "Submitted" },
  { id: "WC-7808", customer: "Sahana Buildcon", product: "FlexiPipe Pro", priority: "Medium", age: "6h", status: "Review" },
  { id: "WC-7802", customer: "Nikhil Shah", product: "UltraBond Adhesive", priority: "Low", age: "1d", status: "Approved" },
];
