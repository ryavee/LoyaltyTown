import { AlertTriangle, RefreshCw } from "lucide-react";
import { buttonBase, buttonVariants, cn } from "../utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
};

export const ErrorState = ({
  title = "Something went wrong",
  description = "The module could not render this section.",
  retryLabel = "Retry",
  onRetry,
  className,
}: ErrorStateProps) => (
  <div className={cn("rounded-lg border border-rose-400/20 bg-rose-400/10 p-6 text-center", className)}>
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-rose-400/10 text-rose-200">
      <AlertTriangle className="h-5 w-5" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-rose-100/80">{description}</p>
    {onRetry ? (
      <button type="button" onClick={onRetry} className={cn(buttonBase, buttonVariants.secondary, "mt-5")}>
        <RefreshCw className="h-4 w-4" />
        {retryLabel}
      </button>
    ) : null}
  </div>
);
