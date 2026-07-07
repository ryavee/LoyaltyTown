import { Package } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const productStats = [
  { label: "Live SKUs", value: "2,840", change: "124 launched this quarter", tone: "cyan" as const },
  { label: "Launch Readiness", value: "92%", change: "All premium variants staged", tone: "emerald" as const },
  { label: "Digital Assets", value: "18.4K", change: "Rich media ready", tone: "violet" as const },
  { label: "Warranty Coverage", value: "96%", change: "CSR-ready policies", tone: "amber" as const },
];

export default function Products() {
  return <ManufacturerCloudPage title="Products" description="Manage product catalog readiness, SKUs, images, documents, warranty defaults, and consumer display content." icon={Package} stats={productStats} rows={manufacturerCloudRows} focus={["Product Catalog", "SKU Readiness", "Images", "Documents", "Warranty Defaults", "Consumer Display"]} highlights={["Launch portfolio control", "Digital asset readiness", "Warranty & content sync"]} />;
}
