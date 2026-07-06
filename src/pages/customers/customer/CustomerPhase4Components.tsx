import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Award, BadgeCheck, Eye, Gift, ShieldAlert, ShieldCheck, UserRound, WalletCards } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
  customerAnalyticsData,
  customerAuditLogData,
  customerDashboardData,
  customerScanJourneyData,
  customerScanTimelineData,
  scanToRegistrationFunnel,
} from "../../../data/customer/customerAdminDemoData";
import type { CustomerRecord } from "../../../data/customer/customerDemoData";
import { customerScans } from "../../../data/customer/customerScanDemoData";
import { customerWalletSummary, customerWalletTransactions } from "../../../data/customer/customerWalletDemoData";
import { customerWarranties } from "../../../data/customer/customerWarrantyDemoData";
import { customerRewards } from "../../../data/customer/customerRewardDemoData";
import { customerPurchases } from "../../../data/customer/customerPurchaseDemoData";
import { customerSupportTickets } from "../../../data/customer/customerSupportDemoData";
import { CustomerStatusBadge } from "./CustomerStatusBadge";

const tooltipStyle = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

export const CustomerTierBadge = ({ tier }: { tier: string }) => {
  const tone = tier === "Platinum" ? "info" : tier === "Gold" ? "warning" : tier === "Silver" ? "default" : "success";
  return <Badge tone={tone}>{tier}</Badge>;
};

export const ScanResultBadge = ({ result }: { result: string }) => (
  <Badge tone={result === "Genuine" || result === "Verified" ? "success" : result.includes("Risk") || result.includes("Counterfeit") ? "danger" : "warning"}>{result}</Badge>
);

export const RiskScoreBadge = ({ score }: { score: number }) => (
  <Badge tone={score > 70 ? "danger" : score > 40 ? "warning" : "success"}>{score} risk</Badge>
);

const MiniRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-200">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      {status ? <CustomerStatusBadge status={status} /> : null}
    </div>
  </div>
);

const ChartShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <ChartCard title={title} description={description} framed={false} minHeight="280px" contentClassName="h-[280px]">
    {children}
  </ChartCard>
);

export const CustomerAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartShell title="Customer Acquisition" description="Customer acquisition and repeat scan movement.">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={customerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Area dataKey="acquisition" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
          <Area dataKey="repeatScan" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Reward Redemption" description="Rewards and warranty activation trend.">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={customerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="rewards" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="warranty" stroke="#f472b6" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="City-wise Customers" description="City and product-wise customer activity.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={customerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="city" fill="#a78bfa" radius={[6, 6, 0, 0]} />
          <Bar dataKey="product" fill="#22d3ee" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
    <ChartShell title="Campaign-wise Customers" description="Campaign attribution from QR scan journeys.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={customerAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="campaign" fill="#34d399" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  </section>
);

export const CustomerDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={customerDashboardData.kpis} />
    <section className="grid gap-4 xl:grid-cols-2">
      <CustomerAnalyticsCharts />
    </section>
    <section className="grid gap-4 xl:grid-cols-2">
      <ChartShell title="Scan to Registration Funnel" description="Post-scan journey conversion.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={scanToRegistrationFunnel}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="stage" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
      <ChartShell title="Customer Tier Distribution" description="Tier concentration across registered customers.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{ tier: "Platinum", value: 28 }, { tier: "Gold", value: 34 }, { tier: "Silver", value: 26 }, { tier: "Bronze", value: 12 }]}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="tier" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
    </section>
    <section className="grid gap-4 xl:grid-cols-5">
      <DashboardWidget title="Recent Customers" subtitle="Latest customer profiles.">{customerDashboardData.recentCustomers.map((item) => <MiniRow key={item.id} title={item.name} detail={`${item.city} / ${item.source}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Scans" subtitle="Recent QR scan journeys.">{customerScans.slice(0, 3).map((scan) => <MiniRow key={scan.id} title={scan.qrCode} detail={`${scan.product} / ${scan.location}`} status={scan.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Warranty Activations" subtitle="Warranty from scan flow.">{customerWarranties.map((item) => <MiniRow key={item.id} title={item.claimNumber} detail={`${item.customer} / ${item.product}`} status={item.claimStatus} />)}</DashboardWidget>
      <DashboardWidget title="Recent Reward Credits" subtitle="Wallet updates from rewards.">{customerDashboardData.recentRewardCredits.map((item) => <MiniRow key={item.id} title={item.customer} detail={`${item.reward} / ${item.source}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="AI Customer Insights" subtitle="Static customer intelligence.">{customerDashboardData.aiInsights.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.severity} />)}</DashboardWidget>
    </section>
  </div>
);

export const CustomerTable = ({ rows }: { rows: CustomerRecord[] }) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const columns: DataTableColumn<CustomerRecord>[] = [
    { id: "customer", header: "Customer", cell: (row) => <Link to={`/customers/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.firstName} {row.lastName}</Link>, sortable: true },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "city", header: "City", accessor: "city", sortable: true },
    { id: "source", header: "Source", accessor: "registrationSource" },
    { id: "scans", header: "Total Scans", accessor: () => "386", align: "right", sortable: true },
    { id: "wallet", header: "Wallet Balance", accessor: "walletBalance", align: "right" },
    { id: "rewards", header: "Rewards Earned", accessor: "rewardsEarned", align: "right" },
    { id: "warranty", header: "Warranty Count", accessor: "warrantyRegistrations", align: "right" },
    { id: "tier", header: "Tier", cell: (row) => <CustomerTierBadge tier={row.customerTier} /> },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
    { id: "last", header: "Last Activity", accessor: () => "Today 10:26" },
  ];
  return (
    <EnterpriseDataTable
      title="Customer List"
      description="Admin-side customers registered through QR scans, referrals, warranty, and app flows."
      rows={rows}
      columns={columns}
      enableSelection
      selectedRowIds={selected}
      onSelectedRowIdsChange={setSelected}
      showExportPlaceholder
      bulkActions={[{ id: "export", label: "Bulk Export", onClick: () => undefined }, { id: "status", label: "Bulk Status", onClick: () => undefined }]}
      actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/customers/${row.id}`; } }]}
    />
  );
};

export const CustomerFilters = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => (
  <AdvancedFilters title="Customer filters" activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder="Search customer, mobile, email, city, tier, source" />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "New", "Inactive", "At Risk"].map((value) => ({ label: value, value }))} />
    <Select label="Tier" value="" onChange={() => undefined} placeholder="All tiers" options={["Platinum", "Gold", "Silver", "Bronze"].map((value) => ({ label: value, value }))} />
    <Select label="City" value="" onChange={() => undefined} placeholder="All cities" options={["Pune", "Mumbai", "Chennai", "Delhi"].map((value) => ({ label: value, value }))} />
    <DateRangePicker label="Date range" value={{ from: "", to: "" }} onChange={() => undefined} />
  </AdvancedFilters>
);

export const CustomerProfileCard = ({ customer }: { customer: CustomerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="Profile" subtitle="Customer identity and QR registration context.">
      <div className="grid gap-3 md:grid-cols-3">
        {[["Contact", `${customer.mobile} / ${customer.email}`], ["Location", `${customer.city}, ${customer.state}`], ["Lifetime Value", customer.lifetimeValue], ["Wallet Balance", customer.walletBalance], ["Reward Points", customer.rewardsEarned], ["Warranty Count", customer.warrantyRegistrations], ["Support Tickets", "3"], ["Last Scan", "Today 10:26"], ["Source", customer.registrationSource]].map(([label, value]) => (
          <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
    <aside className={cn(panelBase, "p-4")}>
      <UserRound className="h-8 w-8 text-cyan-300" />
      <h3 className="mt-4 text-lg font-semibold text-white">{customer.firstName} {customer.lastName}</h3>
      <p className="mt-1 text-sm text-slate-500">{customer.customerId} / {customer.occupation}</p>
      <div className="mt-4 flex flex-wrap gap-2"><CustomerStatusBadge status={customer.status} /><CustomerTierBadge tier={customer.customerTier} /><CustomerStatusBadge status={customer.kycStatus} /></div>
    </aside>
  </section>
);

export const CustomerScanTimeline = () => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="QR Scan Journey" subtitle="Admin-side view of what happened after scan.">
      <div className="grid gap-3 md:grid-cols-2">
        {customerScanJourneyData.map((item) => (
          <div key={item.id} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{item.value}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
    <DashboardWidget title="Timeline" subtitle="Scan to reward credit lifecycle.">
      <Timeline items={customerScanTimelineData as TimelineItem[]} />
    </DashboardWidget>
  </section>
);

export const CustomerWalletLedger = () => (
  <div className="space-y-4">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {[["Wallet Balance", customerWalletSummary.availableBalance, WalletCards], ["Points", customerWalletSummary.pointsEarned, Award], ["Cashback", customerWalletSummary.cashbackEarned, Gift], ["Pending Rewards", customerWalletSummary.pendingRewards, BadgeCheck], ["Reward Expiry", customerWalletSummary.expiredPoints, ShieldAlert], ["Manual Adjustment", "Placeholder", WalletCards]].map(([label, value, Icon]) => (
        <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>
      ))}
    </section>
    <CustomerWalletLedgerTable />
  </div>
);

const CustomerWalletLedgerTable = () => {
  const columns: DataTableColumn<(typeof customerWalletTransactions)[number]>[] = [
    { id: "referenceNumber", header: "Reference", accessor: "referenceNumber", sortable: true },
    { id: "type", header: "Type", accessor: "type" },
    { id: "pointsEarned", header: "Credit", accessor: "pointsEarned", align: "right" },
    { id: "pointsRedeemed", header: "Debit", accessor: "pointsRedeemed", align: "right" },
    { id: "cashbackEarned", header: "Cashback", accessor: "cashbackEarned", align: "right" },
    { id: "availableBalance", header: "Balance", accessor: "availableBalance", align: "right" },
    { id: "expiryDate", header: "Expiry", accessor: "expiryDate" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Transaction Ledger" description="Credit/debit history, cashback, expiry, and reward balance." rows={customerWalletTransactions} columns={columns} showExportPlaceholder />;
};

export const CustomerWarrantyTable = () => {
  const columns: DataTableColumn<(typeof customerWarranties)[number]>[] = [
    { id: "claimNumber", header: "Warranty", accessor: "claimNumber", sortable: true },
    { id: "product", header: "Registered Product", accessor: "product" },
    { id: "registeredDate", header: "Registered", accessor: "registeredDate" },
    { id: "expiryDate", header: "Expiry Alert", accessor: "expiryDate" },
    { id: "timeline", header: "Claim History", accessor: "timeline" },
    { id: "claimStatus", header: "Claim Status", cell: (row) => <CustomerStatusBadge status={row.claimStatus} /> },
  ];
  return (
    <div className="space-y-4">
      <DashboardWidget title="Warranty Certificate Preview" subtitle="Static certificate preview for registered products.">
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4"><ShieldCheck className="h-6 w-6 text-cyan-200" /><p className="mt-3 text-sm font-semibold text-white">Warranty certificate ready for QR-registered product.</p></div>
      </DashboardWidget>
      <EnterpriseDataTable title="Registered Products" rows={customerWarranties} columns={columns} showExportPlaceholder />
    </div>
  );
};

export const CustomerRewardsTable = () => {
  const columns: DataTableColumn<(typeof customerRewards)[number]>[] = [
    { id: "reward", header: "Rewards Earned", accessor: "reward" },
    { id: "rewardType", header: "Reward Type", accessor: "rewardType" },
    { id: "points", header: "Points", accessor: "points", align: "right" },
    { id: "campaign", header: "Campaign Rewards", accessor: () => "QR Scan Campaign" },
    { id: "referral", header: "Referral Rewards", accessor: () => "Eligible" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return (
    <div className="space-y-4">
      <DashboardWidget title="Reward Catalog Preview" subtitle="Static eligible rewards preview.">
        <div className="grid gap-3 md:grid-cols-3">{["Gift Voucher", "Cashback", "Coupon"].map((item) => <div key={item} className="rounded-md border border-slate-800 bg-slate-900/70 p-4"><Gift className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{item}</p></div>)}</div>
      </DashboardWidget>
      <EnterpriseDataTable title="Reward History" rows={customerRewards} columns={columns} showExportPlaceholder />
    </div>
  );
};

export const Customer360Tabs = ({ customer }: { customer: CustomerRecord }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const auditColumns: DataTableColumn<(typeof customerAuditLogData)[number]>[] = [
    { id: "action", header: "Action", accessor: "action" },
    { id: "actor", header: "Actor", accessor: "actor" },
    { id: "source", header: "Source", accessor: "source" },
    { id: "timestamp", header: "Timestamp", accessor: "timestamp" },
  ];
  return (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview", content: <CustomerProfileCard customer={customer} /> },
        { id: "qr", label: "QR Scans", content: <CustomerScanTimeline /> },
        { id: "wallet", label: "Wallet", content: <CustomerWalletLedger /> },
        { id: "rewards", label: "Rewards", content: <CustomerRewardsTable /> },
        { id: "warranty", label: "Warranty", content: <CustomerWarrantyTable /> },
        { id: "products", label: "Products", content: <EnterpriseDataTable rows={customerPurchases} columns={[{ id: "product", header: "Product", accessor: "product" }, { id: "sku", header: "SKU", accessor: "sku" }, { id: "amount", header: "Amount", accessor: "amount" }]} /> },
        { id: "campaigns", label: "Campaigns", content: <EmptyState title="Campaign participation" description="Campaign participation will appear here." /> },
        { id: "support", label: "Support", content: <EnterpriseDataTable rows={customerSupportTickets} columns={[{ id: "ticketNumber", header: "Ticket", accessor: "ticketNumber" }, { id: "topic", header: "Topic", accessor: "topic" }, { id: "status", header: "Status", accessor: "status" }]} /> },
        { id: "timeline", label: "Timeline", content: <CustomerScanTimeline /> },
        { id: "analytics", label: "Analytics", content: <CustomerAnalyticsCharts /> },
        { id: "audit", label: "Audit Log", content: <EnterpriseDataTable rows={customerAuditLogData} columns={auditColumns} /> },
      ]}
      value={activeTab}
      onChange={setActiveTab}
    />
  );
};
