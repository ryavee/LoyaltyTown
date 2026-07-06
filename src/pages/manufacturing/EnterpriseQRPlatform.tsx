import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Archive,
  Download,
  FileArchive,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Globe2,
  Pause,
  Play,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  AdvancedFilters,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  PageToolbar,
  Pagination,
  ReusableFormLayout,
  SearchInput,
  SecondaryButton,
  Select,
  TextInput,
} from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise/types";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { aggregationNodes, gs1Templates } from "../../data/qr/gs1DemoData";
import { qrBatches, qrBatchTabs } from "../../data/qr/qrBatchDemoData";
import { qrCodes } from "../../data/qr/qrCodeDemoData";
import { scanSourceRows } from "../../data/qr/scanAnalyticsDemoData";
import { securityCards, securityEvents } from "../../data/qr/securityDemoData";
import { qrBatchKpis } from "../../data/qr/qrPlatformDemoData";
import { QrGeneratorWizard } from "./qr/QrGeneratorWizard";
import { QrPreview } from "./qr/QrPreview";
import { QrBatchTable, QrCodeTable, Gs1Table, SecurityEventTable } from "./qr/QrTables";
import { QrStatusBadge } from "./qr/QrStatusBadge";
import { HierarchyViewer, QrAnalyticsCharts, QrPrintQueue, QrSecurityCard, QrTimeline } from "./qr/QrWidgets";
import {
  BatchProgressCard,
  GS1PreviewCard,
  PublicLandingPreview,
  QRDashboard,
  QRPrintJobTable,
  QRTemplateEditor,
  QRSecurityCard,
  ScanHeatmapPlaceholder,
} from "./qr/QRFlagshipComponents";

type QRMode =
  | "dashboard"
  | "batches"
  | "batch-create"
  | "batch-details"
  | "batch-edit"
  | "generate"
  | "bulk-generate"
  | "codes"
  | "code-details"
  | "gs1"
  | "aggregation"
  | "print"
  | "security"
  | "analytics"
  | "preview"
  | "pdf"
  | "zip"
  | "csv"
  | "lifecycle"
  | "gs1-preview"
  | "parent-child"
  | "templates"
  | "public-preview"
  | "scan-timeline"
  | "list"
  | "details";

const modeMeta: Record<string, { title: string; description: string; icon: typeof QrCode }> = {
  dashboard: { title: "QR Dashboard", description: "Command center for QR generation, activation, scans, counterfeit alerts, rewards, and top product performance.", icon: QrCode },
  batches: { title: "QR Batch Management", description: "Manage QR batches, serial ranges, GS1-ready metadata, print jobs, downloads, analytics, history, and audit logs.", icon: FileArchive },
  generate: { title: "QR Generation", description: "Step-by-step QR generation wizard for product, SKU, batch details, QR configuration, preview, and generation.", icon: QrCode },
  codes: { title: "QR Code Management", description: "Govern QR code status, serials, scans, claim state, activation date, warranty status, print, disable, replace, void, and history actions.", icon: QrCode },
  gs1: { title: "GS1 Digital Link", description: "Create, preview, validate, and parse GS1 Digital Link templates with GTIN, serial, batch, expiry, lot, and URL template fields.", icon: Globe2 },
  aggregation: { title: "Parent Child Aggregation", description: "Visualize item, box, case, and pallet QR relationships with hierarchy tree and explorer placeholders.", icon: GitBranch },
  print: { title: "Print Management", description: "Manage print queue, printer configuration, print jobs, failed jobs, printer status, and supported Zebra, Honeywell, and TSC printers.", icon: Printer },
  security: { title: "QR Security", description: "Monitor duplicate detection, geo fence, velocity rules, blacklist, whitelist, risk score, and security events.", icon: ShieldAlert },
  analytics: { title: "QR Analytics", description: "Analyze scans, unique users, repeat scans, country, state, city, device, browser, and heatmap placeholders.", icon: Search },
  preview: { title: "QR Preview", description: "Preview QR output and export packages for PDF, ZIP, CSV, and print-ready workflows.", icon: QrCode },
  templates: { title: "QR Templates", description: "Create and edit QR templates with logo position, color, frame, label, branding, and preview.", icon: FileText },
  "public-preview": { title: "Public Landing Page Preview", description: "Preview product verification, registration, reward, warranty, and success states for public scan journeys.", icon: QrCode },
  "scan-timeline": { title: "Scan Timeline", description: "Trace generated, printed, dispatched, activated, customer registration, warranty, reward, duplicate, and blocked events.", icon: GitBranch },
};

const resolveMode = (mode: QRMode): QRMode => {
  if (mode === "list") return "codes";
  if (mode === "details") return "code-details";
  if (mode === "gs1-preview") return "gs1";
  if (mode === "parent-child") return "aggregation";
  if (mode === "lifecycle") return "code-details";
  if (mode === "pdf" || mode === "zip" || mode === "csv") return "preview";
  return mode;
};

const actionButtonClass = "inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800";

const Header = ({ mode }: { mode: QRMode }) => {
  const normalized = resolveMode(mode);
  const meta = modeMeta[normalized] || modeMeta.dashboard;
  const Icon = meta.icon;

  return (
    <PageToolbar
      title={meta.title}
      description={meta.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Enterprise QR Platform</p>
        </div>
      }
      end={
        <>
          <Link to="/qr/generate" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <QrCode className="h-4 w-4" />
            Generate
          </Link>
          <SecondaryButton icon={Upload}>Import</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [query, rows]);

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select value="" onChange={() => undefined} placeholder="All statuses" label="Status" options={["Active", "Generated", "Claimed", "Voided", "Expired"].map((value) => ({ label: value, value }))} />
    <Select value="" onChange={() => undefined} placeholder="All QR types" label="QR Type" options={["Static", "Dynamic", "Secure", "Encrypted", "GS1 Digital Link"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Widget = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className={cn(panelBase, "p-4")}>
    <h2 className="text-sm font-semibold text-white">{title}</h2>
    <div className="mt-4 space-y-3">{children}</div>
  </section>
);

const CompactRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-slate-200">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      {status ? <QrStatusBadge status={status} /> : null}
    </div>
  </div>
);

const QrBatchForm = () => (
  <ReusableFormLayout title="QR Batch Details" description="Static QR batch form ready for backend binding." columns={3}>
    {["Batch Name", "Batch Number", "Product", "SKU", "Factory", "Warehouse", "Quantity", "Prefix", "Serial Format", "Campaign", "Start Serial", "End Serial"].map((label) => (
      <TextInput key={label} label={label} defaultValue={label === "Product" ? "Industrial Adhesive Pro" : label === "SKU" ? "ADH-PRO-20KG" : ""} />
    ))}
    <Select label="QR Type" value="Secure" onChange={() => undefined} options={["Static", "Dynamic", "Secure", "Encrypted", "GS1 Digital Link"].map((value) => ({ label: value, value }))} />
    <TextInput label="Manufacturing Date" type="date" defaultValue="2026-07-01" />
    <TextInput label="Expiry Date" type="date" defaultValue="2027-03-18" />
    <Select label="Status" value="Generated" onChange={() => undefined} options={["Generated", "Active", "Paused", "Archived", "Expired"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const BatchDetails = () => {
  const { id } = useParams();
  const batch = qrBatches.find((item) => item.id === id) || qrBatches[0];

  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{batch.batchNumber}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{batch.batchName}</h2>
            <p className="mt-2 text-sm text-slate-400">{batch.product} / {batch.sku} / {batch.quantity} QR codes</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Generate", QrCode],
              ["Pause", Pause],
              ["Resume", Play],
              ["Archive", Archive],
              ["Delete", Trash2],
              ["PDF", FileText],
              ["ZIP", FileArchive],
              ["CSV", FileSpreadsheet],
            ].map(([label, Icon]) => (
              <button key={label as string} className={actionButtonClass}>
                <Icon className="h-4 w-4" />
                {label as string}
              </button>
            ))}
          </div>
        </div>
      </section>
      <BatchProgressCard generated={batch.generated} printed={batch.printed} activated={batch.activated} claimed={batch.claimed} />
      <section className={cn(panelBase, "overflow-hidden")}>
        <div className="flex gap-2 overflow-x-auto border-b border-slate-800 px-4 py-3">
          {qrBatchTabs.map((tab, index) => (
            <button key={tab} className={cn("h-9 shrink-0 rounded-md px-3 text-sm font-semibold", index === 0 ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:bg-slate-900 hover:text-white")}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(batch).slice(1, 13).map(([key, value]) => (
              <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{value}</p>
              </div>
            ))}
          </div>
          <QrPreview serial={batch.startSerial} />
        </div>
      </section>
    </div>
  );
};

const CodeDetails = () => (
  <div className="space-y-4">
    <QrPreview title="QR Code Details" serial={qrCodes[0].serial} />
    <section className={cn(panelBase, "grid gap-4 p-4 lg:grid-cols-[1fr_360px]")}>
      <div className="grid gap-3 md:grid-cols-2">
        {["Overview", "Scan History", "Consumer", "Warranty", "Rewards", "Campaign", "Audit", "Security"].map((label) => (
          <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Static detail panel ready for backend data.</p>
          </div>
        ))}
      </div>
      <QrTimeline />
    </section>
  </div>
);

const Gs1Workspace = () => (
  <div className="space-y-5">
    <ReusableFormLayout title="Create GS1 Template" description="GTIN, serial, batch, expiry, lot, URL template, validation, and parser preview." columns={3}>
      <TextInput label="GTIN" defaultValue="08901234567890" />
      <TextInput label="Serial" defaultValue="ADH-2026-000001" />
      <TextInput label="Batch" defaultValue="BCH-2026-001" />
      <TextInput label="Expiry" type="date" defaultValue="2027-03-18" />
      <TextInput label="Lot" defaultValue="LOT-PUN-2407" />
      <TextInput label="URL Template" defaultValue="https://id.gs1.org/01/{gtin}/21/{serial}/10/{batch}" />
    </ReusableFormLayout>
    <Gs1Table rows={gs1Templates} />
    <QrPreview title="Digital Link Preview" serial="https://id.gs1.org/01/08901234567890/21/ADH-2026-000001" />
  </div>
);

const AggregationWorkspace = () => (
  <div className="space-y-5">
    <section className="grid gap-4 md:grid-cols-4">
      {["Item QR", "Box QR", "Case QR", "Pallet QR"].map((label) => (
        <div key={label} className={cn(panelBase, "p-4")}>
          <GitBranch className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">{label}</p>
          <p className="mt-1 text-xs text-slate-500">Aggregation node ready.</p>
        </div>
      ))}
    </section>
    <HierarchyViewer />
    <EnterpriseDataTable rows={aggregationNodes} columns={[
      { id: "id", header: "Node", accessor: "id" },
      { id: "label", header: "Level", accessor: "label" },
      { id: "parent", header: "Parent", accessor: "parent" },
      { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
    ]} />
  </div>
);

const PrintWorkspace = () => (
  <div className="space-y-5">
    <QrPrintQueue />
    <QRPrintJobTable />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {["Printer Configuration", "Templates", "PDF", "CSV", "ZIP", "Label Preview", "Zebra", "Honeywell", "TSC"].map((label) => (
        <div key={label} className={cn(panelBase, "p-4")}>
          <Printer className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">{label}</p>
          <p className="mt-1 text-xs text-slate-500">Static print management panel.</p>
        </div>
      ))}
    </section>
  </div>
);

const SecurityWorkspace = () => (
  <div className="space-y-5">
    <KPIGrid items={securityCards.map((item) => ({ ...item, target: "Static rules", progress: 58 }))} />
    <section className="grid gap-4 md:grid-cols-3">
      <QRSecurityCard title="Duplicate Scans" detail="Repeated scan clusters for the same serial across distant locations." status="Critical" />
      <QRSecurityCard title="Geo Velocity" detail="Impossible travel patterns and unusual device switching." status="High" />
      <QRSecurityCard title="Blocked QR" detail="Voided and blocked QR codes ready for security workflows." status="Medium" />
    </section>
    <div className="grid gap-4 md:grid-cols-3">
      {securityEvents.map((event) => <QrSecurityCard key={event.id} event={event} />)}
    </div>
    <SecurityEventTable rows={securityEvents} />
  </div>
);

const AnalyticsWorkspace = () => {
  const columns: DataTableColumn<(typeof scanSourceRows)[number]>[] = [
    { id: "source", header: "Source", accessor: "source" },
    { id: "scans", header: "Scans", accessor: "scans" },
    { id: "uniqueUsers", header: "Unique Users", accessor: "uniqueUsers" },
    { id: "repeatScans", header: "Repeat Scans", accessor: "repeatScans" },
    { id: "country", header: "Country", accessor: "country" },
    { id: "state", header: "State", accessor: "state" },
    { id: "city", header: "City", accessor: "city" },
    { id: "device", header: "Device", accessor: "device" },
    { id: "browser", header: "Browser", accessor: "browser" },
  ];
  return (
    <div className="space-y-5">
      <QrAnalyticsCharts />
      <ScanHeatmapPlaceholder />
      <EnterpriseDataTable rows={scanSourceRows} columns={columns} />
    </div>
  );
};

const EnterpriseQRPlatform = ({ mode = "dashboard" }: { mode?: QRMode }) => {
  const normalized = resolveMode(mode);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filteredBatches = useFilteredRows(qrBatches, query);
  const filteredCodes = useFilteredRows(qrCodes, query);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />

      {normalized === "dashboard" ? <QRDashboard /> : null}
      {normalized === "generate" || normalized === "bulk-generate" ? <QrGeneratorWizard /> : null}
      {normalized === "batch-create" || normalized === "batch-edit" ? <QrBatchForm /> : null}
      {normalized === "batch-details" ? <BatchDetails /> : null}
      {normalized === "code-details" ? <CodeDetails /> : null}
      {normalized === "gs1" ? <Gs1Workspace /> : null}
      {normalized === "aggregation" ? <AggregationWorkspace /> : null}
      {normalized === "print" ? <PrintWorkspace /> : null}
      {normalized === "security" ? <SecurityWorkspace /> : null}
      {normalized === "analytics" ? <AnalyticsWorkspace /> : null}
      {normalized === "preview" ? <QrPreview /> : null}
      {normalized === "templates" ? <QRTemplateEditor /> : null}
      {normalized === "public-preview" ? <PublicLandingPreview /> : null}
      {normalized === "scan-timeline" ? (
        <section className={cn(panelBase, "p-4")}>
          <QrTimeline />
        </section>
      ) : null}

      {normalized === "batches" ? (
        <>
          <KPIGrid items={qrBatchKpis} />
          <FilterBar query={query} setQuery={setQuery} label="QR batches" />
          <QrBatchTable rows={filteredBatches} />
          <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel="Static QR batch records" />
        </>
      ) : null}

      {normalized === "codes" ? (
        <>
          <FilterBar query={query} setQuery={setQuery} label="QR codes" />
          <QrCodeTable rows={filteredCodes} />
          <Pagination page={page} pageCount={6} onPageChange={setPage} totalLabel="Static QR code records" />
        </>
      ) : null}

      {normalized === "gs1" ? <GS1PreviewCard /> : null}

      {["dashboard", "generate", "bulk-generate", "batch-create", "batch-details", "batch-edit", "code-details", "gs1", "aggregation", "print", "security", "analytics", "preview", "batches", "codes", "templates", "public-preview", "scan-timeline"].includes(normalized) ? null : (
        <EmptyState title="QR workspace ready" description="Static frontend placeholder for the selected QR workflow." />
      )}
    </div>
  );
};

export default EnterpriseQRPlatform;
