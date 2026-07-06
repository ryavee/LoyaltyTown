import { Building2, Database, Globe2, ImageUp, MonitorSmartphone, Palette, Smartphone, Upload } from "lucide-react";
import { SecondaryButton } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import type { TenantRecord } from "../../../data/whitelabel/tenantDemoData";
import { WhiteLabelStatusBadge } from "./WhiteLabelStatusBadge";

export const TenantCard = ({ tenant }: { tenant: TenantRecord }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300"><Building2 className="h-5 w-5" /></div>
        <div>
          <h3 className="text-sm font-semibold text-white">{tenant.companyName}</h3>
          <p className="mt-1 text-xs text-slate-500">{tenant.companyCode} • {tenant.industry}</p>
        </div>
      </div>
      <WhiteLabelStatusBadge status={tenant.status} />
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Revenue</p><p className="font-semibold text-white">{tenant.revenue}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Storage</p><p className="font-semibold text-white">{tenant.storageUsed}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Customers</p><p className="font-semibold text-white">{tenant.customerCount}</p></div>
    </div>
  </article>
);

export const UsageCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <Database className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);

export const DomainCard = ({ domain }: { domain: { domain: string; type: string; ssl: string; dnsVerification: string; preview: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <Globe2 className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{domain.domain}</h3>
    <p className="mt-1 text-sm text-slate-400">{domain.type} • SSL {domain.ssl}</p>
    <p className="mt-2 text-xs text-slate-500">DNS: {domain.dnsVerification} • Preview: {domain.preview}</p>
    <div className="mt-4"><WhiteLabelStatusBadge status={domain.status} /></div>
  </article>
);

export const SubscriptionCard = ({ subscription }: { subscription: { company: string; plan: string; renewal: string; invoices: string; usage: string; action: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">{subscription.company}</h3>
    <p className="mt-1 text-sm text-cyan-200">{subscription.plan}</p>
    <p className="mt-3 text-sm text-slate-400">Renewal: {subscription.renewal}</p>
    <p className="mt-1 text-xs text-slate-500">{subscription.invoices} • Usage {subscription.usage} • {subscription.action}</p>
    <div className="mt-4"><WhiteLabelStatusBadge status={subscription.status} /></div>
  </article>
);

export const LogoUploader = () => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">Logo Uploader</h3>
    <div className="mt-4 grid min-h-40 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/60 text-center">
      <div>
        <ImageUp className="mx-auto h-8 w-8 text-cyan-300" />
        <p className="mt-2 text-sm font-medium text-slate-200">Drag and drop logo assets</p>
        <p className="mt-1 text-xs text-slate-500">Logo upload, dark logo, light logo, favicon, banner placeholder.</p>
        <SecondaryButton className="mt-3" icon={Upload}>Select Assets</SecondaryButton>
      </div>
    </div>
  </section>
);

export const ColorPicker = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-center gap-3">
      <span className="h-9 w-9 rounded-md border border-slate-700" style={{ backgroundColor: value }} />
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-slate-500">{value}</p>
      </div>
    </div>
  </div>
);

export const ThemePreview = ({ title = "Theme Preview" }: { title?: string }) => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Palette className="h-4 w-4 text-cyan-300" />{title}</h3>
    <div className="mt-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="h-6 w-32 rounded bg-cyan-400/30" />
        <div className="flex gap-2"><span className="h-7 w-7 rounded bg-slate-800" /><span className="h-7 w-7 rounded bg-slate-800" /></div>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-[0.35fr_0.65fr]">
        <div className="space-y-2 rounded-md bg-slate-900 p-3">{["Dashboard", "Products", "Customers", "Reports"].map((item) => <div key={item} className="rounded bg-slate-800 px-3 py-2 text-xs text-slate-300">{item}</div>)}</div>
        <div className="grid gap-3 md:grid-cols-2"><div className="h-24 rounded-md bg-cyan-400/10" /><div className="h-24 rounded-md bg-emerald-400/10" /><div className="h-28 rounded-md bg-slate-900 md:col-span-2" /></div>
      </div>
    </div>
  </section>
);

export const MobilePreview = () => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Smartphone className="h-4 w-4 text-cyan-300" />Mobile Preview</h3>
    <div className="mx-auto mt-4 w-full max-w-64 rounded-[28px] border border-slate-700 bg-slate-950 p-3">
      <div className="rounded-[20px] bg-slate-900 p-4">
        <div className="mx-auto h-10 w-10 rounded-xl bg-cyan-400/30" />
        <h4 className="mt-4 text-center text-sm font-semibold text-white">Apex Rewards</h4>
        <div className="mt-4 space-y-2"><div className="h-10 rounded-lg bg-cyan-400" /><div className="h-10 rounded-lg bg-slate-800" /><div className="h-24 rounded-lg bg-slate-800/70" /></div>
      </div>
    </div>
  </section>
);

export const PreviewPanel = ({ panel }: { panel: { title: string; description: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <MonitorSmartphone className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{panel.title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{panel.description}</p>
  </article>
);
