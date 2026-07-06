import { MoreHorizontal, ArrowUpDown, Download, Upload } from "lucide-react";
import type { ReactNode } from "react";
import type { DataTableAction, DataTableBulkAction, DataTableColumn } from "../types";
import { buttonBase, buttonVariants, cn, panelBase } from "../utils";
import { EmptyState } from "../feedback/EmptyState";
import { Pagination } from "../primitives/Pagination";

type EnterpriseDataTableProps<T extends { id?: string | number }> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  getRowId?: (row: T, index: number) => string | number;
  loading?: boolean;
  emptyState?: ReactNode;
  visibleColumns?: string[];
  className?: string;
  title?: string;
  description?: string;
  ariaLabel?: string;
  enableSelection?: boolean;
  selectedRowIds?: Array<string | number>;
  onSelectedRowIdsChange?: (rowIds: Array<string | number>) => void;
  bulkActions?: DataTableBulkAction[];
  sortState?: { columnId: string; direction: "asc" | "desc" };
  onSort?: (columnId: string) => void;
  showExportPlaceholder?: boolean;
  showImportPlaceholder?: boolean;
  onExport?: () => void;
  onImport?: () => void;
  pagination?: {
    page: number;
    pageCount: number;
    totalLabel?: string;
    onPageChange: (page: number) => void;
  };
};

const readCell = <T,>(row: T, column: DataTableColumn<T>) => {
  if (column.cell) return column.cell(row);
  if (typeof column.accessor === "function") return column.accessor(row);
  if (column.accessor) return row[column.accessor] as ReactNode;
  return null;
};

export const EnterpriseDataTable = <T extends { id?: string | number },>({
  rows,
  columns,
  actions = [],
  getRowId,
  loading = false,
  emptyState,
  visibleColumns,
  className,
  title,
  description,
  ariaLabel,
  enableSelection = false,
  selectedRowIds = [],
  onSelectedRowIdsChange,
  bulkActions = [],
  sortState,
  onSort,
  showExportPlaceholder = false,
  showImportPlaceholder = false,
  onExport,
  onImport,
  pagination,
}: EnterpriseDataTableProps<T>) => {
  const renderedColumns = columns.filter((column) =>
    visibleColumns ? visibleColumns.includes(column.id) : !column.hidden,
  );
  const rowIds = rows.map((row, index) => getRowId?.(row, index) ?? row.id ?? index);
  const selectedSet = new Set(selectedRowIds);
  const selectedCount = rowIds.filter((rowId) => selectedSet.has(rowId)).length;
  const allVisibleSelected = rowIds.length > 0 && selectedCount === rowIds.length;
  const partiallySelected = selectedCount > 0 && !allVisibleSelected;

  const setSelected = (nextIds: Array<string | number>) => {
    onSelectedRowIdsChange?.(nextIds);
  };

  const toggleAll = () => {
    if (!onSelectedRowIdsChange) return;
    setSelected(allVisibleSelected ? selectedRowIds.filter((rowId) => !rowIds.includes(rowId)) : Array.from(new Set([...selectedRowIds, ...rowIds])));
  };

  const toggleRow = (rowId: string | number) => {
    if (!onSelectedRowIdsChange) return;
    setSelected(selectedSet.has(rowId) ? selectedRowIds.filter((selectedId) => selectedId !== rowId) : [...selectedRowIds, rowId]);
  };

  return (
    <div className={cn(panelBase, "overflow-hidden", className)}>
      {title || description || bulkActions.length || showExportPlaceholder || showImportPlaceholder ? (
        <div className="flex flex-col gap-3 border-b border-slate-800 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            {title ? <h3 className="text-sm font-semibold text-slate-100">{title}</h3> : null}
            {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {selectedCount > 0 ? <span className="text-xs font-semibold text-cyan-200">{selectedCount} selected</span> : null}
            {bulkActions.map((action) => {
              const Icon = action.icon || MoreHorizontal;
              return (
                <button
                  key={action.id}
                  type="button"
                  disabled={selectedCount === 0}
                  onClick={() => action.onClick(selectedRowIds)}
                  className={cn(buttonBase, action.destructive ? buttonVariants.danger : buttonVariants.secondary, "h-8 px-2.5 text-xs")}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {action.label}
                </button>
              );
            })}
            {showImportPlaceholder || onImport ? (
              <button type="button" onClick={onImport} className={cn(buttonBase, buttonVariants.secondary, "h-8 px-2.5 text-xs")}>
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                Import
              </button>
            ) : null}
            {showExportPlaceholder || onExport ? (
              <button type="button" onClick={onExport} className={cn(buttonBase, buttonVariants.secondary, "h-8 px-2.5 text-xs")}>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Export
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm" aria-label={ariaLabel || title || "Enterprise data table"}>
          <thead>
            <tr className="bg-slate-900/90">
              {enableSelection ? (
                <th scope="col" className="w-12 border-b border-slate-800 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = partiallySelected;
                    }}
                    disabled={!onSelectedRowIdsChange || rows.length === 0}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                  />
                </th>
              ) : null}
              {renderedColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={
                    sortState?.columnId === column.id
                      ? sortState.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : column.sortable
                        ? "none"
                        : undefined
                  }
                  style={{ width: column.width }}
                  className={cn(
                    "border-b border-slate-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500",
                    column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left",
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort?.(column.id)}
                      className={cn("inline-flex items-center gap-1.5 rounded-sm transition hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40", column.align === "right" && "justify-end")}
                    >
                      {column.header}
                      <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  ) : (
                    <span className={cn("inline-flex items-center gap-1.5", column.align === "right" && "justify-end")}>{column.header}</span>
                  )}
                </th>
              ))}
              {actions.length ? (
                <th scope="col" className="w-16 border-b border-slate-800 px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    {enableSelection ? (
                      <td className="border-b border-slate-800 px-4 py-4">
                        <div className="h-4 w-4 animate-pulse rounded bg-slate-800" />
                      </td>
                    ) : null}
                    {renderedColumns.map((column) => (
                      <td key={column.id} className="border-b border-slate-800 px-4 py-4">
                        <div className="h-4 w-28 animate-pulse rounded bg-slate-800" />
                      </td>
                    ))}
                    {actions.length ? (
                      <td className="border-b border-slate-800 px-4 py-4">
                        <div className="ml-auto h-4 w-8 animate-pulse rounded bg-slate-800" />
                      </td>
                    ) : null}
                  </tr>
                ))
              : rows.map((row, index) => {
                  const rowId = rowIds[index];
                  return (
                  <tr key={rowId} className="group transition hover:bg-slate-900/60">
                    {enableSelection ? (
                      <td className="border-b border-slate-800/80 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedSet.has(rowId)}
                          disabled={!onSelectedRowIdsChange}
                          onChange={() => toggleRow(rowId)}
                          aria-label={`Select row ${index + 1}`}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                        />
                      </td>
                    ) : null}
                    {renderedColumns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          "border-b border-slate-800/80 px-4 py-3 text-slate-300",
                          column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left",
                        )}
                      >
                        {readCell(row, column)}
                      </td>
                    ))}
                    {actions.length ? (
                      <td className="border-b border-slate-800/80 px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          {actions.map((action) => {
                            const Icon = action.icon || MoreHorizontal;
                            return (
                              <button
                                key={action.id}
                                type="button"
                                onClick={() => action.onClick(row)}
                                className={cn(
                                  "inline-flex h-8 w-8 items-center justify-center rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                                  action.destructive
                                    ? "text-rose-300 hover:bg-rose-400/10"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                                )}
                                aria-label={action.label}
                                title={action.label}
                              >
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
                })}
          </tbody>
        </table>
      </div>
      {!loading && rows.length === 0 ? emptyState ?? <EmptyState title="No records found" /> : null}
      {pagination ? (
        <Pagination
          page={pagination.page}
          pageCount={pagination.pageCount}
          totalLabel={pagination.totalLabel}
          onPageChange={pagination.onPageChange}
          className="rounded-none border-x-0 border-b-0 bg-slate-950/40"
        />
      ) : null}
    </div>
  );
};
