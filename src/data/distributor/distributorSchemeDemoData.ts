export type DistributorSchemeRecord = {
  id: string;
  schemeName: string;
  distributor: string;
  target: string;
  achievement: string;
  progress: number;
  earning: string;
  status: "Active" | "Achieved" | "At Risk";
};

export const distributorSchemes: DistributorSchemeRecord[] = [
  { id: "SCH-001", schemeName: "Monsoon Contractor Growth", distributor: "Apex Industrial Supply", target: "$2.4M", achievement: "$1.9M", progress: 79, earning: "$84K", status: "Active" },
  { id: "SCH-002", schemeName: "Paint Bucket Retail Push", distributor: "Northline Distribution", target: "$1.8M", achievement: "$1.5M", progress: 83, earning: "$62K", status: "Active" },
  { id: "SCH-003", schemeName: "Laminate Dealer Booster", distributor: "Southern Trade Network", target: "$1.2M", achievement: "$620K", progress: 52, earning: "$21K", status: "At Risk" },
  { id: "SCH-004", schemeName: "Tool Kit Training Reward", distributor: "Eastern Channel Co.", target: "$740K", achievement: "$760K", progress: 100, earning: "$38K", status: "Achieved" },
];

export const distributorWalletSummary = {
  pointsEarned: "842K",
  pointsRedeemed: "224K",
  cashbackEarned: "$118K",
  availableBalance: "$64K",
  pendingPayout: "$18K",
};
