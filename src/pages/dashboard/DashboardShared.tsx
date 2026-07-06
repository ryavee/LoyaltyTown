import { BarChart3, Building2, Handshake, QrCode, ShoppingCart, Trophy } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { chartData, platformStats } from "../../data/loyaltyTownDemoData";

type RoleDashboardProps = {
  title: string;
  subtitle: string;
  highlights: string[][];
};

const icons = [Building2, Handshake, QrCode, ShoppingCart, Trophy, BarChart3];
const tooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "12px", color: "#e2e8f0" } };

export default function DashboardShared({ title, subtitle, highlights }: RoleDashboardProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={subtitle}
        actions={
          <>
            <button className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Export</button>
            <button className="h-10 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Create Workflow</button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {platformStats.slice(0, 10).map((stat, index) => <StatCard key={stat.label} {...stat} icon={icons[index % icons.length]} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Revenue and QR Scan Trend</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip {...tooltip} />
                <Area dataKey="revenue" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
                <Area dataKey="scans" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Network Growth</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip {...tooltip} />
                <Bar dataKey="network" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="orders" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map(([heading, detail], index) => {
          const Icon = icons[index % icons.length];
          return (
            <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{heading}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{detail}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
