import { Navigate, Route, Routes } from "react-router-dom";
import PlatformLayout from "../layouts/PlatformLayout";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import ManufacturerDashboard from "../pages/dashboard/ManufacturerDashboard";
import DistributorDashboard from "../pages/dashboard/DistributorDashboard";
import DealerDashboard from "../pages/dashboard/DealerDashboard";
import RetailerDashboard from "../pages/dashboard/RetailerDashboard";
import ContractorDashboard from "../pages/dashboard/ContractorDashboard";
import Marketplace from "../pages/marketplace/Marketplace";
import QRCodeEngine from "../pages/qr/QRCodeEngine";
import AnalyticsOverview from "../pages/analytics/AnalyticsOverview";
import Factories from "../pages/manufacturer-cloud/Factories";
import Production from "../pages/manufacturer-cloud/Production";
import QualityControl from "../pages/manufacturer-cloud/QualityControl";
import Products from "../pages/manufacturer-cloud/Products";
import ManufacturerQRCodeEngine from "../pages/manufacturer-cloud/QRCodeEngine";
import Traceability from "../pages/manufacturer-cloud/Traceability";
import Inventory from "../pages/manufacturer-cloud/Inventory";
import Warehouse from "../pages/manufacturer-cloud/Warehouse";
import Procurement from "../pages/manufacturer-cloud/Procurement";
import ERPChoice from "../pages/manufacturer-cloud/ERPChoice";
import ERPIntegrations from "../pages/manufacturer-cloud/ERPIntegrations";
import LoyaltyTownERP from "../pages/manufacturer-cloud/LoyaltyTownERP";
import Manufacturers from "../pages/partners/Manufacturers";
import Distributors from "../pages/partners/Distributors";
import Dealers from "../pages/partners/Dealers";
import Retailers from "../pages/partners/Retailers";
import Contractors from "../pages/partners/Contractors";
import Architects from "../pages/partners/Architects";
import Orders from "../pages/operations/Orders";
import Dispatch from "../pages/operations/Dispatch";
import Finance from "../pages/operations/Finance";
import FieldSales from "../pages/operations/FieldSales";
import WarrantyService from "../pages/operations/WarrantyService";
import Customers from "../pages/operations/Customers";
import Campaigns from "../pages/engagement/Campaigns";
import Rewards from "../pages/engagement/Rewards";
import Wallet from "../pages/engagement/Wallet";
import AIAssistant from "../pages/ai/AIAssistant";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PlatformLayout />}>
        <Route index element={<Navigate to="dashboard/manufacturer" replace />} />
        <Route path="dashboard/super-admin" element={<SuperAdminDashboard />} />
        <Route path="dashboard/manufacturer" element={<ManufacturerDashboard />} />
        <Route path="dashboard/distributor" element={<DistributorDashboard />} />
        <Route path="dashboard/dealer" element={<DealerDashboard />} />
        <Route path="dashboard/retailer" element={<RetailerDashboard />} />
        <Route path="dashboard/contractor" element={<ContractorDashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="qr-engine" element={<QRCodeEngine />} />
        <Route path="analytics" element={<AnalyticsOverview />} />
        <Route path="manufacturer/factories" element={<Factories />} />
        <Route path="manufacturer/production" element={<Production />} />
        <Route path="manufacturer/quality-control" element={<QualityControl />} />
        <Route path="manufacturer/products" element={<Products />} />
        <Route path="manufacturer/qr-engine" element={<ManufacturerQRCodeEngine />} />
        <Route path="manufacturer/traceability" element={<Traceability />} />
        <Route path="manufacturer/inventory" element={<Inventory />} />
        <Route path="manufacturer/warehouse" element={<Warehouse />} />
        <Route path="manufacturer/procurement" element={<Procurement />} />
        <Route path="erp" element={<ERPChoice />} />
        <Route path="erp/integrations" element={<ERPIntegrations />} />
        <Route path="erp/loyaltytown-erp" element={<LoyaltyTownERP />} />
        <Route path="manufacturers" element={<Manufacturers />} />
        <Route path="distributors" element={<Distributors />} />
        <Route path="dealers" element={<Dealers />} />
        <Route path="retailers" element={<Retailers />} />
        <Route path="contractors" element={<Contractors />} />
        <Route path="architects" element={<Architects />} />
        <Route path="orders" element={<Orders />} />
        <Route path="dispatch" element={<Dispatch />} />
        <Route path="finance" element={<Finance />} />
        <Route path="field-sales" element={<FieldSales />} />
        <Route path="warranty-service" element={<WarrantyService />} />
        <Route path="customers" element={<Customers />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="*" element={<Navigate to="dashboard/manufacturer" replace />} />
      </Route>
    </Routes>
  );
}
