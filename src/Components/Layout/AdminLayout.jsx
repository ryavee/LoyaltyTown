import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState("7D");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {}
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#E9E0F4] text-[#2B2340] overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
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
          className="fixed inset-0 z-30 lg:hidden bg-black/30 backdrop-blur-[2px]"
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
          onLogout={handleLogout}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* ===== CONTENT ===== */}
        <main className="custom-scrollbar flex-1 overflow-y-auto p-4 md:p-5 bg-[#F8F5FC]">
          <div
            key={location.pathname}
            className="w-full max-w-[1600px] mx-auto animate-fadeIn"
          >
            <Outlet context={{ timeRange, searchQuery }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
