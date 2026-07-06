import { cn } from "../../../Components/enterprise/utils";

const tones: Record<string, string> = {
  Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Scheduled: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-300",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Completed: "border-violet-400/30 bg-violet-400/10 text-violet-200",
};

export const MarketingStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold", tones[status] || tones.Draft)}>{status}</span>
);
