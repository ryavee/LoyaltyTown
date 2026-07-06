import { cn } from "../../../Components/enterprise/utils";

const styles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Delivered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Engaged: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Earned: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Submitted: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Packed: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Dispatched: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Redeemed: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Proposal: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Pending: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "Pending Approval": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "Follow Up": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Inspection: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Requested: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Claim: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "Low Stock": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Damaged: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  "Near Expiry": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  "At Risk": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  "On Hold": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Cancelled: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Rejected: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Replacement: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  "Credit Note": "border-violet-400/20 bg-violet-400/10 text-violet-200",
};

export const DealerStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex rounded-md border px-2 py-1 text-xs font-semibold", styles[status] || "border-slate-700 bg-slate-900 text-slate-300")}>{status}</span>
);
