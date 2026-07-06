import type { ReactNode } from "react";
import { cn } from "../utils";

type PageSectionProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export const PageSection = ({ title, description, actions, children, className }: PageSectionProps) => (
  <section className={cn("space-y-4", className)}>
    {(title || description || actions) && (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    )}
    {children}
  </section>
);
