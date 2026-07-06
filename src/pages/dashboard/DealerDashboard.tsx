import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function DealerDashboard() {
  return <DashboardShared {...roleDashboards.dealer} />;
}
