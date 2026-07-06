const toneMap: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Resolved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Published: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Open: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Registered: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Assigned: "border-blue-400/30 bg-blue-400/10 text-blue-200",
  Inspection: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "Renewal Due": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Expired: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Rejected: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Closed: "border-slate-600 bg-slate-800 text-slate-300",
};

type StatusBadgeProps = {
  status: string;
};

export const ServiceStatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[status] || "border-slate-700 bg-slate-900 text-slate-300"}`}>
    {status}
  </span>
);

export const WarrantyStatusBadge = ServiceStatusBadge;
