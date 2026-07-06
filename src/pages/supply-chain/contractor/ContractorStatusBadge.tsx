import { cn } from "../../../Components/enterprise/utils";

const tones: Record<string, string> = {
  Active: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  "Pending Verification": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "On Hold": "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Inactive: "border-slate-600 bg-slate-800 text-slate-300",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  ActiveProject: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Planned: "border-blue-400/30 bg-blue-400/10 text-blue-200",
  Pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Rewarded: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Review: "border-orange-400/30 bg-orange-400/10 text-orange-200",
  High: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Valid: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  "Expiring Soon": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Open: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "In Progress": "border-blue-400/30 bg-blue-400/10 text-blue-200",
  Registered: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "Claim Open": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Closed: "border-slate-600 bg-slate-800 text-slate-300",
};

export const ContractorStatusBadge = ({ status }: { status: string }) => {
  const toneKey = status === "Active" ? "Active" : status === "Active Project" ? "ActiveProject" : status;
  return <span className={cn("inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold", tones[toneKey] || "border-slate-700 bg-slate-900 text-slate-300")}>{status}</span>;
};
