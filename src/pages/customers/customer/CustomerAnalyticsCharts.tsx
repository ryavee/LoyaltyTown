import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { customerTrendData } from "../../../data/customer/customerDemoData";

const chartTooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

export const CustomerAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Customer Growth and Acquisition</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={customerTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Area dataKey="growth" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} /><Area dataKey="acquisition" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Repeat Purchase and Wallet Trend</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={customerTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Line type="monotone" dataKey="repeat" stroke="#34d399" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="wallet" stroke="#f59e0b" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Referral and Warranty Trend</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={customerTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Bar dataKey="referrals" fill="#fb7185" radius={[6, 6, 0, 0]} /><Bar dataKey="warranty" fill="#22d3ee" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Top Cities</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={customerTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Bar dataKey="cities" fill="#34d399" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
  </section>
);
