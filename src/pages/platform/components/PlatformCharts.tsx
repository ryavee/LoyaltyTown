import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { platformTrendData } from "../../../data/platform/platformDemoData";

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };
const charts = [
  ["Company Growth", "companies", "line"],
  ["Revenue Growth", "revenue", "bar"],
  ["API Usage", "api", "line"],
  ["Storage Trend", "storage", "bar"],
  ["Platform Health", "health", "line"],
];

export const PlatformAnalyticsCharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {charts.map(([title, keyName, type]) => (
      <ChartCard key={title} title={title} description="Static platform operations trend." framed={false} minHeight="250px">
        <ResponsiveContainer width="100%" height={230}>
          {type === "bar" ? (
            <BarChart data={platformTrendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={keyName} fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={platformTrendData}>
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

export const ApiUsageChart = () => <PlatformAnalyticsCharts />;
