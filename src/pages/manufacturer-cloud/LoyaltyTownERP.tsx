import { DatabaseZap } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

export default function LoyaltyTownERP() {
  return <ManufacturerCloudPage title="LoyaltyTown ERP" description="Native ERP foundation for products, procurement, production, warehouse, finance, QR, loyalty, and traceability." icon={DatabaseZap} stats={defaultStats} rows={manufacturerCloudRows} focus={["Product Master", "Procurement", "Production", "Warehouse", "Finance", "Channel Cloud"]} />;
}
