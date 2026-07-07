import type { LucideIcon } from "lucide-react";
import { Filter, Search } from "lucide-react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { operationsDemoData, type OperationRow, type OperationType } from "../../data/operationsDemoData";

type OperationsPageProps = {
  type: OperationType;
  icon: LucideIcon;
};

const statusTone = (status: string) => {
  if (["Completed", "Delivered", "Active", "Registered"].includes(status)) return "success";
  if (["Pending", "Pending Approval", "Review", "Follow-up", "In Service"].includes(status)) return "warning";
  if (["Delayed", "Escalated", "Support Open"].includes(status)) return "danger";
  return "info";
};

export default function OperationsPage({ type, icon: Icon }: OperationsPageProps) {
  const data = operationsDemoData[type];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operating Cloud"
        title={data.title}
        description={data.description}
        actions={
          <>
            <button className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Export</button>
            <button className="h-10 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Create</button>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-4">
        {data.kpis.map((kpi) => <StatCard key={kpi.label} {...kpi} icon={Icon} />)}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              placeholder={`Search ${data.title.toLowerCase()}`}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.filters.map((filter) => (
              <button key={filter} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-950">
                <Filter className="h-4 w-4" />
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <DataTable<OperationRow>
        title={`${data.title} Table`}
        description="Mock operating records for the core frontend foundation. No backend is connected."
        rows={data.rows}
        columns={[
          { key: "name", header: "Name" },
          { key: "owner", header: "Owner" },
          { key: "location", header: "Location" },
          { key: "category", header: "Category" },
          { key: "value", header: "Value", align: "right" },
          { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={statusTone(row.status)} /> },
        ]}
      />
    </div>
  );
}
