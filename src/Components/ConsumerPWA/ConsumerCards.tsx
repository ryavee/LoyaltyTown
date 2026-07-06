import { AlertTriangle, ArrowRight, Camera, CheckCircle2, Copy, Gift, Headphones, PackageCheck, QrCode, Share2, ShieldCheck, Ticket, Upload, WalletCards } from "lucide-react";
import type { ConsumerScanRecord } from "../../data/consumer/consumerScanDemoData";
import type { ConsumerProductRecord } from "../../data/consumer/consumerProductDemoData";
import { consumerWallet } from "../../data/consumer/consumerWalletDemoData";
import { ConsumerStatusBadge } from "./ConsumerStatusBadge";

const primary = "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300";
const secondary = "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";
const panel = "rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900";

export const ProductVerificationCard = ({ product }: { product: ConsumerProductRecord }) => (
  <section className={panel}>
    <div className={`flex aspect-[16/10] items-center justify-center rounded-[24px] bg-gradient-to-br ${product.imageTone} text-slate-950`}>
      <PackageCheck className="h-16 w-16" />
    </div>
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">{product.brand}</p>
      <h2 className="mt-1 text-xl font-black">{product.product}</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{product.manufacturer}</p>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      {[["SKU", product.sku], ["Batch", product.batch], ["Serial", product.serialNumber], ["Expiry", product.expiresOn]].map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-[10px] font-bold uppercase text-slate-500">{label}</p>
          <p className="mt-1 break-words text-sm font-bold">{value}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap gap-2">{product.trustMarks.map((mark) => <ConsumerStatusBadge key={mark} status={mark.includes("Recall") || mark.includes("Security") ? "Escalated" : "Active"} />)}</div>
  </section>
);

export const ScanResultCard = ({ scan, product }: { scan: ConsumerScanRecord; product: ConsumerProductRecord }) => {
  const danger = ["invalid", "counterfeit", "recalled"].includes(scan.state);
  const Icon = danger ? AlertTriangle : CheckCircle2;
  return (
    <section className={`rounded-[30px] border p-5 shadow-sm ${danger ? "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-400/30 dark:bg-rose-950/40 dark:text-rose-50" : "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-950/30 dark:text-emerald-50"}`}>
      <div className="flex items-start gap-3">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${danger ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"}`}><Icon className="h-7 w-7" /></div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">{scan.campaignStatus}</p>
          <h2 className="mt-1 text-2xl font-black">{scan.title}</h2>
          <p className="mt-2 text-sm leading-6 opacity-80">{scan.message}</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/70 p-3 dark:bg-slate-950/50">
        <p className="text-sm font-black">{product.product}</p>
        <p className="mt-1 text-xs opacity-70">{product.batch} / {scan.scanCount} scan count</p>
      </div>
    </section>
  );
};

export const OtpForm = () => (
  <section className={panel}>
    <h2 className="text-lg font-black">Mobile OTP Registration</h2>
    <div className="mt-4 space-y-3">
      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" placeholder="Mobile Number" />
      <div className="grid grid-cols-6 gap-2">{Array.from({ length: 6 }).map((_, index) => <input key={index} className="h-11 rounded-xl border border-slate-200 bg-slate-50 text-center font-black outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" maxLength={1} placeholder="-" />)}</div>
      <button className={primary}>Verify OTP <ArrowRight className="h-4 w-4" /></button>
    </div>
  </section>
);

export const ConsumerRegistrationForm = () => (
  <section className={panel}>
    <h2 className="text-lg font-black">Customer Details</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {["First Name", "Last Name", "Email", "City", "State", "PIN Code", "Preferred Language"].map((label) => <input key={label} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" placeholder={label} />)}
      <label className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 sm:col-span-2"><input type="checkbox" className="mt-1" />I agree to receive warranty, reward, and product safety updates.</label>
    </div>
    <button className={`${primary} mt-4`}>Complete Registration</button>
  </section>
);

export const WarrantyCard = ({ warranty }: { warranty: { product: string; qrCode: string; serialNumber: string; warrantyStart: string; warrantyEnd: string; customer: string; status: string } }) => (
  <article className={panel}>
    <div className="flex items-start justify-between gap-3"><div><ShieldCheck className="h-7 w-7 text-cyan-500" /><h3 className="mt-3 text-base font-black">{warranty.product}</h3><p className="mt-1 text-sm text-slate-500">{warranty.serialNumber}</p></div><ConsumerStatusBadge status={warranty.status} /></div>
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm"><div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><p className="text-xs text-slate-500">Start</p><p className="font-bold">{warranty.warrantyStart}</p></div><div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><p className="text-xs text-slate-500">End</p><p className="font-bold">{warranty.warrantyEnd}</p></div></div>
  </article>
);

export const RewardClaimCard = ({ reward }: { reward: { reward: string; type: string; status: string; value: string } }) => (
  <article className={panel}>
    <div className="flex items-start justify-between gap-3"><Gift className="h-7 w-7 text-cyan-500" /><ConsumerStatusBadge status={reward.status} /></div>
    <h3 className="mt-3 text-base font-black">{reward.reward}</h3>
    <p className="mt-1 text-sm text-slate-500">{reward.type} / {reward.value}</p>
    <button className={`${secondary} mt-4`}>Claim Reward</button>
  </article>
);

export const ConsumerWalletCard = () => (
  <section className="rounded-[30px] bg-gradient-to-br from-cyan-400 to-emerald-300 p-5 text-slate-950 shadow-xl shadow-cyan-500/20">
    <WalletCards className="h-8 w-8" />
    <p className="mt-4 text-xs font-black uppercase tracking-[0.16em]">Wallet Balance</p>
    <p className="mt-2 text-4xl font-black">{consumerWallet.balance}</p>
    <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-bold"><span>Cashback {consumerWallet.cashback}</span><span>Points {consumerWallet.points}</span><span>Expiring {consumerWallet.expiringPoints}</span></div>
  </section>
);

export const ReferralShareCard = ({ code, earnings }: { code: string; earnings: string }) => (
  <section className={panel}>
    <Share2 className="h-7 w-7 text-cyan-500" />
    <h2 className="mt-3 text-xl font-black">Share and earn</h2>
    <p className="mt-1 text-sm text-slate-500">Referral code</p>
    <div className="mt-3 flex items-center justify-between rounded-2xl border border-dashed border-cyan-300 bg-cyan-50 p-4 text-cyan-900 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-100"><strong className="text-2xl">{code}</strong><Copy className="h-5 w-5" /></div>
    <p className="mt-3 text-sm font-bold">Earned {earnings}</p>
  </section>
);

export const SupportTicketCard = ({ ticket }: { ticket: { ticket: string; title: string; status: string; date: string; priority: string } }) => (
  <article className={panel}>
    <div className="flex items-start justify-between gap-3"><Ticket className="h-7 w-7 text-cyan-500" /><ConsumerStatusBadge status={ticket.status} /></div>
    <h3 className="mt-3 text-base font-black">{ticket.title}</h3>
    <p className="mt-1 text-sm text-slate-500">{ticket.ticket} / {ticket.priority} / {ticket.date}</p>
  </article>
);

export const ConsumerTimeline = ({ items }: { items: { title: string; detail: string; date: string }[] }) => (
  <section className={panel}>
    <h2 className="text-lg font-black">Timeline</h2>
    <div className="mt-4 space-y-3">{items.map((item) => <div key={item.title} className="flex gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300"><QrCode className="h-4 w-4" /></div><div><p className="text-sm font-black">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.detail}</p><p className="mt-1 text-[11px] text-slate-400">{item.date}</p></div></div>)}</div>
  </section>
);

export const WarrantyClaimForm = () => (
  <section className={panel}>
    <h2 className="text-lg font-black">Claim Warranty</h2>
    <div className="mt-4 space-y-3">
      <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" placeholder="Claim Reason" />
      <button className={secondary}><Upload className="h-4 w-4" />Claim Photos</button>
      <button className={primary}><Camera className="h-4 w-4" />Submit Claim</button>
    </div>
  </section>
);

export { primary as consumerPrimaryButton, secondary as consumerSecondaryButton, panel as consumerPanel };
