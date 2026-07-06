import type { ReactNode } from "react";
import { cn } from "../utils";

type PopoverProps = {
  open: boolean;
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
};

export const Popover = ({ open, trigger, children, align = "left", className }: PopoverProps) => (
  <div className="relative inline-flex">
    {trigger}
    {open ? (
      <div className={cn("absolute top-full z-40 mt-2 min-w-64 rounded-lg border border-slate-800 bg-slate-950 p-3 shadow-xl shadow-black/30", align === "right" ? "right-0" : "left-0", className)}>
        {children}
      </div>
    ) : null}
  </div>
);
