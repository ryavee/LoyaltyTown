import { Filter, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { buttonBase, buttonVariants, cn, panelBase } from "../utils";

type AdvancedFiltersProps = {
  children: ReactNode;
  title?: string;
  activeCount?: number;
  onReset?: () => void;
  className?: string;
};

export const AdvancedFilters = ({
  children,
  title = "Advanced filters",
  activeCount = 0,
  onReset,
  className,
}: AdvancedFiltersProps) => (
  <section className={cn(panelBase, "p-4", className)}>
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
          <Filter className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-500">{activeCount} active filters</p>
        </div>
      </div>
      {onReset ? (
        <button type="button" onClick={onReset} className={cn(buttonBase, buttonVariants.ghost)}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      ) : null}
    </div>
    <div className="grid gap-4 lg:grid-cols-3">{children}</div>
  </section>
);
