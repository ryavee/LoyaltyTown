import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  totalLabel?: string;
  className?: string;
};

export const Pagination = ({ page, pageCount, onPageChange, totalLabel, className }: PaginationProps) => {
  const pages = Array.from({ length: Math.min(pageCount, 5) }, (_, index) => index + 1);

  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between", className)}>
      <span>{totalLabel || `Page ${page} of ${pageCount}`}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn("h-8 min-w-8 rounded-md border px-3", pageNumber === page ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-slate-800 text-slate-400 hover:bg-slate-800")}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 text-slate-400 hover:bg-slate-800 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
