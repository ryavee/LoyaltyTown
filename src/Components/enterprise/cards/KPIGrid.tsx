import type { LucideIcon } from "lucide-react";
import { KpiCard } from "./KpiCard";

type KPIGridItem = {
  id: string;
  label: string;
  value: string | number;
  target?: string;
  progress?: number;
  icon?: LucideIcon;
};

type KPIGridProps = {
  items: KPIGridItem[];
};

export const KPIGrid = ({ items }: KPIGridProps) => (
  <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
    {items.map((item) => (
      <KpiCard
        key={item.id}
        label={item.label}
        value={item.value}
        target={item.target}
        progress={item.progress}
        icon={item.icon}
      />
    ))}
  </section>
);
