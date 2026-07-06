import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Bot, Download, Gift, History, Plus, QrCode, RefreshCw, ShieldCheck, ShoppingBag, Ticket, Upload, UserRound, Users, WalletCards } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { customerInsights, customers } from "../../data/customer/customerDemoData";
import { customerProjects } from "../../data/customer/customerProjectDemoData";
import { customerPurchases } from "../../data/customer/customerPurchaseDemoData";
import { customerReferrals } from "../../data/customer/customerReferralDemoData";
import { customerScans } from "../../data/customer/customerScanDemoData";
import { customerSupportTickets } from "../../data/customer/customerSupportDemoData";
import { CustomerAIInsightCard } from "./customer/CustomerCards";
import { CustomerForm } from "./customer/CustomerForms";
import { CustomerProjectTable, CustomerPurchaseTable, CustomerReferralTable, CustomerScanTable, CustomerSupportTable } from "./customer/CustomerTables";
import {
  Customer360Tabs,
  CustomerAnalyticsCharts as Phase4CustomerAnalyticsCharts,
  CustomerDashboard as Phase4CustomerDashboard,
  CustomerFilters,
  CustomerProfileCard as Phase4CustomerProfileCard,
  CustomerRewardsTable as Phase4CustomerRewardsTable,
  CustomerScanTimeline,
  CustomerTable as Phase4CustomerTable,
  CustomerWalletLedger,
  CustomerWarrantyTable as Phase4CustomerWarrantyTable,
} from "./customer/CustomerPhase4Components";

type CustomerMode =
  | "dashboard" | "list" | "create" | "details" | "edit" | "customer-360"
  | "wallet" | "rewards" | "purchases" | "scans" | "warranty" | "referrals"
  | "support" | "history" | "timeline" | "analytics"
  | "scan-journey" | "wallet-view" | "warranty-view" | "rewards-view";

const meta: Record<string, { title: string; description: string; icon: typeof Users }> = {
  dashboard: { title: "Customer Dashboard", description: "Customer command center for registrations, QR activations, wallet, rewards, warranty, referrals, satisfaction, and AI insights.", icon: Users },
  list: { title: "Customers", description: "Manage customer profiles, KYC, tiers, preferred channels, lifetime value, and audit readiness.", icon: Users },
  create: { title: "Create Customer", description: "Static customer onboarding form prepared for backend integration.", icon: Plus },
  edit: { title: "Edit Customer", description: "Update customer profile, preferences, status, KYC, and tier.", icon: UserRound },
  details: { title: "Customer Profile", description: "Customer profile with purchases, scans, wallet, rewards, campaigns, warranty, projects, referrals, support, analytics, history, and audit log.", icon: UserRound },
  "customer-360": { title: "Customer 360", description: "Single-page customer overview with lifetime value, wallet, rewards, products, projects, scans, warranty, campaigns, support tickets, AI recommendations, and timeline.", icon: UserRound },
  wallet: { title: "Customer Wallet", description: "Wallet dashboard, transaction history, credit, debit, transfer, expired points, pending rewards, cashback, and references.", icon: WalletCards },
  rewards: { title: "Loyalty Rewards", description: "Reward dashboard, catalog, reward details, redeem reward, redemption history, leaderboard, achievements, and reward types.", icon: Award },
  purchases: { title: "Purchase History", description: "Purchase dashboard for invoices, products, dealer, retailer, projects, and timeline.", icon: ShoppingBag },
  scans: { title: "QR Scan History", description: "All scans, verification, duplicate scans, counterfeit alerts, location history, and map placeholder.", icon: QrCode },
  warranty: { title: "Customer Warranty", description: "Warranty dashboard, registered products, warranty details, claim, claim status, and claim timeline.", icon: ShieldCheck },
  referrals: { title: "Customer Referrals", description: "Referral dashboard, referral list, invite, referral earnings, and referral history.", icon: Gift },
  support: { title: "Customer Support", description: "Customer support tickets, topics, priority, status, and assistance history.", icon: Ticket },
  history: { title: "Customer History", description: "Customer event history and static audit-ready activity trail.", icon: History },
  timeline: { title: "Customer Timeline", description: "Customer lifecycle timeline across scans, rewards, warranty, purchases, and support.", icon: History },
  analytics: { title: "Customer Analytics", description: "Customer growth, acquisition, repeat purchase, wallet, referral, warranty, and top city analytics.", icon: Bot },
  "scan-journey": { title: "QR Scan Journey", description: "Admin-side view of scan verification, OTP, warranty activation, reward credit, wallet update, risk, and device context.", icon: QrCode },
  "wallet-view": { title: "Customer Wallet View", description: "Wallet balance, points, cashback, pending rewards, transaction ledger, reward expiry, and adjustment placeholder.", icon: WalletCards },
  "warranty-view": { title: "Customer Warranty View", description: "Registered products, warranty certificate preview, claim history, claim status, and expiry alerts.", icon: ShieldCheck },
  "rewards-view": { title: "Customer Rewards View", description: "Rewards earned, redeemed, campaign rewards, referral rewards, catalog preview, and redemption history.", icon: Award },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: CustomerMode }) => {
  const current = meta[mode] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={<div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Customer Experience</p></div>}
      end={<><Link to="/customer-360" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"><UserRound className="h-4 w-4" />Customer 360</Link><Link to="/customers/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus className="h-4 w-4" />Create</Link><SecondaryButton icon={Upload}>Import</SecondaryButton><SecondaryButton icon={Download}>Export</SecondaryButton><SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton></>}
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "New", "Verified", "Registered", "Redeemed", "Open", "At Risk"].map((value) => ({ label: value, value }))} />
    <Select label="City" value="" onChange={() => undefined} placeholder="All cities" options={["Pune", "Mumbai", "Chennai", "Delhi"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Widget = ({ title, children }: { title: string; children: ReactNode }) => <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">{title}</h2><div className="mt-4 space-y-3">{children}</div></section>;

const Dashboard = () => (
  <Phase4CustomerDashboard />
);

const DetailsPage = () => {
  const { id } = useParams();
  const customer = customers.find((item) => item.id === id) || customers[0];
  return (
    <div className="space-y-4">
      <Phase4CustomerProfileCard customer={customer} />
      <section className={cn(panelBase, "overflow-hidden p-4")}>
        <Customer360Tabs customer={customer} />
      </section>
    </div>
  );
};

const WalletRewards = ({ mode }: { mode: CustomerMode }) => (
  <div className="space-y-4">
    {mode === "wallet" ? <CustomerWalletLedger /> : <Phase4CustomerRewardsTable />}
  </div>
);

const Analytics = () => (
  <div className="space-y-4">
    <Phase4CustomerAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["Customer Growth", "Customer Acquisition", "Repeat Purchase", "Wallet Trend", "Referral Trend", "Warranty Trend", "Top Cities", "Satisfaction"].map((label) => <div key={label} className={cn(panelBase, "p-4")}><Bot className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{label}</p><p className="mt-1 text-xs leading-5 text-slate-500">Static analytics tile ready for future data.</p></div>)}</section>
    <Widget title="AI Customer Insights">{customerInsights.map((insight) => <CustomerAIInsightCard key={insight} insight={insight} />)}</Widget>
  </div>
);

const TableContent = ({ mode, query }: { mode: CustomerMode; query: string }) => {
  const filteredCustomers = useFilteredRows(customers, query);
  const filteredPurchases = useFilteredRows(customerPurchases, query);
  const filteredScans = useFilteredRows(customerScans, query);
  const filteredReferrals = useFilteredRows(customerReferrals, query);
  const filteredSupport = useFilteredRows(customerSupportTickets, query);
  const filteredProjects = useFilteredRows(customerProjects, query);
  if (mode === "list") return <Phase4CustomerTable rows={filteredCustomers} />;
  if (mode === "purchases") return <CustomerPurchaseTable rows={filteredPurchases} />;
  if (mode === "scans") return <CustomerScanTable rows={filteredScans} />;
  if (mode === "warranty") return <Phase4CustomerWarrantyTable />;
  if (mode === "referrals") return <CustomerReferralTable rows={filteredReferrals} />;
  if (mode === "support") return <CustomerSupportTable rows={filteredSupport} />;
  if (mode === "history" || mode === "timeline") return <CustomerProjectTable rows={filteredProjects} />;
  return <EmptyState title="Customer workspace ready" description="Static frontend records will appear here for this customer workflow." />;
};

const CustomerExperience = ({ mode = "dashboard" }: { mode?: CustomerMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const customer = customers.find((item) => item.id === id) || customers[0];
  const tableModes: CustomerMode[] = ["list", "purchases", "scans", "warranty", "referrals", "support", "history", "timeline"];
  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "create" || mode === "edit" ? <CustomerForm record={mode === "edit" ? customer : undefined} /> : null}
      {mode === "details" || mode === "customer-360" ? <DetailsPage /> : null}
      {mode === "wallet" || mode === "rewards" ? <WalletRewards mode={mode} /> : null}
      {mode === "scan-journey" ? <CustomerScanTimeline /> : null}
      {mode === "wallet-view" ? <CustomerWalletLedger /> : null}
      {mode === "warranty-view" ? <Phase4CustomerWarrantyTable /> : null}
      {mode === "rewards-view" ? <Phase4CustomerRewardsTable /> : null}
      {mode === "analytics" ? <Analytics /> : null}
      {tableModes.includes(mode) ? <>{mode === "list" ? <CustomerFilters query={query} setQuery={setQuery} /> : <FilterBar query={query} setQuery={setQuery} label={meta[mode]?.title || "Customer"} />}<TableContent mode={mode} query={query} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${meta[mode]?.title || "Customer Experience"}`} /></> : null}
    </div>
  );
};

export default CustomerExperience;
