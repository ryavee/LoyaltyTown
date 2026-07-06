export type CustomerRewardRecord = {
  id: string;
  reward: string;
  customer: string;
  rewardType: "Gift Voucher" | "Cashback" | "Coupon" | "Merchandise" | "Training" | "Membership";
  points: string;
  status: string;
};

export const customerRewards: CustomerRewardRecord[] = [
  { id: "CRD-1001", reward: "Home Improvement Voucher", customer: "Aarav Sharma", rewardType: "Gift Voucher", points: "12,000", status: "Available" },
  { id: "CRD-1002", reward: "Cashback Payout", customer: "Nisha Kapoor", rewardType: "Cashback", points: "6,400", status: "Redeemed" },
  { id: "CRD-1003", reward: "Premium Tool Kit", customer: "Urban Build Co.", rewardType: "Merchandise", points: "28,000", status: "Pending" },
  { id: "CRD-1004", reward: "Gold Membership Upgrade", customer: "Riya Batra", rewardType: "Membership", points: "8,000", status: "Available" },
];
