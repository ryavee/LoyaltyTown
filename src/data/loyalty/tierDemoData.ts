export type TierRecord = {
  id: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  threshold: string;
  members: string;
  benefits: string;
  progression: string;
  status: string;
};

export const tiers: TierRecord[] = [
  { id: "TIR-001", tier: "Bronze", threshold: "0 pts", members: "1.8M", benefits: "Base rewards", progression: "0%", status: "Active" },
  { id: "TIR-002", tier: "Silver", threshold: "10K pts", members: "920K", benefits: "Faster earn", progression: "28%", status: "Active" },
  { id: "TIR-003", tier: "Gold", threshold: "25K pts", members: "420K", benefits: "Cashback boost", progression: "54%", status: "Active" },
  { id: "TIR-004", tier: "Platinum", threshold: "100K pts", members: "82K", benefits: "Priority rewards", progression: "78%", status: "Active" },
  { id: "TIR-005", tier: "Diamond", threshold: "250K pts", members: "18K", benefits: "Premium experiences", progression: "92%", status: "Review" },
];
