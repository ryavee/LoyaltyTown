import { Award, CreditCard, ShoppingBag, WalletCards } from "lucide-react";
import { Timeline } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { RetailerRecord } from "../../../data/retailer/retailerDemoData";
import { retailerWalletSummary } from "../../../data/retailer/retailerWalletDemoData";
import { RetailerStatusBadge } from "./RetailerStatusBadge";

export const RetailerProfileCard = ({ retailer }: { retailer: RetailerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Retailer Profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["Store", retailer.storeName], ["GST Number", retailer.gstNumber], ["PAN Number", retailer.panNumber], ["Contact Person", retailer.contactPerson], ["Mobile", retailer.mobile], ["Email", retailer.email], ["Territory", retailer.territory], ["Dealer", retailer.assignedDealer], ["Distributor", retailer.assignedDistributor], ["Store Type", retailer.storeType], ["Business Category", retailer.businessCategory], ["Credit Limit", retailer.creditLimit],
        ].map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-sm font-medium text-slate-200">{value}</p></div>)}
      </div>
    </div>
    <aside className={cn(panelBase, "p-4")}><ShoppingBag className="h-8 w-8 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold text-white">{retailer.retailerName}</h3><p className="mt-1 text-sm text-slate-500">{retailer.retailerCode} / {retailer.territory}</p><div className="mt-4"><RetailerStatusBadge status={retailer.status} /></div><div className="mt-4 space-y-3 text-sm"><p className="text-slate-500">Monthly Sales <strong className="block text-white">{retailer.monthlySales}</strong></p><p className="text-slate-500">Wallet <strong className="block text-white">{retailer.walletBalance}</strong></p><p className="text-slate-500">Customers <strong className="block text-white">{retailer.customers}</strong></p></div></aside>
  </section>
);

export const RetailerWalletCard = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">{[
    ["Points Earned", retailerWalletSummary.pointsEarned, WalletCards], ["Points Redeemed", retailerWalletSummary.pointsRedeemed, Award], ["Cashback Earned", retailerWalletSummary.cashbackEarned, CreditCard], ["Available Balance", retailerWalletSummary.availableBalance, WalletCards], ["Pending Payout", retailerWalletSummary.pendingPayout, CreditCard], ["Tier Status", retailerWalletSummary.tierStatus, Award], ["Leaderboard Rank", retailerWalletSummary.leaderboardRank, Award],
  ].map(([label, value, Icon]) => <div key={label as string} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-xl font-semibold text-white">{value as string}</p></div>)}</section>
);

export const RetailerRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><RetailerStatusBadge status={status} /></div></article>
);

export const RetailerTimeline = () => (
  <Timeline items={[
    { id: "rt-1", title: "Product verified", description: "Retail scan verification completed.", timestamp: "Today", icon: ShoppingBag, tone: "success" },
    { id: "rt-2", title: "Warranty assisted", description: "Warranty registration assistance completed.", timestamp: "Yesterday", icon: Award, tone: "info" },
    { id: "rt-3", title: "Offer redeemed", description: "Local campaign offer redeemed by customer.", timestamp: "Jul 04, 2026", icon: CreditCard, tone: "info" },
  ]} />
);

export const RetailerAIInsightCard = ({ insight }: { insight: string }) => <div className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>;
