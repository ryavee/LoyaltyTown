import { Eye, History, Pencil, Printer, ShieldOff } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise/types";
import type { Gs1Template } from "../../../data/qr/gs1DemoData";
import type { QrBatchRecord } from "../../../data/qr/qrBatchDemoData";
import type { QrCodeRecord } from "../../../data/qr/qrCodeDemoData";
import type { SecurityEvent } from "../../../data/qr/securityDemoData";
import { QrStatusBadge } from "./QrStatusBadge";

const open = (path: string) => {
  window.location.href = path;
};

export const QrBatchTable = ({ rows }: { rows: QrBatchRecord[] }) => {
  const columns: DataTableColumn<QrBatchRecord>[] = [
    { id: "batchName", header: "Batch Name", accessor: "batchName", sortable: true },
    { id: "batchNumber", header: "Batch Number", accessor: "batchNumber", sortable: true },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
    { id: "generated", header: "Generated", accessor: "generated", align: "right" },
    { id: "printed", header: "Printed", accessor: "printed", align: "right" },
    { id: "activated", header: "Activated", accessor: "activated", align: "right" },
    { id: "claimed", header: "Claimed", accessor: "claimed", align: "right" },
    { id: "status", header: "Status", cell: (row) => <QrStatusBadge status={row.status} /> },
  ];
  const actions: DataTableAction<QrBatchRecord>[] = [
    { id: "view", label: "View", icon: Eye, onClick: (row) => open(`/qr/batches/${row.id}`) },
    { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => open(`/qr/batches/${row.id}/edit`) },
    { id: "print", label: "Preview", icon: Printer, onClick: (row) => open(`/qr/batches/${row.id}`) },
  ];
  return <EnterpriseDataTable title="QR Batch List" description="Batch name, serial range progress, lifecycle state, and actions." rows={rows} columns={columns} actions={actions} showExportPlaceholder showImportPlaceholder />;
};

export const QrCodeTable = ({ rows }: { rows: QrCodeRecord[] }) => {
  const columns: DataTableColumn<QrCodeRecord>[] = [
    { id: "qrCode", header: "QR Code", accessor: "qrCode", sortable: true },
    { id: "serial", header: "Serial", accessor: "serial", sortable: true },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "status", header: "Status", cell: (row) => <QrStatusBadge status={row.status} /> },
    { id: "scanCount", header: "Scan Count", accessor: "scanCount", align: "right", sortable: true },
    { id: "firstScan", header: "First Scan", accessor: "firstScan" },
    { id: "lastScan", header: "Last Scan", accessor: "lastScan" },
    { id: "riskScore", header: "Risk Score", accessor: "riskScore", align: "right", sortable: true },
  ];
  const actions: DataTableAction<QrCodeRecord>[] = [
    { id: "view", label: "View", icon: Eye, onClick: (row) => open(`/qr/codes/${row.id}`) },
    { id: "print", label: "Print", icon: Printer, onClick: () => undefined },
    { id: "void", label: "Void", icon: ShieldOff, destructive: true, onClick: () => undefined },
    { id: "history", label: "History", icon: History, onClick: () => undefined },
  ];
  return <EnterpriseDataTable title="QR Code Registry" description="Searchable registry with status, scan count, risk score, duplicate detection and timeline actions." rows={rows} columns={columns} actions={actions} showExportPlaceholder />;
};

export const Gs1Table = ({ rows }: { rows: Gs1Template[] }) => {
  const columns: DataTableColumn<Gs1Template>[] = [
    { id: "gtin", header: "GTIN", accessor: "gtin", sortable: true },
    { id: "serial", header: "Serial", accessor: "serial" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "expiry", header: "Expiry", accessor: "expiry" },
    { id: "lot", header: "Lot", accessor: "lot" },
    { id: "urlTemplate", header: "URL Template", accessor: "urlTemplate" },
    { id: "status", header: "Status", cell: (row) => <QrStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const SecurityEventTable = ({ rows }: { rows: SecurityEvent[] }) => {
  const columns: DataTableColumn<SecurityEvent>[] = [
    { id: "event", header: "Event", accessor: "event", sortable: true },
    { id: "serial", header: "Serial", accessor: "serial" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "location", header: "Location", accessor: "location" },
    { id: "rule", header: "Rule", accessor: "rule" },
    { id: "riskScore", header: "Risk Score", accessor: "riskScore", align: "right" },
    { id: "severity", header: "Severity", cell: (row) => <QrStatusBadge status={row.severity} /> },
    { id: "status", header: "Status", accessor: "status" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
