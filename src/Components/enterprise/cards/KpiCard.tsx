import type { LucideIcon } from "lucide-react";
import { cn, panelBase, toneClasses } from "../utils";
import type { EnterpriseTone } from "../types";

type KpiCardProps = {
  label: string;
  value: string | number;
  target?: string;
  progress?: number;
  icon?: LucideIcon;
  tone?: EnterpriseTone;
  className?: string;
};

export const KpiCard = ({ label, value, target, progress = 0, icon: Icon, tone = "info", className }: KpiCardProps) => (
  <div className={cn(panelBase, "p-4", className)}>
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      </div>
      {Icon ? (
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg border", toneClasses[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
    </div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
    </div>
    {target ? <p className="mt-2 text-xs text-slate-500">{target}</p> : null}
  </div>
);
