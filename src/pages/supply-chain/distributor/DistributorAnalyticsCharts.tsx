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
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { distributorTrendData } from "../../../data/distributor/distributorDemoData";

const chartTooltip = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
};

export const DistributorAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Distributor Sales Trend</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={distributorTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Area dataKey="sales" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="orders" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Payment Collection Trend</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={distributorTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Line type="monotone" dataKey="collections" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="schemes" stroke="#fb7185" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Territory Performance</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distributorTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            <Bar dataKey="collections" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Inventory Movement</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={distributorTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Line type="monotone" dataKey="inventory" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);
