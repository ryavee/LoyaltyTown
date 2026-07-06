import { cn } from "../../../Components/enterprise/utils";

const statusStyles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Available: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Accepted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Posted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Delivered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Occupied: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Reserved: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Ready: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  "In Transit": "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  "Driver Assigned": "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  "Vehicle Assigned": "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  "High Utilization": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "Pending Verification": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Inspection: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Approval: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Requested: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Packing: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Picking: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  "POD Pending": "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Blocked: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Damaged: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  "Low Stock": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  "Out Of Stock": "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Rejected: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Scrap: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Maintenance: "border-slate-600 bg-slate-800 text-slate-200",
  Inactive: "border-slate-600 bg-slate-800 text-slate-300",
};

export const StockStatusBadge = ({ status }: { status: string }) => (
  <span className={cn("inline-flex rounded-md border px-2 py-1 text-xs font-semibold", statusStyles[status] || "border-slate-700 bg-slate-900 text-slate-300")}>
    {status}
  </span>
);
