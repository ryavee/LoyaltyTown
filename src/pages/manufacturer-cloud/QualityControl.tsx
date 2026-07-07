import { ShieldCheck } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const qualityStats = [
  { label: "Inspection Pass Rate", value: "99.1%", change: "Best month this quarter", tone: "emerald" as const },
  { label: "Open Holds", value: "18", change: "6 flagged for review", tone: "amber" as const },
  { label: "Defects Detected", value: "124", change: "42% from supplier checks", tone: "rose" as const },
  { label: "Recall Exposure", value: "Low", change: "No critical backlog", tone: "cyan" as const },
];

export default function QualityControl() {
  return <ManufacturerCloudPage title="Quality Control" description="Review inspections, QC holds, defects, rejected units, and recall risk signals." icon={ShieldCheck} stats={qualityStats} rows={manufacturerCloudRows} focus={["Inspection Queue", "QC Holds", "Defect Types", "Rejected Units", "Recall Risk", "Audit Trail"]} highlights={["Defect intelligence", "Audit-ready traceability", "Supplier visibility"]} />;
}
