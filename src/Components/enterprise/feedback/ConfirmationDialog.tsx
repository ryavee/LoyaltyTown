import type { ReactNode } from "react";
import { AlertCircle, X } from "lucide-react";
import { buttonBase, buttonVariants, cn } from "../utils";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  tone?: "default" | "danger";
};

export const ConfirmationDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  tone = "default",
}: ConfirmationDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-3 border-b border-slate-800 p-4">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", tone === "danger" ? "bg-rose-400/10 text-rose-200" : "bg-cyan-400/10 text-cyan-200")}>
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-white">{title}</h2>
            {description ? <div className="mt-1 text-sm leading-6 text-slate-400">{description}</div> : null}
          </div>
          <button type="button" onClick={onCancel} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <button type="button" onClick={onCancel} className={cn(buttonBase, buttonVariants.secondary)}>
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={cn(buttonBase, tone === "danger" ? buttonVariants.danger : buttonVariants.primary)}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
