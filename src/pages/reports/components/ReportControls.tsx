import { Download } from "lucide-react";
import { DateRangePicker, PrimaryButton, ReusableFormLayout, SecondaryButton, Select, Stepper, TextInput } from "../../../Components/enterprise";

export const ReportFilterPanel = () => (
  <div className="grid gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-4 md:grid-cols-4">
    <TextInput label="Keyword" placeholder="Search report data" />
    <DateRangePicker label="Date Range" value={{ from: "2026-06-01", to: "2026-07-05" }} onChange={() => undefined} />
    <Select label="Department" value="" onChange={() => undefined} placeholder="All departments" options={["Sales", "QR Ops", "Finance", "Warranty", "Audit"].map((value) => ({ label: value, value }))} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Ready", "Review", "Active", "Failed"].map((value) => ({ label: value, value }))} />
  </div>
);

export const ReportExportButtons = () => (
  <div className="flex flex-wrap gap-2">
    {["CSV", "XLSX", "PDF", "JSON"].map((format) => <SecondaryButton key={format} icon={Download}>{format}</SecondaryButton>)}
  </div>
);

export const ReportBuilderWizard = () => (
  <ReusableFormLayout title="Custom Report Builder" description="Select dataset, columns, filters, grouping, sorting, preview, and save report." columns={3} footer={<PrimaryButton>Save Report</PrimaryButton>}>
    <Stepper
      className="md:col-span-3"
      steps={["Dataset", "Columns", "Filters", "Grouping", "Sorting", "Preview", "Save"].map((title, index) => ({ id: title, title, status: index === 0 ? "current" : "upcoming" }))}
    />
    <Select label="Dataset" value="Products" onChange={() => undefined} options={["Products", "QR Codes", "Scans", "Customers", "Dealers", "Distributors", "Retailers", "Contractors", "Wallet Transactions", "Warranty Claims", "Campaigns", "Invoices", "Payments"].map((value) => ({ label: value, value }))} />
    <TextInput label="Columns" defaultValue="Name, Status, Region, Value" />
    <TextInput label="Filters" defaultValue="Date: Last 30 days" />
    <TextInput label="Grouping" defaultValue="Region" />
    <TextInput label="Sorting" defaultValue="Revenue desc" />
    <TextInput label="Report Name" defaultValue="Custom Executive Report" />
  </ReusableFormLayout>
);
