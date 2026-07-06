import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export default function PageHeader({ eyebrow = "LoyaltyTown Global OS", title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
