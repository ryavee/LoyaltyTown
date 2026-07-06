import { CalendarDays, CheckCircle2, Clock, FileBarChart, PhoneCall } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { activities, followups } from "../../../data/crm/activityDemoData";
import { crmTrendData } from "../../../data/crm/crmDemoData";
import type { OpportunityRecord } from "../../../data/crm/opportunityDemoData";
import { CrmStatusBadge } from "./CrmStatusBadge";

const chartTooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

export const CrmAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Lead Qualification Trend</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={crmTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Area dataKey="leads" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} /><Area dataKey="qualified" stroke="#34d399" fill="#34d39922" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Pipeline and Won Deals</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={crmTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Bar dataKey="pipeline" fill="#22d3ee" radius={[6, 6, 0, 0]} /><Bar dataKey="won" fill="#a78bfa" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
  </section>
);

export const PipelineKanban = ({ rows }: { rows: OpportunityRecord[] }) => {
  const stages: OpportunityRecord["stage"][] = ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
  return (
    <section className="grid gap-4 xl:grid-cols-6">
      {stages.map((stage) => (
        <div key={stage} className={cn(panelBase, "min-h-72 p-3")}>
          <div className="flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-white">{stage}</h2><span className="text-xs text-slate-500">{rows.filter((row) => row.stage === stage).length}</span></div>
          <div className="mt-4 space-y-3">{rows.filter((row) => row.stage === stage).map((item) => <article key={item.id} className="rounded-md border border-slate-800 bg-slate-900/80 p-3"><p className="text-sm font-semibold text-white">{item.opportunityName}</p><p className="mt-1 text-xs text-slate-500">{item.account}</p><div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-semibold text-cyan-200">{item.estimatedValue}</span><CrmStatusBadge status={item.status} /></div></article>)}</div>
        </div>
      ))}
    </section>
  );
};

export const ActivityTimeline = () => (
  <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Activity Timeline</h2><div className="mt-4 space-y-3">{activities.map((item) => <div key={item.id} className="flex gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300"><Clock className="h-4 w-4" /></div><div><p className="text-sm font-semibold text-white">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p><p className="mt-1 text-[11px] text-slate-600">{item.timestamp}</p></div><div className="ml-auto"><CrmStatusBadge status={item.status} /></div></div>)}</div></section>
);

export const FollowupCards = () => (
  <section className="grid gap-4 md:grid-cols-3">{followups.map((item) => <article key={item.id} className={cn(panelBase, "p-4")}><PhoneCall className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-sm font-semibold text-white">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.relatedTo}</p><div className="mt-4 flex items-center justify-between"><span className="text-xs font-semibold text-slate-400">{item.due}</span><CrmStatusBadge status={item.priority} /></div></article>)}</section>
);

export const CalendarPlaceholder = () => (
  <section className={cn(panelBase, "p-4")}><div className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-cyan-300" /><h2 className="text-sm font-semibold text-white">Calendar View</h2></div><div className="mt-4 grid grid-cols-7 gap-2">{Array.from({ length: 35 }).map((_, index) => <div key={index} className="aspect-square rounded-md border border-slate-800 bg-slate-900/70 p-2 text-xs text-slate-500">{index + 1 <= 31 ? index + 1 : ""}</div>)}</div></section>
);

export const ReportTiles = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["Lead Source Report", "Pipeline Forecast", "Win Loss Report", "Sales Activity", "Account Health", "Follow-up SLA", "Meeting Productivity", "Owner Performance"].map((label) => <button key={label} className={cn(panelBase, "p-5 text-left transition hover:border-cyan-400/30 hover:bg-slate-900")}><FileBarChart className="h-6 w-6 text-cyan-300" /><p className="mt-4 text-sm font-semibold text-white">{label}</p><p className="mt-1 text-xs leading-5 text-slate-500">Static report tile ready for export workflow.</p></button>)}</section>
);

export const CrmDashboard = ({ insights }: { insights: string[] }) => (
  <div className="space-y-5">
    <CrmAnalyticsCharts />
    <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <ActivityTimeline />
      <section className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">CRM Insights</h2><div className="mt-4 space-y-3">{insights.map((insight) => <div key={insight} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-50/90">{insight}</div>)}</div></section>
    </section>
    <FollowupCards />
  </div>
);
