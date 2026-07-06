import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../../../Components/enterprise";
import { biTrendData } from "../../../data/reports/businessIntelligenceDemoData";
import { reportUsageTrend } from "../../../data/reports/reportDemoData";

const tooltipStyle = { backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" };

export const ReportChartPreview = ({ title = "Report Usage Trend", dataKey = "usage" }: { title?: string; dataKey?: string }) => (
  <ChartCard title={title} description="Static report chart preview." framed={false} minHeight="260px">
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={reportUsageTrend}>
        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey={dataKey} stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
);

export const ReportsDashboardCharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    <ReportChartPreview title="Report Usage Trend" dataKey="usage" />
    <ReportChartPreview title="Export Volume" dataKey="exports" />
    <ChartCard title="Department-wise Reports" description="Sales, QR, and Finance report usage." framed={false} minHeight="260px">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={reportUsageTrend}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          <Bar dataKey="qr" fill="#818cf8" radius={[6, 6, 0, 0]} />
          <Bar dataKey="finance" fill="#34d399" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
    <ReportChartPreview title="Top Downloaded Reports" dataKey="exports" />
  </div>
);

export const BICharts = () => (
  <div className="grid gap-4 xl:grid-cols-2">
    {[
      ["Revenue BI", "revenue"],
      ["Sell-in BI", "sellIn"],
      ["Sell-out BI", "sellOut"],
      ["QR Scan BI", "scans"],
      ["Customer Growth BI", "customers"],
      ["Fraud Risk BI", "risk"],
    ].map(([title, keyName]) => (
      <ChartCard key={title} title={title} description="Executive business intelligence trend." framed={false} minHeight="250px">
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={biTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey={keyName} stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    ))}
  </div>
);
