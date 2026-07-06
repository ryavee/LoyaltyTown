const rows = Array.from({ length: 7 }, (_, index) => index);

const TablePlaceholder = ({ title }) => (
  <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
    <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_120px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
      <span>{title}</span>
      <span>Status</span>
      <span>Owner</span>
      <span>Updated</span>
      <span className="text-right">Actions</span>
    </div>
    <div className="divide-y divide-slate-800/80">
      {rows.map((row) => (
        <div key={row} className="grid grid-cols-[1.4fr_1fr_1fr_1fr_120px] gap-4 px-4 py-3 text-sm">
          <div className="h-4 w-40 rounded bg-slate-800" />
          <div className="h-4 w-20 rounded bg-slate-800" />
          <div className="h-4 w-24 rounded bg-slate-800" />
          <div className="h-4 w-28 rounded bg-slate-800" />
          <div className="ml-auto h-4 w-16 rounded bg-slate-800" />
        </div>
      ))}
    </div>
  </div>
);

export default TablePlaceholder;
