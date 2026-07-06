import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import type { FraudAlertRecord } from "../../../data/ai/fraudDemoData";
import type { OCRRecord } from "../../../data/ai/ocrDemoData";
import { FraudStatusBadge, RiskScoreBadge } from "./AIStatusBadges";

export const FraudAlertTable = ({ rows }: { rows: FraudAlertRecord[] }) => {
  const columns: DataTableColumn<FraudAlertRecord>[] = [
    { id: "alert", header: "Alert", accessor: "alertId", sortable: true },
    { id: "type", header: "Fraud Type", accessor: "fraudType" },
    { id: "entity", header: "Entity", accessor: "entity" },
    { id: "region", header: "Region", accessor: "region" },
    { id: "risk", header: "Risk Score", cell: (row) => <RiskScoreBadge score={row.riskScore} /> },
    { id: "confidence", header: "Confidence", accessor: "confidence" },
    { id: "status", header: "Status", cell: (row) => <FraudStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View alert", icon: Eye, onClick: () => undefined }]} />;
};

export const OCRResultTable = ({ rows }: { rows: OCRRecord[] }) => {
  const columns: DataTableColumn<OCRRecord>[] = [
    { id: "invoice", header: "Invoice", accessor: "invoiceNumber" },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "amount", header: "Amount", accessor: "amount", align: "right" },
    { id: "date", header: "Purchase Date", accessor: "purchaseDate" },
    { id: "confidence", header: "Confidence", accessor: "confidenceScore" },
    { id: "status", header: "Status", cell: (row) => <FraudStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ForecastTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericAITables rows={rows} />;
export const ModelRegistryTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericAITables rows={rows} />;

export const GenericAITables = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") ? <FraudStatusBadge status={String(row[key])} /> : key.toLowerCase().includes("risk") && !Number.isNaN(Number(row[key])) ? <RiskScoreBadge score={String(row[key])} /> : String(row[key]),
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
