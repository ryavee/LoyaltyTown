import { QrCode } from "lucide-react";
import { panelBase, cn } from "../../../Components/enterprise/utils";

export const QrPreview = ({ title = "Secure QR Preview", serial = "ADH-2026-000001" }: { title?: string; serial?: string }) => (
  <section className={cn(panelBase, "grid gap-5 p-5 md:grid-cols-[180px_1fr]")}>
    <div className="grid h-40 w-40 grid-cols-9 gap-1 rounded-lg border border-slate-700 bg-white p-3">
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "rounded-[2px]",
            [0, 1, 2, 9, 18, 6, 7, 8, 15, 17, 54, 63, 72, 73, 74, 30, 34, 39, 41, 44, 49, 58, 60, 68].includes(index)
              ? "bg-slate-950"
              : index % 4 === 0
                ? "bg-slate-700"
                : "bg-slate-100",
          )}
        />
      ))}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-cyan-300" />
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">Static QR rendering placeholder for previews, print packages, PDF exports, ZIP bundles, CSV serial downloads, and GS1 Digital Link inspection.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Serial</p>
          <p className="mt-2 text-sm font-semibold text-white">{serial}</p>
        </div>
        <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Destination</p>
          <p className="mt-2 text-sm font-semibold text-white">https://lt.qr/{serial}</p>
        </div>
      </div>
    </div>
  </section>
);
