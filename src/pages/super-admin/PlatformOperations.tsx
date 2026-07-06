import { useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Building2,
  CreditCard,
  Download,
  Filter,
  HandCoins,
  Headphones,
  MonitorCheck,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Upload,
  Users,
  Wifi,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";

type PlatformMode =
  | "companies"
  | "subscriptions"
  | "plans"
  | "billing"
  | "revenue"
  | "users"
  | "support"
  | "platform-analytics"
  | "system-health"
  | "monitoring";

type PlatformRow = Record<string, string>;

const modeMeta: Record<PlatformMode, { title: string; subtitle: string; icon: typeof Building2 }> = {
  companies: { title: "Companies", subtitle: "Tenant companies, industries, environments, onboarding state, and platform ownership.", icon: Building2 },
  subscriptions: { title: "Subscriptions", subtitle: "Tenant subscriptions, renewals, plan state, lifecycle stage, and billing readiness.", icon: BadgeCheck },
  plans: { title: "Plans", subtitle: "Platform plan catalog, limits, features, entitlements, and pricing tiers.", icon: CreditCard },
  billing: { title: "Billing", subtitle: "Invoices, payment status, collections, renewal windows, and billing operations.", icon: CreditCard },
  revenue: { title: "Revenue", subtitle: "MRR, ARR, expansion, churn, collections, and platform revenue intelligence.", icon: HandCoins },
  users: { title: "Users", subtitle: "Platform users, tenant admins, roles, access status, and governance readiness.", icon: Users },
  support: { title: "Support", subtitle: "Platform support queue, tenant escalations, SLA status, and resolution tracking.", icon: Headphones },
  "platform-analytics": { title: "Platform Analytics", subtitle: "Usage, adoption, tenant growth, feature engagement, and operating metrics.", icon: BarChart3 },
  "system-health": { title: "System Health", subtitle: "Service health, uptime, incidents, latency, queues, and dependency status.", icon: Activity },
  monitoring: { title: "Monitoring", subtitle: "Infrastructure monitoring, logs, alerts, service checks, and operational readiness.", icon: MonitorCheck },
};

const rows: Record<PlatformMode, PlatformRow[]> = {
  companies: [
    { id: "CMP-001", name: "Apex Industrial Coatings", plan: "Enterprise", region: "India", owner: "Pravat Admin", status: "Active" },
    { id: "CMP-002", name: "Northline Manufacturing", plan: "Growth", region: "MEA", owner: "Platform Ops", status: "Onboarding" },
    { id: "CMP-003", name: "Urban Build Products", plan: "Enterprise", region: "APAC", owner: "Customer Success", status: "Active" },
  ],
  subscriptions: [
    { id: "SUB-1001", name: "Apex Industrial Coatings", plan: "Enterprise", renewal: "Aug 31, 2026", value: "$184K ARR", status: "Active" },
    { id: "SUB-1002", name: "Northline Manufacturing", plan: "Growth", renewal: "Sep 15, 2026", value: "$72K ARR", status: "Trial" },
    { id: "SUB-1003", name: "Urban Build Products", plan: "Enterprise", renewal: "Jul 28, 2026", value: "$126K ARR", status: "Renewal" },
  ],
  plans: [
    { id: "PLN-001", name: "Starter", plan: "Base", limit: "10K QR/month", price: "$499/mo", status: "Active" },
    { id: "PLN-002", name: "Growth", plan: "Scale", limit: "250K QR/month", price: "$2,499/mo", status: "Active" },
    { id: "PLN-003", name: "Enterprise", plan: "Custom", limit: "Unlimited", price: "Contract", status: "Active" },
  ],
  billing: [
    { id: "INV-9001", name: "Apex Industrial Coatings", invoice: "$15,400", due: "Jul 15, 2026", owner: "Finance Ops", status: "Paid" },
    { id: "INV-9002", name: "Northline Manufacturing", invoice: "$6,200", due: "Jul 18, 2026", owner: "Finance Ops", status: "Open" },
    { id: "INV-9003", name: "Urban Build Products", invoice: "$10,800", due: "Jul 21, 2026", owner: "Finance Ops", status: "Review" },
  ],
  revenue: [
    { id: "REV-001", name: "MRR", metric: "$482K", change: "+18.2%", driver: "Enterprise expansion", status: "Growing" },
    { id: "REV-002", name: "ARR", metric: "$5.8M", change: "+22.4%", driver: "Plan upgrades", status: "Growing" },
    { id: "REV-003", name: "Churn Risk", metric: "2.4%", change: "-0.8%", driver: "CS follow-up", status: "Healthy" },
  ],
  users: [
    { id: "USR-001", name: "Nisha Kapoor", role: "Tenant Admin", company: "Apex Industrial Coatings", access: "SSO", status: "Active" },
    { id: "USR-002", name: "Rahul Mehta", role: "Platform Support", company: "LoyaltyTown", access: "MFA", status: "Active" },
    { id: "USR-003", name: "Pooja Sen", role: "Billing Admin", company: "Urban Build Products", access: "MFA", status: "Review" },
  ],
  support: [
    { id: "SUP-7001", name: "QR bulk generation delay", company: "Apex Industrial Coatings", priority: "High", owner: "Platform Support", status: "Open" },
    { id: "SUP-7002", name: "Billing invoice mismatch", company: "Urban Build Products", priority: "Medium", owner: "Finance Ops", status: "Review" },
    { id: "SUP-7003", name: "SSO setup request", company: "Northline Manufacturing", priority: "Medium", owner: "Security Ops", status: "Planned" },
  ],
  "platform-analytics": [
    { id: "ANA-001", name: "Monthly Active Tenants", metric: "284", change: "+12.1%", driver: "Manufacturing adoption", status: "Growing" },
    { id: "ANA-002", name: "QR Volume", metric: "84M", change: "+28.4%", driver: "Enterprise batches", status: "Growing" },
    { id: "ANA-003", name: "Feature Adoption", metric: "72%", change: "+9.8%", driver: "AI modules", status: "Healthy" },
  ],
  "system-health": [
    { id: "HLT-001", name: "API Gateway", uptime: "99.99%", latency: "82ms", owner: "SRE", status: "Operational" },
    { id: "HLT-002", name: "QR Service", uptime: "99.98%", latency: "118ms", owner: "SRE", status: "Operational" },
    { id: "HLT-003", name: "Notifications", uptime: "99.94%", latency: "240ms", owner: "Platform", status: "Watch" },
  ],
  monitoring: [
    { id: "MON-001", name: "Critical Alerts", metric: "0", change: "Stable", driver: "SRE checks", status: "Operational" },
    { id: "MON-002", name: "Queue Depth", metric: "1.8K", change: "-12%", driver: "Workers scaled", status: "Healthy" },
    { id: "MON-003", name: "Error Budget", metric: "82%", change: "+4%", driver: "Incident-free window", status: "Healthy" },
  ],
};

const trendData = [
  { month: "Jan", revenue: 3.8, tenants: 182, uptime: 99.91 },
  { month: "Feb", revenue: 4.1, tenants: 196, uptime: 99.94 },
  { month: "Mar", revenue: 4.5, tenants: 214, uptime: 99.95 },
  { month: "Apr", revenue: 4.9, tenants: 238, uptime: 99.96 },
  { month: "May", revenue: 5.3, tenants: 261, uptime: 99.98 },
  { month: "Jun", revenue: 5.8, tenants: 284, uptime: 99.99 },
];

const statusStyles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Operational: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Paid: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Growing: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Onboarding: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Trial: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Renewal: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Open: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Planned: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Watch: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Review}`}>
    {value}
  </span>
);

const Header = ({ mode }: { mode: PlatformMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Super Admin</p>
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
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["Companies", "284", Building2, "+12.1%"],
    ["ARR", "$5.8M", HandCoins, "+22.4%"],
    ["Uptime", "99.99%", ShieldCheck, "Operational"],
    ["Open Support", "18", Headphones, "4 high priority"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search platform records" />
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

const DataTable = ({ mode, filteredRows }: { mode: PlatformMode; filteredRows: PlatformRow[] }) => {
  const columns = Object.keys(rows[mode][0] || {});

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{modeMeta[mode].title} Records</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable platform operations table placeholder ready for backend integration.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[980px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {filteredRows.map((row) => (
          <div key={row.id} className="grid min-w-[980px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
            {columns.map((column) => (
              <span key={column} className="min-w-0 truncate">
                {column === "status" ? <StatusBadge value={row[column]} /> : row[column]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredRows.length} records</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const Charts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Revenue and Tenants</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="revenue" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="tenants" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">System Uptime</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" domain={[99.8, 100]} />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="uptime" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const HealthPanel = () => (
  <section className="grid gap-3 md:grid-cols-3">
    {[
      [Server, "API Gateway", "99.99% uptime", "Operational"],
      [Wifi, "Notifications", "240ms latency", "Watch"],
      [MonitorCheck, "Workers", "1.8K queue depth", "Healthy"],
    ].map(([Icon, title, detail, status]) => (
      <div key={title as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <Icon className="h-5 w-5 text-cyan-300" />
        <h2 className="mt-4 text-sm font-semibold text-white">{title as string}</h2>
        <p className="mt-2 text-sm text-slate-400">{detail as string}</p>
        <div className="mt-4"><StatusBadge value={status as string} /></div>
      </div>
    ))}
  </section>
);

const PlatformOperations = ({ mode = "companies" }: { mode?: PlatformMode }) => {
  const [query, setQuery] = useState("");
  const data = rows[mode];
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(q)));
  }, [data, query]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics />
      <Toolbar query={query} onQueryChange={setQuery} />
      {mode === "system-health" || mode === "monitoring" ? <HealthPanel /> : null}
      <DataTable mode={mode} filteredRows={filteredRows} />
      {mode === "revenue" || mode === "platform-analytics" || mode === "system-health" || mode === "monitoring" ? <Charts /> : null}
    </div>
  );
};

export default PlatformOperations;
