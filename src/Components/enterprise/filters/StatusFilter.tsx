import { CircleDot } from "lucide-react";
import type { SelectOption } from "../types";
import { cn, fieldBase } from "../utils";

type StatusFilterProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
};

export const StatusFilter = ({ value, onChange, options, label = "Status", className }: StatusFilterProps) => (
  <label className={cn("block space-y-2", className)}>
    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
      <CircleDot className="h-3.5 w-3.5" />
      {label}
    </span>
    <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldBase}>
      <option value="">All statuses</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
