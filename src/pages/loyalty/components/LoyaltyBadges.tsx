import { cn } from "../../../Components/enterprise/utils";

const tones: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Posted: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Fulfilled: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Paid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Scheduled: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Hold: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-300",
  Leading: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Rising: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Stable: "border-slate-600 bg-slate-800 text-slate-300",
};

export const RedemptionStatusBadge = ({ status }: { status: string }) => <StatusBadge status={status} />;
export const PayoutStatusBadge = ({ status }: { status: string }) => <StatusBadge status={status} />;
export const WalletOwnerBadge = ({ ownerType }: { ownerType: string }) => <span className="inline-flex h-7 items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 text-xs font-semibold text-cyan-200">{ownerType}</span>;

export const StatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold", tones[status] || tones.Draft)}>{status}</span>
);
