import { Eye, FileText, ReceiptText } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import type { InvoiceRecord } from "../../../data/finance/invoiceDemoData";
import type { PaymentRecord } from "../../../data/finance/paymentDemoData";
import { FinanceStatusBadge } from "./FinanceStatusBadge";

export const InvoiceTable = ({ rows }: { rows: InvoiceRecord[] }) => {
  const columns: DataTableColumn<InvoiceRecord>[] = [
    { id: "invoice", header: "Invoice", accessor: "invoiceNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "company", header: "Company", accessor: "company" },
    { id: "gst", header: "GST Number", accessor: "gstNumber" },
    { id: "tax", header: "Tax", accessor: "tax", align: "right" },
    { id: "total", header: "Total", accessor: "total", align: "right" },
    { id: "dueDate", header: "Due Date", accessor: "dueDate" },
    { id: "status", header: "Status", cell: (row) => <FinanceStatusBadge status={row.paymentStatus} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "preview", label: "Preview", icon: Eye, onClick: () => undefined }, { id: "credit-note", label: "Credit note", icon: FileText, onClick: () => undefined }]} />;
};

export const PaymentTable = ({ rows }: { rows: PaymentRecord[] }) => {
  const columns: DataTableColumn<PaymentRecord>[] = [
    { id: "payment", header: "Payment", accessor: "paymentId", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "invoice", header: "Invoice", accessor: "invoice" },
    { id: "method", header: "Method", accessor: "method" },
    { id: "amount", header: "Amount", accessor: "amount", align: "right" },
    { id: "timeline", header: "Timeline", accessor: "timeline" },
    { id: "status", header: "Status", cell: (row) => <FinanceStatusBadge status={row.status} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "details", label: "Payment details", icon: ReceiptText, onClick: () => undefined }]} />;
};

export const GenericFinanceTable = ({ rows }: { rows: Record<string, unknown>[] }) => {
  const keys = Object.keys(rows[0] || {}).filter((key) => key !== "id").slice(0, 7);
  const columns: DataTableColumn<Record<string, unknown>>[] = keys.map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    cell: (row) => key.toLowerCase().includes("status") || key.toLowerCase().includes("approval") ? <FinanceStatusBadge status={String(row[key])} /> : String(row[key]),
  }));

  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const LedgerTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericFinanceTable rows={rows} />;
export const ExpenseTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericFinanceTable rows={rows} />;
export const PayoutTable = ({ rows }: { rows: Record<string, unknown>[] }) => <GenericFinanceTable rows={rows} />;
