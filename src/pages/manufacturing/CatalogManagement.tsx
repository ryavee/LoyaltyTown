import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Archive,
  Download,
  Filter,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  ActionBar,
  AdvancedFilters,
  ChartCard,
  DashboardWidget,
  DateRangePicker,
  EmptyState,
  PageToolbar,
  Pagination,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  Select,
  Tabs,
} from "../../Components/enterprise";
import {
  brandTabs,
  brands,
  catalogConfigs,
  categories,
  categoryTabs,
  historyRows,
  skuTabs,
  skus,
  type BrandRecord,
  type CatalogModule,
  type CategoryRecord,
  type SkuRecord,
} from "../../data/catalogDemoData";
import { AnalyticsCards, BrandCard, CategoryCard, SkuCard } from "./catalog/CatalogCards";
import { BrandForm, CategoryForm, SkuForm } from "./catalog/CatalogForms";
import { BrandTable, CategoryTable, SkuTable } from "./catalog/CatalogTables";
import { StatusBadge } from "./catalog/StatusBadge";

type CatalogMode = "dashboard" | "list" | "create" | "edit" | "delete" | "details" | "detail" | "import" | "export" | "history" | "analytics";

type CatalogManagementProps = {
  moduleType: CatalogModule;
  mode?: CatalogMode;
};

const statusOptions = ["Active", "Inactive", "Archived", "Draft"].map((item) => ({ label: item, value: item }));
const countries = ["India", "Germany", "UAE"].map((item) => ({ label: item, value: item }));
const industries = ["Chemicals", "Coatings", "Machinery", "Tools"].map((item) => ({ label: item, value: item }));
const yesNo = ["Yes", "No"].map((item) => ({ label: item, value: item }));

const allRows = {
  categories,
  brands,
  "sku-management": skus,
  skus,
};

const CatalogManagement = ({ moduleType, mode = "list" }: CatalogManagementProps) => {
  const normalizedModule = moduleType === "skus" ? "skus" : moduleType;
  const config = catalogConfigs[normalizedModule];
  const normalizedMode = mode === "detail" ? "details" : mode;
  const { id } = useParams();
  const rows = allRows[normalizedModule];
  const selected = rows.find((item) => item.id === id) || rows[0];

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      {normalizedMode === "list" || normalizedMode === "dashboard" ? <CatalogList moduleType={normalizedModule} /> : null}
      {normalizedMode === "create" ? <CatalogFormPage moduleType={normalizedModule} /> : null}
      {normalizedMode === "edit" ? <CatalogFormPage moduleType={normalizedModule} record={selected} /> : null}
      {normalizedMode === "details" ? <CatalogDetails moduleType={normalizedModule} record={selected} /> : null}
      {normalizedMode === "import" ? <CatalogImportExport moduleType={normalizedModule} kind="import" /> : null}
      {normalizedMode === "export" ? <CatalogImportExport moduleType={normalizedModule} kind="export" /> : null}
      {normalizedMode === "analytics" ? <CatalogAnalytics moduleType={normalizedModule} /> : null}
      {normalizedMode === "history" ? <CatalogHistory moduleType={normalizedModule} /> : null}
      {normalizedMode === "delete" ? (
        <EmptyState
          title={`Delete ${config.singular}`}
          description="Delete confirmation is represented as a frontend-only route. Backend deletion will be connected later."
        />
      ) : null}
    </div>
  );
};

const HeaderActions = ({ moduleType }: { moduleType: CatalogModule }) => {
  const config = catalogConfigs[moduleType];
  return (
    <>
      <Link to={`${config.basePath}/import`} className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Upload className="h-4 w-4" />
        Bulk Import
      </Link>
      <Link to={`${config.basePath}/export`} className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Download className="h-4 w-4" />
        Bulk Export
      </Link>
      <Link to={`${config.basePath}/create`} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
        <Plus className="h-4 w-4" />
        Create
      </Link>
    </>
  );
};

const CatalogList = ({ moduleType }: { moduleType: CatalogModule }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const config = catalogConfigs[moduleType];
  const rows = allRows[moduleType];

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((row) => {
      const textMatch = !normalized || Object.values(row).some((value) => String(value).toLowerCase().includes(normalized));
      const statusMatch = !status || row.status === status;
      const filterOneMatch = !filterOne || Object.values(row).includes(filterOne);
      const filterTwoMatch = !filterTwo || Object.values(row).includes(filterTwo);
      return textMatch && statusMatch && filterOneMatch && filterTwoMatch;
    });
  }, [filterOne, filterTwo, query, rows, status]);

  const metrics = getMetrics(moduleType);

  return (
    <div className="space-y-5">
      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Manufacturing Catalog</p>}
        title={config.title}
        description={config.description}
        end={<HeaderActions moduleType={moduleType} />}
      />

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, hint]) => (
          <DashboardWidget key={label} title={label} subtitle={hint}>
            <p className="text-3xl font-semibold text-white">{value}</p>
          </DashboardWidget>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="rounded-lg border border-slate-800 bg-slate-950/75 p-4">
            <SearchInput value={query} onChange={setQuery} placeholder={`Search ${config.title.toLowerCase()}`} />
          </section>

          <AdvancedFilters title="Advanced Filters" activeCount={[status, filterOne, filterTwo, dateRange.from, dateRange.to].filter(Boolean).length}>
            <Select label="Status" value={status} onChange={setStatus} options={statusOptions} />
            {moduleType === "categories" ? (
              <>
                <Select label="Parent Category" value={filterOne} onChange={setFilterOne} options={categories.map((item) => ({ label: item.name, value: item.name }))} />
                <DateRangePicker label="Created Date" value={dateRange} onChange={setDateRange} />
              </>
            ) : moduleType === "brands" ? (
              <>
                <Select label="Country" value={filterOne} onChange={setFilterOne} options={countries} />
                <Select label="Industry" value={filterTwo} onChange={setFilterTwo} options={industries} />
              </>
            ) : (
              <>
                <Select label="QR Enabled" value={filterOne} onChange={setFilterOne} options={yesNo} />
                <Select label="Batch Enabled" value={filterTwo} onChange={setFilterTwo} options={yesNo} />
              </>
            )}
          </AdvancedFilters>

          <ActionBar selectedCount={2}>
            <SecondaryButton icon={Download}>Export</SecondaryButton>
            <SecondaryButton icon={Archive}>Archive</SecondaryButton>
            <SecondaryButton icon={RotateCcw}>Restore</SecondaryButton>
            <SecondaryButton icon={Trash2}>Delete</SecondaryButton>
          </ActionBar>

          {filteredRows.length ? (
            <>
              {moduleType === "categories" ? <CategoryTable rows={filteredRows as CategoryRecord[]} /> : null}
              {moduleType === "brands" ? <BrandTable rows={filteredRows as BrandRecord[]} /> : null}
              {moduleType === "sku-management" || moduleType === "skus" ? <SkuTable rows={filteredRows as SkuRecord[]} basePath={config.basePath} /> : null}
              <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Showing ${filteredRows.length} static records`} />
            </>
          ) : (
            <EmptyState title={`No ${config.title.toLowerCase()} found`} description="Adjust filters or create a new record." />
          )}
        </div>

        <CatalogSideCard moduleType={moduleType} record={rows[0]} />
      </div>
    </div>
  );
};

const CatalogSideCard = ({ moduleType, record }: { moduleType: CatalogModule; record: CategoryRecord | BrandRecord | SkuRecord }) => {
  const Icon = catalogConfigs[moduleType].icon;
  if (moduleType === "categories") return <CategoryCard record={record as CategoryRecord} icon={Icon} />;
  if (moduleType === "brands") return <BrandCard record={record as BrandRecord} icon={Icon} />;
  return <SkuCard record={record as SkuRecord} icon={Icon} />;
};

const CatalogFormPage = ({ moduleType, record }: { moduleType: CatalogModule; record?: CategoryRecord | BrandRecord | SkuRecord }) => {
  const config = catalogConfigs[moduleType];
  return (
    <div className="space-y-5">
      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">{config.title}</p>}
        title={`${record ? "Edit" : "Create"} ${config.singular}`}
        description={`Configure ${config.singular.toLowerCase()} fields with static frontend data only.`}
      />
      {moduleType === "categories" ? <CategoryForm record={record as CategoryRecord | undefined} /> : null}
      {moduleType === "brands" ? <BrandForm record={record as BrandRecord | undefined} /> : null}
      {moduleType === "sku-management" || moduleType === "skus" ? <SkuForm record={record as SkuRecord | undefined} /> : null}
    </div>
  );
};

const CatalogDetails = ({ moduleType, record }: { moduleType: CatalogModule; record: CategoryRecord | BrandRecord | SkuRecord }) => {
  const [tab, setTab] = useState("Overview");
  const config = catalogConfigs[moduleType];
  const tabs = moduleType === "categories" ? categoryTabs : moduleType === "brands" ? brandTabs : skuTabs;
  const tabItems = tabs.map((label) => ({
    id: label,
    label,
    content: label === "Overview" ? (
      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <CatalogSideCard moduleType={moduleType} record={record} />
        <DashboardWidget title={`${config.singular} Overview`} subtitle="Static details for frontend workflows.">
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(record).slice(0, 10).map(([key, value]) => (
              <div key={key} className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
                <div className="mt-2 text-sm font-semibold text-slate-200">{key === "status" ? <StatusBadge status={String(value)} /> : String(value)}</div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>
    ) : label === "Analytics" ? (
      <CatalogAnalytics moduleType={moduleType} embedded />
    ) : label === "History" || label === "Audit Log" || label === "Audit" ? (
      <CatalogHistory moduleType={moduleType} embedded />
    ) : (
      <EmptyState title={`${label} placeholder`} description={`The ${label.toLowerCase()} tab is ready for future backend integration.`} />
    ),
  }));

  return (
    <div className="space-y-5">
      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">{config.title}</p>}
        title={(record as CategoryRecord).name || (record as BrandRecord).name || (record as SkuRecord).skuCode}
        description={`${config.singular} details, tabs, history, analytics, and audit-ready frontend structure.`}
        end={<StatusBadge status={record.status} />}
      />
      <Tabs tabs={tabItems} value={tab} onChange={setTab} />
    </div>
  );
};

const CatalogAnalytics = ({ moduleType, embedded = false }: { moduleType: CatalogModule; embedded?: boolean }) => (
  <div className="space-y-4">
    {!embedded ? (
      <PageToolbar title={`${catalogConfigs[moduleType].title} Analytics`} description="Static analytics cards and trend placeholders." />
    ) : null}
    <AnalyticsCards />
    <ChartCard title="Catalog Trend" description="Frontend-only trend placeholder for future analytics APIs." minHeight="280px">
      <Filter className="h-10 w-10 text-slate-600" />
    </ChartCard>
  </div>
);

const CatalogHistory = ({ moduleType, embedded = false }: { moduleType: CatalogModule; embedded?: boolean }) => (
  <div className="space-y-4">
    {!embedded ? <PageToolbar title={`${catalogConfigs[moduleType].title} History`} description="Static history and audit log." /> : null}
    <DashboardWidget title="History" subtitle="Recent catalog operations.">
      <div className="space-y-3">
        {historyRows.map((row) => (
          <div key={row.id} className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
            <p className="text-sm font-semibold text-white">{row.event}</p>
            <p className="mt-1 text-xs text-slate-500">{row.owner} • {row.time}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
  </div>
);

const CatalogImportExport = ({ moduleType, kind }: { moduleType: CatalogModule; kind: "import" | "export" }) => {
  const config = catalogConfigs[moduleType];
  return (
    <div className="space-y-5">
      <PageToolbar
        title={`${kind === "import" ? "Bulk Import" : "Bulk Export"} ${config.singular}`}
        description={`${kind === "import" ? "Upload and validate" : "Select fields and generate"} static ${config.singular.toLowerCase()} data.`}
      />
      <DashboardWidget title={kind === "import" ? "Upload File" : "Export Configuration"} subtitle="No backend job is connected yet.">
        <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
          {kind === "import" ? <Upload className="h-8 w-8 text-cyan-300" /> : <Download className="h-8 w-8 text-cyan-300" />}
          <h2 className="mt-4 text-base font-semibold text-white">{kind === "import" ? "Upload CSV/XLSX" : "Generate CSV/XLSX/PDF"}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">This is a frontend-only placeholder for future import/export workflows.</p>
          <PrimaryButton className="mt-5">{kind === "import" ? "Select File" : "Generate Export"}</PrimaryButton>
        </div>
      </DashboardWidget>
    </div>
  );
};

const getMetrics = (moduleType: CatalogModule): Array<[string, string, string]> => {
  if (moduleType === "categories") {
    return [
      ["Total Categories", "84", "Full hierarchy"],
      ["Active Categories", "72", "Visible in catalog"],
      ["Inactive Categories", "8", "Hidden from consumers"],
      ["Recently Created", "12", "Last 30 days"],
    ];
  }
  if (moduleType === "brands") {
    return [
      ["Total Brands", "18", "Enterprise portfolio"],
      ["Products", "4,860", "Mapped products"],
      ["Countries", "12", "Market coverage"],
      ["Status", "92%", "Active brands"],
    ];
  }
  return [
    ["Total SKUs", "42.1K", "Across products"],
    ["QR Enabled", "91.4%", "Connected products"],
    ["Warranty Enabled", "78.2%", "Claim-ready SKUs"],
    ["Batch Enabled", "84.8%", "Factory traceability"],
  ];
};

export default CatalogManagement;
