import { Check, ListFilter } from "lucide-react";
import type { SelectOption } from "../types";
import { cn } from "../utils";

type MultiSelectFilterProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
};

export const MultiSelectFilter = ({ value, onChange, options, label = "Options", className }: MultiSelectFilterProps) => {
  const toggle = (optionValue: string) => {
    onChange(value.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue]);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
        <ListFilter className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => toggle(option.value)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition disabled:opacity-50",
                selected
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                  : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800",
              )}
            >
              {selected ? <Check className="h-3.5 w-3.5" /> : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
