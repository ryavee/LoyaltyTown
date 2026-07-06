import { BarChart3, FileBarChart, Lightbulb, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { ReportStatusBadge } from "./ReportStatusBadge";

export const ReportCatalogCard = ({ report }: { report: { id: string; title: string; description: string; owner: string; downloads: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        <FileBarChart className="h-5 w-5" />
      </div>
      <ReportStatusBadge status={report.status} />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-white">{report.title}</h3>
    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{report.description}</p>
    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
      <span>{report.owner}</span>
      <span>{report.downloads} downloads</span>
    </div>
    <Link to={`/reports/${report.id}`} className="mt-4 inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
      Open Report
    </Link>
  </article>
);

export const BIKpiCard = ({ label, value, target }: { label: string; value: string | number; target?: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    {target ? <p className="mt-2 text-sm text-cyan-200">{target}</p> : null}
  </article>
);

export const BIChartCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className={cn(panelBase, "p-4")}>
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <BarChart3 className="h-4 w-4 text-cyan-300" />
    </div>
    {children}
  </section>
);

export const ExecutiveInsightCard = ({ insight }: { insight: { title: string; insight: string; impact: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <Lightbulb className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{insight.title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{insight.insight}</p>
    <div className="mt-4"><ReportStatusBadge status={insight.impact} /></div>
  </article>
);

export const DashboardBuilderCanvas = () => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-white">Dashboard Builder Canvas</h3>
        <p className="mt-1 text-sm text-slate-500">Widget library for KPI, chart, and table widgets.</p>
      </div>
      <SecondaryButton icon={Plus}>Save Dashboard</SecondaryButton>
    </div>
    <div className="mt-4 grid min-h-80 gap-4 rounded-lg border border-dashed border-slate-800 bg-slate-900/50 p-4 md:grid-cols-3">
      {["KPI Widget", "Chart Widget", "Table Widget"].map((widget) => (
        <div key={widget} className="grid place-items-center rounded-lg border border-slate-800 bg-slate-950/70 text-sm font-semibold text-slate-300">{widget}</div>
      ))}
    </div>
  </section>
);
