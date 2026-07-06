import type { ReactNode } from "react";
import { BarChart3 } from "lucide-react";
import { cn, panelBase } from "../utils";

type ChartCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  framed?: boolean;
  minHeight?: string;
};

export const ChartCard = ({ title, description, children, className, contentClassName, framed = true, minHeight = "280px" }: ChartCardProps) => (
  <section className={cn(panelBase, "p-4", className)}>
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        <BarChart3 className="h-4 w-4" />
      </div>
    </div>
    <div
      className={cn(
        "flex items-center justify-center rounded-lg",
        framed ? "border border-dashed border-slate-800 bg-slate-900/40" : "bg-transparent",
        contentClassName,
      )}
      style={{ minHeight }}
    >
      {children ?? <span className="text-sm text-slate-500">Chart placeholder</span>}
    </div>
  </section>
);
