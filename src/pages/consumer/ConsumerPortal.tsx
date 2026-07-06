import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Gift, Headphones, PackageCheck, QrCode, ShieldCheck, Ticket, UserRound, WalletCards } from "lucide-react";
import { ConsumerMobileLayout } from "../../Components/ConsumerPWA/ConsumerMobileLayout";
import { ConsumerTimeline, ConsumerWalletCard, ReferralShareCard, RewardClaimCard, SupportTicketCard, WarrantyCard, consumerPanel, consumerPrimaryButton, consumerSecondaryButton } from "../../Components/ConsumerPWA/ConsumerCards";
import { ConsumerStatusBadge } from "../../Components/ConsumerPWA/ConsumerStatusBadge";
import { consumerOffers } from "../../data/consumer/consumerOfferDemoData";
import { consumerProducts } from "../../data/consumer/consumerProductDemoData";
import { consumerReferral, consumerReferralHistory } from "../../data/consumer/consumerReferralDemoData";
import { consumerRewards } from "../../data/consumer/consumerRewardDemoData";
import { consumerSupportTickets, consumerFaqs } from "../../data/consumer/consumerSupportDemoData";
import { consumerWalletTransactions } from "../../data/consumer/consumerWalletDemoData";
import { consumerWarranties, consumerWarrantyClaims } from "../../data/consumer/consumerWarrantyDemoData";

type ConsumerMode = "wallet" | "profile" | "support" | "referral" | "offers" | "scan";

const getModeFromPath = (pathname: string): ConsumerMode => {
  if (pathname.includes("wallet")) return "wallet";
  if (pathname.includes("profile")) return "profile";
  if (pathname.includes("support")) return "support";
  if (pathname.includes("referral")) return "referral";
  if (pathname.includes("offers")) return "offers";
  return "scan";
};

const TransactionList = () => (
  <section className={consumerPanel}>
    <h2 className="text-lg font-black">Transaction History</h2>
    <div className="mt-4 space-y-3">{consumerWalletTransactions.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><div><p className="text-sm font-black">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.detail} / {item.date}</p></div><span className="text-sm font-black text-cyan-600 dark:text-cyan-300">{item.points}</span></div>)}</div>
  </section>
);

const WalletView = () => (
  <>
    <ConsumerWalletCard />
    <div className="grid grid-cols-2 gap-3">
      {["Cashback", "Points", "Redemptions", "Expiring Points"].map((label) => <div key={label} className={consumerPanel}><WalletCards className="h-5 w-5 text-cyan-500" /><p className="mt-3 text-sm font-black">{label}</p><p className="mt-1 text-xs text-slate-500">Static wallet section</p></div>)}
    </div>
    <TransactionList />
  </>
);

const ProfileView = () => (
  <>
    <section className={consumerPanel}>
      <UserRound className="h-8 w-8 text-cyan-500" />
      <h2 className="mt-3 text-2xl font-black">Aarav Sharma</h2>
      <p className="mt-1 text-sm text-slate-500">+91 98765 91001 / Pune</p>
      <div className="mt-4 flex flex-wrap gap-2"><ConsumerStatusBadge status="Active" /><ConsumerStatusBadge status="Registered" /></div>
    </section>
    <section className="grid gap-3 sm:grid-cols-2">
      {consumerProducts.slice(0, 3).map((product) => <article key={product.id} className={consumerPanel}><PackageCheck className="h-6 w-6 text-cyan-500" /><h3 className="mt-3 text-base font-black">{product.product}</h3><p className="mt-1 text-xs text-slate-500">{product.batch} / {product.serialNumber}</p></article>)}
    </section>
    <section className="space-y-3">{consumerWarranties.map((warranty) => <WarrantyCard key={warranty.id} warranty={warranty} />)}</section>
    <section className="grid gap-3 sm:grid-cols-2">{consumerRewards.slice(0, 4).map((reward) => <RewardClaimCard key={reward.id} reward={reward} />)}</section>
    <ConsumerTimeline items={[{ title: "Product scanned", detail: "WeatherShield Pro Paint verified", date: "Today" }, { title: "Warranty activated", detail: "Certificate generated", date: "Jul 05, 2026" }, { title: "Reward claimed", detail: "120 points credited", date: "Jul 05, 2026" }]} />
  </>
);

const SupportView = () => (
  <>
    <section className={consumerPanel}>
      <Headphones className="h-8 w-8 text-cyan-500" />
      <h2 className="mt-3 text-xl font-black">Raise Ticket</h2>
      <div className="mt-4 space-y-3">
        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" placeholder="Subject" />
        <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950" placeholder="Describe the issue" />
        <button className={consumerPrimaryButton}>Submit Ticket <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>
    <section className="space-y-3">{consumerSupportTickets.map((ticket) => <SupportTicketCard key={ticket.id} ticket={ticket} />)}</section>
    <section className={consumerPanel}>
      <h2 className="text-lg font-black">FAQ</h2>
      <div className="mt-4 space-y-2">{consumerFaqs.map((faq) => <button key={faq} className={consumerSecondaryButton}>{faq}</button>)}</div>
      <Link to="/consumer-support" className={`${consumerPrimaryButton} mt-4`}>Contact Brand</Link>
    </section>
  </>
);

const ReferralView = () => (
  <>
    <ReferralShareCard code={consumerReferral.code} earnings={consumerReferral.earnings} />
    <section className="grid grid-cols-2 gap-3">
      <div className={consumerPanel}><p className="text-sm font-black">Invited</p><p className="mt-2 text-3xl font-black">{consumerReferral.invited}</p></div>
      <div className={consumerPanel}><p className="text-sm font-black">Converted</p><p className="mt-2 text-3xl font-black">{consumerReferral.converted}</p></div>
    </section>
    <section className={consumerPanel}>
      <h2 className="text-lg font-black">Referral History</h2>
      <div className="mt-4 space-y-3">{consumerReferralHistory.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><div><p className="text-sm font-black">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.channel} / {item.earnings}</p></div><ConsumerStatusBadge status={item.status} /></div>)}</div>
    </section>
  </>
);

const OffersView = () => (
  <>
    {consumerOffers.map((offer) => <section key={offer.id} className={consumerPanel}><div className="flex items-start justify-between gap-3"><Gift className="h-7 w-7 text-cyan-500" /><ConsumerStatusBadge status={offer.status} /></div><h2 className="mt-3 text-lg font-black">{offer.offer}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{offer.detail}</p><div className="mt-3 rounded-2xl border border-dashed border-cyan-300 bg-cyan-50 p-3 text-center text-lg font-black text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100">{offer.coupon}</div></section>)}
    <section className={consumerPanel}><Ticket className="h-7 w-7 text-cyan-500" /><h2 className="mt-3 text-lg font-black">Campaign Participation</h2><p className="mt-2 text-sm text-slate-500">Static participation history and coupon detail cards are ready for future integration.</p></section>
  </>
);

const ScanHomeView = () => (
  <>
    <section className={consumerPanel}>
      <QrCode className="h-8 w-8 text-cyan-500" />
      <h2 className="mt-3 text-xl font-black">Scan a product QR</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">Verify product authenticity, activate warranty, and claim rewards from a public mobile flow.</p>
      <Link to="/scan/LT-GENUINE-1001" className={`${consumerPrimaryButton} mt-4`}>Open Demo Scan</Link>
    </section>
    <section className="grid gap-3 sm:grid-cols-2">
      {consumerWarrantyClaims.map((claim) => <article key={claim.id} className={consumerPanel}><ShieldCheck className="h-6 w-6 text-cyan-500" /><h3 className="mt-3 text-base font-black">{claim.product}</h3><p className="mt-1 text-xs text-slate-500">{claim.claimReason} / {claim.claimPhotos}</p><div className="mt-3"><ConsumerStatusBadge status={claim.status} /></div></article>)}
    </section>
  </>
);

const content = {
  wallet: { title: "Consumer Wallet", subtitle: "Wallet balance, transaction history, cashback, points, redemptions, and expiring points.", active: "wallet" as const, node: <WalletView /> },
  profile: { title: "Consumer Profile", subtitle: "Profile, my products, warranties, rewards, referrals, and support tickets.", active: "profile" as const, node: <ProfileView /> },
  support: { title: "Consumer Support", subtitle: "Raise tickets, view ticket details, browse FAQ, and contact the brand.", active: "support" as const, node: <SupportView /> },
  referral: { title: "Consumer Referral", subtitle: "Referral code, share card, referral history, and referral earnings.", active: "referral" as const, node: <ReferralView /> },
  offers: { title: "Consumer Offers", subtitle: "Active offers, offer details, coupon details, and campaign participation.", active: "offers" as const, node: <OffersView /> },
  scan: { title: "Consumer PWA", subtitle: "Mobile-first public product verification and reward experience.", active: "scan" as const, node: <ScanHomeView /> },
};

const ConsumerPortal = ({ mode }: { mode?: ConsumerMode }) => {
  const location = useLocation();
  const resolvedMode = mode || getModeFromPath(location.pathname);
  const current = content[resolvedMode] || content.scan;

  if (location.pathname === "/consumer-app") return <Navigate to="/consumer-app/scan-result" replace />;

  return (
    <ConsumerMobileLayout title={current.title} subtitle={current.subtitle} active={current.active}>
      {current.node}
    </ConsumerMobileLayout>
  );
};

export default ConsumerPortal;
