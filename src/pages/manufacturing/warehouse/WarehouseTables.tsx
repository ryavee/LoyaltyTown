import { Eye, Pencil } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise/types";
import type { DispatchRecord, InboundRecord, TransferRecord } from "../../../data/warehouse/dispatchDemoData";
import type { InventoryRecord } from "../../../data/warehouse/inventoryDemoData";
import type { ReturnRecord } from "../../../data/warehouse/returnDemoData";
import type { ShipmentRecord } from "../../../data/warehouse/shipmentDemoData";
import type { BinRecord, WarehouseRecord } from "../../../data/warehouse/warehouseDemoData";
import { StockStatusBadge } from "./WarehouseBadges";

const open = (path: string) => {
  window.location.href = path;
};

const baseActions = <T extends { id: string }>(basePath: string): DataTableAction<T>[] => [
  { id: "view", label: "View", icon: Eye, onClick: (row) => open(`${basePath}/${row.id}`) },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => open(`${basePath}/${row.id}/edit`) },
];

export const WarehouseTable = ({ rows }: { rows: WarehouseRecord[] }) => {
  const columns: DataTableColumn<WarehouseRecord>[] = [
    { id: "code", header: "Code", accessor: "code", sortable: true },
    { id: "name", header: "Warehouse", accessor: "name", sortable: true },
    { id: "factory", header: "Factory", accessor: "factory" },
    { id: "location", header: "Location", accessor: "location" },
    { id: "manager", header: "Manager", accessor: "manager" },
    { id: "capacity", header: "Capacity", accessor: "capacity" },
    { id: "utilization", header: "Utilization", accessor: "utilization", align: "right" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/warehouses")} />;
};

export const BinTable = ({ rows }: { rows: BinRecord[] }) => {
  const columns: DataTableColumn<BinRecord>[] = [
    { id: "binNumber", header: "Bin", accessor: "binNumber", sortable: true },
    { id: "warehouse", header: "Warehouse", accessor: "warehouse" },
    { id: "rack", header: "Rack", accessor: "rack" },
    { id: "floor", header: "Floor", accessor: "floor" },
    { id: "zone", header: "Zone", accessor: "zone" },
    { id: "capacity", header: "Capacity", accessor: "capacity", align: "right" },
    { id: "availableCapacity", header: "Available", accessor: "availableCapacity", align: "right" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/bins")} />;
};

export const InventoryTable = ({ rows }: { rows: InventoryRecord[] }) => {
  const columns: DataTableColumn<InventoryRecord>[] = [
    { id: "sku", header: "SKU", accessor: "sku", sortable: true },
    { id: "product", header: "Product", accessor: "product", sortable: true },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "warehouse", header: "Warehouse", accessor: "warehouse" },
    { id: "bin", header: "Bin", accessor: "bin" },
    { id: "availableQty", header: "Available", accessor: "availableQty", align: "right" },
    { id: "reservedQty", header: "Reserved", accessor: "reservedQty", align: "right" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/inventory")} />;
};

export const GRNTable = ({ rows }: { rows: InboundRecord[] }) => {
  const columns: DataTableColumn<InboundRecord>[] = [
    { id: "grnNumber", header: "GRN", accessor: "grnNumber", sortable: true },
    { id: "supplier", header: "Supplier", accessor: "supplier" },
    { id: "warehouse", header: "Warehouse", accessor: "warehouse" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "inspector", header: "Inspector", accessor: "inspector" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/inbound")} />;
};

export const DispatchTable = ({ rows }: { rows: DispatchRecord[] }) => {
  const columns: DataTableColumn<DispatchRecord>[] = [
    { id: "dispatchNumber", header: "Dispatch", accessor: "dispatchNumber", sortable: true },
    { id: "warehouse", header: "Warehouse", accessor: "warehouse" },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "transporter", header: "Transporter", accessor: "transporter" },
    { id: "vehicle", header: "Vehicle", accessor: "vehicle" },
    { id: "expectedDelivery", header: "Expected", accessor: "expectedDelivery" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/outbound")} />;
};

export const TransferTable = ({ rows }: { rows: TransferRecord[] }) => {
  const columns: DataTableColumn<TransferRecord>[] = [
    { id: "id", header: "Transfer", accessor: "id", sortable: true },
    { id: "fromWarehouse", header: "From", accessor: "fromWarehouse" },
    { id: "toWarehouse", header: "To", accessor: "toWarehouse" },
    { id: "products", header: "Products", accessor: "products" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "approvedBy", header: "Approved By", accessor: "approvedBy" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/transfers")} />;
};

export const ShipmentTable = ({ rows }: { rows: ShipmentRecord[] }) => {
  const columns: DataTableColumn<ShipmentRecord>[] = [
    { id: "shipmentNumber", header: "Shipment", accessor: "shipmentNumber", sortable: true },
    { id: "dispatchNumber", header: "Dispatch", accessor: "dispatchNumber" },
    { id: "route", header: "Route", accessor: "route" },
    { id: "vehicle", header: "Vehicle", accessor: "vehicle" },
    { id: "driver", header: "Driver", accessor: "driver" },
    { id: "eta", header: "ETA", accessor: "eta" },
    { id: "proofOfDelivery", header: "POD", accessor: "proofOfDelivery" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/shipments")} />;
};

export const ReturnTable = ({ rows }: { rows: ReturnRecord[] }) => {
  const columns: DataTableColumn<ReturnRecord>[] = [
    { id: "returnNumber", header: "Return", accessor: "returnNumber", sortable: true },
    { id: "source", header: "Source", accessor: "source" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "inspection", header: "Inspection", accessor: "inspection" },
    { id: "resolution", header: "Resolution", accessor: "resolution" },
    { id: "status", header: "Status", cell: (row) => <StockStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={baseActions("/returns")} />;
};
