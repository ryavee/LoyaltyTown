import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Bot, Download, PackageCheck, PackageSearch, Plus, RefreshCw, RotateCcw, Search, ShieldCheck, ShoppingBag, ShoppingCart, Tags, Upload, Users, WalletCards } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, PageToolbar, Pagination, ReusableFormLayout, SearchInput, SecondaryButton, Select, TextInput } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { retailerCustomers } from "../../data/retailer/retailerCustomerDemoData";
import { retailerInsights, retailers } from "../../data/retailer/retailerDemoData";
import { retailerInventory } from "../../data/retailer/retailerInventoryDemoData";
import { retailerOffers } from "../../data/retailer/retailerOfferDemoData";
import { retailerOrders } from "../../data/retailer/retailerOrderDemoData";
import { retailerReturns } from "../../data/retailer/retailerReturnDemoData";
import { retailerRewards } from "../../data/retailer/retailerRewardDemoData";
import { retailerSales } from "../../data/retailer/retailerSalesDemoData";
import { productVerifications } from "../../data/retailer/retailerVerificationDemoData";
import { retailerWarranties } from "../../data/retailer/retailerWarrantyDemoData";
import { RetailerAIInsightCard } from "./retailer/RetailerCards";
import { RetailerForm } from "./retailer/RetailerForms";
import { RetailerStatusBadge } from "./retailer/RetailerStatusBadge";
import { ProductVerificationTable, RetailerCustomerTable, RetailerInventoryTable, RetailerOrderTable, RetailerReturnTable, RetailerSalesTable, RetailerTable, RetailerWarrantyTable } from "./retailer/RetailerTables";
import {
  RetailerAnalyticsCharts as Phase7RetailerAnalyticsCharts,
  RetailerAudit,
  RetailerCustomerTable as Phase7RetailerCustomerTable,
  RetailerDashboard as Phase7RetailerDashboard,
  RetailerDirectoryFilters,
  RetailerDocuments,
  RetailerInventoryCards,
  RetailerInventoryTable as Phase7RetailerInventoryTable,
  RetailerOffersPanel,
  RetailerOrdersDashboard,
  RetailerProfileTabs,
  RetailerReturnTable as Phase7RetailerReturnTable,
  RetailerRewardsPanel,
  RetailerSalesTable as Phase7RetailerSalesTable,
  RetailerTable as Phase7RetailerTable,
  RetailerVerificationTable as Phase7RetailerVerificationTable,
  RetailerWalletCard as Phase7RetailerWalletCard,
  RetailerWarrantyTable as Phase7RetailerWarrantyTable,
} from "./retailer/RetailerPhase7Components";

type RetailMode =
  | "dashboard" | "list" | "create" | "details" | "edit"
  | "inventory" | "inventory-details"
  | "orders" | "order-create" | "order-details"
  | "sales" | "sale-create" | "sale-details"
  | "customers" | "customer-create" | "customer-details"
  | "verification" | "warranty" | "wallet" | "rewards" | "offers"
  | "returns" | "return-create" | "return-details" | "analytics"
  | "documents" | "audit";

const meta: Record<string, { title: string; description: string; icon: typeof ShoppingBag }> = {
  dashboard: { title: "Retailer Dashboard", description: "Retail command center for sales, orders, wallet, rewards, consumer registrations, product verification, warranty assistance, returns, support, and AI insights.", icon: ShoppingBag },
  list: { title: "Retailers", description: "Manage retailer profiles, stores, territories, dealer and distributor assignment, commercial terms, and audit readiness.", icon: ShoppingBag },
  create: { title: "Create Retailer", description: "Static retailer onboarding form prepared for backend integration.", icon: Plus },
  edit: { title: "Edit Retailer", description: "Update retailer profile and store configuration.", icon: ShoppingBag },
  details: { title: "Retailer Profile", description: "Retailer overview with sales, orders, inventory, customers, wallet, rewards, warranty assistance, verification, offers, returns, analytics, documents, history, and audit log.", icon: ShoppingBag },
  inventory: { title: "Retailer Inventory", description: "Stock list, details, movement, low stock, damaged stock, and near expiry.", icon: PackageSearch },
  orders: { title: "Retailer Orders", description: "Retailer order list, create order, order details, tracking, invoice download, and shipment tracking placeholders.", icon: ShoppingCart },
  sales: { title: "Retailer Sales / POS", description: "Sales dashboard, sales list, create sale, sale details, and product verification at sale placeholders.", icon: ShoppingCart },
  customers: { title: "Retailer Customers", description: "Customer dashboard, customer list, add customer, details, purchase history, and warranty history.", icon: Users },
  verification: { title: "Product Verification", description: "Scan verification placeholder, verification history, duplicate alerts, counterfeit alerts, and risk scoring.", icon: PackageCheck },
  warranty: { title: "Warranty Assistance", description: "Warranty registration assistance, registration history, claim assistance, and claim status.", icon: ShieldCheck },
  wallet: { title: "Retailer Wallet", description: "Wallet dashboard, transaction history, reward earnings, redemption requests, scheme progress, and offer earnings.", icon: WalletCards },
  rewards: { title: "Retailer Rewards", description: "Reward earnings, redemption requests, scheme progress, catalog preview, tier status, and leaderboard rank.", icon: Award },
  offers: { title: "Retailer Offers", description: "Active offers, offer details, performance, and local campaigns.", icon: Tags },
  returns: { title: "Retailer Returns", description: "Return requests, create return, details, inspection status, replacement, and credit note workflows.", icon: RotateCcw },
  analytics: { title: "Retailer Analytics", description: "Sales performance, product movement, customer growth, wallet earnings, reward redemption, consumer registration performance, and product verification performance.", icon: Bot },
  documents: { title: "Retailer Documents", description: "GST, PAN, agreement, KYC, bank documents, and store images.", icon: PackageCheck },
  audit: { title: "Retailer Audit", description: "Retailer profile updates, sales, orders, verification, warranty, wallet, rewards, and returns timeline.", icon: Bot },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: RetailMode }) => {
  const current = meta[mode] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={<div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Retailer Portal</p></div>}
      end={<><Link to="/retailers/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus className="h-4 w-4" />Create</Link><SecondaryButton icon={Upload}>Import</SecondaryButton><SecondaryButton icon={Download}>Export</SecondaryButton><SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton></>}
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Pending Approval", "Approved", "Genuine", "Low Stock", "Risk"].map((value) => ({ label: value, value }))} />
    <Select label="Territory" value="" onChange={() => undefined} placeholder="All territories" options={["West", "North", "South", "East"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Widget = ({ title, children }: { title: string; children: ReactNode }) => <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">{title}</h2><div className="mt-4 space-y-3">{children}</div></section>;
const CompactRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>{status ? <RetailerStatusBadge status={status} /> : null}</div></div>;

const Dashboard = () => (
  <Phase7RetailerDashboard />
);

const DetailsPage = () => {
  const { id } = useParams();
  const retailer = retailers.find((item) => item.id === id) || retailers[0];
  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "overflow-hidden p-4")}>
        <RetailerProfileTabs retailer={retailer} />
      </section>
    </div>
  );
};

const OperationalForm = ({ title }: { title: string }) => (
  <ReusableFormLayout title={title} description="Static operation form prepared for future workflow." columns={3}>
    {["Retailer", "Customer", "Product", "SKU", "QR Code", "Quantity", "Amount", "Remarks"].map((label) => <TextInput key={label} label={label} defaultValue={label === "Retailer" ? retailers[0].retailerName : ""} />)}
    <Select label="Status" value="" onChange={() => undefined} placeholder="Select status" options={["Draft", "Submitted", "Approved", "Verified", "Inspection", "Replacement"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const TableContent = ({ mode, query }: { mode: RetailMode; query: string }) => {
  const filteredRetailers = useFilteredRows(retailers, query);
  const filteredInventory = useFilteredRows(retailerInventory, query);
  const filteredOrders = useFilteredRows(retailerOrders, query);
  const filteredSales = useFilteredRows(retailerSales, query);
  const filteredCustomers = useFilteredRows(retailerCustomers, query);
  const filteredVerifications = useFilteredRows(productVerifications, query);
  const filteredWarranties = useFilteredRows(retailerWarranties, query);
  const filteredReturns = useFilteredRows(retailerReturns, query);
  if (mode === "list") return <Phase7RetailerTable rows={filteredRetailers} />;
  if (mode === "inventory") return <RetailerInventoryTable rows={filteredInventory} />;
  if (mode === "orders") return <RetailerOrderTable rows={filteredOrders} />;
  if (mode === "sales") return <RetailerSalesTable rows={filteredSales} />;
  if (mode === "customers") return <RetailerCustomerTable rows={filteredCustomers} />;
  if (mode === "verification") return <ProductVerificationTable rows={filteredVerifications} />;
  if (mode === "warranty") return <RetailerWarrantyTable rows={filteredWarranties} />;
  if (mode === "returns") return <RetailerReturnTable rows={filteredReturns} />;
  return <EmptyState title="Retailer workspace ready" description="Static frontend records will appear here for this retailer workflow." />;
};

const RetailOperations = ({ mode = "dashboard" }: { mode?: RetailMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const retailer = retailers.find((item) => item.id === id) || retailers[0];
  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "create" || mode === "edit" ? <RetailerForm record={mode === "edit" ? retailer : undefined} /> : null}
      {mode === "details" ? <DetailsPage /> : null}
      {mode === "order-create" ? <OperationalForm title="Create Retailer Order" /> : null}
      {mode === "order-details" ? <DetailsPage /> : null}
      {mode === "sale-create" ? <OperationalForm title="Create Retail Sale" /> : null}
      {mode === "sale-details" ? <DetailsPage /> : null}
      {mode === "customer-create" ? <OperationalForm title="Add Retailer Customer" /> : null}
      {mode === "customer-details" ? <DetailsPage /> : null}
      {mode === "return-create" ? <OperationalForm title="Create Retailer Return" /> : null}
      {mode === "return-details" ? <DetailsPage /> : null}
      {mode === "sales" ? <Phase7RetailerSalesTable /> : null}
      {mode === "orders" ? <RetailerOrdersDashboard /> : null}
      {mode === "inventory" ? <><RetailerInventoryCards /><Phase7RetailerInventoryTable /></> : null}
      {mode === "customers" ? <Phase7RetailerCustomerTable /> : null}
      {mode === "verification" ? <Phase7RetailerVerificationTable /> : null}
      {mode === "warranty" ? <Phase7RetailerWarrantyTable /> : null}
      {mode === "wallet" ? <Phase7RetailerWalletCard /> : null}
      {mode === "rewards" ? <RetailerRewardsPanel /> : null}
      {mode === "offers" ? <RetailerOffersPanel /> : null}
      {mode === "returns" ? <Phase7RetailerReturnTable /> : null}
      {mode === "documents" ? <RetailerDocuments /> : null}
      {mode === "audit" ? <RetailerAudit /> : null}
      {mode === "analytics" ? <><Phase7RetailerAnalyticsCharts /><Widget title="AI Retailer Insights">{retailerInsights.map((insight) => <RetailerAIInsightCard key={insight} insight={insight} />)}</Widget></> : null}
      {["list"].includes(mode) ? <><RetailerDirectoryFilters query={query} setQuery={setQuery} /><TableContent mode={mode} query={query} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${meta[mode]?.title || "Retailer Portal"}`} /></> : null}
    </div>
  );
};

export default RetailOperations;
