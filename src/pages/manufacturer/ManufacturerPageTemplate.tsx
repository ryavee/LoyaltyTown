import type { ReactNode } from "react";
import { useState } from "react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  AdvancedFilters,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  LoadingSkeleton,
  PageToolbar,
  Pagination,
  SearchInput,
  SecondaryButton,
  Select,
} from "../../Components/enterprise";
import type { DataTableColumn } from "../../Components/enterprise";
import type { LucideIcon } from "lucide-react";

type TemplateRow = Record<string, string | number>;

type ManufacturerPageTemplateProps = {
  title: string;
  description: string;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
  kpis?: Array<{ id: string; label: string; value: string | number; target?: string; progress?: number; icon?: LucideIcon }>;
  rows?: TemplateRow[];
  columns?: DataTableColumn<TemplateRow>[];
  loading?: boolean;
};

const fallbackRows = [
  { id: "demo-1", name: "Demo record", owner: "Manufacturer Admin", status: "Ready" },
  { id: "demo-2", name: "Template record", owner: "Operations", status: "Static" },
];

const fallbackColumns: DataTableColumn<TemplateRow>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "owner", header: "Owner", accessor: "owner", sortable: true },
  { id: "status", header: "Status", accessor: "status", sortable: true },
];

export const ManufacturerPageTemplate = ({
  title,
  description,
  primaryAction,
  secondaryActions,
  kpis = [],
  rows = fallbackRows,
  columns = fallbackColumns,
  loading = false,
}: ManufacturerPageTemplateProps) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState("");
  const [created, setCreated] = useState("");

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <PageToolbar
        title={title}
        description={description}
        end={
          <>
            {secondaryActions}
            {primaryAction ?? <SecondaryButton>Create</SecondaryButton>}
          </>
        }
      />
      {kpis.length ? <KPIGrid items={kpis} /> : null}
      <div className="grid gap-3">
        <SearchInput value={query} onChange={setQuery} placeholder={`Search ${title.toLowerCase()}`} />
        <AdvancedFilters>
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Draft", value: "draft" },
            ]}
          />
          <Select
            label="Owner"
            value={owner}
            onChange={setOwner}
            options={[
              { label: "All", value: "all" },
              { label: "Operations", value: "operations" },
              { label: "Manufacturer Admin", value: "manufacturer-admin" },
            ]}
          />
          <Select
            label="Created Date"
            value={created}
            onChange={setCreated}
            options={[
              { label: "Last 7 days", value: "7d" },
              { label: "Last 30 days", value: "30d" },
              { label: "This quarter", value: "quarter" },
            ]}
          />
        </AdvancedFilters>
      </div>
      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <EnterpriseDataTable
          title={title}
          description={description}
          rows={rows}
          columns={columns}
          enableSelection
          showImportPlaceholder
          showExportPlaceholder
          emptyState={<EmptyState title={`No ${title.toLowerCase()} found`} description="Static demo records will appear here until backend integration starts." />}
          pagination={{ page: 1, pageCount: 1, totalLabel: `${rows.length} demo records`, onPageChange: () => undefined }}
        />
      )}
      <Pagination page={1} pageCount={1} totalLabel="Template pagination placeholder" onPageChange={() => undefined} />
    </div>
  );
};

export default ManufacturerPageTemplate;
