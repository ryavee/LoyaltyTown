import { Filter, Search, SlidersHorizontal } from "lucide-react";

const EnterpriseFilters = ({ searchPlaceholder = "Search records" }) => (
  <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 md:flex-row md:items-center md:justify-between">
    <label className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        placeholder={searchPlaceholder}
        className="h-10 w-full rounded-md border border-slate-800 bg-slate-900 pl-9 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
      />
    </label>
    <div className="flex items-center gap-2">
      <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
        <Filter className="h-4 w-4" />
        Filters
      </button>
      <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
        <SlidersHorizontal className="h-4 w-4" />
        Views
      </button>
    </div>
  </div>
);

export default EnterpriseFilters;
