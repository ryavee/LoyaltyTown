import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import logo from "../../assets/cetrak-logo.png";

type PublicPageShellProps = {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
};

const PublicPageShell = ({
  children,
  step,
  totalSteps = 4,
}: PublicPageShellProps) => (
  <main className="relative min-h-screen overflow-hidden bg-[#F7F4FC] px-4 py-6 text-[#29213D] sm:py-10">
    <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#E8DFFF] blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#DDF8EC] blur-3xl" />

    <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[520px] flex-col">
      <header className="mb-6 flex items-center justify-between">
        <img src={logo} alt="LoyaltyTown" className="h-9 w-auto object-contain" />
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-emerald-700 shadow-sm backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure Verification
        </div>
      </header>

      {step && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[#9188A4]">
            <span>Product reward journey</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E1F1]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8066DF] to-[#5B3FD6] transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 items-center justify-center">{children}</div>

      <footer className="mt-6 text-center text-[11px] leading-5 text-[#9188A4]">
        Powered by LoyaltyTown · Product authenticity and rewards
      </footer>
    </div>
  </main>
);

export default PublicPageShell;
