import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, BadgeCheck, Gift, ShieldCheck } from "lucide-react";
import { ConsumerMobileLayout } from "../Components/ConsumerPWA/ConsumerMobileLayout";
import { ConsumerRegistrationForm, OtpForm, ProductVerificationCard, ScanResultCard, WarrantyCard, WarrantyClaimForm, consumerPrimaryButton, consumerSecondaryButton } from "../Components/ConsumerPWA/ConsumerCards";
import { getConsumerProduct } from "../data/consumer/consumerProductDemoData";
import { getConsumerScanResult } from "../data/consumer/consumerScanDemoData";
import { consumerWarranties } from "../data/consumer/consumerWarrantyDemoData";
import { consumerRewards } from "../data/consumer/consumerRewardDemoData";
import { RewardClaimCard } from "../Components/ConsumerPWA/ConsumerCards";

const PublicScanPage = () => {
  const { code } = useParams();
  const scan = getConsumerScanResult(code);
  const product = getConsumerProduct(scan.productId);
  const isBlocked = ["invalid", "counterfeit", "recalled"].includes(scan.state);
  const isAlreadyClaimed = scan.state === "already-registered";
  const isExpired = scan.state === "expired-campaign";

  return (
    <ConsumerMobileLayout
      active="scan"
      step="QR Scan"
      title={scan.title}
      subtitle="Fast public product verification, warranty activation, and reward claim experience."
    >
      <ScanResultCard scan={scan} product={product} />
      <ProductVerificationCard product={product} />

      {isBlocked ? (
        <section className="rounded-[28px] border border-rose-200 bg-white p-4 shadow-sm dark:border-rose-400/30 dark:bg-slate-900">
          <AlertTriangle className="h-8 w-8 text-rose-500" />
          <h2 className="mt-3 text-lg font-black">Do not proceed until verified</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">This result needs brand attention. Raise a support ticket or contact the brand from the consumer support page.</p>
          <Link to="/consumer-support" className={`${consumerPrimaryButton} mt-4`}>Contact Brand <ArrowRight className="h-4 w-4" /></Link>
        </section>
      ) : null}

      {!isBlocked ? (
        <>
          {isAlreadyClaimed ? (
            <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/30 dark:text-amber-50">
              <BadgeCheck className="h-8 w-8" />
              <h2 className="mt-3 text-lg font-black">Already registered</h2>
              <p className="mt-2 text-sm leading-6 opacity-80">This product is already linked to a customer profile. You can still view details and support information.</p>
            </section>
          ) : null}

          <OtpForm />
          <ConsumerRegistrationForm />
          <WarrantyCard warranty={consumerWarranties[0]} />
          <WarrantyClaimForm />

          {!isExpired ? (
            <section className="space-y-3">
              <div className="rounded-[28px] border border-cyan-200 bg-cyan-50 p-4 text-cyan-950 dark:border-cyan-400/30 dark:bg-cyan-950/30 dark:text-cyan-50">
                <Gift className="h-8 w-8" />
                <h2 className="mt-3 text-lg font-black">Reward available</h2>
                <p className="mt-2 text-sm leading-6 opacity-80">{scan.rewardPoints} points can be credited after registration.</p>
              </div>
              {consumerRewards.slice(0, 2).map((reward) => <RewardClaimCard key={reward.id} reward={reward} />)}
            </section>
          ) : (
            <section className="rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <ShieldCheck className="h-8 w-8 text-cyan-500" />
              <h2 className="mt-3 text-lg font-black">Product is genuine</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">The reward campaign has ended, but product details and warranty information are still available.</p>
            </section>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/consumer-wallet" className={consumerPrimaryButton}>Wallet Credited</Link>
            <Link to="/consumer-profile" className={consumerSecondaryButton}>My Product Detail</Link>
          </div>
        </>
      ) : null}
    </ConsumerMobileLayout>
  );
};

export default PublicScanPage;
