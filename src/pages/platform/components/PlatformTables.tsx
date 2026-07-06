import { Eye, RotateCw } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import { PlatformStatusBadge } from "./PlatformStatusBadge";

export const GenericPlatformTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") ? <PlatformStatusBadge status={String(row[key])} /> : String(row[key]),
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: () => undefined }]} />;
};

export const CompanyTable = GenericPlatformTable;
export const AuditTable = GenericPlatformTable;
export const QueueTable = ({ rows }: { rows: Record<string, unknown>[] }) => (
  <EnterpriseDataTable
    rows={rows}
    columns={Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7).map((key) => ({
      id: key,
      header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
      cell: (row) => key.toLowerCase().includes("status") ? <PlatformStatusBadge status={String(row[key])} /> : String(row[key]),
    }))}
    actions={[{ id: "retry", label: "Retry jobs", icon: RotateCw, onClick: () => undefined }]}
  />
);
export const SupportTicketTable = GenericPlatformTable;
