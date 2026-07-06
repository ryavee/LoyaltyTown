import { Eye, PenLine } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import type { TenantRecord } from "../../../data/whitelabel/tenantDemoData";
import { WhiteLabelStatusBadge } from "./WhiteLabelStatusBadge";

export const TenantTable = ({ rows }: { rows: TenantRecord[] }) => {
  const columns: DataTableColumn<TenantRecord>[] = [
    { id: "company", header: "Company", accessor: "companyName", sortable: true },
    { id: "code", header: "Code", accessor: "companyCode" },
    { id: "industry", header: "Industry", accessor: "industry" },
    { id: "country", header: "Country", accessor: "country" },
    { id: "plan", header: "Plan", accessor: "plan" },
    { id: "revenue", header: "Revenue", accessor: "revenue", align: "right" },
    { id: "qr", header: "QR Generated", accessor: "qrGenerated", align: "right" },
    { id: "status", header: "Status", cell: (row) => <WhiteLabelStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View tenant", icon: Eye, onClick: () => undefined }, { id: "edit", label: "Edit tenant", icon: PenLine, onClick: () => undefined }]} />;
};

export const FeatureFlagTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericWhiteLabelTable rows={rows} />;

export const GenericWhiteLabelTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") ? <WhiteLabelStatusBadge status={String(row[key])} /> : String(row[key]),
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
