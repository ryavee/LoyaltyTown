import { Cable } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

export default function ERPIntegrations() {
  return <ManufacturerCloudPage title="ERP Integrations" description="Connect existing ERP systems with static connector, mapping, sync health, and audit placeholders." icon={Cable} stats={defaultStats} rows={manufacturerCloudRows} focus={["SAP Connector", "Oracle Connector", "Dynamics Connector", "Tally Sync", "Data Mapping", "Sync Health"]} />;
}
