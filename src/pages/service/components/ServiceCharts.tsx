import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { warrantyTrendData } from "../../../data/service/warrantyDemoData";

type ChartConfig = {
  title: string;
  description: string;
  keyName: keyof (typeof warrantyTrendData)[number];
  type?: "line" | "bar";
};

const charts: ChartConfig[] = [
  { title: "Warranty Trend", description: "Registered warranties by month.", keyName: "warranties", type: "line" },
  { title: "Claims Trend", description: "Warranty claims by month.", keyName: "claims", type: "line" },
  { title: "Products Under Warranty", description: "Covered product base.", keyName: "products", type: "bar" },
  { title: "Warranty by Region", description: "Regional registrations.", keyName: "region", type: "bar" },
  { title: "Claim Reasons", description: "Claim reason mix.", keyName: "reasons", type: "bar" },
  { title: "Resolution Time", description: "Average hours to resolve.", keyName: "resolution", type: "line" },
  { title: "Customer Satisfaction", description: "CSAT trend.", keyName: "csat", type: "line" },
  { title: "Warranty Cost Analysis", description: "Estimated liability in millions.", keyName: "cost", type: "bar" },
];

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };

export const AnalyticsCharts = ({ compact = false }: { compact?: boolean }) => {
  const rendered = compact ? charts.slice(0, 6) : charts;

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {rendered.map((chart) => (
        <ChartCard key={chart.title} title={chart.title} description={chart.description} framed={false} minHeight="260px">
          <ResponsiveContainer width="100%" height={240}>
            {chart.type === "bar" ? (
              <BarChart data={warrantyTrendData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey={chart.keyName} fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={warrantyTrendData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey={chart.keyName} stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 3 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartCard>
      ))}
    </div>
  );
};
