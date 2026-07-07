import { Warehouse as WarehouseIcon } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const warehouseStats = [
  { label: "Inbound Loads", value: "64", change: "12 arriving before noon", tone: "cyan" as const },
  { label: "Outbound Shipments", value: "118", change: "98% on-time dispatch", tone: "emerald" as const },
  { label: "Bin Utilization", value: "86%", change: "Steady storage efficiency", tone: "violet" as const },
  { label: "Returns Queue", value: "23", change: "3 require QC review", tone: "amber" as const },
];

export default function Warehouse() {
  return <ManufacturerCloudPage title="Warehouse" description="Run inbound, outbound, locations, bins, stock counts, dispatch, transfers, and returns." icon={WarehouseIcon} stats={warehouseStats} rows={manufacturerCloudRows} focus={["Inbound", "Outbound", "Locations", "Bins", "Stock Count", "Dispatch"]} highlights={["Warehouse orchestration", "Location-level control", "Returns & fulfillment flow"]} />;
}
