import { CheckCircle2, Download, Eye, XCircle } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise/types";
import type { DealerCustomerRecord } from "../../../data/dealer/dealerCustomerDemoData";
import type { DealerRecord } from "../../../data/dealer/dealerDemoData";
import type { DealerInventoryRecord } from "../../../data/dealer/dealerInventoryDemoData";
import type { DealerOrderRecord } from "../../../data/dealer/dealerOrderDemoData";
import type { DealerProjectRecord } from "../../../data/dealer/dealerProjectDemoData";
import type { DealerReturnRecord } from "../../../data/dealer/dealerReturnDemoData";
import type { DealerWarrantyRecord } from "../../../data/dealer/dealerWarrantyDemoData";
import { DealerStatusBadge } from "./DealerStatusBadge";

const open = (path: string) => {
  window.location.href = path;
};

export const DealerTable = ({ rows }: { rows: DealerRecord[] }) => {
  const columns: DataTableColumn<DealerRecord>[] = [
    { id: "dealerCode", header: "Code", accessor: "dealerCode", sortable: true },
    { id: "dealerName", header: "Dealer", accessor: "dealerName", sortable: true },
    { id: "territory", header: "Territory", accessor: "territory" },
    { id: "assignedDistributor", header: "Distributor", accessor: "assignedDistributor" },
    { id: "creditLimit", header: "Credit Limit", accessor: "creditLimit", align: "right" },
    { id: "walletBalance", header: "Wallet", accessor: "walletBalance" },
    { id: "targetAchievement", header: "Target", accessor: "targetAchievement", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealers/${row.id}`) }]} />;
};

export const DealerInventoryTable = ({ rows }: { rows: DealerInventoryRecord[] }) => {
  const columns: DataTableColumn<DealerInventoryRecord>[] = [
    { id: "product", header: "Product", accessor: "product", sortable: true },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "available", header: "Available", accessor: "available", align: "right" },
    { id: "sold", header: "Sold", accessor: "sold", align: "right" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealer-inventory/${row.id}`) }]} />;
};

export const DealerOrderTable = ({ rows }: { rows: DealerOrderRecord[] }) => {
  const columns: DataTableColumn<DealerOrderRecord>[] = [
    { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "supplier", header: "Distributor / Manufacturer", accessor: "supplier" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" },
    { id: "expectedDelivery", header: "Expected", accessor: "expectedDelivery" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  const actions: DataTableAction<DealerOrderRecord>[] = [
    { id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealer-orders/${row.id}`) },
    { id: "approve", label: "Approve", icon: CheckCircle2, onClick: () => undefined },
    { id: "reject", label: "Reject", icon: XCircle, destructive: true, onClick: () => undefined },
    { id: "invoice", label: "Download Invoice", icon: Download, onClick: () => undefined },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={actions} />;
};

export const DealerCustomerTable = ({ rows }: { rows: DealerCustomerRecord[] }) => {
  const columns: DataTableColumn<DealerCustomerRecord>[] = [
    { id: "customerName", header: "Customer", accessor: "customerName", sortable: true },
    { id: "customerType", header: "Type", accessor: "customerType" },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "city", header: "City", accessor: "city" },
    { id: "lastPurchaseDate", header: "Last Purchase", accessor: "lastPurchaseDate" },
    { id: "totalPurchaseValue", header: "Purchase Value", accessor: "totalPurchaseValue", align: "right" },
    { id: "followUpDate", header: "Follow-up", accessor: "followUpDate" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealer-customers/${row.id}`) }]} />;
};

export const DealerWarrantyTable = ({ rows }: { rows: DealerWarrantyRecord[] }) => {
  const columns: DataTableColumn<DealerWarrantyRecord>[] = [
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "qrCode", header: "QR Code", accessor: "qrCode" },
    { id: "warrantyStartDate", header: "Start", accessor: "warrantyStartDate" },
    { id: "warrantyEndDate", header: "End", accessor: "warrantyEndDate" },
    { id: "claimStatus", header: "Claim", cell: (row) => <DealerStatusBadge status={row.claimStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const DealerReturnTable = ({ rows }: { rows: DealerReturnRecord[] }) => {
  const columns: DataTableColumn<DealerReturnRecord>[] = [
    { id: "returnNumber", header: "Return", accessor: "returnNumber", sortable: true },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "reason", header: "Reason", accessor: "reason" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealer-returns/${row.id}`) }]} />;
};

export const DealerProjectTable = ({ rows }: { rows: DealerProjectRecord[] }) => {
  const columns: DataTableColumn<DealerProjectRecord>[] = [
    { id: "projectName", header: "Project", accessor: "projectName", sortable: true },
    { id: "customerContractor", header: "Customer / Contractor", accessor: "customerContractor" },
    { id: "location", header: "Location", accessor: "location" },
    { id: "projectType", header: "Type", accessor: "projectType" },
    { id: "estimatedValue", header: "Value", accessor: "estimatedValue", align: "right" },
    { id: "productsUsed", header: "Products Used", accessor: "productsUsed" },
    { id: "status", header: "Status", cell: (row) => <DealerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/dealer-projects/${row.id}`) }]} />;
};
