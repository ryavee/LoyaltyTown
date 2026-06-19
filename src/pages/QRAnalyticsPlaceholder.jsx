import { BarChart3 } from "lucide-react";

const QRAnalyticsPlaceholder = () => (
  <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-[#CFC2E7] bg-white p-8 text-center">
    <div>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEE8FF] text-[#5B3FD6]">
        <BarChart3 className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-[#2B2340]">QR Analytics is queued for Phase 2</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#8E8AA2]">The menu and route are ready. Dashboard cards and charts will be added after the Phase 1 screens are approved.</p>
    </div>
  </div>
);

export default QRAnalyticsPlaceholder;
