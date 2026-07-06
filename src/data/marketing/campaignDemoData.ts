export type CampaignRecord = {
  id: string;
  name: string;
  type: string;
  audience: string;
  channel: string;
  region: string;
  status: string;
  revenue: string;
  roi: string;
  owner: string;
  launchDate: string;
};

export const campaigns: CampaignRecord[] = [
  { id: "CMP-1001", name: "Contractor Monsoon Push", type: "Contractor Campaign", audience: "Contractors", channel: "Omnichannel", region: "West", status: "Draft", revenue: "$82K", roi: "3.2x", owner: "Marketing Ops", launchDate: "2026-07-15" },
  { id: "CMP-1002", name: "Dealer QR Activation", type: "Dealer Campaign", audience: "Dealers", channel: "QR + WhatsApp", region: "North", status: "Scheduled", revenue: "$184K", roi: "4.8x", owner: "Channel Team", launchDate: "2026-07-18" },
  { id: "CMP-1003", name: "Warranty Registration Drive", type: "Warranty Campaign", audience: "Consumers", channel: "Email + SMS", region: "South", status: "Live", revenue: "$248K", roi: "5.4x", owner: "Lifecycle Team", launchDate: "2026-07-05" },
  { id: "CMP-1004", name: "Retail Festival Rewards", type: "Retailer Campaign", audience: "Retailers", channel: "Push + Coupon", region: "East", status: "Completed", revenue: "$128K", roi: "3.9x", owner: "Retail Team", launchDate: "2026-06-20" },
];

export const campaignWizardSteps = ["Campaign Type", "Products and Segments", "Reward Rules", "Landing Page", "Preview", "Publish"];
export const campaignTypes = ["Product Campaign", "Dealer Campaign", "Consumer Campaign", "Distributor Campaign", "Retailer Campaign", "Contractor Campaign", "Referral Campaign", "Warranty Campaign"];
export const campaignCalendar = [
  { id: "CAL-1", title: "Dealer QR Activation", date: "Jul 18", status: "Scheduled" },
  { id: "CAL-2", title: "Referral Boost", date: "Jul 22", status: "Draft" },
  { id: "CAL-3", title: "Email Dealer Digest", date: "Jul 25", status: "Scheduled" },
];
