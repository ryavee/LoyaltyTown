import type { ReactNode } from "react";
import { panelBase, cn } from "../utils";

type DetailItem = {
  label: string;
  value: ReactNode;
};

type DetailsPanelProps = {
  title: string;
  description?: string;
  items?: DetailItem[];
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const DetailsPanel = ({ title, description, items = [], actions, children, className }: DetailsPanelProps) => (
  <section className={cn(panelBase, "overflow-hidden", className)}>
    <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-4 py-3">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
    {items.length ? (
      <dl className="grid gap-px bg-slate-800 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="bg-slate-950 p-4">
            <dt className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">{item.label}</dt>
            <dd className="mt-2 text-sm text-slate-200">{item.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}
    {children ? <div className="p-4">{children}</div> : null}
  </section>
);
