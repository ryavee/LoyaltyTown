import { QrCode, ShieldCheck } from "lucide-react";

type ScanLoaderProps = {
  code?: string;
};

const ScanLoader = ({ code }: ScanLoaderProps) => (
  <section className="w-full rounded-[28px] border border-white/80 bg-white/90 p-8 text-center shadow-[0_22px_70px_rgba(65,45,105,0.13)] backdrop-blur sm:p-10">
    <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
      <div className="absolute inset-0 animate-ping rounded-full bg-[#DDD2FF]/60" />
      <div className="absolute inset-2 animate-spin rounded-full border-4 border-[#E8E1F7] border-t-[#5B3FD6]" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B3FD6] text-white shadow-lg shadow-violet-200">
        <QrCode className="h-7 w-7" />
      </div>
    </div>
    <h1 className="text-2xl font-extrabold tracking-tight text-[#29213D]">
      Verifying Product...
    </h1>
    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#756C87]">
      We’re securely checking this QR code against the manufacturer’s product registry.
    </p>
    {code && (
      <div className="mt-6 rounded-2xl border border-[#ECE6F4] bg-[#F8F5FC] px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A92A9]">QR Code</p>
        <p className="mt-1 break-all font-mono text-xs font-bold text-[#5B3FD6]">{code}</p>
      </div>
    )}
    <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
      <ShieldCheck className="h-4 w-4" />
      Encrypted and privacy protected
    </div>
  </section>
);

export default ScanLoader;
