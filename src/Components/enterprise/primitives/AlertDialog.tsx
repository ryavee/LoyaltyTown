import { AlertTriangle } from "lucide-react";
import { ConfirmationDialog } from "../feedback/ConfirmationDialog";

type AlertDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction: () => void;
  onClose: () => void;
};

export const AlertDialog = ({ open, title, description, actionLabel = "OK", onAction, onClose }: AlertDialogProps) => (
  <ConfirmationDialog
    open={open}
    title={title}
    description={
      <span className="inline-flex gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        {description}
      </span>
    }
    confirmLabel={actionLabel}
    cancelLabel="Close"
    onConfirm={onAction}
    onCancel={onClose}
  />
);
