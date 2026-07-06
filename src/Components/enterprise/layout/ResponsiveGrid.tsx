import type { ReactNode } from "react";
import { cn } from "../utils";

type ResponsiveGridProps = {
  children: ReactNode;
  minColumnWidth?: string;
  gap?: "sm" | "md" | "lg";
  className?: string;
};

const gaps = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export const ResponsiveGrid = ({ children, minColumnWidth = "240px", gap = "md", className }: ResponsiveGridProps) => (
  <div className={cn("grid", gaps[gap], className)} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))` }}>
    {children}
  </div>
);
