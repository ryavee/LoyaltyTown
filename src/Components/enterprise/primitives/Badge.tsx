import type { ReactNode } from "react";
import type { EnterpriseTone } from "../types";
import { cn, toneClasses } from "../utils";

type BadgeProps = {
  children: ReactNode;
  tone?: EnterpriseTone;
  className?: string;
};

export const Badge = ({ children, tone = "default", className }: BadgeProps) => (
  <span className={cn("inline-flex h-6 items-center rounded-md border px-2 text-xs font-semibold", toneClasses[tone], className)}>
    {children}
  </span>
);
