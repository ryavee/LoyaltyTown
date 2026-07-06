import { BadgePercent, CreditCard, Store, WalletCards } from "lucide-react";
import { Timeline } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { DistributorRecord } from "../../../data/distributor/distributorDemoData";
import { collectionTimeline } from "../../../data/distributor/distributorPaymentDemoData";
import type { DistributorSchemeRecord } from "../../../data/distributor/distributorSchemeDemoData";
import { distributorWalletSummary } from "../../../data/distributor/distributorSchemeDemoData";
import { DistributorStatusBadge } from "./DistributorStatusBadge";

export const DistributorProfileCard = ({ distributor }: { distributor: DistributorRecord }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Distributor Profile</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["Company", distributor.companyName],
          ["GST Number", distributor.gstNumber],
          ["PAN Number", distributor.panNumber],
          ["Contact Person", distributor.contactPerson],
          ["Mobile", distributor.mobile],
          ["Email", distributor.email],
          ["Territory", distributor.territory],
          ["Sales Executive", distributor.assignedSalesExecutive],
          ["Credit Limit", distributor.creditLimit],
          ["Payment Terms", distributor.paymentTerms],
          ["Bank Details", distributor.bankDetails],
          ["Address", `${distributor.city}, ${distributor.state}`],
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
      <h3 className="mt-4 text-lg font-semibold text-white">{distributor.distributorName}</h3>
      <p className="mt-1 text-sm text-slate-500">{distributor.distributorCode} / {distributor.territory}</p>
      <div className="mt-4"><DistributorStatusBadge status={distributor.status} /></div>
      <div className="mt-4 space-y-3 text-sm">
        <p className="text-slate-500">Monthly Revenue <strong className="block text-white">{distributor.monthlyRevenue}</strong></p>
        <p className="text-slate-500">Outstanding <strong className="block text-white">{distributor.outstandingAmount}</strong></p>
        <p className="text-slate-500">Wallet <strong className="block text-white">{distributor.walletBalance}</strong></p>
      </div>
    </aside>
  </section>
);

export const DistributorWalletCard = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
    {[
      ["Points Earned", distributorWalletSummary.pointsEarned, WalletCards],
      ["Points Redeemed", distributorWalletSummary.pointsRedeemed, BadgePercent],
      ["Cashback Earned", distributorWalletSummary.cashbackEarned, CreditCard],
      ["Available Balance", distributorWalletSummary.availableBalance, WalletCards],
      ["Pending Payout", distributorWalletSummary.pendingPayout, CreditCard],
    ].map(([label, value, Icon]) => (
      <div key={label as string} className={cn(panelBase, "p-4")}>
        <Icon className="h-5 w-5 text-cyan-300" />
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
        <p className="mt-2 text-xl font-semibold text-white">{value as string}</p>
      </div>
    ))}
  </section>
);

export const SchemeProgressCard = ({ scheme }: { scheme: DistributorSchemeRecord }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">{scheme.schemeName}</p>
        <p className="mt-1 text-xs text-slate-500">{scheme.distributor} / earning {scheme.earning}</p>
      </div>
      <DistributorStatusBadge status={scheme.status} />
    </div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-cyan-400" style={{ width: `${scheme.progress}%` }} />
    </div>
    <p className="mt-2 text-xs text-slate-500">{scheme.achievement} of {scheme.target}</p>
  </article>
);

export const CollectionTimeline = () => (
  <Timeline items={collectionTimeline.map((item) => ({ ...item, icon: CreditCard, tone: "info" }))} />
);
