import { UploadCloud, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../utils";

type FileUploadProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  label?: string;
  description?: string;
  files?: File[];
  onFilesChange: (files: File[]) => void;
};

export const FileUpload = ({ label = "Upload files", description, files = [], onFilesChange, className, ...props }: FileUploadProps) => (
  <div className={cn("space-y-3", className)}>
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center transition hover:border-cyan-400/50 hover:bg-slate-900/60">
      <UploadCloud className="h-8 w-8 text-cyan-300" />
      <span className="mt-3 text-sm font-semibold text-white">{label}</span>
      {description ? <span className="mt-1 text-xs text-slate-500">{description}</span> : null}
      <input
        {...props}
        type="file"
        className="sr-only"
        onChange={(event) => onFilesChange(Array.from(event.target.files || []))}
      />
    </label>
    {files.length ? (
      <div className="space-y-2">
        {files.map((file) => (
          <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
            <span className="min-w-0 truncate">{file.name}</span>
            <button type="button" onClick={() => onFilesChange(files.filter((item) => item !== file))} className="text-slate-500 hover:text-white" aria-label={`Remove ${file.name}`}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);
