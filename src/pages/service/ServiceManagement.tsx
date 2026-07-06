import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, FilePlus2, LifeBuoy, Plus, RefreshCw, ShieldCheck, Upload, Wrench } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, EnterpriseDataTable, KPIGrid, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { amcPlans } from "../../data/service/amcDemoData";
import { claims } from "../../data/service/claimDemoData";
import { helpdeskTickets, knowledgeBase } from "../../data/service/helpdeskDemoData";
import { rmaRows } from "../../data/service/rmaDemoData";
import { serviceContracts, serviceRequests } from "../../data/service/serviceDemoData";
import { partsUsed, technicians } from "../../data/service/technicianDemoData";
import { warranties, warrantyInsights, warrantyKpis } from "../../data/service/warrantyDemoData";
import type { WarrantyRecord } from "../../data/service/warrantyDemoData";
import { AMCCard, ClaimTimeline, KnowledgeBaseCard, RoutePlannerPlaceholder, ServiceRequestCard, TechnicianCard, TicketTimeline, WarrantyCard, WarrantyCertificate, WarrantyTimeline } from "./components/ServiceCards";
import { AnalyticsCharts } from "./components/ServiceCharts";
import { ClaimForm, ServiceRequestForm, WarrantyRegistrationForm } from "./components/ServiceForms";
import { ClaimTable, HelpdeskTable, RMATable, ServiceRequestTable } from "./components/ServiceTables";
import { ServiceStatusBadge } from "./components/ServiceStatusBadge";

type ServiceMode =
  | "warranty"
  | "warranty-register"
  | "warranty-details"
  | "claims"
  | "claim-create"
  | "claim-details"
  | "service-requests"
  | "service-create"
  | "field-service"
  | "amc"
  | "rma"
  | "helpdesk"
  | "service-contracts"
  | "analytics";

const meta: Record<ServiceMode, { title: string; description: string; label: string }> = {
  warranty: { title: "Warranty Dashboard", description: "Warranty registrations, claims, repair requests, replacements, resolution time, and customer satisfaction.", label: "Warranty" },
  "warranty-register": { title: "Register Warranty", description: "Register customer product warranty with QR, serial, invoice, dealer, retailer, and coverage dates.", label: "Warranty" },
  "warranty-details": { title: "Warranty Details", description: "Certificate, history, timeline, customer, product, QR, invoice, and warranty coverage detail.", label: "Warranty" },
  claims: { title: "Warranty Claims", description: "Claim dashboard, approval queue, inspection report, evidence, priority, and assigned engineer tracking.", label: "Claims" },
  "claim-create": { title: "Create Warranty Claim", description: "Static claim creation form for issue, photos, videos, priority, engineer, and status.", label: "Claims" },
  "claim-details": { title: "Claim Details", description: "Claim summary, timeline, inspection, approval queue, and field service context.", label: "Claims" },
  "service-requests": { title: "Service Requests", description: "Open requests, assigned jobs, completed jobs, cancelled jobs, schedule, priority, and technician assignment.", label: "Service Requests" },
  "service-create": { title: "Create Service Request", description: "Static service request form prepared for future dispatch and technician workflow.", label: "Service Requests" },
  "field-service": { title: "Field Service", description: "Technician dashboard, today's jobs, route planner, visit history, attendance, checklist, and parts used.", label: "Field Service" },
  amc: { title: "AMC Management", description: "AMC dashboard, plans, renewals, expired AMC, payment status, and coverage summaries.", label: "AMC" },
  rma: { title: "RMA Management", description: "RMA dashboard, create RMA, inspection, repair, replacement, refund, credit note, and timeline.", label: "RMA" },
  helpdesk: { title: "Helpdesk", description: "Ticket list, ticket details, knowledge base, FAQ, SLA support, and live chat placeholder.", label: "Helpdesk" },
  "service-contracts": { title: "Service Contracts", description: "Contracts, renewals, coverage, payments, history, and customer service coverage.", label: "Contracts" },
  analytics: { title: "Service Analytics", description: "Warranty, claim, repair, technician performance, resolution, CSAT, parts consumption, and cost analysis.", label: "Analytics" },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: ServiceMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode === "helpdesk" ? <LifeBuoy className="h-5 w-5" /> : mode === "field-service" ? <Wrench className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Warranty, Service & Helpdesk</p>
        </div>
      }
      end={
        <>
          <Link to="/warranty/register" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />Register
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
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Registered", "Pending", "Assigned", "Inspection", "Approved", "Rejected", "Resolved", "Expired"].map((value) => ({ label: value, value }))} />
    <Select label="Priority" value="" onChange={() => undefined} placeholder="All priorities" options={["Low", "Medium", "High", "Critical"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const WarrantyTable = ({ rows }: { rows: WarrantyRecord[] }) => {
  const columns: DataTableColumn<WarrantyRecord>[] = [
    { id: "id", header: "Warranty", accessor: "id", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "serial", header: "Serial", accessor: "serialNumber" },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "end", header: "Warranty End", accessor: "warrantyEnd" },
    { id: "status", header: "Status", cell: (row) => <ServiceStatusBadge status={row.status} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

const GenericTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") ? <ServiceStatusBadge status={String(row[key])} /> : String(row[key]),
  }));

  return rows.length ? <EnterpriseDataTable rows={rows} columns={columns} /> : <EmptyState title="No records" description="Static service records will appear here." />;
};

const DashboardWidgets = () => (
  <div className="grid gap-4 xl:grid-cols-4">
    <section className={cn(panelBase, "p-4 xl:col-span-2")}>
      <h3 className="text-sm font-semibold text-white">Recent Registrations</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {warranties.slice(0, 4).map((warranty) => <WarrantyCard key={warranty.id} warranty={warranty} />)}
      </div>
    </section>
    <section className={cn(panelBase, "p-4")}>
      <h3 className="text-sm font-semibold text-white">Pending Approval</h3>
      <div className="mt-4 space-y-3">
        {claims.map((claim) => (
          <div key={claim.id} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-sm font-semibold text-white">{claim.claimNumber}</p>
            <p className="mt-1 text-xs text-slate-500">{claim.customer} • {claim.issue}</p>
            <div className="mt-3"><ServiceStatusBadge status={claim.status} /></div>
          </div>
        ))}
      </div>
    </section>
    <section className={cn(panelBase, "p-4")}>
      <h3 className="text-sm font-semibold text-white">AI Warranty Insights</h3>
      <div className="mt-4 space-y-3">
        {warrantyInsights.map((insight) => (
          <p key={insight} className="rounded-md border border-cyan-400/10 bg-cyan-400/5 p-3 text-sm text-slate-300">{insight}</p>
        ))}
      </div>
    </section>
  </div>
);

const DetailView = ({ type }: { type: "warranty" | "claim" }) => {
  const { id } = useParams();
  const warranty = warranties.find((item) => item.id === id) || warranties[0];
  const claim = claims.find((item) => item.id === id) || claims[0];

  if (type === "claim") {
    return (
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <section className={cn(panelBase, "p-4")}>
          <h2 className="text-sm font-semibold text-white">{claim.claimNumber}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(claim).filter(([key]) => key !== "id").map(([key, value]) => (
              <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
                <div className="mt-2 text-sm font-semibold text-white">{key === "status" ? <ServiceStatusBadge status={String(value)} /> : String(value)}</div>
              </div>
            ))}
          </div>
        </section>
        <ClaimTimeline />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <WarrantyCertificate warranty={warranty} />
      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <WarrantyCard warranty={warranty} />
        <WarrantyTimeline />
      </div>
    </div>
  );
};

const ServiceDashboard = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(warranties, query);
  return (
    <>
      <KPIGrid items={warrantyKpis} />
      <AnalyticsCharts compact />
      <DashboardWidgets />
      <WarrantyTable rows={filtered} />
    </>
  );
};

const ServiceRequestsView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(serviceRequests, query);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ServiceRequestCard title="Open Requests" value="148" subtitle="Awaiting dispatch and triage" />
        <ServiceRequestCard title="Assigned Jobs" value="92" subtitle="Technician owned" />
        <ServiceRequestCard title="Completed Jobs" value="1.8K" subtitle="This quarter" />
        <ServiceRequestCard title="Cancelled Jobs" value="17" subtitle="Customer or policy cancelled" />
      </div>
      <ServiceRequestTable rows={filtered} />
    </>
  );
};

const FieldServiceView = () => (
  <>
    <div className="grid gap-4 lg:grid-cols-3">
      {technicians.map((technician) => <TechnicianCard key={technician.id} technician={technician} />)}
    </div>
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <RoutePlannerPlaceholder />
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Service Checklist & Parts Used</h3>
        <div className="mt-4 space-y-3">
          {["Verify QR and serial", "Capture issue photos", "Run product checklist", "Collect customer signature"].map((item) => (
            <div key={item} className="rounded-md border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-300">{item}</div>
          ))}
        </div>
        <div className="mt-4"><GenericTable rows={partsUsed} /></div>
      </section>
    </div>
  </>
);

const AMCView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3">
      {amcPlans.map((plan) => <AMCCard key={plan.id} plan={plan} />)}
    </div>
    <GenericTable rows={amcPlans} />
  </>
);

const HelpdeskView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(helpdeskTickets, query);
  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-4">
        <HelpdeskTable rows={filtered} />
        <section className={cn(panelBase, "p-4")}>
          <h3 className="text-sm font-semibold text-white">Knowledge Base & FAQ</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {knowledgeBase.map((article) => <KnowledgeBaseCard key={article.id} article={article} />)}
          </div>
        </section>
      </div>
      <div className="space-y-4">
        <TicketTimeline status={helpdeskTickets[0].status} />
        <section className={cn(panelBase, "p-4")}>
          <h3 className="text-sm font-semibold text-white">Live Chat Placeholder</h3>
          <div className="mt-4 grid min-h-52 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/60 text-center">
            <div>
              <LifeBuoy className="mx-auto h-8 w-8 text-cyan-300" />
              <p className="mt-2 text-sm font-medium text-slate-200">Agent console placeholder</p>
              <p className="mt-1 text-xs text-slate-500">No realtime chat integration yet.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ServiceManagement = ({ mode = "warranty" }: { mode?: ServiceMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const claimRows = useFilteredRows(claims, query);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {["warranty", "claims", "service-requests", "rma", "helpdesk", "service-contracts"].includes(mode) ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "warranty" ? <ServiceDashboard query={query} /> : null}
      {mode === "warranty-register" ? <WarrantyRegistrationForm /> : null}
      {mode === "warranty-details" ? <DetailView type="warranty" /> : null}
      {mode === "claims" ? <><div className="grid gap-4 md:grid-cols-3"><ServiceRequestCard title="Approval Queue" value="324" subtitle="Pending claim review" /><ServiceRequestCard title="Inspection Reports" value="118" subtitle="Engineer reports due" /><ServiceRequestCard title="Replacement Flow" value="42" subtitle="Linked to RMA" /></div><ClaimTable rows={claimRows} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel="Static warranty claim records" /></> : null}
      {mode === "claim-create" ? <ClaimForm /> : null}
      {mode === "claim-details" ? <DetailView type="claim" /> : null}
      {mode === "service-requests" ? <><ServiceRequestsView query={query} /><Pagination page={page} pageCount={3} onPageChange={setPage} totalLabel="Static service request records" /></> : null}
      {mode === "service-create" ? <ServiceRequestForm /> : null}
      {mode === "field-service" ? <FieldServiceView /> : null}
      {mode === "amc" ? <AMCView /> : null}
      {mode === "rma" ? <><section className={cn(panelBase, "p-4")}><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-semibold text-white">RMA Workflow</h3><p className="mt-1 text-sm text-slate-500">Create RMA, inspection, repair, replacement, refund, credit note, and timeline.</p></div><SecondaryButton icon={FilePlus2}>Create RMA</SecondaryButton></div></section><RMATable rows={rmaRows} /></> : null}
      {mode === "helpdesk" ? <HelpdeskView query={query} /> : null}
      {mode === "service-contracts" ? <GenericTable rows={serviceContracts} /> : null}
      {mode === "analytics" ? <AnalyticsCharts /> : null}
    </div>
  );
};

export default ServiceManagement;
