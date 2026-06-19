import { ArrowRight, Check, PackageCheck, ScanLine, ShieldCheck } from "lucide-react";

export type VerificationProduct = {
  productName: string;
  batchId: string;
  brandName?: string;
  scanCount: number;
  productImage?: string;
};

type VerificationCardProps = {
  product: VerificationProduct;
  onContinue: () => void;
};

const VerificationCard = ({ product, onContinue }: VerificationCardProps) => (
  <section className="w-full overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_22px_70px_rgba(65,45,105,0.13)]">
    <div className="bg-gradient-to-br from-[#E9FBF3] to-[#F4FFFA] px-6 py-7 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
        <Check className="h-8 w-8 stroke-[3]" />
      </div>
      <h1 className="mt-4 text-2xl font-extrabold text-emerald-800">Genuine Product</h1>
      <p className="mt-1.5 text-sm text-emerald-700">This product has been verified.</p>
    </div>

    <div className="p-5 sm:p-6">
      <div className="flex items-center gap-4 rounded-2xl border border-[#ECE6F4] bg-[#FAF8FD] p-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-[#5B3FD6] shadow-sm">
          {product.productImage ? (
            <img src={product.productImage} alt={product.productName} className="h-full w-full object-cover" />
          ) : (
            <PackageCheck className="h-9 w-9" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A92A9]">Verified product</p>
          <h2 className="mt-1 text-lg font-extrabold leading-snug text-[#29213D]">{product.productName}</h2>
          <p className="mt-1 text-xs font-semibold text-[#756C87]">{product.brandName || "LoyaltyTown Partner Brand"}</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-[#EFEAF5] rounded-2xl border border-[#ECE6F4] px-4">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#81788F]"><ShieldCheck className="h-4 w-4" /> Batch Number</span>
          <span className="text-right font-mono text-xs font-bold text-[#29213D]">{product.batchId}</span>
        </div>
        <div className="flex items-center justify-between gap-4 py-3.5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#81788F]"><ScanLine className="h-4 w-4" /> Scan Count</span>
          <span className="text-sm font-extrabold text-[#29213D]">{product.scanCount}</span>
        </div>
      </div>

      <button onClick={onContinue} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B3FD6] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-[#4B31C3]">
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </section>
);

export default VerificationCard;
