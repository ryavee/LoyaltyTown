import { Factory } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const factoryStats = [
  { label: "Factory Utilization", value: "94%", change: "+4.8% vs last month", tone: "cyan" as const },
  { label: "Certified Lines", value: "36", change: "12 ready for audit", tone: "emerald" as const },
  { label: "Active Shifts", value: "8", change: "2 premium runs live", tone: "violet" as const },
  { label: "Downtime Alerts", value: "7", change: "3 resolved this morning", tone: "amber" as const },
];

export default function Factories() {
  return <ManufacturerCloudPage title="Factories" description="Monitor factory capacity, utilization, certifications, shifts, and production readiness." icon={Factory} stats={factoryStats} rows={manufacturerCloudRows} focus={["Factory Capacity", "Production Lines", "Machines", "Operators", "Certifications", "Downtime"]} highlights={["Global plant visibility", "Shift orchestration", "Certification readiness"]} />;
}
