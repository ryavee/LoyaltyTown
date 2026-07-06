import { Download, Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise/types";
import type { RetailerCustomerRecord } from "../../../data/retailer/retailerCustomerDemoData";
import type { RetailerRecord } from "../../../data/retailer/retailerDemoData";
import type { RetailerInventoryRecord } from "../../../data/retailer/retailerInventoryDemoData";
import type { RetailerOrderRecord } from "../../../data/retailer/retailerOrderDemoData";
import type { RetailerReturnRecord } from "../../../data/retailer/retailerReturnDemoData";
import type { RetailerSaleRecord } from "../../../data/retailer/retailerSalesDemoData";
import type { ProductVerificationRecord } from "../../../data/retailer/retailerVerificationDemoData";
import type { RetailerWarrantyRecord } from "../../../data/retailer/retailerWarrantyDemoData";
import { RetailerStatusBadge } from "./RetailerStatusBadge";

const open = (path: string) => { window.location.href = path; };

export const RetailerTable = ({ rows }: { rows: RetailerRecord[] }) => {
  const columns: DataTableColumn<RetailerRecord>[] = [
    { id: "retailerCode", header: "Code", accessor: "retailerCode", sortable: true },
    { id: "retailerName", header: "Retailer", accessor: "retailerName", sortable: true },
    { id: "storeType", header: "Store Type", accessor: "storeType" },
    { id: "territory", header: "Territory", accessor: "territory" },
    { id: "assignedDealer", header: "Dealer", accessor: "assignedDealer" },
    { id: "monthlySales", header: "Sales", accessor: "monthlySales", align: "right" },
    { id: "walletBalance", header: "Wallet", accessor: "walletBalance" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailers/${row.id}`) }]} />;
};

export const RetailerInventoryTable = ({ rows }: { rows: RetailerInventoryRecord[] }) => {
  const columns: DataTableColumn<RetailerInventoryRecord>[] = [
    { id: "product", header: "Product", accessor: "product", sortable: true },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "retailer", header: "Retailer", accessor: "retailer" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "available", header: "Available", accessor: "available", align: "right" },
    { id: "sold", header: "Sold", accessor: "sold", align: "right" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailer-inventory/${row.id}`) }]} />;
};

export const RetailerOrderTable = ({ rows }: { rows: RetailerOrderRecord[] }) => {
  const columns: DataTableColumn<RetailerOrderRecord>[] = [
    { id: "orderNumber", header: "Order", accessor: "orderNumber", sortable: true },
    { id: "retailer", header: "Retailer", accessor: "retailer" },
    { id: "supplier", header: "Dealer / Distributor", accessor: "supplier" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "totalAmount", header: "Total", accessor: "totalAmount", align: "right" },
    { id: "expectedDelivery", header: "Expected", accessor: "expectedDelivery" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
  ];
  const actions: DataTableAction<RetailerOrderRecord>[] = [
    { id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailer-orders/${row.id}`) },
    { id: "invoice", label: "Download Invoice", icon: Download, onClick: () => undefined },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={actions} />;
};

export const RetailerSalesTable = ({ rows }: { rows: RetailerSaleRecord[] }) => {
  const columns: DataTableColumn<RetailerSaleRecord>[] = [
    { id: "saleNumber", header: "Sale", accessor: "saleNumber", sortable: true },
    { id: "retailer", header: "Retailer", accessor: "retailer" },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "qrCode", header: "QR Code", accessor: "qrCode" },
    { id: "saleAmount", header: "Amount", accessor: "saleAmount", align: "right" },
    { id: "paymentMode", header: "Payment", accessor: "paymentMode" },
    { id: "verificationStatus", header: "Verification", cell: (row) => <RetailerStatusBadge status={row.verificationStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailer-sales/${row.id}`) }]} />;
};

export const RetailerCustomerTable = ({ rows }: { rows: RetailerCustomerRecord[] }) => {
  const columns: DataTableColumn<RetailerCustomerRecord>[] = [
    { id: "customerName", header: "Customer", accessor: "customerName", sortable: true },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "city", header: "City", accessor: "city" },
    { id: "lastPurchaseDate", header: "Last Purchase", accessor: "lastPurchaseDate" },
    { id: "totalPurchaseValue", header: "Purchase Value", accessor: "totalPurchaseValue", align: "right" },
    { id: "productsPurchased", header: "Products", accessor: "productsPurchased", align: "right" },
    { id: "warrantyCount", header: "Warranty", accessor: "warrantyCount", align: "right" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailer-customers/${row.id}`) }]} />;
};

export const ProductVerificationTable = ({ rows }: { rows: ProductVerificationRecord[] }) => {
  const columns: DataTableColumn<ProductVerificationRecord>[] = [
    { id: "qrCode", header: "QR Code", accessor: "qrCode", sortable: true },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "verificationResult", header: "Result", cell: (row) => <RetailerStatusBadge status={row.verificationResult} /> },
    { id: "scanLocation", header: "Location", accessor: "scanLocation" },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "riskScore", header: "Risk", accessor: "riskScore", align: "right" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const RetailerWarrantyTable = ({ rows }: { rows: RetailerWarrantyRecord[] }) => {
  const columns: DataTableColumn<RetailerWarrantyRecord>[] = [
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "qrCode", header: "QR Code", accessor: "qrCode" },
    { id: "warrantyStartDate", header: "Start", accessor: "warrantyStartDate" },
    { id: "warrantyEndDate", header: "End", accessor: "warrantyEndDate" },
    { id: "claimStatus", header: "Claim", cell: (row) => <RetailerStatusBadge status={row.claimStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const RetailerReturnTable = ({ rows }: { rows: RetailerReturnRecord[] }) => {
  const columns: DataTableColumn<RetailerReturnRecord>[] = [
    { id: "returnNumber", header: "Return", accessor: "returnNumber", sortable: true },
    { id: "retailer", header: "Retailer", accessor: "retailer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "reason", header: "Reason", accessor: "reason" },
    { id: "status", header: "Status", cell: (row) => <RetailerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/retailer-returns/${row.id}`) }]} />;
};
