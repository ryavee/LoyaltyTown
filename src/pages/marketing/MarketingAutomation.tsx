import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BadgePercent,
  Bell,
  FileText,
  Gift,
  LayoutTemplate,
  Mail,
  Megaphone,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  Target,
  UsersRound,
  Wand2,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { EmptyState, PageToolbar } from "../../Components/enterprise";
import {
  CampaignDetails,
  CampaignTable,
  CampaignWizard,
  ChannelCenter,
  GenericRecordTable,
  LandingPageBuilder,
  MarketingAnalyticsOverview,
  MarketingDashboard,
  MarketingFilterBar,
  MarketingPagination,
  MarketingToolbarActions,
  PromotionMechanics,
  SegmentBuilder,
  SurveyFeedbackCenter,
  getFilteredCampaigns,
} from "./MarketingPhase9Components";
import {
  campaignDemoData,
  segmentDemoData,
} from "../../data/marketing/marketingAdminDemoData";

type MarketingMode =
  | "dashboard"
  | "campaign-builder"
  | "campaign-create"
  | "campaign-details"
  | "campaign-edit"
  | "coupons"
  | "scratch-cards"
  | "spin-wheel"
  | "referral"
  | "referrals"
  | "landing-pages"
  | "forms"
  | "whatsapp"
  | "sms"
  | "email"
  | "push"
  | "automation"
  | "segments"
  | "surveys"
  | "feedback"
  | "analytics"
  | "reports";

const meta: Record<MarketingMode, { title: string; description: string; icon: typeof Megaphone }> = {
  dashboard: { title: "Marketing Dashboard", description: "Executive marketing command center for campaigns, ROI, QR activations, reward claims, and channel performance.", icon: Megaphone },
  "campaign-builder": { title: "Campaign Directory", description: "Campaign registry with enterprise table, advanced filters, saved filter placeholders, bulk actions, import, and export.", icon: Target },
  "campaign-create": { title: "Create Campaign", description: "Eight-step campaign builder covering campaign information, products, audience, rewards, landing page, automation, preview, and publish.", icon: Wand2 },
  "campaign-details": { title: "Campaign Details", description: "Full campaign workspace with participants, products, rewards, landing page, analytics, automation, timeline, documents, and audit.", icon: Megaphone },
  "campaign-edit": { title: "Edit Campaign", description: "Update campaign configuration, audience, rewards, landing page, automation, preview, and schedule placeholders.", icon: Wand2 },
  coupons: { title: "Coupons", description: "Coupon dashboard, coupon list, and coupon analytics for scan and channel campaigns.", icon: BadgePercent },
  "scratch-cards": { title: "Scratch Cards", description: "Scratch dashboard, reward pool, winner analytics, and static reward configuration placeholders.", icon: Sparkles },
  "spin-wheel": { title: "Spin Wheel", description: "Spin configuration, reward probability, and spin analytics placeholders.", icon: Gift },
  referral: { title: "Referral Program", description: "Referral campaign workspace for bonuses, milestone rewards, and conversion analytics.", icon: UsersRound },
  referrals: { title: "Referral Program", description: "Referral campaign workspace for bonuses, milestone rewards, and conversion analytics.", icon: UsersRound },
  "landing-pages": { title: "Landing Page Studio", description: "Drag and drop placeholder, live preview, component library, branding, form builder, and theme selector.", icon: LayoutTemplate },
  forms: { title: "Forms", description: "Registration, lead, warranty, survey, feedback, and dynamic form builder placeholders.", icon: FileText },
  whatsapp: { title: "WhatsApp Marketing", description: "Templates, campaigns, delivery reports, open rates, and click rates.", icon: MessageCircle },
  sms: { title: "SMS Marketing", description: "Templates, campaigns, delivery reports, and click tracking placeholders.", icon: Send },
  email: { title: "Email Marketing", description: "Templates, campaigns, delivery reports, open rates, and click rates.", icon: Mail },
  push: { title: "Push Marketing", description: "Templates, campaigns, delivery reports, opens, clicks, and app notification placeholders.", icon: Bell },
  automation: { title: "Marketing Automation", description: "Automation builder placeholder for channel sends, wallet credit, and warranty activation steps.", icon: Wand2 },
  segments: { title: "Customer Segments", description: "Dynamic segments, saved segments, segment builder, and audience preview.", icon: UsersRound },
  surveys: { title: "Surveys", description: "Survey builder, NPS, CSAT, response dashboards, and reports.", icon: FileText },
  feedback: { title: "Feedback", description: "Feedback dashboard, NPS, CSAT, response list, and reports.", icon: FileText },
  analytics: { title: "Marketing Analytics", description: "Campaign ROI, registrations, reward distribution, referral performance, coupon usage, landing conversion, email, and WhatsApp performance.", icon: BadgePercent },
  reports: { title: "Marketing Reports", description: "Marketing reports placeholder across campaigns, channels, rewards, and conversions.", icon: BadgePercent },
};

const normalizeMode = (mode: MarketingMode): MarketingMode => {
  if (mode === "referrals") return "referral";
  if (mode === "reports") return "analytics";
  if (mode === "forms") return "landing-pages";
  if (mode === "automation") return "campaign-create";
  return mode;
};

const Header = ({ mode }: { mode: MarketingMode }) => {
  const current = meta[mode] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Enterprise Campaign Builder</p>
        </div>
      }
      end={
        <>
          <Link to="/campaigns/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Link>
          <MarketingToolbarActions />
        </>
      }
    />
  );
};

const CampaignDirectory = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const rows = useMemo(() => getFilteredCampaigns(query), [query]);

  return (
    <div className="space-y-4">
      <MarketingFilterBar query={query} onQueryChange={setQuery} />
      <CampaignTable rows={rows} selected={selected} onSelectedChange={setSelected} />
      <MarketingPagination />
    </div>
  );
};

const ReferralWorkspace = () => (
  <div className="space-y-4">
    <div className="grid gap-3 md:grid-cols-3">
      {["Referral Bonus", "Milestone Rewards", "Referral Conversion Analytics"].map((item) => (
        <div key={item} className="rounded-md border border-slate-800 bg-slate-900/70 p-4">
          <UsersRound className="h-5 w-5 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">{item}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">Static referral program placeholder for future backend integration.</p>
        </div>
      ))}
    </div>
    <GenericRecordTable title="Referral Segments" rows={segmentDemoData} />
  </div>
);

const MarketingAutomation = ({ mode = "dashboard" }: { mode?: MarketingMode }) => {
  const normalized = normalizeMode(mode);
  const { id } = useParams();
  const campaign = campaignDemoData.find((item) => item.id === id) || campaignDemoData[0];

  const content = () => {
    if (normalized === "dashboard") return <MarketingDashboard />;
    if (normalized === "campaign-builder") return <CampaignDirectory />;
    if (normalized === "campaign-create" || normalized === "campaign-edit") return <CampaignWizard />;
    if (normalized === "campaign-details") return <CampaignDetails campaign={campaign} />;
    if (normalized === "landing-pages") return <LandingPageBuilder />;
    if (normalized === "coupons" || normalized === "scratch-cards" || normalized === "spin-wheel") return <PromotionMechanics type={normalized} />;
    if (normalized === "email" || normalized === "sms" || normalized === "whatsapp" || normalized === "push") return <ChannelCenter channel={normalized} />;
    if (normalized === "segments") return <SegmentBuilder />;
    if (normalized === "surveys" || normalized === "feedback") return <SurveyFeedbackCenter mode={normalized} />;
    if (normalized === "analytics") return <MarketingAnalyticsOverview />;
    if (normalized === "referral") return <ReferralWorkspace />;
    return <EmptyState title="Marketing workspace ready" description="Static marketing records will appear here for this workflow." />;
  };

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {content()}
    </div>
  );
};

export default MarketingAutomation;
