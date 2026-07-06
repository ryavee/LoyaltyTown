import { Badge } from "../../../Components/enterprise";
import type { ProductStatus } from "../../../data/productDemoData";

export const ProductStatusBadge = ({ status }: { status: ProductStatus | string }) => {
  const tone = status === "Active" ? "success" : status === "Draft" ? "warning" : status === "Discontinued" ? "danger" : "default";
  return <Badge tone={tone}>{status}</Badge>;
};
