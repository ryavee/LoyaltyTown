import { Rocket } from "lucide-react";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { PlatformStatusBadge } from "./PlatformStatusBadge";

export const DeploymentTimeline = ({ rows }: { rows: Record<string, unknown>[] }) => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Rocket className="h-4 w-4 text-cyan-300" />Deployment Timeline</h3>
    <div className="mt-4 space-y-4">
      {rows.map((row) => (
        <div key={String(row.id)} className="relative border-l border-slate-800 pl-4">
          <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-cyan-300" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-100">{String(row.release)}</p>
            <PlatformStatusBadge status={String(row.status)} />
          </div>
          <p className="mt-1 text-sm text-slate-400">{String(row.environment)} • {String(row.notes)}</p>
          <p className="mt-1 text-xs text-slate-500">{String(row.deployedBy)} • {String(row.time)}</p>
        </div>
      ))}
    </div>
  </section>
);
