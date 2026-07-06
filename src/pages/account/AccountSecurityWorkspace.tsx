import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Fingerprint,
  KeyRound,
  Laptop,
  LockKeyhole,
  MonitorSmartphone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserCircle,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { EnterpriseDataTable } from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise";

type AccountMode =
  | "profile"
  | "preferences"
  | "devices"
  | "sessions"
  | "2fa"
  | "password"
  | "api-tokens"
  | "activity-log";

type AccountRow = Record<string, string>;

const modeMeta: Record<AccountMode, { title: string; subtitle: string; icon: typeof UserCircle }> = {
  profile: {
    title: "Profile",
    subtitle: "Personal account information, contact details, organization context, and enterprise identity attributes.",
    icon: UserCircle,
  },
  preferences: {
    title: "Preferences",
    subtitle: "Workspace preferences, language, regional formats, notifications, and accessibility defaults.",
    icon: SlidersHorizontal,
  },
  devices: {
    title: "Devices",
    subtitle: "Trusted devices, browser fingerprints, operating systems, and device-level access visibility.",
    icon: MonitorSmartphone,
  },
  sessions: {
    title: "Sessions",
    subtitle: "Active and recent sessions across web, mobile, and API surfaces with enterprise audit readiness.",
    icon: Laptop,
  },
  "2fa": {
    title: "2FA",
    subtitle: "Two-factor authentication methods, recovery options, backup codes, and security enforcement state.",
    icon: Fingerprint,
  },
  password: {
    title: "Password",
    subtitle: "Password policy state, rotation guidance, reset readiness, and account protection controls.",
    icon: LockKeyhole,
  },
  "api-tokens": {
    title: "API Tokens",
    subtitle: "Personal access tokens, integration scopes, expiry windows, and token governance placeholders.",
    icon: KeyRound,
  },
  "activity-log": {
    title: "Activity Log",
    subtitle: "Account activity, profile changes, sign-in events, security actions, and user audit timeline.",
    icon: Activity,
  },
};

const rows: Record<AccountMode, AccountRow[]> = {
  profile: [
    { id: "USR-001", field: "Full name", value: "Enterprise Admin", visibility: "Organization", status: "Verified" },
    { id: "USR-002", field: "Primary email", value: "admin@loyaltytown.example", visibility: "Private", status: "Verified" },
    { id: "USR-003", field: "Department", value: "Platform Operations", visibility: "Organization", status: "Active" },
  ],
  preferences: [
    { id: "PRF-001", preference: "Theme", value: "Enterprise Dark", scope: "Workspace", status: "Enabled" },
    { id: "PRF-002", preference: "Timezone", value: "Asia/Kolkata", scope: "Account", status: "Active" },
    { id: "PRF-003", preference: "Notification digest", value: "Daily", scope: "Account", status: "Enabled" },
  ],
  devices: [
    { id: "DEV-101", device: "MacBook Pro", location: "Bengaluru, IN", lastSeen: "2 minutes ago", trust: "Trusted", status: "Active" },
    { id: "DEV-102", device: "iPhone 15", location: "Mumbai, IN", lastSeen: "1 day ago", trust: "Trusted", status: "Active" },
    { id: "DEV-103", device: "Chrome on Windows", location: "Delhi, IN", lastSeen: "6 days ago", trust: "Review", status: "Inactive" },
  ],
  sessions: [
    { id: "SES-771", surface: "Admin Web", ip: "103.24.18.42", started: "Today 09:12", expires: "8h", status: "Active" },
    { id: "SES-772", surface: "Mobile Portal", ip: "103.24.18.42", started: "Yesterday 18:45", expires: "Expired", status: "Closed" },
    { id: "SES-773", surface: "API Console", ip: "49.37.22.18", started: "Jun 28", expires: "Expired", status: "Closed" },
  ],
  "2fa": [
    { id: "2FA-001", method: "Authenticator app", configured: "Yes", recovery: "Available", policy: "Required", status: "Enabled" },
    { id: "2FA-002", method: "SMS backup", configured: "No", recovery: "Not set", policy: "Optional", status: "Disabled" },
    { id: "2FA-003", method: "Recovery codes", configured: "Yes", recovery: "6 remaining", policy: "Recommended", status: "Active" },
  ],
  password: [
    { id: "PWD-001", policy: "Minimum length", requirement: "12 characters", current: "Compliant", status: "Healthy" },
    { id: "PWD-002", policy: "Rotation", requirement: "180 days", current: "86 days remaining", status: "Healthy" },
    { id: "PWD-003", policy: "Breach check", requirement: "Continuous", current: "No exposure", status: "Healthy" },
  ],
  "api-tokens": [
    { id: "TOK-431", name: "Reporting export token", scope: "Reports:Read", expires: "30 days", owner: "Enterprise Admin", status: "Active" },
    { id: "TOK-432", name: "BI connector token", scope: "Analytics:Read", expires: "90 days", owner: "Enterprise Admin", status: "Active" },
    { id: "TOK-433", name: "Legacy integration", scope: "Settings:Read", expires: "Expired", owner: "Enterprise Admin", status: "Revoked" },
  ],
  "activity-log": [
    { id: "ACT-901", event: "Profile updated", surface: "Admin Web", actor: "Enterprise Admin", time: "Today 10:18", status: "Success" },
    { id: "ACT-902", event: "New device trusted", surface: "Security", actor: "Enterprise Admin", time: "Yesterday 19:42", status: "Success" },
    { id: "ACT-903", event: "API token revoked", surface: "API Console", actor: "Enterprise Admin", time: "Jun 28", status: "Success" },
  ],
};

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Active: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Enabled: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Verified: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Trusted: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  Inactive: "border-slate-600 bg-slate-800 text-slate-200",
  Closed: "border-slate-600 bg-slate-800 text-slate-200",
  Disabled: "border-slate-600 bg-slate-800 text-slate-200",
  Revoked: "border-rose-400/20 bg-rose-400/10 text-rose-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Inactive}`}>
    {value}
  </span>
);

const Header = ({ mode }: { mode: AccountMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Account Security</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{modeMeta[mode].title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{modeMeta[mode].subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["Security Score", "96%", ShieldCheck, "Enterprise policy ready"],
    ["Active Sessions", "3", Laptop, "Across trusted surfaces"],
    ["Trusted Devices", "2", Smartphone, "1 needs review"],
    ["Audit Events", "148", Activity, "Last 30 days"],
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
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search profile fields, devices, sessions, tokens, and activity" />
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

const AccountTable = ({ data }: { data: AccountRow[] }) => {
  const columns: DataTableColumn<AccountRow>[] = Object.keys(data[0] || {}).map((column) => ({
    id: column,
    header: column.replace(/([A-Z])/g, " $1"),
    accessor: column,
    cell: (row) => (column === "status" || column === "trust" ? <StatusBadge value={row[column]} /> : row[column]),
  }));

  return (
    <section className="space-y-0">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Account Records</h2>
          <p className="text-xs text-slate-500">Static table placeholder for future identity and audit APIs.</p>
        </div>
        <button className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">
          Columns
        </button>
      </div>
      <EnterpriseDataTable rows={data} columns={columns} className="rounded-t-none border-t-0" />
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1-3 of 3 records</span>
        <div className="flex gap-2">
          <button className="rounded-md border border-slate-800 px-3 py-1.5 text-slate-300">Previous</button>
          <button className="rounded-md border border-slate-800 px-3 py-1.5 text-slate-300">Next</button>
        </div>
      </div>
    </section>
  );
};

const SecurityPanel = ({ mode }: { mode: AccountMode }) => {
  const checks = [
    ["Two-factor authentication", "Enabled", Fingerprint],
    ["Password policy", "Healthy", LockKeyhole],
    ["Trusted device review", mode === "devices" ? "Review" : "Active", MonitorSmartphone],
    ["Notification preferences", "Enabled", Bell],
  ];

  return (
    <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <h2 className="text-sm font-semibold text-white">Security Posture</h2>
        <p className="mt-1 text-xs text-slate-500">Controls are visual placeholders for future account services.</p>
        <div className="mt-5 space-y-3">
          {checks.map(([label, status, Icon]) => (
            <div key={label as string} className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-300">{label}</span>
              </div>
              <StatusBadge value={status as string} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <h2 className="text-sm font-semibold text-white">Activity Timeline</h2>
        <p className="mt-1 text-xs text-slate-500">Recent account and security events.</p>
        <div className="mt-5 space-y-4">
          {rows["activity-log"].map((event) => (
            <div key={event.id} className="relative pl-6">
              <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300" />
              <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{event.event}</p>
                  <span className="text-xs text-slate-500">{event.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{event.surface} by {event.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmptyState = () => (
  <section className="rounded-lg border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-cyan-300">
      <ShieldCheck className="h-6 w-6" />
    </div>
    <h2 className="mt-4 text-base font-semibold text-white">Account services ready for integration</h2>
    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
      This workspace provides the enterprise account, security, device, session, token, and activity surfaces without implementing authentication logic.
    </p>
  </section>
);

const AccountSecurityWorkspace = ({ mode = "profile" }: { mode?: AccountMode }) => {
  const [query, setQuery] = useState("");
  const data = useMemo(() => {
    const activeRows = rows[mode] || rows.profile;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return activeRows;
    return activeRows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(normalized)));
  }, [mode, query]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <AppBreadcrumbs />
        <Header mode={mode} />
        <Metrics />
        <Toolbar query={query} onQueryChange={setQuery} />
        <SecurityPanel mode={mode} />
        <AccountTable data={data} />
        <EmptyState />
      </div>
    </div>
  );
};

export default AccountSecurityWorkspace;
