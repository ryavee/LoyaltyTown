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



/* =========================================================
   MAIN PAGES
========================================================= */

import Dashboard from "../pages/Dashboard";



/* =========================================================
   USER MANAGEMENT
========================================================= */

import AdminUsers from "../pages/AdminUsers";
import Customers from "../pages/Customers";
import Dealers from "../pages/Dealers";



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
          path="/dealers"
          element={<Dealers />}
        />



        {/* =================================================
            PRODUCTS
        ================================================= */}

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/qr"
          element={<QRGeneration />}
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
