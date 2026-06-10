import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, ArrowLeft, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useDebounce from "../../hooks/useDebounce";

/* ─────────────────────────────────────────────────────────────
   PAGE CONFIG — one entry per route
   title       : shown in header left
   subtitle    : shown below title (optional)
   backTo      : if set, shows a back arrow pointing to this path
   showSearch  : show search bar (dashboard only)
   showRange   : show 7D / 30D range picker (dashboard only)
   ───────────────────────────────────────────────────────────── */
const PAGE_CONFIG = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Here's your platform at a glance",
    showSearch: true,
    showRange: true,
  },
  "/customers": {
    title: "Customers",
    subtitle: "Manage users, verify KYC, and monitor loyalty activities",
  },
  "/dealers": {
    title: "Dealers",
    subtitle: "Manage and monitor your dealer network",
  },
  "/factoryUsers": {
    title: "Admin Users",
    subtitle: "Manage roles, permissions and admin access",
  },
  "/products": {
    title: "Products",
    subtitle: "Manage product catalogue, units, and reward point values.",
  },
  "/qr": {
    title: "QR Generation",
    subtitle: "Create, batch-generate and download QR campaigns",
  },
  "/track": {
    title: "QR Track",
    subtitle: "Track QR scan events and lifecycle",
  },
  "/catalogue": {
    title: "Catalogue",
    subtitle: "Browse and manage your product catalogue",
  },
  "/campaigns": {
    title: "QR Campaigns",
    subtitle: "Create and monitor QR-based campaigns",
  },
  "/promotions": {
    title: "Promotions",
    subtitle: "Festival bonuses, time-based and point promotions",
  },
  "/redemption": {
    title: "Manage Redemption",
    subtitle: "Review and process reward redemption requests",
  },
  "/feed": {
    title: "Activity Feed",
    subtitle: "Real-time platform activity and event log",
  },
  "/tickets": {
    title: "Manage Tickets",
    subtitle: "View and resolve customer support tickets",
  },
  "/announcements": {
    title: "Announcements",
    subtitle: "Broadcast messages to customers and dealers",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Branding, SMTP, API keys and platform configuration",
  },
};

/** Match current pathname to a config key, supporting dynamic :id segments */
const matchConfig = (pathname) => {
  // exact match first
  if (PAGE_CONFIG[pathname]) return PAGE_CONFIG[pathname];

  // dynamic segment match e.g. /customers/ABC123 → /customers/:id
  for (const key of Object.keys(PAGE_CONFIG)) {
    if (!key.includes(":")) continue;
    const regex = new RegExp(
      "^" + key.replace(/:[^/]+/g, "[^/]+") + "$"
    );
    if (regex.test(pathname)) return PAGE_CONFIG[key];
  }

  return { title: "LoyaltyTown", subtitle: "" };
};

/* ─────────────────────────────────────────────────────────────
   HEADER COMPONENT
   ───────────────────────────────────────────────────────────── */
const Header = ({
  toggleSidebar,
  onLogout,
  timeRange = "7D",
  setTimeRange,
  searchQuery = "",
  setSearchQuery,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const [rawSearch, setRawSearch] = useState(searchQuery);
  const location = useLocation();
  const navigate = useNavigate();

  const userName = user?.name || "User";
  const userRole = user?.role || "Member";
  const userInitials = userName.split(' ').map(n => n[0] || '').join('').toUpperCase().slice(0, 2) || "U";

  // debounced search
  const debouncedSearch = useDebounce(rawSearch, 300);
  if (debouncedSearch !== searchQuery && setSearchQuery) {
    setSearchQuery(debouncedSearch);
  }

  const config = matchConfig(location.pathname);
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="h-16 px-6 bg-white flex items-center relative border-b border-[#E7DFF2] z-30 shadow-xs">
      <div className="h-full flex w-full items-center justify-between gap-4">
                {/* ── LEFT: hamburger + page title ── */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-xl bg-[#F9F7FF] border border-[#DDD6FE] p-2 text-[#7C3AED] hover:bg-[#EDE9FE] transition flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Back button (detail pages) */}
          {config.backTo && (
            <button
              onClick={() => navigate(config.backTo)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#9CA3AF] hover:text-[#7C3AED] transition flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{config.backLabel || "Back"}</span>
            </button>
          )}

          {/* Title + subtitle */}
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold text-[#5B3FD6] leading-tight">
              {config.title}
            </h1>
            {config.subtitle && (
              <p className="text-[11.5px] text-[#7C7297] mt-0.5 leading-snug">
                {config.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: controls ── */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Date range — dashboard only */}
          {isDashboard && setTimeRange && (
            <div className="flex gap-1 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] p-1 hidden md:flex">
              {["Today", "7D", "30D", "Custom"].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setTimeRange(btn)}
                  className={`rounded-md px-3 py-1 text-[11px] font-bold transition cursor-pointer ${timeRange === btn
                    ? "bg-[#7C3AED] text-white shadow-sm"
                    : "text-[#9CA3AF] hover:text-[#7C3AED] hover:bg-[#EDE9FE]"
                    }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          )}

          {/* Search — dashboard only */}
          {isDashboard && (
            <div className="relative flex items-center gap-2 rounded-lg bg-[#F9F7FF] border border-[#DDD6FE] px-3 py-1.5 hidden md:flex">
              <Search className="h-3.5 w-3.5 text-[#C4B5FD] flex-shrink-0" />
              <input
                type="text"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Search anything..."
                className="w-[160px] bg-transparent text-xs font-semibold text-[#1E1B4B] placeholder:text-[#C4B5FD] outline-none"
              />
              {rawSearch ? (
                <button
                  onClick={() => {
                    setRawSearch("");
                    if (setSearchQuery) setSearchQuery("");
                  }}
                  className="text-[#A5A1B8] hover:text-[#7C3AED] transition cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : (
                <span className="rounded bg-[#EDE9FE] px-1.5 py-0.5 text-[9px] font-bold text-[#7C3AED]">
                  ⌘K
                </span>
              )}
            </div>
          )}

          {/* Live indicator */}
          <div className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 text-[11px] font-bold text-[#059669] flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
            </span>
            <span className="hidden sm:inline">Live</span>
          </div>

          {/* Notifications */}
          <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#F9F7FF] border border-[#DDD6FE] text-[#9CA3AF] hover:border-[#7C3AED] hover:text-[#7C3AED] transition cursor-pointer">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[9px] font-bold text-white border-2 border-white">
              3
            </span>
          </button>

          {/* User chip */}
          <div className="relative flex items-center gap-2 rounded-lg bg-[#F9F7FF] border border-[#DDD6FE] px-2.5 py-1">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              {userInitials}
            </div>
            <div className="hidden xl:block">
              <p className="text-[12px] font-bold text-[#1E1B4B] leading-none">{userName}</p>
              <p className="text-[10px] text-[#9CA3AF] mt-0.5">{userRole}</p>
            </div>
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="text-[#C4B5FD] hover:text-[#7C3AED] transition cursor-pointer"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-[#EDE9FE] bg-white shadow-lg p-1.5 animate-fadeIn">
                <div className="px-3 py-2 border-b border-[#F5F3FF] mb-1">
                  <p className="text-xs font-bold text-[#1E1B4B]">{userName}</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">{userRole}</p>
                </div>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/login', { replace: true });
                  }}
                  className="w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FEE2E2] transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
