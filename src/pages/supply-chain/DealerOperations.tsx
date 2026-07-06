import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Bot, Download, FileBarChart, History, PackageSearch, Plus, RefreshCw, RotateCcw, Search, ShieldCheck, ShoppingCart, Store, Upload, Users, WalletCards, Wrench } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, PageToolbar, Pagination, ReusableFormLayout, SearchInput, SecondaryButton, Select, TextInput } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { dealerCustomers } from "../../data/dealer/dealerCustomerDemoData";
import { dealerInsights, dealers } from "../../data/dealer/dealerDemoData";
import { dealerInventory } from "../../data/dealer/dealerInventoryDemoData";
import { dealerOrders } from "../../data/dealer/dealerOrderDemoData";
import { dealerProjects } from "../../data/dealer/dealerProjectDemoData";
import { dealerReturns } from "../../data/dealer/dealerReturnDemoData";
import { dealerRewards } from "../../data/dealer/dealerRewardDemoData";
import { dealerWarranties } from "../../data/dealer/dealerWarrantyDemoData";
import { DealerAIInsightCard, DealerRewardCard } from "./dealer/DealerCards";
import { DealerForm } from "./dealer/DealerForms";
import { DealerStatusBadge } from "./dealer/DealerStatusBadge";
import { DealerCustomerTable, DealerInventoryTable, DealerOrderTable, DealerProjectTable, DealerReturnTable, DealerTable, DealerWarrantyTable } from "./dealer/DealerTables";
import {
  DealerAnalyticsCharts as Phase5DealerAnalyticsCharts,
  DealerAudit,
  DealerCustomersPanel,
  DealerDashboard as Phase5DealerDashboard,
  DealerDirectoryFilters,
  DealerDocuments,
  DealerEmptyPlaceholder,
  DealerInventoryCards,
  DealerInventoryTable as Phase5DealerInventoryTable,
  DealerOrdersDashboard,
  DealerProfileTabs,
  DealerQrActivity,
  DealerRewardsPanel,
  DealerTable as Phase5DealerTable,
  DealerWalletCard as Phase5DealerWalletCard,
} from "./dealer/DealerPhase5Components";

type DealerMode =
  | "dashboard" | "list" | "create" | "details" | "edit"
  | "orders" | "order-create" | "order-details"
  | "inventory" | "inventory-details"
  | "customers" | "customer-create" | "customer-details" | "crm"
  | "wallet" | "rewards" | "warranty"
  | "returns" | "return-create" | "return-details"
  | "projects" | "project-create" | "project-details"
  | "support" | "analytics" | "leaderboard" | "ai-insights" | "claims" | "reports"
  | "qr" | "documents" | "audit";

const meta: Record<string, { title: string; description: string; icon: typeof Store }> = {
  dashboard: { title: "Dealer Dashboard", description: "Dealer command center for sales, orders, wallet, rewards, target achievement, low stock, warranty, support, and AI insights.", icon: Store },
  list: { title: "Dealers", description: "Manage dealer profiles, approvals, territory assignment, distributor mapping, credit limit, payment terms, and audit readiness.", icon: Store },
  create: { title: "Create Dealer", description: "Static dealer onboarding form prepared for backend integration.", icon: Plus },
  edit: { title: "Edit Dealer", description: "Update dealer profile and commercial configuration.", icon: Store },
  details: { title: "Dealer Profile", description: "Dealer overview with inventory, orders, customers, CRM, wallet, rewards, warranty, returns, projects, analytics, documents, history, and audit log.", icon: Store },
  inventory: { title: "Dealer Inventory", description: "Stock list, details, movement, low stock, damaged stock, near expiry, and stock adjustment placeholder.", icon: PackageSearch },
  orders: { title: "Dealer Orders", description: "Dealer order list, create order, details, tracking, approval, invoice download, and shipment tracking placeholders.", icon: ShoppingCart },
  customers: { title: "Dealer Customers", description: "Customer dashboard, customer list, add customer, details, follow-ups, and purchase history.", icon: Users },
  crm: { title: "Dealer CRM", description: "Follow-ups, customer relationship status, purchase history, and engagement signals.", icon: Users },
  wallet: { title: "Dealer Wallet", description: "Wallet dashboard, transaction history, earnings, payouts, tier status, and leaderboard rank.", icon: WalletCards },
  rewards: { title: "Dealer Rewards", description: "Reward earnings, redemption requests, scheme progress, and reward catalog preview.", icon: Award },
  qr: { title: "Dealer QR Activity", description: "Dealer QR generation, activation, customer scans, duplicate alerts, counterfeit alerts, and QR trend.", icon: Search },
  warranty: { title: "Dealer Warranty", description: "Warranty registration assistance, warranty claims, claim status, and customer product history.", icon: ShieldCheck },
  returns: { title: "Dealer Returns", description: "Return requests, create return, details, inspection status, replacement, and credit note workflows.", icon: RotateCcw },
  projects: { title: "Dealer Projects", description: "Project list, create project, project products, contractor mapping, and pipeline tracking.", icon: Wrench },
  analytics: { title: "Dealer Analytics", description: "Sales performance, product movement, customer growth, wallet earnings, reward redemption, target achievement, low stock forecast, and AI reorder suggestions.", icon: Bot },
  documents: { title: "Dealer Documents", description: "GST, PAN, agreement, KYC, certificates, and store image document readiness.", icon: FileBarChart },
  audit: { title: "Dealer Audit", description: "Dealer profile updates, orders, rewards, QR and inventory audit timeline.", icon: History },
  support: { title: "Dealer Support", description: "Support tickets, SLA queues, and escalation workflow placeholders.", icon: Bot },
  leaderboard: { title: "Dealer Leaderboard", description: "Dealer rank, tier, wallet, rewards, and target signals.", icon: Award },
  "ai-insights": { title: "Dealer AI Insights", description: "AI reorder suggestions, low stock forecast, reward optimization, and claim risk signals.", icon: Bot },
};

const resolveMode = (mode: DealerMode): DealerMode => {
  if (mode === "claims") return "warranty";
  return mode;
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: DealerMode }) => {
  const normalized = resolveMode(mode);
  const current = meta[normalized] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={<div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Dealer Portal</p></div>}
      end={<><Link to="/dealers/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus className="h-4 w-4" />Create</Link><SecondaryButton icon={Upload}>Import</SecondaryButton><SecondaryButton icon={Download}>Export</SecondaryButton><SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton></>}
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Pending Approval", "Approved", "Low Stock", "Claim", "On Hold"].map((value) => ({ label: value, value }))} />
    <Select label="Territory" value="" onChange={() => undefined} placeholder="All territories" options={["West", "North", "South", "East"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Widget = ({ title, children }: { title: string; children: ReactNode }) => <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">{title}</h2><div className="mt-4 space-y-3">{children}</div></section>;
const CompactRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>{status ? <DealerStatusBadge status={status} /> : null}</div></div>;

const Dashboard = () => (
  <Phase5DealerDashboard />
);

const DetailsPage = () => {
  const { id } = useParams();
  const dealer = dealers.find((item) => item.id === id) || dealers[0];
  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "overflow-hidden p-4")}>
        <DealerProfileTabs dealer={dealer} />
      </section>
    </div>
  );
};

const OperationalForm = ({ title }: { title: string }) => (
  <ReusableFormLayout title={title} description="Static operation form prepared for future workflow." columns={3}>
    {["Dealer", "Customer / Contractor", "Product", "SKU", "Quantity", "Estimated Value", "Expected Delivery", "Remarks"].map((label) => <TextInput key={label} label={label} defaultValue={label === "Dealer" ? dealers[0].dealerName : ""} />)}
    <Select label="Status" value="" onChange={() => undefined} placeholder="Select status" options={["Draft", "Submitted", "Approved", "Inspection", "Replacement", "Active"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const Reports = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["Dealer Statement", "Order Register", "Wallet Ledger", "Reward Performance", "Warranty Claims", "Project Pipeline", "Support SLA", "Customer 360"].map((label) => <button key={label} className={cn(panelBase, "p-5 text-left transition hover:border-cyan-400/30 hover:bg-slate-900")}><FileBarChart className="h-6 w-6 text-cyan-300" /><p className="mt-4 text-sm font-semibold text-white">{label}</p><p className="mt-1 text-xs leading-5 text-slate-500">Static report tile ready for export workflow.</p></button>)}</section>
);

const TableContent = ({ mode, query }: { mode: DealerMode; query: string }) => {
  const filteredDealers = useFilteredRows(dealers, query);
  const filteredInventory = useFilteredRows(dealerInventory, query);
  const filteredOrders = useFilteredRows(dealerOrders, query);
  const filteredCustomers = useFilteredRows(dealerCustomers, query);
  const filteredWarranties = useFilteredRows(dealerWarranties, query);
  const filteredReturns = useFilteredRows(dealerReturns, query);
  const filteredProjects = useFilteredRows(dealerProjects, query);
  if (mode === "list") return <Phase5DealerTable rows={filteredDealers} />;
  if (mode === "inventory") return <DealerInventoryTable rows={filteredInventory} />;
  if (mode === "orders") return <DealerOrderTable rows={filteredOrders} />;
  if (mode === "customers" || mode === "crm") return <DealerCustomerTable rows={filteredCustomers} />;
  if (mode === "warranty") return <DealerWarrantyTable rows={filteredWarranties} />;
  if (mode === "returns") return <DealerReturnTable rows={filteredReturns} />;
  if (mode === "projects") return <DealerProjectTable rows={filteredProjects} />;
  return <EmptyState title="Dealer workspace ready" description="Static frontend records will appear here for this dealer workflow." />;
};

const DealerOperations = ({ mode = "dashboard" }: { mode?: DealerMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const normalized = resolveMode(mode);
  const dealer = dealers.find((item) => item.id === id) || dealers[0];
  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {normalized === "dashboard" ? <Dashboard /> : null}
      {normalized === "create" || normalized === "edit" ? <DealerForm record={normalized === "edit" ? dealer : undefined} /> : null}
      {normalized === "details" ? <DetailsPage /> : null}
      {normalized === "order-create" ? <OperationalForm title="Create Dealer Order" /> : null}
      {normalized === "order-details" ? <DetailsPage /> : null}
      {normalized === "customer-create" ? <OperationalForm title="Add Dealer Customer" /> : null}
      {normalized === "customer-details" ? <DetailsPage /> : null}
      {normalized === "return-create" ? <OperationalForm title="Create Dealer Return" /> : null}
      {normalized === "return-details" ? <DetailsPage /> : null}
      {normalized === "project-create" ? <OperationalForm title="Create Dealer Project" /> : null}
      {normalized === "project-details" ? <DetailsPage /> : null}
      {normalized === "wallet" ? <Phase5DealerWalletCard /> : null}
      {normalized === "rewards" ? <DealerRewardsPanel /> : null}
      {normalized === "qr" ? <DealerQrActivity /> : null}
      {normalized === "documents" ? <DealerDocuments /> : null}
      {normalized === "audit" ? <DealerAudit /> : null}
      {normalized === "analytics" ? <><Phase5DealerAnalyticsCharts /><section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Inventory Turnover, QR Scan Analytics and AI Reorder Suggestions</h2><div className="mt-4 space-y-3">{dealerInsights.map((insight) => <DealerAIInsightCard key={insight} insight={insight} />)}</div></section></> : null}
      {normalized === "leaderboard" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{dealers.map((item, index) => <DealerRewardCard key={item.id} title={`#${index + 1} ${item.dealerName}`} detail={`${item.targetAchievement} target / ${item.walletBalance}`} status={item.status} />)}</div> : null}
      {normalized === "ai-insights" ? <Widget title="AI Dealer Insights">{dealerInsights.map((insight) => <DealerAIInsightCard key={insight} insight={insight} />)}</Widget> : null}
      {normalized === "support" ? <Widget title="Dealer Support Tickets"><CompactRow title="Support queue" detail="Tickets, SLA and escalation placeholders" status="Pending" /></Widget> : null}
      {normalized === "reports" ? <Reports /> : null}
      {normalized === "orders" ? <DealerOrdersDashboard /> : null}
      {normalized === "inventory" ? <><DealerInventoryCards /><Phase5DealerInventoryTable /></> : null}
      {normalized === "customers" ? <DealerCustomersPanel /> : null}
      {normalized === "warranty" ? <TableContent mode={normalized} query={query} /> : null}
      {["list", "crm", "returns", "projects"].includes(normalized) ? <>{normalized === "list" ? <DealerDirectoryFilters query={query} setQuery={setQuery} /> : <FilterBar query={query} setQuery={setQuery} label={meta[normalized]?.title || "Dealer"} />}<TableContent mode={normalized} query={query} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${meta[normalized]?.title || "Dealer Portal"}`} /></> : null}
    </div>
  );
};

export default DealerOperations;
