import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Boxes,
  CalendarClock,
  ClipboardList,
  Clock,
  Download,
  History,
  LineChart as LineChartIcon,
  PackageCheck,
  PackageSearch,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Warehouse,
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

type InventoryMode =
  | "dashboard"
  | "current-stock"
  | "movements"
  | "alerts"
  | "forecast"
  | "reservations"
  | "adjustments"
  | "history"
  | "analytics"
  | "ai-suggestions";

const stockRows = [
  { id: "STK-1001", sku: "ADH-PRO-20KG", product: "Industrial Adhesive Pro", warehouse: "Central Warehouse", available: "18,420", reserved: "2,180", status: "Healthy" },
  { id: "STK-1002", sku: "PNT-SQR-10L", product: "Smart QR Paint Bucket", warehouse: "West Warehouse", available: "42,810", reserved: "8,600", status: "Healthy" },
  { id: "STK-1003", sku: "LAM-PRM-8X4", product: "Premium Laminate Sheet", warehouse: "South Warehouse", available: "9,640", reserved: "4,120", status: "Low Stock" },
  { id: "STK-1004", sku: "KIT-CON-12", product: "Contractor Tool Kit", warehouse: "Returns Hub", available: "1,284", reserved: "316", status: "Review" },
];

const movementRows = [
  { id: "MOV-8841", sku: "ADH-PRO-20KG", type: "Inbound", quantity: "+4,200", source: "Factory A", destination: "Central Warehouse", status: "Posted" },
  { id: "MOV-8842", sku: "PNT-SQR-10L", type: "Reservation", quantity: "-8,600", source: "West Warehouse", destination: "Dealer Orders", status: "Reserved" },
  { id: "MOV-8843", sku: "LAM-PRM-8X4", type: "Adjustment", quantity: "-28", source: "Cycle Count", destination: "South Warehouse", status: "Review" },
  { id: "MOV-8844", sku: "KIT-CON-12", type: "Return", quantity: "+316", source: "RMA Hub", destination: "Returns Inspection", status: "Inspection" },
];

const alerts = [
  { id: "ALT-001", title: "Laminate stock below reorder point", severity: "High", owner: "Inventory Planning", age: "18 min" },
  { id: "ALT-002", title: "Reservation spike for paint bucket SKU", severity: "Medium", owner: "Demand Team", age: "42 min" },
  { id: "ALT-003", title: "Cycle count variance requires approval", severity: "Medium", owner: "Warehouse Ops", age: "1 hr" },
  { id: "ALT-004", title: "Returns inspection capacity nearing limit", severity: "Low", owner: "RMA Team", age: "3 hr" },
];

const trendData = [
  { week: "W1", stock: 72, reserved: 18, forecast: 78, alerts: 4 },
  { week: "W2", stock: 76, reserved: 22, forecast: 82, alerts: 6 },
  { week: "W3", stock: 69, reserved: 26, forecast: 86, alerts: 9 },
  { week: "W4", stock: 81, reserved: 24, forecast: 88, alerts: 5 },
  { week: "W5", stock: 84, reserved: 31, forecast: 92, alerts: 7 },
  { week: "W6", stock: 79, reserved: 35, forecast: 96, alerts: 8 },
];

const aiSuggestions = [
  "Move 2,400 units of LAM-PRM-8X4 from Central Warehouse to South Warehouse to prevent a 9-day stockout.",
  "Increase reorder point for PNT-SQR-10L by 14% during campaign window based on reservation velocity.",
  "Convert 316 returned KIT-CON-12 units into inspection priority queue before contractor demand spike.",
  "Reduce ADH-PRO-20KG safety stock in West Warehouse by 6% without increasing stockout risk.",
];

const history = [
  ["Stock reservation created", "Order wave ORD-9012", "Today, 10:12 AM"],
  ["Cycle count posted", "South Warehouse", "Today, 9:44 AM"],
  ["Forecast recalculated", "AI Planning", "Yesterday, 6:30 PM"],
  ["Adjustment approval requested", "Warehouse Ops", "Yesterday, 4:18 PM"],
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const titleMap: Record<InventoryMode, string> = {
  dashboard: "Inventory Dashboard",
  "current-stock": "Current Stock",
  movements: "Movements",
  alerts: "Alerts",
  forecast: "Forecast",
  reservations: "Reservations",
  adjustments: "Adjustments",
  history: "Inventory History",
  analytics: "Inventory Analytics",
  "ai-suggestions": "AI Suggestions",
};

const chartTooltip = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    Posted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    Reserved: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    Inspection: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    "Low Stock": "border-rose-400/20 bg-rose-400/10 text-rose-200",
    High: "border-rose-400/20 bg-rose-400/10 text-rose-200",
    Medium: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    Low: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  };

  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${styles[status] || styles.Review}`}>{status}</span>;
};

const Header = ({ mode }: { mode: InventoryMode }) => (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <PackageSearch className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Inventory Intelligence</p>
          <h1 className="mt-1 text-3xl font-semibold text-white">{titleMap[mode]}</h1>
        </div>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
        Enterprise inventory command center for stock visibility, movements, alerts, forecast, reservations, adjustments, history, analytics, and AI recommendations.
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Link to="/inventory/ai-suggestions" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Bot className="h-4 w-4" />
        AI Suggestions
      </Link>
      <Link to="/inventory/analytics" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>
    </div>
  </div>
);

const Metrics = () => {
  const metrics = [
    ["Current Stock", "72.1M", Boxes, "All warehouses"],
    ["Reserved", "15.2M", PackageCheck, "Open order demand"],
    ["Active Alerts", "28", AlertTriangle, "4 high priority"],
    ["Forecast Accuracy", "94.6%", TrendingUp, "6 week horizon"],
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

const DataTable = ({ title, icon: Icon, columns, rows }) => (
  <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
    <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-300" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
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
      {rows.map((row) => (
        <div key={row.id} className="grid min-w-[980px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => {
            const key = column.toLowerCase().replace(/\s+/g, "");
            const value = row[key] ?? row[column.toLowerCase()] ?? row[column] ?? "";
            return <span key={column}>{column === "Status" || column === "Severity" ? <StatusBadge status={value} /> : value}</span>;
          })}
        </div>
      ))}
    </div>
  </section>
);

const Charts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Stock and Forecast</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Area dataKey="stock" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="forecast" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Reservations and Alerts</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="reserved" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="alerts" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const Dashboard = () => (
  <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
    <Charts />
    <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-cyan-200" />
        <h2 className="text-sm font-semibold text-white">AI Suggestions</h2>
      </div>
      <div className="mt-4 space-y-3">
        {aiSuggestions.slice(0, 4).map((suggestion) => (
          <div key={suggestion} className="rounded-md border border-cyan-400/10 bg-slate-950/50 p-3 text-sm leading-6 text-cyan-50/90">
            {suggestion}
          </div>
        ))}
      </div>
    </section>
  </div>
);

const HistoryPanel = () => (
  <section className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
    <div className="mb-4 flex items-center gap-2">
      <History className="h-4 w-4 text-cyan-300" />
      <h2 className="text-sm font-semibold text-white">Inventory History</h2>
    </div>
    <div className="space-y-3">
      {history.map(([event, context, time]) => (
        <div key={`${event}-${time}`} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">{event}</p>
            <p className="mt-1 text-xs text-slate-500">{context} - {time}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Suggestions = () => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4 text-cyan-200" />
        <h2 className="text-sm font-semibold text-white">AI Suggestions</h2>
      </div>
      <div className="mt-4 space-y-3">
        {aiSuggestions.map((suggestion) => (
          <div key={suggestion} className="rounded-md border border-cyan-400/10 bg-slate-950/50 p-4 text-sm leading-6 text-cyan-50/90">
            {suggestion}
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <LineChartIcon className="h-6 w-6 text-cyan-300" />
      <h3 className="mt-4 text-sm font-semibold text-white">Suggestion Signals</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">Forecast variance, reservation velocity, reorder points, warehouse capacity, and movement history are represented as frontend-only intelligence signals.</p>
    </div>
  </section>
);

const InventoryIntelligence = ({ mode = "dashboard" }: { mode?: InventoryMode }) => {
  const [query, setQuery] = useState("");

  const table = useMemo(() => {
    if (mode === "current-stock" || mode === "reservations") {
      return {
        title: mode === "reservations" ? "Reservations" : "Current Stock",
        icon: mode === "reservations" ? CalendarClock : Warehouse,
        columns: ["ID", "SKU", "Product", "Warehouse", "Available", "Reserved", "Status"],
        rows: stockRows,
      };
    }
    if (mode === "movements" || mode === "adjustments") {
      return {
        title: mode === "adjustments" ? "Adjustments" : "Movements",
        icon: mode === "adjustments" ? Settings2 : ClipboardList,
        columns: ["ID", "SKU", "Type", "Quantity", "Source", "Destination", "Status"],
        rows: movementRows,
      };
    }
    if (mode === "alerts") {
      return {
        title: "Alerts",
        icon: AlertTriangle,
        columns: ["ID", "Title", "Severity", "Owner", "Age"],
        rows: alerts,
      };
    }
    return null;
  }, [mode]);

  const filteredRows = useMemo(() => {
    if (!table) return [];
    const q = query.trim().toLowerCase();
    if (!q) return table.rows;
    return table.rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [query, table]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics />

      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "forecast" || mode === "analytics" ? <Charts /> : null}
      {mode === "history" ? <HistoryPanel /> : null}
      {mode === "ai-suggestions" ? <Suggestions /> : null}
      {table ? (
        <>
          <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className={`${fieldClass} pl-9`} placeholder={`Search ${table.title.toLowerCase()}`} />
            </label>
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
          <DataTable {...table} rows={filteredRows} />
        </>
      ) : null}
    </div>
  );
};

export default InventoryIntelligence;
