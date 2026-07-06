const tones: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Logged: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Operational: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Trial: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Open: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Planned: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Watch: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Blocked: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Suspended: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const PlatformStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);
