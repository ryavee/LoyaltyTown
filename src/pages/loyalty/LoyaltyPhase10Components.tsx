import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  Award,
  Banknote,
  CheckCircle2,
  Crown,
  Eye,
  Gift,
  HandCoins,
  Layers3,
  ShieldCheck,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";
import {
  AdvancedFilters,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  Pagination,
  SearchInput,
  Select,
  Stepper,
} from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise/types";
import { cn, panelBase } from "../../Components/enterprise/utils";
import {
  achievementDemoData,
  cashbackDemoData,
  leaderboardDemoData,
  loyaltyAdminDashboardData,
  loyaltyAnalyticsData,
  redemptionDemoData,
  rewardCatalogDemoData,
  rewardRuleDemoData,
  tierDemoData,
  walletDemoData,
  walletLedgerDemoData,
  type RewardCatalogRow,
  type RewardRule,
  type WalletRow,
} from "../../data/loyalty/loyaltyAdminDemoData";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltip = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
};

const tone: Record<string, string> = {
  Active: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Published: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Draft: "border-slate-600 bg-slate-800/70 text-slate-300",
  Pending: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  Approved: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Failed: "border-rose-400/25 bg-rose-400/10 text-rose-200",
  Hold: "border-orange-400/25 bg-orange-400/10 text-orange-200",
  Completed: "border-violet-400/25 bg-violet-400/10 text-violet-200",
};

export const LoyaltyStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold", tone[status] || tone.Draft)}>
    {status}
  </span>
);

const HeaderText = ({ title, description }: { title: string; description?: string }) => (
  <div>
    <h2 className="text-sm font-semibold text-white">{title}</h2>
    {description ? <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p> : null}
  </div>
);

const MiniCard = ({ icon: Icon, title, detail, metric }: { icon: typeof WalletCards; title: string; detail: string; metric?: string }) => (
  <article className="rounded-md border border-slate-800 bg-slate-900/70 p-4 transition hover:border-cyan-400/30 hover:bg-slate-900">
    <div className="flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
      {metric ? <span className="text-xs font-semibold text-cyan-200">{metric}</span> : null}
    </div>
    <p className="mt-4 text-sm font-semibold text-white">{title}</p>
    <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
  </article>
);

export const LoyaltyAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <HeaderText title="Points Issued vs Redeemed" description="Static earn and burn trend for all owner types." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={loyaltyAnalyticsData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Area dataKey="issued" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="redeemed" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <HeaderText title="Cashback and Redemption Trend" description="Cashback paid and redemption volume." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={loyaltyAnalyticsData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Line type="monotone" dataKey="cashback" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="redemptions" stroke="#fb7185" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="roi" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <HeaderText title="Tier Distribution" description="Member progression across Bronze, Silver, Gold, Platinum, and Diamond." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={tierDemoData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Bar dataKey="progression" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <HeaderText title="Wallet Liability and Fraud Holds" description="Outstanding liability with risk review volume." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={loyaltyAnalyticsData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Bar dataKey="liability" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            <Bar dataKey="fraud" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

export const LoyaltyDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={loyaltyAdminDashboardData.kpis} />
    <LoyaltyAnalyticsCharts />
    <section className="grid gap-4 xl:grid-cols-4">
      <div className={cn(panelBase, "p-4")}>
        <HeaderText title="Reward Rules" description="Top earning rules by activity." />
        <div className="mt-4 space-y-3">{rewardRuleDemoData.slice(0, 3).map((rule) => <MiniCard key={rule.id} icon={HandCoins} title={rule.ruleName} detail={`${rule.ruleType} / ${rule.earningLogic}`} metric={rule.status} />)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <HeaderText title="Wallet Holds" description="Static risk and payout review queue." />
        <div className="mt-4 space-y-3">{walletDemoData.filter((wallet) => wallet.holds !== "$0").map((wallet) => <MiniCard key={wallet.id} icon={AlertTriangle} title={wallet.owner} detail={`${wallet.ownerType} / holds ${wallet.holds}`} metric={wallet.payoutStatus} />)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <HeaderText title="Recent Redemptions" />
        <div className="mt-4 space-y-3">{redemptionDemoData.slice(0, 3).map((item) => <MiniCard key={item.id} icon={Gift} title={item.reward} detail={`${item.member} / ${item.fulfillment}`} metric={item.status} />)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <HeaderText title="Loyalty Insights" />
        <div className="mt-4 space-y-3">{loyaltyAdminDashboardData.insights.map((insight) => <div key={insight} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>)}</div>
      </div>
    </section>
  </div>
);

export const RewardRuleWizard = () => {
  const steps = ["Rule Info", "Audience", "Product/SKU", "Earning Logic", "Fraud Guard", "Review", "Publish"];
  const types = ["QR Scan", "Product Purchase", "Referral", "Campaign", "Dealer Target", "Retailer Sale", "Contractor Scan", "Tier Bonus", "Region Bonus"];
  return (
    <section className={cn(panelBase, "p-4")}>
      <HeaderText title="Reward Rules Builder" description="Wizard placeholder for earn rules across scans, purchases, referrals, campaigns, channel targets, tiers, and regions." />
      <div className="mt-5"><Stepper steps={steps.map((title, index) => ({ id: title, title, status: index === 0 ? "current" : "upcoming" }))} /></div>
      <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {types.map((type) => <MiniCard key={type} icon={ShieldCheck} title={type} detail="Rule type configuration placeholder." />)}
      </div>
    </section>
  );
};

export const WalletLedger = () => <GenericTable title="Transaction Ledger" rows={walletLedgerDemoData} />;

export const WalletTable = ({ rows }: { rows: WalletRow[] }) => {
  const columns: DataTableColumn<WalletRow>[] = [
    { id: "owner", header: "Owner", accessor: "owner", sortable: true },
    { id: "ownerType", header: "Owner Type", accessor: "ownerType", sortable: true },
    { id: "walletBalance", header: "Wallet Balance", accessor: "walletBalance", align: "right" },
    { id: "points", header: "Points", accessor: "points", align: "right" },
    { id: "cashback", header: "Cashback", accessor: "cashback", align: "right" },
    { id: "holds", header: "Holds", accessor: "holds", align: "right" },
    { id: "tier", header: "Tier", accessor: "tier" },
    { id: "payoutStatus", header: "Payout Status", cell: (row) => <LoyaltyStatusBadge status={row.payoutStatus} /> },
  ];
  return <EnterpriseDataTable title="Wallet Management" rows={rows} columns={columns} showExportPlaceholder actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/wallet/${row.id}`; } }]} />;
};

export const RewardCatalogTable = ({ rows }: { rows: RewardCatalogRow[] }) => {
  const columns: DataTableColumn<RewardCatalogRow>[] = [
    { id: "rewardName", header: "Reward", accessor: "rewardName", sortable: true },
    { id: "rewardType", header: "Type", accessor: "rewardType" },
    { id: "stock", header: "Stock", accessor: "stock", align: "right" },
    { id: "eligibility", header: "Eligibility", accessor: "eligibility" },
    { id: "pointsCost", header: "Points Cost", accessor: "pointsCost", align: "right" },
    { id: "redemptionLimit", header: "Limit", accessor: "redemptionLimit" },
    { id: "status", header: "Status", cell: (row) => <LoyaltyStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Rewards Catalog" rows={rows} columns={columns} showExportPlaceholder actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/rewards-catalog/${row.id}`; } }]} />;
};

export const RewardForm = ({ reward }: { reward?: RewardCatalogRow }) => {
  const valueFor = (field: string) => {
    if (!reward) return "";
    const keyByField: Record<string, keyof RewardCatalogRow> = {
      "Reward Name": "rewardName",
      "Reward Type": "rewardType",
      Stock: "stock",
      Eligibility: "eligibility",
      "Points Cost": "pointsCost",
      "Redemption Limit": "redemptionLimit",
      Status: "status",
    };
    const key = keyByField[field];
    return key ? String(reward[key]) : "";
  };

  return (
    <section className={cn(panelBase, "p-4")}>
      <HeaderText title={reward ? "Reward Details" : "Create Reward"} description="Static reward setup form placeholder for stock, eligibility, points cost, and redemption limits." />
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {["Reward Name", "Reward Type", "Stock", "Eligibility", "Points Cost", "Redemption Limit", "Fulfillment Mode", "Status"].map((field) => (
          <label key={field} className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{field}</span>
            <input className="mt-2 h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 text-sm text-slate-200 outline-none focus:border-cyan-400/50" defaultValue={valueFor(field)} />
          </label>
        ))}
      </div>
    </section>
  );
};

export const RedemptionTable = () => <GenericTable title="Redemptions and Approval Queue" rows={redemptionDemoData} detailPath="/redemptions" />;

export const CashbackDashboard = () => (
  <div className="space-y-4">
    <div className="grid gap-3 md:grid-cols-3">
      {["Cashback Rules", "Payouts", "Failed Payouts", "Reconciliation"].map((item) => <MiniCard key={item} icon={Banknote} title={item} detail="Static cashback engine placeholder." />)}
    </div>
    <GenericTable title="Cashback Rules" rows={cashbackDemoData.rules} />
    <PayoutTable />
  </div>
);

export const PayoutTable = () => <GenericTable title="Cashback Payouts" rows={cashbackDemoData.payouts} />;

export const TierCard = ({ tier }: { tier: (typeof tierDemoData)[number] }) => (
  <article className={cn(panelBase, "overflow-hidden p-4")}>
    <div className={cn("h-1 rounded-full bg-gradient-to-r", tier.color)} />
    <Crown className="mt-4 h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-lg font-semibold text-white">{tier.name}</h3>
    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{tier.threshold}</p>
    <p className="mt-3 text-sm leading-6 text-slate-400">{tier.benefits}</p>
    <div className="mt-4 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-cyan-400" style={{ width: `${tier.progression}%` }} /></div>
    <p className="mt-2 text-xs text-slate-500">{tier.members} members</p>
  </article>
);

export const LeaderboardTable = () => <GenericTable title="Leaderboards" rows={leaderboardDemoData} />;

export const AchievementBadge = ({ item }: { item: (typeof achievementDemoData)[number] }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Award className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-white">{item.badge}</h3>
    <p className="mt-1 text-xs leading-5 text-slate-500">{item.milestone}</p>
    <div className="mt-4 flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-cyan-200">{item.earned} earned</span>
      <LoyaltyStatusBadge status={item.status} />
    </div>
  </article>
);

export const LoyaltyFilterBar = ({ query, onQueryChange, label }: { query: string; onQueryChange: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={onQueryChange} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Draft", "Published", "Pending", "Approved", "Failed", "Hold"].map((value) => ({ label: value, value }))} />
    <Select label="Owner Type" value="" onChange={() => undefined} placeholder="All owners" options={["Customer", "Dealer", "Distributor", "Retailer", "Contractor"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

export const GenericTable = <T extends { id?: string | number } & Record<string, unknown>>({ title, rows, detailPath }: { title: string; rows: T[]; detailPath?: string }) => {
  const columns = useMemo<DataTableColumn<T>[]>(() => Object.keys(rows[0] || {}).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    accessor: key,
    cell: key.toLowerCase().includes("status") ? (row) => <LoyaltyStatusBadge status={String(row[key])} /> : undefined,
  })), [rows]);
  return (
    <EnterpriseDataTable
      title={title}
      rows={rows}
      columns={columns}
      showExportPlaceholder
      actions={detailPath ? [{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `${detailPath}/${row.id}`; } }] : undefined}
    />
  );
};

export const DetailSummary = ({ title, rows, children }: { title: string; rows: Array<[string, string]>; children?: ReactNode }) => (
  <div className="space-y-4">
    <section className={cn(panelBase, "p-4")}>
      <HeaderText title={title} description="Static detail workspace prepared for future backend integration." />
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><div className="mt-2 text-sm font-semibold text-white">{label.toLowerCase().includes("status") ? <LoyaltyStatusBadge status={value} /> : value}</div></div>)}
      </div>
    </section>
    {children}
  </div>
);

export const TierGrid = () => <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{tierDemoData.map((tier) => <TierCard key={tier.id} tier={tier} />)}</section>;

export const AchievementsGrid = () => <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{achievementDemoData.map((item) => <AchievementBadge key={item.id} item={item} />)}</section>;

export const LoyaltyPagination = () => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel="Static loyalty records" />;
};

export const filterRows = <T extends Record<string, unknown>>(rows: T[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
};

export const EmptyLoyaltyState = () => <EmptyState title="Loyalty workspace ready" description="Static loyalty records will appear here for this workflow." />;

export const RuleTable = ({ rows }: { rows: RewardRule[] }) => {
  const columns: DataTableColumn<RewardRule>[] = [
    { id: "ruleName", header: "Rule", accessor: "ruleName", sortable: true },
    { id: "ruleType", header: "Rule Type", accessor: "ruleType" },
    { id: "audience", header: "Audience", accessor: "audience" },
    { id: "productScope", header: "Product/SKU", accessor: "productScope" },
    { id: "earningLogic", header: "Earning Logic", accessor: "earningLogic" },
    { id: "fraudGuard", header: "Fraud Guard", accessor: "fraudGuard" },
    { id: "status", header: "Status", cell: (row) => <LoyaltyStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Reward Rules" rows={rows} columns={columns} showExportPlaceholder actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/loyalty/rules/${row.id}`; } }]} />;
};

export const LoyaltySurfaceCards = () => (
  <div className="grid gap-3 md:grid-cols-4">
    {[
      ["Wallet Management", "Balance, points, cashback, holds, payouts", WalletCards],
      ["Rewards Catalog", "Stock, eligibility, points cost, limits", Gift],
      ["Redemptions", "Approval queue and fulfillment timeline", Trophy],
      ["Fraud Guard", "Holds, velocity checks, duplicate earn control", ShieldCheck],
    ].map(([title, detail, Icon]) => <MiniCard key={String(title)} icon={Icon as typeof WalletCards} title={String(title)} detail={String(detail)} />)}
  </div>
);

export const FulfillmentTimeline = () => (
  <section className={cn(panelBase, "p-4")}>
    <HeaderText title="Fulfillment Timeline" description="Static redemption fulfillment states." />
    <div className="mt-4 space-y-3">
      {["Requested", "Fraud checked", "Approved", "Fulfillment queued", "Reward delivered", "Ledger updated"].map((step, index) => (
        <div key={step} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">{index + 1}</span>
          <div><p className="text-sm font-semibold text-white">{step}</p><p className="mt-1 text-xs text-slate-500">2026-07-{String(6 + index).padStart(2, "0")} / Loyalty Ops</p></div>
        </div>
      ))}
    </div>
  </section>
);

export const RuleReviewCards = () => (
  <div className="grid gap-3 md:grid-cols-3">
    <MiniCard icon={CheckCircle2} title="Review Summary" detail="Validate audience, product scope, earn logic, and fraud guard." />
    <MiniCard icon={Layers3} title="Publish Controls" detail="Schedule, publish, pause, or archive rule placeholders." />
    <MiniCard icon={ShieldCheck} title="Fraud Guard" detail="Duplicate scans, geo velocity, wallet abuse, and payout hold rules." />
  </div>
);
