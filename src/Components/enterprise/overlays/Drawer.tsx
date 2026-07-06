import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../utils";

type DrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left";
  onClose: () => void;
};

export const Drawer = ({ open, title, description, children, footer, side = "right", onClose }: DrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm">
      <button type="button" className="flex-1" aria-label="Close drawer overlay" onClick={onClose} />
      <aside
        className={cn(
          "flex h-full w-full max-w-xl flex-col border-slate-800 bg-slate-950 shadow-2xl shadow-black/40",
          side === "right" ? "border-l" : "order-first border-r",
        )}
      >
        <div className="flex items-start gap-4 border-b border-slate-800 p-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-white">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto p-4">{children}</div>
        {footer ? <div className="border-t border-slate-800 p-4">{footer}</div> : null}
      </aside>
    </div>
  );
};
