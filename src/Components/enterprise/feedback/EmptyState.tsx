import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { buttonBase, buttonVariants, cn } from "../utils";
import { NoDataIllustration } from "./NoDataIllustration";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: ReactNode;
  className?: string;
};

export const EmptyState = ({
  title = "No data available",
  description = "Records will appear here when a data source is connected.",
  actionLabel,
  onAction,
  illustration,
  className,
}: EmptyStateProps) => (
  <div className={cn("rounded-lg border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center", className)}>
    {illustration ?? <NoDataIllustration />}
    <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>
    {actionLabel && onAction ? (
      <button type="button" onClick={onAction} className={cn(buttonBase, buttonVariants.primary, "mt-5")}>
        <Plus className="h-4 w-4" />
        {actionLabel}
      </button>
    ) : null}
  </div>
);
