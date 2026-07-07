import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Boxes, CalendarClock, Factory, LineChart, PackageCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

type CloudRow = {
  id: string;
  name: string;
  owner: string;
  location: string;
  metric: string;
  status: string;
  detail?: string;
};

type ManufacturerCloudPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: Array<{ label: string; value: string; change: string; tone: "cyan" | "emerald" | "violet" | "amber" | "rose" }>;
  rows: CloudRow[];
  focus: string[];
  highlights?: string[];
};

export const manufacturerCloudRows: CloudRow[] = [
  { id: "MFG-1001", name: "Pune Smart Factory", owner: "Himalaya Pumps", location: "Pune, India", metric: "94% utilization", status: "Healthy", detail: "Shift output above target" },
  { id: "MFG-1002", name: "Eco Motor X2", owner: "Product Ops", location: "Global SKU", metric: "18.2M scans", status: "Active", detail: "QR activation accelerating" },
  { id: "MFG-1003", name: "North Warehouse", owner: "Supply Chain", location: "Delhi NCR", metric: "42K units", status: "Watch", detail: "Space pressure building" },
  { id: "MFG-1004", name: "QC Hold Queue", owner: "Quality Team", location: "Mumbai Plant", metric: "128 units", status: "Review", detail: "Recheck required" },
];

export const defaultStats = [
  { label: "Active Workflows", value: "248", change: "+18 this week", tone: "cyan" as const },
  { label: "Open Tasks", value: "1,284", change: "92% within SLA", tone: "emerald" as const },
  { label: "Network Signals", value: "18.2M", change: "QR and ERP events", tone: "violet" as const },
  { label: "Risk Alerts", value: "128", change: "32 high priority", tone: "amber" as const },
];

const focusIcons = [Factory, PackageCheck, ShieldCheck, Boxes, CalendarClock, LineChart];

const toneForStatus = (status: string) => {
  if (status === "Healthy" || status === "Active") return "success";
  if (status === "Watch" || status === "At Risk") return "warning";
  if (status === "Review" || status === "Critical") return "danger";
  return "info";
};

export default function ManufacturerCloudPage({ title, description, icon: Icon, stats, rows, focus, highlights }: ManufacturerCloudPageProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = !query || [row.name, row.owner, row.location, row.metric, row.status, row.detail].some((value) => value?.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const statusOptions = ["All", ...Array.from(new Set(rows.map((row) => row.status)))];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manufacturer Cloud"
        title={title}
        description={description}
        actions={
          <>
            <button className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Export</button>
            <button className="h-10 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Create Record</button>
          </>
        }
      />

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 text-white shadow-[0_22px_70px_-28px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Investor-ready operating view
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{title} is positioned as a premium control tower for manufacturing, QR, and fulfillment operations.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            The experience combines real-time operational context, intelligent workflow visibility, and a polished executive narrative for clients, partners, and board-level reviews.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(highlights ?? ["QR + ERP convergence", "AI-assisted decision support", "Premium client reporting"]).map((item) => (
              <span key={item} className="rounded-full border border-cyan-400/30 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-100">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">Live operating pulse</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Next review", value: "09:30 AM shift sync" },
              { label: "Open approvals", value: "24 pending" },
              { label: "Client signal", value: "+11% engagement uplift" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} icon={Icon} />)}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {focus.map((item, index) => {
          const FocusIcon = focusIcons[index % focusIcons.length];
          return (
            <article key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                <FocusIcon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Refined demo content for operational planning, compliance, and executive storytelling.</p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{title} Records</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Mock operational records for premium product storytelling.</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
              <Search className="h-4 w-4" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search records" className="w-36 bg-transparent outline-none" />
            </label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200">
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataTable<CloudRow>
          rows={visibleRows}
          columns={[
            { key: "name", header: "Name" },
            { key: "owner", header: "Owner" },
            { key: "location", header: "Location" },
            { key: "metric", header: "Metric", align: "right" },
            {
              key: "status",
              header: "Status",
              render: (row) => <StatusBadge status={row.status} tone={toneForStatus(row.status)} />,
            },
          ]}
        />
      </section>
    </div>
  );
}
