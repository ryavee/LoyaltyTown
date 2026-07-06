import { Loader2 } from "lucide-react";
import { cn } from "../utils";

type LoadingSpinnerProps = {
  label?: string;
  className?: string;
};

export const LoadingSpinner = ({ label = "Loading", className }: LoadingSpinnerProps) => (
  <span className={cn("inline-flex items-center gap-2 text-sm font-medium text-slate-300", className)}>
    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
    {label}
  </span>
);
