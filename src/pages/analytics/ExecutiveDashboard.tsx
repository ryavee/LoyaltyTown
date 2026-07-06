import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bot,
  Building2,
  CalendarDays,
  Download,
  FileBarChart,
  Gift,
  LineChart as LineChartIcon,
  Megaphone,
  PackageCheck,
  QrCode,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
  WalletCards,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  ActivityFeed,
  Badge,
  ChartCard,
  DashboardWidget,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  LoadingSkeleton,
  PageToolbar,
} from "../../Components/enterprise";
import type { DataTableColumn, EnterpriseTone, TimelineItem } from "../../Components/enterprise";
import {
  aiInsights,
  executiveKpis,
  quickActions,
  recentActivities,
  recentQrBatches,
  recentWarrantyClaims,
  regionScanData,
  topDealers,
  topProducts,
  topRegions,
  trendData,
} from "../../constants/dashboardDemoData";

type DemoRow = Record<string, string>;

const isLoading = false;

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Bot,
  FileBarChart,
  Gift,
  LineChart: LineChartIcon,
  Megaphone,
  PackageCheck,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
  WalletCards,
  Wrench,
};

const chartTooltip = {
  contentStyle: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
  },
  labelStyle: { color: "#f8fafc" },
};

const statusTone = (status: string): EnterpriseTone => {
  if (["Leading", "Elite", "Ahead", "Approved", "Generated"].includes(status)) return "success";
  if (["Growth", "Review", "Submitted", "Printed"].includes(status)) return "warning";
  if (["Mapped", "Stable", "On Track", "Active"].includes(status)) return "info";
  return "default";
};

const resolveIcon = (name: string) => iconMap[name] || Sparkles;

const dashboardKpis = executiveKpis.map((item) => ({
  ...item,
  icon: resolveIcon(item.icon),
}));

const activityItems: TimelineItem[] = recentActivities.map((item) => ({
  ...item,
  icon: resolveIcon(item.icon),
  tone: item.tone as EnterpriseTone,
}));

const tableColumns = (keys: string[]): DataTableColumn<DemoRow>[] =>
  keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1"),
    accessor: key,
    cell: (row) => (key === "status" ? <Badge tone={statusTone(row[key])}>{row[key]}</Badge> : row[key]),
  }));

const tableConfigs = [
  {
    title: "Top Products",
    subtitle: "Best performing products by scans and revenue.",
    rows: topProducts,
    columns: tableColumns(["product", "category", "scans", "revenue", "status"]),
  },
  {
    title: "Top Dealers",
    subtitle: "Channel partners driving secondary sales.",
    rows: topDealers,
    columns: tableColumns(["dealer", "region", "orders", "revenue", "status"]),
  },
  {
    title: "Top Regions",
    subtitle: "Regional scan, dealer, and revenue performance.",
    rows: topRegions,
    columns: tableColumns(["region", "scans", "dealers", "revenue", "status"]),
  },
  {
    title: "Recent Warranty Claims",
    subtitle: "Latest claim intake and service status.",
    rows: recentWarrantyClaims,
    columns: tableColumns(["id", "customer", "product", "priority", "age", "status"]),
  },
  {
    title: "Recent QR Batches",
    subtitle: "Latest QR batch generation and lifecycle state.",
    rows: recentQrBatches,
    columns: tableColumns(["id", "product", "quantity", "factory", "status"]),
  },
];

const HeaderControls = () => (
  <div className="flex flex-wrap items-center gap-2">
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40">
      <Building2 className="h-4 w-4 text-cyan-300" />
      Global Tenant
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
  </div>
);

const DashboardChart = ({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) => (
  <ChartCard title={title} description={description} minHeight="300px" framed={false} contentClassName="h-[300px]" className={className}>
    {children}
  </ChartCard>
);

const QuickActions = () => (
  <DashboardWidget title="Quick Actions" subtitle="Common executive workflows and shortcuts.">
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {quickActions.map((action) => {
        const Icon = resolveIcon(action.icon);
        return (
          <Link
            key={action.id}
            to={action.route}
            className="enterprise-transition flex h-12 items-center gap-3 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-300 hover:border-cyan-400/30 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
          >
            <Icon className="h-4 w-4 text-cyan-300" />
            {action.label}
          </Link>
        );
      })}
    </div>
  </DashboardWidget>
);

const AIInsightsPanel = () => (
  <DashboardWidget
    title="AI Insights"
    subtitle="Static executive recommendations for future AI service integration."
    className="border-cyan-400/20 bg-cyan-400/10"
    actions={<Sparkles className="h-5 w-5 text-cyan-200" />}
  >
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
      {aiInsights.map((insight) => (
        <article key={insight.id} className="rounded-md border border-cyan-400/10 bg-slate-950/60 p-3">
          <div className="flex items-center justify-between gap-3">
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

const TableCard = ({ title, subtitle, rows, columns }: (typeof tableConfigs)[number]) => (
  <DashboardWidget title={title} subtitle={subtitle} className="min-w-0">
    {rows.length ? (
      <EnterpriseDataTable rows={rows} columns={columns} className="border-slate-800 bg-slate-950/40" />
    ) : (
      <EmptyState title={`No ${title.toLowerCase()} yet`} description="Records will appear here once backend data is connected." />
    )}
  </DashboardWidget>
);

const ExecutiveDashboard = () => {
  if (isLoading) {
    return (
      <div className="space-y-5">
        <AppBreadcrumbs />
        <LoadingSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AppBreadcrumbs />

      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Executive Command Center</p>}
        title="Welcome back, Pravat"
        description="Premium enterprise overview across products, QR intelligence, channel performance, customers, warranty, wallet, campaigns, revenue, and AI signals."
        end={<HeaderControls />}
      />

      <KPIGrid items={dashboardKpis} />

      <section className="grid gap-4 xl:grid-cols-2">
        <DashboardChart title="QR Scan Trend" description="Verified QR scan volume in millions.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="qrScanGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.42} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="qrScans" stroke="#22d3ee" fill="url(#qrScanGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Sales Trend" description="Monthly revenue trend in millions.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="sales" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="campaigns" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Customer Growth" description="Active customers in millions.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="customers" stroke="#34d399" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Dealer Performance" description="Composite dealer score by month.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="dealers" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Campaign Performance" description="Campaign influenced activity.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="campaigns" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.18} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Wallet Usage" description="Wallet usage and campaign lift.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="wallet" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="customers" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Warranty Claims" description="Submitted warranty claims by month.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="warranty" stroke="#fb7185" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Region-wise Scan" description="Scans and counterfeit alerts by region.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionScanData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="region" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip {...chartTooltip} />
              <Legend />
              <Bar dataKey="scans" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              <Bar dataKey="alerts" fill="#fb7185" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr_1.2fr]">
        <QuickActions />
        <ActivityFeed items={activityItems} title="Recent Activity Feed" />
        <AIInsightsPanel />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {tableConfigs.map((table) => (
          <TableCard key={table.title} {...table} />
        ))}
      </section>
    </div>
  );
};

export default ExecutiveDashboard;
