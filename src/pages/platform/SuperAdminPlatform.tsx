import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Download, Plus, RefreshCw, Server, ShieldCheck, Upload } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, KPIGrid, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { auditRows, securityRows } from "../../data/platform/auditDemoData";
import { backupRows, disasterRecoveryRows } from "../../data/platform/backupDemoData";
import { apiRows } from "../../data/platform/apiDemoData";
import { companies, globalUsers, platformBilling } from "../../data/platform/companyDemoData";
import { deploymentRows, environments } from "../../data/platform/deploymentDemoData";
import { platformAnalytics, platformKpis, healthWidgets, systemSettings } from "../../data/platform/platformDemoData";
import { queueRows } from "../../data/platform/queueDemoData";
import { supportRows } from "../../data/platform/supportDemoData";
import { BackupCard, CompanyProfile, OpsMetricCard, PlatformHealthCard, StorageCard } from "./components/PlatformCards";
import { ApiUsageChart, PlatformAnalyticsCharts } from "./components/PlatformCharts";
import { DeploymentTimeline } from "./components/DeploymentTimeline";
import { AuditTable, CompanyTable, GenericPlatformTable, QueueTable, SupportTicketTable } from "./components/PlatformTables";

type PlatformMode =
  | "dashboard"
  | "companies"
  | "company-details"
  | "users"
  | "billing"
  | "health"
  | "api"
  | "queues"
  | "deployments"
  | "audit"
  | "security"
  | "support"
  | "settings"
  | "backups"
  | "disaster-recovery"
  | "analytics";

const meta: Record<PlatformMode, { title: string; description: string; label: string }> = {
  dashboard: { title: "Super Admin Dashboard", description: "Platform operations dashboard for tenants, revenue, QR volume, wallets, APIs, storage, sessions, and health.", label: "Super Admin" },
  companies: { title: "Company Management", description: "Company list, company details, create, suspend, delete, restore, convert trial, subscription upgrade, and usage analytics.", label: "Companies" },
  "company-details": { title: "Company Details", description: "Company profile, lifecycle operations, subscription, usage analytics, and platform ownership.", label: "Companies" },
  users: { title: "Global User Management", description: "Global users, tenant users, login history, sessions, and blocked users.", label: "Users" },
  billing: { title: "Platform Billing", description: "Invoices, subscriptions, revenue, renewals, and failed payments.", label: "Billing" },
  health: { title: "Platform Health", description: "Health dashboard, CPU, memory, storage, database, Redis, queue, cache, and background workers.", label: "Health" },
  api: { title: "API Monitoring", description: "API dashboard, requests, errors, latency, rate limits, and API keys.", label: "API" },
  queues: { title: "Queue Management", description: "BullMQ dashboard, jobs, retry queue, dead letter queue, and processing queue.", label: "Queues" },
  deployments: { title: "Deployment Center", description: "Deployment history, release notes, rollback, and production/staging/development environments.", label: "Deployments" },
  audit: { title: "Audit Center", description: "Audit dashboard, user audit, security audit, data changes, exports, and login events.", label: "Audit" },
  security: { title: "Security Center", description: "Failed login, suspicious activity, fraud overview, blocked IP, and rate limit.", label: "Security" },
  support: { title: "Tenant Support", description: "Support dashboard, tickets, live chat placeholder, tenant requests, feature requests, and bug reports.", label: "Support" },
  settings: { title: "System Settings", description: "Global settings, SMTP, SMS, WhatsApp, Firebase, storage, CDN, and queue.", label: "Settings" },
  backups: { title: "Backup Center", description: "Backup dashboard, database backup, storage backup, and restore placeholder.", label: "Backups" },
  "disaster-recovery": { title: "Disaster Recovery", description: "Recovery dashboard, recovery plans, and failover placeholder.", label: "Disaster Recovery" },
  analytics: { title: "Platform Analytics", description: "Revenue analytics, usage analytics, growth analytics, feature usage, and tenant analytics.", label: "Analytics" },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: PlatformMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode === "security" || mode === "audit" ? <ShieldCheck className="h-5 w-5" /> : mode === "health" || mode === "api" || mode === "queues" ? <Server className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Super Admin Platform</p>
        </div>
      }
      end={
        <>
          <Link to="/super-admin/companies" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />Company
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
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Healthy", "Operational", "Review", "Watch", "Blocked", "Suspended"].map((value) => ({ label: value, value }))} />
    <Select label="Environment" value="" onChange={() => undefined} placeholder="All environments" options={["Production", "Staging", "Development"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Dashboard = () => (
  <>
    <KPIGrid items={platformKpis} />
    <PlatformAnalyticsCharts />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{healthWidgets.slice(0, 6).map((item) => <PlatformHealthCard key={item.id} item={item} />)}</div>
  </>
);

const CompanyDetails = () => {
  const { id } = useParams();
  const company = companies.find((item) => item.id === id) || companies[0];
  return (
    <div className="space-y-4">
      <CompanyProfile company={company} />
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Company Operations</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {["Suspend Company", "Delete Company", "Restore Company", "Convert Trial", "Subscription Upgrade", "Usage Analytics"].map((action) => (
            <button key={action} className="rounded-md border border-slate-800 bg-slate-900 px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800">{action}</button>
          ))}
        </div>
      </section>
      <PlatformAnalyticsCharts />
    </div>
  );
};

const HealthView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{healthWidgets.map((item) => <PlatformHealthCard key={item.id} item={item} />)}</div>
    <PlatformAnalyticsCharts />
  </>
);

const DeploymentView = () => (
  <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
    <DeploymentTimeline rows={deploymentRows} />
    <GenericPlatformTable rows={environments} />
  </div>
);

const SupportView = ({ rows }: { rows: Record<string, unknown>[] }) => (
  <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
    <SupportTicketTable rows={rows} />
    <section className={cn(panelBase, "p-4")}>
      <h3 className="text-sm font-semibold text-white">Live Chat Placeholder</h3>
      <div className="mt-4 grid min-h-64 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/60 text-center">
        <div>
          <Server className="mx-auto h-8 w-8 text-cyan-300" />
          <p className="mt-2 text-sm font-medium text-slate-200">Tenant support chat console</p>
          <p className="mt-1 text-xs text-slate-500">No realtime support connection yet.</p>
        </div>
      </div>
    </section>
  </div>
);

const BackupsView = () => <section className="grid gap-4 md:grid-cols-3">{backupRows.map((row) => <BackupCard key={row.id} row={row} />)}</section>;
const DisasterRecoveryView = () => <section className="grid gap-4 md:grid-cols-3">{disasterRecoveryRows.map((row) => <BackupCard key={row.id} row={row} />)}</section>;
const AnalyticsView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {platformAnalytics.map((item) => <OpsMetricCard key={item.id} title={item.metric} value={item.value} description={`${item.change} • ${item.status}`} />)}
    </div>
    <PlatformAnalyticsCharts />
  </>
);

const SuperAdminPlatform = ({ mode = "dashboard" }: { mode?: PlatformMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const filteredCompanies = useFilteredRows(companies, query);
  const filteredUsers = useFilteredRows(globalUsers, query);
  const filteredBilling = useFilteredRows(platformBilling, query);
  const filteredAudit = useFilteredRows(auditRows, query);
  const filteredSecurity = useFilteredRows(securityRows, query);
  const filteredSupport = useFilteredRows(supportRows, query);
  const filteredApi = useFilteredRows(apiRows, query);
  const filteredQueues = useFilteredRows(queueRows, query);
  const filteredSettings = useFilteredRows(systemSettings, query);
  const showFilters = !["dashboard", "health", "deployments", "backups", "disaster-recovery", "analytics", "company-details"].includes(mode);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {showFilters ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "companies" ? <CompanyTable rows={filteredCompanies} /> : null}
      {mode === "company-details" ? <CompanyDetails /> : null}
      {mode === "users" ? <GenericPlatformTable rows={filteredUsers} /> : null}
      {mode === "billing" ? <GenericPlatformTable rows={filteredBilling} /> : null}
      {mode === "health" ? <HealthView /> : null}
      {mode === "api" ? <><ApiUsageChart /><GenericPlatformTable rows={filteredApi} /></> : null}
      {mode === "queues" ? <QueueTable rows={filteredQueues} /> : null}
      {mode === "deployments" ? <DeploymentView /> : null}
      {mode === "audit" ? <AuditTable rows={filteredAudit} /> : null}
      {mode === "security" ? <GenericPlatformTable rows={filteredSecurity} /> : null}
      {mode === "support" ? <SupportView rows={filteredSupport} /> : null}
      {mode === "settings" ? <GenericPlatformTable rows={filteredSettings} /> : null}
      {mode === "backups" ? <BackupsView /> : null}
      {mode === "disaster-recovery" ? <DisasterRecoveryView /> : null}
      {mode === "analytics" ? <AnalyticsView /> : null}
      {showFilters ? <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${current.title}`} /> : null}
    </div>
  );
};

export default SuperAdminPlatform;
