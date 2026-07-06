import { Archive, Eye, FileText, PenLine, Wrench } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import type { ClaimRecord } from "../../../data/service/claimDemoData";
import type { ServiceRequestRecord } from "../../../data/service/serviceDemoData";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

type RmaRow = {
  id: string;
  rmaNumber: string;
  customer: string;
  product: string;
  action: string;
  inspection: string;
  repair: string;
  refund: string;
  creditNote: string;
  status: string;
};

type TicketRow = {
  id: string;
  ticket: string;
  subject: string;
  requester: string;
  priority: string;
  owner: string;
  status: string;
};

export const ClaimTable = ({ rows }: { rows: ClaimRecord[] }) => {
  const columns: DataTableColumn<ClaimRecord>[] = [
    { id: "claimNumber", header: "Claim", accessor: "claimNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "issue", header: "Issue", accessor: "issue" },
    { id: "priority", header: "Priority", accessor: "priority" },
    { id: "engineer", header: "Engineer", accessor: "assignedEngineer" },
    { id: "status", header: "Status", cell: (row) => <ServiceStatusBadge status={row.status} /> },
  ];

  return (
    <EnterpriseDataTable
      rows={rows}
      columns={columns}
      actions={[
        { id: "view", label: "View", icon: Eye, onClick: () => undefined },
        { id: "inspect", label: "Inspection report", icon: FileText, onClick: () => undefined },
        { id: "edit", label: "Edit", icon: PenLine, onClick: () => undefined },
      ]}
    />
  );
};

export const ServiceRequestTable = ({ rows }: { rows: ServiceRequestRecord[] }) => {
  const columns: DataTableColumn<ServiceRequestRecord>[] = [
    { id: "serviceNumber", header: "Service No.", accessor: "serviceNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "location", header: "Location", accessor: "location" },
    { id: "technician", header: "Technician", accessor: "technician" },
    { id: "issue", header: "Issue", accessor: "issue" },
    { id: "schedule", header: "Schedule", accessor: "schedule" },
    { id: "status", header: "Status", cell: (row) => <ServiceStatusBadge status={row.status} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "assign", label: "Assign job", icon: Wrench, onClick: () => undefined }]} />;
};

export const RMATable = ({ rows }: { rows: RmaRow[] }) => {
  const columns: DataTableColumn<RmaRow>[] = [
    { id: "rmaNumber", header: "RMA", accessor: "rmaNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "action", header: "Action", accessor: "action" },
    { id: "inspection", header: "Inspection", accessor: "inspection" },
    { id: "repair", header: "Repair", accessor: "repair" },
    { id: "creditNote", header: "Credit Note", accessor: "creditNote" },
    { id: "status", header: "Status", cell: (row) => <ServiceStatusBadge status={row.status} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "archive", label: "Archive", icon: Archive, onClick: () => undefined }]} />;
};

export const HelpdeskTable = ({ rows }: { rows: TicketRow[] }) => {
  const columns: DataTableColumn<TicketRow>[] = [
    { id: "ticket", header: "Ticket", accessor: "ticket", sortable: true },
    { id: "subject", header: "Subject", accessor: "subject" },
    { id: "requester", header: "Requester", accessor: "requester" },
    { id: "priority", header: "Priority", accessor: "priority" },
    { id: "owner", header: "Owner", accessor: "owner" },
    { id: "status", header: "Status", cell: (row) => <ServiceStatusBadge status={row.status} /> },
  ];

  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View ticket", icon: Eye, onClick: () => undefined }]} />;
};
