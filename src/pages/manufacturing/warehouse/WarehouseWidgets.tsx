import { ArrowRightLeft, BarChart3, MapPinned, PackageCheck, Route, Truck } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Timeline } from "../../../Components/enterprise";
import { panelBase, cn } from "../../../Components/enterprise/utils";
import { analyticsTiles, inventoryTrendData } from "../../../data/warehouse/inventoryDemoData";
import { shipmentTimeline } from "../../../data/warehouse/shipmentDemoData";
import { bins, warehouseTrendData } from "../../../data/warehouse/warehouseDemoData";
import { StockStatusBadge } from "./WarehouseBadges";

const chartTooltip = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
};

export const InventoryCharts = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Inventory Turnover and Aging</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={inventoryTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Line type="monotone" dataKey="turnover" stroke="#22d3ee" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="aging" stroke="#fb7185" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Stock and Reservation Trend</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={inventoryTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Area dataKey="stock" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
            <Area dataKey="reserved" stroke="#a78bfa" fill="#a78bfa22" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

export const WarehouseUtilizationChart = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Inbound vs Outbound</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={warehouseTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Area dataKey="inbound" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="outbound" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className={cn(panelBase, "p-4")}>
      <h2 className="text-sm font-semibold text-white">Utilization and Blocked Stock</h2>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={warehouseTrendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="utilization" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            <Bar dataKey="blocked" fill="#fb7185" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

export const BinMap = () => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex items-center gap-2">
      <MapPinned className="h-4 w-4 text-cyan-300" />
      <h2 className="text-sm font-semibold text-white">Storage Map</h2>
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {bins.map((bin) => (
        <div key={bin.id} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{bin.zone}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{bin.binNumber}</h3>
            </div>
            <StockStatusBadge status={bin.status} />
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.max(12, 100 - (Number(bin.availableCapacity.replace(/,/g, "")) / Number(bin.capacity.replace(/,/g, ""))) * 100)}%` }} />
          </div>
          <p className="mt-3 text-xs text-slate-500">{bin.availableCapacity} of {bin.capacity} available</p>
        </div>
      ))}
    </div>
  </section>
);

export const ShipmentTimeline = () => (
  <Timeline
    items={shipmentTimeline.map((item) => ({
      ...item,
      icon: Truck,
      tone: item.timestamp === "Pending" ? "warning" : "info",
    }))}
  />
);

export const TransferTimeline = () => (
  <Timeline
    items={[
      { id: "tr-1", title: "Transfer requested", description: "Demand planning requested inter-warehouse movement.", timestamp: "Today, 09:10", icon: ArrowRightLeft, tone: "info" },
      { id: "tr-2", title: "Approval pending", description: "Approver queue placeholder for future workflow.", timestamp: "Today, 09:35", icon: PackageCheck, tone: "warning" },
      { id: "tr-3", title: "Dispatch handoff", description: "Transport handoff and gate-out will appear here.", timestamp: "Pending", icon: Route, tone: "default" },
    ]}
  />
);

export const AnalyticsTileGrid = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {analyticsTiles.map((label) => (
      <button key={label} className={cn(panelBase, "p-5 text-left transition hover:border-cyan-400/30 hover:bg-slate-900")}>
        <BarChart3 className="h-6 w-6 text-cyan-300" />
        <p className="mt-4 text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Static analytics widget ready for backend metrics.</p>
      </button>
    ))}
  </section>
);
