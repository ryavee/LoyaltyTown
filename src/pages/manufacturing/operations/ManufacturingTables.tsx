import { Eye, Pencil } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise";
import type { FactoryRecord } from "../../../data/manufacturing/factoryDemoData";
import type { MachineRecord } from "../../../data/manufacturing/machineDemoData";
import type { OperatorRecord, ShiftRecord } from "../../../data/manufacturing/operatorDemoData";
import type { ProductionLineRecord, ProductionOrderRecord } from "../../../data/manufacturing/productionDemoData";
import type { QCRecord, ScrapRecord } from "../../../data/manufacturing/qcDemoData";
import { FactoryStatusBadge, ProductionStatusBadge, QCStatusBadge } from "./ManufacturingBadges";

const go = (path: string) => {
  window.location.href = path;
};

const actions = <T extends { id: string }>(basePath: string): DataTableAction<T>[] => [
  { id: "view", label: "View", icon: Eye, onClick: (row) => go(`${basePath}/${row.id}`) },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => go(`${basePath}/${row.id}/edit`) },
];

export const FactoryTable = ({ rows }: { rows: FactoryRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={factoryColumns} actions={actions("/factory")} />
);

export const ProductionOrderTable = ({ rows }: { rows: ProductionOrderRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={productionOrderColumns} actions={actions("/production-orders")} />
);

export const ProductionLineTable = ({ rows }: { rows: ProductionLineRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={productionLineColumns} actions={actions("/production-lines")} />
);

export const MachineTable = ({ rows }: { rows: MachineRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={machineColumns} actions={actions("/machines")} />
);

export const OperatorTable = ({ rows }: { rows: OperatorRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={operatorColumns} actions={actions("/operators")} />
);

export const ShiftTable = ({ rows }: { rows: ShiftRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={shiftColumns} actions={actions("/shifts")} />
);

export const QCTable = ({ rows }: { rows: QCRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={qcColumns} actions={actions("/quality-control")} />
);

export const ScrapTable = ({ rows }: { rows: ScrapRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={scrapColumns} />
);

const factoryColumns: DataTableColumn<FactoryRecord>[] = [
  { id: "name", header: "Factory", accessor: "name", sortable: true },
  { id: "code", header: "Code", accessor: "code" },
  { id: "city", header: "City", accessor: "city" },
  { id: "productionLines", header: "Lines", accessor: "productionLines", align: "right" },
  { id: "machines", header: "Machines", accessor: "machines", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <FactoryStatusBadge status={row.status} /> },
];

const productionOrderColumns: DataTableColumn<ProductionOrderRecord>[] = [
  { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
  { id: "factory", header: "Factory", accessor: "factory" },
  { id: "productionLine", header: "Line", accessor: "productionLine" },
  { id: "product", header: "Product", accessor: "product" },
  { id: "plannedQuantity", header: "Planned", accessor: "plannedQuantity", align: "right" },
  { id: "actualQuantity", header: "Actual", accessor: "actualQuantity", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductionStatusBadge status={row.status} /> },
];

const productionLineColumns: DataTableColumn<ProductionLineRecord>[] = [
  { id: "lineName", header: "Line", accessor: "lineName" },
  { id: "factory", header: "Factory", accessor: "factory" },
  { id: "capacityPerShift", header: "Capacity", accessor: "capacityPerShift", align: "right" },
  { id: "machineCount", header: "Machines", accessor: "machineCount", align: "right" },
  { id: "operatorCount", header: "Operators", accessor: "operatorCount", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductionStatusBadge status={row.status} /> },
];

const machineColumns: DataTableColumn<MachineRecord>[] = [
  { id: "machineName", header: "Machine", accessor: "machineName" },
  { id: "factory", header: "Factory", accessor: "factory" },
  { id: "productionLine", header: "Line", accessor: "productionLine" },
  { id: "machineType", header: "Type", accessor: "machineType" },
  { id: "health", header: "Health", accessor: "health", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductionStatusBadge status={row.status} /> },
];

const operatorColumns: DataTableColumn<OperatorRecord>[] = [
  { id: "operatorName", header: "Operator", accessor: "operatorName" },
  { id: "employeeCode", header: "Code", accessor: "employeeCode" },
  { id: "factory", header: "Factory", accessor: "factory" },
  { id: "productionLine", header: "Line", accessor: "productionLine" },
  { id: "shift", header: "Shift", accessor: "shift" },
  { id: "skillLevel", header: "Skill", accessor: "skillLevel" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductionStatusBadge status={row.status} /> },
];

const shiftColumns: DataTableColumn<ShiftRecord>[] = [
  { id: "shiftName", header: "Shift", accessor: "shiftName" },
  { id: "shiftCode", header: "Code", accessor: "shiftCode" },
  { id: "startTime", header: "Start", accessor: "startTime" },
  { id: "endTime", header: "End", accessor: "endTime" },
  { id: "factory", header: "Factory", accessor: "factory" },
  { id: "operators", header: "Operators", accessor: "operators", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductionStatusBadge status={row.status} /> },
];

const qcColumns: DataTableColumn<QCRecord>[] = [
  { id: "inspectionNumber", header: "Inspection", accessor: "inspectionNumber" },
  { id: "productionOrder", header: "Order", accessor: "productionOrder" },
  { id: "batch", header: "Batch", accessor: "batch" },
  { id: "product", header: "Product", accessor: "product" },
  { id: "inspector", header: "Inspector", accessor: "inspector" },
  { id: "rejectedQuantity", header: "Rejected", accessor: "rejectedQuantity", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <QCStatusBadge status={row.status} /> },
];

const scrapColumns: DataTableColumn<ScrapRecord>[] = [
  { id: "batch", header: "Batch", accessor: "batch" },
  { id: "product", header: "Product", accessor: "product" },
  { id: "sku", header: "SKU", accessor: "sku" },
  { id: "rejectedQuantity", header: "Rejected Quantity", accessor: "rejectedQuantity", align: "right" },
  { id: "scrapReason", header: "Reason", accessor: "scrapReason" },
  { id: "qrVoidStatus", header: "QR Void Status", accessor: "qrVoidStatus" },
  { id: "securityAlert", header: "Security Alert", accessor: "securityAlert" },
];
