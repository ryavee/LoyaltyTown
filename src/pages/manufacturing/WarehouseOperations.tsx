import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  BarChart3,
  Boxes,
  ClipboardCheck,
  Download,
  FileBarChart,
  Filter,
  Grid3X3,
  MapPinned,
  PackageCheck,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Truck,
  Upload,
  Warehouse,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  AdvancedFilters,
  EmptyState,
  KPIGrid,
  LoadingSkeleton,
  PageToolbar,
  Pagination,
  ReusableFormLayout,
  SearchInput,
  SecondaryButton,
  Select,
  TextInput,
} from "../../Components/enterprise";
import { panelBase, cn } from "../../Components/enterprise/utils";
import { inboundRows, dispatchRows, transferRows } from "../../data/warehouse/dispatchDemoData";
import { analyticsTiles, inventoryKpis, inventoryRows, movementRows, inventoryTabs } from "../../data/warehouse/inventoryDemoData";
import { returnRows, reverseLogisticsRows } from "../../data/warehouse/returnDemoData";
import { shipmentRows } from "../../data/warehouse/shipmentDemoData";
import { bins, warehouseActivities, warehouseKpis, warehouses, warehouseTabs } from "../../data/warehouse/warehouseDemoData";
import { AnalyticsCards, InventoryCard, WarehouseCard } from "./warehouse/WarehouseCards";
import { BinForm, InventoryForm, WarehouseForm } from "./warehouse/WarehouseForms";
import {
  BinTable,
  DispatchTable,
  GRNTable,
  InventoryTable,
  ReturnTable,
  ShipmentTable,
  TransferTable,
  WarehouseTable,
} from "./warehouse/WarehouseTables";
import { AnalyticsTileGrid, BinMap, InventoryCharts, ShipmentTimeline, TransferTimeline, WarehouseUtilizationChart } from "./warehouse/WarehouseWidgets";
import { StockStatusBadge } from "./warehouse/WarehouseBadges";

type ModuleKey =
  | "warehouses"
  | "bins"
  | "inventory"
  | "inbound"
  | "outbound"
  | "transfers"
  | "returns"
  | "reverse-logistics"
  | "shipments"
  | "warehouse";

type WarehouseMode =
  | ModuleKey
  | "dashboard"
  | "create"
  | "details"
  | "edit"
  | "analytics"
  | "locations"
  | "stock-count"
  | "cycle-count"
  | "adjustments"
  | "dispatch"
  | "reports";

type WarehouseOperationsProps = {
  mode?: WarehouseMode;
  moduleType?: ModuleKey;
};

const moduleMeta: Record<ModuleKey, { title: string; noun: string; route: string; icon: typeof Warehouse; description: string }> = {
  warehouses: {
    title: "Warehouse Management",
    noun: "Warehouse",
    route: "/warehouses",
    icon: Warehouse,
    description: "Manage warehouse masters, capacity, storage types, bins, inbound, outbound, transfers, returns, documents, history, and audit readiness.",
  },
  warehouse: {
    title: "Warehouse Operations",
    noun: "Warehouse",
    route: "/warehouse/dashboard",
    icon: Warehouse,
    description: "Operational view for inbound, outbound, inventory, bins, transfers, counts, adjustments, dispatch, returns, reports, and analytics.",
  },
  bins: {
    title: "Bin Location Management",
    noun: "Bin",
    route: "/bins",
    icon: Grid3X3,
    description: "Control warehouse bin numbers, racks, floors, zones, capacity, available capacity, and storage map readiness.",
  },
  inventory: {
    title: "Inventory Management",
    noun: "Inventory",
    route: "/inventory",
    icon: Boxes,
    description: "Track product, SKU, batch, warehouse, bin, quantities, pricing, expiry, stock movements, reconciliation, ledger, and timeline.",
  },
  inbound: {
    title: "Inbound Management",
    noun: "Inbound",
    route: "/inbound",
    icon: ArrowDownToLine,
    description: "Goods receiving, GRN, supplier delivery, verification, inspection, accepted items, rejected items, and timeline placeholders.",
  },
  outbound: {
    title: "Outbound Management",
    noun: "Dispatch",
    route: "/outbound",
    icon: ArrowUpFromLine,
    description: "Picking, packing, shipment handoff, dispatch details, tracking, vehicle, driver, transporter, and delivery readiness.",
  },
  transfers: {
    title: "Internal Transfer",
    noun: "Transfer",
    route: "/transfers",
    icon: ArrowRightLeft,
    description: "Move products and batches between warehouses with requester, approval, status, and timeline placeholders.",
  },
  returns: {
    title: "Return Management",
    noun: "Return",
    route: "/returns",
    icon: RotateCcw,
    description: "Customer, dealer, distributor, and factory returns with inspection, approval, restocking, replacement, scrap, and timeline.",
  },
  "reverse-logistics": {
    title: "Reverse Logistics",
    noun: "Reverse Logistics",
    route: "/reverse-logistics",
    icon: Truck,
    description: "Pickup requests, collection, inspection, repackaging, repair, replacement, destroy, and analytics placeholders.",
  },
  shipments: {
    title: "Shipments",
    noun: "Shipment",
    route: "/shipments",
    icon: Truck,
    description: "Shipment dashboard, tracking, vehicle assignment, driver assignment, proof of delivery, delivery timeline, and maps placeholder.",
  },
};

const analyticsCardItems = [
  { label: "Inventory Turnover", value: "4.8x", icon: BarChart3 },
  { label: "Stock Aging", value: "38d", icon: ClipboardCheck },
  { label: "Warehouse Utilization", value: "78%", icon: Warehouse },
  { label: "Dead Stock", value: "$1.2M", icon: Boxes },
];

const resolveModule = (mode: WarehouseMode, moduleType?: ModuleKey): ModuleKey => {
  if (moduleType) return moduleType;
  if (mode === "warehouse" || mode === "dashboard" || mode === "locations" || mode === "reports" || mode === "analytics") return "warehouse";
  if (mode === "dispatch") return "outbound";
  if (mode === "stock-count" || mode === "cycle-count" || mode === "adjustments") return "inventory";
  return mode as ModuleKey;
};

const resolveView = (mode: WarehouseMode) => {
  if (mode === "create" || mode === "details" || mode === "edit" || mode === "analytics" || mode === "reports") return mode;
  if (mode === "dashboard" || mode === "warehouse") return "dashboard";
  if (mode === "locations") return "warehouses";
  if (mode === "stock-count") return "stock-count";
  if (mode === "cycle-count") return "cycle-count";
  if (mode === "adjustments") return "adjustments";
  if (mode === "dispatch") return "outbound";
  return "list";
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [query, rows]);

const ActionButtons = ({ moduleKey }: { moduleKey: ModuleKey }) => {
  const meta = moduleMeta[moduleKey];
  return (
    <>
      {["warehouses", "bins", "inventory", "inbound", "outbound", "transfers"].includes(moduleKey) ? (
        <Link to={`${meta.route}/create`} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          <Plus className="h-4 w-4" />
          Create
        </Link>
      ) : null}
      <SecondaryButton icon={Upload}>Import</SecondaryButton>
      <SecondaryButton icon={Download}>Export</SecondaryButton>
      <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
    </>
  );
};

const Header = ({ moduleKey, view }: { moduleKey: ModuleKey; view: string }) => {
  const meta = moduleMeta[moduleKey];
  const Icon = meta.icon;
  const title = view === "create" ? `Create ${meta.noun}` : view === "edit" ? `Edit ${meta.noun}` : view === "details" ? `${meta.noun} Details` : view === "analytics" ? `${meta.noun} Analytics` : meta.title;

  return (
    <PageToolbar
      title={title}
      description={meta.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Warehouse Cloud</p>
        </div>
      }
      end={<ActionButtons moduleKey={moduleKey} />}
    />
  );
};

const FilterBar = ({ query, setQuery, noun }: { query: string; setQuery: (value: string) => void; noun: string }) => (
  <AdvancedFilters title={`${noun} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${noun.toLowerCase()}`} />
    <Select value="" onChange={() => undefined} placeholder="All statuses" options={["Active", "Healthy", "Inspection", "In Transit", "Blocked"].map((value) => ({ label: value, value }))} label="Status" />
    <Select value="" onChange={() => undefined} placeholder="All warehouses" options={warehouses.map((warehouse) => ({ label: warehouse.name, value: warehouse.id }))} label="Warehouse" />
  </AdvancedFilters>
);

const WarehouseDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={warehouseKpis} />
    <WarehouseUtilizationChart />
    <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-4 md:grid-cols-2">
        {warehouses.slice(0, 2).map((warehouse) => <WarehouseCard key={warehouse.id} warehouse={warehouse} />)}
      </div>
      <div className={cn(panelBase, "p-4")}>
        <h2 className="text-sm font-semibold text-white">Warehouse Activity</h2>
        <div className="mt-4 space-y-3">
          {warehouseActivities.map((activity) => (
            <div key={activity.id} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-sm font-medium text-slate-200">{activity.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{activity.description} / {activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const InventoryDashboard = () => (
  <div className="space-y-5">
    <KPIGrid items={inventoryKpis} />
    <InventoryCharts />
    <div className="grid gap-4 md:grid-cols-2">
      {inventoryRows.slice(0, 2).map((item) => <InventoryCard key={item.id} item={item} />)}
    </div>
  </div>
);

const TableContent = ({ moduleKey, query, view }: { moduleKey: ModuleKey; query: string; view: string }) => {
  const filteredWarehouses = useFilteredRows(warehouses, query);
  const filteredBins = useFilteredRows(bins, query);
  const filteredInventory = useFilteredRows(inventoryRows, query);
  const filteredInbound = useFilteredRows(inboundRows, query);
  const filteredDispatch = useFilteredRows(dispatchRows, query);
  const filteredTransfers = useFilteredRows(transferRows, query);
  const filteredReturns = useFilteredRows(returnRows, query);
  const filteredShipments = useFilteredRows(shipmentRows, query);
  const filteredReverse = useFilteredRows(reverseLogisticsRows, query);
  const filteredMovements = useFilteredRows(movementRows, query);

  if (view === "stock-count" || view === "cycle-count" || view === "adjustments") {
    return <InventoryTable rows={filteredInventory} />;
  }

  switch (moduleKey) {
    case "warehouses":
    case "warehouse":
      return <WarehouseTable rows={filteredWarehouses} />;
    case "bins":
      return <BinTable rows={filteredBins} />;
    case "inventory":
      return view === "list" ? <InventoryTable rows={filteredInventory} /> : <EnterpriseMovementTable rows={filteredMovements} />;
    case "inbound":
      return <GRNTable rows={filteredInbound} />;
    case "outbound":
      return <DispatchTable rows={filteredDispatch} />;
    case "transfers":
      return <TransferTable rows={filteredTransfers} />;
    case "returns":
      return <ReturnTable rows={filteredReturns} />;
    case "shipments":
      return <ShipmentTable rows={filteredShipments} />;
    case "reverse-logistics":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {filteredReverse.map((row) => (
            <div key={row.id} className={cn(panelBase, "p-4")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{row.id}</p>
                  <h3 className="mt-2 text-base font-semibold text-white">{row.request}</h3>
                  <p className="mt-1 text-sm text-slate-400">{row.owner} / {row.queue}</p>
                </div>
                <StockStatusBadge status={row.status} />
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return <EmptyState title="No warehouse records" description="Static records will appear here for this module." />;
  }
};

const EnterpriseMovementTable = ({ rows }: { rows: typeof movementRows }) => (
  <div className={cn(panelBase, "overflow-hidden")}>
    <div className="grid min-w-[900px] grid-cols-7 gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
      {["ID", "SKU", "Type", "Quantity", "Source", "Destination", "Status"].map((column) => <span key={column}>{column}</span>)}
    </div>
    {rows.map((row) => (
      <div key={row.id} className="grid min-w-[900px] grid-cols-7 gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0">
        <span>{row.id}</span>
        <span>{row.sku}</span>
        <span>{row.type}</span>
        <span>{row.quantity}</span>
        <span>{row.source}</span>
        <span>{row.destination}</span>
        <StockStatusBadge status={row.status} />
      </div>
    ))}
  </div>
);

const FormContent = ({ moduleKey, id }: { moduleKey: ModuleKey; id?: string }) => {
  if (moduleKey === "warehouses") return <WarehouseForm record={warehouses.find((row) => row.id === id) || warehouses[0]} />;
  if (moduleKey === "bins") return <BinForm record={bins.find((row) => row.id === id) || bins[0]} />;
  if (moduleKey === "inventory") return <InventoryForm record={inventoryRows.find((row) => row.id === id) || inventoryRows[0]} />;

  return (
    <ReusableFormLayout title={`${moduleMeta[moduleKey].noun} Details`} description="Static operational form prepared for backend integration." footer={<SecondaryButton icon={PackageCheck}>Save Draft</SecondaryButton>} columns={3}>
      <TextInput label="Reference Number" defaultValue={`${moduleMeta[moduleKey].noun.toUpperCase().slice(0, 3)}-2407-001`} />
      <TextInput label="Warehouse" defaultValue={warehouses[0].name} />
      <TextInput label="Product" defaultValue={inventoryRows[0].product} />
      <TextInput label="SKU" defaultValue={inventoryRows[0].sku} />
      <TextInput label="Batch" defaultValue={inventoryRows[0].batch} />
      <TextInput label="Quantity" defaultValue="2,400" />
      <TextInput label="Owner" defaultValue="Warehouse Operations" />
      <Select label="Status" value="" onChange={() => undefined} placeholder="Select status" options={["Pending Verification", "Inspection", "Accepted", "Ready", "In Transit"].map((value) => ({ label: value, value }))} />
    </ReusableFormLayout>
  );
};

const DetailsContent = ({ moduleKey, id }: { moduleKey: ModuleKey; id?: string }) => {
  const tabs = moduleKey === "warehouses" ? warehouseTabs : moduleKey === "inventory" ? inventoryTabs : ["Overview", "Timeline", "Documents", "History", "Audit"];
  const title =
    warehouses.find((row) => row.id === id)?.name ||
    bins.find((row) => row.id === id)?.binNumber ||
    inventoryRows.find((row) => row.id === id)?.product ||
    dispatchRows.find((row) => row.id === id)?.dispatchNumber ||
    inboundRows.find((row) => row.id === id)?.grnNumber ||
    shipmentRows.find((row) => row.id === id)?.shipmentNumber ||
    moduleMeta[moduleKey].title;

  return (
    <div className="space-y-4">
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{moduleMeta[moduleKey].noun} Record</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Frontend-only detail workspace with tabs ready for production data binding.</p>
          </div>
          <StockStatusBadge status="Active" />
        </div>
      </section>
      <section className={cn(panelBase, "overflow-hidden")}>
        <div className="flex gap-2 overflow-x-auto border-b border-slate-800 px-4 py-3">
          {tabs.map((tab, index) => (
            <button key={tab} className={cn("h-9 shrink-0 rounded-md px-3 text-sm font-semibold transition", index === 0 ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:bg-slate-900 hover:text-white")}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3 md:grid-cols-2">
            {["Owner", "Warehouse", "SKU", "Batch", "Quantity", "Status"].map((label) => (
              <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{label === "Status" ? "Active" : "Static demo value"}</p>
              </div>
            ))}
          </div>
          {moduleKey === "transfers" ? <TransferTimeline /> : moduleKey === "shipments" || moduleKey === "outbound" ? <ShipmentTimeline /> : <LoadingSkeleton rows={3} />}
        </div>
      </section>
    </div>
  );
};

const SpecializedPanels = ({ moduleKey, view }: { moduleKey: ModuleKey; view: string }) => {
  if (moduleKey === "bins") return <BinMap />;
  if (moduleKey === "shipments") {
    return (
      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className={cn(panelBase, "p-4")}>
          <div className="flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-cyan-300" />
            <h2 className="text-sm font-semibold text-white">Maps Placeholder</h2>
          </div>
          <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 text-sm text-slate-500">
            Shipment map and live route tracking placeholder.
          </div>
        </div>
        <ShipmentTimeline />
      </section>
    );
  }
  if (moduleKey === "transfers") return <TransferTimeline />;
  if (view === "analytics" || moduleKey === "inventory") return <InventoryCharts />;
  if (moduleKey === "warehouse" || moduleKey === "warehouses") return <WarehouseUtilizationChart />;
  return null;
};

const Reports = () => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {["Inventory Valuation", "Inbound Register", "Outbound Register", "Warehouse Utilization", "Bin Occupancy", "Stock Count Variance", "Returns Summary", "Dispatch SLA"].map((label) => (
      <button key={label} className={cn(panelBase, "p-5 text-left transition hover:border-cyan-400/30 hover:bg-slate-900")}>
        <FileBarChart className="h-6 w-6 text-cyan-300" />
        <p className="mt-4 text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Static report tile ready for future export workflow.</p>
      </button>
    ))}
  </section>
);

const WarehouseOperations = ({ mode = "dashboard", moduleType }: WarehouseOperationsProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const moduleKey = resolveModule(mode, moduleType);
  const view = resolveView(mode);
  const meta = moduleMeta[moduleKey];

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header moduleKey={moduleKey} view={view} />

      {view === "dashboard" ? <WarehouseDashboard /> : null}
      {moduleKey === "inventory" && view === "list" ? <InventoryDashboard /> : null}
      {view === "create" || view === "edit" ? <FormContent moduleKey={moduleKey} id={id} /> : null}
      {view === "details" ? <DetailsContent moduleKey={moduleKey} id={id} /> : null}
      {view === "analytics" ? (
        <>
          <AnalyticsCards items={analyticsCardItems} />
          <AnalyticsTileGrid />
          <InventoryCharts />
        </>
      ) : null}
      {view === "reports" ? <Reports /> : null}

      {!["dashboard", "create", "edit", "details", "analytics", "reports"].includes(view) ? (
        <>
          <FilterBar query={query} setQuery={setQuery} noun={meta.noun} />
          <TableContent moduleKey={moduleKey} query={query} view={view} />
          <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static demo records for ${meta.title}`} />
          <SpecializedPanels moduleKey={moduleKey} view={view} />
        </>
      ) : null}

      {moduleKey === "inventory" && view === "analytics" ? (
        <div className="hidden">
          {analyticsTiles.join(", ")}
        </div>
      ) : null}
    </div>
  );
};

export default WarehouseOperations;
