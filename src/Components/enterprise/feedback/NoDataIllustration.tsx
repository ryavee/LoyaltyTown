import { DatabaseZap } from "lucide-react";
import { cn } from "../utils";

type NoDataIllustrationProps = {
  className?: string;
};

export const NoDataIllustration = ({ className }: NoDataIllustrationProps) => (
  <div className={cn("mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-400", className)}>
    <DatabaseZap className="h-7 w-7" />
  </div>
);
