import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { loyaltyTrendData } from "../../../data/loyalty/loyaltyDemoData";

const chartTooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" } };

export const LoyaltyAnalyticsCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Points and Redemption Analytics</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={loyaltyTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Area dataKey="points" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} /><Area dataKey="redemptions" stroke="#34d399" fill="#34d39922" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Cashback and Tier Analytics</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={loyaltyTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Line type="monotone" dataKey="cashback" stroke="#a78bfa" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="tiers" stroke="#f59e0b" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Fraud Hold Analytics</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={loyaltyTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Bar dataKey="fraud" fill="#fb7185" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
    <div className={cn(panelBase, "p-4")}><h2 className="text-sm font-semibold text-white">Reward Liability Analytics</h2><div className="mt-4 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={loyaltyTrendData}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#64748b" /><YAxis stroke="#64748b" /><Tooltip {...chartTooltip} /><Bar dataKey="liability" fill="#22d3ee" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
  </section>
);
