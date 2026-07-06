import type { ReactNode } from "react";
import { cn, panelBase } from "../utils";

type ReusableFormLayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
};

export const ReusableFormLayout = ({ title, description, children, footer, columns = 2, className }: ReusableFormLayoutProps) => (
  <section className={cn(panelBase, "overflow-hidden", className)}>
    {(title || description) && (
      <div className="border-b border-slate-800 px-4 py-3">
        {title ? <h3 className="text-sm font-semibold text-white">{title}</h3> : null}
        {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      </div>
    )}
    <div className={cn("grid gap-4 p-4", columns === 1 && "grid-cols-1", columns === 2 && "md:grid-cols-2", columns === 3 && "md:grid-cols-2 xl:grid-cols-3")}>
      {children}
    </div>
    {footer ? <div className="border-t border-slate-800 px-4 py-3">{footer}</div> : null}
  </section>
);
