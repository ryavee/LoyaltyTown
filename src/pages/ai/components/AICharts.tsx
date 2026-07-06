import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { aiTrendData } from "../../../data/ai/aiDashboardDemoData";

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };

const chartConfigs = [
  ["Fraud Trend", "fraud", "line"],
  ["Forecast vs Actual", "forecast", "line"],
  ["OCR Success Rate", "ocr", "bar"],
  ["Recommendation Conversion", "recommendations", "bar"],
  ["Demand Forecast Trend", "demand", "line"],
  ["Inventory Risk Trend", "inventory", "line"],
];

export const ForecastChart = ({ title = "Forecast vs Actual" }: { title?: string }) => (
  <ChartCard title={title} description="Static AI forecasting chart." framed={false} minHeight="260px">
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={aiTrendData}>
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="forecast" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 3 }} />
        <Line type="monotone" dataKey="actual" stroke="#34d399" strokeWidth={2.5} dot={{ fill: "#34d399", r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

export const AICharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {chartConfigs.map(([title, keyName, type]) => (
      <ChartCard key={title} title={title} description="Static AI platform trend." framed={false} minHeight="250px">
        <ResponsiveContainer width="100%" height={230}>
          {type === "bar" ? (
            <BarChart data={aiTrendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={keyName} fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={aiTrendData}>
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
