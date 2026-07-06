import { CheckCircle2, FileSpreadsheet, Upload } from "lucide-react";
import {
  DashboardWidget,
  EnterpriseDataTable,
  Stepper,
  PrimaryButton,
  SecondaryButton,
  Badge,
} from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import { importPreviewRows, validationResults } from "../../../data/productDemoData";

type ImportPreviewRow = (typeof importPreviewRows)[number];
type ValidationRow = (typeof validationResults)[number];

const previewColumns: DataTableColumn<ImportPreviewRow>[] = [
  { id: "product", header: "Product", accessor: "product" },
  { id: "code", header: "Code", accessor: "code" },
  { id: "brand", header: "Brand", accessor: "brand" },
  { id: "category", header: "Category", accessor: "category" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <Badge tone={row.status === "Valid" ? "success" : "warning"}>{row.status}</Badge> },
];

const validationColumns: DataTableColumn<ValidationRow>[] = [
  { id: "rule", header: "Validation Rule", accessor: "rule" },
  { id: "passed", header: "Passed", accessor: "passed" },
  { id: "failed", header: "Failed", accessor: "failed" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <Badge tone={row.status === "Passed" ? "success" : "warning"}>{row.status}</Badge> },
];

export const ImportWizard = () => (
  <div className="space-y-4">
    <Stepper
      steps={[
        { id: "upload", title: "Upload CSV/XLSX", status: "complete" },
        { id: "preview", title: "Preview Data", status: "complete" },
        { id: "validate", title: "Validation Results", status: "current" },
        { id: "confirm", title: "Confirm Import", status: "upcoming" },
        { id: "summary", title: "Import Summary", status: "upcoming" },
      ]}
    />

    <DashboardWidget title="Upload CSV/XLSX" subtitle="Static upload area for future bulk import integration.">
      <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
        <Upload className="h-9 w-9 text-cyan-300" />
        <h3 className="mt-4 text-base font-semibold text-white">Drop product catalog file here</h3>
        <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">Supports CSV and XLSX templates with product, brand, category, warranty, and status fields.</p>
        <SecondaryButton className="mt-5" icon={FileSpreadsheet}>Select File</SecondaryButton>
      </div>
    </DashboardWidget>

    <DashboardWidget title="Preview Data" subtitle="First rows from the uploaded file.">
      <EnterpriseDataTable rows={importPreviewRows} columns={previewColumns} />
    </DashboardWidget>

    <DashboardWidget title="Validation Results" subtitle="Import readiness checks before confirmation.">
      <EnterpriseDataTable rows={validationResults} columns={validationColumns} />
    </DashboardWidget>

    <DashboardWidget title="Confirm Import" subtitle="No data will be imported until backend APIs are connected.">
      <div className="flex flex-col gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-cyan-200" />
          <div>
            <p className="text-sm font-semibold text-white">2,482 products ready for import</p>
            <p className="text-sm text-cyan-50/70">11 rows require review before final processing.</p>
          </div>
        </div>
        <PrimaryButton>Confirm Import</PrimaryButton>
      </div>
    </DashboardWidget>

    <DashboardWidget title="Import Summary" subtitle="Summary placeholder for future import job result.">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Imported", "2,482"],
          ["Warnings", "11"],
          ["Failed", "0"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </DashboardWidget>
  </div>
);
