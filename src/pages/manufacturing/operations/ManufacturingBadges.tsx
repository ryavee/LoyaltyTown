import { Badge } from "../../../Components/enterprise";

export const FactoryStatusBadge = ({ status }: { status: string }) => <StatusBadge status={status} />;
export const ProductionStatusBadge = ({ status }: { status: string }) => <StatusBadge status={status} />;
export const QCStatusBadge = ({ status }: { status: string }) => <StatusBadge status={status} />;

const StatusBadge = ({ status }: { status: string }) => {
  const tone =
    ["Active", "Running", "In Production", "Completed", "Passed"].includes(status)
      ? "success"
      : ["Planned", "Idle", "QC Hold", "Maintenance", "Rework", "Inspection"].includes(status)
        ? "warning"
        : ["Failed", "Breakdown", "Cancelled", "Inactive"].includes(status)
          ? "danger"
          : "info";

  return <Badge tone={tone}>{status}</Badge>;
};
