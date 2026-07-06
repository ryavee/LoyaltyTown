import { RefreshCw } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { buttonBase, buttonVariants, cn } from "../utils";

type RefreshButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  refreshing?: boolean;
};

export const RefreshButton = ({ label = "Refresh", refreshing = false, className, ...props }: RefreshButtonProps) => (
  <button type="button" className={cn(buttonBase, buttonVariants.secondary, className)} {...props}>
    <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
    {label}
  </button>
);
