import { Award, BadgeCheck, Gift, QrCode, ShieldCheck, ShoppingBag, Ticket, UserRound, WalletCards } from "lucide-react";
import { Timeline } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { CustomerRecord } from "../../../data/customer/customerDemoData";
import { customerWalletSummary } from "../../../data/customer/customerWalletDemoData";
import { CustomerStatusBadge } from "./CustomerStatusBadge";

export const CustomerProfileCard = ({ customer }: { customer: CustomerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Customer Profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["Customer ID", customer.customerId], ["Mobile", customer.mobile], ["Email", customer.email], ["Gender", customer.gender], ["DOB", customer.dob], ["City", customer.city], ["Occupation", customer.occupation], ["Language", customer.preferredLanguage], ["Channel", customer.preferredChannel], ["Source", customer.registrationSource], ["KYC", customer.kycStatus], ["Tier", customer.customerTier],
        ].map(([label, value]) => <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-sm font-medium text-slate-200">{value}</p></div>)}
      </div>
    </div>
    <aside className={cn(panelBase, "p-4")}><UserRound className="h-8 w-8 text-cyan-300" /><h3 className="mt-4 text-lg font-semibold text-white">{customer.firstName} {customer.lastName}</h3><p className="mt-1 text-sm text-slate-500">{customer.customerId} / {customer.city}</p><div className="mt-4 flex flex-wrap gap-2"><CustomerStatusBadge status={customer.status} /><CustomerStatusBadge status={customer.kycStatus} /></div><div className="mt-4 space-y-3 text-sm"><p className="text-slate-500">Lifetime Value <strong className="block text-white">{customer.lifetimeValue}</strong></p><p className="text-slate-500">Wallet <strong className="block text-white">{customer.walletBalance}</strong></p><p className="text-slate-500">Warranty <strong className="block text-white">{customer.warrantyRegistrations} registrations</strong></p></div></aside>
  </section>
);

export const CustomerWalletCard = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">{[
    ["Points Earned", customerWalletSummary.pointsEarned, WalletCards], ["Points Redeemed", customerWalletSummary.pointsRedeemed, Award], ["Cashback Earned", customerWalletSummary.cashbackEarned, Gift], ["Available Balance", customerWalletSummary.availableBalance, WalletCards], ["Pending Rewards", customerWalletSummary.pendingRewards, Award], ["Expired Points", customerWalletSummary.expiredPoints, ShieldCheck],
  ].map(([label, value, Icon]) => <div key={label as string} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-xl font-semibold text-white">{value as string}</p></div>)}</section>
);

export const Customer360Cards = ({ customer }: { customer: CustomerRecord }) => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{[
    ["Lifetime Value", customer.lifetimeValue, ShoppingBag], ["Wallet", customer.walletBalance, WalletCards], ["Rewards", customer.rewardsEarned, Award], ["Products Purchased", "28", ShoppingBag], ["Projects", "4", BadgeCheck], ["Scans", "386", QrCode], ["Warranty", customer.warrantyRegistrations, ShieldCheck], ["Campaign Participation", "14", Gift], ["Support Tickets", "3", Ticket], ["AI Recommendation", "Warranty reminder", UserRound],
  ].map(([label, value, Icon]) => <div key={label as string} className={cn(panelBase, "p-4")}><Icon className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-2 text-lg font-semibold text-white">{value as string}</p></div>)}</section>
);

export const CustomerRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><CustomerStatusBadge status={status} /></div></article>
);

export const CustomerTimeline = () => (
  <Timeline items={[
    { id: "ctl-1", title: "QR activation completed", description: "Product scan verified and wallet credited.", timestamp: "Today", icon: QrCode, tone: "success" },
    { id: "ctl-2", title: "Warranty registered", description: "Registered product warranty from purchase history.", timestamp: "Yesterday", icon: ShieldCheck, tone: "info" },
    { id: "ctl-3", title: "Reward redeemed", description: "Gift voucher redeemed from customer rewards.", timestamp: "Jul 03, 2026", icon: Award, tone: "info" },
  ]} />
);

export const CustomerAIInsightCard = ({ insight }: { insight: string }) => <div className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>;
