import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileQuestion,
  Filter,
  Headphones,
  LifeBuoy,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  TicketCheck,
  Upload,
  Users,
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
import { EnterpriseDataTable } from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise";

type SupportMode =
  | "tickets"
  | "knowledge-base"
  | "live-chat"
  | "faqs"
  | "sla-dashboard"
  | "customer-support"
  | "escalations";

type SupportRow = Record<string, string>;

const modeMeta: Record<SupportMode, { title: string; subtitle: string; icon: typeof LifeBuoy }> = {
  tickets: {
    title: "Tickets",
    subtitle: "Central ticket queue for dealer, distributor, contractor, retailer, and consumer support requests.",
    icon: TicketCheck,
  },
  "knowledge-base": {
    title: "Knowledge Base",
    subtitle: "Reusable support articles, internal playbooks, product help, and localized customer guidance.",
    icon: BookOpen,
  },
  "live-chat": {
    title: "Live Chat",
    subtitle: "Real-time support conversations, channel handoff, agent availability, and response monitoring.",
    icon: MessageCircle,
  },
  faqs: {
    title: "FAQs",
    subtitle: "Frequently asked questions for warranties, QR scans, rewards, products, and channel operations.",
    icon: FileQuestion,
  },
  "sla-dashboard": {
    title: "SLA Dashboard",
    subtitle: "Service level performance, response targets, breach risk, priority queues, and support capacity.",
    icon: BarChart3,
  },
  "customer-support": {
    title: "Customer Support",
    subtitle: "Unified support workspace for customer context, active cases, product ownership, and service history.",
    icon: Headphones,
  },
  escalations: {
    title: "Escalations",
    subtitle: "High-priority escalations, ownership routing, breach prevention, and executive visibility.",
    icon: ShieldAlert,
  },
};

const rows: Record<SupportMode, SupportRow[]> = {
  tickets: [
    { id: "TKT-1001", subject: "Warranty claim document pending", requester: "Dealer", priority: "High", owner: "Support L2", status: "Open" },
    { id: "TKT-1002", subject: "QR scan verification failed", requester: "Consumer", priority: "Critical", owner: "Fraud Desk", status: "Escalated" },
    { id: "TKT-1003", subject: "Reward points not reflected", requester: "Contractor", priority: "Medium", owner: "Loyalty Ops", status: "Pending" },
  ],
  "knowledge-base": [
    { id: "KB-021", article: "Warranty registration workflow", audience: "Consumers", category: "Warranty", owner: "Content", status: "Published" },
    { id: "KB-034", article: "Dealer return process", audience: "Dealers", category: "Returns", owner: "Support Ops", status: "Review" },
    { id: "KB-052", article: "QR authenticity guidance", audience: "Retailers", category: "QR", owner: "Security", status: "Draft" },
  ],
  "live-chat": [
    { id: "CHAT-442", conversation: "Product verification support", channel: "Web", agent: "Priya N.", duration: "08m", status: "Active" },
    { id: "CHAT-443", conversation: "Dealer invoice question", channel: "Portal", agent: "Arun S.", duration: "14m", status: "Waiting" },
    { id: "CHAT-444", conversation: "Warranty proof upload", channel: "Mobile", agent: "Maya K.", duration: "05m", status: "Resolved" },
  ],
  faqs: [
    { id: "FAQ-008", question: "How do I verify a product?", topic: "QR", audience: "Consumer", owner: "Support", status: "Published" },
    { id: "FAQ-014", question: "How are reward points calculated?", topic: "Loyalty", audience: "Contractor", owner: "Loyalty", status: "Published" },
    { id: "FAQ-025", question: "How do dealers raise returns?", topic: "Returns", audience: "Dealer", owner: "Supply Chain", status: "Review" },
  ],
  "sla-dashboard": [
    { id: "SLA-01", queue: "Critical escalations", target: "30m response", achieved: "92%", owner: "Support L2", status: "At Risk" },
    { id: "SLA-02", queue: "Warranty claims", target: "4h response", achieved: "97%", owner: "Claims", status: "Healthy" },
    { id: "SLA-03", queue: "Live chat", target: "60s first reply", achieved: "89%", owner: "Chat Ops", status: "Breached" },
  ],
  "customer-support": [
    { id: "CUS-7781", customer: "Ravi Electricals", segment: "Dealer", openCases: "4", owner: "Channel Support", status: "Active" },
    { id: "CUS-7782", customer: "Asha Mehta", segment: "Consumer", openCases: "1", owner: "Care Team", status: "Pending" },
    { id: "CUS-7783", customer: "BuildRight Contractors", segment: "Contractor", openCases: "2", owner: "Loyalty Support", status: "Resolved" },
  ],
  escalations: [
    { id: "ESC-301", issue: "Counterfeit report from QR scan", severity: "Critical", route: "Security + Legal", owner: "Risk Desk", status: "Escalated" },
    { id: "ESC-302", issue: "SLA breach on warranty claim", severity: "High", route: "Claims Manager", owner: "Support L2", status: "At Risk" },
    { id: "ESC-303", issue: "Distributor dispatch dispute", severity: "Medium", route: "Supply Chain", owner: "Ops Lead", status: "Open" },
  ],
};

const trendData = [
  { month: "Jan", tickets: 420, resolved: 360, breached: 18 },
  { month: "Feb", tickets: 510, resolved: 448, breached: 22 },
  { month: "Mar", tickets: 575, resolved: 512, breached: 20 },
  { month: "Apr", tickets: 640, resolved: 586, breached: 26 },
  { month: "May", tickets: 720, resolved: 668, breached: 24 },
  { month: "Jun", tickets: 805, resolved: 756, breached: 21 },
];

const activity = [
  "Critical QR verification ticket routed to Fraud Desk",
  "Warranty claim SLA recovered before breach window",
  "Knowledge base article sent for legal review",
  "Live chat capacity increased for evening shift",
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Published: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Resolved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Open: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Waiting: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Pending: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "At Risk": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-200",
  Breached: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Escalated: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Draft}`}>
    {value}
  </span>
);

const Header = ({ mode }: { mode: SupportMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Support Center</p>
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
    ["Open Tickets", "1,248", TicketCheck, "146 high priority"],
    ["SLA Health", "94.8%", CheckCircle2, "Across active queues"],
    ["Avg Response", "18m", Clock, "First response time"],
    ["Escalations", "32", AlertTriangle, "9 critical"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search tickets, articles, customers, agents, and queues" />
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

const SupportTable = ({ data }: { data: SupportRow[] }) => {
  const columns: DataTableColumn<SupportRow>[] = Object.keys(data[0] || {}).map((column) => ({
    id: column,
    header: column.replace(/([A-Z])/g, " $1"),
    accessor: column,
    cell: (row) => (column === "status" ? <StatusBadge value={row[column]} /> : row[column]),
  }));

  return (
    <section className="space-y-0">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Operational Queue</h2>
          <p className="text-xs text-slate-500">Frontend-ready table placeholder for future API data.</p>
        </div>
        <button className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">
          Columns
        </button>
      </div>
      <EnterpriseDataTable rows={data} columns={columns} className="rounded-t-none border-t-0" />
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1-3 of 3 records</span>
        <div className="flex gap-2">
          <button className="rounded-md border border-slate-800 px-3 py-1.5 text-slate-300">Previous</button>
          <button className="rounded-md border border-slate-800 px-3 py-1.5 text-slate-300">Next</button>
        </div>
      </div>
    </section>
  );
};

const InsightPanels = ({ mode }: { mode: SupportMode }) => (
  <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Support Trend</h2>
          <p className="text-xs text-slate-500">Tickets, resolution, and breach placeholder analytics.</p>
        </div>
        <StatusBadge value={mode === "escalations" || mode === "sla-dashboard" ? "At Risk" : "Healthy"} />
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="tickets" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0" }} />
            <Area type="monotone" dataKey="tickets" stroke="#22d3ee" fill="url(#tickets)" strokeWidth={2} />
            <Area type="monotone" dataKey="resolved" stroke="#34d399" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">SLA Distribution</h2>
      <p className="mt-1 text-xs text-slate-500">Queue health snapshot for service operations.</p>
      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData.slice(-4)}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0" }} />
            <Bar dataKey="breached" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3">
        {activity.map((item) => (
          <div key={item} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/60 p-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
            <p className="text-sm text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EmptyState = () => (
  <section className="rounded-lg border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-cyan-300">
      <LifeBuoy className="h-6 w-6" />
    </div>
    <h2 className="mt-4 text-base font-semibold text-white">Ready for support data integration</h2>
    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
      This module is intentionally frontend-only. It provides the enterprise support surface without connecting tickets, chats, SLAs, or content APIs.
    </p>
  </section>
);

const SupportCenter = ({ mode = "tickets" }: { mode?: SupportMode }) => {
  const [query, setQuery] = useState("");
  const data = useMemo(() => {
    const activeRows = rows[mode] || rows.tickets;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return activeRows;
    return activeRows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(normalized)));
  }, [mode, query]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <AppBreadcrumbs />
        <Header mode={mode} />
        <Metrics />
        <Toolbar query={query} onQueryChange={setQuery} />
        <InsightPanels mode={mode} />
        <SupportTable data={data} />
        <EmptyState />
      </div>
    </div>
  );
};

export default SupportCenter;
