import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../utils";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Modal = ({ open, title, description, children, footer, onClose, size = "md" }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className={cn("w-full rounded-lg border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40", sizes[size])}>
        <div className="flex items-start gap-4 border-b border-slate-800 p-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-white">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer ? <div className="border-t border-slate-800 p-4">{footer}</div> : null}
      </div>
    </div>
  );
};
