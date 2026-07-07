import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider } from './contexts/AuthContext';
import RouteErrorBoundary from "./Components/enterprise/feedback/RouteErrorBoundary";
import EnterpriseRoutes from "./Routes/EnterpriseRoutes";
const EnterpriseLayout = lazy(() => import("./Components/Layout/EnterpriseLayout"));
const PlatformLayout = lazy(() => import("./layouts/PlatformLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* =========================
   PAGES
========================= */

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/Register"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CompanyRegistration = lazy(() => import("./pages/CompanyRegistration"));
const SaveCardDetails = lazy(() => import("./pages/SaveCardDetails"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const PublicScanPage = lazy(() => import("./pages/PublicScanPage"));
const ProductVerificationPage = lazy(() => import("./pages/ProductVerificationPage"));
const PublicRewardPage = lazy(() => import("./pages/PublicRewardPage"));
const PublicScanErrorPage = lazy(() => import("./pages/PublicScanErrorPage"));
const CustomerWalletPage = lazy(() => import("./pages/CustomerWalletPage"));
const ConsumerPortal = lazy(() => import("./pages/consumer/ConsumerPortal"));
const GlobalDistributionRoutes = lazy(() => import("./routes/AppRoutes.tsx"));
const CoreSuperAdminDashboard = lazy(() => import("./pages/dashboard/SuperAdminDashboard"));
const CoreManufacturerDashboard = lazy(() => import("./pages/dashboard/ManufacturerDashboard"));
const CoreDistributorDashboard = lazy(() => import("./pages/dashboard/DistributorDashboard"));
const CoreDealerDashboard = lazy(() => import("./pages/dashboard/DealerDashboard"));
const CoreRetailerDashboard = lazy(() => import("./pages/dashboard/RetailerDashboard"));
const CoreContractorDashboard = lazy(() => import("./pages/dashboard/ContractorDashboard"));
const ManufacturerFactories = lazy(() => import("./pages/manufacturer-cloud/Factories"));
const ManufacturerProduction = lazy(() => import("./pages/manufacturer-cloud/Production"));
const ManufacturerQualityControl = lazy(() => import("./pages/manufacturer-cloud/QualityControl"));
const ManufacturerProducts = lazy(() => import("./pages/manufacturer-cloud/Products"));
const ManufacturerQRCodeEngine = lazy(() => import("./pages/manufacturer-cloud/QRCodeEngine"));
const ManufacturerTraceability = lazy(() => import("./pages/manufacturer-cloud/Traceability"));
const ManufacturerInventory = lazy(() => import("./pages/manufacturer-cloud/Inventory"));
const ManufacturerWarehouse = lazy(() => import("./pages/manufacturer-cloud/Warehouse"));
const ManufacturerProcurement = lazy(() => import("./pages/manufacturer-cloud/Procurement"));
const ERPChoice = lazy(() => import("./pages/manufacturer-cloud/ERPChoice"));
const ERPIntegrations = lazy(() => import("./pages/manufacturer-cloud/ERPIntegrations"));
const LoyaltyTownERP = lazy(() => import("./pages/manufacturer-cloud/LoyaltyTownERP"));
const PartnerManufacturers = lazy(() => import("./pages/partners/Manufacturers"));
const PartnerDistributors = lazy(() => import("./pages/partners/Distributors"));
const PartnerDealers = lazy(() => import("./pages/partners/Dealers"));
const PartnerRetailers = lazy(() => import("./pages/partners/Retailers"));
const PartnerContractors = lazy(() => import("./pages/partners/Contractors"));
const PartnerArchitects = lazy(() => import("./pages/partners/Architects"));
const CoreOrders = lazy(() => import("./pages/operations/Orders"));
const CoreDispatch = lazy(() => import("./pages/operations/Dispatch"));
const CoreFinance = lazy(() => import("./pages/operations/Finance"));
const CoreFieldSales = lazy(() => import("./pages/operations/FieldSales"));
const CoreWarrantyService = lazy(() => import("./pages/operations/WarrantyService"));
const CoreCustomers = lazy(() => import("./pages/operations/Customers"));
const CoreCampaigns = lazy(() => import("./pages/engagement/Campaigns"));
const CoreRewards = lazy(() => import("./pages/engagement/Rewards"));
const CoreWallet = lazy(() => import("./pages/engagement/Wallet"));
const CoreMarketplace = lazy(() => import("./pages/marketplace/Marketplace"));
const CoreAnalyticsOverview = lazy(() => import("./pages/analytics/AnalyticsOverview"));
const CoreAIAssistant = lazy(() => import("./pages/ai/AIAssistant"));
const PlatformSettings = lazy(() => import("./pages/PlatformSettings"));
const PlatformArchitecturePage = lazy(() => import("./pages/architecture/PlatformArchitecturePage"));
const Phase1ModulePage = lazy(() => import("./pages/phase1/Phase1ModulePage"));

const RouteLoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 shadow-sm shadow-black/20">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
      <span className="text-sm font-semibold">Loading workspace</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteErrorBoundary>
          <Suspense fallback={<RouteLoadingState />}>
            <Routes>

          {/* ======================
              PUBLIC ROUTES
          ====================== */}
          <Route path="/" element={<LandingPage />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/checkout" element={<SaveCardDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/public-scan" element={<PublicScanPage />} />
          <Route path="/scan/:code" element={<PublicScanPage />} />
          <Route path="/verify/:code" element={<PublicScanPage />} />
          <Route path="/product-verification" element={<ProductVerificationPage />} />
          <Route path="/reward" element={<PublicRewardPage />} />
          <Route path="/error" element={<PublicScanErrorPage />} />
          <Route path="/customer-wallet" element={<CustomerWalletPage />} />
          <Route path="/consumer-wallet" element={<ConsumerPortal mode="wallet" />} />
          <Route path="/consumer-profile" element={<ConsumerPortal mode="profile" />} />
          <Route path="/consumer-support" element={<ConsumerPortal mode="support" />} />
          <Route path="/consumer-referral" element={<ConsumerPortal mode="referral" />} />
          <Route path="/consumer-offers" element={<ConsumerPortal mode="offers" />} />
          <Route path="/consumer-app/*" element={<ConsumerPortal />} />
          <Route path="/global/*" element={<GlobalDistributionRoutes />} />
          <Route element={<PlatformLayout />}>
            <Route path="/dashboard/super-admin" element={<CoreSuperAdminDashboard />} />
            <Route path="/dashboard/manufacturer" element={<CoreManufacturerDashboard />} />
            <Route path="/dashboard/distributor" element={<CoreDistributorDashboard />} />
            <Route path="/dashboard/dealer" element={<CoreDealerDashboard />} />
            <Route path="/dashboard/retailer" element={<CoreRetailerDashboard />} />
            <Route path="/dashboard/contractor" element={<CoreContractorDashboard />} />
            <Route path="/manufacturer/factories" element={<ManufacturerFactories />} />
            <Route path="/manufacturer/production" element={<ManufacturerProduction />} />
            <Route path="/manufacturer/quality-control" element={<ManufacturerQualityControl />} />
            <Route path="/manufacturer/products" element={<ManufacturerProducts />} />
            <Route path="/manufacturer/qr-engine" element={<ManufacturerQRCodeEngine />} />
            <Route path="/manufacturer/traceability" element={<ManufacturerTraceability />} />
            <Route path="/manufacturer/inventory" element={<ManufacturerInventory />} />
            <Route path="/manufacturer/warehouse" element={<ManufacturerWarehouse />} />
            <Route path="/manufacturer/procurement" element={<ManufacturerProcurement />} />
            <Route path="/erp" element={<ERPChoice />} />
            <Route path="/erp/integrations" element={<ERPIntegrations />} />
            <Route path="/erp/loyaltytown-erp" element={<LoyaltyTownERP />} />
            <Route path="/manufacturers" element={<PartnerManufacturers />} />
            <Route path="/distributors" element={<PartnerDistributors />} />
            <Route path="/dealers" element={<PartnerDealers />} />
            <Route path="/retailers" element={<PartnerRetailers />} />
            <Route path="/contractors" element={<PartnerContractors />} />
            <Route path="/architects" element={<PartnerArchitects />} />
            <Route path="/orders" element={<CoreOrders />} />
            <Route path="/dispatch" element={<CoreDispatch />} />
            <Route path="/finance" element={<CoreFinance />} />
            <Route path="/field-sales" element={<CoreFieldSales />} />
            <Route path="/warranty-service" element={<CoreWarrantyService />} />
            <Route path="/customers" element={<CoreCustomers />} />
            <Route path="/campaigns" element={<CoreCampaigns />} />
            <Route path="/rewards" element={<CoreRewards />} />
            <Route path="/wallet" element={<CoreWallet />} />
            <Route path="/marketplace" element={<CoreMarketplace />} />
            <Route path="/analytics" element={<CoreAnalyticsOverview />} />
            <Route path="/ai-assistant" element={<CoreAIAssistant />} />
            <Route path="/settings" element={<PlatformSettings />} />
            <Route path="/products" element={<Phase1ModulePage moduleKey="products" />} />
            <Route path="/qr-management" element={<Phase1ModulePage moduleKey="qr-management" />} />
            <Route path="/customers" element={<Phase1ModulePage moduleKey="customers" />} />
            <Route path="/loyalty" element={<Phase1ModulePage moduleKey="loyalty" />} />
            <Route path="/rewards" element={<Phase1ModulePage moduleKey="rewards" />} />
            <Route path="/warranty" element={<Phase1ModulePage moduleKey="warranty" />} />
            <Route path="/traceability" element={<Phase1ModulePage moduleKey="traceability" />} />
            <Route path="/dealers" element={<Phase1ModulePage moduleKey="dealers" />} />
            <Route path="/distributors" element={<Phase1ModulePage moduleKey="distributors" />} />
            <Route path="/retailers" element={<Phase1ModulePage moduleKey="retailers" />} />
            <Route path="/channel-partners" element={<Phase1ModulePage moduleKey="channel-partners" />} />
            <Route path="/marketing" element={<Phase1ModulePage moduleKey="marketing" />} />
            <Route path="/campaign-pages" element={<Phase1ModulePage moduleKey="campaign-pages" />} />
            <Route path="/fraud-alerts" element={<Phase1ModulePage moduleKey="fraud-alerts" />} />
            <Route path="/analytics-reports" element={<Phase1ModulePage moduleKey="analytics" />} />
            <Route path="/dashboard" element={<Phase1ModulePage moduleKey="dashboard" />} />
            <Route path="/architecture" element={<PlatformArchitecturePage />} />
            <Route path="/business-profiles" element={<PlatformArchitecturePage />} />
          </Route>

          {/* ======================
              ENTERPRISE APPLICATION SHELL
          ====================== */}
          <Route element={<EnterpriseLayout />}>
            {EnterpriseRoutes()}
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
