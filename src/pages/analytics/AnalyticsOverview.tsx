import type { ReactNode } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { chartData, topBrands, topCities, topDealers } from "../../data/loyaltyTownDemoData";
import { BarChart3, QrCode, TrendingUp, UsersRound } from "lucide-react";

const tooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "12px", color: "#e2e8f0" } };

const ChartCard = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
    <div>
      <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
    </div>
    <div className="mt-4 h-72">{children}</div>
  </article>
);

const ListCard = ({ title, rows }: { title: string; rows: string[] }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
    <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h2>
    <div className="mt-4 space-y-3">
      {rows.map((row, index) => (
        <div key={row} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-950/70">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{row}</span>
          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-300">#{index + 1}</span>
        </div>
      ))}
    </div>
  </article>
);

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics Overview" description="Executive analytics for revenue, QR scan adoption, network growth, dealer performance, reward payouts, and ERP sync health." />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Revenue Index" value="73" change="+18.4% YoY" tone="emerald" icon={TrendingUp} />
        <StatCard label="QR Scan Index" value="104" change="+31% campaign lift" tone="violet" icon={QrCode} />
        <StatCard label="Network Growth" value="74" change="+312 companies" tone="cyan" icon={UsersRound} />
        <StatCard label="ERP Sync Health" value="98%" change="+2.1% uptime" tone="amber" icon={BarChart3} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Revenue index across the global LoyaltyTown network.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Area dataKey="revenue" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="QR Scan Trend" description="Verified product scans and channel activation momentum.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Line dataKey="scans" stroke="#a78bfa" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Network Growth" description="Growth across manufacturers, distributors, dealers, retailers, and contractors.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Bar dataKey="network" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Dealer Performance" description="Dealer target completion and channel performance index.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Line dataKey="dealerPerformance" stroke="#34d399" strokeWidth={3} dot={false} />
              <Line dataKey="orders" stroke="#f59e0b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Reward Payout Trend" description="Reward payout velocity and loyalty liability movement.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Area dataKey="rewardPayout" stroke="#f43f5e" fill="#f43f5e22" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ERP Sync Health" description="ERP integration sync health across connected tenants.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltip} />
              <Bar dataKey="erpSync" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ListCard title="Top Cities" rows={topCities} />
        <ListCard title="Top Dealers" rows={topDealers} />
        <ListCard title="Top Brands" rows={topBrands} />
      </section>
    </div>
  );
}
