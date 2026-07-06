import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Award, BadgeCheck, Boxes, CreditCard, Download, Eye, FileText, PackageCheck, ReceiptText, Store, Tags, Upload, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  AdvancedFilters,
  Badge,
  ChartCard,
  DashboardWidget,
  DateRangePicker,
  EnterpriseDataTable,
  KPIGrid,
  SearchInput,
  Select,
  Tabs,
  Timeline,
} from "../../../Components/enterprise";
import type { DataTableColumn, TimelineItem } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import {
  retailerAnalyticsData,
  retailerAuditTimelineData,
  retailerDashboardData,
  retailerDocumentsData,
  retailerWalletTransactions,
} from "../../../data/retailer/retailerAdminDemoData";
import { retailerCustomers } from "../../../data/retailer/retailerCustomerDemoData";
import type { RetailerRecord } from "../../../data/retailer/retailerDemoData";
import { retailerInventory } from "../../../data/retailer/retailerInventoryDemoData";
import { retailerOffers } from "../../../data/retailer/retailerOfferDemoData";
import { retailerOrders } from "../../../data/retailer/retailerOrderDemoData";
import { retailerReturns } from "../../../data/retailer/retailerReturnDemoData";
import { retailerRewards } from "../../../data/retailer/retailerRewardDemoData";
import { retailerSales } from "../../../data/retailer/retailerSalesDemoData";
import { productVerifications } from "../../../data/retailer/retailerVerificationDemoData";
import { retailerWalletSummary } from "../../../data/retailer/retailerWalletDemoData";
import { retailerWarranties } from "../../../data/retailer/retailerWarrantyDemoData";
import { RetailerStatusBadge } from "./RetailerStatusBadge";

const tooltipStyle = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

const ChartShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <ChartCard title={title} description={description} framed={false} minHeight="280px" contentClassName="h-[280px]">{children}</ChartCard>
);

const MiniRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>
      {status ? <RetailerStatusBadge status={status} /> : null}
    </div>
  </div>
);

const MiniMetric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><Icon className="h-4 w-4 text-cyan-300" /><p className="mt-2 text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-white">{value}</p></div>
);

export const RetailerRankingCard = ({ rank, name, sales, status }: { rank: string; name: string; sales: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3"><div><Badge tone="info">{rank}</Badge><h3 className="mt-3 text-sm font-semibold text-white">{name}</h3><p className="mt-1 text-xs text-slate-500">{sales} monthly sales</p></div><Store className="h-5 w-5 text-cyan-300" /></div>
    <div className="mt-4"><RetailerStatusBadge status={status} /></div>
  </article>
);

export const RetailerAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartShell title="Retailer Growth" description="Retailer activation and regional performance.">
      <ResponsiveContainer width="100%" height="100%"><AreaChart data={retailerAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Area dataKey="growth" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} /><Area dataKey="region" stroke="#34d399" fill="#34d39922" strokeWidth={2} /></AreaChart></ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Sales Trend" description="Retail sales and wallet earnings.">
      <ResponsiveContainer width="100%" height="100%"><ComposedChart data={retailerAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} /><Line type="monotone" dataKey="wallet" stroke="#f59e0b" strokeWidth={2} /></ComposedChart></ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Verification Trend" description="Product verification and consumer registration.">
      <ResponsiveContainer width="100%" height="100%"><AreaChart data={retailerAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Area dataKey="verification" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} /><Area dataKey="registrations" stroke="#34d399" fill="#34d39922" strokeWidth={2} /></AreaChart></ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Reward and Warranty Trend" description="Reward redemption and assisted warranty movement.">
      <ResponsiveContainer width="100%" height="100%"><BarChart data={retailerAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Bar dataKey="rewards" fill="#f59e0b" radius={[6, 6, 0, 0]} /><Bar dataKey="warranty" fill="#f472b6" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
    </ChartShell>
  </section>
);

export const RetailerDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={retailerDashboardData.kpis} />
    <RetailerAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-3">{retailerDashboardData.topRetailers.map((item) => <RetailerRankingCard key={item.id} rank={item.rank} name={item.name} sales={item.sales} status={item.status} />)}</section>
    <section className="grid gap-4 xl:grid-cols-5">
      <DashboardWidget title="Recent Retailers" subtitle="Recently updated retailer stores.">{retailerDashboardData.recentRetailers.map((item) => <MiniRow key={item.id} title={item.name} detail={item.city} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Verifications" subtitle="Latest QR verification activity.">{productVerifications.map((item) => <MiniRow key={item.id} title={item.qrCode} detail={`${item.product} / risk ${item.riskScore}`} status={item.verificationResult} />)}</DashboardWidget>
      <DashboardWidget title="Consumer Registrations" subtitle="Retail assisted consumers.">{retailerCustomers.map((item) => <MiniRow key={item.id} title={item.customerName} detail={`${item.city} / ${item.totalPurchaseValue}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Pending Warranty Assistance" subtitle="Assisted warranty work queue.">{retailerDashboardData.warrantyAssistance.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="AI Retailer Insights" subtitle="Static retailer intelligence.">{retailerDashboardData.aiInsights.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
    </section>
  </div>
);

export const RetailerDirectoryFilters = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => (
  <AdvancedFilters title="Retailer directory filters" activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder="Search retailer, code, dealer, distributor, GST, city, contact" />
    <Select label="Saved Filter" value="" onChange={() => undefined} placeholder="All retailers" options={["Top Performing", "Pending Approval", "Warranty Assist", "Verification Risk"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Inactive", "Pending Approval", "On Hold"].map((value) => ({ label: value, value }))} />
    <Select label="Dealer" value="" onChange={() => undefined} placeholder="All dealers" options={["Metro Build Mart", "Prime Hardware Hub", "Southern Contractor Store", "Eastern Pro Dealer"].map((value) => ({ label: value, value }))} />
    <DateRangePicker label="Last activity" value={{ from: "", to: "" }} onChange={() => undefined} />
  </AdvancedFilters>
);

export const RetailerTable = ({ rows }: { rows: RetailerRecord[] }) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const columns: DataTableColumn<RetailerRecord>[] = [
    { id: "logo", header: "Retailer Logo", cell: (row) => <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-200">{row.retailerName.slice(0, 2).toUpperCase()}</div> },
    { id: "name", header: "Retailer Name", cell: (row) => <Link to={`/retailers/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.retailerName}</Link>, sortable: true },
    { id: "code", header: "Retailer Code", accessor: "retailerCode", sortable: true },
    { id: "dealer", header: "Dealer", accessor: "assignedDealer" },
    { id: "distributor", header: "Distributor", accessor: "assignedDistributor" },
    { id: "city", header: "City", accessor: "city" },
    { id: "state", header: "State", accessor: "state" },
    { id: "gst", header: "GST", accessor: "gstNumber" },
    { id: "contact", header: "Contact Person", accessor: "contactPerson" },
    { id: "wallet", header: "Wallet", accessor: "walletBalance", align: "right" },
    { id: "rewards", header: "Reward Points", accessor: () => "18,200", align: "right" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
    { id: "activity", header: "Last Activity", accessor: () => "Today 12:05" },
  ];
  return <EnterpriseDataTable title="Retailer Directory" description="Manufacturer-side retailer directory with dealer mapping, distributor mapping, wallet, rewards and verification signals." rows={rows} columns={columns} enableSelection selectedRowIds={selected} onSelectedRowIdsChange={setSelected} showExportPlaceholder showImportPlaceholder bulkActions={[{ id: "export", label: "Bulk Export", icon: Download, onClick: () => undefined }, { id: "import", label: "Bulk Import", icon: Upload, onClick: () => undefined }, { id: "dealer", label: "Assign Dealer", onClick: () => undefined }, { id: "status", label: "Status Change", onClick: () => undefined }]} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/retailers/${row.id}`; } }]} />;
};

export const RetailerProfileCard = ({ retailer }: { retailer: RetailerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="Retailer Profile" subtitle="Business, contact, dealer mapping, sales, customers, wallet, rewards and warranty assistance.">
      <div className="grid gap-3 md:grid-cols-3">{[
        ["Business Info", `${retailer.storeName} / ${retailer.gstNumber}`],
        ["Contact Info", `${retailer.contactPerson} / ${retailer.mobile}`],
        ["Dealer Mapping", `${retailer.assignedDealer} / ${retailer.assignedDistributor}`],
        ["Sales", retailer.monthlySales],
        ["Customers", retailer.customers],
        ["Wallet", retailer.walletBalance],
        ["Rewards", "18,200 pts"],
        ["Warranty Assistance", "184 assisted"],
        ["Store Type", retailer.storeType],
      ].map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-sm font-semibold text-slate-200">{value}</p></div>)}</div>
    </DashboardWidget>
    <aside className={cn(panelBase, "p-4")}><Store className="h-8 w-8 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold text-white">{retailer.retailerName}</h3><p className="mt-1 text-sm text-slate-500">{retailer.retailerCode} / {retailer.territory}</p><div className="mt-4 flex flex-wrap gap-2"><RetailerStatusBadge status={retailer.status} /><Badge tone="info">GST Verified</Badge></div><div className="mt-4 grid grid-cols-2 gap-3"><MiniMetric icon={ReceiptText} label="Sales" value={retailer.monthlySales} /><MiniMetric icon={WalletCards} label="Wallet" value={retailer.walletBalance} /></div></aside>
  </section>
);

export const RetailerSalesTable = () => <EnterpriseDataTable title="Sales List" description="Sales dashboard, sale details, product verification at sale and invoice placeholder." rows={retailerSales} columns={[{ id: "saleNumber", header: "Sale", accessor: "saleNumber" }, { id: "customer", header: "Customer", accessor: "customer" }, { id: "product", header: "Product", accessor: "product" }, { id: "qrCode", header: "Product Verification", accessor: "qrCode" }, { id: "saleAmount", header: "Amount", accessor: "saleAmount", align: "right" }, { id: "verificationStatus", header: "Status", cell: (row) => <RetailerStatusBadge status={row.verificationStatus} /> }]} showExportPlaceholder />;

export const RetailerOrdersTable = () => <EnterpriseDataTable title="Order List" description="Draft, submitted, approved, packed, dispatched, delivered and cancelled retailer orders." rows={retailerOrders} columns={[{ id: "orderNumber", header: "Order", accessor: "orderNumber" }, { id: "product", header: "Product", accessor: "product" }, { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" }, { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }]} showExportPlaceholder />;

export const RetailerInventoryTable = () => <EnterpriseDataTable title="Batch Stock" description="Current, reserved, sold, damaged, low stock and near expiry inventory." rows={retailerInventory} columns={[{ id: "product", header: "Product", accessor: "product" }, { id: "sku", header: "SKU", accessor: "sku" }, { id: "batch", header: "Batch", accessor: "batch" }, { id: "quantity", header: "Current Stock", accessor: "quantity", align: "right" }, { id: "reserved", header: "Reserved Stock", accessor: "reserved", align: "right" }, { id: "sold", header: "Sold Stock", accessor: "sold", align: "right" }, { id: "damaged", header: "Damaged Stock", accessor: "damaged", align: "right" }, { id: "expiry", header: "Near Expiry", accessor: "expiry" }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }]} showExportPlaceholder />;

export const RetailerInventoryCards = () => <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">{[["Current Stock", "2,474", Boxes], ["Reserved Stock", "314", Boxes], ["Sold Stock", "638", ReceiptText], ["Damaged Stock", "40", PackageCheck], ["Low Stock", "64", PackageCheck], ["Near Expiry", "240", PackageCheck]].map(([label, value, Icon]) => <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-base font-semibold text-white">{String(value)}</p></div>)}</section>;

export const RetailerCustomerTable = () => <EnterpriseDataTable title="Retailer Customers" description="Customer list, consumer registrations, purchase history, warranty history and reward history." rows={retailerCustomers} columns={[{ id: "customerName", header: "Customer List", accessor: "customerName" }, { id: "lastPurchaseDate", header: "Purchase History", accessor: "lastPurchaseDate" }, { id: "warrantyCount", header: "Warranty History", accessor: "warrantyCount", align: "right" }, { id: "rewards", header: "Reward History", accessor: () => "Eligible" }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }]} showExportPlaceholder />;

export const RetailerVerificationTable = () => <EnterpriseDataTable title="QR Verification History" description="Genuine scans, duplicate scans, counterfeit alerts, risk score and verification timeline." rows={productVerifications} columns={[{ id: "qrCode", header: "QR Code", accessor: "qrCode" }, { id: "verificationResult", header: "Result", cell: (row) => <RetailerStatusBadge status={row.verificationResult} /> }, { id: "scanLocation", header: "Location", accessor: "scanLocation" }, { id: "riskScore", header: "Risk Score", accessor: "riskScore", align: "right" }, { id: "scanTime", header: "Verification Timeline", accessor: "scanTime" }]} showExportPlaceholder />;

export const RetailerWarrantyTable = () => <EnterpriseDataTable title="Warranty Assistance" description="Warranty registrations, claims assisted, claim status and customer product history." rows={retailerWarranties} columns={[{ id: "customer", header: "Customer", accessor: "customer" }, { id: "product", header: "Product History", accessor: "product" }, { id: "qrCode", header: "QR Code", accessor: "qrCode" }, { id: "claimStatus", header: "Claim Status", cell: (row) => <RetailerStatusBadge status={row.claimStatus} /> }]} showExportPlaceholder />;

export const RetailerWalletCard = () => <div className="space-y-4"><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">{[["Wallet Balance", retailerWalletSummary.availableBalance, WalletCards], ["Reward Points", retailerWalletSummary.pointsEarned, Award], ["Cashback", retailerWalletSummary.cashbackEarned, CreditCard], ["Pending Payout", retailerWalletSummary.pendingPayout, WalletCards], ["Redemptions", retailerWalletSummary.pointsRedeemed, Award], ["Offer Earnings", "$12K", Tags]].map(([label, value, Icon]) => <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>)}</section><EnterpriseDataTable title="Transactions" rows={retailerWalletTransactions} columns={[{ id: "reference", header: "Reference", accessor: "reference" }, { id: "source", header: "Source", accessor: "source" }, { id: "points", header: "Points", accessor: "points", align: "right" }, { id: "cashback", header: "Cashback", accessor: "cashback", align: "right" }, { id: "payout", header: "Payout", cell: (row) => <RetailerStatusBadge status={row.payout} /> }]} /></div>;

export const RetailerRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><Award className="h-5 w-5 text-amber-300" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div><RetailerStatusBadge status={status} /></div></article>;

export const RetailerRewardsPanel = () => <div className="space-y-4"><section className="grid gap-4 md:grid-cols-3">{retailerRewards.map((reward) => <RetailerRewardCard key={reward.id} title={reward.reward} detail={`${reward.points} points / ${reward.retailer}`} status={reward.status} />)}</section><EnterpriseDataTable title="Redemptions" rows={retailerRewards} columns={[{ id: "reward", header: "Reward", accessor: "reward" }, { id: "points", header: "Points", accessor: "points", align: "right" }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }]} /></div>;

export const RetailerOfferCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => <article className={cn(panelBase, "p-4")}><Tags className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p><div className="mt-3"><RetailerStatusBadge status={status} /></div></article>;

export const RetailerOffersPanel = () => <section className="grid gap-4 md:grid-cols-3">{retailerOffers.map((offer) => <RetailerOfferCard key={offer.id} title={offer.offer} detail={`${offer.type} / ${offer.redemptions} redemptions / local campaign`} status={offer.status} />)}</section>;

export const RetailerReturnTable = () => <EnterpriseDataTable title="Retailer Returns" description="Return requests, inspection, replacement, credit note and return timeline." rows={retailerReturns} columns={[{ id: "returnNumber", header: "Return Request", accessor: "returnNumber" }, { id: "product", header: "Product", accessor: "product" }, { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" }, { id: "inspection", header: "Inspection", accessor: () => "Pending" }, { id: "replacement", header: "Replacement", accessor: () => "Eligible" }, { id: "credit", header: "Credit Note", accessor: () => "$840" }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }]} showExportPlaceholder />;

export const RetailerDocuments = () => <EnterpriseDataTable title="Retailer Documents" description="GST, PAN, agreement, KYC, bank documents and store images." rows={retailerDocumentsData} columns={[{ id: "document", header: "Document", cell: (row) => <span className="inline-flex items-center gap-2 font-semibold text-white"><FileText className="h-4 w-4 text-cyan-300" />{row.document}</span> }, { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> }, { id: "updated", header: "Updated", accessor: "updated" }]} showImportPlaceholder showExportPlaceholder />;

export const RetailerAudit = () => <DashboardWidget title="Retailer Audit" subtitle="Profile updates, sales, orders, verification, warranty, wallet, rewards and returns."><Timeline items={retailerAuditTimelineData as TimelineItem[]} /></DashboardWidget>;

export const RetailerOrdersDashboard = () => <div className="space-y-4"><section className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">{["Draft", "Submitted", "Approved", "Packed", "Dispatched", "Delivered", "Cancelled"].map((status) => <div key={status} className={cn(panelBase, "p-4")}><BadgeCheck className={cn("h-5 w-5", status === "Cancelled" ? "text-rose-300" : status === "Delivered" ? "text-emerald-300" : "text-cyan-300")} /><p className="mt-3 text-sm font-semibold text-white">{status}</p><p className="mt-1 text-xs text-slate-500">Order status</p></div>)}</section><RetailerOrdersTable /><RetailerAudit /></div>;

export const RetailerProfileTabs = ({ retailer }: { retailer: RetailerRecord }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return <Tabs value={activeTab} onChange={setActiveTab} tabs={[
    { id: "overview", label: "Overview", content: <RetailerProfileCard retailer={retailer} /> },
    { id: "sales", label: "Sales", content: <RetailerSalesTable /> },
    { id: "orders", label: "Orders", content: <RetailerOrdersDashboard /> },
    { id: "inventory", label: "Inventory", content: <><RetailerInventoryCards /><RetailerInventoryTable /></> },
    { id: "customers", label: "Customers", content: <RetailerCustomerTable /> },
    { id: "verification", label: "Product Verification", content: <RetailerVerificationTable /> },
    { id: "warranty", label: "Warranty Assistance", content: <RetailerWarrantyTable /> },
    { id: "wallet", label: "Wallet", content: <RetailerWalletCard /> },
    { id: "rewards", label: "Rewards", content: <RetailerRewardsPanel /> },
    { id: "offers", label: "Offers", content: <RetailerOffersPanel /> },
    { id: "returns", label: "Returns", content: <RetailerReturnTable /> },
    { id: "analytics", label: "Analytics", content: <RetailerAnalyticsCharts /> },
    { id: "documents", label: "Documents", content: <RetailerDocuments /> },
    { id: "audit", label: "Audit", content: <RetailerAudit /> },
  ]} />;
};
