const statusTones: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Monitor: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  High: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const FraudStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusTones[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);

export const RiskScoreBadge = ({ score }: { score: number | string }) => {
  const numeric = Number(score);
  const tone = numeric >= 85 ? statusTones.High : numeric >= 65 ? statusTones.Review : statusTones.Ready;
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>{score}</span>;
};
