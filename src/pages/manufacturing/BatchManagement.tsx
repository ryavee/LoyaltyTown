import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  Archive,
  BarChart3,
  Boxes,
  CalendarClock,
  CheckCircle2,
  Clock,
  Factory,
  FileText,
  Layers3,
  PackageCheck,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
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

type BatchMode =
  | "dashboard"
  | "list"
  | "create"
  | "details"
  | "assign-factory"
  | "assign-warehouse"
  | "generate"
  | "print-summary"
  | "history"
  | "analytics";

const batches = [
  {
    id: "BCH-2026-001",
    product: "Industrial Adhesive Pro",
    sku: "ADH-PRO-20KG",
    status: "Generated",
    factory: "Factory A - Pune",
    warehouse: "Central Warehouse",
    quantity: "18,420",
    qr: "18,420",
    created: "Jul 01, 2026",
    expiry: "Jan 01, 2028",
  },
  {
    id: "BCH-2026-002",
    product: "Smart QR Paint Bucket",
    sku: "PNT-SQR-10L",
    status: "Assigned",
    factory: "Factory B - Gujarat",
    warehouse: "West Warehouse",
    quantity: "42,810",
    qr: "Pending",
    created: "Jun 28, 2026",
    expiry: "Jun 28, 2027",
  },
  {
    id: "BCH-2026-003",
    product: "Premium Laminate Sheet",
    sku: "LAM-PRM-8X4",
    status: "In Review",
    factory: "Factory C - Chennai",
    warehouse: "South Warehouse",
    quantity: "9,640",
    qr: "9,640",
    created: "Jun 24, 2026",
    expiry: "Jun 24, 2031",
  },
  {
    id: "BCH-2026-004",
    product: "Contractor Tool Kit",
    sku: "KIT-CON-12",
    status: "Archived",
    factory: "Factory A - Pune",
    warehouse: "North Warehouse",
    quantity: "1,284",
    qr: "1,284",
    created: "Jun 18, 2026",
    expiry: "Dec 18, 2027",
  },
];

const timeline = [
  ["Batch created", "Manufacturing Admin", "Jul 01, 2026 09:10"],
  ["Factory assignment approved", "Factory Supervisor", "Jul 01, 2026 10:25"],
  ["Warehouse assigned", "Warehouse Ops", "Jul 01, 2026 11:40"],
  ["QR generation completed", "QR Service", "Jul 01, 2026 12:12"],
  ["Print summary prepared", "System", "Jul 01, 2026 12:18"],
];

const chartData = [
  { month: "Jan", generated: 24, assigned: 18, archived: 3 },
  { month: "Feb", generated: 28, assigned: 22, archived: 4 },
  { month: "Mar", generated: 36, assigned: 26, archived: 4 },
  { month: "Apr", generated: 42, assigned: 34, archived: 5 },
  { month: "May", generated: 48, assigned: 39, archived: 7 },
  { month: "Jun", generated: 57, assigned: 44, archived: 8 },
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Generated: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    Assigned: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    "In Review": "border-amber-400/20 bg-amber-400/10 text-amber-200",
    Archived: "border-slate-700 bg-slate-800 text-slate-300",
  };

  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${styles[status] || styles.Assigned}`}>{status}</span>;
};

const Header = ({ mode }: { mode: BatchMode }) => {
  const titles: Record<BatchMode, string> = {
    dashboard: "Batch Management Dashboard",
    list: "Batch List",
    create: "Create Batch",
    details: "Batch Details",
    "assign-factory": "Assign Factory",
    "assign-warehouse": "Assign Warehouse",
    generate: "Generate Batch",
    "print-summary": "Print Summary",
    history: "Batch History",
    analytics: "Batch Analytics",
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Layers3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Manufacturing</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{titles[mode]}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Enterprise batch workspace for factory assignment, warehouse allocation, generation, print summary, status tracking, timeline, and audit evidence.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/batch-management/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Plus className="h-4 w-4" />
          Create Batch
        </Link>
        <Link to="/batch-management/analytics" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </Link>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["Total Batches", "18,420", Layers3],
    ["Generated", "12,860", QrCode],
    ["Assigned Factories", "48", Factory],
    ["Warehouse Ready", "91.4%", Warehouse],
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, Icon]) => (
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
        </div>
      ))}
    </section>
  );
};

const StatusTracking = ({ batch }) => {
  const steps = ["Created", "Factory Assigned", "Warehouse Assigned", "Generated", "Printed"];
  const activeIndex = batch.status === "Archived" ? 4 : batch.status === "Generated" ? 3 : batch.status === "Assigned" ? 2 : 1;

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-cyan-300" />
        <h2 className="text-sm font-semibold text-white">Status Tracking</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className={`rounded-lg border p-3 ${index <= activeIndex ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-100" : "border-slate-800 bg-slate-900 text-slate-500"}`}>
            <div className="flex items-center gap-2">
              {index <= activeIndex ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              <span className="text-sm font-semibold">{step}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BatchTable = ({ rows }) => (
  <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
    <div className="grid min-w-[980px] grid-cols-[1.1fr_1.2fr_1fr_120px_1fr_160px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
      <span>Batch</span>
      <span>Product</span>
      <span>Factory</span>
      <span>Status</span>
      <span>Quantity</span>
      <span className="text-right">Actions</span>
    </div>
    <div className="overflow-x-auto">
      {rows.map((batch) => (
        <div key={batch.id} className="grid min-w-[980px] grid-cols-[1.1fr_1.2fr_1fr_120px_1fr_160px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0">
          <div>
            <p className="font-semibold text-white">{batch.id}</p>
            <p className="mt-1 text-xs text-slate-500">{batch.created}</p>
          </div>
          <div>
            <p>{batch.product}</p>
            <p className="mt-1 text-xs text-slate-500">{batch.sku}</p>
          </div>
          <span>{batch.factory}</span>
          <StatusBadge status={batch.status} />
          <span>{batch.quantity}</span>
          <div className="flex justify-end gap-1">
            <Link to={`/batch-management/${batch.id}`} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><FileText className="h-4 w-4" /></Link>
            <Link to={`/batch-management/${batch.id}/assign-factory`} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><Factory className="h-4 w-4" /></Link>
            <Link to={`/batch-management/${batch.id}/assign-warehouse`} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><Warehouse className="h-4 w-4" /></Link>
            <Link to={`/batch-management/${batch.id}/print-summary`} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><Printer className="h-4 w-4" /></Link>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const TimelineAudit = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Timeline</h2>
      <div className="mt-4 space-y-3">
        {timeline.map(([event, actor, time]) => (
          <div key={`${event}-${time}`} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{event}</p>
              <p className="mt-1 text-xs text-slate-500">{actor} - {time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Audit</h2>
      <div className="mt-4 space-y-3">
        {["Permission check passed", "Factory assignment logged", "Warehouse assignment logged", "QR generation checksum recorded", "Print summary hash stored"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Charts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Batch Generation Trend</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="generated" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Assignment Analytics</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="assigned" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="archived" fill="#64748b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const FormPanel = ({ mode, batch }) => {
  const titles: Record<string, string> = {
    create: "Create Batch",
    "assign-factory": "Assign Factory",
    "assign-warehouse": "Assign Warehouse",
    generate: "Generate Batch",
    "print-summary": "Print Summary",
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <div className="mb-4 flex items-center gap-2">
          <PackageCheck className="h-4 w-4 text-cyan-300" />
          <h2 className="text-sm font-semibold text-white">{titles[mode]}</h2>
        </div>
        {mode === "print-summary" ? (
          <div className="rounded-lg border border-slate-800 bg-white p-6 text-slate-950">
            <h3 className="text-lg font-bold">Batch Print Summary</h3>
            <p className="mt-2 text-sm">Batch: {batch.id}</p>
            <p className="text-sm">Product: {batch.product}</p>
            <p className="text-sm">Quantity: {batch.quantity}</p>
            <p className="text-sm">QR Count: {batch.qr}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Batch ID</span>
              <input className={fieldClass} defaultValue={mode === "create" ? "" : batch.id} />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Product / SKU</span>
              <input className={fieldClass} defaultValue={mode === "create" ? "" : batch.sku} />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Factory</span>
              <select className={fieldClass} defaultValue={batch.factory}>
                <option>Factory A - Pune</option>
                <option>Factory B - Gujarat</option>
                <option>Factory C - Chennai</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Warehouse</span>
              <select className={fieldClass} defaultValue={batch.warehouse}>
                <option>Central Warehouse</option>
                <option>West Warehouse</option>
                <option>South Warehouse</option>
                <option>North Warehouse</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Quantity</span>
              <input className={fieldClass} defaultValue={batch.quantity} />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Expiry Date</span>
              <input className={fieldClass} defaultValue={batch.expiry} />
            </label>
          </div>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <Link to="/batch-management" className="inline-flex h-10 items-center rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">Cancel</Link>
          <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
            {mode === "print-summary" ? <Printer className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {mode === "print-summary" ? "Print" : "Save"}
          </button>
        </div>
      </div>
      <BatchDetailsCard batch={batch} />
    </section>
  );
};

const BatchDetailsCard = ({ batch }) => (
  <aside className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Layers3 className="h-7 w-7" />
    </div>
    <h2 className="mt-4 text-lg font-semibold text-white">{batch.id}</h2>
    <p className="mt-1 text-sm text-slate-500">{batch.product}</p>
    <div className="mt-4 grid grid-cols-2 gap-3">
      {[
        ["Status", batch.status],
        ["Factory", batch.factory],
        ["Warehouse", batch.warehouse],
        ["Quantity", batch.quantity],
        ["QR Count", batch.qr],
        ["Expiry", batch.expiry],
      ].map(([label, value]) => (
        <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-medium text-slate-200">{value}</p>
        </div>
      ))}
    </div>
  </aside>
);

const BatchManagement = ({ mode = "list" }: { mode?: BatchMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const batch = batches.find((item) => item.id === id) || batches[0];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return batches;
    return batches.filter((item) => [item.id, item.product, item.sku, item.factory, item.warehouse, item.status].some((value) => value.toLowerCase().includes(q)));
  }, [query]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics />

      {mode === "dashboard" || mode === "analytics" ? <Charts /> : null}

      {mode === "list" ? (
        <>
          <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search batch, SKU, factory, warehouse, status" />
            </label>
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
          <BatchTable rows={filtered} />
        </>
      ) : null}

      {mode === "details" ? (
        <>
          <StatusTracking batch={batch} />
          <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <TimelineAudit />
            <BatchDetailsCard batch={batch} />
          </section>
        </>
      ) : null}

      {["create", "assign-factory", "assign-warehouse", "generate", "print-summary"].includes(mode) ? <FormPanel mode={mode} batch={batch} /> : null}
      {mode === "history" ? <TimelineAudit /> : null}
    </div>
  );
};

export default BatchManagement;
