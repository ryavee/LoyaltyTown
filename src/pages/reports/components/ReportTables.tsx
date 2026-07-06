import { Download, Eye, RotateCw } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import type { ScheduledReportRecord } from "../../../data/reports/scheduledReportDemoData";
import { ReportStatusBadge } from "./ReportStatusBadge";

export const ReportPreviewTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const columns: DataTableColumn<Record<string, unknown>>[] = [
    { id: "metric", header: "Metric", accessor: "metric" },
    { id: "current", header: "Current", accessor: "current", align: "right" },
    { id: "previous", header: "Previous", accessor: "previous", align: "right" },
    { id: "variance", header: "Variance", accessor: "variance", align: "right" },
    { id: "status", header: "Status", cell: (row) => <ReportStatusBadge status={String(row.status)} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ExportJobTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const columns: DataTableColumn<Record<string, unknown>>[] = ["job", "report", "format", "owner", "requestedAt"].map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => String(row[key]),
  }));
  columns.push({ id: "status", header: "Status", cell: (row) => <ReportStatusBadge status={String(row.status)} /> });
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "download", label: "Download", icon: Download, onClick: () => undefined }, { id: "retry", label: "Retry", icon: RotateCw, onClick: () => undefined }]} />;
};

export const ScheduledReportTable = ({ rows }: { rows: ScheduledReportRecord[] }) => {
  const columns: DataTableColumn<ScheduledReportRecord>[] = [
    { id: "reportName", header: "Report Name", accessor: "reportName", sortable: true },
    { id: "type", header: "Type", accessor: "reportType" },
    { id: "frequency", header: "Frequency", accessor: "frequency" },
    { id: "recipients", header: "Recipients", accessor: "recipients" },
    { id: "format", header: "Format", accessor: "format" },
    { id: "time", header: "Time", accessor: "time" },
    { id: "status", header: "Status", cell: (row) => <ReportStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View schedule", icon: Eye, onClick: () => undefined }]} />;
};

export const GenericReportTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") ? <ReportStatusBadge status={String(row[key])} /> : String(row[key]),
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
