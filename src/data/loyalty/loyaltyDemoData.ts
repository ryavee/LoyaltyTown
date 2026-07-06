import { AlertTriangle, Award, BadgeCheck, Crown, Gift, HandCoins, Trophy, UsersRound, WalletCards } from "lucide-react";

export const loyaltyKpis = [
  { id: "members", label: "Total Members", value: "3.8M", target: "All owner types", progress: 84, icon: UsersRound },
  { id: "active", label: "Active Members", value: "2.9M", target: "76% active", progress: 76, icon: BadgeCheck },
  { id: "issued", label: "Points Issued", value: "42.8M", target: "This quarter", progress: 72, icon: HandCoins },
  { id: "redeemed", label: "Points Redeemed", value: "18.4M", target: "Burn rate", progress: 58, icon: Gift },
  { id: "cashback", label: "Cashback Paid", value: "$482K", target: "Static payouts", progress: 64, icon: WalletCards },
  { id: "pending", label: "Pending Payouts", value: "$92K", target: "Approval queue", progress: 38, icon: WalletCards },
  { id: "tiers", label: "Active Tiers", value: 5, target: "Bronze to Diamond", progress: 100, icon: Crown },
  { id: "reward-redemptions", label: "Reward Redemptions", value: "284K", target: "+14% MoM", progress: 68, icon: Trophy },
  { id: "fraud", label: "Fraud Holds", value: 128, target: "Risk review", progress: 24, icon: AlertTriangle },
  { id: "expiring", label: "Expiring Points", value: "2.4M", target: "Next 30 days", progress: 42, icon: Award },
];

export const loyaltyTrendData = [
  { month: "Jan", points: 8.2, redemptions: 1.2, cashback: 0.22, tiers: 1.8, fraud: 32, liability: 2.4 },
  { month: "Feb", points: 9.1, redemptions: 1.5, cashback: 0.28, tiers: 2.2, fraud: 38, liability: 2.8 },
  { month: "Mar", points: 11.4, redemptions: 1.9, cashback: 0.34, tiers: 2.7, fraud: 44, liability: 3.2 },
  { month: "Apr", points: 13.2, redemptions: 2.3, cashback: 0.38, tiers: 3.1, fraud: 51, liability: 3.8 },
  { month: "May", points: 16.8, redemptions: 2.7, cashback: 0.44, tiers: 3.6, fraud: 62, liability: 4.3 },
  { month: "Jun", points: 19.4, redemptions: 3.2, cashback: 0.52, tiers: 4.2, fraud: 71, liability: 4.9 },
];

export const loyaltyInsights = [
  "Dealer wallets hold the largest reward liability; review expiry campaigns before month end.",
  "Contractor tier upgrades are driving higher redemption frequency in West region.",
  "Fraud holds are concentrated in duplicate QR scan earn rules.",
  "Cashback payout reconciliation is healthy but pending approvals are rising week over week.",
];
