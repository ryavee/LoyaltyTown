import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BarChart3,
  CalendarClock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Megaphone,
  PackageSearch,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  Store,
  Truck,
  Upload,
  WalletCards,
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

type ReportsMode =
  | "sales"
  | "dealer"
  | "qr"
  | "inventory"
  | "campaign"
  | "warranty"
  | "financial"
  | "export-pdf"
  | "export-excel"
  | "scheduled";

type ReportRow = Record<string, string>;

const modeMeta: Record<ReportsMode, { title: string; subtitle: string; icon: typeof FileText }> = {
  sales: { title: "Sales Reports", subtitle: "Revenue, order, channel, regional, product, and sales performance report library.", icon: BarChart3 },
  dealer: { title: "Dealer Reports", subtitle: "Dealer performance, wallet engagement, claims, orders, and leaderboard report surfaces.", icon: Store },
  qr: { title: "QR Reports", subtitle: "QR generation, scan, lifecycle, counterfeit, duplicate, and GS1 report surfaces.", icon: QrCode },
  inventory: { title: "Inventory Reports", subtitle: "Stock, movement, aging, forecast, alerts, reservations, and warehouse report surfaces.", icon: PackageSearch },
  campaign: { title: "Campaign Reports", subtitle: "Campaign ROI, coupons, referrals, channel delivery, forms, and automation reports.", icon: Megaphone },
  warranty: { title: "Warranty Reports", subtitle: "Warranty registration, claim trends, service SLA, failure pattern, and dealer impact reports.", icon: ShieldCheck },
  financial: { title: "Financial Reports", subtitle: "Revenue, billing, collections, reward liability, cashback, and subscription reports.", icon: WalletCards },
  "export-pdf": { title: "Export PDF", subtitle: "PDF report export queue, templates, page setup, cover pages, and delivery status.", icon: FileText },
  "export-excel": { title: "Export Excel", subtitle: "Excel report export queue, sheets, columns, pivots, and data extract readiness.", icon: FileSpreadsheet },
  scheduled: { title: "Scheduled Reports", subtitle: "Recurring report schedules, recipients, delivery channels, frequency, and status.", icon: CalendarClock },
};

const rows: Record<ReportsMode, ReportRow[]> = {
  sales: [
    { id: "RPT-SAL-001", report: "Monthly Sales Summary", category: "Sales", cadence: "Monthly", owner: "Revenue Ops", format: "PDF + Excel", status: "Ready" },
    { id: "RPT-SAL-002", report: "Regional Sales Performance", category: "Sales", cadence: "Weekly", owner: "Sales Ops", format: "Excel", status: "Scheduled" },
    { id: "RPT-SAL-003", report: "Product Contribution", category: "Sales", cadence: "Monthly", owner: "Analytics", format: "PDF", status: "Draft" },
  ],
  dealer: [
    { id: "RPT-DEA-001", report: "Dealer Scorecard", category: "Dealer", cadence: "Weekly", owner: "Channel Ops", format: "PDF", status: "Ready" },
    { id: "RPT-DEA-002", report: "Dealer Wallet Activity", category: "Dealer", cadence: "Monthly", owner: "Loyalty", format: "Excel", status: "Scheduled" },
    { id: "RPT-DEA-003", report: "Dealer Claims Report", category: "Dealer", cadence: "Monthly", owner: "Warranty Ops", format: "PDF", status: "Review" },
  ],
  qr: [
    { id: "RPT-QR-001", report: "QR Scan Summary", category: "QR", cadence: "Daily", owner: "QR Ops", format: "Excel", status: "Ready" },
    { id: "RPT-QR-002", report: "Counterfeit Signals", category: "QR", cadence: "Weekly", owner: "Security", format: "PDF", status: "Review" },
    { id: "RPT-QR-003", report: "GS1 Digital Link Coverage", category: "QR", cadence: "Monthly", owner: "Manufacturing", format: "PDF + Excel", status: "Scheduled" },
  ],
  inventory: [
    { id: "RPT-INV-001", report: "Stock Position", category: "Inventory", cadence: "Daily", owner: "Warehouse Ops", format: "Excel", status: "Ready" },
    { id: "RPT-INV-002", report: "Inventory Aging", category: "Inventory", cadence: "Weekly", owner: "Supply Chain", format: "Excel", status: "Scheduled" },
    { id: "RPT-INV-003", report: "Low Stock Alerts", category: "Inventory", cadence: "Daily", owner: "Planning", format: "PDF", status: "Ready" },
  ],
  campaign: [
    { id: "RPT-CAM-001", report: "Campaign ROI", category: "Campaign", cadence: "Weekly", owner: "Marketing Ops", format: "PDF", status: "Ready" },
    { id: "RPT-CAM-002", report: "Coupon Claims", category: "Campaign", cadence: "Daily", owner: "Growth", format: "Excel", status: "Scheduled" },
    { id: "RPT-CAM-003", report: "WhatsApp Delivery", category: "Campaign", cadence: "Weekly", owner: "Lifecycle", format: "Excel", status: "Review" },
  ],
  warranty: [
    { id: "RPT-WAR-001", report: "Warranty Registrations", category: "Warranty", cadence: "Weekly", owner: "Warranty Ops", format: "PDF + Excel", status: "Ready" },
    { id: "RPT-WAR-002", report: "Claim SLA Report", category: "Warranty", cadence: "Monthly", owner: "Support Ops", format: "PDF", status: "Scheduled" },
    { id: "RPT-WAR-003", report: "Failure Pattern Report", category: "Warranty", cadence: "Monthly", owner: "Quality", format: "Excel", status: "Review" },
  ],
  financial: [
    { id: "RPT-FIN-001", report: "Revenue Summary", category: "Financial", cadence: "Monthly", owner: "Finance", format: "PDF", status: "Ready" },
    { id: "RPT-FIN-002", report: "Collections Aging", category: "Financial", cadence: "Weekly", owner: "Finance Ops", format: "Excel", status: "Scheduled" },
    { id: "RPT-FIN-003", report: "Reward Liability", category: "Financial", cadence: "Monthly", owner: "Loyalty Finance", format: "PDF + Excel", status: "Ready" },
  ],
  "export-pdf": [
    { id: "PDF-001", report: "Executive Pack", category: "PDF Export", cadence: "On demand", owner: "Leadership", format: "PDF", status: "Queued" },
    { id: "PDF-002", report: "Warranty SLA", category: "PDF Export", cadence: "Scheduled", owner: "Support Ops", format: "PDF", status: "Ready" },
    { id: "PDF-003", report: "Dealer Scorecard", category: "PDF Export", cadence: "Weekly", owner: "Channel Ops", format: "PDF", status: "Scheduled" },
  ],
  "export-excel": [
    { id: "XLS-001", report: "Inventory Extract", category: "Excel Export", cadence: "Daily", owner: "Supply Chain", format: "Excel", status: "Ready" },
    { id: "XLS-002", report: "QR Scan Raw Data", category: "Excel Export", cadence: "Daily", owner: "QR Ops", format: "Excel", status: "Queued" },
    { id: "XLS-003", report: "Billing Ledger", category: "Excel Export", cadence: "Monthly", owner: "Finance", format: "Excel", status: "Scheduled" },
  ],
  scheduled: [
    { id: "SCH-001", report: "Daily QR Scan Summary", category: "Schedule", cadence: "Daily 8:00 AM", owner: "QR Ops", format: "Excel", status: "Active" },
    { id: "SCH-002", report: "Weekly Dealer Scorecard", category: "Schedule", cadence: "Monday 9:00 AM", owner: "Channel Ops", format: "PDF", status: "Active" },
    { id: "SCH-003", report: "Monthly Finance Pack", category: "Schedule", cadence: "1st day", owner: "Finance", format: "PDF + Excel", status: "Paused" },
  ],
};

const trendData = [
  { month: "Jan", generated: 82, exported: 64, scheduled: 18 },
  { month: "Feb", generated: 96, exported: 74, scheduled: 24 },
  { month: "Mar", generated: 118, exported: 91, scheduled: 31 },
  { month: "Apr", generated: 142, exported: 108, scheduled: 39 },
  { month: "May", generated: 168, exported: 132, scheduled: 47 },
  { month: "Jun", generated: 204, exported: 161, scheduled: 58 },
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Ready: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Scheduled: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Queued: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-200",
  Paused: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Draft}`}>{value}</span>
);

const Header = ({ mode }: { mode: ReportsMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Reports Center</p>
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
    ["Reports", "204", FileText, "Generated this month"],
    ["PDF Exports", "84", FileText, "Ready templates"],
    ["Excel Exports", "161", FileSpreadsheet, "Data extracts"],
    ["Schedules", "58", CalendarClock, "Active jobs"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search reports" />
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

const ExportPanel = ({ mode }: { mode: ReportsMode }) => (
  <section className="grid gap-4 lg:grid-cols-3">
    {[
      [FileText, "PDF Layout", "Cover page, section breaks, headers, footers, and branded report template."],
      [FileSpreadsheet, "Excel Workbook", "Column visibility, multi-sheet export, pivot readiness, and extract controls."],
      [CalendarClock, "Schedule", "Recipients, frequency, timezone, delivery channel, and retry policy surfaces."],
    ].map(([Icon, title, detail]) => (
      <div key={title as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <Icon className="h-5 w-5 text-cyan-300" />
        <h2 className="mt-4 text-sm font-semibold text-white">{title as string}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{detail as string}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{modeMeta[mode].title}</p>
      </div>
    ))}
  </section>
);

const DataTable = ({ mode, filteredRows }: { mode: ReportsMode; filteredRows: ReportRow[] }) => {
  const columns = ["id", "report", "category", "cadence", "owner", "format", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{modeMeta[mode].title} Library</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable report table placeholder ready for backend report generation.</p>
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
        <span>Showing {filteredRows.length} reports</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const Charts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Generated and Exported</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="generated" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="exported" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Scheduled Jobs</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="scheduled" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const ReportsWorkspace = ({ mode = "sales" }: { mode?: ReportsMode }) => {
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
      {mode === "export-pdf" || mode === "export-excel" || mode === "scheduled" ? <ExportPanel mode={mode} /> : null}
      <DataTable mode={mode} filteredRows={filteredRows} />
      <Charts />
    </div>
  );
};

export default ReportsWorkspace;
