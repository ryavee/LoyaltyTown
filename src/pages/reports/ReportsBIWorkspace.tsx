import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BarChart3, CalendarClock, Download, FileBarChart, Plus, RefreshCw, Upload } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, KPIGrid, PageToolbar, Pagination, PrimaryButton, SearchInput, SecondaryButton, Select, TextInput } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { auditReports } from "../../data/reports/auditReportDemoData";
import { biKpis, executiveInsights } from "../../data/reports/businessIntelligenceDemoData";
import { exportFormats, exportJobs } from "../../data/reports/exportDemoData";
import { reportCategories, reportKpis, reportPreviewRows } from "../../data/reports/reportDemoData";
import { scheduledReports } from "../../data/reports/scheduledReportDemoData";
import { BIKpiCard, DashboardBuilderCanvas, ExecutiveInsightCard, ReportCatalogCard } from "./components/ReportCards";
import { BICharts, ReportChartPreview, ReportsDashboardCharts } from "./components/ReportCharts";
import { ReportBuilderWizard, ReportExportButtons, ReportFilterPanel } from "./components/ReportControls";
import { ExportJobTable, GenericReportTable, ReportPreviewTable, ScheduledReportTable } from "./components/ReportTables";

type ReportsMode =
  | "dashboard"
  | "catalog"
  | "detail"
  | "business-intelligence"
  | "executive-analytics"
  | "export-center"
  | "scheduled"
  | "scheduled-create"
  | "scheduled-detail"
  | "report-builder"
  | "dashboard-builder"
  | "audit";

const meta: Record<ReportsMode, { title: string; description: string; label: string }> = {
  dashboard: { title: "Reports Dashboard", description: "Report usage, export volume, department-wise reports, top downloads, schedules, and data freshness.", label: "Reports" },
  catalog: { title: "Report Catalog", description: "Sales, QR, Product, Inventory, Warehouse, Dealer, Distributor, Retailer, Contractor, Customer, Campaign, Loyalty, Wallet, Warranty, Finance, GST, AI, and Audit reports.", label: "Catalog" },
  detail: { title: "Report Detail", description: "Report filters, date range, export buttons, preview table, chart preview, and schedule option.", label: "Report" },
  "business-intelligence": { title: "Executive Business Intelligence", description: "Sales BI, Channel BI, Product BI, Customer BI, Supply Chain BI, Finance BI, and AI Insights BI.", label: "BI" },
  "executive-analytics": { title: "Executive Analytics", description: "Leadership analytics for revenue, sell-in, sell-out, QR scans, growth, inventory, ROI, warranty, wallet, and fraud risk.", label: "Analytics" },
  "export-center": { title: "Export Center", description: "Export jobs, create export, export history, download center, failed exports, and CSV/XLSX/PDF/JSON format readiness.", label: "Exports" },
  scheduled: { title: "Scheduled Reports", description: "Recurring reports, recipients, formats, filters, delivery time, status, and schedule details.", label: "Scheduled Reports" },
  "scheduled-create": { title: "Create Scheduled Report", description: "Static schedule form for report name, type, frequency, recipients, format, filters, time, and status.", label: "Scheduled Reports" },
  "scheduled-detail": { title: "Scheduled Report Detail", description: "Schedule settings, delivery history, recipients, format, filters, and status.", label: "Scheduled Reports" },
  "report-builder": { title: "Custom Report Builder", description: "Select dataset, columns, filters, grouping, sorting, preview, and save report.", label: "Builder" },
  "dashboard-builder": { title: "Dashboard Builder", description: "Widget library, KPI widget, chart widget, table widget, canvas, and save dashboard.", label: "Dashboard Builder" },
  audit: { title: "Audit Reports", description: "User activity, login, permission change, data change, and export audit reports.", label: "Audit" },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: ReportsMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode.includes("scheduled") ? <CalendarClock className="h-5 w-5" /> : mode.includes("intelligence") || mode.includes("analytics") ? <BarChart3 className="h-5 w-5" /> : <FileBarChart className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Reports, BI & Export Center</p>
        </div>
      }
      end={
        <>
          <Link to="/report-builder" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />Build Report
          </Link>
          <SecondaryButton icon={Upload}>Import</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Category" value="" onChange={() => undefined} placeholder="All categories" options={["Sales", "QR", "Finance", "GST", "AI", "Audit"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Ready", "Active", "Review", "Failed", "Queued"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const ReportsDashboard = () => (
  <>
    <KPIGrid items={reportKpis} />
    <ReportsDashboardCharts />
    <section className={cn(panelBase, "p-4")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Top Downloaded Reports</h3>
          <p className="mt-1 text-sm text-slate-500">Static report catalog activity and export readiness.</p>
        </div>
        <Link to="/reports/catalog" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100">Open Catalog</Link>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {reportCategories.slice(0, 4).map((report) => <ReportCatalogCard key={report.id} report={report} />)}
      </div>
    </section>
  </>
);

const CatalogView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(reportCategories, query);
  return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{filtered.map((report) => <ReportCatalogCard key={report.id} report={report} />)}</section>;
};

const ReportDetail = () => {
  const { id } = useParams();
  const report = reportCategories.find((item) => item.id === id) || reportCategories[0];
  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{report.owner}</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{report.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{report.description}</p>
          </div>
          <ReportExportButtons />
        </div>
      </section>
      <ReportFilterPanel />
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ReportPreviewTable rows={reportPreviewRows} />
        <ReportChartPreview title={`${report.title} Chart Preview`} />
      </div>
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Schedule Option</h3>
            <p className="mt-1 text-sm text-slate-500">Static scheduling surface for future delivery automation.</p>
          </div>
          <Link to="/scheduled-reports/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <CalendarClock className="h-4 w-4" />Schedule Report
          </Link>
        </div>
      </section>
    </div>
  );
};

const BIView = () => (
  <>
    <KPIGrid items={biKpis} />
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {biKpis.slice(0, 5).map((item) => <BIKpiCard key={item.id} label={item.label} value={item.value} target={item.target} />)}
    </div>
    <BICharts />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {executiveInsights.map((insight) => <ExecutiveInsightCard key={insight.id} insight={insight} />)}
    </section>
  </>
);

const ExportCenter = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(exportJobs, query);
  return (
    <>
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Create Export</h3>
            <p className="mt-1 text-sm text-slate-500">Formats: {exportFormats.join(", ")}. No real export generation is connected.</p>
          </div>
          <PrimaryButton icon={Download}>Create Export</PrimaryButton>
        </div>
      </section>
      <ExportJobTable rows={filtered} />
    </>
  );
};

const ScheduleForm = () => (
  <div className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">Schedule Configuration</h3>
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      <TextInput label="Report Name" defaultValue="Daily QR Scan Summary" />
      <Select label="Report Type" value="QR Reports" onChange={() => undefined} options={reportCategories.slice(0, 8).map((item) => ({ label: item.title, value: item.title }))} />
      <Select label="Frequency" value="Daily" onChange={() => undefined} options={["Daily", "Weekly", "Monthly", "Quarterly"].map((value) => ({ label: value, value }))} />
      <TextInput label="Recipients" defaultValue="qr-ops@loyaltytown.io" />
      <Select label="Format" value="XLSX" onChange={() => undefined} options={exportFormats.map((value) => ({ label: value, value }))} />
      <TextInput label="Filters" defaultValue="Region: All" />
      <TextInput label="Time" defaultValue="08:00" />
      <Select label="Status" value="Active" onChange={() => undefined} options={["Active", "Paused"].map((value) => ({ label: value, value }))} />
    </div>
    <div className="mt-4 flex justify-end"><PrimaryButton>Save Schedule</PrimaryButton></div>
  </div>
);

const DashboardBuilder = () => (
  <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
    <section className={cn(panelBase, "p-4")}>
      <h3 className="text-sm font-semibold text-white">Widget Library</h3>
      <div className="mt-4 space-y-3">
        {["KPI Widget", "Chart Widget", "Table Widget"].map((widget) => <button key={widget} className="block w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-left text-sm font-semibold text-slate-200 hover:bg-slate-800">{widget}</button>)}
      </div>
    </section>
    <DashboardBuilderCanvas />
  </div>
);

const ReportsBIWorkspace = ({ mode = "dashboard" }: { mode?: ReportsMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const filteredSchedules = useFilteredRows(scheduledReports, query);
  const filteredAudit = useFilteredRows(auditReports, query);
  const showFilters = ["catalog", "export-center", "scheduled", "audit"].includes(mode);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {showFilters ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "dashboard" ? <ReportsDashboard /> : null}
      {mode === "catalog" ? <CatalogView query={query} /> : null}
      {mode === "detail" ? <ReportDetail /> : null}
      {mode === "business-intelligence" || mode === "executive-analytics" ? <BIView /> : null}
      {mode === "export-center" ? <ExportCenter query={query} /> : null}
      {mode === "scheduled" ? <ScheduledReportTable rows={filteredSchedules} /> : null}
      {mode === "scheduled-create" ? <ScheduleForm /> : null}
      {mode === "scheduled-detail" ? <><ScheduleForm /><ScheduledReportTable rows={filteredSchedules.slice(0, 1)} /></> : null}
      {mode === "report-builder" ? <ReportBuilderWizard /> : null}
      {mode === "dashboard-builder" ? <DashboardBuilder /> : null}
      {mode === "audit" ? <GenericReportTable rows={filteredAudit} /> : null}
      {showFilters ? <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${current.title}`} /> : null}
    </div>
  );
};

export default ReportsBIWorkspace;
