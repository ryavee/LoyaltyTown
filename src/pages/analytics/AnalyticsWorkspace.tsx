import { useMemo, useState } from "react";
import {
  BarChart3,
  BadgeCheck,
  Banknote,
  Boxes,
  Download,
  Factory,
  Filter,
  Megaphone,
  PackageCheck,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  Upload,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";

type AnalyticsMode =
  | "sales"
  | "qr"
  | "dealer"
  | "distributor"
  | "customer"
  | "campaign"
  | "inventory"
  | "finance"
  | "warranty";

type AnalyticsRow = Record<string, string>;

const modeMeta: Record<AnalyticsMode, { title: string; subtitle: string; icon: typeof BarChart3; accent: string }> = {
  sales: { title: "Sales Analytics", subtitle: "Revenue, order velocity, regional growth, product contribution, and channel sales performance.", icon: ShoppingCart, accent: "Sales" },
  qr: { title: "QR Analytics", subtitle: "QR scans, verification outcomes, duplicate scans, geospatial scan density, and lifecycle analytics.", icon: QrCode, accent: "QR" },
  dealer: { title: "Dealer Analytics", subtitle: "Dealer performance, wallet engagement, claims, customer acquisition, and leaderboard movement.", icon: Store, accent: "Dealer" },
  distributor: { title: "Distributor Analytics", subtitle: "Distributor orders, collections, territory health, returns, inventory turns, and CRM performance.", icon: Truck, accent: "Distributor" },
  customer: { title: "Customer Analytics", subtitle: "Customer cohorts, purchases, wallet activity, warranty registration, support, and retention patterns.", icon: Users, accent: "Customer" },
  campaign: { title: "Campaign Analytics", subtitle: "Campaign ROI, conversion, coupon claims, channel delivery, landing page performance, and automation metrics.", icon: Megaphone, accent: "Campaign" },
  inventory: { title: "Inventory Analytics", subtitle: "Stock availability, movements, reservations, aging, alerts, warehouse coverage, and forecast signals.", icon: Boxes, accent: "Inventory" },
  finance: { title: "Finance Analytics", subtitle: "Revenue, outstanding balances, collections, cashback liability, reward liability, and settlement visibility.", icon: Banknote, accent: "Finance" },
  warranty: { title: "Warranty Analytics", subtitle: "Warranty registration, claim trends, product failure patterns, service SLA, and dealer warranty impact.", icon: ShieldCheck, accent: "Warranty" },
};

const summaryRows: Record<AnalyticsMode, AnalyticsRow[]> = {
  sales: [
    { id: "SAL-001", dimension: "West Region", metric: "$8.4M", change: "+18.2%", driver: "Dealer orders", status: "Growing" },
    { id: "SAL-002", dimension: "Premium Products", metric: "$3.1M", change: "+12.6%", driver: "Contractor demand", status: "Healthy" },
    { id: "SAL-003", dimension: "Retail Channel", metric: "$1.8M", change: "+7.8%", driver: "Offer conversion", status: "Watch" },
  ],
  qr: [
    { id: "QRA-001", dimension: "Verified Scans", metric: "2.8M", change: "+26.4%", driver: "Consumer app", status: "Healthy" },
    { id: "QRA-002", dimension: "Duplicate Scans", metric: "18.2K", change: "-4.1%", driver: "Anti-fraud rules", status: "Improving" },
    { id: "QRA-003", dimension: "GS1 Links", metric: "840K", change: "+31.8%", driver: "Batch rollout", status: "Growing" },
  ],
  dealer: [
    { id: "DEA-001", dimension: "Active Dealers", metric: "18,420", change: "+9.4%", driver: "Onboarding", status: "Healthy" },
    { id: "DEA-002", dimension: "Dealer Wallet", metric: "41.8M pts", change: "+16.7%", driver: "Sales rewards", status: "Growing" },
    { id: "DEA-003", dimension: "Claims", metric: "2,184", change: "-2.2%", driver: "Warranty training", status: "Improving" },
  ],
  distributor: [
    { id: "DIS-001", dimension: "Distributor Revenue", metric: "$12.4M", change: "+14.1%", driver: "Order expansion", status: "Growing" },
    { id: "DIS-002", dimension: "Collections", metric: "$10.8M", change: "+11.2%", driver: "Credit follow-up", status: "Healthy" },
    { id: "DIS-003", dimension: "Returns", metric: "1.8%", change: "-0.6%", driver: "Batch quality", status: "Improving" },
  ],
  customer: [
    { id: "CUS-001", dimension: "Active Customers", metric: "3.4M", change: "+18.2%", driver: "QR acquisition", status: "Growing" },
    { id: "CUS-002", dimension: "Retention", metric: "68.4%", change: "+4.8%", driver: "Wallet engagement", status: "Healthy" },
    { id: "CUS-003", dimension: "Support Rate", metric: "1.2%", change: "-0.4%", driver: "Warranty UX", status: "Improving" },
  ],
  campaign: [
    { id: "CAM-001", dimension: "Campaign ROI", metric: "4.8x", change: "+0.7x", driver: "Referral program", status: "Growing" },
    { id: "CAM-002", dimension: "Coupon Claims", metric: "128K", change: "+22.1%", driver: "Dealer bonus", status: "Healthy" },
    { id: "CAM-003", dimension: "WhatsApp Delivery", metric: "92.4%", change: "+3.2%", driver: "Template quality", status: "Healthy" },
  ],
  inventory: [
    { id: "INV-001", dimension: "Stock Coverage", metric: "42 days", change: "+5 days", driver: "Forecast planning", status: "Healthy" },
    { id: "INV-002", dimension: "Low Stock Alerts", metric: "184", change: "-12.4%", driver: "Replenishment", status: "Improving" },
    { id: "INV-003", dimension: "Inventory Value", metric: "$18.6M", change: "+8.1%", driver: "Warehouse intake", status: "Watch" },
  ],
  finance: [
    { id: "FIN-001", dimension: "Net Revenue", metric: "$24.8M", change: "+17.6%", driver: "Channel growth", status: "Growing" },
    { id: "FIN-002", dimension: "Outstanding", metric: "$2.1M", change: "-5.4%", driver: "Collections", status: "Improving" },
    { id: "FIN-003", dimension: "Reward Liability", metric: "$4.2M", change: "+16.4%", driver: "Wallet growth", status: "Watch" },
  ],
  warranty: [
    { id: "WAR-001", dimension: "Registrations", metric: "184K", change: "+21.8%", driver: "QR journey", status: "Growing" },
    { id: "WAR-002", dimension: "Claims", metric: "8,420", change: "-3.1%", driver: "Quality improvement", status: "Improving" },
    { id: "WAR-003", dimension: "SLA Compliance", metric: "96.2%", change: "+2.8%", driver: "Service routing", status: "Healthy" },
  ],
};

const trendData = [
  { month: "Jan", primary: 42, secondary: 28, tertiary: 12 },
  { month: "Feb", primary: 48, secondary: 34, tertiary: 14 },
  { month: "Mar", primary: 61, secondary: 42, tertiary: 18 },
  { month: "Apr", primary: 74, secondary: 51, tertiary: 22 },
  { month: "May", primary: 88, secondary: 62, tertiary: 27 },
  { month: "Jun", primary: 103, secondary: 74, tertiary: 32 },
];

const regionData = [
  { region: "West", value: 82 },
  { region: "North", value: 64 },
  { region: "South", value: 58 },
  { region: "East", value: 46 },
  { region: "Central", value: 31 },
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Growing: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Improving: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Watch: "border-amber-400/20 bg-amber-400/10 text-amber-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Watch}`}>
    {value}
  </span>
);

const Header = ({ mode }: { mode: AnalyticsMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Analytics Cloud</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{modeMeta[mode].title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{modeMeta[mode].subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Upload className="h-4 w-4" />
          Import
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
};

const Metrics = ({ mode }: { mode: AnalyticsMode }) => {
  const metrics = [
    [`${modeMeta[mode].accent} Index`, "103", TrendingUp, "+18.2%"],
    ["Active Signals", "2.8M", BadgeCheck, "Clean events"],
    ["Coverage", "96.4%", PackageCheck, "Data quality"],
    ["Forecast", "+12.8%", Factory, "Next period"],
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, Icon, hint]) => (
        <div key={label as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">{hint}</p>
        </div>
      ))}
    </section>
  );
};

const Toolbar = ({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) => (
  <section className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 lg:flex-row lg:items-center">
    <label className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search analytics dimensions" />
    </label>
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Filter className="h-4 w-4" />
        Filters
      </button>
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  </section>
);

const DataTable = ({ rows }: { rows: AnalyticsRow[] }) => {
  const columns = ["id", "dimension", "metric", "change", "driver", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Analytics Summary</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable analytics table placeholder ready for warehouse-backed data.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[900px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid min-w-[900px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
            {columns.map((column) => (
              <span key={column} className="min-w-0 truncate">
                {column === "status" ? <StatusBadge value={row[column]} /> : row[column]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {rows.length} dimensions</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const Charts = ({ mode }: { mode: AnalyticsMode }) => (
  <section className="grid gap-4 xl:grid-cols-3">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 xl:col-span-2">
      <h2 className="text-sm font-semibold text-white">{modeMeta[mode].accent} Trend</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="primary" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="secondary" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Regional Split</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionData} layout="vertical">
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="region" type="category" stroke="#64748b" width={60} />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="value" fill="#22d3ee" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 xl:col-span-3">
      <h2 className="text-sm font-semibold text-white">Forecast and Variance</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Line type="monotone" dataKey="primary" stroke="#22d3ee" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="tertiary" stroke="#a78bfa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const InsightPanel = ({ mode }: { mode: AnalyticsMode }) => (
  <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
    <div className="flex items-center gap-2">
      <BarChart3 className="h-4 w-4 text-cyan-200" />
      <h2 className="text-sm font-semibold text-white">Analytics Insights</h2>
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {[
        `${modeMeta[mode].accent} performance is above the six-month baseline.`,
        "Regional variance needs review before the next operating cadence.",
        "Forecast signals are ready for future AI-assisted recommendations.",
      ].map((insight) => (
        <div key={insight} className="rounded-md border border-cyan-400/10 bg-slate-950/40 p-3 text-sm leading-6 text-cyan-50/90">
          {insight}
        </div>
      ))}
    </div>
  </section>
);

const AnalyticsWorkspace = ({ mode = "sales" }: { mode?: AnalyticsMode }) => {
  const [query, setQuery] = useState("");
  const data = summaryRows[mode];
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(q)));
  }, [data, query]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics mode={mode} />
      <Toolbar query={query} onQueryChange={setQuery} />
      <DataTable rows={filteredRows} />
      <Charts mode={mode} />
      <InsightPanel mode={mode} />
    </div>
  );
};

export default AnalyticsWorkspace;
