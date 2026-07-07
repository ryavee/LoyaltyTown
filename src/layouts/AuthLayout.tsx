import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden border-r border-white/10 bg-[radial-gradient(circle_at_top_left,#22d3ee33,transparent_34%),linear-gradient(135deg,#020617,#0f172a)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 font-bold text-slate-950">LT</div>
            <div>
              <p className="text-sm font-semibold">LoyaltyTown</p>
              <p className="text-xs text-slate-400">Global Distribution OS</p>
            </div>
          </div>
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Connected Product Cloud</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight">Run your manufacturer-to-customer network from one premium cockpit.</h1>
            <p className="mt-5 text-base leading-7 text-slate-300">Manufacturers, distributors, dealers, retailers, contractors, customers, QR journeys, rewards, and marketplace signals in one enterprise frontend foundation.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {["42K dealers", "92M QR scans", "$48M revenue"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-slate-200">{item}</div>
            ))}
          </div>
        </section>
        <main className="flex items-center justify-center px-4 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
