import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-cyan-950/20 dark:bg-slate-900 dark:text-white">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Sign in to LoyaltyTown</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Access the core enterprise frontend foundation with mock demo data.</p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Email</span>
          <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-800 dark:bg-slate-950">
            <Mail className="h-4 w-4 text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" defaultValue="admin@loyaltytown.com" />
          </div>
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Password</span>
          <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-800 dark:bg-slate-950">
            <LockKeyhole className="h-4 w-4 text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" type="password" defaultValue="loyaltytown" />
          </div>
        </label>
      </form>

      <Link to="/dashboard/manufacturer" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
        Continue to dashboard
        <ArrowRight className="h-4 w-4" />
      </Link>

      <p className="mt-5 text-center text-xs text-slate-500">Static frontend only. No authentication API is connected.</p>
    </section>
  );
}
