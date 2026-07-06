import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BadgePercent,
  Bot,
  CreditCard,
  Download,
  FileBarChart,
  PackageSearch,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingCart,
  Store,
  Truck,
  Upload,
  WalletCards,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  AdvancedFilters,
  EmptyState,
  PageToolbar,
  Pagination,
  ReusableFormLayout,
  SearchInput,
  SecondaryButton,
  Select,
  TextInput,
} from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { distributorDealers } from "../../data/distributor/distributorDealerDemoData";
import { distributorInventory } from "../../data/distributor/distributorInventoryDemoData";
import { distributors, distributorWidgets } from "../../data/distributor/distributorDemoData";
import { distributorOrders } from "../../data/distributor/distributorOrderDemoData";
import { distributorPayments } from "../../data/distributor/distributorPaymentDemoData";
import { distributorReturns } from "../../data/distributor/distributorReturnDemoData";
import { distributorSchemes } from "../../data/distributor/distributorSchemeDemoData";
import { SchemeProgressCard } from "./distributor/DistributorCards";
import { DistributorForm } from "./distributor/DistributorForms";
import { DistributorStatusBadge } from "./distributor/DistributorStatusBadge";
import {
  DealerNetworkTable,
  DistributorInventoryTable,
  DistributorOrderTable,
  DistributorPaymentTable,
  DistributorReturnTable,
  DistributorSchemeTable,
  DistributorTable,
} from "./distributor/DistributorTables";
import {
  DistributorAnalyticsCharts as Phase6DistributorAnalyticsCharts,
  DistributorAudit,
  DistributorCollectionTimeline,
  DistributorDashboard as Phase6DistributorDashboard,
  DistributorDealerTable as Phase6DistributorDealerTable,
  DistributorDirectoryFilters,
  DistributorDocuments,
  DistributorInventoryCards,
  DistributorInventoryTable as Phase6DistributorInventoryTable,
  DistributorOrdersDashboard,
  DistributorPaymentTable as Phase6DistributorPaymentTable,
  DistributorProfileTabs,
  DistributorReturnTable as Phase6DistributorReturnTable,
  DistributorRewardsPanel,
  DistributorTable as Phase6DistributorTable,
  DistributorWalletCard as Phase6DistributorWalletCard,
} from "./distributor/DistributorPhase6Components";

type DistributorMode =
  | "dashboard"
  | "list"
  | "create"
  | "details"
  | "edit"
  | "orders"
  | "order-create"
  | "order-details"
  | "inventory"
  | "inventory-details"
  | "dealers"
  | "dealer-create"
  | "dealer-details"
  | "collections"
  | "payments"
  | "wallet"
  | "rewards"
  | "schemes"
  | "returns"
  | "return-create"
  | "return-details"
  | "reports"
  | "analytics"
  | "crm"
  | "invoices"
  | "documents"
  | "audit";

const modeMeta: Record<string, { title: string; description: string; icon: typeof Truck }> = {
  dashboard: { title: "Distributor Dashboard", description: "Distributor command center for territory coverage, orders, revenue, collections, wallet, schemes, returns, low stock, and AI insights.", icon: Truck },
  list: { title: "Distributors", description: "Manage distributor profiles, approvals, territories, credit limits, payment terms, bank details, documents, history, and audit logs.", icon: Truck },
  create: { title: "Create Distributor", description: "Static distributor profile form prepared for onboarding workflow.", icon: Plus },
  edit: { title: "Edit Distributor", description: "Update distributor profile fields with frontend-only static data.", icon: Truck },
  details: { title: "Distributor Profile", description: "View distributor overview, dealers, orders, inventory, payments, wallet, rewards, schemes, returns, analytics, documents, history, and audit log.", icon: Truck },
  orders: { title: "Distributor Orders", description: "Order list, creation, approval, tracking, dispatch, invoice download, and shipment tracking placeholders.", icon: ShoppingCart },
  inventory: { title: "Distributor Inventory", description: "Inventory dashboard, stock list, details, movement, transfer, aging, and low stock workspace.", icon: PackageSearch },
  dealers: { title: "Dealer Network", description: "Dealer network dashboard, dealer list, add dealer, details, performance, orders, and wallet under distributor.", icon: Store },
  collections: { title: "Collections", description: "Collection dashboard, outstanding list, payment details, and collection timeline.", icon: CreditCard },
  payments: { title: "Payments", description: "Payment list, outstanding amount, due dates, payment modes, and payment status.", icon: CreditCard },
  wallet: { title: "Distributor Wallet", description: "Wallet dashboard, transactions, reward earnings, redemption requests, scheme progress, and balances.", icon: WalletCards },
  rewards: { title: "Distributor Rewards", description: "Reward earnings, redemption requests, catalog preview, cashback, and payout states.", icon: BadgePercent },
  schemes: { title: "Distributor Schemes", description: "Active schemes, scheme details, progress, target vs achievement, and calculator placeholder.", icon: BadgePercent },
  returns: { title: "Distributor Returns", description: "Return requests, inspection, approval, replacement, and credit note workflows.", icon: RotateCcw },
  reports: { title: "Distributor Reports", description: "Distributor statement, order register, invoice aging, collections, wallet, rewards, inventory, and network reports.", icon: FileBarChart },
  analytics: { title: "Distributor Analytics", description: "Territory heatmap placeholder, sales performance, order frequency, dealer activation, credit exposure, scheme ROI, and return rate.", icon: Bot },
  documents: { title: "Distributor Documents", description: "GST, PAN, agreement, KYC, bank documents and certificates.", icon: FileBarChart },
  audit: { title: "Distributor Audit", description: "Profile updates, orders, payments, collections, rewards, inventory and returns audit timeline.", icon: FileBarChart },
  crm: { title: "Distributor CRM", description: "Distributor relationship notes, follow-ups, account health, and AI insights placeholders.", icon: Bot },
};

const resolveMode = (mode: DistributorMode): DistributorMode => {
  if (mode === "invoices") return "payments";
  if (mode === "order-create") return "order-create";
  if (mode === "order-details") return "order-details";
  return mode;
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: DistributorMode }) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Distributor Portal</p>
        </div>
      }
      end={
        <>
          <Link to="/distributors/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />
            Create
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
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Pending Approval", "Approved", "Packed", "Overdue", "Low Stock"].map((value) => ({ label: value, value }))} />
    <Select label="Territory" value="" onChange={() => undefined} placeholder="All territories" options={["West", "North", "South", "East"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Dashboard = () => (
  <Phase6DistributorDashboard />
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
      {status ? <DistributorStatusBadge status={status} /> : null}
    </div>
  </div>
);

const DetailsPage = () => {
  const { id } = useParams();
  const distributor = distributors.find((item) => item.id === id) || distributors[0];
  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "overflow-hidden p-4")}>
        <DistributorProfileTabs distributor={distributor} />
      </section>
    </div>
  );
};

const OperationalForm = ({ title }: { title: string }) => (
  <ReusableFormLayout title={title} description="Static operation form prepared for backend workflow." columns={3}>
    {["Distributor", "Product", "SKU", "Quantity", "Amount", "Expected Delivery Date", "Remarks"].map((label) => (
      <TextInput key={label} label={label} defaultValue={label === "Distributor" ? distributors[0].distributorName : ""} />
    ))}
    <Select label="Status" value="" onChange={() => undefined} placeholder="Select status" options={["Draft", "Submitted", "Approved", "Inspection", "Replacement"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const Reports = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {["Distributor Statement", "Order Register", "Invoice Aging", "Collections Report", "Wallet Ledger", "Reward Liability", "Inventory Holding", "Dealer Network"].map((label) => (
      <button key={label} className={cn(panelBase, "p-5 text-left transition hover:border-cyan-400/30 hover:bg-slate-900")}>
        <FileBarChart className="h-6 w-6 text-cyan-300" />
        <p className="mt-4 text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Static report tile ready for export workflow.</p>
      </button>
    ))}
  </section>
);

const TableContent = ({ mode, query }: { mode: DistributorMode; query: string }) => {
  const filteredDistributors = useFilteredRows(distributors, query);
  const filteredOrders = useFilteredRows(distributorOrders, query);
  const filteredInventory = useFilteredRows(distributorInventory, query);
  const filteredDealers = useFilteredRows(distributorDealers, query);
  const filteredPayments = useFilteredRows(distributorPayments, query);
  const filteredSchemes = useFilteredRows(distributorSchemes, query);
  const filteredReturns = useFilteredRows(distributorReturns, query);

  if (mode === "list") return <Phase6DistributorTable rows={filteredDistributors} />;
  if (mode === "orders") return <DistributorOrderTable rows={filteredOrders} />;
  if (mode === "inventory") return <DistributorInventoryTable rows={filteredInventory} />;
  if (mode === "dealers") return <DealerNetworkTable rows={filteredDealers} />;
  if (mode === "collections" || mode === "payments") return <DistributorPaymentTable rows={filteredPayments} />;
  if (mode === "schemes") return <DistributorSchemeTable rows={filteredSchemes} />;
  if (mode === "returns") return <DistributorReturnTable rows={filteredReturns} />;
  if (mode === "wallet" || mode === "rewards") return <DistributorPaymentTable rows={filteredPayments} />;
  return <EmptyState title="Distributor workspace ready" description="Static frontend records will appear here for this distributor workflow." />;
};

const DistributorOperations = ({ mode = "dashboard" }: { mode?: DistributorMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const normalized = resolveMode(mode);
  const distributor = distributors.find((item) => item.id === id) || distributors[0];

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />

      {normalized === "dashboard" ? <Dashboard /> : null}
      {normalized === "create" || normalized === "edit" ? <DistributorForm record={normalized === "edit" ? distributor : undefined} /> : null}
      {normalized === "details" ? <DetailsPage /> : null}
      {normalized === "order-create" ? <OperationalForm title="Create Distributor Order" /> : null}
      {normalized === "order-details" ? <DetailsPage /> : null}
      {normalized === "dealer-create" ? <OperationalForm title="Add Dealer" /> : null}
      {normalized === "dealer-details" ? <DetailsPage /> : null}
      {normalized === "return-create" ? <OperationalForm title="Create Distributor Return" /> : null}
      {normalized === "return-details" ? <DetailsPage /> : null}
      {normalized === "wallet" ? <Phase6DistributorWalletCard /> : null}
      {normalized === "rewards" ? <DistributorRewardsPanel /> : null}
      {normalized === "schemes" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{distributorSchemes.map((scheme) => <SchemeProgressCard key={scheme.id} scheme={scheme} />)}</div> : null}
      {normalized === "collections" ? <><Phase6DistributorPaymentTable /><DistributorCollectionTimeline /></> : null}
      {normalized === "payments" ? <Phase6DistributorPaymentTable /> : null}
      {normalized === "orders" ? <DistributorOrdersDashboard /> : null}
      {normalized === "inventory" ? <><DistributorInventoryCards /><Phase6DistributorInventoryTable /></> : null}
      {normalized === "dealers" ? <Phase6DistributorDealerTable /> : null}
      {normalized === "returns" ? <Phase6DistributorReturnTable /> : null}
      {normalized === "documents" ? <DistributorDocuments /> : null}
      {normalized === "audit" ? <DistributorAudit /> : null}
      {normalized === "analytics" ? (
        <>
          <Phase6DistributorAnalyticsCharts />
          <section className={cn(panelBase, "p-4")}>
            <h2 className="text-sm font-semibold text-white">Territory Heatmap Placeholder</h2>
            <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 text-sm text-slate-500">
              Territory heatmap placeholder for sales performance, order frequency, dealer activation, credit exposure, scheme ROI, and return rate.
            </div>
          </section>
        </>
      ) : null}
      {normalized === "reports" ? <Reports /> : null}
      {normalized === "crm" ? <Widget title="AI Distributor Insights">{distributorWidgets.insights.map((item) => <CompactRow key={item} title="Distributor insight" detail={item} />)}</Widget> : null}

      {["list", "schemes"].includes(normalized) ? (
        <>
          {normalized === "list" ? <DistributorDirectoryFilters query={query} setQuery={setQuery} /> : <FilterBar query={query} setQuery={setQuery} label={modeMeta[normalized]?.title || "Distributor"} />}
          <TableContent mode={normalized} query={query} />
          <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${modeMeta[normalized]?.title || "Distributor Portal"}`} />
        </>
      ) : null}
    </div>
  );
};

export default DistributorOperations;
