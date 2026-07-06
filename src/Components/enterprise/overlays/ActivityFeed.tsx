import { Activity } from "lucide-react";
import type { TimelineItem } from "../types";
import { panelBase, cn } from "../utils";
import { Timeline } from "./Timeline";

type ActivityFeedProps = {
  items: TimelineItem[];
  title?: string;
  className?: string;
};

export const ActivityFeed = ({ items, title = "Activity feed", className }: ActivityFeedProps) => (
  <section className={cn(panelBase, "p-4", className)}>
    <div className="mb-4 flex items-center gap-2">
      <Activity className="h-4 w-4 text-cyan-300" />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
    <Timeline items={items} />
  </section>
);
