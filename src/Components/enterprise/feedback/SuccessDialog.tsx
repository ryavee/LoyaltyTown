import { CheckCircle2 } from "lucide-react";
import { buttonBase, buttonVariants, cn } from "../utils";

type SuccessDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onClose: () => void;
};

export const SuccessDialog = ({ open, title = "Success", description, actionLabel = "Done", onClose }: SuccessDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-lg border border-slate-800 bg-slate-950 p-6 text-center shadow-2xl shadow-black/40">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
        <button type="button" onClick={onClose} className={cn(buttonBase, buttonVariants.primary, "mt-5 w-full")}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
};
