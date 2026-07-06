import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  tone?: "cyan" | "emerald" | "violet" | "amber" | "rose";
  icon?: LucideIcon;
};

const toneClass = {
  cyan: "from-cyan-400/20 to-blue-500/5 text-cyan-200 border-cyan-400/20",
  emerald: "from-emerald-400/20 to-teal-500/5 text-emerald-200 border-emerald-400/20",
  violet: "from-violet-400/20 to-fuchsia-500/5 text-violet-200 border-violet-400/20",
  amber: "from-amber-400/20 to-orange-500/5 text-amber-200 border-amber-400/20",
  rose: "from-rose-400/20 to-red-500/5 text-rose-200 border-rose-400/20",
};

export default function StatCard({ label, value, change, tone = "cyan", icon: Icon }: StatCardProps) {
  return (
    <article className={`rounded-2xl border bg-gradient-to-br ${toneClass[tone]} p-4 shadow-sm shadow-black/10`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/50 text-slate-900 dark:bg-slate-950/60 dark:text-white">
          {Icon ? <Icon className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">{change}</p>
    </article>
  );
}
