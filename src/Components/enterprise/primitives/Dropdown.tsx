import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../utils";

export type DropdownItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

type DropdownProps = {
  open: boolean;
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
};

export const Dropdown = ({ open, trigger, items, align = "left" }: DropdownProps) => (
  <div className="relative inline-flex">
    {trigger}
    {open ? (
      <div className={cn("absolute top-full z-40 mt-2 w-56 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-1 shadow-xl shadow-black/30", align === "right" ? "right-0" : "left-0")}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={item.onSelect}
              className={cn(
                "flex h-9 w-full items-center gap-2 rounded-md px-2 text-left text-sm transition disabled:opacity-50",
                item.destructive ? "text-rose-300 hover:bg-rose-400/10" : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {item.label}
            </button>
          );
        })}
      </div>
    ) : null}
  </div>
);
