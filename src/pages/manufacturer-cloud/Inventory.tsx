import { Boxes } from "lucide-react";
import ManufacturerCloudPage, { defaultStats, manufacturerCloudRows } from "./ManufacturerCloudPage";

const inventoryStats = [
  { label: "Stock Coverage", value: "31 days", change: "Healthy with seasonal buffer", tone: "cyan" as const },
  { label: "Reserved Units", value: "14.2K", change: "Priority customer orders", tone: "emerald" as const },
  { label: "Low Stock Alerts", value: "19", change: "7 require replenishment", tone: "amber" as const },
  { label: "AI Reorder Score", value: "91/100", change: "Optimized purchasing", tone: "violet" as const },
];

export default function Inventory() {
  return <ManufacturerCloudPage title="Inventory" description="Monitor current stock, reservations, movements, alerts, forecasts, and AI reorder suggestions." icon={Boxes} stats={inventoryStats} rows={manufacturerCloudRows} focus={["Current Stock", "Movements", "Reservations", "Low Stock", "Forecast", "AI Suggestions"]} highlights={["Inventory intelligence", "AI replenishment guidance", "Reservation control"]} />;
}
