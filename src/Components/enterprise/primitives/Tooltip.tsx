import type { ReactNode } from "react";
import { cn } from "../utils";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Tooltip = ({ content, children, className }: TooltipProps) => (
  <span className="group relative inline-flex">
    {children}
    <span className={cn("pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-200 shadow-xl group-hover:block", className)}>
      {content}
    </span>
  </span>
);
