import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { SelectOption } from "../types";
import { cn, fieldBase } from "../utils";

type FieldShellProps = {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export const FieldShell = ({ label, hint, error, children, className }: FieldShellProps) => (
  <label className={cn("block space-y-2", className)}>
    {label ? <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</span> : null}
    {children}
    {error ? <span className="block text-xs text-rose-300">{error}</span> : hint ? <span className="block text-xs text-slate-500">{hint}</span> : null}
  </label>
);

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const TextInput = ({ label, hint, error, className, ...props }: TextInputProps) => (
  <FieldShell label={label} hint={hint} error={error}>
    <input className={cn(fieldBase, className)} {...props} />
  </FieldShell>
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Textarea = ({ label, hint, error, className, rows = 4, ...props }: TextareaProps) => (
  <FieldShell label={label} hint={hint} error={error}>
    <textarea className={cn(fieldBase, "min-h-28 py-3", className)} rows={rows} {...props} />
  </FieldShell>
);

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export const SearchInput = ({ value, onChange, label, className, placeholder = "Search", ...props }: SearchInputProps) => (
  <FieldShell label={label} className={className}>
    <span className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        {...props}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldBase, "pl-9")}
      />
    </span>
  </FieldShell>
);

export const GlobalSearch = (props: SearchInputProps) => (
  <SearchInput placeholder="Search across LoyaltyTown" {...props} />
);

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
};

export const Select = ({ value, onChange, options, label, placeholder = "Select option", error, className }: SelectProps) => (
  <FieldShell label={label} error={error} className={className}>
    <span className="relative block">
      <select value={value} onChange={(event) => onChange(event.target.value)} className={cn(fieldBase, "appearance-none pr-9")}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </span>
  </FieldShell>
);

type AutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  className?: string;
};

export const Autocomplete = ({ value, onChange, options, label, placeholder = "Search options", className }: AutocompleteProps) => {
  const listId = `autocomplete-${label || placeholder}`.replace(/\s+/g, "-").toLowerCase();

  return (
    <FieldShell label={label} className={className}>
      <input
        list={listId}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={fieldBase}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </FieldShell>
  );
};

type MultiSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
};

export const MultiSelect = ({ value, onChange, options, label, className }: MultiSelectProps) => {
  const toggle = (optionValue: string) => {
    onChange(value.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue]);
  };

  return (
    <FieldShell label={label} className={className}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option.value);
          return (
            <button
              type="button"
              key={option.value}
              disabled={option.disabled}
              onClick={() => toggle(option.value)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition disabled:opacity-50",
                selected ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800",
              )}
            >
              {selected ? <Check className="h-3.5 w-3.5" /> : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
};

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
};

export const DatePicker = ({ value, onChange, label, className }: DatePickerProps) => (
  <FieldShell label={label} className={className}>
    <input type="date" value={value} onChange={(event) => onChange(event.target.value)} className={fieldBase} />
  </FieldShell>
);

type DateRangePickerProps = {
  value: { from?: string; to?: string };
  onChange: (value: { from?: string; to?: string }) => void;
  label?: string;
  className?: string;
};

export const DateRangePicker = ({ value, onChange, label, className }: DateRangePickerProps) => (
  <FieldShell label={label} className={className}>
    <div className="grid gap-2 sm:grid-cols-2">
      <input type="date" value={value.from || ""} onChange={(event) => onChange({ ...value, from: event.target.value })} className={fieldBase} />
      <input type="date" value={value.to || ""} onChange={(event) => onChange({ ...value, to: event.target.value })} className={fieldBase} />
    </div>
  </FieldShell>
);
