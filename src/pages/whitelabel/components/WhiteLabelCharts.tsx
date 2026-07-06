import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { tenantTrendData } from "../../../data/whitelabel/tenantDemoData";

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };

const charts = [
  ["Company Growth", "companies", "line"],
  ["Revenue Trend", "revenue", "bar"],
  ["Subscription Trend", "subscriptions", "line"],
  ["Storage Trend", "storage", "bar"],
];

export const TenantCharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {charts.map(([title, keyName, type]) => (
      <ChartCard key={title} title={title} description="Static tenant management trend." framed={false} minHeight="250px">
        <ResponsiveContainer width="100%" height={230}>
          {type === "bar" ? (
            <BarChart data={tenantTrendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={keyName} fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={tenantTrendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey={keyName} stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 3 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </ChartCard>
    ))}
  </div>
);
