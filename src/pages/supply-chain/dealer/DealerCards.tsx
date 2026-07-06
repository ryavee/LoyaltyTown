import { Award, CreditCard, Store, WalletCards } from "lucide-react";
import { Timeline } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { DealerRecord } from "../../../data/dealer/dealerDemoData";
import { dealerWalletSummary } from "../../../data/dealer/dealerWalletDemoData";
import { DealerStatusBadge } from "./DealerStatusBadge";

export const DealerProfileCard = ({ dealer }: { dealer: DealerRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Dealer Profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["Company", dealer.companyName],
          ["GST Number", dealer.gstNumber],
          ["PAN Number", dealer.panNumber],
          ["Contact Person", dealer.contactPerson],
          ["Mobile", dealer.mobile],
          ["Email", dealer.email],
          ["Territory", dealer.territory],
          ["Distributor", dealer.assignedDistributor],
          ["Sales Executive", dealer.assignedSalesExecutive],
          ["Credit Limit", dealer.creditLimit],
          ["Payment Terms", dealer.paymentTerms],
          ["Bank Details", dealer.bankDetails],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-slate-200">{value}</p>
          </div>
        ))}
      </div>
    </div>
    <aside className={cn(panelBase, "p-4")}>
      <Store className="h-8 w-8 text-cyan-300" />
      <h3 className="mt-4 text-lg font-semibold text-white">{dealer.dealerName}</h3>
      <p className="mt-1 text-sm text-slate-500">{dealer.dealerCode} / {dealer.territory}</p>
      <div className="mt-4"><DealerStatusBadge status={dealer.status} /></div>
      <div className="mt-4 space-y-3 text-sm">
        <p className="text-slate-500">Monthly Sales <strong className="block text-white">{dealer.monthlySales}</strong></p>
        <p className="text-slate-500">Wallet <strong className="block text-white">{dealer.walletBalance}</strong></p>
        <p className="text-slate-500">Target <strong className="block text-white">{dealer.targetAchievement}</strong></p>
      </div>
    </aside>
  </section>
);

export const DealerWalletCard = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
    {[
      ["Points Earned", dealerWalletSummary.pointsEarned, WalletCards],
      ["Points Redeemed", dealerWalletSummary.pointsRedeemed, Award],
      ["Cashback Earned", dealerWalletSummary.cashbackEarned, CreditCard],
      ["Available Balance", dealerWalletSummary.availableBalance, WalletCards],
      ["Pending Payout", dealerWalletSummary.pendingPayout, CreditCard],
      ["Tier Status", dealerWalletSummary.tierStatus, Award],
      ["Leaderboard Rank", dealerWalletSummary.leaderboardRank, Award],
    ].map(([label, value, Icon]) => (
      <div key={label as string} className={cn(panelBase, "p-4")}>
        <Icon className="h-5 w-5 text-cyan-300" />
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
        <p className="mt-2 text-xl font-semibold text-white">{value as string}</p>
      </div>
    ))}
  </section>
);

export const DealerRewardCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </div>
      <DealerStatusBadge status={status} />
    </div>
  </article>
);

export const DealerTimeline = () => (
  <Timeline items={[
    { id: "dt-1", title: "Dealer profile updated", description: "Credit limit and payment terms reviewed.", timestamp: "Today", icon: Store, tone: "info" },
    { id: "dt-2", title: "Order submitted", description: "Dealer order entered for distributor approval.", timestamp: "Yesterday", icon: CreditCard, tone: "info" },
    { id: "dt-3", title: "Warranty assisted", description: "Customer warranty registered through dealer desk.", timestamp: "Jul 04, 2026", icon: Award, tone: "success" },
  ]} />
);

export const DealerAIInsightCard = ({ insight }: { insight: string }) => (
  <div className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>
);
