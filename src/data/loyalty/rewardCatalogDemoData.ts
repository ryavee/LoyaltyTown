export type RewardCatalogRecord = {
  id: string;
  reward: string;
  rewardType: string;
  points: string;
  stock: string;
  eligibility: string;
  redemptionSettings: string;
  status: string;
};

export const rewardsCatalog: RewardCatalogRecord[] = [
  { id: "RWD-001", reward: "Premium Tool Kit", rewardType: "Merchandise", points: "12,000", stock: "248", eligibility: "Contractors", redemptionSettings: "Approval required", status: "Live" },
  { id: "RWD-002", reward: "Dealer Cashback Boost", rewardType: "Cashback", points: "25,000", stock: "Unlimited", eligibility: "Dealers", redemptionSettings: "Auto approve", status: "Live" },
  { id: "RWD-003", reward: "Home Voucher", rewardType: "Gift Voucher", points: "8,500", stock: "1,240", eligibility: "Consumers", redemptionSettings: "OTP verify", status: "Review" },
  { id: "RWD-004", reward: "Training Pass", rewardType: "Training", points: "5,000", stock: "500", eligibility: "Retailers", redemptionSettings: "Manual fulfill", status: "Draft" },
];

export const rewardTypes = ["Gift Voucher", "Cashback", "Coupon", "Product", "Merchandise", "Experience", "Training", "Membership"];
