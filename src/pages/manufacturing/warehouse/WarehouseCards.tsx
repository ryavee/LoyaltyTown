import type { LucideIcon } from "lucide-react";
import { Boxes, Warehouse } from "lucide-react";
import { panelBase, cn } from "../../../Components/enterprise/utils";
import type { InventoryRecord } from "../../../data/warehouse/inventoryDemoData";
import type { WarehouseRecord } from "../../../data/warehouse/warehouseDemoData";
import { StockStatusBadge } from "./WarehouseBadges";

export const WarehouseCard = ({ warehouse }: { warehouse: WarehouseRecord }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{warehouse.code}</p>
        <h3 className="mt-2 text-base font-semibold text-white">{warehouse.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{warehouse.location}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        <Warehouse className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <span className="text-slate-500">Manager <strong className="block text-slate-200">{warehouse.manager}</strong></span>
      <span className="text-slate-500">Utilization <strong className="block text-slate-200">{warehouse.utilization}</strong></span>
      <span className="text-slate-500">Capacity <strong className="block text-slate-200">{warehouse.capacity}</strong></span>
      <span className="text-slate-500">Status <strong className="block"><StockStatusBadge status={warehouse.status} /></strong></span>
    </div>
  </article>
);

export const InventoryCard = ({ item }: { item: InventoryRecord }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.sku}</p>
        <h3 className="mt-2 text-base font-semibold text-white">{item.product}</h3>
        <p className="mt-1 text-sm text-slate-400">{item.warehouse} / {item.bin}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
        <Boxes className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <span className="text-slate-500">Available <strong className="block text-slate-200">{item.availableQty}</strong></span>
      <span className="text-slate-500">Reserved <strong className="block text-slate-200">{item.reservedQty}</strong></span>
      <span className="text-slate-500">Selling Price <strong className="block text-slate-200">{item.sellingPrice}</strong></span>
      <span className="text-slate-500">Status <strong className="block"><StockStatusBadge status={item.status} /></strong></span>
    </div>
  </article>
);

export const AnalyticsCards = ({ items }: { items: Array<{ label: string; value: string; icon?: LucideIcon }> }) => (
  <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {items.map((item) => {
      const Icon = item.icon || Boxes;
      return (
        <div key={item.label} className={cn(panelBase, "p-4")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      );
    })}
  </section>
);
