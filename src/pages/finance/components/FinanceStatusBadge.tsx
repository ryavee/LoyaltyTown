const toneMap: Record<string, string> = {
  Paid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Booked: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Partial: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Processing: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Draft: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Trial: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "Renewal Due": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Overdue: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const FinanceStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);
