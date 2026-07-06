import { useMemo, useState } from "react";
import {
  Archive,
  BadgePercent,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  Gift,
  LayoutTemplate,
  Mail,
  MessageCircle,
  MousePointer2,
  Palette,
  Play,
  QrCode,
  RefreshCw,
  Send,
  Smartphone,
  Sparkles,
  Target,
  Upload,
  UsersRound,
  Wand2,
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
  Tabs,
} from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise/types";
import { cn, panelBase } from "../../Components/enterprise/utils";
import {
  analyticsDemoData,
  campaignChartData,
  campaignDemoData,
  channelDemoData,
  couponDemoData,
  landingPageDemoData,
  marketingDashboardData,
  scratchCardDemoData,
  segmentDemoData,
  spinWheelDemoData,
  surveyDemoData,
  type CampaignRow,
  type CampaignStatus,
} from "../../data/marketing/marketingAdminDemoData";
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

const statusTone: Record<string, string> = {
  Active: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Draft: "border-slate-600 bg-slate-800/70 text-slate-300",
  Scheduled: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Completed: "border-violet-400/25 bg-violet-400/10 text-violet-200",
  Paused: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  Archived: "border-rose-400/25 bg-rose-400/10 text-rose-200",
  Dynamic: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Saved: "border-violet-400/25 bg-violet-400/10 text-violet-200",
};

export const CampaignStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold", statusTone[status] || statusTone.Draft)}>
    {status}
  </span>
);

const PanelHeader = ({ title, description }: { title: string; description?: string }) => (
  <div>
    <h2 className="text-sm font-semibold text-white">{title}</h2>
    {description ? <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p> : null}
  </div>
);

const SmallCard = ({ icon: Icon, title, detail, metric }: { icon: typeof Target; title: string; detail: string; metric?: string }) => (
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

export const MarketingAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <PanelHeader title="Campaign Performance" description="Performance and ROI trend across active manufacturer campaigns." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={campaignChartData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Area dataKey="performance" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="roi" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <PanelHeader title="Registration and Rewards" description="Scan-led registrations, reward redemption, and QR activation funnel." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={campaignChartData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Line type="monotone" dataKey="registrations" stroke="#22d3ee" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="rewards" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="activations" stroke="#fb7185" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <PanelHeader title="Channel Performance" description="Email open, SMS delivery, WhatsApp delivery, and push engagement." />
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignChartData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...tooltip} />
            <Bar dataKey="email" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            <Bar dataKey="sms" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="whatsapp" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            <Bar dataKey="push" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <PanelHeader title="QR Activation Funnel" description="Campaign scan to registration to reward conversion path." />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {["QR Scan", "OTP Complete", "Registration", "Reward Claim"].map((step, index) => (
          <div key={step} className="rounded-md border border-slate-800 bg-slate-900/70 p-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Step {index + 1}</span>
            <p className="mt-2 text-sm font-semibold text-white">{step}</p>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${92 - index * 14}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MarketingDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={marketingDashboardData.kpis} />
    <MarketingAnalyticsCharts />
    <section className="grid gap-4 xl:grid-cols-4">
      <div className={cn(panelBase, "p-4")}>
        <PanelHeader title="Active Campaigns" description="Live programs requiring daily monitoring." />
        <div className="mt-4 space-y-3">{campaignDemoData.filter((item) => item.status === "Active").map((item) => <CampaignOverviewCard key={item.id} campaign={item} />)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <PanelHeader title="Upcoming Campaigns" description="Scheduled or draft campaigns." />
        <div className="mt-4 space-y-3">{campaignDemoData.filter((item) => item.status !== "Active").slice(0, 3).map((item) => <CampaignOverviewCard key={item.id} campaign={item} />)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <PanelHeader title="AI Marketing Insights" />
        <div className="mt-4 space-y-3">{marketingDashboardData.insights.slice(0, 3).map((item) => <div key={item} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{item}</div>)}</div>
      </div>
      <div className={cn(panelBase, "p-4")}>
        <PanelHeader title="Recommended Campaigns" />
        <div className="mt-4 space-y-3">{marketingDashboardData.recommendedCampaigns.map((item) => <SmallCard key={item.id} icon={Sparkles} title={item.title} detail={item.detail} metric={item.lift} />)}</div>
      </div>
    </section>
  </div>
);

export const CampaignOverviewCard = ({ campaign }: { campaign: CampaignRow }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">{campaign.campaignName}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{campaign.campaignType} / {campaign.targetAudience}</p>
      </div>
      <CampaignStatusBadge status={campaign.status} />
    </div>
    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
      <span>{campaign.participants} participants</span>
      <span>{campaign.roi} ROI</span>
    </div>
  </div>
);

export const CampaignTable = ({ rows, selected, onSelectedChange }: { rows: CampaignRow[]; selected: Array<string | number>; onSelectedChange: (ids: Array<string | number>) => void }) => {
  const columns: DataTableColumn<CampaignRow>[] = [
    { id: "campaignName", header: "Campaign Name", accessor: "campaignName", sortable: true },
    { id: "campaignType", header: "Campaign Type", accessor: "campaignType", sortable: true },
    { id: "products", header: "Products", accessor: "products" },
    { id: "startDate", header: "Start Date", accessor: "startDate", sortable: true },
    { id: "endDate", header: "End Date", accessor: "endDate" },
    { id: "targetAudience", header: "Target Audience", accessor: "targetAudience" },
    { id: "rewardType", header: "Reward Type", accessor: "rewardType" },
    { id: "participants", header: "Participants", accessor: "participants", align: "right", sortable: true },
    { id: "conversions", header: "Conversions", accessor: "conversions", align: "right" },
    { id: "roi", header: "ROI", accessor: "roi", align: "right", sortable: true },
    { id: "status", header: "Status", cell: (row) => <CampaignStatusBadge status={row.status} /> },
  ];
  return (
    <EnterpriseDataTable
      title="Campaign Directory"
      description="Searchable manufacturer campaign registry with bulk action placeholders."
      rows={rows}
      columns={columns}
      enableSelection
      selectedRowIds={selected}
      onSelectedRowIdsChange={onSelectedChange}
      showExportPlaceholder
      showImportPlaceholder
      bulkActions={[
        { id: "publish", label: "Publish", icon: Play, onClick: () => undefined },
        { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
        { id: "export", label: "Bulk Export", icon: Download, onClick: () => undefined },
      ]}
      actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/campaigns/${row.id}`; } }]}
    />
  );
};

export const CampaignWizard = () => {
  const steps = [
    "Campaign Information",
    "Products",
    "Target Audience",
    "Reward Rules",
    "Landing Page Builder",
    "Automation",
    "Preview",
    "Publish",
  ];
  const campaignTypes = ["QR Registration", "Cashback", "Loyalty", "Referral", "Warranty", "Dealer", "Retailer", "Contractor", "Product Launch", "Seasonal Offer", "Festival Offer"];
  return (
    <section className={cn(panelBase, "p-4")}>
      <PanelHeader title="Campaign Builder" description="Eight-step static wizard for product, audience, rewards, landing, automation, preview, and schedule." />
      <div className="mt-5">
        <Stepper steps={steps.map((title, index) => ({ id: title, title, status: index === 0 ? "current" : "upcoming" }))} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {campaignTypes.map((type) => <SmallCard key={type} icon={Wand2} title={type} detail="Selectable campaign type placeholder." />)}
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <RewardRuleBuilder />
        <AutomationBuilder />
        <div className={cn(panelBase, "border-slate-800 bg-slate-900/50 p-4")}>
          <PanelHeader title="Preview and Publish" description="Desktop, tablet, mobile preview with validation summary and publish scheduler." />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Desktop", "Tablet", "Mobile"].map((item) => <button key={item} className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300">{item}</button>)}
          </div>
          <button className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><CheckCircle2 className="h-4 w-4" />Schedule Publish</button>
        </div>
      </div>
    </section>
  );
};

export const RewardRuleBuilder = () => (
  <section className={cn(panelBase, "border-slate-800 bg-slate-900/50 p-4")}>
    <PanelHeader title="Reward Rule Builder" description="Points, cashback, coupon, gift, voucher, scratch, spin, referral, and milestone reward blocks." />
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      {["Points", "Cashback", "Coupon", "Gift", "Voucher", "Scratch Card", "Spin Wheel", "Referral Bonus", "Milestone"].map((item) => (
        <span key={item} className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300">{item}</span>
      ))}
    </div>
  </section>
);

export const AutomationBuilder = () => (
  <section className={cn(panelBase, "border-slate-800 bg-slate-900/50 p-4")}>
    <PanelHeader title="Automation Builder" description="Email, SMS, WhatsApp, push, wallet credit, and warranty activation placeholders." />
    <div className="mt-4 space-y-2">
      {["Trigger: QR Scan", "Condition: Target Segment", "Action: Send WhatsApp", "Action: Credit Wallet", "Action: Activate Warranty"].map((node, index) => (
        <div key={node} className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-950 p-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">{index + 1}</span>
          <span className="text-sm font-semibold text-slate-200">{node}</span>
        </div>
      ))}
    </div>
  </section>
);

export const LandingPageBuilder = () => (
  <section className="grid gap-4 xl:grid-cols-[320px_1fr_340px]">
    <aside className={cn(panelBase, "p-4")}>
      <PanelHeader title="Component Library" description="Drag and drop placeholder." />
      <div className="mt-4 space-y-2">
        {landingPageDemoData.blocks.map((block) => <button key={block} className="flex w-full items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-left text-sm font-semibold text-slate-200"><MousePointer2 className="h-4 w-4 text-cyan-300" />{block}</button>)}
      </div>
    </aside>
    <div className={cn(panelBase, "p-4")}>
      <PanelHeader title="Live Landing Page Preview" description="Brandable scan-to-register page canvas." />
      <div className="mt-4 rounded-lg border border-dashed border-cyan-400/30 bg-cyan-400/5 p-4">
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300"><QrCode className="h-4 w-4" />Verified Manufacturer Campaign</div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Register your product and claim rewards</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Hero banner, product image, OTP form, reward promise, FAQ, terms, privacy, and success screen preview.</p>
          <button className="mt-5 h-11 rounded-md bg-cyan-400 px-5 text-sm font-semibold text-slate-950">Start Registration</button>
        </div>
      </div>
    </div>
    <aside className={cn(panelBase, "p-4")}>
      <PanelHeader title="Branding and Theme" />
      <div className="mt-4 space-y-3">
        {landingPageDemoData.themes.map((theme) => <SmallCard key={theme} icon={Palette} title={theme} detail="Theme selector placeholder." />)}
      </div>
    </aside>
  </section>
);

export const SegmentBuilder = () => (
  <section className={cn(panelBase, "p-4")}>
    <PanelHeader title="Customer Segment Builder" description="Dynamic segments, saved segments, rules, and audience preview." />
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {segmentDemoData.map((segment) => <SmallCard key={segment.id} icon={UsersRound} title={segment.name} detail={`${segment.audience} / ${segment.rule}`} metric={segment.size} />)}
    </div>
  </section>
);

export const PromotionMechanics = ({ type }: { type: "coupons" | "scratch-cards" | "spin-wheel" }) => {
  const config = {
    coupons: { title: "Coupon Dashboard", rows: couponDemoData, icon: BadgePercent },
    "scratch-cards": { title: "Scratch Card Reward Pool", rows: scratchCardDemoData, icon: Sparkles },
    "spin-wheel": { title: "Spin Wheel Configuration", rows: spinWheelDemoData, icon: Gift },
  }[type];
  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {config.rows.map((row) => <SmallCard key={row.id} icon={config.icon} title={"name" in row ? row.name : row.id} detail={Object.entries(row).filter(([key]) => !["id", "name"].includes(key)).slice(0, 2).map(([, value]) => value).join(" / ")} metric={"status" in row ? row.status : undefined} />)}
      </div>
      <GenericRecordTable title={config.title} rows={config.rows} />
    </section>
  );
};

export const ChannelCenter = ({ channel }: { channel: "email" | "sms" | "whatsapp" | "push" }) => {
  const title = channel === "email" ? "Email" : channel === "sms" ? "SMS" : channel === "whatsapp" ? "WhatsApp" : "Push";
  const Icon = channel === "email" ? Mail : channel === "sms" ? Send : channel === "whatsapp" ? MessageCircle : Smartphone;
  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {["Templates", "Campaigns", "Delivery Reports", "Open and Click Rates"].map((item) => <SmallCard key={item} icon={Icon} title={`${title} ${item}`} detail="Static channel management placeholder." />)}
      </div>
      <GenericRecordTable title={`${title} Delivery Center`} rows={channelDemoData[channel]} />
    </section>
  );
};

export const SurveyFeedbackCenter = ({ mode }: { mode: "surveys" | "feedback" }) => (
  <section className="space-y-4">
    <div className="grid gap-3 md:grid-cols-4">
      {["Survey Builder", "NPS", "CSAT", "Feedback Dashboard"].map((item) => <SmallCard key={item} icon={ClipboardCheck} title={item} detail={`${mode === "surveys" ? "Survey" : "Feedback"} workspace placeholder.`} />)}
    </div>
    <GenericRecordTable title={mode === "surveys" ? "Survey Responses" : "Feedback Responses"} rows={surveyDemoData} />
  </section>
);

export const CampaignTimeline = () => (
  <section className={cn(panelBase, "p-4")}>
    <PanelHeader title="Campaign Timeline" description="Static publish, delivery, reward, and conversion history." />
    <div className="mt-4 space-y-3">
      {["Draft created", "Audience selected", "Landing page approved", "WhatsApp template validated", "Campaign scheduled", "Rewards credited"].map((item, index) => (
        <div key={item} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">{index + 1}</span>
          <div><p className="text-sm font-semibold text-white">{item}</p><p className="mt-1 text-xs text-slate-500">2026-07-{String(8 + index).padStart(2, "0")} / Marketing Ops</p></div>
        </div>
      ))}
    </div>
  </section>
);

export const CampaignAudit = () => (
  <section className={cn(panelBase, "p-4")}>
    <PanelHeader title="Campaign Audit" description="Permission, publish, reward, and template audit trail placeholder." />
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {["Reward rules updated", "Segment filter changed", "Landing page preview exported", "Publish approval completed"].map((item) => <SmallCard key={item} icon={FileText} title={item} detail="Audit event recorded for future backend integration." />)}
    </div>
  </section>
);

export const CampaignDetails = ({ campaign }: { campaign: CampaignRow }) => {
  const [tab, setTab] = useState("overview");
  const cards = [
    ["Campaign Type", campaign.campaignType],
    ["Products", campaign.products],
    ["Audience", campaign.targetAudience],
    ["Reward Type", campaign.rewardType],
    ["Participants", campaign.participants],
    ["Conversions", campaign.conversions],
    ["ROI", campaign.roi],
    ["Status", campaign.status],
  ];
  return (
    <section className={cn(panelBase, "p-4")}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div><h2 className="text-lg font-semibold text-white">{campaign.campaignName}</h2><p className="mt-1 text-sm text-slate-500">{campaign.startDate} to {campaign.endDate}</p></div>
        <CampaignStatusBadge status={campaign.status} />
      </div>
      <Tabs
        className="mt-4"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: "overview", label: "Overview", content: <div className="grid gap-3 md:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><div className="mt-2 text-sm font-semibold text-white">{label === "Status" ? <CampaignStatusBadge status={value as CampaignStatus} /> : value}</div></div>)}</div> },
          { id: "participants", label: "Participants", content: <EmptyState title="Participants ready" description="Participant table placeholder for backend integration." /> },
          { id: "products", label: "Products", content: <LandingPageBuilder /> },
          { id: "rewards", label: "Rewards", content: <RewardRuleBuilder /> },
          { id: "landing", label: "Landing Page", content: <LandingPageBuilder /> },
          { id: "analytics", label: "Analytics", content: <MarketingAnalyticsCharts /> },
          { id: "automation", label: "Automation", content: <AutomationBuilder /> },
          { id: "timeline", label: "Timeline", content: <CampaignTimeline /> },
          { id: "documents", label: "Documents", content: <EmptyState title="No campaign documents" description="Brand assets, approvals, and template documents will appear here." /> },
          { id: "audit", label: "Audit", content: <CampaignAudit /> },
        ]}
      />
    </section>
  );
};

export const MarketingAnalyticsOverview = () => (
  <div className="space-y-4">
    <div className="grid gap-3 md:grid-cols-4">{analyticsDemoData.map((item) => <SmallCard key={item.id} icon={item.icon} title={item.label} detail={item.detail} metric={item.value} />)}</div>
    <MarketingAnalyticsCharts />
  </div>
);

export const GenericRecordTable = <T extends { id?: string | number } & Record<string, unknown>>({ title, rows }: { title: string; rows: T[] }) => {
  const columns = useMemo<DataTableColumn<T>[]>(() => Object.keys(rows[0] || {}).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    accessor: key,
    cell: key === "status" ? (row) => <CampaignStatusBadge status={String(row[key])} /> : undefined,
  })), [rows]);
  return <EnterpriseDataTable title={title} rows={rows} columns={columns} showExportPlaceholder />;
};

export const MarketingFilterBar = ({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) => (
  <AdvancedFilters title="Campaign filters" activeCount={0}>
    <SearchInput value={query} onChange={onQueryChange} placeholder="Search campaigns, products, audience, rewards" />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Draft", "Scheduled", "Completed", "Paused"].map((value) => ({ label: value, value }))} />
    <Select label="Campaign Type" value="" onChange={() => undefined} placeholder="All campaign types" options={["QR Registration", "Cashback", "Loyalty", "Referral", "Warranty", "Dealer", "Retailer", "Contractor"].map((value) => ({ label: value, value }))} />
    <Select label="Saved Filter" value="" onChange={() => undefined} placeholder="Saved filters" options={["Live campaigns", "High ROI", "Drafts pending approval"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

export const MarketingPagination = () => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel="Static marketing records" />;
};

export const MarketingToolbarActions = () => (
  <div className="flex flex-wrap items-center gap-2">
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40"><Upload className="h-4 w-4" />Import</button>
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40"><Download className="h-4 w-4" />Export</button>
    <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40"><RefreshCw className="h-4 w-4" />Refresh</button>
  </div>
);

export const getFilteredCampaigns = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return campaignDemoData;
  return campaignDemoData.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
};
