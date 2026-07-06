import { useMemo, useState } from "react";
import {
  Building2,
  CloudCog,
  CreditCard,
  Download,
  FileKey2,
  FileText,
  Filter,
  KeyRound,
  Mail,
  MessageCircle,
  Percent,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Upload,
  UserCog,
  Users,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";

type AdminSettingsMode =
  | "users"
  | "roles"
  | "permissions"
  | "departments"
  | "smtp"
  | "sms"
  | "whatsapp"
  | "payments"
  | "taxes"
  | "audit-logs"
  | "api-keys"
  | "integrations";

type SettingsRow = Record<string, string>;

const modeMeta: Record<AdminSettingsMode, { title: string; subtitle: string; icon: typeof Users }> = {
  users: { title: "Users", subtitle: "Tenant users, access status, authentication readiness, and admin governance.", icon: Users },
  roles: { title: "Roles", subtitle: "Reusable role groups, role scopes, assignments, and future RBAC policies.", icon: UserCog },
  permissions: { title: "Permissions", subtitle: "Permission catalog, module access, action scopes, and permission-ready UI.", icon: KeyRound },
  departments: { title: "Departments", subtitle: "Business departments, ownership, reporting lines, and operating structure.", icon: Building2 },
  smtp: { title: "SMTP", subtitle: "Email delivery configuration, sender identity, authentication, and test status.", icon: Mail },
  sms: { title: "SMS", subtitle: "SMS provider configuration, sender IDs, OTP readiness, and delivery controls.", icon: Send },
  whatsapp: { title: "WhatsApp", subtitle: "WhatsApp provider setup, business templates, webhook readiness, and delivery status.", icon: MessageCircle },
  payments: { title: "Payments", subtitle: "Payment gateway readiness, settlement methods, capture rules, and payout controls.", icon: CreditCard },
  taxes: { title: "Taxes", subtitle: "Tax rules, GST/VAT settings, regions, invoice treatment, and compliance readiness.", icon: Percent },
  "audit-logs": { title: "Audit Logs", subtitle: "Administrative audit trail, user actions, configuration changes, and security events.", icon: FileText },
  "api-keys": { title: "API Keys", subtitle: "API key inventory, scopes, expiry, owners, and integration access controls.", icon: FileKey2 },
  integrations: { title: "Integrations", subtitle: "Connected systems, provider health, sync status, and integration ownership.", icon: CloudCog },
};

const rows: Record<AdminSettingsMode, SettingsRow[]> = {
  users: [
    { id: "USR-001", name: "Nisha Kapoor", scope: "Tenant Admin", owner: "Apex Industrial", policy: "MFA", status: "Active" },
    { id: "USR-002", name: "Rahul Mehta", scope: "Sales Manager", owner: "Apex Industrial", policy: "SSO", status: "Active" },
    { id: "USR-003", name: "Pooja Sen", scope: "Support Lead", owner: "Apex Industrial", policy: "MFA", status: "Review" },
  ],
  roles: [
    { id: "ROL-001", name: "Admin", scope: "All modules", owner: "Security", policy: "Full access", status: "Active" },
    { id: "ROL-002", name: "Sales Ops", scope: "CRM + Dealers", owner: "Sales", policy: "Scoped access", status: "Active" },
    { id: "ROL-003", name: "Warehouse Ops", scope: "Inventory", owner: "Supply Chain", policy: "Scoped access", status: "Draft" },
  ],
  permissions: [
    { id: "PER-001", name: "products.read", scope: "Manufacturing", owner: "Platform", policy: "Read", status: "Active" },
    { id: "PER-002", name: "wallet.adjust", scope: "Loyalty", owner: "Finance", policy: "Approval required", status: "Review" },
    { id: "PER-003", name: "settings.manage", scope: "Settings", owner: "Security", policy: "Admin only", status: "Active" },
  ],
  departments: [
    { id: "DEP-001", name: "Manufacturing", scope: "Operations", owner: "Factory Head", policy: "Default", status: "Active" },
    { id: "DEP-002", name: "Channel Sales", scope: "Sales", owner: "Sales Head", policy: "Default", status: "Active" },
    { id: "DEP-003", name: "Customer Support", scope: "Service", owner: "Support Head", policy: "Default", status: "Active" },
  ],
  smtp: [
    { id: "SMTP-001", name: "Primary SMTP", scope: "Transactional", owner: "IT", policy: "TLS", status: "Verified" },
    { id: "SMTP-002", name: "Marketing SMTP", scope: "Campaigns", owner: "Marketing Ops", policy: "DKIM", status: "Review" },
    { id: "SMTP-003", name: "Support SMTP", scope: "Support", owner: "Support Ops", policy: "SPF", status: "Verified" },
  ],
  sms: [
    { id: "SMS-001", name: "OTP Provider", scope: "Authentication", owner: "Security", policy: "DLT approved", status: "Active" },
    { id: "SMS-002", name: "Campaign SMS", scope: "Marketing", owner: "Growth", policy: "Opt-in only", status: "Review" },
    { id: "SMS-003", name: "Service Alerts", scope: "Operations", owner: "Support Ops", policy: "Transactional", status: "Active" },
  ],
  whatsapp: [
    { id: "WSP-001", name: "Business Account", scope: "WhatsApp", owner: "Marketing Ops", policy: "Approved templates", status: "Active" },
    { id: "WSP-002", name: "Reward Templates", scope: "Rewards", owner: "Lifecycle", policy: "Template review", status: "Review" },
    { id: "WSP-003", name: "Support Webhook", scope: "Support", owner: "Support Ops", policy: "Webhook verified", status: "Active" },
  ],
  payments: [
    { id: "PAY-001", name: "Primary Gateway", scope: "Subscriptions", owner: "Finance", policy: "Auto capture", status: "Active" },
    { id: "PAY-002", name: "Payout Account", scope: "Cashback", owner: "Finance", policy: "Approval required", status: "Review" },
    { id: "PAY-003", name: "UPI Settlement", scope: "Rewards", owner: "Finance", policy: "Daily settlement", status: "Active" },
  ],
  taxes: [
    { id: "TAX-001", name: "GST India", scope: "India", owner: "Finance", policy: "18%", status: "Active" },
    { id: "TAX-002", name: "VAT GCC", scope: "MEA", owner: "Finance", policy: "Region based", status: "Draft" },
    { id: "TAX-003", name: "Invoice Rounding", scope: "Global", owner: "Finance", policy: "Nearest unit", status: "Active" },
  ],
  "audit-logs": [
    { id: "AUD-001", name: "Role updated", scope: "Security", owner: "Nisha Kapoor", policy: "Immutable", status: "Logged" },
    { id: "AUD-002", name: "API key rotated", scope: "Integrations", owner: "Platform", policy: "Immutable", status: "Logged" },
    { id: "AUD-003", name: "Payment config changed", scope: "Finance", owner: "Finance Ops", policy: "Immutable", status: "Review" },
  ],
  "api-keys": [
    { id: "KEY-001", name: "ERP Connector", scope: "Inventory", owner: "Integrations", policy: "90 day rotation", status: "Active" },
    { id: "KEY-002", name: "Consumer App", scope: "Public API", owner: "Mobile", policy: "Scoped", status: "Active" },
    { id: "KEY-003", name: "Analytics Export", scope: "Reports", owner: "Analytics", policy: "Read only", status: "Review" },
  ],
  integrations: [
    { id: "INT-001", name: "SAP ERP", scope: "Manufacturing", owner: "Integrations", policy: "Scheduled sync", status: "Connected" },
    { id: "INT-002", name: "Razorpay", scope: "Payments", owner: "Finance", policy: "Webhook", status: "Connected" },
    { id: "INT-003", name: "WhatsApp BSP", scope: "Messaging", owner: "Marketing Ops", policy: "Templates", status: "Review" },
  ],
};

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Connected: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Logged: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Draft: "border-slate-600 bg-slate-800 text-slate-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Review}`}>{value}</span>
);

const Header = ({ mode }: { mode: AdminSettingsMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Administration Settings</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{modeMeta[mode].title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{modeMeta[mode].subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Upload className="h-4 w-4" />
          Import
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["Users", "1,248", Users, "92% active"],
    ["Roles", "42", UserCog, "RBAC ready"],
    ["Integrations", "18", CloudCog, "14 connected"],
    ["Audit Events", "84K", FileText, "Immutable log"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search administration settings" />
    </label>
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Filter className="h-4 w-4" />
        Filters
      </button>
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  </section>
);

const ConfigPanel = ({ mode }: { mode: AdminSettingsMode }) => (
  <section className="grid gap-4 lg:grid-cols-3">
    {[
      ["Access", "Permission-ready structure for role, scope, and future policy enforcement."],
      ["Security", "MFA, SSO, key rotation, audit trail, and provider validation surfaces."],
      ["Connectivity", "SMTP, SMS, WhatsApp, payments, taxes, and integration readiness."],
    ].map(([title, detail]) => (
      <div key={title} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <ShieldCheck className="h-5 w-5 text-cyan-300" />
        <h2 className="mt-4 text-sm font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{modeMeta[mode].title}</p>
      </div>
    ))}
  </section>
);

const DataTable = ({ mode, filteredRows }: { mode: AdminSettingsMode; filteredRows: SettingsRow[] }) => {
  const columns = ["id", "name", "scope", "owner", "policy", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">{modeMeta[mode].title} Records</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable settings table placeholder ready for backend integration.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[980px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {filteredRows.map((row) => (
          <div key={row.id} className="grid min-w-[980px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
            {columns.map((column) => (
              <span key={column} className="min-w-0 truncate">
                {column === "status" ? <StatusBadge value={row[column]} /> : row[column]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredRows.length} records</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const AdministrationSettings = ({ mode = "users" }: { mode?: AdminSettingsMode }) => {
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
      <ConfigPanel mode={mode} />
      <DataTable mode={mode} filteredRows={filteredRows} />
    </div>
  );
};

export default AdministrationSettings;
