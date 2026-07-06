import DashboardShared from "./DashboardShared";
import { roleDashboards } from "../../data/loyaltyTownDemoData";

export default function ContractorDashboard() {
  return <DashboardShared {...roleDashboards.contractor} />;
}
