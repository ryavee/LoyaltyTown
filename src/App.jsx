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
const NotFound = lazy(() => import("./pages/NotFound"));

/* =========================
   PAGES
========================= */

const Login = lazy(() => import("./pages/Login"));
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
          <Route path="/login" element={<Login />} />
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
          <Route path="/wallet" element={<CustomerWalletPage />} />
          <Route path="/consumer-wallet" element={<ConsumerPortal mode="wallet" />} />
          <Route path="/consumer-profile" element={<ConsumerPortal mode="profile" />} />
          <Route path="/consumer-support" element={<ConsumerPortal mode="support" />} />
          <Route path="/consumer-referral" element={<ConsumerPortal mode="referral" />} />
          <Route path="/consumer-offers" element={<ConsumerPortal mode="offers" />} />
          <Route path="/consumer-app/*" element={<ConsumerPortal />} />
          <Route path="/global/*" element={<GlobalDistributionRoutes />} />

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
