import type { ReactNode } from "react";
import EmptyState from "./EmptyState";

export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
};

type DataTableProps<T extends { id?: string | number }> = {
  title?: string;
  description?: string;
  columns: DataTableColumn<T>[];
  rows: T[];
};

export default function DataTable<T extends { id?: string | number }>({ title, description, columns, rows }: DataTableProps<T>) {
  if (!rows.length) {
    return <EmptyState title="No records found" description="Records will appear here when demo or backend data is available." />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      {title || description ? (
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          {title ? <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h2> : null}
          {description ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p> : null}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-950/70">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className={`px-4 py-3 font-semibold ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id ?? index} className="border-t border-slate-100 dark:border-slate-800">
                {columns.map((column) => (
                  <td key={String(column.key)} className={`px-4 py-3 text-slate-600 dark:text-slate-300 ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"}`}>
                    {column.render ? column.render(row) : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
