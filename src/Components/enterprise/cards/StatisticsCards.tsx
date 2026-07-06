import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { StatItem } from "../types";
import { cn, panelBase, toneClasses } from "../utils";

type StatisticsCardsProps = {
  items: StatItem[];
  className?: string;
};

export const StatisticsCards = ({ items, className }: StatisticsCardsProps) => (
  <div className={cn("grid gap-3 md:grid-cols-2 xl:grid-cols-4", className)}>
    {items.map((item) => {
      const Icon = item.icon;
      const TrendIcon = item.trend === "up" ? ArrowUpRight : item.trend === "down" ? ArrowDownRight : ArrowRight;
      return (
        <div key={item.id} className={cn(panelBase, "p-4")}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
            </div>
            {Icon ? (
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border", toneClasses[item.tone || "info"])}>
                <Icon className="h-4 w-4" />
              </div>
            ) : null}
          </div>
          {item.change ? (
            <p className="mt-3 inline-flex items-center gap-1 text-sm text-slate-400">
              <TrendIcon className={cn("h-4 w-4", item.trend === "up" && "text-emerald-300", item.trend === "down" && "text-rose-300")} />
              {item.change}
            </p>
          ) : null}
        </div>
      );
    })}
  </div>
);
