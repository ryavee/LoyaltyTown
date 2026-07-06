import { cn, panelBase } from "../utils";

type LoadingSkeletonProps = {
  rows?: number;
  className?: string;
};

export const LoadingSkeleton = ({ rows = 4, className }: LoadingSkeletonProps) => (
  <div className={cn(panelBase, "space-y-4 p-4", className)}>
    <div className="h-5 w-48 animate-pulse rounded bg-slate-800" />
    <div className="grid gap-3 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-24 animate-pulse rounded-lg bg-slate-900" />
      ))}
    </div>
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-10 animate-pulse rounded-md bg-slate-900" />
      ))}
    </div>
  </div>
);
