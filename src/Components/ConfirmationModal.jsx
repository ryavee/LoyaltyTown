import { Loader2 } from "lucide-react";
import { ConfirmationDialog } from "./enterprise";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
  loadingText,
}) => (
  <ConfirmationDialog
    open={isOpen}
    title={title}
    description={
      <div className="space-y-2">
        <p>{message}</p>
        {isLoading ? (
          <span className="inline-flex items-center gap-2 text-cyan-200">
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText ?? "Processing..."}
          </span>
        ) : null}
      </div>
    }
    confirmLabel={isLoading ? loadingText ?? "Processing..." : confirmText}
    cancelLabel={cancelText}
    tone={type === "danger" ? "danger" : "default"}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default ConfirmationModal;
