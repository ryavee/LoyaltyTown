export type ContractorRewardRecord = { id: string; reward: string; contractor: string; points: string; type: string; status: string };

export const contractorRewards: ContractorRewardRecord[] = [
  { id: "CRW-1001", reward: "Premium Tool Kit", contractor: "Aman Verma", points: "18,000", type: "Catalog", status: "Redeemed" },
  { id: "CRW-1002", reward: "Cashback Payout", contractor: "Sonia Fernandes", points: "12,400", type: "Cashback", status: "Pending" },
  { id: "CRW-1003", reward: "Training Bonus", contractor: "R. Kannan", points: "6,200", type: "Milestone", status: "Approved" },
  { id: "CRW-1004", reward: "Referral Bonus", contractor: "Riya Patel", points: "4,800", type: "Referral", status: "Review" },
];
