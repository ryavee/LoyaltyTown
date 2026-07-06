import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ClipboardCheck,
  ClipboardList,
  Factory,
  HardHat,
  PackageX,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  TimerReset,
  Users,
  Wrench,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  AdvancedFilters,
  DashboardWidget,
  DateRangePicker,
  EmptyState,
  LoadingSkeleton,
  PageToolbar,
  Pagination,
  SearchInput,
  Select,
  Tabs,
} from "../../Components/enterprise";
import { factories, factoryKpis, factoryTabs } from "../../data/manufacturing/factoryDemoData";
import { machines, machineTabs } from "../../data/manufacturing/machineDemoData";
import { operators, operatorTabs, shifts, shiftTabs } from "../../data/manufacturing/operatorDemoData";
import { productionLineTabs, productionLines, productionOrders, productionTabs } from "../../data/manufacturing/productionDemoData";
import { qcInspections, qcTabs, scrapRows } from "../../data/manufacturing/qcDemoData";
import {
  FactoryForm,
  MachineForm,
  OperatorForm,
  ProductionLineForm,
  ProductionOrderForm,
  QCForm,
  ShiftForm,
} from "./operations/ManufacturingForms";
import { FactoryStatusBadge, ProductionStatusBadge, QCStatusBadge } from "./operations/ManufacturingBadges";
import {
  FactoryTable,
  MachineTable,
  OperatorTable,
  ProductionLineTable,
  ProductionOrderTable,
  QCTable,
  ScrapTable,
  ShiftTable,
} from "./operations/ManufacturingTables";
import {
  DowntimeChart,
  LinePerformanceCards,
  MachineHealthCard,
  ProductionTimeline,
  QualityChecklist,
  RejectRateChart,
} from "./operations/ManufacturingWidgets";

type FactoryMode =
  | "dashboard"
  | "list"
  | "create"
  | "details"
  | "detail"
  | "edit"
  | "production-orders"
  | "production-lines"
  | "machines"
  | "operators"
  | "shifts"
  | "quality-inspection"
  | "quality-control"
  | "rejected-products"
  | "scrapped-products"
  | "maintenance"
  | "reports"
  | "analytics";

const isLoading = false;

const moduleMap = {
  factory: { title: "Factory Management", basePath: "/factory", icon: Factory, rows: factories },
  "production-orders": { title: "Production Orders", basePath: "/production-orders", icon: ClipboardList, rows: productionOrders },
  "production-lines": { title: "Production Lines", basePath: "/production-lines", icon: Settings, rows: productionLines },
  machines: { title: "Machines", basePath: "/machines", icon: Wrench, rows: machines },
  operators: { title: "Operators", basePath: "/operators", icon: HardHat, rows: operators },
  shifts: { title: "Shifts", basePath: "/shifts", icon: Users, rows: shifts },
  "quality-control": { title: "Quality Control", basePath: "/quality-control", icon: ClipboardCheck, rows: qcInspections },
  "rejected-products": { title: "Rejected Products", basePath: "/rejected-products", icon: PackageX, rows: scrapRows },
  "scrapped-products": { title: "Scrapped Batches", basePath: "/scrapped-batches", icon: AlertTriangle, rows: scrapRows },
};

const statusOptions = ["Active", "Inactive", "Running", "Idle", "Maintenance", "Breakdown", "Planned", "In Production", "Completed", "QC Hold", "Passed", "Failed", "Rework"].map((item) => ({ label: item, value: item }));

type ModuleKey = keyof typeof moduleMap;

const FactoryOperations = ({ mode = "dashboard", moduleType }: { mode?: FactoryMode; moduleType?: ModuleKey }) => {
  const normalized = mode === "detail" ? "details" : mode === "quality-inspection" ? "quality-control" : mode;
  const moduleKey: ModuleKey = moduleType ?? (normalized === "dashboard" || normalized === "list" || normalized === "create" || normalized === "edit" || normalized === "details" ? "factory" : normalized as ModuleKey);
  const config = moduleMap[moduleKey] || moduleMap.factory;
  const { id } = useParams();
  const selected = config.rows.find((row) => row.id === id) || config.rows[0];

  if (isLoading) return <LoadingSkeleton rows={8} />;

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      {normalized === "dashboard" || normalized === "list" ? <ListPage moduleKey={moduleKey} /> : null}
      {normalized === "create" || normalized === "edit" ? <FormPage moduleKey={moduleKey} record={selected as never} isEdit={normalized === "edit"} /> : null}
      {normalized === "details" ? <DetailsPage moduleKey={moduleKey} record={selected as never} /> : null}
      {["production-orders", "production-lines", "machines", "operators", "shifts", "quality-control", "rejected-products", "scrapped-products", "maintenance", "reports", "analytics"].includes(normalized) ? (
        <ListPage moduleKey={moduleKey} />
      ) : null}
    </div>
  );
};

const HeaderActions = ({ basePath }: { basePath: string }) => (
  <Link to={`${basePath}/create`} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
    <Plus className="h-4 w-4" />
    Create
  </Link>
);

const ListPage = ({ moduleKey }: { moduleKey: keyof typeof moduleMap }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const config = moduleMap[moduleKey];
  const Icon = config.icon;
  const rows = config.rows;

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const textMatch = !q || Object.values(row).some((value) => String(value).toLowerCase().includes(q));
      const statusMatch = !status || String(row.status) === status;
      return textMatch && statusMatch;
    });
  }, [query, rows, status]);

  return (
    <div className="space-y-5">
      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Manufacturing Operations</p>}
        title={config.title}
        description="Enterprise frontend workspace for factory, production, machines, workforce, quality, scrap, and operational readiness."
        end={<HeaderActions basePath={config.basePath} />}
      />

      {moduleKey === "factory" ? (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {factoryKpis.map(([label, value], index) => (
            <DashboardWidget key={label} title={label} actions={<Icon className="h-5 w-5 text-cyan-300" />}>
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{index < 4 ? "Factory network metric" : "Production and QC metric"}</p>
            </DashboardWidget>
          ))}
        </section>
      ) : null}

      {moduleKey === "production-lines" ? (
        <>
          <LinePerformanceCards />
          <section className="grid gap-4 xl:grid-cols-2"><DowntimeChart /><RejectRateChart /></section>
        </>
      ) : null}

      <AdvancedFilters title="Search & Filters" activeCount={[query, status, dateRange.from, dateRange.to].filter(Boolean).length}>
        <SearchInput value={query} onChange={setQuery} placeholder={`Search ${config.title.toLowerCase()}`} />
        <Select label="Status" value={status} onChange={setStatus} options={statusOptions} />
        <DateRangePicker label="Date Range" value={dateRange} onChange={setDateRange} />
      </AdvancedFilters>

      {filteredRows.length ? <TableSwitch moduleKey={moduleKey} rows={filteredRows} /> : <EmptyState title={`No ${config.title.toLowerCase()} found`} />}
      <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Showing ${filteredRows.length} static records`} />

      {moduleKey === "machines" ? <MachineHealthCard health="92%" /> : null}
      {moduleKey === "quality-control" ? <section className="grid gap-4 xl:grid-cols-2"><QualityChecklist /><RejectRateChart /></section> : null}
      {moduleKey === "rejected-products" || moduleKey === "scrapped-products" ? (
        <DashboardWidget title="Void QR Workflow Placeholder" subtitle="Security alert if a voided QR is scanned." actions={<ShieldAlert className="h-5 w-5 text-rose-300" />}>
          <div className="rounded-lg border border-rose-400/20 bg-rose-400/10 p-4 text-sm leading-6 text-rose-50/80">
            Voided QR scans will trigger counterfeit/security workflows once backend scan events are connected.
          </div>
        </DashboardWidget>
      ) : null}
    </div>
  );
};

const TableSwitch = ({ moduleKey, rows }: { moduleKey: keyof typeof moduleMap; rows: Array<Record<string, string>> }) => {
  if (moduleKey === "factory") return <FactoryTable rows={rows as never} />;
  if (moduleKey === "production-orders") return <ProductionOrderTable rows={rows as never} />;
  if (moduleKey === "production-lines") return <ProductionLineTable rows={rows as never} />;
  if (moduleKey === "machines") return <MachineTable rows={rows as never} />;
  if (moduleKey === "operators") return <OperatorTable rows={rows as never} />;
  if (moduleKey === "shifts") return <ShiftTable rows={rows as never} />;
  if (moduleKey === "quality-control") return <QCTable rows={rows as never} />;
  return <ScrapTable rows={rows as never} />;
};

const FormPage = ({ moduleKey, record, isEdit }: { moduleKey: keyof typeof moduleMap; record: Record<string, string>; isEdit: boolean }) => {
  const config = moduleMap[moduleKey];
  return (
    <div className="space-y-5">
      <PageToolbar title={`${isEdit ? "Edit" : "Create"} ${config.title.replace(/s$/, "")}`} description="Static form UI only. Backend persistence will be connected later." />
      {moduleKey === "factory" ? <FactoryForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "production-orders" ? <ProductionOrderForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "production-lines" ? <ProductionLineForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "machines" ? <MachineForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "operators" ? <OperatorForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "shifts" ? <ShiftForm record={isEdit ? record as never : undefined} /> : null}
      {moduleKey === "quality-control" ? <QCForm record={isEdit ? record as never : undefined} /> : null}
    </div>
  );
};

const DetailsPage = ({ moduleKey, record }: { moduleKey: keyof typeof moduleMap; record: Record<string, string> }) => {
  const config = moduleMap[moduleKey];
  const [tab, setTab] = useState("Overview");
  const tabs = moduleKey === "factory" ? factoryTabs : moduleKey === "production-orders" ? productionTabs : moduleKey === "production-lines" ? productionLineTabs : moduleKey === "machines" ? machineTabs : moduleKey === "operators" ? operatorTabs : moduleKey === "shifts" ? shiftTabs : qcTabs;
  const title = record.name || record.orderNumber || record.lineName || record.machineName || record.operatorName || record.shiftName || record.inspectionNumber || record.batch || config.title;

  const items = tabs.map((label) => ({
    id: label,
    label,
    content: label === "Overview" ? (
      <DashboardWidget title="Overview" subtitle="Static details for this record.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(record).slice(0, 12).map(([key, value]) => (
            <div key={key} className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <div className="mt-2 text-sm font-semibold text-slate-200">{key === "status" ? <StatusFor moduleKey={moduleKey} status={String(value)} /> : String(value)}</div>
            </div>
          ))}
        </div>
      </DashboardWidget>
    ) : label.includes("Timeline") || label === "History" || label === "Audit Log" || label === "Audit" ? (
      <ProductionTimeline />
    ) : label.includes("QC") || label === "Checklist" ? (
      <QualityChecklist />
    ) : label.includes("Downtime") ? (
      <DowntimeChart />
    ) : label.includes("Reject") || label === "Defects" ? (
      <RejectRateChart />
    ) : label.includes("Machine Health") ? (
      <MachineHealthCard health={record.health || "92%"} />
    ) : (
      <EmptyState title={`${label} placeholder`} description={`The ${label.toLowerCase()} tab is ready for future backend integration.`} />
    ),
  }));

  return (
    <div className="space-y-5">
      <PageToolbar title={String(title)} description={`${config.title} details, linked tabs, audit trail, and operational placeholders.`} end={<StatusFor moduleKey={moduleKey} status={record.status || "Active"} />} />
      <Tabs tabs={items} value={tab} onChange={setTab} />
    </div>
  );
};

const StatusFor = ({ moduleKey, status }: { moduleKey: keyof typeof moduleMap; status: string }) => {
  if (moduleKey === "factory") return <FactoryStatusBadge status={status} />;
  if (moduleKey === "quality-control") return <QCStatusBadge status={status} />;
  return <ProductionStatusBadge status={status} />;
};

export default FactoryOperations;
