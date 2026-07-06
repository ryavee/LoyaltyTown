import { Banknote, CreditCard, ReceiptText, TrendingUp } from "lucide-react";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { FinanceStatusBadge } from "./FinanceStatusBadge";

export const RevenueCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
      <TrendingUp className="h-5 w-5" />
    </div>
    <p className="mt-4 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);

export const SubscriptionCard = ({ plan }: { plan: { plan: string; price: string; tenants: number; features: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-white">{plan.plan}</h3>
        <p className="mt-1 text-sm text-cyan-200">{plan.price}</p>
      </div>
      <FinanceStatusBadge status={plan.status} />
    </div>
    <p className="mt-4 text-sm text-slate-400">{plan.features}</p>
    <div className="mt-4 rounded-md border border-slate-800 bg-slate-900/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Tenants</p>
      <p className="mt-1 text-xl font-semibold text-white">{plan.tenants}</p>
    </div>
  </article>
);

export const GSTSummaryCard = ({ item }: { item: { label: string; value: string; description: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <ReceiptText className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{item.label}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
  </article>
);

export const PaymentMethodCard = ({ method, value, description }: { method: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <CreditCard className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{method}</p>
    <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);

export const AccountingCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <Banknote className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);
