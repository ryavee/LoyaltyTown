import { ArrowRight, RotateCcw, ShieldAlert } from "lucide-react";

type DuplicateWarningProps = {
  scanCount: number;
  productName?: string;
  onContinue: () => void;
};

const DuplicateWarning = ({
  scanCount,
  productName,
  onContinue,
}: DuplicateWarningProps) => (
  <section className="w-full overflow-hidden rounded-[28px] border border-amber-200 bg-white shadow-[0_22px_70px_rgba(65,45,105,0.13)]">
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-200">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-2xl font-extrabold text-amber-900">Product Already Scanned</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-amber-800">
        This QR code has already been scanned. You can still continue to your account.
      </p>
    </div>
    <div className="p-5 sm:p-6">
      {productName && <p className="mb-4 text-center text-sm font-bold text-[#51475F]">{productName}</p>}
      <div className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800"><RotateCcw className="h-4 w-4" /> Scan Count</span>
        <span className="text-2xl font-extrabold text-amber-900">{scanCount}</span>
      </div>
      <button onClick={onContinue} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3]">
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </section>
);

export default DuplicateWarning;
