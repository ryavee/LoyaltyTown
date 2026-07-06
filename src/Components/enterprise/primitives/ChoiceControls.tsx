import { Check, Circle } from "lucide-react";
import type { SelectOption } from "../types";
import { cn } from "../utils";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const Toggle = ({ checked, onChange, label, disabled }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className="inline-flex items-center gap-3 disabled:opacity-50"
  >
    <span className={cn("relative h-6 w-11 rounded-full transition", checked ? "bg-cyan-400" : "bg-slate-800")}>
      <span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white transition", checked ? "left-6" : "left-1")} />
    </span>
    {label ? <span className="text-sm font-medium text-slate-300">{label}</span> : null}
  </button>
);

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const Checkbox = ({ checked, onChange, label, disabled }: CheckboxProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className="inline-flex items-center gap-3 disabled:opacity-50"
  >
    <span className={cn("flex h-5 w-5 items-center justify-center rounded border transition", checked ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-slate-700 bg-slate-900 text-transparent")}>
      <Check className="h-3.5 w-3.5" />
    </span>
    {label ? <span className="text-sm font-medium text-slate-300">{label}</span> : null}
  </button>
);

type RadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
};

export const RadioGroup = ({ value, onChange, options, label }: RadioGroupProps) => (
  <div className="space-y-2">
    {label ? <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p> : null}
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition disabled:opacity-50",
              active ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800",
            )}
          >
            <Circle className={cn("h-3 w-3", active && "fill-current")} />
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);
