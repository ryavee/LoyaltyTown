import { Upload } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { buttonBase, buttonVariants, cn } from "../utils";

type ImportButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export const ImportButton = ({ label = "Import", className, ...props }: ImportButtonProps) => (
  <button type="button" className={cn(buttonBase, buttonVariants.secondary, className)} {...props}>
    <Upload className="h-4 w-4" />
    {label}
  </button>
);
