import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Award, Bot, ClipboardList, Download, FileBarChart, GraduationCap, Hammer, MapPin, Plus, RefreshCw, ScanLine, ShieldCheck, Ticket, Upload, Users, WalletCards } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, PageToolbar, Pagination, ReusableFormLayout, SearchInput, SecondaryButton, Select, TextInput } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { certificates } from "../../data/contractor/certificateDemoData";
import { contractorInsights, contractors } from "../../data/contractor/contractorDemoData";
import { contractorProjects } from "../../data/contractor/contractorProjectDemoData";
import { contractorPurchases } from "../../data/contractor/contractorPurchaseDemoData";
import { contractorRewards } from "../../data/contractor/contractorRewardDemoData";
import { contractorScans } from "../../data/contractor/contractorScanDemoData";
import { contractorSupportTickets, contractorWarranties } from "../../data/contractor/contractorSupportDemoData";
import { nearbyDealers } from "../../data/contractor/nearbyDealerDemoData";
import { referrals } from "../../data/contractor/referralDemoData";
import { trainingCourses } from "../../data/contractor/trainingDemoData";
import { ContractorAIInsightCard } from "./contractor/ContractorCards";
import { ContractorForm } from "./contractor/ContractorForms";
import { ContractorStatusBadge } from "./contractor/ContractorStatusBadge";
import { ContractorCertificateTable, ContractorProjectTable, ContractorPurchaseTable, ContractorScanTable, ContractorSupportTable, ContractorTable, ContractorTrainingTable, ContractorWarrantyTable, ReferralTable } from "./contractor/ContractorTables";
import {
  CertificateCard as Phase8CertificateCard,
  ContractorAnalyticsCharts as Phase8ContractorAnalyticsCharts,
  ContractorAudit,
  ContractorDashboard as Phase8ContractorDashboard,
  ContractorDirectoryFilters,
  ContractorDocuments,
  ContractorProfileTabs,
  ContractorProjectTable as Phase8ContractorProjectTable,
  ContractorPurchaseTable as Phase8ContractorPurchaseTable,
  ContractorRewardsPanel,
  ContractorScanTable as Phase8ContractorScanTable,
  ContractorSupportTable as Phase8ContractorSupportTable,
  ContractorTable as Phase8ContractorTable,
  ContractorWalletCard as Phase8ContractorWalletCard,
  ContractorWarrantyTable as Phase8ContractorWarrantyTable,
  NearbyDealerCard as Phase8NearbyDealerCard,
  ReferralTable as Phase8ReferralTable,
  TrainingCourseCard as Phase8TrainingCourseCard,
} from "./contractor/ContractorPhase8Components";

type ContractorMode =
  | "dashboard" | "list" | "create" | "details" | "edit"
  | "projects" | "project-create" | "project-details"
  | "scans" | "purchases" | "invoices"
  | "wallet" | "rewards" | "training" | "certificates"
  | "referrals" | "nearby-dealers" | "warranty" | "support" | "analytics"
  | "documents" | "audit";

const meta: Record<string, { title: string; description: string; icon: typeof Hammer }> = {
  dashboard: { title: "Contractor Dashboard", description: "Contractor command center for scan-to-earn, projects, wallet, rewards, training, certificates, referrals, support, and AI insights.", icon: Hammer },
  list: { title: "Contractors", description: "Manage contractor profiles, KYC, tier status, dealer mapping, distributor mapping, and audit readiness.", icon: Users },
  create: { title: "Create Contractor", description: "Static contractor onboarding form prepared for backend integration.", icon: Plus },
  edit: { title: "Edit Contractor", description: "Update contractor profile, KYC and channel assignment.", icon: Hammer },
  details: { title: "Contractor Profile", description: "Contractor 360 view with projects, scans, purchases, wallet, rewards, training, certificates, referrals, nearby dealers, warranty, support, analytics, documents, history, and audit log.", icon: Hammer },
  projects: { title: "Contractor Projects", description: "Project list, create project, details, product usage, site photos, and timeline placeholders.", icon: ClipboardList },
  "project-create": { title: "Create Contractor Project", description: "Static project registration form prepared for future workflows.", icon: Plus },
  "project-details": { title: "Project Details", description: "Project details with product usage, site photos, and timeline placeholders.", icon: ClipboardList },
  scans: { title: "Contractor Scan to Earn", description: "QR scan history with reward status, project mapping, dealer, location, and risk score.", icon: ScanLine },
  purchases: { title: "Contractor Purchase History", description: "Invoice uploads, product purchases, verification status, and dealer purchase history.", icon: FileBarChart },
  invoices: { title: "Contractor Purchase History", description: "Invoice uploads, purchase verification, and static history records.", icon: FileBarChart },
  wallet: { title: "Contractor Wallet", description: "Points earned, redeemed, cashback, available balance, pending payout, tier, and leaderboard rank.", icon: WalletCards },
  rewards: { title: "Contractor Rewards", description: "Reward claims, cashback, catalog redemptions, referral bonuses, and approval status.", icon: Award },
  training: { title: "Contractor Training", description: "Training course catalog, skill categories, completion status, score, and progress cards.", icon: GraduationCap },
  certificates: { title: "Contractor Certificates", description: "Certificate IDs, issue dates, expiry dates, contractor mapping, and status.", icon: ShieldCheck },
  referrals: { title: "Contractor Referrals", description: "Referral leads, product interest, project mapping, conversion status, and reward status.", icon: Users },
  "nearby-dealers": { title: "Nearby Dealers", description: "Dealer locator cards with distance, available products, rating, and current status.", icon: MapPin },
  warranty: { title: "Contractor Warranty", description: "Warranty registrations and claim assistance linked to contractor projects and products.", icon: ShieldCheck },
  support: { title: "Contractor Support", description: "Contractor support tickets, priorities, ticket status, and escalation-ready placeholders.", icon: Ticket },
  analytics: { title: "Contractor Analytics", description: "Project performance, product usage, scan performance, wallet earnings, reward redemption, training progress, and referral performance.", icon: Bot },
  documents: { title: "Contractor Documents", description: "KYC, ID proof, certificates, license, bank documents, and project photos.", icon: FileBarChart },
  audit: { title: "Contractor Audit", description: "Profile updates, KYC changes, projects, scans, wallet, rewards, training, and support timeline.", icon: Bot },
};

const resolveMode = (mode: ContractorMode): ContractorMode => {
  if (mode === "invoices") return "purchases";
  return mode;
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: ContractorMode }) => {
  const normalized = resolveMode(mode);
  const current = meta[normalized] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={<div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Contractor Portal</p></div>}
      end={<><Link to="/contractors/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus className="h-4 w-4" />Create</Link><SecondaryButton icon={Upload}>Import</SecondaryButton><SecondaryButton icon={Download}>Export</SecondaryButton><SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton></>}
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Pending Verification", "Verified", "Rewarded", "Open", "Completed", "Review"].map((value) => ({ label: value, value }))} />
    <Select label="Region" value="" onChange={() => undefined} placeholder="All regions" options={["West", "North", "South", "East"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Widget = ({ title, children }: { title: string; children: ReactNode }) => <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">{title}</h2><div className="mt-4 space-y-3">{children}</div></section>;
const CompactRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>{status ? <ContractorStatusBadge status={status} /> : null}</div></div>;

const Dashboard = () => (
  <Phase8ContractorDashboard />
);

const DetailsPage = () => {
  const { id } = useParams();
  const contractor = contractors.find((item) => item.id === id) || contractors[0];
  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "overflow-hidden p-4")}>
        <ContractorProfileTabs contractor={contractor} />
      </section>
    </div>
  );
};

const ProjectForm = () => (
  <ReusableFormLayout title="Contractor Project" description="Static project registration form with product usage and site timeline placeholders." columns={3}>
    {["Project Name", "Project Type", "Customer Name", "Site Location", "City", "State", "Estimated Value", "Products Used", "QR Codes Scanned", "Dealer", "Contractor", "Start Date", "End Date"].map((label) => <TextInput key={label} label={label} defaultValue={label === "Contractor" ? contractors[0].contractorName : ""} />)}
    <Select label="Status" value="" onChange={() => undefined} placeholder="Select status" options={["Planned", "Active", "Completed", "On Hold", "Cancelled"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const WalletRewards = ({ mode }: { mode: ContractorMode }) => (
  <div className="space-y-4">
    {mode === "wallet" ? <Phase8ContractorWalletCard /> : <ContractorRewardsPanel />}
  </div>
);

const Learning = ({ mode }: { mode: ContractorMode }) => (
  <div className="space-y-4">
    {mode === "training" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{trainingCourses.map((course) => <Phase8TrainingCourseCard key={course.id} course={course} />)}</div> : null}
    {mode === "certificates" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{certificates.map((certificate) => <Phase8CertificateCard key={certificate.id} certificate={certificate} />)}</div> : null}
    {mode === "training" ? <ContractorTrainingTable rows={trainingCourses} /> : <ContractorCertificateTable rows={certificates} />}
  </div>
);

const Analytics = () => (
  <div className="space-y-4">
    <Phase8ContractorAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["Project Performance", "Product Usage", "Scan Performance", "Wallet Earnings", "Reward Redemption", "Training Progress", "Referral Performance", "Risk Signals"].map((label) => <div key={label} className={cn(panelBase, "p-4")}><FileBarChart className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{label}</p><p className="mt-1 text-xs leading-5 text-slate-500">Static analytics tile ready for future data.</p></div>)}</section>
    <Widget title="AI Contractor Insights">{contractorInsights.map((insight) => <ContractorAIInsightCard key={insight} insight={insight} />)}</Widget>
  </div>
);

const TableContent = ({ mode, query }: { mode: ContractorMode; query: string }) => {
  const normalized = resolveMode(mode);
  const filteredContractors = useFilteredRows(contractors, query);
  const filteredProjects = useFilteredRows(contractorProjects, query);
  const filteredScans = useFilteredRows(contractorScans, query);
  const filteredPurchases = useFilteredRows(contractorPurchases, query);
  const filteredReferrals = useFilteredRows(referrals, query);
  const filteredWarranties = useFilteredRows(contractorWarranties, query);
  const filteredSupport = useFilteredRows(contractorSupportTickets, query);
  if (normalized === "list") return <Phase8ContractorTable rows={filteredContractors} />;
  if (normalized === "projects") return <ContractorProjectTable rows={filteredProjects} />;
  if (normalized === "scans") return <ContractorScanTable rows={filteredScans} />;
  if (normalized === "purchases") return <ContractorPurchaseTable rows={filteredPurchases} />;
  if (normalized === "referrals") return <ReferralTable rows={filteredReferrals} />;
  if (normalized === "warranty") return <ContractorWarrantyTable rows={filteredWarranties} />;
  if (normalized === "support") return <ContractorSupportTable rows={filteredSupport} />;
  return <EmptyState title="Contractor workspace ready" description="Static frontend records will appear here for this contractor workflow." />;
};

const ContractorOperations = ({ mode = "dashboard" }: { mode?: ContractorMode }) => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const normalized = resolveMode(mode);
  const contractor = contractors.find((item) => item.id === id) || contractors[0];
  const tableModes: ContractorMode[] = ["list", "projects", "scans", "purchases", "referrals", "warranty", "support"];
  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {normalized === "dashboard" ? <Dashboard /> : null}
      {normalized === "create" || normalized === "edit" ? <ContractorForm record={normalized === "edit" ? contractor : undefined} /> : null}
      {normalized === "details" || normalized === "project-details" ? <DetailsPage /> : null}
      {normalized === "project-create" ? <ProjectForm /> : null}
      {normalized === "wallet" || normalized === "rewards" ? <WalletRewards mode={normalized} /> : null}
      {normalized === "training" || normalized === "certificates" ? <Learning mode={normalized} /> : null}
      {normalized === "projects" ? <Phase8ContractorProjectTable /> : null}
      {normalized === "scans" ? <Phase8ContractorScanTable /> : null}
      {normalized === "purchases" ? <Phase8ContractorPurchaseTable /> : null}
      {normalized === "referrals" ? <Phase8ReferralTable /> : null}
      {normalized === "warranty" ? <Phase8ContractorWarrantyTable /> : null}
      {normalized === "support" ? <Phase8ContractorSupportTable /> : null}
      {normalized === "documents" ? <ContractorDocuments /> : null}
      {normalized === "audit" ? <ContractorAudit /> : null}
      {normalized === "nearby-dealers" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{nearbyDealers.map((dealer) => <Phase8NearbyDealerCard key={dealer.id} dealer={dealer} />)}</div> : null}
      {normalized === "analytics" ? <Analytics /> : null}
      {normalized === "list" ? <><ContractorDirectoryFilters query={query} setQuery={setQuery} /><TableContent mode={normalized} query={query} /><Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${meta[normalized]?.title || "Contractor Portal"}`} /></> : null}
    </div>
  );
};

export default ContractorOperations;
