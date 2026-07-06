import { Navigate, Route, Routes } from "react-router-dom";
import PlatformLayout from "../layouts/PlatformLayout";
import ManufacturerDashboard from "../pages/dashboard/ManufacturerDashboard";
import DistributorDashboard from "../pages/dashboard/DistributorDashboard";
import DealerDashboard from "../pages/dashboard/DealerDashboard";
import RetailerDashboard from "../pages/dashboard/RetailerDashboard";
import ContractorDashboard from "../pages/dashboard/ContractorDashboard";
import Marketplace from "../pages/marketplace/Marketplace";
import QRCodeEngine from "../pages/qr/QRCodeEngine";
import AnalyticsOverview from "../pages/analytics/AnalyticsOverview";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PlatformLayout />}>
        <Route index element={<Navigate to="dashboard/manufacturer" replace />} />
        <Route path="dashboard/manufacturer" element={<ManufacturerDashboard />} />
        <Route path="dashboard/distributor" element={<DistributorDashboard />} />
        <Route path="dashboard/dealer" element={<DealerDashboard />} />
        <Route path="dashboard/retailer" element={<RetailerDashboard />} />
        <Route path="dashboard/contractor" element={<ContractorDashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="qr-engine" element={<QRCodeEngine />} />
        <Route path="analytics" element={<AnalyticsOverview />} />
        <Route path="*" element={<Navigate to="dashboard/manufacturer" replace />} />
      </Route>
    </Routes>
  );
}
