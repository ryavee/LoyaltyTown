import { Award, Crown, Gift, HandCoins, ShieldAlert, Trophy, WalletCards } from "lucide-react";
import { PrimaryButton, ReusableFormLayout, SecondaryButton, Select, TextInput, Textarea } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { pointsRuleTypes } from "../../../data/loyalty/pointsRuleDemoData";
import { rewardTypes, type RewardCatalogRecord } from "../../../data/loyalty/rewardCatalogDemoData";
import type { TierRecord } from "../../../data/loyalty/tierDemoData";
import { StatusBadge } from "./LoyaltyBadges";

const Footer = () => <div className="flex flex-wrap justify-end gap-2"><SecondaryButton>Save Draft</SecondaryButton><PrimaryButton>Save</PrimaryButton></div>;
const Tile = ({ title, detail, icon: Icon }: { title: string; detail: string; icon: typeof Gift }) => <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div>;

export const PointsRuleBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><HandCoins className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Rule Builder</h2></div><div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-7">{pointsRuleTypes.map((type) => <Tile key={type} icon={HandCoins} title={type} detail="Static earn rule configuration placeholder." />)}</div></section>
);

export const RewardForm = ({ record }: { record?: RewardCatalogRecord }) => (
  <ReusableFormLayout title="Reward Configuration" description="Static reward catalog form for stock, eligibility, and redemption settings." columns={3} footer={<Footer />}>
    <TextInput label="Reward Name" defaultValue={record?.reward} />
    <Select label="Reward Type" value={record?.rewardType || ""} onChange={() => undefined} options={rewardTypes.map((value) => ({ label: value, value }))} />
    <TextInput label="Points" defaultValue={record?.points} />
    <TextInput label="Stock" defaultValue={record?.stock} />
    <TextInput label="Eligibility" defaultValue={record?.eligibility} />
    <TextInput label="Redemption Settings" defaultValue={record?.redemptionSettings} />
    <Select label="Status" value={record?.status || ""} onChange={() => undefined} options={["Live", "Review", "Draft"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

export const CashbackRuleBuilder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><WalletCards className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Cashback Rule Builder</h2></div><div className="mt-4 grid gap-3 md:grid-cols-4">{["Audience", "Cashback Value", "Cap", "Schedule", "Approval", "Reconciliation", "Failed Payouts", "Hold Rules"].map((item) => <Tile key={item} icon={WalletCards} title={item} detail="Cashback configuration placeholder, no payout gateway logic." />)}</div></section>
);

export const TierCard = ({ tier }: { tier: TierRecord }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><Crown className="h-6 w-6 text-cyan-300" /><StatusBadge status={tier.status} /></div><h3 className="mt-4 text-xl font-semibold text-white">{tier.tier}</h3><p className="mt-1 text-sm text-slate-500">{tier.threshold} threshold / {tier.members} members</p><p className="mt-3 text-sm text-slate-300">{tier.benefits}</p><TierProgress value={tier.progression} /></article>
);

export const TierProgress = ({ value }: { value: string }) => <div className="mt-4"><div className="flex items-center justify-between text-xs text-slate-500"><span>Progression</span><span>{value}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: value }} /></div></div>;

export const AchievementBadge = ({ item }: { item: { achievement: string; badge: string; members: string; reward: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}><Award className="h-7 w-7 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{item.achievement}</p><p className="mt-1 text-xs text-slate-500">{item.badge} / {item.reward}</p><div className="mt-4 flex items-center justify-between"><span className="text-xs text-slate-500">{item.members} members</span><StatusBadge status={item.status} /></div></article>
);

export const LoyaltySummaryCards = ({ insights }: { insights: string[] }) => (
  <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Loyalty Operations</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{["Transaction Ledger", "Manual Adjustment", "Pending Holds", "Payout Requests", "Approval Queue", "Fulfillment Tracking"].map((item) => <Tile key={item} icon={item.includes("Hold") ? ShieldAlert : Trophy} title={item} detail="Static operational surface ready for integration." />)}</div></div>
    <aside className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Loyalty Insights</h2><div className="mt-4 space-y-3">{insights.map((insight) => <div key={insight} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>)}</div></aside>
  </section>
);
