import type { ReactNode } from "react";
import { cn } from "../utils";

type PageToolbarProps = {
  title?: string;
  description?: string;
  start?: ReactNode;
  end?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const PageToolbar = ({ title, description, start, end, children, className }: PageToolbarProps) => (
  <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", className)}>
    <div className="min-w-0">
      {start}
      {title ? <h1 className="truncate text-2xl font-semibold text-white md:text-3xl">{title}</h1> : null}
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
      {children}
    </div>
    {end ? <div className="flex flex-wrap items-center gap-2">{end}</div> : null}
  </div>
);
