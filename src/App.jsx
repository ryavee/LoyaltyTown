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

import AdminUsers from "./pages/AdminUsers";
import Customers from "./pages/Customers";
import Dealers from "./pages/Dealers";

import Products from "./pages/Products";
import QRGeneration from "./pages/QRGeneration";
import QRTrack from "./pages/QRTrack";

import Catalogue from "./pages/Catalogue";
import Promotions from "./pages/Promotions";
import Redemption from "./pages/Redemption";
import Feed from "./pages/Feed";
import ManageTickets from "./pages/ManageTickets";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";
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

          {/* ======================
              ADMIN LAYOUT (protected)
          ====================== */}
          <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* USERS */}
            <Route path="/factoryUsers" element={<AdminUsers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/dealers" element={<Dealers />} />

            {/* PRODUCTS */}
            <Route path="/products" element={<Products />} />
            <Route path="/qr" element={<QRGeneration />} />
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