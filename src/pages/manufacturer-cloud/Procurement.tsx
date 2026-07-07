import { ShoppingCart } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const procurementStats = [
  { label: "Pending PRs", value: "41", change: "18 need leadership approval", tone: "cyan" as const },
  { label: "Supplier SLA", value: "94%", change: "On-time fulfillment", tone: "emerald" as const },
  { label: "POs in Flight", value: "67", change: "12 ready for receipt", tone: "violet" as const },
  { label: "Cost Variance", value: "-3.2%", change: "Below target forecast", tone: "amber" as const },
];

export default function Procurement() {
  return <ManufacturerCloudPage title="Procurement" description="Prepare procurement requests, suppliers, purchase orders, receipts, approvals, and cost signals." icon={ShoppingCart} stats={procurementStats} rows={manufacturerCloudRows} focus={["Purchase Requests", "Suppliers", "Purchase Orders", "Receipts", "Approvals", "Cost Signals"]} highlights={["Vendor collaboration", "Spend control", "Approval workflow"]} />;
}
