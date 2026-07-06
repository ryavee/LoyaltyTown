import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/PageHeader";
import { chartData, topBrands, topCities, topDealers } from "../../data/loyaltyTownDemoData";

const tooltip = { contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "12px", color: "#e2e8f0" } };

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
      <PageHeader title="Analytics Overview" description="Revenue, network growth, scan trends, top cities, top dealers, and top brands across the global LoyaltyTown network." />
      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Revenue Chart</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip {...tooltip} />
                <Line dataKey="revenue" stroke="#22d3ee" strokeWidth={3} dot={false} />
                <Line dataKey="orders" stroke="#34d399" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Network Growth and Scan Trend</h2>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip {...tooltip} />
                <Bar dataKey="network" fill="#a78bfa" radius={[8, 8, 0, 0]} />
                <Bar dataKey="scans" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <ListCard title="Top Cities" rows={topCities} />
        <ListCard title="Top Dealers" rows={topDealers} />
        <ListCard title="Top Brands" rows={topBrands} />
      </section>
    </div>
  );
}
