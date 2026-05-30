import { useEffect } from "react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo_icon from "../../assets/cetrak-logo.png";

import {
  X,
  LogOut,
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Package,
  QrCode,
  MapPin,
  BookOpen,
  BadgePercent,
  Coins,
  Newspaper,
  TicketCheck,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({
  onLogout,
  onClose,
  isCollapsed,
  setIsCollapsed,
}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const role =
    user?.role ||
    user?.user?.role ||
    "Guest";

  /* =====================================================
      MENU
  ===================================================== */

  const allMenuItems = [
    {
      section: "MAIN",

      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          path: "/dashboard",
        },
      ],
    },

    {
      section: "USERS",

      items: [
        {
          name: "Users",
          icon: Building2,
          path: "/factoryUsers",
        },

        {
          name: "Customers",
          icon: Users,
          path: "/customers",
        },

        {
          name: "Dealers",
          icon: Briefcase,
          path: "/dealers",
        },
      ],
    },

    {
      section: "PRODUCT",

      items: [
        {
          name: "Products",
          icon: Package,
          path: "/products",
        },

        {
          name: "QR Generation",
          icon: QrCode,
          path: "/qr",
        },

        {
          name: "QR Track",
          icon: MapPin,
          path: "/track",
        },

        {
          name: "Catalogue",
          icon: BookOpen,
          path: "/catalogue",
        },

        {
          name: "Promotions",
          icon: BadgePercent,
          path: "/promotions",
        },

        {
          name: "Redemption",
          icon: Coins,
          path: "/redemption",
        },
      ],
    },

    {
      section: "SYSTEM",

      items: [
        {
          name: "Feed",
          icon: Newspaper,
          path: "/feed",
        },

        {
          name: "Tickets",
          icon: TicketCheck,
          path: "/tickets",
        },

        {
          name: "Announcements",
          icon: Megaphone,
          path: "/announcements",
        },

        {
          name: "Settings",
          icon: Settings,
          path: "/settings",
        },
      ],
    },
  ];

  /* =====================================================
      ROLE PERMISSIONS
  ===================================================== */

  const rolePermissions = {
    Admin: ["*"],

    "Super Admin": ["*"],

    "QR Generate": [
      "Dealers",
      "Products",
      "QR Generation",
    ],
  };

  const allowed = rolePermissions[role] || [];

  let filteredMenu = allMenuItems
    .map((menu) => ({
      ...menu,

      items: menu.items.filter(
        (item) =>
          allowed.includes("*") ||
          allowed.includes(item.name)
      ),
    }))
    .filter((menu) => menu.items.length > 0);

  if (filteredMenu.length === 0) {
    filteredMenu = allMenuItems;
  }

  /* =====================================================
      REDIRECT
  ===================================================== */

  useEffect(() => {
    if (
      role === "QR Generate" &&
      location.pathname === "/dashboard"
    ) {
      navigate("/qr", { replace: true });
    }
  }, [role, navigate, location.pathname]);

  return (
    <aside
      className={`
      relative

      ${isCollapsed
          ? "w-[78px]"
          : "w-[235px]"
        }

      h-full
      flex flex-col

      bg-[#F2ECFA]

      border-r border-[#E7DFF2]

      transition-all duration-300
      `}
    >

      {/* =================================================
          FLOATING COLLAPSE BUTTON
      ================================================= */}

      <button
        onClick={() =>
          setIsCollapsed(!isCollapsed)
        }
        className="
        hidden lg:flex

        absolute
        top-5
        -right-3
        z-50

        w-7 h-7

        items-center justify-center

        rounded-xl

        bg-white

        border border-[#E7DFF2]

        shadow-sm

        hover:bg-[#F8F5FC]

        transition-all duration-200
        "
      >

        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-[#6E5AB6]" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-[#6E5AB6]" />
        )}

      </button>



      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b mt-2 border-[#E7DFF2]">

        <div
          className="
          h-14
          px-3
          flex items-center
          "
        >

          {/* LOGO */}
          <div
            className={`
            flex items-center

            ${isCollapsed
                ? "justify-center w-full"
                : "gap-2"
              }
            `}
          >

            <img
              src={logo_icon}
              alt="logo"
              className="
              w-10 h-10
             object-cover
             rounded-xl
             bg-[#5B3FD6]
             p-0.5
             border border-white/10
             shadow-lg
             shadow-cyan-500/20
             backdrop-blur-sm"
            />

            {!isCollapsed && (
              <div>

                <h2
                  className="
                  text-[16px]
                  font-bold
                  text-[#5B3FD6]
                  leading-none
                  "
                >
                  LoyaltyTown
                </h2>

                <p
                  className="
                  text-[9px]
                  text-[#8E8AA2]
                  mt-0.5
                  "
                >
                  Rewards Platform
                </p>

              </div>
            )}

          </div>

          {/* MOBILE CLOSE */}
          <button
            onClick={onClose}
            className="
            lg:hidden
            ml-auto
            p-1
            rounded-md
            hover:bg-white
            transition
            "
          >
            <X className="w-4 h-4 text-[#8E8AA2]" />
          </button>

        </div>

      </div>



      {/* =================================================
          MENU
      ================================================= */}

      <div
        className="
        flex-1
        overflow-y-auto

        px-2 py-2

        custom-scrollbar
        "
      >

        {filteredMenu.map((menu, idx) => (
          <div
            key={idx}
            className="mb-1.5"
          >

            {/* SECTION TITLE */}
            {!isCollapsed && (
              <h3
                className="
                text-[9px]
                uppercase
                tracking-[0.15em]

                text-[#AAA2BE]

                font-semibold

                px-3
                mb-1
                "
              >
                {menu.section}
              </h3>
            )}

            {/* ITEMS */}
            <ul className="space-y-0">

              {menu.items.map((item, i) => (
                <li key={i}>

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      flex items-center

                      ${isCollapsed
                        ? "justify-center"
                        : "gap-2.5"
                      }

                      px-3
                      py-[8px]

                      rounded-xl

                      text-[12.5px]
                      font-medium

                      transition-all duration-200

                      ${isActive
                        ? `
                            bg-[#5B3FD6]
                            text-white
                            shadow-sm
                          `
                        : `
                            text-[#5B5875]
                            hover:bg-[#E7DDF8]
                            hover:text-[#5B3FD6]
                          `
                      }
                      `
                    }
                  >

                    <item.icon className="w-[17px] h-[17px] min-w-[17px]" />

                    {!isCollapsed && (
                      <span>{item.name}</span>
                    )}

                  </NavLink>

                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>



      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        className="
        p-2.5

        border-t border-[#E7DFF2]
        "
      >

        {/* PROMO */}
        {!isCollapsed && (
          <div
            className="
            mb-2.5

            rounded-[20px]

            bg-[#5B3FD6]

            p-3.5

            text-white
            "
          >

            <div
              className="
              w-7 h-7

              rounded-lg

              bg-white/20

              flex items-center justify-center

              mb-2.5

              text-sm
              "
            >
              🔒
            </div>

            <p
              className="
              text-[10px]
              leading-4

              text-white/90
              "
            >
              Gain full access to rewards analytics and reports.
            </p>

            <button
              className="
              mt-3

              w-full

              py-2

              rounded-xl

              bg-white

              text-[#5B3FD6]

              text-[11px]
              font-semibold

              hover:bg-[#F8F5FC]

              transition
              "
            >
              Upgrade Plan
            </button>

          </div>
        )}

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="
          w-full

          flex items-center justify-center
          gap-2

          py-2

          rounded-xl

          bg-white

          border border-[#E7DFF2]

          text-[#E05A74]

          text-[12px]
          font-medium

          hover:bg-[#FFF1F3]

          transition-all duration-200
          "
        >

          <LogOut className="w-4 h-4" />

          {!isCollapsed && "Logout"}

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;