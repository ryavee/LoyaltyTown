import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "ghost" | "danger";
};

export const IconButton = ({ icon: Icon, label, variant = "default", className, type = "button", ...props }: IconButtonProps) => (
  <button
    type={type}
    aria-label={label}
    title={label}
    className={cn(
      "inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:pointer-events-none disabled:opacity-50",
      variant === "default" && "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white",
      variant === "ghost" && "border-transparent text-slate-400 hover:bg-slate-800 hover:text-white",
      variant === "danger" && "border-rose-400/20 bg-rose-400/10 text-rose-200 hover:bg-rose-400/20",
      className,
    )}
    {...props}
  >
    <Icon className="h-4 w-4" />
  </button>
);
