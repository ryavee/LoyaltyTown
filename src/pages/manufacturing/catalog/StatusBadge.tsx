import { Badge } from "../../../Components/enterprise";
import type { CatalogStatus } from "../../../data/catalogDemoData";

export const StatusBadge = ({ status }: { status: CatalogStatus | string }) => {
  const tone = status === "Active" ? "success" : status === "Inactive" ? "warning" : status === "Archived" ? "danger" : "default";
  return <Badge tone={tone}>{status}</Badge>;
};
