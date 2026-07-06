import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bot,
  Boxes,
  Building2,
  CalendarDays,
  Download,
  FileBarChart,
  Gift,
  LineChart as LineChartIcon,
  Megaphone,
  Package,
  QrCode,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  ActivityFeed,
  Badge,
  ChartCard,
  DashboardWidget,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  PageToolbar,
} from "../../Components/enterprise";
import type { DataTableColumn, EnterpriseTone, TimelineItem } from "../../Components/enterprise";
import {
  manufacturerAiInsights,
  manufacturerDashboardKpis,
  manufacturerDealerPerformance,
  manufacturerQuickActions,
  manufacturerRecentActivities,
  manufacturerRecentQrBatches,
  manufacturerRegionScans,
  manufacturerTopDealers,
  manufacturerTopProducts,
  manufacturerTopRegions,
  manufacturerTrendData,
  manufacturerWarrantyClaims,
} from "../../data/manufacturerAdminDemoData";

type DemoRow = Record<string, string>;

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Bot,
  Boxes,
  FileBarChart,
  Gift,
  LineChart: LineChartIcon,
  Megaphone,
  Package,
  QrCode,
  ScanLine,
  ShieldCheck,
  Store,
  Truck,
  Users,
  WalletCards,
};

const tooltipStyle = {
  contentStyle: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
  },
  labelStyle: { color: "#f8fafc" },
};

const resolveIcon = (name: string) => iconMap[name] || Sparkles;

const statusTone = (status: string): EnterpriseTone => {
  if (["Ahead", "Approved", "Elite", "Generated", "Leading"].includes(status)) return "success";
  if (["Growth", "Printed", "Review", "Submitted", "Watch"].includes(status)) return "warning";
  if (["Mapped", "Stable"].includes(status)) return "info";
  return "default";
};

const columnsFor = (keys: string[]): DataTableColumn<DemoRow>[] =>
  keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1"),
    accessor: key,
    sortable: true,
    cell: (row) => (key === "status" ? <ManufacturerStatusBadge status={row[key]} /> : row[key]),
  }));

const kpiItems = manufacturerDashboardKpis.map((item) => ({
  ...item,
  icon: resolveIcon(item.icon),
}));

const activityItems: TimelineItem[] = manufacturerRecentActivities.map((activity) => ({
  ...activity,
  icon: resolveIcon(activity.icon),
  tone: activity.tone as EnterpriseTone,
}));

export const ManufacturerStatusBadge = ({ status }: { status: string }) => (
  <Badge tone={statusTone(status)}>{status}</Badge>
);

export const ManufacturerKpiGrid = () => <KPIGrid items={kpiItems} />;

export const ManufacturerChartCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <ChartCard title={title} description={description} framed={false} minHeight="300px" contentClassName="h-[300px]">
    {children}
  </ChartCard>
);

export const ManufacturerAIInsights = () => (
  <DashboardWidget
    title="AI Insights"
    subtitle="Static predictive signals prepared for future AI service integration."
    actions={<Sparkles className="h-5 w-5 text-cyan-200" />}
    className="border-cyan-400/20 bg-cyan-400/10"
  >
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {manufacturerAiInsights.map((insight) => (
        <article key={insight.id} className="rounded-md border border-cyan-400/10 bg-slate-950/60 p-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
            <Badge tone={insight.severity === "Risk" || insight.severity === "Investigate" ? "danger" : "info"}>
              {insight.severity}
            </Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-cyan-50/80">{insight.detail}</p>
        </article>
      ))}
    </div>
  </DashboardWidget>
);

export const ManufacturerQuickActions = () => (
  <DashboardWidget title="Quick Actions" subtitle="Common manufacturer admin workflows.">
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {manufacturerQuickActions.map((action) => {
        const Icon = resolveIcon(action.icon);
        return (
          <Link
            key={action.id}
            to={action.route}
            className="enterprise-transition flex min-h-12 items-center gap-3 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-cyan-400/30 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          >
            <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
            <span>{action.label}</span>
          </Link>
        );
      })}
    </div>
  </DashboardWidget>
);

export const ManufacturerActivityFeed = () => (
  <DashboardWidget title="Recent Activity" subtitle="Latest operational activity across product cloud workflows.">
    <ActivityFeed items={activityItems} />
  </DashboardWidget>
);

const TableCard = ({ title, subtitle, rows, columns }: { title: string; subtitle: string; rows: DemoRow[]; columns: DataTableColumn<DemoRow>[] }) => (
  <DashboardWidget title={title} subtitle={subtitle} className="min-w-0">
    {rows.length ? (
      <EnterpriseDataTable
        rows={rows}
        columns={columns}
        title={title}
        description={subtitle}
        showExportPlaceholder
        pagination={{ page: 1, pageCount: 1, totalLabel: `${rows.length} demo records`, onPageChange: () => undefined }}
        className="border-slate-800 bg-slate-950/40"
      />
    ) : (
      <EmptyState title={`No ${title.toLowerCase()} yet`} description="Records will appear here once backend data is connected." />
    )}
  </DashboardWidget>
);

export const ManufacturerTopTables = () => {
  const tables = [
    {
      title: "Top Products",
      subtitle: "Highest product performance by scans and revenue.",
      rows: manufacturerTopProducts,
      columns: columnsFor(["product", "category", "scans", "revenue", "status"]),
    },
    {
      title: "Top Dealers",
      subtitle: "Dealers driving secondary sales and scan adoption.",
      rows: manufacturerTopDealers,
      columns: columnsFor(["dealer", "region", "orders", "revenue", "status"]),
    },
    {
      title: "Top Regions",
      subtitle: "Regional scan, dealer, and revenue performance.",
      rows: manufacturerTopRegions,
      columns: columnsFor(["region", "scans", "dealers", "revenue", "status"]),
    },
    {
      title: "Recent QR Batches",
      subtitle: "Latest QR batch generation and print lifecycle.",
      rows: manufacturerRecentQrBatches,
      columns: columnsFor(["id", "product", "quantity", "factory", "status"]),
    },
    {
      title: "Recent Warranty Claims",
      subtitle: "Latest claim intake and service review status.",
      rows: manufacturerWarrantyClaims,
      columns: columnsFor(["id", "customer", "product", "priority", "age", "status"]),
    },
  ];

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      {tables.map((table, index) => (
        <div key={table.title} className={index === 4 ? "xl:col-span-2" : undefined}>
          <TableCard {...table} />
        </div>
      ))}
    </section>
  );
};

const HeaderActions = () => (
  <>
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40">
      <Building2 className="h-4 w-4 text-cyan-300" />
      Acme Manufacturing
    </button>
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40">
      <CalendarDays className="h-4 w-4 text-cyan-300" />
      Last 30 days
    </button>
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40">
      <Download className="h-4 w-4" />
      Export
    </button>
    <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40">
      <RefreshCw className="h-4 w-4" />
      Refresh
    </button>
  </>
);

export const ManufacturerDashboard = () => (
  <div className="space-y-6">
    <AppBreadcrumbs />
    <PageToolbar
      start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Manufacturer Command Center</p>}
      title="Welcome back, Manufacturer Admin"
      description="Premium operating view across products, SKUs, QR intelligence, channel performance, customers, loyalty, warranty, revenue, and AI risk signals."
      end={<HeaderActions />}
    />

    <ManufacturerKpiGrid />

    <section className="grid gap-4 xl:grid-cols-2">
      <ManufacturerChartCard title="QR Scan Trend" description="Monthly verified QR scan volume in millions.">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={manufacturerTrendData}>
            <defs>
              <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="scans" stroke="#22d3ee" fill="url(#scanGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Product Activation Trend" description="QR-linked product activations in millions.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={manufacturerTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="activations" stroke="#a78bfa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Customer Growth" description="New acquired customers in millions.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={manufacturerTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="customers" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Dealer Performance" description="Dealer count, scan activity, and regional revenue.">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={manufacturerDealerPerformance}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="region" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="scans" stroke="#22d3ee" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Campaign ROI" description="Campaign return trend by month.">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={manufacturerTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="roi" stroke="#f472b6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Wallet Usage" description="Wallet liability usage in millions.">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={manufacturerTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="wallet" stroke="#38bdf8" fill="#38bdf833" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Warranty Claims Trend" description="Monthly claim volume for service operations.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={manufacturerTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="warranty" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>

      <ManufacturerChartCard title="Region-wise Scan Performance" description="Scans and activations by top regions.">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={manufacturerRegionScans}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="region" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="scans" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="activations" stroke="#34d399" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </ManufacturerChartCard>
    </section>

    <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <ManufacturerAIInsights />
      <div className="grid gap-4">
        <ManufacturerQuickActions />
        <ManufacturerActivityFeed />
      </div>
    </section>

    <ManufacturerTopTables />
  </div>
);

export default ManufacturerDashboard;
