import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn, panelBase } from "../utils";

type DashboardWidgetProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const DashboardWidget = ({ title, subtitle, actions, children, className }: DashboardWidgetProps) => (
  <section className={cn(panelBase, "overflow-hidden", className)}>
    <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-4 py-3">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {actions ?? (
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-white" aria-label="Widget actions">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="p-4">{children}</div>
  </section>
);
