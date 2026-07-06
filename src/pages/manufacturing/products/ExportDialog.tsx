import { Download, FileText, Filter } from "lucide-react";
import {
  Badge,
  Checkbox,
  DashboardWidget,
  DateRangePicker,
  PrimaryButton,
  RadioGroup,
  Select,
} from "../../../Components/enterprise";
import { brands, categories, exportFields, statuses } from "../../../data/productDemoData";

export const ExportDialog = () => (
  <div className="space-y-4">
    <DashboardWidget title="Select Fields" subtitle="Choose product fields for export.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {exportFields.map((field, index) => (
          <Checkbox key={field} checked={index < 8} onChange={() => undefined} label={field} />
        ))}
      </div>
    </DashboardWidget>

    <DashboardWidget title="Select Format" subtitle="Export format options for downstream teams.">
      <RadioGroup
        value="xlsx"
        onChange={() => undefined}
        options={[
          { label: "CSV", value: "csv" },
          { label: "XLSX", value: "xlsx" },
          { label: "PDF", value: "pdf" },
        ]}
      />
    </DashboardWidget>

    <DashboardWidget title="Apply Filters" subtitle="Use static filters to shape the export package." actions={<Filter className="h-5 w-5 text-cyan-300" />}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Select label="Category" value="" onChange={() => undefined} options={categories.map((item) => ({ label: item, value: item }))} />
        <Select label="Brand" value="" onChange={() => undefined} options={brands.map((item) => ({ label: item, value: item }))} />
        <Select label="Status" value="" onChange={() => undefined} options={statuses.map((item) => ({ label: item, value: item }))} />
        <DateRangePicker label="Updated Date Range" value={{ from: "2026-06-01", to: "2026-07-05" }} onChange={() => undefined} />
      </div>
    </DashboardWidget>

    <DashboardWidget title="Generate Export" subtitle="Frontend-only export preparation summary." actions={<FileText className="h-5 w-5 text-cyan-300" />}>
      <div className="flex flex-col gap-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="info">XLSX</Badge>
            <Badge tone="success">8 fields</Badge>
            <Badge tone="warning">3 filters</Badge>
          </div>
          <p className="mt-3 text-sm text-cyan-50/80">A generated export will be available here once backend export jobs are connected.</p>
        </div>
        <PrimaryButton icon={Download}>Generate Export</PrimaryButton>
      </div>
    </DashboardWidget>
  </div>
);
