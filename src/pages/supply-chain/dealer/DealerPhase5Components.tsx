import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Award, BadgeCheck, Boxes, Download, Eye, FileText, QrCode, ShieldCheck, Store, Upload, WalletCards } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  AdvancedFilters,
  Badge,
  ChartCard,
  DashboardWidget,
  DateRangePicker,
  EmptyState,
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
  dealerAnalyticsData,
  dealerAuditTimelineData,
  dealerDashboardData,
  dealerDocumentsData,
  dealerQrActivityData,
  dealerWalletTransactions,
} from "../../../data/dealer/dealerAdminDemoData";
import { dealerCustomers } from "../../../data/dealer/dealerCustomerDemoData";
import type { DealerRecord } from "../../../data/dealer/dealerDemoData";
import { dealerInventory } from "../../../data/dealer/dealerInventoryDemoData";
import { dealerOrders } from "../../../data/dealer/dealerOrderDemoData";
import { dealerProjects } from "../../../data/dealer/dealerProjectDemoData";
import { dealerRewards } from "../../../data/dealer/dealerRewardDemoData";
import { dealerWalletSummary } from "../../../data/dealer/dealerWalletDemoData";
import { dealerWarranties } from "../../../data/dealer/dealerWarrantyDemoData";
import { DealerStatusBadge } from "./DealerStatusBadge";

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
      {status ? <DealerStatusBadge status={status} /> : null}
    </div>
  </div>
);

export const DealerRankingCard = ({ rank, name, sales, status }: { rank: string; name: string; sales: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <Badge tone="info">{rank}</Badge>
        <h3 className="mt-3 text-sm font-semibold text-white">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">{sales} monthly sales</p>
      </div>
      <Award className="h-5 w-5 text-amber-300" />
    </div>
    <div className="mt-4"><DealerStatusBadge status={status} /></div>
  </article>
);

export const DealerAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartShell title="Dealer Growth" description="Dealer expansion and active region growth.">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dealerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Area dataKey="growth" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
          <Area dataKey="region" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Sales Trend" description="Dealer sales with ranking movement.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dealerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="ranking" stroke="#f59e0b" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="QR Scan Trend" description="QR activity attributed to dealers.">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dealerQrActivityData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Area dataKey="scans" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          <Area dataKey="activated" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Reward Trend" description="Reward growth and warranty activation movement.">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dealerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Line type="monotone" dataKey="rewards" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="warranty" stroke="#f472b6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Region Performance" description="Region score and inventory turnover health.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dealerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="region" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Bar dataKey="inventory" fill="#34d399" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Dealer Ranking" description="Ranking score and customer growth.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dealerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="customers" fill="#a78bfa" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="ranking" stroke="#f59e0b" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
  </section>
);

export const DealerDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={dealerDashboardData.kpis} />
    <DealerAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-3">
      {dealerDashboardData.topDealers.map((dealer) => <DealerRankingCard key={dealer.id} rank={dealer.rank} name={dealer.name} sales={dealer.sales} status={dealer.status} />)}
    </section>
    <section className="grid gap-4 xl:grid-cols-4">
      <DashboardWidget title="Recent Dealers" subtitle="Recently updated dealer records.">{dealerDashboardData.recentDealers.map((item) => <MiniRow key={item.id} title={item.name} detail={item.city} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Dealer Alerts" subtitle="Operational exceptions.">{dealerDashboardData.alerts.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Orders" subtitle="Latest order movement.">{dealerOrders.slice(0, 3).map((item) => <MiniRow key={item.id} title={item.orderNumber} detail={`${item.dealer} / ${item.totalAmount}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="AI Dealer Insights" subtitle="Static guidance for channel managers.">{dealerDashboardData.aiInsights.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
    </section>
  </div>
);

export const DealerDirectoryFilters = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => (
  <AdvancedFilters title="Dealer directory filters" activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder="Search dealer, code, GST, distributor, city, contact" />
    <Select label="Saved Filter" value="" onChange={() => undefined} placeholder="All dealers" options={["Top Performing", "Pending Approval", "Low Stock Risk", "KYC Review"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Inactive", "Pending Approval", "On Hold"].map((value) => ({ label: value, value }))} />
    <Select label="State" value="" onChange={() => undefined} placeholder="All states" options={["Maharashtra", "Delhi", "Tamil Nadu", "West Bengal"].map((value) => ({ label: value, value }))} />
    <DateRangePicker label="Last activity" value={{ from: "", to: "" }} onChange={() => undefined} />
  </AdvancedFilters>
);

export const DealerTable = ({ rows }: { rows: DealerRecord[] }) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const columns: DataTableColumn<DealerRecord>[] = [
    { id: "logo", header: "Dealer Logo", cell: (row) => <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-200">{row.dealerName.slice(0, 2).toUpperCase()}</div> },
    { id: "dealerName", header: "Dealer Name", cell: (row) => <Link to={`/dealers/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.dealerName}</Link>, sortable: true },
    { id: "dealerCode", header: "Dealer Code", accessor: "dealerCode", sortable: true },
    { id: "distributor", header: "Distributor", accessor: "assignedDistributor" },
    { id: "city", header: "City", accessor: "city" },
    { id: "state", header: "State", accessor: "state" },
    { id: "gst", header: "GST", accessor: "gstNumber" },
    { id: "contact", header: "Contact Person", accessor: "contactPerson" },
    { id: "wallet", header: "Wallet", accessor: "walletBalance", align: "right" },
    { id: "rewardPoints", header: "Reward Points", accessor: () => "48,200", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
    { id: "lastActivity", header: "Last Activity", accessor: () => "Today 11:20" },
  ];
  return (
    <EnterpriseDataTable
      title="Dealer Directory"
      description="Manufacturer-side dealer directory with channel, KYC, wallet, rewards, and activity signals."
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
      actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/dealers/${row.id}`; } }]}
    />
  );
};

export const DealerProfileCard = ({ dealer }: { dealer: DealerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="Dealer Profile" subtitle="Business, contact, sales, wallet, rewards, customer and project summary.">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Business Info", `${dealer.companyName} / ${dealer.gstNumber}`],
          ["Contact Info", `${dealer.contactPerson} / ${dealer.mobile}`],
          ["Sales", dealer.monthlySales],
          ["Wallet", dealer.walletBalance],
          ["Rewards", "48,200 pts"],
          ["Customer Count", "1,284"],
          ["Projects", "42 active"],
          ["Distributor", dealer.assignedDistributor],
          ["Territory", `${dealer.city}, ${dealer.state}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
    <aside className={cn(panelBase, "p-4")}>
      <Store className="h-8 w-8 text-cyan-300" />
      <h3 className="mt-4 text-lg font-semibold text-white">{dealer.dealerName}</h3>
      <p className="mt-1 text-sm text-slate-500">{dealer.dealerCode} / {dealer.territory}</p>
      <div className="mt-4 flex flex-wrap gap-2"><DealerStatusBadge status={dealer.status} /><Badge tone="info">GST Verified</Badge></div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniMetric icon={WalletCards} label="Wallet" value={dealer.walletBalance} />
        <MiniMetric icon={Award} label="Target" value={dealer.targetAchievement} />
      </div>
    </aside>
  </section>
);

const MiniMetric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <Icon className="h-4 w-4 text-cyan-300" />
    <p className="mt-2 text-xs text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
  </div>
);

export const DealerOrdersTable = () => {
  const columns: DataTableColumn<(typeof dealerOrders)[number]>[] = [
    { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
    { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" },
    { id: "status", header: "Order Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Order List" description="Draft, submitted, approved, packed, dispatched, delivered, and cancelled orders." rows={dealerOrders} columns={columns} showExportPlaceholder />;
};

export const DealerInventoryTable = () => {
  const columns: DataTableColumn<(typeof dealerInventory)[number]>[] = [
    { id: "product", header: "Product", accessor: "product", sortable: true },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
    { id: "available", header: "Available", accessor: "available", align: "right" },
    { id: "reserved", header: "Reserved", accessor: "reserved", align: "right" },
    { id: "mrp", header: "MRP", accessor: () => "$58" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Products / SKU / Batch Inventory" rows={dealerInventory} columns={columns} showExportPlaceholder />;
};

export const DealerWalletCard = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {[
        ["Wallet Balance", dealerWalletSummary.availableBalance, WalletCards],
        ["Reward Points", dealerWalletSummary.pointsEarned, Award],
        ["Cashback", dealerWalletSummary.cashbackEarned, BadgeCheck],
        ["Pending Settlement", dealerWalletSummary.pendingPayout, WalletCards],
        ["Tier", dealerWalletSummary.tierStatus, Award],
      ].map(([label, value, Icon]) => (
        <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>
      ))}
    </section>
    <DealerWalletLedger />
  </div>
);

const DealerWalletLedger = () => {
  const columns: DataTableColumn<(typeof dealerWalletTransactions)[number]>[] = [
    { id: "reference", header: "Reference", accessor: "reference" },
    { id: "type", header: "Type", accessor: "type" },
    { id: "source", header: "Source", accessor: "source" },
    { id: "points", header: "Points", accessor: "points", align: "right" },
    { id: "cashback", header: "Cashback", accessor: "cashback", align: "right" },
    { id: "settlement", header: "Settlement", cell: (row) => <DealerStatusBadge status={row.settlement} /> },
    { id: "date", header: "Date", accessor: "date" },
  ];
  return <EnterpriseDataTable title="Transactions" description="Wallet transactions, pending settlement, reward points and cashback history." rows={dealerWalletTransactions} columns={columns} showExportPlaceholder />;
};

export const DealerRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <Award className="h-5 w-5 text-amber-300" />
        <p className="mt-3 text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      <DealerStatusBadge status={status} />
    </div>
  </article>
);

export const DealerRewardsPanel = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-3">
      {dealerRewards.map((reward) => <DealerRewardCard key={reward.id} title={reward.reward} detail={`${reward.points} points / ${reward.dealer}`} status={reward.status} />)}
    </section>
    <EnterpriseDataTable title="Redemption History" rows={dealerRewards} columns={[{ id: "reward", header: "Rewards", accessor: "reward" }, { id: "points", header: "Points", accessor: "points", align: "right" }, { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> }]} />
  </div>
);

export const DealerQrActivity = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {[["QR Generated", "1.48M", QrCode], ["QR Activated", "1.12M", BadgeCheck], ["Customer Scans", "4.8M", Store], ["Duplicate Alerts", "482", ShieldCheck], ["Counterfeit Alerts", "86", ShieldCheck]].map(([label, value, Icon]) => (
        <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>
      ))}
    </section>
    <ChartShell title="QR Trend" description="Generated, activated, customer scans, duplicates and counterfeit alerts.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={dealerQrActivityData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="generated" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Bar dataKey="activated" fill="#34d399" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="scans" stroke="#f59e0b" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
  </div>
);

export const DealerDocuments = () => (
  <EnterpriseDataTable
    title="Dealer Documents"
    description="GST, PAN, agreement, KYC, certificates, and dealer images."
    rows={dealerDocumentsData}
    columns={[
      { id: "document", header: "Document", cell: (row) => <span className="inline-flex items-center gap-2 font-semibold text-white"><FileText className="h-4 w-4 text-cyan-300" />{row.document}</span> },
      { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
      { id: "updated", header: "Updated", accessor: "updated" },
    ]}
    showImportPlaceholder
    showExportPlaceholder
  />
);

export const DealerTimeline = () => <Timeline items={dealerAuditTimelineData as TimelineItem[]} />;

export const DealerAudit = () => (
  <DashboardWidget title="Dealer Audit" subtitle="Profile updates, orders, rewards, QR and inventory timeline.">
    <DealerTimeline />
  </DashboardWidget>
);

export const DealerProfileTabs = ({ dealer }: { dealer: DealerRecord }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      tabs={[
        { id: "overview", label: "Overview", content: <DealerProfileCard dealer={dealer} /> },
        { id: "orders", label: "Orders", content: <DealerOrdersTable /> },
        { id: "inventory", label: "Inventory", content: <DealerInventoryTable /> },
        { id: "qr", label: "QR Activity", content: <DealerQrActivity /> },
        { id: "customers", label: "Customers", content: <EnterpriseDataTable rows={dealerCustomers} columns={[{ id: "customerName", header: "Customer", accessor: "customerName" }, { id: "city", header: "City", accessor: "city" }, { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> }]} /> },
        { id: "wallet", label: "Wallet", content: <DealerWalletCard /> },
        { id: "rewards", label: "Rewards", content: <DealerRewardsPanel /> },
        { id: "warranty", label: "Warranty", content: <EnterpriseDataTable rows={dealerWarranties} columns={[{ id: "customer", header: "Customer", accessor: "customer" }, { id: "product", header: "Product", accessor: "product" }, { id: "claimStatus", header: "Claim", cell: (row) => <DealerStatusBadge status={row.claimStatus} /> }]} /> },
        { id: "projects", label: "Projects", content: <EnterpriseDataTable rows={dealerProjects} columns={[{ id: "projectName", header: "Project", accessor: "projectName" }, { id: "estimatedValue", header: "Value", accessor: "estimatedValue" }, { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> }]} /> },
        { id: "analytics", label: "Analytics", content: <DealerAnalyticsCharts /> },
        { id: "documents", label: "Documents", content: <DealerDocuments /> },
        { id: "audit", label: "Audit", content: <DealerAudit /> },
      ]}
    />
  );
};

export const DealerInventoryCards = () => (
  <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
    {[["Current Stock", "6,974", Boxes], ["Reserved", "1,676", Boxes], ["Low Stock", "220", ShieldCheck], ["Fast Moving", "PNT-SQR-10L", BadgeCheck], ["Slow Moving", "KIT-CON-12", Store], ["Near Expiry", "184 units", ShieldCheck]].map(([label, value, Icon]) => (
      <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-base font-semibold text-white">{String(value)}</p></div>
    ))}
  </section>
);

export const DealerOrdersDashboard = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-4 xl:grid-cols-7">
      {["Draft", "Submitted", "Approved", "Packed", "Dispatched", "Delivered", "Cancelled"].map((status) => (
        <div key={status} className={cn(panelBase, "p-4")}><ClipboardListIcon status={status} /><p className="mt-3 text-sm font-semibold text-white">{status}</p><p className="mt-1 text-xs text-slate-500">Order status</p></div>
      ))}
    </section>
    <DealerOrdersTable />
    <DealerAudit />
  </div>
);

const ClipboardListIcon = ({ status }: { status: string }) => {
  const tone = status === "Cancelled" ? "text-rose-300" : status === "Delivered" ? "text-emerald-300" : "text-cyan-300";
  return <BadgeCheck className={cn("h-5 w-5", tone)} />;
};

export const DealerCustomersPanel = () => (
  <EnterpriseDataTable
    title="Dealer Customers"
    description="Customer registrations, projects, warranty and reward readiness."
    rows={dealerCustomers}
    columns={[
      { id: "customerName", header: "Customer List", accessor: "customerName" },
      { id: "city", header: "City", accessor: "city" },
      { id: "projects", header: "Projects", accessor: () => "3 active" },
      { id: "warranty", header: "Warranty", accessor: () => "Registered" },
      { id: "rewards", header: "Rewards", accessor: () => "Eligible" },
      { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
    ]}
    showExportPlaceholder
  />
);

export const DealerEmptyPlaceholder = ({ title }: { title: string }) => (
  <EmptyState title={title} description="Static manufacturer admin placeholder ready for future backend integration." />
);
