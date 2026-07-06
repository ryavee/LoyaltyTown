import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { financeTrendData } from "../../../data/finance/financeDemoData";

type ChartConfig = {
  title: string;
  description: string;
  keyName: keyof (typeof financeTrendData)[number];
  type?: "line" | "bar";
};

const charts: ChartConfig[] = [
  { title: "Revenue Trend", description: "Monthly platform revenue in crores.", keyName: "revenue", type: "line" },
  { title: "Subscription Growth", description: "Active tenant subscription count.", keyName: "subscriptions", type: "line" },
  { title: "Invoice Collection", description: "Collection percentage by month.", keyName: "invoices", type: "bar" },
  { title: "Payment Methods", description: "UPI share across payment methods.", keyName: "upi", type: "bar" },
  { title: "Monthly Recurring Revenue", description: "MRR in crores.", keyName: "mrr", type: "line" },
  { title: "GST Summary", description: "GST collected in crores.", keyName: "gst", type: "bar" },
];

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };

export const FinanceCharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {charts.map((chart) => (
      <ChartCard key={chart.title} title={chart.title} description={chart.description} framed={false} minHeight="260px">
        <ResponsiveContainer width="100%" height={240}>
          {chart.type === "bar" ? (
            <BarChart data={financeTrendData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={chart.keyName} fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={financeTrendData}>
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
