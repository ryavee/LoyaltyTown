import { Circle } from "lucide-react";
import type { TimelineItem } from "../types";
import { cn, toneClasses } from "../utils";

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export const Timeline = ({ items, className }: TimelineProps) => (
  <ol className={cn("space-y-4", className)}>
    {items.map((item, index) => {
      const Icon = item.icon || Circle;
      return (
        <li key={item.id} className="relative flex gap-3">
          {index < items.length - 1 ? <span className="absolute left-4 top-9 h-[calc(100%+8px)] w-px bg-slate-800" /> : null}
          <div className={cn("z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border", toneClasses[item.tone || "default"])}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              {item.timestamp ? <span className="text-xs text-slate-500">{item.timestamp}</span> : null}
            </div>
            {item.description ? <div className="mt-1 text-sm leading-6 text-slate-400">{item.description}</div> : null}
          </div>
        </li>
      );
    })}
  </ol>
);
