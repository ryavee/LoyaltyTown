import { Activity, ArchiveRestore, Building2, HardDrive, Server } from "lucide-react";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { PlatformStatusBadge } from "./PlatformStatusBadge";

export const PlatformHealthCard = ({ item }: { item: { title: string; value: string; status: string; description: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        <Server className="h-5 w-5" />
      </div>
      <PlatformStatusBadge status={item.status} />
    </div>
    <p className="mt-4 text-sm text-slate-500">{item.title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
  </article>
);

export const SystemHealthWidget = PlatformHealthCard;

export const CompanyProfile = ({ company }: { company: Record<string, unknown> }) => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300"><Building2 className="h-5 w-5" /></div>
        <div>
          <h3 className="text-base font-semibold text-white">{String(company.company)}</h3>
          <p className="mt-1 text-sm text-slate-500">{String(company.plan)} • {String(company.region)}</p>
        </div>
      </div>
      <PlatformStatusBadge status={String(company.status)} />
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-4">
      {["revenue", "qr", "owner", "plan"].map((key) => (
        <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key}</p>
          <p className="mt-2 text-sm font-semibold text-white">{String(company[key])}</p>
        </div>
      ))}
    </div>
  </section>
);

export const BackupCard = ({ row }: { row: Record<string, unknown> }) => (
  <article className={cn(panelBase, "p-4")}>
    <ArchiveRestore className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{String(row.backup || row.plan)}</h3>
    <p className="mt-2 text-sm text-slate-400">{String(row.schedule || row.rto)} • {String(row.lastRun || row.rpo)}</p>
    <p className="mt-2 text-xs text-slate-500">{String(row.size || row.owner)} • {String(row.restore || row.failover)}</p>
    <div className="mt-4"><PlatformStatusBadge status={String(row.status)} /></div>
  </article>
);

export const OpsMetricCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <Activity className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);

export const StorageCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <HardDrive className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </article>
);
