import { Search, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn, fieldBase } from "../utils";

type EnterpriseSearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export const EnterpriseSearchBar = ({
  value,
  onChange,
  onClear,
  className,
  placeholder = "Search",
  ...props
}: EnterpriseSearchBarProps) => (
  <label className={cn("relative block min-w-0", className)}>
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    <input
      {...props}
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(fieldBase, "pl-9", value ? "pr-10" : "pr-3")}
    />
    {value ? (
      <button
        type="button"
        onClick={() => {
          onChange("");
          onClear?.();
        }}
        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-white"
        aria-label="Clear search"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    ) : null}
  </label>
);
