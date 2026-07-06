import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function RetailerDashboard() {
  return <DashboardShared {...roleDashboards.retailer} />;
}
