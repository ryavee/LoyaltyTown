import { Bot, Boxes, Gift, LayoutTemplate, MousePointer2, Network, Palette, Send, Sparkles, Trophy, Workflow } from "lucide-react";
import { Stepper } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { automationNodes, customerSegments, formTypes, landingBlocks } from "../../../data/marketing/marketingAssetDemoData";
import { campaignTypes, campaignWizardSteps } from "../../../data/marketing/campaignDemoData";

const Tile = ({ icon: Icon, title, detail }: { icon: typeof Boxes; title: string; detail: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <Icon className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm font-semibold text-white">{title}</p>
    <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
  </div>
);

export const CampaignWizard = () => (
  <section className={cn(panelBase, "p-4")}>
    <h2 className="text-sm font-semibold text-white">Campaign Builder Wizard</h2>
    <div className="mt-4"><Stepper steps={campaignWizardSteps.map((title, index) => ({ id: title, title, status: index === 0 ? "current" : "upcoming" }))} /></div>
    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{campaignTypes.map((type) => <Tile key={type} icon={Sparkles} title={type} detail="Selectable campaign type placeholder." />)}</div>
  </section>
);

export const RewardBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><Gift className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Reward Rules</h2></div><div className="mt-4 grid gap-3 md:grid-cols-3">{["Points", "Cashback", "Coupon", "Gift Voucher", "Scratch Card", "Tier Bonus"].map((item) => <Tile key={item} icon={Gift} title={item} detail="Reward rule configuration placeholder." />)}</div></section>
);

export const LandingPageBuilder = () => (
  <section className="grid gap-4 xl:grid-cols-[320px_1fr]">
    <aside className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Components</h2><div className="mt-4 space-y-2">{landingBlocks.map((block) => <button key={block} className="flex w-full items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-left text-sm font-semibold text-slate-200"><MousePointer2 className="h-4 w-4 text-cyan-300" />{block}</button>)}</div></aside>
    <div className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><LayoutTemplate className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Drag and Drop Placeholder</h2></div><div className="mt-4 grid gap-3 rounded-lg border border-dashed border-cyan-400/30 bg-cyan-400/5 p-4 md:grid-cols-2"><Tile icon={Palette} title="Hero Area" detail="Logo, hero copy, banner, and product image." /><Tile icon={LayoutTemplate} title="Conversion Form" detail="Registration, OTP toggle, FAQ, terms, privacy, and app links." /></div></div>
  </section>
);

export const AutomationBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><Workflow className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Automation Workflow Builder</h2></div><div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">{automationNodes.map((node, index) => <div key={node} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">{index + 1}</span><p className="mt-3 text-sm font-semibold text-white">{node}</p><p className="mt-1 text-xs text-slate-500">Workflow node placeholder.</p></div>)}</div></section>
);

export const SegmentBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><Network className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Segment Builder</h2></div><div className="mt-4 grid gap-3 md:grid-cols-4">{customerSegments.map((segment) => <Tile key={segment} icon={Network} title={segment} detail="Segment filter and rules placeholder." />)}</div></section>
);

export const SurveyBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Survey and Form Builder</h2></div><div className="mt-4 grid gap-3 md:grid-cols-4">{formTypes.map((form) => <Tile key={form} icon={Trophy} title={form} detail="Dynamic form builder placeholder." />)}</div></section>
);

export const TemplateCards = ({ type }: { type: "Email" | "WhatsApp" | "Push" | "SMS" }) => (
  <section className="grid gap-4 md:grid-cols-3">{["Welcome", "Reward Reminder", "Warranty Nudge"].map((template) => <article key={template} className={cn(panelBase, "p-4")}><Send className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{type} {template}</p><p className="mt-1 text-xs leading-5 text-slate-500">Brandable template card ready for channel configuration.</p></article>)}</section>
);

export const AiMarketingSuggestions = ({ suggestions }: { suggestions: string[] }) => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><Bot className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">AI Marketing Suggestions</h2></div><div className="mt-4 space-y-3">{suggestions.map((suggestion) => <div key={suggestion} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{suggestion}</div>)}</div></section>
);
