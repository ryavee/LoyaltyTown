import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Gift, Headphones, QrCode, ShieldCheck, UserRound, WalletCards } from "lucide-react";
import logo from "../../assets/cetrak-logo.png";

type ConsumerMobileLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  active?: "scan" | "wallet" | "profile" | "support" | "referral" | "offers";
  step?: string;
};

const nav = [
  { id: "scan", label: "Scan", route: "/public-scan", icon: QrCode },
  { id: "wallet", label: "Wallet", route: "/consumer-wallet", icon: WalletCards },
  { id: "profile", label: "Profile", route: "/consumer-profile", icon: UserRound },
  { id: "support", label: "Support", route: "/consumer-support", icon: Headphones },
  { id: "offers", label: "Offers", route: "/consumer-offers", icon: Gift },
];

export const ConsumerMobileLayout = ({ title, subtitle, children, active = "scan", step }: ConsumerMobileLayoutProps) => (
  <main className="min-h-screen bg-slate-50 px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-6">
    <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[520px] flex-col pb-24">
      <header className="mb-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <img src={logo} alt="LoyaltyTown" className="h-9 w-auto object-contain" />
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure
          </div>
        </div>
        {step ? <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">{step}</p> : null}
        <h1 className="mt-2 text-2xl font-black tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{subtitle}</p> : null}
      </header>
      <div className="flex-1 space-y-4">{children}</div>
    </div>
    <nav className="fixed inset-x-3 bottom-3 z-20 mx-auto max-w-[520px] rounded-[26px] border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/40">
      <div className="grid grid-cols-5 gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <Link key={item.id} to={item.route} className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold transition ${isActive ? "bg-cyan-400 text-slate-950" : "text-slate-500 dark:text-slate-400"}`}>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  </main>
);
