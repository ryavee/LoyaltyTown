import type { ReactNode } from "react";
import { useKeyboardNavigation } from "../../../hooks/useKeyboardNavigation";
import { cn } from "../utils";

type TabItem = {
  id: string;
  label: string;
  badge?: string | number;
  content?: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Tabs = ({ tabs, value, onChange, className }: TabsProps) => {
  const activeTab = tabs.find((tab) => tab.id === value);
  const keyboardNavigation = useKeyboardNavigation({ orientation: "horizontal" });

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-1 overflow-x-auto border-b border-slate-800"
        onKeyDown={keyboardNavigation.onKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={value === tab.id}
            tabIndex={value === tab.id ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              value === tab.id
                ? "border-cyan-400 text-cyan-200"
                : "border-transparent text-slate-400 hover:text-white",
            )}
          >
            {tab.label}
            {tab.badge !== undefined ? <span className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-slate-300">{tab.badge}</span> : null}
          </button>
        ))}
      </div>
      {activeTab?.content ? <div role="tabpanel" className="pt-4">{activeTab.content}</div> : null}
    </div>
  );
};
