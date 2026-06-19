/* eslint-disable react-refresh/only-export-components */
import { createElement } from "react";
import { Search } from "lucide-react";

export const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Scanned: "bg-blue-50 text-blue-700 border-blue-200",
  Expired: "bg-amber-50 text-amber-700 border-amber-200",
  Blocked: "bg-rose-50 text-rose-700 border-rose-200",
  Completed: "bg-violet-50 text-violet-700 border-violet-200",
  Draft: "bg-slate-50 text-slate-600 border-slate-200",
  Valid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Duplicate: "bg-amber-50 text-amber-700 border-amber-200",
  Fake: "bg-rose-50 text-rose-700 border-rose-200",
};

export const StatusBadge = ({ value }) => (
  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[value] || statusStyles.Draft}`}>
    {value}
  </span>
);

export const SearchField = ({ value, onChange, placeholder }) => (
  <div className="relative w-full sm:max-w-md">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAA2BE]" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-[#E7DFF2] bg-[#FAF8FE] py-2.5 pl-10 pr-4 text-sm text-[#2B2340] outline-none transition focus:border-[#B8A6F3] focus:ring-2 focus:ring-[#EEE8FF]"
    />
  </div>
);

export const StatTile = ({ icon: Icon, label, value, tone = "violet" }) => {
  const tones = {
    violet: "bg-[#EEE8FF] text-[#5B3FD6]",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-[#E7DFF2] bg-white p-4 shadow-[0_1px_3px_rgba(43,35,64,0.04)]">
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
        {createElement(Icon, { className: "h-4 w-4" })}
      </div>
      <p className="text-xs font-medium text-[#8E8AA2]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#2B2340]">{value}</p>
    </div>
  );
};

export const TableShell = ({ children }) => (
  <div className="overflow-hidden rounded-2xl border border-[#E7DFF2] bg-white shadow-[0_1px_3px_rgba(43,35,64,0.04)]">
    <div className="overflow-x-auto">{children}</div>
  </div>
);

export const TableEmpty = ({ message }) => (
  <tr>
    <td colSpan="20" className="px-6 py-16 text-center text-sm text-[#8E8AA2]">
      {message}
    </td>
  </tr>
);
