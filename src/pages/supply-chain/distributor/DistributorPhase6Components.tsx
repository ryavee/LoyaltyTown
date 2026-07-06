import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Award, BadgeCheck, Boxes, CreditCard, Download, Eye, FileText, Truck, Upload, WalletCards } from "lucide-react";
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
  distributorAnalyticsData,
  distributorAuditTimelineData,
  distributorDashboardData,
  distributorDocumentsData,
  distributorRewardData,
  distributorWalletTransactions,
} from "../../../data/distributor/distributorAdminDemoData";
import { distributorDealers } from "../../../data/distributor/distributorDealerDemoData";
import type { DistributorRecord } from "../../../data/distributor/distributorDemoData";
import { distributorInventory } from "../../../data/distributor/distributorInventoryDemoData";
import { distributorOrders } from "../../../data/distributor/distributorOrderDemoData";
import { collectionTimeline, distributorPayments } from "../../../data/distributor/distributorPaymentDemoData";
import { distributorReturns } from "../../../data/distributor/distributorReturnDemoData";
import { distributorSchemes, distributorWalletSummary } from "../../../data/distributor/distributorSchemeDemoData";
import { DistributorStatusBadge, PaymentStatusBadge } from "./DistributorStatusBadge";

const tooltipStyle = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

const ChartShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <ChartCard title={title} description={description} framed={false} minHeight="280px" contentClassName="h-[280px]">
    {children}
  </ChartCard>
);

const MiniRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-200">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      {status ? <DistributorStatusBadge status={status} /> : null}
    </div>
  </div>
);

const MiniMetric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <Icon className="h-4 w-4 text-cyan-300" />
    <p className="mt-2 text-xs text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
  </div>
);

export const DistributorRankingCard = ({ rank, name, sales, status }: { rank: string; name: string; sales: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <Badge tone="info">{rank}</Badge>
        <h3 className="mt-3 text-sm font-semibold text-white">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">{sales} monthly sales</p>
      </div>
      <Truck className="h-5 w-5 text-cyan-300" />
    </div>
    <div className="mt-4"><DistributorStatusBadge status={status} /></div>
  </article>
);

export const DistributorAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartShell title="Distributor Growth" description="Distributor network and territory expansion.">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={distributorAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Area dataKey="growth" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
          <Area dataKey="region" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Sales Trend" description="Distributor sales and collections movement.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={distributorAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="collections" stroke="#f59e0b" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Inventory Movement" description="Inventory turnover and dealer performance.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={distributorAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="inventory" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Bar dataKey="dealer" fill="#34d399" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Return Rate and Reward Growth" description="Return risk against distributor rewards.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={distributorAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="rewards" fill="#a78bfa" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="returns" stroke="#fb7185" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
  </section>
);

export const DistributorDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={distributorDashboardData.kpis} />
    <DistributorAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-3">
      {distributorDashboardData.topDistributors.map((item) => <DistributorRankingCard key={item.id} rank={item.rank} name={item.name} sales={item.sales} status={item.status} />)}
    </section>
    <section className="grid gap-4 xl:grid-cols-5">
      <DashboardWidget title="Recent Distributors" subtitle="Recently updated distribution accounts.">{distributorDashboardData.recentDistributors.map((item) => <MiniRow key={item.id} title={item.name} detail={item.city} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Pending Collections" subtitle="Receivables needing action.">{distributorDashboardData.pendingCollections.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Low Stock Alerts" subtitle="Inventory exceptions by territory.">{distributorDashboardData.lowStockAlerts.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Orders" subtitle="Latest distributor order movement.">{distributorOrders.slice(0, 3).map((item) => <MiniRow key={item.id} title={item.orderNumber} detail={`${item.distributor} / ${item.totalAmount}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="AI Distributor Insights" subtitle="Static distributor intelligence.">{distributorDashboardData.aiInsights.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
    </section>
  </div>
);

export const DistributorDirectoryFilters = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => (
  <AdvancedFilters title="Distributor directory filters" activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder="Search distributor, code, GST, territory, city, contact" />
    <Select label="Saved Filter" value="" onChange={() => undefined} placeholder="All distributors" options={["Top Performing", "Pending Approval", "Collection Risk", "Low Stock Risk"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Inactive", "Pending Approval", "On Hold"].map((value) => ({ label: value, value }))} />
    <Select label="Territory" value="" onChange={() => undefined} placeholder="All territories" options={["West", "North", "South", "East"].map((value) => ({ label: value, value }))} />
    <DateRangePicker label="Last activity" value={{ from: "", to: "" }} onChange={() => undefined} />
  </AdvancedFilters>
);

export const DistributorTable = ({ rows }: { rows: DistributorRecord[] }) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const columns: DataTableColumn<DistributorRecord>[] = [
    { id: "logo", header: "Distributor Logo", cell: (row) => <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-200">{row.distributorName.slice(0, 2).toUpperCase()}</div> },
    { id: "name", header: "Distributor Name", cell: (row) => <Link to={`/distributors/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.distributorName}</Link>, sortable: true },
    { id: "code", header: "Distributor Code", accessor: "distributorCode", sortable: true },
    { id: "territory", header: "Territory", accessor: "territory" },
    { id: "city", header: "City", accessor: "city" },
    { id: "state", header: "State", accessor: "state" },
    { id: "gst", header: "GST", accessor: "gstNumber" },
    { id: "contact", header: "Contact Person", accessor: "contactPerson" },
    { id: "dealers", header: "Dealer Count", accessor: () => "214", align: "right" },
    { id: "outstanding", header: "Outstanding Amount", accessor: "outstandingAmount", align: "right" },
    { id: "wallet", header: "Wallet", accessor: "walletBalance", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
    { id: "activity", header: "Last Activity", accessor: () => "Today 11:45" },
  ];
  return (
    <EnterpriseDataTable
      title="Distributor Directory"
      description="Manufacturer-side distributor directory with territory, GST, dealer network, wallet, collections and activity signals."
      rows={rows}
      columns={columns}
      enableSelection
      selectedRowIds={selected}
      onSelectedRowIdsChange={setSelected}
      showExportPlaceholder
      showImportPlaceholder
      bulkActions={[
        { id: "export", label: "Bulk Export", icon: Download, onClick: () => undefined },
        { id: "import", label: "Bulk Import", icon: Upload, onClick: () => undefined },
        { id: "territory", label: "Assign Territory", onClick: () => undefined },
        { id: "status", label: "Status Change", onClick: () => undefined },
      ]}
      actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/distributors/${row.id}`; } }]}
    />
  );
};

export const DistributorProfileCard = ({ distributor }: { distributor: DistributorRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="Distributor Profile" subtitle="Business, contact, territory, dealer network, sales, collections, wallet and reward summary.">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Business Info", `${distributor.companyName} / ${distributor.gstNumber}`],
          ["Contact Info", `${distributor.contactPerson} / ${distributor.mobile}`],
          ["Territory", `${distributor.territory} / ${distributor.city}`],
          ["Dealer Network", "214 mapped dealers"],
          ["Sales", distributor.monthlyRevenue],
          ["Outstanding", distributor.outstandingAmount],
          ["Wallet", distributor.walletBalance],
          ["Rewards", "84,000 pts"],
          ["Sales Executive", distributor.assignedSalesExecutive],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
    <aside className={cn(panelBase, "p-4")}>
      <Truck className="h-8 w-8 text-cyan-300" />
      <h3 className="mt-4 text-lg font-semibold text-white">{distributor.distributorName}</h3>
      <p className="mt-1 text-sm text-slate-500">{distributor.distributorCode} / {distributor.territory}</p>
      <div className="mt-4 flex flex-wrap gap-2"><DistributorStatusBadge status={distributor.status} /><Badge tone="info">GST Verified</Badge></div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniMetric icon={CreditCard} label="Credit Limit" value={distributor.creditLimit} />
        <MiniMetric icon={WalletCards} label="Wallet" value={distributor.walletBalance} />
      </div>
    </aside>
  </section>
);

export const DistributorDealerTable = () => (
  <EnterpriseDataTable
    title="Distributor Dealers"
    description="Dealer list, performance, orders, wallet summary and activation status."
    rows={distributorDealers}
    columns={[
      { id: "dealerName", header: "Dealer List", accessor: "dealerName", sortable: true },
      { id: "dealerCode", header: "Dealer Code", accessor: "dealerCode" },
      { id: "performance", header: "Dealer Performance", accessor: () => "82%" },
      { id: "orders", header: "Dealer Orders", accessor: () => "184 orders" },
      { id: "wallet", header: "Wallet Summary", accessor: () => "48,200 pts" },
      { id: "status", header: "Activation Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
    ]}
    showExportPlaceholder
  />
);

export const DistributorOrdersTable = () => (
  <EnterpriseDataTable
    title="Order List"
    description="Draft, submitted, approved, packed, dispatched, delivered and cancelled distributor orders."
    rows={distributorOrders}
    columns={[
      { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
      { id: "distributor", header: "Distributor", accessor: "distributor" },
      { id: "products", header: "Products", accessor: "products" },
      { id: "sku", header: "SKU", accessor: "sku" },
      { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
      { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" },
      { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
    ]}
    showExportPlaceholder
  />
);

export const DistributorInventoryTable = () => (
  <EnterpriseDataTable
    title="Batch Stock"
    description="Current stock, reserved stock, low stock, fast moving, slow moving and near expiry inventory."
    rows={distributorInventory}
    columns={[
      { id: "product", header: "Product", accessor: "product", sortable: true },
      { id: "sku", header: "SKU", accessor: "sku" },
      { id: "batch", header: "Batch", accessor: "batch" },
      { id: "quantity", header: "Current Stock", accessor: "quantity", align: "right" },
      { id: "reserved", header: "Reserved Stock", accessor: "reserved", align: "right" },
      { id: "expiry", header: "Near Expiry", accessor: "expiry" },
      { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
    ]}
    showExportPlaceholder
  />
);

export const DistributorInventoryCards = () => (
  <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
    {[["Current Stock", "72,154", Boxes], ["Reserved Stock", "15,216", Boxes], ["Low Stock", "5,520", PackageIcon], ["Fast Moving", "PNT-SQR-10L", BadgeCheck], ["Slow Moving", "KIT-CON-12", Truck], ["Near Expiry", "9,640", PackageIcon]].map(([label, value, Icon]) => (
      <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-base font-semibold text-white">{String(value)}</p></div>
    ))}
  </section>
);

const PackageIcon = Boxes;

export const DistributorPaymentTable = () => (
  <EnterpriseDataTable
    title="Invoices and Payments"
    description="Invoices, payments, outstanding, due dates and payment status."
    rows={distributorPayments}
    columns={[
      { id: "invoiceNumber", header: "Invoice", accessor: "invoiceNumber", sortable: true },
      { id: "amount", header: "Amount", accessor: "amount", align: "right" },
      { id: "paidAmount", header: "Paid", accessor: "paidAmount", align: "right" },
      { id: "outstanding", header: "Outstanding", accessor: "outstanding", align: "right" },
      { id: "dueDate", header: "Due Date", accessor: "dueDate" },
      { id: "paymentStatus", header: "Payment Status", cell: (row) => <PaymentStatusBadge status={row.paymentStatus} /> },
    ]}
    showExportPlaceholder
  />
);

export const DistributorCollectionTimeline = () => (
  <DashboardWidget title="Collection Timeline" subtitle="Invoice, reminder, payment and follow-up events.">
    <Timeline items={collectionTimeline.map((item) => ({ ...item, icon: CreditCard, tone: "info" })) as TimelineItem[]} />
  </DashboardWidget>
);

export const DistributorWalletCard = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {[["Wallet Balance", distributorWalletSummary.availableBalance, WalletCards], ["Reward Points", distributorWalletSummary.pointsEarned, Award], ["Cashback", distributorWalletSummary.cashbackEarned, CreditCard], ["Pending Payout", distributorWalletSummary.pendingPayout, WalletCards], ["Redemptions", distributorWalletSummary.pointsRedeemed, Award]].map(([label, value, Icon]) => (
        <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>
      ))}
    </section>
    <EnterpriseDataTable
      title="Wallet Transactions"
      rows={distributorWalletTransactions}
      columns={[
        { id: "reference", header: "Reference", accessor: "reference" },
        { id: "type", header: "Type", accessor: "type" },
        { id: "source", header: "Source", accessor: "source" },
        { id: "points", header: "Points", accessor: "points", align: "right" },
        { id: "cashback", header: "Cashback", accessor: "cashback", align: "right" },
        { id: "payout", header: "Pending Payout", cell: (row) => <DistributorStatusBadge status={row.payout} /> },
      ]}
    />
  </div>
);

export const DistributorRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <Award className="h-5 w-5 text-amber-300" />
        <p className="mt-3 text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      <DistributorStatusBadge status={status} />
    </div>
  </article>
);

export const DistributorRewardsPanel = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-3">
      {distributorRewardData.map((reward) => <DistributorRewardCard key={reward.id} title={reward.reward} detail={`${reward.points} points / ${reward.distributor}`} status={reward.status} />)}
    </section>
    <EnterpriseDataTable title="Scheme Progress" rows={distributorSchemes} columns={[{ id: "schemeName", header: "Scheme", accessor: "schemeName" }, { id: "progress", header: "Progress", accessor: (row) => `${row.progress}%`, align: "right" }, { id: "earning", header: "Earning", accessor: "earning", align: "right" }, { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> }]} />
  </div>
);

export const DistributorReturnTable = () => (
  <EnterpriseDataTable
    title="Distributor Returns"
    description="Return requests, inspection, replacement, credit note and return timeline."
    rows={distributorReturns}
    columns={[
      { id: "returnNumber", header: "Return Request", accessor: "returnNumber", sortable: true },
      { id: "product", header: "Product", accessor: "product" },
      { id: "sku", header: "SKU", accessor: "sku" },
      { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
      { id: "inspection", header: "Inspection", accessor: () => "Pending" },
      { id: "replacement", header: "Replacement", accessor: () => "Eligible" },
      { id: "credit", header: "Credit Note", accessor: () => "$12,400" },
      { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
    ]}
    showExportPlaceholder
  />
);

export const DistributorDocuments = () => (
  <EnterpriseDataTable
    title="Distributor Documents"
    description="GST, PAN, agreement, KYC, bank documents and certificates."
    rows={distributorDocumentsData}
    columns={[
      { id: "document", header: "Document", cell: (row) => <span className="inline-flex items-center gap-2 font-semibold text-white"><FileText className="h-4 w-4 text-cyan-300" />{row.document}</span> },
      { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
      { id: "updated", header: "Updated", accessor: "updated" },
    ]}
    showImportPlaceholder
    showExportPlaceholder
  />
);

export const DistributorAudit = () => (
  <DashboardWidget title="Distributor Audit" subtitle="Profile updates, orders, payments, collections, rewards, inventory and returns.">
    <Timeline items={distributorAuditTimelineData as TimelineItem[]} />
  </DashboardWidget>
);

export const DistributorOrdersDashboard = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">
      {["Draft", "Submitted", "Approved", "Packed", "Dispatched", "Delivered", "Cancelled"].map((status) => (
        <div key={status} className={cn(panelBase, "p-4")}><BadgeCheck className={cn("h-5 w-5", status === "Cancelled" ? "text-rose-300" : status === "Delivered" ? "text-emerald-300" : "text-cyan-300")} /><p className="mt-3 text-sm font-semibold text-white">{status}</p><p className="mt-1 text-xs text-slate-500">Order status</p></div>
      ))}
    </section>
    <DistributorOrdersTable />
    <DistributorAudit />
  </div>
);

export const DistributorProfileTabs = ({ distributor }: { distributor: DistributorRecord }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      tabs={[
        { id: "overview", label: "Overview", content: <DistributorProfileCard distributor={distributor} /> },
        { id: "dealers", label: "Dealers", content: <DistributorDealerTable /> },
        { id: "orders", label: "Orders", content: <DistributorOrdersDashboard /> },
        { id: "inventory", label: "Inventory", content: <><DistributorInventoryCards /><DistributorInventoryTable /></> },
        { id: "payments", label: "Payments", content: <DistributorPaymentTable /> },
        { id: "collections", label: "Collections", content: <DistributorCollectionTimeline /> },
        { id: "wallet", label: "Wallet", content: <DistributorWalletCard /> },
        { id: "rewards", label: "Rewards", content: <DistributorRewardsPanel /> },
        { id: "returns", label: "Returns", content: <DistributorReturnTable /> },
        { id: "analytics", label: "Analytics", content: <DistributorAnalyticsCharts /> },
        { id: "documents", label: "Documents", content: <DistributorDocuments /> },
        { id: "audit", label: "Audit", content: <DistributorAudit /> },
      ]}
    />
  );
};
