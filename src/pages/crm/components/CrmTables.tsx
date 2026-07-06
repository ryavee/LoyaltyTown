import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise/types";
import type { AccountRecord } from "../../../data/crm/accountDemoData";
import type { ContactRecord } from "../../../data/crm/contactDemoData";
import type { LeadRecord } from "../../../data/crm/leadDemoData";
import type { MeetingRecord } from "../../../data/crm/meetingDemoData";
import type { OpportunityRecord } from "../../../data/crm/opportunityDemoData";
import type { TaskRecord } from "../../../data/crm/taskDemoData";
import { CrmStatusBadge } from "./CrmStatusBadge";

const open = (path: string) => { window.location.href = path; };

export const LeadTable = ({ rows }: { rows: LeadRecord[] }) => {
  const columns: DataTableColumn<LeadRecord>[] = [
    { id: "leadName", header: "Lead", accessor: "leadName", sortable: true },
    { id: "company", header: "Company", accessor: "company" },
    { id: "industry", header: "Industry", accessor: "industry" },
    { id: "source", header: "Source", accessor: "source" },
    { id: "assignedTo", header: "Owner", accessor: "assignedTo" },
    { id: "estimatedValue", header: "Value", accessor: "estimatedValue", align: "right" },
    { id: "followupDate", header: "Follow-up", accessor: "followupDate" },
    { id: "status", header: "Status", cell: (row) => <CrmStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/leads/${row.id}`) }]} />;
};

export const AccountTable = ({ rows }: { rows: AccountRecord[] }) => {
  const columns: DataTableColumn<AccountRecord>[] = [
    { id: "companyName", header: "Company", accessor: "companyName", sortable: true },
    { id: "industry", header: "Industry", accessor: "industry" },
    { id: "gstNumber", header: "GST", accessor: "gstNumber" },
    { id: "contactPerson", header: "Contact", accessor: "contactPerson" },
    { id: "phone", header: "Phone", accessor: "phone" },
    { id: "accountOwner", header: "Owner", accessor: "accountOwner" },
    { id: "revenue", header: "Revenue", accessor: "revenue", align: "right" },
    { id: "status", header: "Status", cell: (row) => <CrmStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/accounts/${row.id}`) }]} />;
};

export const ContactTable = ({ rows }: { rows: ContactRecord[] }) => {
  const columns: DataTableColumn<ContactRecord>[] = [
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "account", header: "Account", accessor: "account" },
    { id: "role", header: "Role", accessor: "role" },
    { id: "phone", header: "Phone", accessor: "phone" },
    { id: "email", header: "Email", accessor: "email" },
    { id: "city", header: "City", accessor: "city" },
    { id: "status", header: "Status", cell: (row) => <CrmStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/contacts/${row.id}`) }]} />;
};

export const OpportunityTable = ({ rows }: { rows: OpportunityRecord[] }) => {
  const columns: DataTableColumn<OpportunityRecord>[] = [
    { id: "opportunityName", header: "Opportunity", accessor: "opportunityName", sortable: true },
    { id: "account", header: "Account", accessor: "account" },
    { id: "stage", header: "Stage", cell: (row) => <CrmStatusBadge status={row.stage} /> },
    { id: "estimatedValue", header: "Value", accessor: "estimatedValue", align: "right" },
    { id: "probability", header: "Probability", accessor: "probability", align: "right" },
    { id: "expectedCloseDate", header: "Close Date", accessor: "expectedCloseDate" },
    { id: "assignedTo", header: "Owner", accessor: "assignedTo" },
    { id: "status", header: "Status", cell: (row) => <CrmStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/opportunities/${row.id}`) }]} />;
};

export const TaskTable = ({ rows }: { rows: TaskRecord[] }) => {
  const columns: DataTableColumn<TaskRecord>[] = [
    { id: "task", header: "Task", accessor: "task", sortable: true },
    { id: "relatedTo", header: "Related To", accessor: "relatedTo" },
    { id: "dueDate", header: "Due", accessor: "dueDate" },
    { id: "owner", header: "Owner", accessor: "owner" },
    { id: "priority", header: "Priority", cell: (row) => <CrmStatusBadge status={row.priority} /> },
    { id: "status", header: "Status", cell: (row) => <CrmStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const GenericTable = <T extends Record<string, string>>({ rows }: { rows: T[] }) => {
  const columns: DataTableColumn<T>[] = Object.keys(rows[0] || {}).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    accessor: key,
    cell: key === "status" ? (row) => <CrmStatusBadge status={String(row[key])} /> : undefined,
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const MeetingCards = ({ rows }: { rows: MeetingRecord[] }) => (
  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {rows.map((meeting) => (
      <article key={meeting.id} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-white">{meeting.subject}</p><p className="mt-1 text-xs text-slate-500">{meeting.account}</p></div><CrmStatusBadge status={meeting.status} /></div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><p className="text-slate-500">Date <strong className="block text-white">{meeting.date}</strong></p><p className="text-slate-500">Time <strong className="block text-white">{meeting.time}</strong></p><p className="text-slate-500">Owner <strong className="block text-white">{meeting.owner}</strong></p><p className="text-slate-500">Type <strong className="block text-white">{meeting.type}</strong></p></div>
      </article>
    ))}
  </section>
);
