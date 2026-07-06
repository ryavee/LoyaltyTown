const toneMap: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Enabled: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Valid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Trial: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Invited: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Beta: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Suspended: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Disabled: "border-slate-600 bg-slate-800 text-slate-300",
};

export const WhiteLabelStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);
