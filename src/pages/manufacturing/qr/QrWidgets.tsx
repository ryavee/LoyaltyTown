import { GitBranch, Printer, ShieldAlert } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Timeline } from "../../../Components/enterprise";
import { panelBase, cn } from "../../../Components/enterprise/utils";
import { aggregationNodes } from "../../../data/qr/gs1DemoData";
import { qrTimeline } from "../../../data/qr/qrCodeDemoData";
import { deviceScans, generationTrend, regionScans } from "../../../data/qr/scanAnalyticsDemoData";
import type { SecurityEvent } from "../../../data/qr/securityDemoData";
import { QrStatusBadge } from "./QrStatusBadge";

const chartTooltip = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
};

export const QrAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">QR Generation and Scan Trend</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={generationTrend}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Area dataKey="generated" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="scans" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Region-wise Scans</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionScans}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="region" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="scans" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            <Bar dataKey="users" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Scan Device Types</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deviceScans}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="scans" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Activations</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={generationTrend}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Line type="monotone" dataKey="activations" stroke="#fb7185" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

export const QrTimeline = () => (
  <Timeline items={qrTimeline.map((item) => ({ ...item, icon: GitBranch, tone: "info" }))} />
);

export const QrSecurityCard = ({ event }: { event: SecurityEvent }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-rose-300" />
          <p className="text-sm font-semibold text-white">{event.event}</p>
        </div>
        <p className="mt-2 text-sm text-slate-400">{event.serial} / {event.location}</p>
      </div>
      <QrStatusBadge status={event.severity} />
    </div>
    <div className="mt-4 h-2 rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-rose-400" style={{ width: `${event.riskScore}%` }} />
    </div>
    <p className="mt-2 text-xs text-slate-500">Risk score {event.riskScore}</p>
  </article>
);

export const QrPrintQueue = () => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex items-center gap-2">
      <Printer className="h-4 w-4 text-cyan-300" />
      <h2 className="text-sm font-semibold text-white">Print Queue</h2>
    </div>
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {["Zebra ZT411", "Honeywell PX940", "TSC MB240"].map((printer, index) => (
        <div key={printer} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">{printer}</p>
          <p className="mt-2 text-xs text-slate-500">{index === 0 ? "Ready" : index === 1 ? "Printing 12 jobs" : "Failed jobs require review"}</p>
        </div>
      ))}
    </div>
  </section>
);

export const HierarchyViewer = () => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex items-center gap-2">
      <GitBranch className="h-4 w-4 text-cyan-300" />
      <h2 className="text-sm font-semibold text-white">Hierarchy Tree</h2>
    </div>
    <div className="mt-4 space-y-3">
      {aggregationNodes.map((node, index) => (
        <div key={node.id} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-xs font-semibold text-cyan-200">{index + 1}</div>
          <div className="flex-1 rounded-lg border border-slate-800 bg-slate-900/70 p-3">
            <p className="text-sm font-semibold text-white">{node.label}</p>
            <p className="text-xs text-slate-500">{node.id} / parent {node.parent} / qty {node.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
