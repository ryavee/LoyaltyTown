// src/Routes/AppRoutes.jsx

import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



/* =========================================================
   LAYOUT
========================================================= */

import AdminLayout from "../Components/Layout/AdminLayout";



/* =========================================================
   AUTH PAGES
========================================================= */

import Login from "../pages/Login";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import LandingPage from "../pages/LandingPage";
import CompanyRegistration from "../pages/CompanyRegistration";
import SaveCardDetails from "../pages/SaveCardDetails";
import ForgotPassword from "../pages/ForgotPassword";



/* =========================================================
   MAIN PAGES
========================================================= */

import Dashboard from "../pages/Dashboard";



/* =========================================================
   USER MANAGEMENT
========================================================= */

// legacy AdminUsers page retained in repo; new user module uses `src/pages/users/*`
import Customers from "../pages/Customers";
import CustomerWallet from "../pages/customers/Wallet";
import Dealers from "../pages/dealers/DealerList";
import DealerCreate from "../pages/dealers/DealerCreate";
import DealerDetails from "../pages/dealers/DealerDetails";
import DealerEdit from "../pages/dealers/DealerEdit";

import DistributorList from "../pages/distributors/DistributorList";
import DistributorCreate from "../pages/distributors/DistributorCreate";
import DistributorDetails from "../pages/distributors/DistributorDetails";
import DistributorEdit from "../pages/distributors/DistributorEdit";

import UserList from "../pages/users/UserList";
import UserCreate from "../pages/users/UserCreate";
import UserDetails from "../pages/users/UserDetails";
import UserEdit from "../pages/users/UserEdit";



/* =========================================================
   PRODUCT MANAGEMENT
========================================================= */

import Products from "../pages/Products";
import QRGeneration from "../pages/QRGeneration";
import QRTrack from "../pages/QRTrack";
import Catalogue from "../pages/Catalogue";
import Promotions from "../pages/Promotions";
import RedemptionManagement from "../pages/Redemption";



/* =========================================================
   SYSTEM PAGES
========================================================= */

import Feed from "../pages/Feed";
import Announcements from "../pages/Announcements";
import ManageTickets from "../pages/ManageTickets";
import Settings from "../pages/Settings";



/* =========================================================
   404 PAGE
========================================================= */

const NotFound = () => {
  return (
    <div
      className="
      min-h-screen
      flex flex-col items-center justify-center
      bg-[#F8F5FC]
      px-6
      "
    >
      <h1 className="text-6xl font-bold text-[#5B3FD6]">
        404
      </h1>

      <p className="mt-3 text-[#8E8AA2] text-lg">
        Page not found
      </p>

      <button
        onClick={() => window.history.back()}
        className="
        mt-6
        px-5 py-2.5
        rounded-xl
        bg-[#5B3FD6]
        hover:bg-[#4B30C5]
        text-white
        text-sm
        font-medium
        transition-all
        "
      >
        Go Back
      </button>
    </div>
  );
};



/* =========================================================
   ROUTES
========================================================= */

const AppRoutes = () => {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register-company"
        element={<CompanyRegistration />}
      />

      <Route
        path="/checkout"
        element={<SaveCardDetails />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />



      {/* =====================================================
          ADMIN / PROTECTED ROUTES
      ===================================================== */}

      <Route element={<AdminLayout />}>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =====================================================
          ADMIN / PROTECTED ROUTES
          ===================================================== */}

        {/* QR Management */}
        <Route
          path="/qr-generation"
          element={<QRGeneration />}
        />


        {/* =================================================
            USERS
        ================================================= */}

        <Route
          path="/factoryUsers"
          element={<AdminUsers />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/customers/:id/wallet"
          element={<CustomerWallet />}
        />

        <Route
          path="/dealers"
          element={<Dealers />}
        />
        <Route path="/dealers/create" element={<DealerCreate />} />
        <Route path="/dealers/:id" element={<DealerDetails />} />
        <Route path="/dealers/:id/edit" element={<DealerEdit />} />

        {/* Distributors */}
        <Route path="/distributors" element={<DistributorList />} />
        <Route path="/distributors/create" element={<DistributorCreate />} />
        <Route path="/distributors/:id" element={<DistributorDetails />} />
        <Route path="/distributors/:id/edit" element={<DistributorEdit />} />

        {/* Users (new module) */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />

        {/* keep old factoryUsers route for compatibility */}
        <Route path="/factoryUsers" element={<UserList />} />



        {/* =================================================
            PRODUCTS
        ================================================= */}

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/track"
          element={<QRTrack />}
        />

        <Route
          path="/catalogue"
          element={<Catalogue />}
        />

        <Route
          path="/promotions"
          element={<Promotions />}
        />

        <Route
          path="/redemption"
          element={<RedemptionManagement />}
        />



        {/* =================================================
            SYSTEM
        ================================================= */}

        <Route
          path="/feed"
          element={<Feed />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

        <Route
          path="/tickets"
          element={<ManageTickets />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>



      {/* =====================================================
          DEFAULT ROUTE
      ===================================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />



      {/* =====================================================
          404 PAGE
      ===================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;
