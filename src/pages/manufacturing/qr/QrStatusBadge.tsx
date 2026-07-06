import { cn } from "../../../Components/enterprise/utils";

const styles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Claimed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Valid: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Generated: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Unused: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Draft: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Paused: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "Parser Warning": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Medium: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  High: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Critical: "border-rose-500/30 bg-rose-500/10 text-rose-100",
  Disabled: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Voided: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Expired: "border-slate-700 bg-slate-800 text-slate-300",
  Archived: "border-slate-700 bg-slate-800 text-slate-300",
};

export const QrStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex rounded-md border px-2 py-1 text-xs font-semibold", styles[status] || "border-slate-700 bg-slate-900 text-slate-300")}>
    {status}
  </span>
);
