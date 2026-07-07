export type EngagementType = "campaigns" | "rewards" | "wallet";

export type EngagementRow = {
  id: string;
  name: string;
  audience: string;
  channel: string;
  value: string;
  status: string;
};

export const engagementDemoData: Record<EngagementType, {
  title: string;
  description: string;
  filters: string[];
  kpis: Array<{ label: string; value: string; change: string; tone: "cyan" | "emerald" | "violet" | "amber" | "rose" }>;
  rows: EngagementRow[];
}> = {
  campaigns: {
    title: "Campaigns",
    description: "Plan and monitor QR, loyalty, referral, warranty, dealer, retailer, contractor, and marketplace campaigns.",
    filters: ["All Campaigns", "Active", "Draft", "Scheduled", "Completed"],
    kpis: [
      { label: "Total Campaigns", value: "248", change: "+18 this month", tone: "cyan" },
      { label: "Active Campaigns", value: "42", change: "Across 6 channels", tone: "emerald" },
      { label: "QR Activations", value: "682K", change: "+22% MoM", tone: "violet" },
      { label: "Campaign ROI", value: "4.8x", change: "+0.6x QoQ", tone: "amber" },
    ],
    rows: [
      { id: "CMP-1", name: "Dealer QR Activation Drive", audience: "Dealers", channel: "QR + WhatsApp", value: "4.8x ROI", status: "Active" },
      { id: "CMP-2", name: "Warranty Registration Festival", audience: "Customers", channel: "Landing Page", value: "16K conversions", status: "Scheduled" },
      { id: "CMP-3", name: "Contractor Monsoon Rewards", audience: "Contractors", channel: "Referral + Wallet", value: "$82K budget", status: "Draft" },
    ],
  },
  rewards: {
    title: "Rewards",
    description: "Manage reward catalog, redemptions, eligibility, stock, points cost, and campaign rewards.",
    filters: ["All Rewards", "Cashback", "Coupons", "Gift Vouchers", "Merchandise"],
    kpis: [
      { label: "Rewards Catalog", value: "420", change: "+28 new", tone: "cyan" },
      { label: "Redemptions", value: "284K", change: "+14% MoM", tone: "emerald" },
      { label: "Reward Liability", value: "$4.9M", change: "Outstanding", tone: "violet" },
      { label: "Stock Alerts", value: "18", change: "Needs refill", tone: "amber" },
    ],
    rows: [
      { id: "RWD-1", name: "Instant Cashback", audience: "Gold+ Members", channel: "Wallet", value: "2,000 points", status: "Active" },
      { id: "RWD-2", name: "Retail Coupon 10%", audience: "All Customers", channel: "Coupon", value: "18K stock", status: "Active" },
      { id: "RWD-3", name: "Contractor Training", audience: "Contractors", channel: "Learning", value: "800 seats", status: "Draft" },
    ],
  },
  wallet: {
    title: "Wallet",
    description: "Track customer, dealer, distributor, retailer, and contractor wallet balances, points, cashback, holds, and payouts.",
    filters: ["All Wallets", "Customers", "Dealers", "Distributors", "Payout Holds"],
    kpis: [
      { label: "Wallet Liability", value: "$4.9M", change: "+8.2% MoM", tone: "violet" },
      { label: "Points Issued", value: "42.8M", change: "This quarter", tone: "cyan" },
      { label: "Cashback Paid", value: "$482K", change: "91% settled", tone: "emerald" },
      { label: "Fraud Holds", value: "128", change: "Risk review", tone: "rose" },
    ],
    rows: [
      { id: "WAL-1", name: "Prakash Dealer Hub", audience: "Dealer", channel: "Partner Wallet", value: "$18,420", status: "Pending" },
      { id: "WAL-2", name: "Metro Distribution Co.", audience: "Distributor", channel: "Partner Wallet", value: "$42,900", status: "Hold" },
      { id: "WAL-3", name: "Aarav Sharma", audience: "Customer", channel: "Consumer Wallet", value: "$428", status: "Active" },
    ],
  },
};
