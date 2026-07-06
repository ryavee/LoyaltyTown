import { CalendarDays } from "lucide-react";
import { cn, fieldBase } from "../utils";

type DateRangeValue = {
  from?: string;
  to?: string;
};

type DateRangeFilterProps = {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  label?: string;
  className?: string;
};

export const DateRangeFilter = ({ value, onChange, label = "Date range", className }: DateRangeFilterProps) => (
  <div className={cn("space-y-2", className)}>
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
      <CalendarDays className="h-3.5 w-3.5" />
      {label}
    </div>
    <div className="grid gap-2 sm:grid-cols-2">
      <input
        type="date"
        value={value.from || ""}
        onChange={(event) => onChange({ ...value, from: event.target.value })}
        className={fieldBase}
        aria-label={`${label} from`}
      />
      <input
        type="date"
        value={value.to || ""}
        onChange={(event) => onChange({ ...value, to: event.target.value })}
        className={fieldBase}
        aria-label={`${label} to`}
      />
    </div>
  </div>
);
