import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CreditCard,
  Gift,
  Layers3,
  LayoutGrid,
  Package,
  QrCode,
  Route,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Ticket,
  TrendingUp,
  Users,
  Wallet2,
  Warehouse,
} from "lucide-react";
import DataTable from "../../Components/DataTable";
import PageHeader from "../../Components/PageHeader";
import StatCard from "../../Components/StatCard";
import StatusBadge from "../../Components/StatusBadge";

const dashboardRows = [
  { id: 1, qr: "QR-1042", customer: "Riya Shah", location: "Pune", reward: "240 pts", status: "Active" },
  { id: 2, qr: "QR-1041", customer: "Aman Rao", location: "Bengaluru", reward: "180 pts", status: "Pending" },
  { id: 3, qr: "QR-1038", customer: "Sana Iqbal", location: "Delhi", reward: "320 pts", status: "Active" },
];

const dashboardCustomers = [
  { id: 1, name: "Ravi Menon", city: "Bengaluru", scans: 42, points: 8450, status: "Active" },
  { id: 2, name: "Meera Dutta", city: "Pune", scans: 36, points: 6210, status: "Active" },
  { id: 3, name: "Ishan Kumar", city: "Mumbai", scans: 19, points: 2380, status: "Review" },
];

const productRows = [
  { id: 1, name: "Smart Pump Pro", sku: "SPP-1001", category: "Hardware", mrp: "₹3,999", points: 250, cashback: "₹199", status: "Active" },
  { id: 2, name: "Eco Seal Kit", sku: "ESK-4402", category: "Accessories", mrp: "₹1,599", points: 140, cashback: "₹79", status: "Draft" },
  { id: 3, name: "TraceLite QR Tag", sku: "TLQ-8820", category: "QR", mrp: "₹699", points: 80, cashback: "₹39", status: "Active" },
];

const qrRows = [
  { id: 1, batch: "B-204", product: "Smart Pump Pro", count: 2500, scanned: 1820, dealer: "Metro Link", status: "Live" },
  { id: 2, batch: "B-203", product: "TraceLite QR Tag", count: 900, scanned: 712, dealer: "BuildGrid", status: "Review" },
  { id: 3, batch: "B-202", product: "Eco Seal Kit", count: 1200, scanned: 1040, dealer: "Northstar", status: "Active" },
];

const loyaltyRows = [
  { id: 1, customer: "Aditi Sharma", tier: "Gold", points: 14880, redeemed: 4800, lastActivity: "2h ago", status: "Active" },
  { id: 2, customer: "Kunal Bhat", tier: "Platinum", points: 24820, redeemed: 8200, lastActivity: "1d ago", status: "Active" },
  { id: 3, customer: "Sana Reddy", tier: "Silver", points: 6240, redeemed: 1800, lastActivity: "4d ago", status: "Review" },
];

const rewardRows = [
  { id: 1, customer: "Kunal Bhat", amount: "₹1,000", points: 1000, status: "Approved" },
  { id: 2, customer: "Riya Shah", amount: "₹500", points: 500, status: "Pending" },
  { id: 3, customer: "Meera Dutta", amount: "₹250", points: 250, status: "Rejected" },
];

const warrantyRows = [
  { id: 1, customer: "Anil Shetty", product: "Smart Pump Pro", claim: "Seal issue", status: "Approved" },
  { id: 2, customer: "Poonam Verma", product: "TraceLite QR Tag", claim: "Bluetooth fault", status: "Pending" },
  { id: 3, customer: "Nadim Khan", product: "Eco Seal Kit", claim: "Installation support", status: "Assigned" },
];

const traceabilityRows = [
  { id: 1, batch: "B-204", product: "Smart Pump Pro", stage: "Distributor", location: "Mumbai Hub", status: "In Transit" },
  { id: 2, batch: "B-203", product: "TraceLite QR Tag", stage: "Retailer", location: "Delhi Store", status: "Scanned" },
  { id: 3, batch: "B-202", product: "Eco Seal Kit", stage: "Warehouse", location: "Pune DC", status: "Held" },
];

const partnerRows = [
  { id: 1, name: "Metro Distribution", city: "Mumbai", type: "Distributor", score: 96, status: "Verified" },
  { id: 2, name: "Prime Dealer Hub", city: "Hyderabad", type: "Dealer", score: 92, status: "Verified" },
  { id: 3, name: "BuildRight Retail", city: "Bengaluru", type: "Retailer", score: 89, status: "Review" },
];

const marketingRows = [
  { id: 1, name: "Festival Boost", type: "Loyalty", audience: "Repeat customers", performance: "18% CTR", status: "Live" },
  { id: 2, name: "Trace Scan Push", type: "QR Campaign", audience: "Dealers", performance: "12% CTR", status: "Draft" },
  { id: 3, name: "Warranty Reminder", type: "Warranty", audience: "Registered buyers", performance: "24% Open", status: "Scheduled" },
];

const fraudRows = [
  { id: 1, qr: "QR-8892", customer: "Neha Singh", type: "Duplicate Scan", risk: "High", status: "Investigating" },
  { id: 2, qr: "QR-7790", customer: "Rupesh V", type: "Location Mismatch", risk: "Medium", status: "Safe" },
  { id: 3, qr: "QR-7831", customer: "Mina R", type: "Expired QR", risk: "High", status: "Blocked" },
];

const analyticsRows = [
  { id: 1, report: "QR Performance", range: "Last 30 days", owner: "Growth", status: "Ready" },
  { id: 2, report: "Dealer Performance", range: "Last 7 days", owner: "Sales", status: "Ready" },
  { id: 3, report: "Warranty Claims", range: "Last 90 days", owner: "Service", status: "Draft" },
];

const aiRows = [
  { id: 1, question: "Which product is performing best?", answer: "Smart Pump Pro is outperforming the rest by 18% in scan volume." },
  { id: 2, question: "Which city needs more dealer support?", answer: "Delhi shows lower activation after the last campaign." },
  { id: 3, question: "Which QR batches look suspicious?", answer: "Batch B-203 has a higher duplicate scan ratio in the last 48 hours." },
];

const moduleConfig = {
  dashboard: {
    title: "Admin Dashboard",
    description: "Command center for QR-led loyalty, warranty, partner activity, and channel growth.",
    stats: [
      { label: "Products", value: "1,248", change: "+12% this month", tone: "cyan", icon: Package },
      { label: "QR Generated", value: "84,920", change: "+9.2% weekly", tone: "emerald", icon: QrCode },
      { label: "Customers", value: "31,480", change: "+16% QoQ", tone: "violet", icon: Users },
      { label: "Rewards Issued", value: "42,110", change: "+7.8% today", tone: "amber", icon: Gift },
    ],
  },
  products: {
    title: "Product Management",
    description: "Track product launches, loyalty configurations, and reward-ready sku performance.",
    stats: [
      { label: "Active Products", value: "218", change: "7 launches this week", tone: "cyan", icon: Package },
      { label: "Base Points", value: "24,480", change: "Across all sku families", tone: "emerald", icon: CreditCard },
      { label: "Reward-ready", value: "186", change: "Ready for campaigns", tone: "violet", icon: Sparkles },
      { label: "Pending Review", value: "12", change: "Awaiting approval", tone: "amber", icon: Layers3 },
    ],
  },
  "qr-management": {
    title: "QR Management",
    description: "Generate batches, monitor scan health, and act on duplicate or abnormal QR activity.",
    stats: [
      { label: "QR Generated", value: "84,920", change: "7 active campaigns", tone: "cyan", icon: QrCode },
      { label: "Active QR", value: "68,440", change: "81% of live inventory", tone: "emerald", icon: ShieldCheck },
      { label: "Scanned QR", value: "59,180", change: "+11.4% this week", tone: "violet", icon: Activity },
      { label: "Alerts", value: "24", change: "High-risk duplicate scans", tone: "rose", icon: AlertTriangle },
    ],
  },
  customers: {
    title: "Customer Management",
    description: "Monitor customer journeys, wallet activity, warranty participation, and loyalty engagement.",
    stats: [
      { label: "Active Customers", value: "31,480", change: "Healthy retention", tone: "cyan", icon: Users },
      { label: "Wallet Points", value: "12.4M", change: "Issued this quarter", tone: "emerald", icon: Wallet2 },
      { label: "Warranty Users", value: "8,920", change: "13% of owners", tone: "violet", icon: Ticket },
      { label: "Repeat Buyers", value: "19,120", change: "61% of active base", tone: "amber", icon: TrendingUp },
    ],
  },
  loyalty: {
    title: "Loyalty Program",
    description: "Run tier-based loyalty logic, point issuance, and member engagement across the network.",
    stats: [
      { label: "Active Members", value: "19,820", change: "+8.2% monthly", tone: "cyan", icon: Users },
      { label: "Points Issued", value: "4.6M", change: "Across all tiers", tone: "emerald", icon: CreditCard },
      { label: "Points Redeemed", value: "2.8M", change: "61% redemption rate", tone: "violet", icon: Gift },
      { label: "Active Tiers", value: "5", change: "Bronze to Diamond", tone: "amber", icon: BadgeCheck },
    ],
  },
  rewards: {
    title: "Rewards Program",
    description: "Approve redemptions, manage reward rules, and monitor campaign ROI.",
    stats: [
      { label: "Rewards Issued", value: "42,110", change: "This quarter", tone: "cyan", icon: Gift },
      { label: "Redeemed", value: "18,980", change: "45% of issued", tone: "emerald", icon: Wallet2 },
      { label: "Pending", value: "214", change: "Needs review", tone: "amber", icon: Sparkles },
      { label: "Approved", value: "16,820", change: "Fast approvals", tone: "violet", icon: BadgeCheck },
    ],
  },
  warranty: {
    title: "Warranty Management",
    description: "Keep warranty registrations, claims, and service handoffs organized across the product lifecycle.",
    stats: [
      { label: "Registered", value: "14,220", change: "Live policy base", tone: "cyan", icon: Ticket },
      { label: "Active", value: "9,410", change: "Within current period", tone: "emerald", icon: ShieldCheck },
      { label: "Claims", value: "1,240", change: "Open and assigned", tone: "violet", icon: AlertTriangle },
      { label: "Pending", value: "162", change: "Requires action", tone: "amber", icon: Layers3 },
    ],
  },
  traceability: {
    title: "Product Traceability",
    description: "Visualize each product’s journey from factory to customer with alerts and movement checkpoints.",
    stats: [
      { label: "Tracked Products", value: "1,082", change: "Across all channels", tone: "cyan", icon: Route },
      { label: "Factory Scans", value: "8,420", change: "Today", tone: "emerald", icon: Building2 },
      { label: "Warehouse Scans", value: "5,360", change: "Last 24h", tone: "violet", icon: Warehouse },
      { label: "Alerts", value: "17", change: "Potential diversions", tone: "rose", icon: AlertTriangle },
    ],
  },
  dealers: {
    title: "Dealer Management",
    description: "Support dealer performance, order cycles, and customer acquisition from one workspace.",
    stats: [
      { label: "Dealers", value: "1,280", change: "Active network", tone: "cyan", icon: Store },
      { label: "Orders", value: "8,920", change: "Last 30d", tone: "emerald", icon: Boxes },
      { label: "Scans", value: "24,500", change: "Dealer-driven activity", tone: "violet", icon: QrCode },
      { label: "Rewards", value: "6,410", change: "Issued this month", tone: "amber", icon: Gift },
    ],
  },
  distributors: {
    title: "Distributor Management",
    description: "Monitor distributor reach, stock movement, and dealer coverage from a central view.",
    stats: [
      { label: "Distributors", value: "184", change: "Operationally active", tone: "cyan", icon: Boxes },
      { label: "Linked Dealers", value: "1,220", change: "Across territories", tone: "emerald", icon: Store },
      { label: "Orders", value: "5,160", change: "Last 30d", tone: "violet", icon: Activity },
      { label: "Stock Moves", value: "14,290", change: "Inventory movement", tone: "amber", icon: Warehouse },
    ],
  },
  retailers: {
    title: "Retailer Management",
    description: "Connect retail execution, loyalty redemptions, and customer capture points.",
    stats: [
      { label: "Retailers", value: "3,240", change: "Store network", tone: "cyan", icon: Store },
      { label: "Sales", value: "₹84.2M", change: "Last 30d", tone: "emerald", icon: TrendingUp },
      { label: "Retail Scans", value: "42,180", change: "Store-driven", tone: "violet", icon: QrCode },
      { label: "Rewards", value: "11,320", change: "Issued at POS", tone: "amber", icon: Gift },
    ],
  },
  "channel-partners": {
    title: "Channel Partner Management",
    description: "Track partner hierarchy, KYC readiness, and performance across the ecosystem.",
    stats: [
      { label: "Partners", value: "4,680", change: "Connected", tone: "cyan", icon: Users },
      { label: "Active", value: "4,210", change: "Operationally ready", tone: "emerald", icon: BadgeCheck },
      { label: "Inactive", value: "470", change: "Needs follow-up", tone: "amber", icon: AlertTriangle },
      { label: "KYC Pending", value: "86", change: "Review queue", tone: "violet", icon: ShieldCheck },
    ],
  },
  marketing: {
    title: "Marketing Automation",
    description: "Plan, schedule, and monitor loyalty, QR, warranty, and referral campaigns.",
    stats: [
      { label: "Active Campaigns", value: "18", change: "Live now", tone: "cyan", icon: Sparkles },
      { label: "Sent", value: "860K", change: "Messages", tone: "emerald", icon: Send },
      { label: "Opened", value: "420K", change: "Engagement", tone: "violet", icon: Activity },
      { label: "Conversions", value: "24.6K", change: "Driven by campaigns", tone: "amber", icon: TrendingUp },
    ],
  },
  "campaign-pages": {
    title: "Campaign Pages",
    description: "Publish landing experiences for QR, loyalty, and product launch campaigns.",
    stats: [
      { label: "Live Pages", value: "29", change: "Across campaigns", tone: "cyan", icon: LayoutGrid },
      { label: "Views", value: "186K", change: "Last 30d", tone: "emerald", icon: BarChart3 },
      { label: "Leads", value: "14,820", change: "Collected", tone: "violet", icon: Users },
      { label: "Conversions", value: "3,920", change: "Reward activation", tone: "amber", icon: Sparkles },
    ],
  },
  "fraud-alerts": {
    title: "Fraud Detection",
    description: "Surface suspicious QR usage, location anomalies, and device risk signals.",
    stats: [
      { label: "Duplicate Scans", value: "124", change: "Potential fraud", tone: "cyan", icon: AlertTriangle },
      { label: "Location Mismatch", value: "36", change: "Geolocation issues", tone: "emerald", icon: Route },
      { label: "Suspicious Devices", value: "18", change: "Needs review", tone: "violet", icon: ShieldCheck },
      { label: "Blocked QR", value: "9", change: "Secured", tone: "rose", icon: QrCode },
    ],
  },
  analytics: {
    title: "Analytics & Reports",
    description: "Turn QR, customer, dealer, and reward data into executive-ready insights.",
    stats: [
      { label: "Reports Ready", value: "24", change: "Export ready", tone: "cyan", icon: BarChart3 },
      { label: "QR Performance", value: "Live", change: "Updated hourly", tone: "emerald", icon: QrCode },
      { label: "Campaign ROI", value: "18.4%", change: "Average uplift", tone: "violet", icon: TrendingUp },
      { label: "Actionable Insights", value: "96", change: "Generated", tone: "amber", icon: Bot },
    ],
  },
  "ai-assistant": {
    title: "AI Business Assistant",
    description: "Ask business questions, review recommendations, and accelerate response planning.",
    stats: [
      { label: "Forecasts", value: "12", change: "Ready to review", tone: "cyan", icon: Bot },
      { label: "Fraud Prediction", value: "High", change: "Enabled", tone: "emerald", icon: ShieldCheck },
      { label: "Dealer Risk", value: "3", change: "At risk", tone: "violet", icon: AlertTriangle },
      { label: "Churn Signals", value: "28", change: "Identified", tone: "amber", icon: Users },
    ],
  },
  settings: {
    title: "Settings",
    description: "Configure company profile, branding, roles, loyalty defaults, and QR governance.",
    stats: [
      { label: "Company Profile", value: "Live", change: "Ready for updates", tone: "cyan", icon: Building2 },
      { label: "Branding", value: "Synced", change: "Applied across channels", tone: "emerald", icon: Sparkles },
      { label: "Roles", value: "7", change: "Configured", tone: "violet", icon: Users },
      { label: "QR Rules", value: "Enabled", change: "Duplicate scan guard", tone: "amber", icon: ShieldCheck },
    ],
  },
};

export default function Phase1ModulePage({ moduleKey = "dashboard" }) {
  const [query, setQuery] = useState("");
  const config = moduleConfig[moduleKey] || moduleConfig.dashboard;

  const filteredRows = useMemo(() => {
    const sourceMap = {
      dashboard: dashboardRows,
      products: productRows,
      "qr-management": qrRows,
      customers: dashboardCustomers,
      loyalty: loyaltyRows,
      rewards: rewardRows,
      warranty: warrantyRows,
      traceability: traceabilityRows,
      dealers: partnerRows,
      distributors: partnerRows,
      retailers: partnerRows,
      "channel-partners": partnerRows,
      marketing: marketingRows,
      "campaign-pages": marketingRows,
      "fraud-alerts": fraudRows,
      analytics: analyticsRows,
      "ai-assistant": aiRows,
      settings: [],
    };

    const rows = sourceMap[moduleKey] || [];
    const search = query.trim().toLowerCase();
    if (!search) return rows;
    return rows.filter((item) => Object.values(item).join(" ").toLowerCase().includes(search));
  }, [moduleKey, query]);

  const renderList = () => {
    switch (moduleKey) {
      case "dashboard":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent QR activity</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Live scan snapshots across the partner network.</p>
                </div>
                <StatusBadge status="Live" tone="success" />
              </div>
              <div className="mt-5">
                <DataTable
                  title="Recent QR Scans"
                  description="Latest interaction events from loyalty and verification flows."
                  rows={filteredRows}
                  columns={[
                    { key: "qr", header: "QR" },
                    { key: "customer", header: "Customer" },
                    { key: "location", header: "Location" },
                    { key: "reward", header: "Reward" },
                    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Active" ? "success" : "warning"} /> },
                  ]}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Top customers</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Customers driving engagement this week.</p>
                  </div>
                  <StatusBadge status="Trending" tone="info" />
                </div>
                <div className="mt-5 space-y-3">
                  {dashboardCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{customer.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{customer.city} • {customer.scans} scans</p>
                      </div>
                      <StatusBadge status={customer.status} tone={customer.status === "Active" ? "success" : "warning"} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Executive pulse</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Campaign activity is trending positively with stronger repeat purchase signals in Pune and Bengaluru.</p>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <DataTable
                title="Product portfolio"
                description="Mock product launch overview with loyalty and cashback settings."
                rows={filteredRows}
                columns={[
                  { key: "name", header: "Product" },
                  { key: "sku", header: "SKU" },
                  { key: "category", header: "Category" },
                  { key: "mrp", header: "MRP" },
                  { key: "points", header: "Points" },
                  { key: "cashback", header: "Cashback" },
                  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Active" ? "success" : "warning"} /> },
                ]}
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Launch focus</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Highlight high-value sku families with reward-ready messaging and QR-ready packaging.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Quick actions</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Add Product</button>
                  <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Import</button>
                  <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Export</button>
                </div>
              </div>
            </div>
          </div>
        );
      case "qr-management":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="QR batches"
              description="Overview of generated batches, fulfilment, and scan coverage."
              rows={filteredRows}
              columns={[
                { key: "batch", header: "Batch" },
                { key: "product", header: "Product" },
                { key: "count", header: "Count" },
                { key: "scanned", header: "Scanned" },
                { key: "dealer", header: "Dealer" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Live" ? "success" : row.status === "Review" ? "warning" : "info"} /> },
              ]}
            />
          </div>
        );
      case "customers":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <DataTable
                title="Customer directory"
                description="Core customer activity and wallet profile snapshot."
                rows={filteredRows}
                columns={[
                  { key: "name", header: "Customer" },
                  { key: "city", header: "City" },
                  { key: "scans", header: "Scans" },
                  { key: "points", header: "Points" },
                  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Active" ? "success" : "warning"} /> },
                ]}
              />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">360° customer view</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Each profile combines scan history, rewards, wallet balance, transactions, warranty, and support context.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Scan History</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">42 recent scans</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Wallet</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">₹12,760 balance</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "loyalty":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <DataTable
                title="Loyalty members"
                description="Tiered members tracked by points activity and last engagement."
                rows={filteredRows}
                columns={[
                  { key: "customer", header: "Customer" },
                  { key: "tier", header: "Tier" },
                  { key: "points", header: "Points" },
                  { key: "redeemed", header: "Redeemed" },
                  { key: "lastActivity", header: "Last Activity" },
                  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Active" ? "success" : "warning"} /> },
                ]}
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Tier rules</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Bronze: 0–4,999 points</li>
                  <li>• Silver: 5,000–9,999 points</li>
                  <li>• Gold: 10,000–19,999 points</li>
                  <li>• Platinum: 20,000+ points</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Reward multiplier</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Gold and Platinum customers receive higher cashback triggers and premium campaign eligibility.</p>
              </div>
            </div>
          </div>
        );
      case "rewards":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Redemption requests"
              description="Approval queue and payout state for reward requests."
              rows={filteredRows}
              columns={[
                { key: "customer", header: "Customer" },
                { key: "amount", header: "Amount" },
                { key: "points", header: "Points" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Approved" ? "success" : row.status === "Pending" ? "warning" : "danger"} /> },
              ]}
            />
          </div>
        );
      case "warranty":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Warranty claims"
              description="Current warranty claims, service assignments, and approval status."
              rows={filteredRows}
              columns={[
                { key: "customer", header: "Customer" },
                { key: "product", header: "Product" },
                { key: "claim", header: "Issue" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Approved" ? "success" : row.status === "Assigned" ? "info" : "warning"} /> },
              ]}
            />
          </div>
        );
      case "traceability":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <DataTable
                title="Product journey"
                description="Factory → warehouse → distributor → dealer → retailer → customer movement."
                rows={filteredRows}
                columns={[
                  { key: "batch", header: "Batch" },
                  { key: "product", header: "Product" },
                  { key: "stage", header: "Stage" },
                  { key: "location", header: "Location" },
                  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Scanned" ? "success" : row.status === "Held" ? "warning" : "info"} /> },
                ]}
              />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Journey flow</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Factory','Warehouse','Distributor','Dealer','Retailer','Customer'].map((step) => (
                  <span key={step} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">{step}</span>
                ))}
              </div>
            </div>
          </div>
        );
      case "dealers":
      case "distributors":
      case "retailers":
      case "channel-partners":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title={`${config.title} network`}
              description="Partner profile overview with performance and verification status."
              rows={filteredRows}
              columns={[
                { key: "name", header: "Partner" },
                { key: "city", header: "City" },
                { key: "type", header: "Type" },
                { key: "score", header: "Score" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Verified" ? "success" : "warning"} /> },
              ]}
            />
          </div>
        );
      case "marketing":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Campaign roster"
              description="Multi-channel campaign lifecycle including QR, loyalty, cashback, and warranty nudges."
              rows={filteredRows}
              columns={[
                { key: "name", header: "Campaign" },
                { key: "type", header: "Type" },
                { key: "audience", header: "Audience" },
                { key: "performance", header: "Performance" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Live" ? "success" : row.status === "Scheduled" ? "info" : "warning"} /> },
              ]}
            />
          </div>
        );
      case "campaign-pages":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Campaign landing pages"
              description="Preview public page performance and reward activation state."
              rows={filteredRows}
              columns={[
                { key: "name", header: "Page" },
                { key: "type", header: "Type" },
                { key: "audience", header: "Audience" },
                { key: "performance", header: "Performance" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Live" ? "success" : "warning"} /> },
              ]}
            />
          </div>
        );
      case "fraud-alerts":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Fraud queues"
              description="Duplicate scan, location mismatch, and expired QR investigations."
              rows={filteredRows}
              columns={[
                { key: "qr", header: "QR" },
                { key: "customer", header: "Customer" },
                { key: "type", header: "Alert Type" },
                { key: "risk", header: "Risk" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Investigating" ? "warning" : row.status === "Blocked" ? "danger" : "success"} /> },
              ]}
            />
          </div>
        );
      case "analytics":
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <DataTable
              title="Export-ready reports"
              description="QR, product, dealer, reward, warranty, and campaign performance exports."
              rows={filteredRows}
              columns={[
                { key: "report", header: "Report" },
                { key: "range", header: "Range" },
                { key: "owner", header: "Owner" },
                { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Ready" ? "success" : "warning"} /> },
              ]}
            />
          </div>
        );
      case "ai-assistant":
        return (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Ask the assistant</h2>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-sm text-slate-600 dark:text-slate-300">“Which product is performing best?”</p>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-sm text-slate-600 dark:text-slate-300">“Which city has the highest scans?”</p>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-sm text-slate-600 dark:text-slate-300">“Which dealer is inactive?”</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <DataTable
                title="AI answers"
                description="Suggested insights and recommendations for daily operations."
                rows={filteredRows}
                columns={[
                  { key: "question", header: "Question" },
                  { key: "answer", header: "Answer" },
                ]}
              />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Company profile</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Add company name, logo, GST, website, and region-level identity.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Branding</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Configure colors, logo, campaign landing page branding, and login page visuals.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Roles & permissions</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Company Admin</li>
                <li>• Manager</li>
                <li>• Sales User</li>
                <li>• Dealer, Distributor, Retailer</li>
                <li>• Support User</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Phase 1 Workspace"
        title={config.title}
        description={config.description}
        actions={
          <>
            <button type="button" className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Quick Export</button>
            <button type="button" className="h-10 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Open Toolkit</button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.stats.map((stat) => {
          const Icon = stat.icon;
          return <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} tone={stat.tone} icon={Icon} />;
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Filter</button>
            <button type="button" className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Share</button>
          </div>
        </div>
      </section>

      {renderList()}
    </div>
  );
}
