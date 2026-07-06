import { ImagePlus } from "lucide-react";
import { FileUpload } from "./FileUpload";

type ImageUploadProps = {
  label?: string;
  description?: string;
  files?: File[];
  onFilesChange: (files: File[]) => void;
};

export const ImageUpload = ({ label = "Upload images", description = "PNG, JPG, WEBP or SVG", files = [], onFilesChange }: ImageUploadProps) => (
  <div className="space-y-3">
    <FileUpload label={label} description={description} accept="image/*" files={files} onFilesChange={onFilesChange} multiple />
    {files.length ? (
      <div className="grid gap-3 sm:grid-cols-3">
        {files.map((file) => (
          <div key={`${file.name}-${file.size}`} className="flex aspect-video items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500">
            <ImagePlus className="h-6 w-6" />
          </div>
        ))}
      </div>
    ) : null}
  </div>
);
