import { Cog } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const productionStats = [
  { label: "Orders in Queue", value: "142", change: "24 scheduled today", tone: "cyan" as const },
  { label: "Line Throughput", value: "91%", change: "Above weekly target", tone: "emerald" as const },
  { label: "Batch Yield", value: "98.2%", change: "+1.4% uplift", tone: "violet" as const },
  { label: "Material Readiness", value: "87%", change: "6 SKUs at risk", tone: "amber" as const },
];

export default function Production() {
  return <ManufacturerCloudPage title="Production" description="Plan, track, and analyze production orders, shifts, outputs, and line performance." icon={Cog} stats={productionStats} rows={manufacturerCloudRows} focus={["Production Orders", "Line Throughput", "Shift Output", "Material Readiness", "Batch Creation", "Supervisor Queue"]} highlights={["Live production board", "Line efficiency insights", "Batch readiness"]} />;
}
