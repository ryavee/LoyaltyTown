import { ConfirmationDialog } from "./ConfirmationDialog";

type DeleteDialogProps = {
  open: boolean;
  entityName?: string;
  onDelete: () => void;
  onCancel: () => void;
};

export const DeleteDialog = ({ open, entityName = "record", onDelete, onCancel }: DeleteDialogProps) => (
  <ConfirmationDialog
    open={open}
    title={`Delete ${entityName}?`}
    description="This action cannot be undone. The record will be permanently removed from this workspace."
    confirmLabel="Delete"
    onConfirm={onDelete}
    onCancel={onCancel}
    tone="danger"
  />
);
