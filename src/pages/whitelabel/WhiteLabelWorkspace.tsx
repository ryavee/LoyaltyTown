import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Download, Globe2, Palette, Plus, RefreshCw, Upload } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, KPIGrid, PageToolbar, Pagination, PrimaryButton, ReusableFormLayout, SearchInput, SecondaryButton, Select, TextInput } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { domains, mobileBranding } from "../../data/whitelabel/domainDemoData";
import { featureFlags } from "../../data/whitelabel/featureDemoData";
import { companySubscriptions, subscriptionPlans } from "../../data/whitelabel/subscriptionDemoData";
import { tenantKpis, tenants, tenantUsers } from "../../data/whitelabel/tenantDemoData";
import { previewPanels, usageRows } from "../../data/whitelabel/usageDemoData";
import { DomainCard, MobilePreview, PreviewPanel, SubscriptionCard, TenantCard, ThemePreview, UsageCard } from "./components/WhiteLabelCards";
import { TenantCharts } from "./components/WhiteLabelCharts";
import { BrandStudio } from "./components/WhiteLabelStudio";
import { FeatureFlagTable, GenericWhiteLabelTable, TenantTable } from "./components/WhiteLabelTables";
import { WhiteLabelStatusBadge } from "./components/WhiteLabelStatusBadge";

type WhiteLabelMode =
  | "tenants"
  | "tenant-create"
  | "tenant-details"
  | "tenant-edit"
  | "branding"
  | "domains"
  | "mobile-branding"
  | "features"
  | "company-users"
  | "subscriptions"
  | "analytics"
  | "preview";

const meta: Record<WhiteLabelMode, { title: string; description: string; label: string }> = {
  tenants: { title: "Tenant Management", description: "Multi-tenant company dashboard for companies, trials, revenue, storage, API usage, QR volume, and customer count.", label: "Tenants" },
  "tenant-create": { title: "Create Tenant", description: "Static tenant creation form for company profile, localization, data region, assets, and status.", label: "Tenants" },
  "tenant-details": { title: "Company Profile", description: "Overview, branding, subscription, usage, storage, users, security, apps, billing, analytics, history, and audit log.", label: "Tenants" },
  "tenant-edit": { title: "Edit Tenant", description: "Static company profile edit form for white-label tenant administration.", label: "Tenants" },
  branding: { title: "Branding Studio", description: "Logo upload, colors, typography, buttons, cards, icons, login, dashboard, sidebar, email, SMS, WhatsApp, and Consumer PWA themes.", label: "Branding" },
  domains: { title: "Domain Management", description: "Custom domains, SSL, DNS verification, status, and tenant domain preview.", label: "Domains" },
  "mobile-branding": { title: "Mobile App Branding", description: "Android, iOS, splash screen, app icon, package name, bundle ID, app name, and Firebase config placeholder.", label: "Mobile Branding" },
  features: { title: "White Label Features", description: "Feature dashboard, feature matrix, enable/disable, role assignment, and plan assignment.", label: "Features" },
  "company-users": { title: "Tenant Users", description: "Users, roles, permissions, departments, and invitations.", label: "Users" },
  subscriptions: { title: "Subscription Management", description: "Subscription, upgrade, downgrade, renewal, invoices, and usage.", label: "Subscriptions" },
  analytics: { title: "Tenant Analytics", description: "Company usage, QR usage, storage usage, API usage, revenue, and growth.", label: "Analytics" },
  preview: { title: "White Label Preview", description: "Preview tenant, login, dashboard, Consumer PWA, and mobile experiences.", label: "Preview" },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: WhiteLabelMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode === "branding" ? <Palette className="h-5 w-5" /> : mode === "domains" ? <Globe2 className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">White Label Platform</p>
        </div>
      }
      end={
        <>
          <Link to="/tenants/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />Create Tenant
          </Link>
          <SecondaryButton icon={Upload}>Upload</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Trial", "Suspended", "Pending", "Enabled", "Disabled"].map((value) => ({ label: value, value }))} />
    <Select label="Plan" value="" onChange={() => undefined} placeholder="All plans" options={["Starter", "Growth", "Professional", "Enterprise"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const TenantForm = ({ edit = false }: { edit?: boolean }) => (
  <ReusableFormLayout title={edit ? "Edit Company Profile" : "Create Company Profile"} description="Static tenant form prepared for backend tenant provisioning." columns={3} footer={<PrimaryButton>{edit ? "Save Tenant" : "Create Tenant"}</PrimaryButton>}>
    <TextInput label="Company Name" defaultValue="Apex Industrial Coatings" />
    <TextInput label="Company Code" defaultValue="APX" />
    <TextInput label="Industry" defaultValue="Paints & Coatings" />
    <TextInput label="Website" defaultValue="apex.example" />
    <TextInput label="GST" defaultValue="27AABCA1234F1Z5" />
    <TextInput label="Country" defaultValue="India" />
    <TextInput label="Timezone" defaultValue="Asia/Kolkata" />
    <TextInput label="Currency" defaultValue="INR" />
    <TextInput label="Language" defaultValue="English" />
    <TextInput label="Data Region" defaultValue="India West" />
    <TextInput label="Company Logo" defaultValue="apex-logo.svg" />
    <TextInput label="Company Banner" defaultValue="apex-banner.jpg" />
    <Select label="Status" value="Active" onChange={() => undefined} options={["Active", "Trial", "Suspended", "Expired"].map((value) => ({ label: value, value }))} />
  </ReusableFormLayout>
);

const TenantDetails = () => {
  const { id } = useParams();
  const tenant = tenants.find((item) => item.id === id) || tenants[0];
  const tabs = ["Overview", "Branding", "Subscription", "Usage", "Storage", "Users", "Security", "Apps", "Billing", "Analytics", "History", "Audit Log"];
  return (
    <div className="space-y-4">
      <TenantCard tenant={tenant} />
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => <button key={tab} className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800">{tab}</button>)}
        </div>
      </section>
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Company Profile Fields</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(tenant).filter(([key]) => key !== "id").map(([key, value]) => (
            <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <div className="mt-2 text-sm font-semibold text-white">{key === "status" ? <WhiteLabelStatusBadge status={String(value)} /> : String(value)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const TenantsView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(tenants, query);
  return (
    <>
      <KPIGrid items={tenantKpis} />
      <TenantCharts />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{filtered.map((tenant) => <TenantCard key={tenant.id} tenant={tenant} />)}</div>
      <TenantTable rows={filtered} />
    </>
  );
};

const DomainsView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3">{domains.map((domain) => <DomainCard key={domain.id} domain={domain} />)}</div>
    <GenericWhiteLabelTable rows={domains} />
  </>
);

const MobileBrandingView = () => (
  <div className="grid gap-4 xl:grid-cols-[1fr_0.55fr]">
    <GenericWhiteLabelTable rows={mobileBranding} />
    <MobilePreview />
  </div>
);

const SubscriptionsView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3">{companySubscriptions.map((item) => <SubscriptionCard key={item.id} subscription={item} />)}</div>
    <GenericWhiteLabelTable rows={subscriptionPlans} />
  </>
);

const AnalyticsView = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      <UsageCard title="Company Usage" value="428" description="Active and trial tenants" />
      <UsageCard title="QR Usage" value="1.8B" description="Generated across tenants" />
      <UsageCard title="Storage Usage" value="182TB" description="Regional tenant storage" />
      <UsageCard title="API Usage" value="184M" description="Monthly API calls" />
      <UsageCard title="Revenue" value="₹42.8Cr" description="FY platform revenue" />
      <UsageCard title="Growth" value="+18.4%" description="Tenant growth trend" />
    </div>
    <TenantCharts />
    <GenericWhiteLabelTable rows={usageRows} />
  </>
);

const PreviewView = () => (
  <div className="grid gap-4 xl:grid-cols-[1fr_0.55fr]">
    <section className="grid gap-4 md:grid-cols-2">{previewPanels.map((panel) => <PreviewPanel key={panel.id} panel={panel} />)}</section>
    <div className="space-y-4"><ThemePreview title="Preview Dashboard" /><MobilePreview /></div>
  </div>
);

const WhiteLabelWorkspace = ({ mode = "tenants" }: { mode?: WhiteLabelMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const filteredUsers = useFilteredRows(tenantUsers, query);
  const filteredFeatures = useFilteredRows(featureFlags, query);
  const showFilters = ["tenants", "features", "company-users"].includes(mode);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {showFilters ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "tenants" ? <TenantsView query={query} /> : null}
      {mode === "tenant-create" ? <TenantForm /> : null}
      {mode === "tenant-edit" ? <TenantForm edit /> : null}
      {mode === "tenant-details" ? <TenantDetails /> : null}
      {mode === "branding" ? <BrandStudio /> : null}
      {mode === "domains" ? <DomainsView /> : null}
      {mode === "mobile-branding" ? <MobileBrandingView /> : null}
      {mode === "features" ? <FeatureFlagTable rows={filteredFeatures} /> : null}
      {mode === "company-users" ? <GenericWhiteLabelTable rows={filteredUsers} /> : null}
      {mode === "subscriptions" ? <SubscriptionsView /> : null}
      {mode === "analytics" ? <AnalyticsView /> : null}
      {mode === "preview" ? <PreviewView /> : null}
      {showFilters ? <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${current.title}`} /> : null}
    </div>
  );
};

export default WhiteLabelWorkspace;
