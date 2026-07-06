import { Columns3, Eye, EyeOff } from "lucide-react";
import type { DataTableColumn } from "../types";
import { cn } from "../utils";

type ColumnVisibilityProps<T> = {
  columns: DataTableColumn<T>[];
  visibleColumns: string[];
  onChange: (columnIds: string[]) => void;
  className?: string;
};

export const ColumnVisibility = <T,>({ columns, visibleColumns, onChange, className }: ColumnVisibilityProps<T>) => {
  const toggle = (columnId: string) => {
    onChange(
      visibleColumns.includes(columnId)
        ? visibleColumns.filter((id) => id !== columnId)
        : [...visibleColumns, columnId],
    );
  };

  return (
    <div className={cn("rounded-lg border border-slate-800 bg-slate-950/80 p-3", className)}>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
        <Columns3 className="h-3.5 w-3.5" />
        Columns
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {columns.map((column) => {
          const visible = visibleColumns.includes(column.id);
          return (
            <button
              key={column.id}
              type="button"
              onClick={() => toggle(column.id)}
              className={cn(
                "flex h-9 items-center justify-between gap-2 rounded-md border px-3 text-sm transition",
                visible
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                  : "border-slate-800 bg-slate-900 text-slate-400",
              )}
            >
              <span className="truncate">{column.header}</span>
              {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
