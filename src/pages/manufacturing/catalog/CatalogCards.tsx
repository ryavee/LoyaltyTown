import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { DashboardWidget, StatisticsCards } from "../../../Components/enterprise";
import type { StatItem } from "../../../Components/enterprise";
import { analyticsCards, type BrandRecord, type CategoryRecord, type SkuRecord } from "../../../data/catalogDemoData";
import { StatusBadge } from "./StatusBadge";

type CardProps<T> = {
  record: T;
  icon: LucideIcon;
};

const BaseCard = ({
  title,
  subtitle,
  status,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  status: string;
  icon: LucideIcon;
  children: ReactNode;
}) => (
  <DashboardWidget
    title={title}
    subtitle={subtitle}
    actions={<Icon className="h-5 w-5 text-cyan-300" />}
  >
    <div className="mb-4">
      <StatusBadge status={status} />
    </div>
    <div className="grid gap-3 md:grid-cols-2">{children}</div>
  </DashboardWidget>
);

export const CategoryCard = ({ record, icon }: CardProps<CategoryRecord>) => (
  <BaseCard title={record.name} subtitle={record.code} status={record.status} icon={icon}>
    <Metric label="Parent" value={record.parent} />
    <Metric label="Products" value={record.products} />
    <Metric label="Order" value={record.displayOrder} />
    <Metric label="Created" value={record.createdAt} />
  </BaseCard>
);

export const BrandCard = ({ record, icon }: CardProps<BrandRecord>) => (
  <BaseCard title={record.name} subtitle={record.code} status={record.status} icon={icon}>
    <Metric label="Country" value={record.country} />
    <Metric label="Industry" value={record.industry} />
    <Metric label="Products" value={record.products} />
    <Metric label="Markets" value={record.countries} />
  </BaseCard>
);

export const SkuCard = ({ record, icon }: CardProps<SkuRecord>) => (
  <BaseCard title={record.skuCode} subtitle={record.product} status={record.status} icon={icon}>
    <Metric label="MRP" value={record.mrp} />
    <Metric label="Selling" value={record.sellingPrice} />
    <Metric label="QR" value={record.qrRequired} />
    <Metric label="Batch" value={record.batchRequired} />
  </BaseCard>
);

export const AnalyticsCards = () => {
  const items: StatItem[] = analyticsCards.map((item) => ({
    ...item,
    tone: "info",
    change: "Static demo metric",
    trend: "neutral",
  }));
  return <StatisticsCards items={items} />;
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-semibold text-slate-200">{value}</p>
  </div>
);
