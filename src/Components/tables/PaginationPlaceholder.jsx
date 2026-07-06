import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationPlaceholder = () => (
  <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
    <span>Showing 0 to 0 of 0 records</span>
    <div className="flex items-center gap-2">
      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 text-slate-500">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button className="h-8 min-w-8 rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 text-cyan-200">1</button>
      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 text-slate-500">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default PaginationPlaceholder;
