import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Award,
  Banknote,
  Crown,
  Download,
  Gift,
  HandCoins,
  Plus,
  RefreshCw,
  Trophy,
  Upload,
  WalletCards,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { PageToolbar, SecondaryButton } from "../../Components/enterprise";
import {
  AchievementsGrid,
  CashbackDashboard,
  DetailSummary,
  EmptyLoyaltyState,
  FulfillmentTimeline,
  GenericTable,
  LoyaltyAnalyticsCharts,
  LoyaltyDashboard,
  LoyaltyFilterBar,
  LoyaltyPagination,
  LoyaltySurfaceCards,
  RewardCatalogTable,
  RewardForm,
  RewardRuleWizard,
  RuleReviewCards,
  RuleTable,
  TierGrid,
  WalletLedger,
  WalletTable,
  filterRows,
} from "./LoyaltyPhase10Components";
import {
  achievementDemoData,
  cashbackDemoData,
  leaderboardDemoData,
  redemptionDemoData,
  rewardCatalogDemoData,
  rewardRuleDemoData,
  tierDemoData,
  walletDemoData,
} from "../../data/loyalty/loyaltyAdminDemoData";

type LoyaltyMode =
  | "dashboard"
  | "rules"
  | "rules-create"
  | "rules-details"
  | "points"
  | "points-create"
  | "points-details"
  | "wallet"
  | "wallet-details"
  | "catalog"
  | "reward-create"
  | "reward-details"
  | "redemptions"
  | "redemption-details"
  | "cashback"
  | "cashback-rules"
  | "cashback-payouts"
  | "tiers"
  | "tier-create"
  | "tier-details"
  | "leaderboards"
  | "achievements"
  | "analytics"
  | "transactions"
  | "gift-cards"
  | "tier"
  | "leaderboard"
  | "redemption";

const meta: Record<string, { title: string; description: string; icon: typeof WalletCards }> = {
  dashboard: { title: "Loyalty Dashboard", description: "Enterprise loyalty command center for members, points, cashback, tiers, redemptions, fraud holds, expiring points, and wallet liability.", icon: WalletCards },
  rules: { title: "Reward Rules", description: "Rule list and builder for QR scan, purchase, referral, campaign, dealer target, retailer sale, contractor scan, tier bonus, and region bonus.", icon: HandCoins },
  "rules-create": { title: "Create Reward Rule", description: "Wizard: Rule Info, Audience, Product/SKU, Earning Logic, Fraud Guard, Review, and Publish.", icon: Plus },
  "rules-details": { title: "Reward Rule Details", description: "Static rule overview with earning logic, fraud guard, review summary, and publish controls.", icon: HandCoins },
  wallet: { title: "Wallet Management", description: "Wallet balance, points, cashback, holds, payout status, and transaction ledger for customers and channel partners.", icon: WalletCards },
  "wallet-details": { title: "Wallet Details", description: "Owner wallet details, ledger, credit/debit history, holds, payout status, and adjustment placeholder.", icon: WalletCards },
  catalog: { title: "Rewards Catalog", description: "Rewards catalog with stock, eligibility, points cost, redemption limits, and reward configuration placeholders.", icon: Gift },
  "reward-create": { title: "Create Reward", description: "Static reward form for cashback, coupon, voucher, product, merchandise, experience, training, and membership rewards.", icon: Plus },
  "reward-details": { title: "Reward Details", description: "Reward configuration, stock, eligibility, points cost, and redemption limits.", icon: Gift },
  redemptions: { title: "Redemptions", description: "Redemption list, approval queue, details, and fulfillment timeline.", icon: Trophy },
  "redemption-details": { title: "Redemption Details", description: "Redemption approval and fulfillment timeline placeholder.", icon: Trophy },
  cashback: { title: "Cashback Engine", description: "Cashback rules, payouts, failed payouts, and reconciliation placeholders.", icon: Banknote },
  "cashback-rules": { title: "Cashback Rules", description: "Cashback rules without payment gateway or payout logic.", icon: Banknote },
  "cashback-payouts": { title: "Cashback Payouts", description: "Payout queue, failed payouts, and settlement report placeholders.", icon: Banknote },
  tiers: { title: "Membership Tiers", description: "Bronze, Silver, Gold, Platinum, and Diamond tier cards, thresholds, benefits, and progression.", icon: Crown },
  "tier-create": { title: "Create Tier", description: "Static tier setup placeholder.", icon: Crown },
  "tier-details": { title: "Tier Details", description: "Tier benefits, thresholds, progression, and member distribution.", icon: Crown },
  leaderboards: { title: "Leaderboards", description: "Customer, Dealer, Distributor, Retailer, Contractor, and Region leaderboards.", icon: Trophy },
  achievements: { title: "Achievements", description: "Badges, milestones, gamification, and achievement gallery.", icon: Award },
  analytics: { title: "Loyalty Analytics", description: "Points issued vs redeemed, cashback trend, redemption trend, tier distribution, wallet liability, fraud holds, and reward ROI.", icon: Trophy },
  transactions: { title: "Transactions", description: "Wallet transaction ledger for earn, burn, adjustments, holds, expiry, and cashback.", icon: WalletCards },
};

const resolveMode = (mode: LoyaltyMode): LoyaltyMode => {
  if (mode === "points") return "rules";
  if (mode === "points-create") return "rules-create";
  if (mode === "points-details") return "rules-details";
  if (mode === "gift-cards") return "catalog";
  if (mode === "tier") return "tiers";
  if (mode === "leaderboard") return "leaderboards";
  if (mode === "redemption") return "redemptions";
  return mode;
};

const Header = ({ mode }: { mode: LoyaltyMode }) => {
  const normalized = resolveMode(mode);
  const current = meta[normalized] || meta.dashboard;
  const Icon = current.icon;
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Enterprise Loyalty Engine</p>
        </div>
      }
      end={
        <>
          <Link to="/loyalty/rules/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Plus className="h-4 w-4" />
            Create Rule
          </Link>
          <SecondaryButton icon={Upload}>Import</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) => useMemo(() => filterRows(rows, query), [rows, query]);

const RuleDetails = () => {
  const { id } = useParams();
  const rule = rewardRuleDemoData.find((item) => item.id === id) || rewardRuleDemoData[0];
  return (
    <DetailSummary
      title={rule.ruleName}
      rows={[
        ["Rule Type", rule.ruleType],
        ["Audience", rule.audience],
        ["Product/SKU", rule.productScope],
        ["Earning Logic", rule.earningLogic],
        ["Fraud Guard", rule.fraudGuard],
        ["Status", rule.status],
      ]}
    >
      <RuleReviewCards />
      <RewardRuleWizard />
    </DetailSummary>
  );
};

const WalletDetails = () => {
  const { id } = useParams();
  const wallet = walletDemoData.find((item) => item.id === id) || walletDemoData[0];
  return (
    <DetailSummary
      title={wallet.owner}
      rows={[
        ["Owner Type", wallet.ownerType],
        ["Wallet Balance", wallet.walletBalance],
        ["Points", wallet.points],
        ["Cashback", wallet.cashback],
        ["Holds", wallet.holds],
        ["Tier", wallet.tier],
        ["Payout Status", wallet.payoutStatus],
      ]}
    >
      <WalletLedger />
    </DetailSummary>
  );
};

const RewardDetails = () => {
  const { id } = useParams();
  const reward = rewardCatalogDemoData.find((item) => item.id === id) || rewardCatalogDemoData[0];
  return <RewardForm reward={reward} />;
};

const RedemptionDetails = () => {
  const { id } = useParams();
  const redemption = redemptionDemoData.find((item) => item.id === id) || redemptionDemoData[0];
  return (
    <DetailSummary
      title={redemption.reward}
      rows={[
        ["Member", redemption.member],
        ["Owner Type", redemption.ownerType],
        ["Points", redemption.points],
        ["Queue", redemption.queue],
        ["Fulfillment", redemption.fulfillment],
        ["Status", redemption.status],
      ]}
    >
      <FulfillmentTimeline />
    </DetailSummary>
  );
};

const LoyaltyWorkspace = ({ mode = "dashboard" }: { mode?: LoyaltyMode }) => {
  const normalized = resolveMode(mode);
  const [query, setQuery] = useState("");
  const rules = useFilteredRows(rewardRuleDemoData, query);
  const wallets = useFilteredRows(walletDemoData, query);
  const rewards = useFilteredRows(rewardCatalogDemoData, query);
  const redemptions = useFilteredRows(redemptionDemoData, query);
  const payoutRows = useFilteredRows(cashbackDemoData.payouts, query);
  const leaderboardRows = useFilteredRows(leaderboardDemoData, query);

  const tableContent = () => {
    if (normalized === "rules") return <RuleTable rows={rules} />;
    if (normalized === "wallet") return <WalletTable rows={wallets} />;
    if (normalized === "catalog") return <RewardCatalogTable rows={rewards} />;
    if (normalized === "redemptions") return <GenericTable title="Redemptions and Approval Queue" rows={redemptions} detailPath="/redemptions" />;
    if (normalized === "cashback-payouts") return <GenericTable title="Cashback Payouts" rows={payoutRows} />;
    if (normalized === "leaderboards") return <GenericTable title="Leaderboards" rows={leaderboardRows} />;
    if (normalized === "transactions") return <WalletLedger />;
    return null;
  };

  const content = () => {
    if (normalized === "dashboard") return <LoyaltyDashboard />;
    if (normalized === "rules-create") return <><RewardRuleWizard /><RuleReviewCards /></>;
    if (normalized === "rules-details") return <RuleDetails />;
    if (normalized === "wallet-details") return <WalletDetails />;
    if (normalized === "reward-create") return <RewardForm />;
    if (normalized === "reward-details") return <RewardDetails />;
    if (normalized === "redemption-details") return <RedemptionDetails />;
    if (normalized === "cashback") return <CashbackDashboard />;
    if (normalized === "cashback-rules") return <GenericTable title="Cashback Rules" rows={cashbackDemoData.rules} />;
    if (normalized === "tiers" || normalized === "tier-create" || normalized === "tier-details") return <><TierGrid /><GenericTable title="Membership Tiers" rows={tierDemoData} /></>;
    if (normalized === "leaderboards") return <><LoyaltySurfaceCards />{tableContent()}</>;
    if (normalized === "achievements") return <><AchievementsGrid /><GenericTable title="Achievements" rows={achievementDemoData} /></>;
    if (normalized === "analytics") return <><LoyaltyAnalyticsCharts /><LoyaltySurfaceCards /></>;
    if (["rules", "wallet", "catalog", "redemptions", "cashback-payouts", "transactions"].includes(normalized)) return <>{tableContent()}<LoyaltyPagination /></>;
    return <EmptyLoyaltyState />;
  };

  const showFilters = ["rules", "wallet", "catalog", "redemptions", "cashback-payouts", "leaderboards", "transactions"].includes(normalized);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {showFilters ? <LoyaltyFilterBar query={query} onQueryChange={setQuery} label={meta[normalized]?.title || "Loyalty"} /> : null}
      {content()}
    </div>
  );
};

export default LoyaltyWorkspace;
