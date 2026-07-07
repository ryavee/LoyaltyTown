type StatusBadgeProps = {
  status: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
};

const toneClass = {
  success: "border-emerald-400/25 bg-emerald-400/10 text-emerald-700 dark:text-emerald-200",
  warning: "border-amber-400/25 bg-amber-400/10 text-amber-700 dark:text-amber-200",
  danger: "border-rose-400/25 bg-rose-400/10 text-rose-700 dark:text-rose-200",
  info: "border-cyan-400/25 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200",
  neutral: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export default function StatusBadge({ status, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass[tone]}`}>
      {status}
    </span>
  );
}
