import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Brush,
  Cloud,
  Download,
  Eye,
  Flag,
  Globe2,
  Image,
  LockKeyhole,
  MonitorSmartphone,
  Palette,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  ToggleRight,
  Upload,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";

type BrandingMode =
  | "branding"
  | "logo"
  | "theme"
  | "colors"
  | "domain"
  | "ssl"
  | "android-branding"
  | "ios-branding"
  | "feature-flags"
  | "customization";

type BrandingRow = Record<string, string>;

const modeMeta: Record<BrandingMode, { title: string; subtitle: string; icon: typeof Settings }> = {
  branding: { title: "Branding", subtitle: "Brand identity, tenant display rules, customer-facing naming, and brand governance.", icon: Brush },
  logo: { title: "Logo", subtitle: "Logo assets, favicon, app icons, dark/light variants, and approval status.", icon: Image },
  theme: { title: "Theme", subtitle: "Theme presets, dark mode defaults, typography, density, and surface styling.", icon: MonitorSmartphone },
  colors: { title: "Colors", subtitle: "Primary, secondary, accent, semantic, and channel color tokens.", icon: Palette },
  domain: { title: "Domain", subtitle: "Custom domain mapping, DNS readiness, tenant URLs, and routing configuration.", icon: Globe2 },
  ssl: { title: "SSL", subtitle: "Certificate status, expiry, validation, renewal, and secure domain readiness.", icon: LockKeyhole },
  "android-branding": { title: "Android Branding", subtitle: "Android app name, package branding, launcher assets, and store metadata.", icon: Smartphone },
  "ios-branding": { title: "iOS Branding", subtitle: "iOS app naming, icon assets, bundle branding, and App Store readiness.", icon: Smartphone },
  "feature-flags": { title: "Feature Flags", subtitle: "Tenant-level flags, rollout state, beta access, and future permission-ready controls.", icon: Flag },
  customization: { title: "Customization", subtitle: "Tenant UI preferences, module visibility, localization, and white-label configuration.", icon: Settings },
};

const rows: Record<BrandingMode, BrandingRow[]> = {
  branding: [
    { id: "BRD-001", item: "Brand Name", value: "Apex Connected Products", scope: "Tenant", owner: "Brand Admin", status: "Active" },
    { id: "BRD-002", item: "Portal Title", value: "Apex Rewards Cloud", scope: "Consumer App", owner: "Marketing", status: "Review" },
    { id: "BRD-003", item: "Email Sender", value: "Apex Support", scope: "Notifications", owner: "Lifecycle", status: "Active" },
  ],
  logo: [
    { id: "LOG-001", item: "Primary Logo", value: "logo-primary.svg", scope: "Enterprise", owner: "Design", status: "Active" },
    { id: "LOG-002", item: "Dark Logo", value: "logo-dark.svg", scope: "Dark Theme", owner: "Design", status: "Active" },
    { id: "LOG-003", item: "Favicon", value: "favicon.ico", scope: "Web", owner: "Platform", status: "Review" },
  ],
  theme: [
    { id: "THM-001", item: "Default Theme", value: "Enterprise Dark", scope: "All Apps", owner: "Platform", status: "Active" },
    { id: "THM-002", item: "Density", value: "Compact", scope: "Admin Shell", owner: "Product", status: "Active" },
    { id: "THM-003", item: "Typography", value: "System UI", scope: "Global", owner: "Design", status: "Active" },
  ],
  colors: [
    { id: "CLR-001", item: "Primary", value: "#22D3EE", scope: "Buttons", owner: "Design", status: "Active" },
    { id: "CLR-002", item: "Success", value: "#34D399", scope: "Status", owner: "Design", status: "Active" },
    { id: "CLR-003", item: "Warning", value: "#F59E0B", scope: "Alerts", owner: "Design", status: "Active" },
  ],
  domain: [
    { id: "DOM-001", item: "Admin Domain", value: "admin.apex.example", scope: "Enterprise", owner: "IT", status: "Verified" },
    { id: "DOM-002", item: "Consumer Domain", value: "rewards.apex.example", scope: "Consumer", owner: "IT", status: "Pending" },
    { id: "DOM-003", item: "API Domain", value: "api.apex.example", scope: "Integration", owner: "Platform", status: "Verified" },
  ],
  ssl: [
    { id: "SSL-001", item: "Admin Certificate", value: "Expires in 82 days", scope: "Enterprise", owner: "IT", status: "Valid" },
    { id: "SSL-002", item: "Consumer Certificate", value: "DNS validation pending", scope: "Consumer", owner: "IT", status: "Pending" },
    { id: "SSL-003", item: "Wildcard Certificate", value: "*.apex.example", scope: "Tenant", owner: "Platform", status: "Valid" },
  ],
  "android-branding": [
    { id: "AND-001", item: "App Name", value: "Apex Rewards", scope: "Android", owner: "Mobile", status: "Active" },
    { id: "AND-002", item: "Launcher Icon", value: "android-icon-v4", scope: "Android", owner: "Design", status: "Review" },
    { id: "AND-003", item: "Splash Screen", value: "splash-dark", scope: "Android", owner: "Mobile", status: "Active" },
  ],
  "ios-branding": [
    { id: "IOS-001", item: "App Name", value: "Apex Rewards", scope: "iOS", owner: "Mobile", status: "Active" },
    { id: "IOS-002", item: "App Icon", value: "ios-icon-v4", scope: "iOS", owner: "Design", status: "Review" },
    { id: "IOS-003", item: "Launch Screen", value: "launch-dark", scope: "iOS", owner: "Mobile", status: "Active" },
  ],
  "feature-flags": [
    { id: "FLG-001", item: "AI Insights", value: "Enabled", scope: "Enterprise", owner: "Product", status: "Active" },
    { id: "FLG-002", item: "Consumer Wallet v2", value: "Beta", scope: "Consumer App", owner: "Product", status: "Review" },
    { id: "FLG-003", item: "GS1 Preview", value: "Enabled", scope: "Manufacturing", owner: "Platform", status: "Active" },
  ],
  customization: [
    { id: "CUS-001", item: "Module Visibility", value: "Role based", scope: "Enterprise", owner: "Admin", status: "Active" },
    { id: "CUS-002", item: "Locale", value: "English", scope: "Global", owner: "Admin", status: "Active" },
    { id: "CUS-003", item: "White Label", value: "Enabled", scope: "Tenant", owner: "Platform", status: "Active" },
  ],
};

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Valid: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Pending: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Review}`}>{value}</span>
);

const Header = ({ mode }: { mode: BrandingMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">White Label Settings</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{modeMeta[mode].title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{modeMeta[mode].subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["Brand Assets", "42", Image, "Approved"],
    ["Domains", "3", Globe2, "2 verified"],
    ["SSL Health", "98%", ShieldCheck, "Valid"],
    ["Feature Flags", "18", ToggleRight, "4 beta"],
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, Icon, hint]) => (
        <div key={label as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">{hint}</p>
        </div>
      ))}
    </section>
  );
};

const Toolbar = ({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) => (
  <section className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 lg:flex-row lg:items-center">
    <label className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search branding settings" />
    </label>
    <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
      <RefreshCw className="h-4 w-4" />
      Refresh
    </button>
  </section>
);

const PreviewPanel = ({ mode }: { mode: BrandingMode }) => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-cyan-300" />
        <h2 className="text-sm font-semibold text-white">Brand Preview</h2>
      </div>
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
            <Cloud className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Apex Rewards Cloud</p>
            <p className="text-sm text-slate-400">Connected Product Cloud</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["#22D3EE", "#34D399", "#F59E0B"].map((color) => (
            <div key={color} className="rounded-md border border-slate-800 bg-slate-950 p-3">
              <div className="h-12 rounded-md" style={{ backgroundColor: color }} />
              <p className="mt-2 text-xs font-semibold text-slate-300">{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <aside className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
      <BadgeCheck className="h-5 w-5 text-cyan-200" />
      <h2 className="mt-3 text-sm font-semibold text-white">{modeMeta[mode].title} Readiness</h2>
      <p className="mt-2 text-sm leading-6 text-cyan-50/80">Configuration surface is ready for backend-backed validation, uploads, DNS checks, and tenant policy controls.</p>
    </aside>
  </section>
);

const DataTable = ({ mode, filteredRows }: { mode: BrandingMode; filteredRows: BrandingRow[] }) => {
  const columns = ["id", "item", "value", "scope", "owner", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{modeMeta[mode].title} Settings</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable settings table placeholder ready for tenant configuration APIs.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[880px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {filteredRows.map((row) => (
          <div key={row.id} className="grid min-w-[880px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
            {columns.map((column) => (
              <span key={column} className="min-w-0 truncate">
                {column === "status" ? <StatusBadge value={row[column]} /> : row[column]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredRows.length} settings</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const BrandingWorkspace = ({ mode = "branding" }: { mode?: BrandingMode }) => {
  const [query, setQuery] = useState("");
  const data = rows[mode];
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(q)));
  }, [data, query]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics />
      <Toolbar query={query} onQueryChange={setQuery} />
      <PreviewPanel mode={mode} />
      <DataTable mode={mode} filteredRows={filteredRows} />
    </div>
  );
};

export default BrandingWorkspace;
