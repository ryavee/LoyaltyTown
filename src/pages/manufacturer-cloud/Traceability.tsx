import { Route } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const traceabilityStats = [
  { label: "Lot Visibility", value: "97.8%", change: "From source to customer", tone: "cyan" as const },
  { label: "Journey Events", value: "14.2K", change: "Recorded today", tone: "emerald" as const },
  { label: "Recall Readiness", value: "Ready", change: "Full audit chain present", tone: "violet" as const },
  { label: "Cross-Node Handoffs", value: "328", change: "Stable network flow", tone: "amber" as const },
];

export default function Traceability() {
  return <ManufacturerCloudPage title="Traceability" description="Trace products from factory to warehouse, distributor, dealer, retailer, contractor, and customer scan journeys." icon={Route} stats={traceabilityStats} rows={manufacturerCloudRows} focus={["Batch Journey", "QR Lifecycle", "Dispatch Events", "Warehouse Handoffs", "Consumer Activation", "Recall Readiness"]} highlights={["End-to-end traceability", "Recall-ready audits", "Customer activation journey"]} />;
}
