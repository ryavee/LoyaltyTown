import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function SuperAdminDashboard() {
  return <DashboardShared {...roleDashboards.superAdmin} />;
}
