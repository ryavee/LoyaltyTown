export type PointsRuleRecord = {
  id: string;
  ruleName: string;
  ruleType: string;
  ownerType: string;
  earnValue: string;
  trigger: string;
  region: string;
  status: string;
};

export const pointsRules: PointsRuleRecord[] = [
  { id: "PRL-001", ruleName: "QR Scan Earn", ruleType: "Scan-based", ownerType: "Consumer", earnValue: "50 pts", trigger: "Product verified", region: "All India", status: "Live" },
  { id: "PRL-002", ruleName: "Dealer Sale Bonus", ruleType: "Purchase-based", ownerType: "Dealer", earnValue: "2x", trigger: "Invoice approved", region: "North", status: "Scheduled" },
  { id: "PRL-003", ruleName: "Contractor Referral", ruleType: "Referral-based", ownerType: "Contractor", earnValue: "500 pts", trigger: "Referral converted", region: "West", status: "Draft" },
  { id: "PRL-004", ruleName: "Platinum Multiplier", ruleType: "Tier-based", ownerType: "Retailer", earnValue: "1.5x", trigger: "Eligible purchase", region: "South", status: "Live" },
];

export const pointsRuleTypes = ["Scan-based", "Purchase-based", "Referral-based", "Campaign-based", "Tier-based", "Product-based", "Region-based"];
