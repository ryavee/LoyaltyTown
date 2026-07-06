import { cn } from "../../../Components/enterprise/utils";

const tones: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  New: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Inactive: "border-slate-600 bg-slate-800 text-slate-300",
  "At Risk": "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Verified: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Genuine: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Registered: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "Warranty Linked": "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Available: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Redeemed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Review: "border-orange-400/30 bg-orange-400/10 text-orange-200",
  "High Risk": "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Open: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Resolved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Escalated: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Converted: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Invited: "border-blue-400/30 bg-blue-400/10 text-blue-200",
  Qualified: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "Claim Open": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Closed: "border-slate-600 bg-slate-800 text-slate-300",
};

export const CustomerStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold", tones[status] || "border-slate-700 bg-slate-900 text-slate-300")}>{status}</span>
);
