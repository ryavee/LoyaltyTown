import { CheckCircle2, Download, Eye, PackageCheck, Truck, XCircle } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise/types";
import type { DistributorDealerRecord } from "../../../data/distributor/distributorDealerDemoData";
import type { DistributorInventoryRecord } from "../../../data/distributor/distributorInventoryDemoData";
import type { DistributorRecord } from "../../../data/distributor/distributorDemoData";
import type { DistributorOrderRecord } from "../../../data/distributor/distributorOrderDemoData";
import type { DistributorPaymentRecord } from "../../../data/distributor/distributorPaymentDemoData";
import type { DistributorReturnRecord } from "../../../data/distributor/distributorReturnDemoData";
import type { DistributorSchemeRecord } from "../../../data/distributor/distributorSchemeDemoData";
import { DistributorStatusBadge, PaymentStatusBadge } from "./DistributorStatusBadge";

const open = (path: string) => {
  window.location.href = path;
};

export const DistributorTable = ({ rows }: { rows: DistributorRecord[] }) => {
  const columns: DataTableColumn<DistributorRecord>[] = [
    { id: "distributorCode", header: "Code", accessor: "distributorCode", sortable: true },
    { id: "distributorName", header: "Distributor", accessor: "distributorName", sortable: true },
    { id: "territory", header: "Territory", accessor: "territory" },
    { id: "contactPerson", header: "Contact", accessor: "contactPerson" },
    { id: "creditLimit", header: "Credit Limit", accessor: "creditLimit", align: "right" },
    { id: "outstandingAmount", header: "Outstanding", accessor: "outstandingAmount", align: "right" },
    { id: "walletBalance", header: "Wallet", accessor: "walletBalance" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/distributors/${row.id}`) }]} />;
};

export const DistributorOrderTable = ({ rows }: { rows: DistributorOrderRecord[] }) => {
  const columns: DataTableColumn<DistributorOrderRecord>[] = [
    { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" },
    { id: "expectedDeliveryDate", header: "Expected", accessor: "expectedDeliveryDate" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  const actions: DataTableAction<DistributorOrderRecord>[] = [
    { id: "view", label: "View", icon: Eye, onClick: (row) => open(`/distributor-orders/${row.id}`) },
    { id: "approve", label: "Approve", icon: CheckCircle2, onClick: () => undefined },
    { id: "reject", label: "Reject", icon: XCircle, destructive: true, onClick: () => undefined },
    { id: "dispatch", label: "Dispatch", icon: Truck, onClick: () => undefined },
    { id: "invoice", label: "Download Invoice", icon: Download, onClick: () => undefined },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={actions} />;
};

export const DistributorInventoryTable = ({ rows }: { rows: DistributorInventoryRecord[] }) => {
  const columns: DataTableColumn<DistributorInventoryRecord>[] = [
    { id: "product", header: "Product", accessor: "product", sortable: true },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "available", header: "Available", accessor: "available", align: "right" },
    { id: "reserved", header: "Reserved", accessor: "reserved", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/distributor-inventory/${row.id}`) }]} />;
};

export const DealerNetworkTable = ({ rows }: { rows: DistributorDealerRecord[] }) => {
  const columns: DataTableColumn<DistributorDealerRecord>[] = [
    { id: "dealerCode", header: "Dealer Code", accessor: "dealerCode", sortable: true },
    { id: "dealerName", header: "Dealer", accessor: "dealerName", sortable: true },
    { id: "contactPerson", header: "Contact", accessor: "contactPerson" },
    { id: "territory", header: "Territory", accessor: "territory" },
    { id: "creditLimit", header: "Credit Limit", accessor: "creditLimit", align: "right" },
    { id: "assignedDistributor", header: "Distributor", accessor: "assignedDistributor" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/distributor-dealers/${row.id}`) }]} />;
};

export const DistributorPaymentTable = ({ rows }: { rows: DistributorPaymentRecord[] }) => {
  const columns: DataTableColumn<DistributorPaymentRecord>[] = [
    { id: "invoiceNumber", header: "Invoice", accessor: "invoiceNumber", sortable: true },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "amount", header: "Amount", accessor: "amount", align: "right" },
    { id: "paidAmount", header: "Paid", accessor: "paidAmount", align: "right" },
    { id: "outstanding", header: "Outstanding", accessor: "outstanding", align: "right" },
    { id: "dueDate", header: "Due", accessor: "dueDate" },
    { id: "paymentMode", header: "Mode", accessor: "paymentMode" },
    { id: "paymentStatus", header: "Status", cell: (row) => <PaymentStatusBadge status={row.paymentStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: () => undefined }]} />;
};

export const DistributorSchemeTable = ({ rows }: { rows: DistributorSchemeRecord[] }) => {
  const columns: DataTableColumn<DistributorSchemeRecord>[] = [
    { id: "schemeName", header: "Scheme", accessor: "schemeName", sortable: true },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "target", header: "Target", accessor: "target", align: "right" },
    { id: "achievement", header: "Achievement", accessor: "achievement", align: "right" },
    { id: "progress", header: "Progress", accessor: (row) => `${row.progress}%`, align: "right" },
    { id: "earning", header: "Earning", accessor: "earning", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "calculator", label: "Scheme Calculator", icon: PackageCheck, onClick: () => undefined }]} />;
};

export const DistributorReturnTable = ({ rows }: { rows: DistributorReturnRecord[] }) => {
  const columns: DataTableColumn<DistributorReturnRecord>[] = [
    { id: "returnNumber", header: "Return", accessor: "returnNumber", sortable: true },
    { id: "distributor", header: "Distributor", accessor: "distributor" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "reason", header: "Reason", accessor: "reason" },
    { id: "status", header: "Status", cell: (row) => <DistributorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/distributor-returns/${row.id}`) }]} />;
};
