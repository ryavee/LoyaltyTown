const toneMap: Record<string, string> = {
  Ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Running: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Queued: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Watch: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Paused: "border-slate-600 bg-slate-800 text-slate-300",
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const ReportStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);
