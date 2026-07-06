import { Activity, CheckCircle2, Clock, HeartPulse, ShieldCheck } from "lucide-react";
import {
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
import { ActivityFeed, ChartCard, DashboardWidget, EnterpriseDataTable, StatisticsCards } from "../../../Components/enterprise";
import type { DataTableColumn, TimelineItem } from "../../../Components/enterprise";
import { productionChartData } from "../../../data/manufacturing/productionDemoData";
import { qualityChecklist } from "../../../data/manufacturing/qcDemoData";

const tooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: 8, color: "#e2e8f0" } };

export const MachineHealthCard = ({ health = "98%" }: { health?: string }) => (
  <DashboardWidget title="Machine Health" subtitle="Static health telemetry placeholder." actions={<HeartPulse className="h-5 w-5 text-cyan-300" />}>
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-4xl font-semibold text-white">{health}</p>
        <p className="mt-2 text-sm text-slate-400">Composite health score</p>
      </div>
      <div className="h-20 w-20 rounded-full border-8 border-cyan-400/30 border-t-cyan-300" />
    </div>
  </DashboardWidget>
);

export const ProductionTimeline = () => {
  const items: TimelineItem[] = [
    { id: "one", title: "Order planned", description: "Materials and line reserved.", timestamp: "08:00", icon: Clock, tone: "info" },
    { id: "two", title: "Production started", description: "Shift supervisor confirmed start.", timestamp: "09:15", icon: Activity, tone: "success" },
    { id: "three", title: "QC checkpoint", description: "Quality checkpoint in progress.", timestamp: "12:40", icon: ShieldCheck, tone: "warning" },
  ];
  return <ActivityFeed title="Production Timeline" items={items} />;
};

export const QualityChecklist = () => {
  const columns: DataTableColumn<(typeof qualityChecklist)[number]>[] = [
    { id: "check", header: "Check", accessor: "check" },
    { id: "result", header: "Result", accessor: "result" },
    { id: "owner", header: "Owner", accessor: "owner" },
  ];
  return (
    <DashboardWidget title="Quality Checklist" subtitle="QC checkpoint readiness.">
      <EnterpriseDataTable rows={qualityChecklist} columns={columns} />
    </DashboardWidget>
  );
};

export const DowntimeChart = () => (
  <ChartCard title="Downtime Chart" description="Downtime hours by day." framed={false} contentClassName="h-72" minHeight="288px">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={productionChartData}>
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
        <XAxis dataKey="day" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip {...tooltip} />
        <Bar dataKey="downtime" fill="#fb7185" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

export const RejectRateChart = () => (
  <ChartCard title="Reject Rate Chart" description="Reject rate percentage trend." framed={false} contentClassName="h-72" minHeight="288px">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={productionChartData}>
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
        <XAxis dataKey="day" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip {...tooltip} />
        <Line type="monotone" dataKey="rejectRate" stroke="#f59e0b" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

export const LinePerformanceCards = () => (
  <StatisticsCards
    items={[
      { id: "throughput", label: "Throughput", value: "91.4K", icon: Activity, tone: "success", change: "+8.2%", trend: "up" },
      { id: "downtime", label: "Downtime", value: "2.4h", icon: Clock, tone: "warning", change: "-12%", trend: "down" },
      { id: "reject", label: "Reject Rate", value: "0.8%", icon: ShieldCheck, tone: "info", change: "Within limit", trend: "neutral" },
      { id: "qc", label: "QC Passed", value: "97.8%", icon: CheckCircle2, tone: "success", change: "+1.4%", trend: "up" },
    ]}
  />
);
