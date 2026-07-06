import { useMemo, useState } from "react";
import {
  Bell,
  Bot,
  Clock,
  Download,
  FileText,
  Filter,
  History,
  Inbox,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  Smartphone,
  Upload,
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

type NotificationMode =
  | "inbox"
  | "push"
  | "email"
  | "sms"
  | "whatsapp"
  | "templates"
  | "automation"
  | "history"
  | "logs";

type NotificationRow = Record<string, string>;

const modeMeta: Record<NotificationMode, { title: string; subtitle: string; icon: typeof Bell }> = {
  inbox: { title: "Inbox", subtitle: "Unified notification inbox for operational, marketing, system, and support messages.", icon: Inbox },
  push: { title: "Push", subtitle: "Push notification campaigns, device targeting, delivery state, and engagement surfaces.", icon: Smartphone },
  email: { title: "Email", subtitle: "Transactional and lifecycle email notifications, templates, queues, and delivery status.", icon: Mail },
  sms: { title: "SMS", subtitle: "SMS notification queues, OTP events, service alerts, and delivery monitoring.", icon: Send },
  whatsapp: { title: "WhatsApp", subtitle: "WhatsApp notification messages, approved templates, delivery tracking, and webhooks.", icon: MessageCircle },
  templates: { title: "Templates", subtitle: "Reusable notification templates, localization, channel variants, and approval status.", icon: FileText },
  automation: { title: "Automation", subtitle: "Notification automation journeys, triggers, routing rules, wait steps, and fallbacks.", icon: Bot },
  history: { title: "History", subtitle: "Notification history across inbox, push, email, SMS, WhatsApp, and system events.", icon: History },
  logs: { title: "Logs", subtitle: "Delivery logs, provider responses, retries, failures, and operational traceability.", icon: Clock },
};

const rows: Record<NotificationMode, NotificationRow[]> = {
  inbox: [
    { id: "INB-001", message: "Warranty registration completed", channel: "Inbox", audience: "Support", owner: "System", status: "Unread" },
    { id: "INB-002", message: "Dealer scorecard ready", channel: "Inbox", audience: "Channel Ops", owner: "Reports", status: "Read" },
    { id: "INB-003", message: "QR anomaly needs review", channel: "Inbox", audience: "Security", owner: "AI Platform", status: "Priority" },
  ],
  push: [
    { id: "PSH-001", message: "Reward unlocked", channel: "Push", audience: "Consumers", owner: "Lifecycle", status: "Scheduled" },
    { id: "PSH-002", message: "Offer expiry reminder", channel: "Push", audience: "Retailers", owner: "Marketing", status: "Live" },
    { id: "PSH-003", message: "Warranty claim update", channel: "Push", audience: "Consumers", owner: "Support", status: "Draft" },
  ],
  email: [
    { id: "EML-001", message: "Monthly dealer digest", channel: "Email", audience: "Dealers", owner: "Content", status: "Scheduled" },
    { id: "EML-002", message: "Invoice notification", channel: "Email", audience: "Distributors", owner: "Finance", status: "Live" },
    { id: "EML-003", message: "Warranty education", channel: "Email", audience: "Consumers", owner: "Lifecycle", status: "Draft" },
  ],
  sms: [
    { id: "SMS-001", message: "OTP verification", channel: "SMS", audience: "Consumers", owner: "Security", status: "Live" },
    { id: "SMS-002", message: "Dispatch alert", channel: "SMS", audience: "Dealers", owner: "Supply Chain", status: "Scheduled" },
    { id: "SMS-003", message: "Coupon expiry", channel: "SMS", audience: "Retailers", owner: "Marketing", status: "Draft" },
  ],
  whatsapp: [
    { id: "WSP-001", message: "Reward reminder", channel: "WhatsApp", audience: "Consumers", owner: "Lifecycle", status: "Live" },
    { id: "WSP-002", message: "Dealer order update", channel: "WhatsApp", audience: "Dealers", owner: "Sales Ops", status: "Scheduled" },
    { id: "WSP-003", message: "Support ticket update", channel: "WhatsApp", audience: "Customers", owner: "Support", status: "Review" },
  ],
  templates: [
    { id: "TPL-001", message: "OTP Template", channel: "SMS", audience: "Consumers", owner: "Security", status: "Approved" },
    { id: "TPL-002", message: "Reward Reminder", channel: "WhatsApp", audience: "Consumers", owner: "Lifecycle", status: "Approved" },
    { id: "TPL-003", message: "Dealer Digest", channel: "Email", audience: "Dealers", owner: "Content", status: "Review" },
  ],
  automation: [
    { id: "AUT-001", message: "QR scan follow-up", channel: "Multi-channel", audience: "Consumers", owner: "Lifecycle", status: "Live" },
    { id: "AUT-002", message: "Dealer inactivity journey", channel: "Email + WhatsApp", audience: "Dealers", owner: "Channel Ops", status: "Draft" },
    { id: "AUT-003", message: "Warranty claim updates", channel: "Push + SMS", audience: "Consumers", owner: "Support", status: "Live" },
  ],
  history: [
    { id: "HIS-001", message: "Reward reminder delivered", channel: "WhatsApp", audience: "Consumers", owner: "Lifecycle", status: "Delivered" },
    { id: "HIS-002", message: "OTP delivered", channel: "SMS", audience: "Consumer", owner: "Security", status: "Delivered" },
    { id: "HIS-003", message: "Dealer digest opened", channel: "Email", audience: "Dealers", owner: "Content", status: "Opened" },
  ],
  logs: [
    { id: "LOG-001", message: "Provider accepted", channel: "SMS", audience: "System", owner: "Provider", status: "Success" },
    { id: "LOG-002", message: "Webhook retry", channel: "WhatsApp", audience: "System", owner: "Provider", status: "Retry" },
    { id: "LOG-003", message: "Email bounced", channel: "Email", audience: "System", owner: "Provider", status: "Failed" },
  ],
};

const trendData = [
  { month: "Jan", sent: 42, delivered: 38, failed: 2 },
  { month: "Feb", sent: 54, delivered: 49, failed: 3 },
  { month: "Mar", sent: 68, delivered: 62, failed: 4 },
  { month: "Apr", sent: 82, delivered: 75, failed: 4 },
  { month: "May", sent: 96, delivered: 89, failed: 5 },
  { month: "Jun", sent: 118, delivered: 111, failed: 4 },
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Live: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Delivered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Scheduled: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Read: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Opened: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Retry: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-200",
  Unread: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Priority: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Failed: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Draft}`}>{value}</span>
);

const Header = ({ mode }: { mode: NotificationMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Messaging Center</p>
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
    ["Inbox", "1,284", Inbox, "42 priority"],
    ["Sent", "118K", Send, "This month"],
    ["Delivered", "94.1%", Bell, "Across channels"],
    ["Automations", "36", Bot, "Active journeys"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search messages, templates, and logs" />
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

const ChannelPanel = ({ mode }: { mode: NotificationMode }) => (
  <section className="grid gap-4 lg:grid-cols-3">
    {[
      ["Audience", "Segment targeting, consent state, locale, tenant, and role-based recipient groups."],
      ["Delivery", "Provider status, throttling, retries, fallback channels, and queue visibility."],
      ["Compliance", "Template approval, opt-in policy, audit history, and traceable delivery logs."],
    ].map(([title, detail]) => (
      <div key={title} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <Bell className="h-5 w-5 text-cyan-300" />
        <h2 className="mt-4 text-sm font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{modeMeta[mode].title}</p>
      </div>
    ))}
  </section>
);

const DataTable = ({ mode, filteredRows }: { mode: NotificationMode; filteredRows: NotificationRow[] }) => {
  const columns = ["id", "message", "channel", "audience", "owner", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{modeMeta[mode].title} Records</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable messaging table placeholder ready for backend delivery APIs.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[920px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {filteredRows.map((row) => (
          <div key={row.id} className="grid min-w-[920px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
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
      <h2 className="text-sm font-semibold text-white">Delivery Trend</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="sent" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="delivered" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Failures</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="failed" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const NotificationsWorkspace = ({ mode = "inbox" }: { mode?: NotificationMode }) => {
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
      <ChannelPanel mode={mode} />
      <DataTable mode={mode} filteredRows={filteredRows} />
      <Charts />
    </div>
  );
};

export default NotificationsWorkspace;
