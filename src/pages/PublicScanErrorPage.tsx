import { AlertTriangle, Headphones, RotateCcw, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PublicPageShell from "../Components/PublicScan/PublicPageShell";

const PublicScanErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = (location.state as { code?: string } | null)?.code;

  return (
    <PublicPageShell>
      <section className="w-full overflow-hidden rounded-[28px] border border-rose-200 bg-white shadow-[0_22px_70px_rgba(65,45,105,0.13)]">
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 px-6 py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200">
            <X className="h-8 w-8 stroke-[3]" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-rose-900">Invalid QR Code</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-rose-800">
            This product could not be verified. Please contact the manufacturer.
          </p>
        </div>
        <div className="p-5 sm:p-6">
          {code && (
            <div className="rounded-2xl border border-[#ECE6F4] bg-[#FAF8FD] px-4 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A92A9]">Scanned code</p>
              <p className="mt-1 break-all font-mono text-xs font-bold text-[#51475F]">{code}</p>
            </div>
          )}
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-xs leading-5">Do not purchase or use this product if its packaging appears altered or suspicious.</p>
          </div>
          <button onClick={() => navigate("/scan/LTQR-A82K9XQ1P3")} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white hover:bg-[#4B31C3]">
            <RotateCcw className="h-4 w-4" /> Try Another Code
          </button>
          <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DDD5E8] px-5 py-3 text-sm font-bold text-[#5B3FD6] hover:bg-[#F8F5FC]">
            <Headphones className="h-4 w-4" /> Contact Manufacturer
          </button>
        </div>
      </section>
    </PublicPageShell>
  );
};

export default PublicScanErrorPage;
