import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  // Mobile Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Desktop Collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#E9E0F4] text-[#2B2340] overflow-hidden">

      {/* ===== SIDEBAR ===== */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform transition-all duration-300 ease-in-out

        ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <Sidebar
          onLogout={handleLogout}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {isSidebarOpen && (
        <div
          className="
          fixed inset-0 z-30 lg:hidden
          bg-black/30
          backdrop-blur-[2px]
          "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* ===== HEADER ===== */}
        <Header
          toggleSidebar={() => setIsSidebarOpen(true)}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* ===== CONTENT ===== */}
        <main
          className="
          flex-1
          overflow-y-auto
          p-4 md:p-5
          bg-[#F8F5FC]
          "
        >
          {/* Inner Container */}
          <div
            className="
            w-full
            max-w-[1600px]
            mx-auto
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;