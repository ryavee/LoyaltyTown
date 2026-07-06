import type { ReactNode } from "react";
import { cn, panelBase } from "../utils";

type ActionBarProps = {
  selectedCount?: number;
  children: ReactNode;
  className?: string;
};

export const ActionBar = ({ selectedCount = 0, children, className }: ActionBarProps) => (
  <div className={cn(panelBase, "flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between", className)}>
    <p className="text-sm font-medium text-slate-300">
      {selectedCount > 0 ? `${selectedCount} selected` : "No records selected"}
    </p>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);
