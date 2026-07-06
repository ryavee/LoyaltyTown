import { FileText, Download } from "lucide-react";
import { buttonBase, buttonVariants, cn, panelBase } from "../utils";

type DocumentPreviewProps = {
  title: string;
  type?: string;
  size?: string;
  url?: string;
  className?: string;
};

export const DocumentPreview = ({ title, type = "Document", size, url, className }: DocumentPreviewProps) => (
  <section className={cn(panelBase, "overflow-hidden", className)}>
    <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-500">{[type, size].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      {url ? (
        <a href={url} className={cn(buttonBase, buttonVariants.secondary)} download>
          <Download className="h-4 w-4" />
          Download
        </a>
      ) : null}
    </div>
    <div className="flex min-h-60 items-center justify-center bg-slate-900/50 p-6 text-sm text-slate-500">Document preview placeholder</div>
  </section>
);
