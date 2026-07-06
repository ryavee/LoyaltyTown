import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import type { EnterpriseTone } from "../types";
import { cn, toneClasses } from "../utils";

type NotificationToastProps = {
  title: string;
  description?: string;
  tone?: EnterpriseTone;
  onClose?: () => void;
};

const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: XCircle,
};

export const NotificationToast = ({ title, description, tone = "info", onClose }: NotificationToastProps) => {
  const Icon = icons[tone];

  return (
    <div className={cn("flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-xl shadow-black/20", toneClasses[tone])}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {description ? <p className="mt-1 text-sm opacity-80">{description}</p> : null}
      </div>
      {onClose ? (
        <button type="button" onClick={onClose} className="rounded-md p-1 opacity-70 hover:bg-white/10 hover:opacity-100" aria-label="Close notification">
          <XCircle className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
};
