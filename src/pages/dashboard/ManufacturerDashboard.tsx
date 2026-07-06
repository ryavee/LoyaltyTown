import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function ManufacturerDashboard() {
  return <DashboardShared {...roleDashboards.manufacturer} />;
}
