import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  Building2,
  Factory,
  Handshake,
  Home,
  Package,
  QrCode,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  UsersRound,
  WalletCards,
  Wrench,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/global/dashboard/manufacturer", icon: Home },
  { label: "Companies", path: "/global/analytics", icon: Building2 },
  { label: "Manufacturers", path: "/global/dashboard/manufacturer", icon: Factory },
  { label: "Distributors", path: "/global/dashboard/distributor", icon: Truck },
  { label: "Dealers", path: "/global/dashboard/dealer", icon: Handshake },
  { label: "Retailers", path: "/global/dashboard/retailer", icon: Store },
  { label: "Contractors", path: "/global/dashboard/contractor", icon: Wrench },
  { label: "Products", path: "/global/analytics", icon: Package },
  { label: "QR Engine", path: "/global/qr-engine", icon: QrCode },
  { label: "Orders", path: "/global/analytics", icon: ShoppingCart },
  { label: "Inventory", path: "/global/analytics", icon: Boxes },
  { label: "Wallet", path: "/global/analytics", icon: WalletCards },
  { label: "Rewards", path: "/global/analytics", icon: BellRing },
  { label: "Marketplace", path: "/global/marketplace", icon: UsersRound },
  { label: "Analytics", path: "/global/analytics", icon: BarChart3 },
  { label: "AI Assistant", path: "/global/analytics", icon: Bot },
  { label: "Settings", path: "/global/analytics", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:sticky lg:top-0 lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-cyan-500/20 dark:bg-cyan-400 dark:text-slate-950">
              LT
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">LoyaltyTown</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Global Distribution OS</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
