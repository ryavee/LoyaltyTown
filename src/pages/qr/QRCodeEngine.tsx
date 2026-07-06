import { AlertTriangle, Download, QrCode, ShieldCheck } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { qrBatches } from "../../data/loyaltyTownDemoData";

export default function QRCodeEngine() {
  return (
    <div className="space-y-6">
      <PageHeader title="QR Code Engine" description="Generate product QR batches, monitor scan adoption, and surface anti-counterfeit alerts before they become channel risk." />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Generated QR" value="18.4M" change="+420K this week" tone="cyan" icon={QrCode} />
        <StatCard label="Scan Rate" value="41.8%" change="+6.2% campaign lift" tone="emerald" icon={ShieldCheck} />
        <StatCard label="Risk Alerts" value="128" change="32 high priority" tone="rose" icon={AlertTriangle} />
        <StatCard label="Downloads" value="2,840" change="PDF, CSV, ZIP" tone="violet" icon={Download} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Generate QR Batch</h2>
          <div className="mt-4 grid gap-3">
            {["Product", "SKU", "Batch Quantity", "QR Type", "Manufacturing Location"].map((field) => (
              <label key={field} className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{field}</span>
                <input className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white" placeholder={field} />
              </label>
            ))}
          </div>
          <button type="button" className="mt-5 h-11 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Generate Static Preview</button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Recent QR Batches</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500 dark:bg-slate-950/70">
                <tr>{["Batch", "Product", "Quantity", "Generated", "Scans", "Risk", "Status"].map((head) => <th key={head} className="px-4 py-3 text-left font-semibold">{head}</th>)}</tr>
              </thead>
              <tbody>
                {qrBatches.map((batch) => (
                  <tr key={batch.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-3 font-semibold text-slate-950 dark:text-white">{batch.id}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{batch.product}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{batch.quantity}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{batch.generated}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{batch.scans}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">{batch.risk}</span></td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{batch.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
