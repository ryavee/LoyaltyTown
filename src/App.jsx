import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./Components/Layout/AdminLayout";
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './Components/RequireAuth';

/* =========================
   PAGES
========================= */

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import CompanyRegistration from "./pages/CompanyRegistration";
import SaveCardDetails from "./pages/SaveCardDetails";
import ForgotPassword from "./pages/ForgotPassword";

import AdminUsers from "./pages/AdminUsers";
import Customers from "./pages/Customers";
import Dealers from "./pages/Dealers";

import Products from "./pages/Products";
import QRGeneration from "./pages/QRGeneration";
import QRBatches from "./pages/QRBatches";
import QRBatchDetails from "./pages/QRBatchDetails";
import QRCodes from "./pages/QRCodes";
import ScanLogs from "./pages/ScanLogs";
import QRAnalyticsDashboard from "./pages/QRAnalytics/Dashboard";
import ScanTrends from "./pages/QRAnalytics/ScanTrends";
import ProductPerformance from "./pages/QRAnalytics/ProductPerformance";
import BatchPerformance from "./pages/QRAnalytics/BatchPerformance";
import QRTrack from "./pages/QRTrack";

import Catalogue from "./pages/Catalogue";
import Promotions from "./pages/Promotions";
import Redemption from "./pages/Redemption";
import Feed from "./pages/Feed";
import ManageTickets from "./pages/ManageTickets";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";
import PublicScanPage from "./pages/PublicScanPage";
import ProductVerificationPage from "./pages/ProductVerificationPage";
import PublicRewardPage from "./pages/PublicRewardPage";
import PublicScanErrorPage from "./pages/PublicScanErrorPage";
import CustomerWalletPage from "./pages/CustomerWalletPage";
import CustomerWallet from "./pages/customers/Wallet";
import CampaignList from "./pages/campaigns/CampaignList";
import CampaignCreate from "./pages/campaigns/CampaignCreate";
import CampaignDetails from "./pages/campaigns/CampaignDetails";
import CampaignEdit from "./pages/campaigns/CampaignEdit";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ======================
              PUBLIC ROUTES
          ====================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/checkout" element={<SaveCardDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/scan/:code" element={<PublicScanPage />} />
          <Route path="/product-verification" element={<ProductVerificationPage />} />
          <Route path="/reward" element={<PublicRewardPage />} />
          <Route path="/error" element={<PublicScanErrorPage />} />
          <Route path="/wallet" element={<CustomerWalletPage />} />

          {/* ======================
              ADMIN LAYOUT (protected)
          ====================== */}
          <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* QR Management */}
            <Route path="/qr-generation" element={<QRGeneration />} />
            <Route path="/qr-batches" element={<QRBatches />} />
            <Route path="/qr-batches/:id" element={<QRBatchDetails />} />
            <Route path="/qr-codes" element={<QRCodes />} />
            <Route path="/scan-logs" element={<ScanLogs />} />
            <Route path="/qr-analytics" element={<QRAnalyticsDashboard />} />
            <Route path="/qr-analytics/scan-trends" element={<ScanTrends />} />
            <Route path="/qr-analytics/product-performance" element={<ProductPerformance />} />
            <Route path="/qr-analytics/batch-performance" element={<BatchPerformance />} />

            {/* Admin customer wallet */}
            <Route path="/customers/:id/wallet" element={<CustomerWallet />} />

            {/* Campaigns */}
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/create" element={<CampaignCreate />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/campaigns/:id/edit" element={<CampaignEdit />} />

            {/* USERS */}
            <Route path="/factoryUsers" element={<AdminUsers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/dealers" element={<Dealers />} />

            {/* PRODUCTS */}
            <Route path="/products" element={<Products />} />            
            <Route path="/track" element={<QRTrack />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/redemption" element={<Redemption />} />

            {/* SYSTEM */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/tickets" element={<ManageTickets />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-xl font-semibold">
                404 - Page Not Found
              </div>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
