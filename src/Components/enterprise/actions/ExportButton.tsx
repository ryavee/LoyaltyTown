import { Download } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { buttonBase, buttonVariants, cn } from "../utils";

type ExportButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export const ExportButton = ({ label = "Export", className, ...props }: ExportButtonProps) => (
  <button type="button" className={cn(buttonBase, buttonVariants.secondary, className)} {...props}>
    <Download className="h-4 w-4" />
    {label}
  </button>
);
