import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

import { useLocation } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("customers")) {
      return "Customers";
    }

    if (location.pathname.includes("campaigns")) {
      return "Campaigns";
    }

    if (location.pathname.includes("products")) {
      return "Products";
    }

    if (location.pathname.includes("dealers")) {
      return "Dealers";
    }

    return "Dashboard";
  };

  return (
    <header
      className="
      h-16
      flex items-center justify-between
      px-6
      bg-[#F4F0FB]/95
      backdrop-blur-md
      border-b border-[#E1D7F2]
      shadow-[0_1px_8px_rgba(91,63,214,0.06)]
      "
    >
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={toggleSidebar}
          className="
          lg:hidden
          p-2
          rounded-xl
          hover:bg-white
          transition-all duration-200
          "
        >
          <Menu className="w-5 h-5 text-[#5B3FD6]" />
        </button>

        {/* Title */}
        <div>
          <h1 className="text-[18px] font-semibold text-[#2B2340] leading-tight">
            {getTitle()}
          </h1>

          <p className="text-[11px] text-[#7C7297] mt-0.5">
            Let's check your update today
          </p>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div
        className="
        hidden md:flex
        items-center
        h-10
        w-[320px]
        px-4
        rounded-xl
        bg-white/85
        border border-[#E1D7F2]
        shadow-[0_1px_2px_rgba(43,35,64,0.04)]
        "
      >
        <Search className="w-4 h-4 text-[#7B61E8]" />

        <input
          type="text"
          placeholder="Search Placeholder"
          className="
          ml-2
          w-full
          bg-transparent
          outline-none
          text-sm
          text-[#2B2340]
          placeholder:text-[#AAA2BE]
          "
        />
      </div>

      {/* ===== RIGHT ===== */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button
          className="
          relative
          w-10 h-10
          rounded-xl
          bg-white/85
          border border-[#E1D7F2]
          flex items-center justify-center
          hover:bg-white
          hover:border-[#CFC0EF]
          transition-all duration-200
          "
        >
          <Bell className="w-4 h-4 text-[#5B3FD6]" />

          <span
            className="
            absolute
            top-2.5 right-2.5
            w-2 h-2
            rounded-full
            bg-[#5AC782]
            "
          ></span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-[#D6CBE8]"></div>

        {/* Profile */}
        <div
          className="
          flex items-center gap-3
          cursor-pointer
          "
        >
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-[#2B2340]">
              Ravi Raj
            </span>

            <span className="text-[11px] text-[#7C7297]">
              Super Admin
            </span>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="
            w-10 h-10
            rounded-xl
            object-cover
            border border-white
            shadow-[0_1px_3px_rgba(43,35,64,0.12)]
            "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
