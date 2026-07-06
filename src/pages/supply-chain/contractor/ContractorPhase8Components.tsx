import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Award, BadgeCheck, Banknote, Download, Eye, FileText, GraduationCap, Hammer, MapPin, ScanLine, ShieldCheck, Upload, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdvancedFilters, Badge, ChartCard, DashboardWidget, EnterpriseDataTable, KPIGrid, SearchInput, Select, Tabs, Timeline } from "../../../Components/enterprise";
import type { DataTableColumn, TimelineItem } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { certificates } from "../../../data/contractor/certificateDemoData";
import { contractorAnalyticsData, contractorAuditTimelineData, contractorDashboardData, contractorDocumentsData, contractorWalletTransactions } from "../../../data/contractor/contractorAdminDemoData";
import type { ContractorRecord } from "../../../data/contractor/contractorDemoData";
import { contractorProjects } from "../../../data/contractor/contractorProjectDemoData";
import { contractorPurchases } from "../../../data/contractor/contractorPurchaseDemoData";
import { contractorRewards } from "../../../data/contractor/contractorRewardDemoData";
import { contractorScans } from "../../../data/contractor/contractorScanDemoData";
import { contractorSupportTickets, contractorWarranties } from "../../../data/contractor/contractorSupportDemoData";
import { contractorWalletSummary } from "../../../data/contractor/contractorWalletDemoData";
import { nearbyDealers } from "../../../data/contractor/nearbyDealerDemoData";
import { referrals } from "../../../data/contractor/referralDemoData";
import { trainingCourses } from "../../../data/contractor/trainingDemoData";
import { ContractorStatusBadge } from "./ContractorStatusBadge";

const tooltipStyle = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

const ChartShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <ChartCard title={title} description={description} framed={false} minHeight="280px" contentClassName="h-[280px]">{children}</ChartCard>
);

const MiniRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>{status ? <ContractorStatusBadge status={status} /> : null}</div></div>
);

const MiniMetric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><Icon className="h-4 w-4 text-cyan-300" /><p className="mt-2 text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-white">{value}</p></div>
);

export const ContractorKycBadge = ({ status }: { status: string }) => <ContractorStatusBadge status={status} />;
export const ContractorTierBadge = ({ tier }: { tier: string }) => <Badge tone={tier === "Platinum" ? "info" : tier === "Gold" ? "warning" : "default"}>{tier}</Badge>;

export const ContractorRankingCard = ({ rank, name, scans, status }: { rank: string; name: string; scans: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><Badge tone="info">{rank}</Badge><h3 className="mt-3 text-sm font-semibold text-white">{name}</h3><p className="mt-1 text-xs text-slate-500">{scans}</p></div><Hammer className="h-5 w-5 text-cyan-300" /></div><div className="mt-4"><ContractorStatusBadge status={status} /></div></article>
);

export const ContractorAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartShell title="Contractor Growth" description="Contractor acquisition and scan-to-earn adoption."><ResponsiveContainer width="100%" height="100%"><AreaChart data={contractorAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Area dataKey="growth" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} /><Area dataKey="scans" stroke="#34d399" fill="#34d39922" strokeWidth={2} /></AreaChart></ResponsiveContainer></ChartShell>
    <ChartShell title="Reward Trend" description="Reward points and wallet earnings trend."><ResponsiveContainer width="100%" height="100%"><ComposedChart data={contractorAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Bar dataKey="rewards" fill="#f59e0b" radius={[6, 6, 0, 0]} /><Line type="monotone" dataKey="wallet" stroke="#22d3ee" strokeWidth={2} /></ComposedChart></ResponsiveContainer></ChartShell>
    <ChartShell title="Project Registration Trend" description="Project performance and product usage."><ResponsiveContainer width="100%" height="100%"><BarChart data={contractorAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Bar dataKey="projects" fill="#22d3ee" radius={[6, 6, 0, 0]} /><Bar dataKey="products" fill="#a78bfa" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></ChartShell>
    <ChartShell title="Training and Referral Conversion" description="Training completion and referral conversion signals."><ResponsiveContainer width="100%" height="100%"><ComposedChart data={contractorAnalyticsData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...tooltipStyle} /><Bar dataKey="training" fill="#34d399" radius={[6, 6, 0, 0]} /><Line type="monotone" dataKey="referrals" stroke="#f472b6" strokeWidth={2} /></ComposedChart></ResponsiveContainer></ChartShell>
  </section>
);

export const ContractorDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={contractorDashboardData.kpis} />
    <ContractorAnalyticsCharts />
    <section className="grid gap-4 md:grid-cols-3">{contractorDashboardData.topContractors.map((item) => <ContractorRankingCard key={item.id} rank={item.rank} name={item.name} scans={item.scans} status={item.status} />)}</section>
    <section className="grid gap-4 xl:grid-cols-5">
      <DashboardWidget title="Recent Contractors" subtitle="Recently updated contractor profiles.">{contractorDashboardData.recentContractors.map((item) => <MiniRow key={item.id} title={item.name} detail={item.city} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Pending KYC" subtitle="Verification queue.">{contractorDashboardData.recentContractors.filter((item) => item.status !== "Active").map((item) => <MiniRow key={item.id} title={item.name} detail="KYC review required" status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Project Uploads" subtitle="Project registrations and site photos.">{contractorProjects.slice(0, 3).map((item) => <MiniRow key={item.id} title={item.projectName} detail={`${item.contractor} / ${item.estimatedValue}`} status={item.status} />)}</DashboardWidget>
      <DashboardWidget title="Recent Scans" subtitle="Scan-to-earn activity.">{contractorScans.slice(0, 3).map((item) => <MiniRow key={item.id} title={item.qrCode} detail={`${item.product} / ${item.project}`} status={item.rewardStatus} />)}</DashboardWidget>
      <DashboardWidget title="AI Contractor Insights" subtitle="Static contractor intelligence.">{contractorDashboardData.aiInsights.map((item) => <MiniRow key={item.id} title={item.title} detail={item.detail} status={item.status} />)}</DashboardWidget>
    </section>
  </div>
);

export const ContractorDirectoryFilters = ({ query, setQuery }: { query: string; setQuery: (value: string) => void }) => (
  <AdvancedFilters title="Contractor directory filters" activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder="Search contractor, code, type, dealer, city, mobile, tier" />
    <Select label="Saved Filter" value="" onChange={() => undefined} placeholder="All contractors" options={["Top Scanners", "Pending KYC", "Training Complete", "Referral Leaders"].map((value) => ({ label: value, value }))} />
    <Select label="Type" value="" onChange={() => undefined} placeholder="All types" options={["Painter", "Interior Designer", "Mason", "Installer"].map((value) => ({ label: value, value }))} />
    <Select label="KYC" value="" onChange={() => undefined} placeholder="All KYC" options={["Verified", "Pending", "Review"].map((value) => ({ label: value, value }))} />
    <Select label="Tier" value="" onChange={() => undefined} placeholder="All tiers" options={["Platinum", "Gold", "Silver"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

export const ContractorTable = ({ rows }: { rows: ContractorRecord[] }) => {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const columns: DataTableColumn<ContractorRecord>[] = [
    { id: "photo", header: "Contractor Photo", cell: (row) => <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-200">{row.contractorName.slice(0, 2).toUpperCase()}</div> },
    { id: "name", header: "Contractor Name", cell: (row) => <Link to={`/contractors/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.contractorName}</Link>, sortable: true },
    { id: "code", header: "Contractor Code", accessor: "contractorCode", sortable: true },
    { id: "type", header: "Type", accessor: "contractorType" },
    { id: "dealer", header: "Dealer", accessor: "assignedDealer" },
    { id: "city", header: "City", accessor: "city" },
    { id: "state", header: "State", accessor: "state" },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "kyc", header: "KYC Status", cell: (row) => <ContractorKycBadge status={row.kycStatus} /> },
    { id: "tier", header: "Tier", cell: (row) => <ContractorTierBadge tier={row.tierStatus} /> },
    { id: "wallet", header: "Wallet", accessor: "walletBalance", align: "right" },
    { id: "rewards", header: "Reward Points", accessor: () => "18,200", align: "right" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
    { id: "activity", header: "Last Activity", accessor: () => "Today 12:18" },
  ];
  return <EnterpriseDataTable title="Contractor Directory" description="Manufacturer-side contractor directory with KYC, tier, scan-to-earn, wallet and dealer mapping signals." rows={rows} columns={columns} enableSelection selectedRowIds={selected} onSelectedRowIdsChange={setSelected} showExportPlaceholder showImportPlaceholder bulkActions={[{ id: "export", label: "Bulk Export", icon: Download, onClick: () => undefined }, { id: "import", label: "Bulk Import", icon: Upload, onClick: () => undefined }, { id: "dealer", label: "Assign Dealer", onClick: () => undefined }, { id: "status", label: "Status Change", onClick: () => undefined }]} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/contractors/${row.id}`; } }]} />;
};

export const ContractorProfileCard = ({ contractor }: { contractor: ContractorRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <DashboardWidget title="Contractor Profile" subtitle="Profile, specialization, dealer mapping, projects, scans, wallet, rewards, training and certificates.">
      <div className="grid gap-3 md:grid-cols-3">{[["Profile", `${contractor.contractorType} / ${contractor.mobile}`], ["Specialization", contractor.specialization], ["Dealer Mapping", `${contractor.assignedDealer} / ${contractor.assignedDistributor}`], ["Projects", contractor.projectsRegistered], ["Scans", contractor.monthlyScans], ["Wallet", contractor.walletBalance], ["Rewards", "18,200 pts"], ["Training", "3 courses"], ["Certificates", "2 valid"]].map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-sm font-semibold text-slate-200">{value}</p></div>)}</div>
    </DashboardWidget>
    <aside className={cn(panelBase, "p-4")}><Hammer className="h-8 w-8 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold text-white">{contractor.contractorName}</h3><p className="mt-1 text-sm text-slate-500">{contractor.contractorCode} / {contractor.city}</p><div className="mt-4 flex flex-wrap gap-2"><ContractorStatusBadge status={contractor.status} /><ContractorKycBadge status={contractor.kycStatus} /><ContractorTierBadge tier={contractor.tierStatus} /></div><div className="mt-4 grid grid-cols-2 gap-3"><MiniMetric icon={ScanLine} label="Scans" value={contractor.monthlyScans} /><MiniMetric icon={WalletCards} label="Wallet" value={contractor.walletBalance} /></div></aside>
  </section>
);

export const ContractorProjectTable = () => <EnterpriseDataTable title="Contractor Projects" description="Project list, details, product usage, QR scans, site photos and project timeline." rows={contractorProjects} columns={[{ id: "projectName", header: "Project", accessor: "projectName" }, { id: "productsUsed", header: "Product Usage", accessor: "productsUsed" }, { id: "qrCodesScanned", header: "QR Scans", accessor: "qrCodesScanned", align: "right" }, { id: "sitePhotos", header: "Site Photos", accessor: () => "8 photos" }, { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> }]} showExportPlaceholder />;
export const ContractorScanTable = () => <EnterpriseDataTable title="Scan-to-Earn History" description="Scan history, product verification, reward eligibility, duplicate alerts, risk score and timeline." rows={contractorScans} columns={[{ id: "qrCode", header: "QR Code", accessor: "qrCode" }, { id: "product", header: "Product Verification", accessor: "product" }, { id: "rewardStatus", header: "Reward Eligibility", cell: (row) => <ContractorStatusBadge status={row.rewardStatus} /> }, { id: "duplicate", header: "Duplicate Alerts", accessor: () => "None" }, { id: "riskScore", header: "Risk Score", cell: (row) => <ContractorStatusBadge status={row.riskScore} /> }, { id: "scanDate", header: "Scan Timeline", accessor: "scanDate" }]} showExportPlaceholder />;
export const ContractorPurchaseTable = () => <EnterpriseDataTable title="Purchase History" description="Invoice uploads, receipt OCR placeholder, purchase verification, dealer mapping and product usage." rows={contractorPurchases} columns={[{ id: "invoice", header: "Invoice Uploads", accessor: "invoice" }, { id: "ocr", header: "Receipt OCR", accessor: () => "OCR placeholder" }, { id: "verificationStatus", header: "Purchase Verification", cell: (row) => <ContractorStatusBadge status={row.verificationStatus} /> }, { id: "dealer", header: "Dealer Mapping", accessor: "dealer" }, { id: "product", header: "Product Usage", accessor: "product" }]} showExportPlaceholder />;

export const ContractorWalletCard = () => <div className="space-y-4"><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">{[["Wallet Balance", contractorWalletSummary.availableBalance, WalletCards], ["Reward Points", contractorWalletSummary.pointsEarned, Award], ["Cashback", contractorWalletSummary.cashbackEarned, Banknote], ["Pending Payout", contractorWalletSummary.pendingPayout, WalletCards], ["Redemptions", contractorWalletSummary.pointsRedeemed, Award], ["Tier Progress", contractorWalletSummary.tierStatus, BadgeCheck], ["Leaderboard Rank", contractorWalletSummary.leaderboardRank, Award]].map(([label, value, Icon]) => <div key={String(label)} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{String(label)}</p><p className="mt-2 text-lg font-semibold text-white">{String(value)}</p></div>)}</section><EnterpriseDataTable title="Transactions" rows={contractorWalletTransactions} columns={[{ id: "reference", header: "Reference", accessor: "reference" }, { id: "source", header: "Source", accessor: "source" }, { id: "points", header: "Points", accessor: "points", align: "right" }, { id: "cashback", header: "Cashback", accessor: "cashback", align: "right" }, { id: "payout", header: "Payout", cell: (row) => <ContractorStatusBadge status={row.payout} /> }]} /></div>;
export const ContractorRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><Award className="h-5 w-5 text-amber-300" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div><ContractorStatusBadge status={status} /></div></article>;
export const ContractorRewardsPanel = () => <section className="grid gap-4 md:grid-cols-3">{contractorRewards.map((reward) => <ContractorRewardCard key={reward.id} title={reward.reward} detail={`${reward.points} points / ${reward.type}`} status={reward.status} />)}</section>;

export const TrainingCourseCard = ({ course }: { course: (typeof trainingCourses)[number] }) => <article className={cn(panelBase, "p-4")}><GraduationCap className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{course.courseName}</p><p className="mt-1 text-xs text-slate-500">{course.skillCategory} / {course.duration}</p><p className="mt-3 text-xs text-slate-500">Quiz placeholder / score {course.score}</p><div className="mt-3"><ContractorStatusBadge status={course.completionStatus} /></div></article>;
export const CertificateCard = ({ certificate }: { certificate: (typeof certificates)[number] }) => <article className={cn(panelBase, "p-4")}><ShieldCheck className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{certificate.certificateId}</p><p className="mt-1 text-xs text-slate-500">{certificate.courseName}</p><p className="mt-3 text-xs text-slate-500">Validity until {certificate.expiryDate}</p><div className="mt-3"><ContractorStatusBadge status={certificate.status} /></div></article>;

export const ReferralTable = () => <EnterpriseDataTable title="Referrals" description="Referral dashboard, list, rewards and conversion." rows={referrals} columns={[{ id: "referralName", header: "Referral", accessor: "referralName" }, { id: "status", header: "Conversion", cell: (row) => <ContractorStatusBadge status={row.status} /> }, { id: "rewardStatus", header: "Referral Rewards", cell: (row) => <ContractorStatusBadge status={row.rewardStatus} /> }]} showExportPlaceholder />;
export const NearbyDealerCard = ({ dealer }: { dealer: (typeof nearbyDealers)[number] }) => <article className={cn(panelBase, "p-4")}><MapPin className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{dealer.dealerName}</p><p className="mt-1 text-xs text-slate-500">{dealer.address}</p><p className="mt-3 text-xs text-slate-500">{dealer.availableProducts}</p><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-500">{dealer.distance}</span><ContractorStatusBadge status={dealer.status} /></div></article>;
export const ContractorWarrantyTable = () => <EnterpriseDataTable title="Warranty and Support" description="Warranty assistance, tickets, product support and ticket timeline." rows={contractorWarranties} columns={[{ id: "claimNumber", header: "Warranty Assistance", accessor: "claimNumber" }, { id: "product", header: "Product Support", accessor: "product" }, { id: "project", header: "Project", accessor: "project" }, { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> }]} showExportPlaceholder />;
export const ContractorSupportTable = () => <EnterpriseDataTable title="Support Tickets" description="Tickets, product support and ticket timeline." rows={contractorSupportTickets} columns={[{ id: "ticketNumber", header: "Ticket", accessor: "ticketNumber" }, { id: "category", header: "Product Support", accessor: "category" }, { id: "priority", header: "Priority", cell: (row) => <ContractorStatusBadge status={row.priority} /> }, { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> }]} showExportPlaceholder />;
export const ContractorDocuments = () => <EnterpriseDataTable title="Contractor Documents" description="KYC, ID proof, certificates, license, bank documents and project photos." rows={contractorDocumentsData} columns={[{ id: "document", header: "Document", cell: (row) => <span className="inline-flex items-center gap-2 font-semibold text-white"><FileText className="h-4 w-4 text-cyan-300" />{row.document}</span> }, { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> }, { id: "updated", header: "Updated", accessor: "updated" }]} showImportPlaceholder showExportPlaceholder />;
export const ContractorAudit = () => <DashboardWidget title="Contractor Audit" subtitle="Profile updates, KYC changes, projects, scans, wallet, rewards, training and support."><Timeline items={contractorAuditTimelineData as TimelineItem[]} /></DashboardWidget>;

export const ContractorProfileTabs = ({ contractor }: { contractor: ContractorRecord }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return <Tabs value={activeTab} onChange={setActiveTab} tabs={[
    { id: "overview", label: "Overview", content: <ContractorProfileCard contractor={contractor} /> },
    { id: "projects", label: "Projects", content: <ContractorProjectTable /> },
    { id: "scans", label: "Scans", content: <ContractorScanTable /> },
    { id: "purchases", label: "Purchases", content: <ContractorPurchaseTable /> },
    { id: "wallet", label: "Wallet", content: <ContractorWalletCard /> },
    { id: "rewards", label: "Rewards", content: <ContractorRewardsPanel /> },
    { id: "training", label: "Training", content: <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{trainingCourses.map((course) => <TrainingCourseCard key={course.id} course={course} />)}</section> },
    { id: "certificates", label: "Certificates", content: <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{certificates.map((certificate) => <CertificateCard key={certificate.id} certificate={certificate} />)}</section> },
    { id: "referrals", label: "Referrals", content: <ReferralTable /> },
    { id: "nearby", label: "Nearby Dealers", content: <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{nearbyDealers.map((dealer) => <NearbyDealerCard key={dealer.id} dealer={dealer} />)}</section> },
    { id: "warranty", label: "Warranty", content: <ContractorWarrantyTable /> },
    { id: "support", label: "Support", content: <ContractorSupportTable /> },
    { id: "analytics", label: "Analytics", content: <ContractorAnalyticsCharts /> },
    { id: "documents", label: "Documents", content: <ContractorDocuments /> },
    { id: "audit", label: "Audit", content: <ContractorAudit /> },
  ]} />;
};
