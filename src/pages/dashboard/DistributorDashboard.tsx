import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function DistributorDashboard() {
  return <DashboardShared {...roleDashboards.distributor} />;
}
