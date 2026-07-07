import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  Building2,
  Cable,
  Cog,
  DatabaseZap,
  DraftingCompass,
  Factory,
  Handshake,
  Home,
  MapPinned,
  Megaphone,
  Package,
  QrCode,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Warehouse,
  UsersRound,
  WalletCards,
  Wrench,
} from "lucide-react";

const navGroups = [
  {
    title: "Dashboard",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: Home },
      { label: "Admin Dashboard", path: "/dashboard/super-admin", icon: BarChart3 },
    ],
  },
  {
    title: "Core Modules",
    items: [
      { label: "Products", path: "/products", icon: Package },
      { label: "QR Management", path: "/qr-management", icon: QrCode },
      { label: "Customers", path: "/customers", icon: UsersRound },
      { label: "Loyalty", path: "/loyalty", icon: WalletCards },
      { label: "Rewards", path: "/rewards", icon: BellRing },
      { label: "Warranty", path: "/warranty", icon: ShieldCheck },
      { label: "Traceability", path: "/traceability", icon: Route },
    ],
  },
  {
    title: "Manufacturer Cloud",
    items: [
      { label: "Companies", path: "/global/analytics", icon: Building2 },
      { label: "Manufacturers", path: "/manufacturers", icon: Factory },
      { label: "Factories", path: "/manufacturer/factories", icon: Factory },
      { label: "Production", path: "/manufacturer/production", icon: Cog },
      { label: "Quality Control", path: "/manufacturer/quality-control", icon: ShieldCheck },
      { label: "Products", path: "/manufacturer/products", icon: Package },
      { label: "QR Engine", path: "/manufacturer/qr-engine", icon: QrCode },
      { label: "Traceability", path: "/manufacturer/traceability", icon: Route },
      { label: "Inventory", path: "/manufacturer/inventory", icon: Boxes },
      { label: "Warehouse", path: "/manufacturer/warehouse", icon: Warehouse },
      { label: "Procurement", path: "/manufacturer/procurement", icon: ShoppingCart },
    ],
  },
  {
    title: "Partner Network",
    items: [
      { label: "Manufacturers", path: "/manufacturers", icon: Factory },
      { label: "Distributors", path: "/distributors", icon: Truck },
      { label: "Dealers", path: "/dealers", icon: Handshake },
      { label: "Retailers", path: "/retailers", icon: Store },
      { label: "Contractors", path: "/contractors", icon: Wrench },
      { label: "Architects", path: "/architects", icon: DraftingCompass },
      { label: "Field Sales", path: "/field-sales", icon: MapPinned },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Orders", path: "/orders", icon: ShoppingCart },
      { label: "Dispatch", path: "/dispatch", icon: Truck },
      { label: "Warranty Service", path: "/warranty-service", icon: ShieldCheck },
    ],
  },
  {
    title: "Growth",
    items: [
      { label: "Channel Partners", path: "/channel-partners", icon: UsersRound },
      { label: "Marketing", path: "/marketing", icon: Megaphone },
      { label: "Campaign Pages", path: "/campaign-pages", icon: Megaphone },
      { label: "Fraud Alerts", path: "/fraud-alerts", icon: ShieldCheck },
      { label: "Marketplace", path: "/marketplace", icon: UsersRound },
    ],
  },
  {
    title: "ERP",
    items: [
      { label: "Finance", path: "/finance", icon: WalletCards },
      { label: "ERP Choice", path: "/erp", icon: DatabaseZap },
      { label: "ERP Integrations", path: "/erp/integrations", icon: Cable },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", path: "/analytics-reports", icon: BarChart3 },
      { label: "AI Assistant", path: "/ai-assistant", icon: Bot },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Architecture", path: "/architecture", icon: Building2 },
      { label: "Business Profiles", path: "/business-profiles", icon: UsersRound },
      { label: "Settings", path: "/settings", icon: Settings },
    ],
  },
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
          <div className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-2 px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                    {group.title}
                  </p>
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-slate-950 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                          }`
                        }
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
