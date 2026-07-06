export type Stat = {
  label: string;
  value: string;
  change: string;
  tone: "cyan" | "emerald" | "violet" | "amber" | "rose";
};

export type ChartPoint = {
  name: string;
  revenue: number;
  scans: number;
  orders: number;
  network: number;
};

export type MarketplaceListing = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  verified: boolean;
  tags: string[];
};

export const platformStats: Stat[] = [
  { label: "Total Revenue", value: "$48.6M", change: "+18.4% YoY", tone: "emerald" },
  { label: "Active Companies", value: "8,420", change: "+312 this quarter", tone: "cyan" },
  { label: "Active Dealers", value: "42,180", change: "+9.2% MoM", tone: "violet" },
  { label: "Active Distributors", value: "4,860", change: "+186 verified", tone: "cyan" },
  { label: "Active Retailers", value: "128K", change: "+14.8% MoM", tone: "emerald" },
  { label: "Active Contractors", value: "312K", change: "+24K trained", tone: "amber" },
  { label: "QR Scans", value: "92.4M", change: "+31% campaign lift", tone: "violet" },
  { label: "Orders", value: "1.82M", change: "$12.8M pipeline", tone: "cyan" },
  { label: "Rewards Paid", value: "$6.4M", change: "91% settled", tone: "emerald" },
  { label: "Marketplace Leads", value: "18,920", change: "+2,480 new", tone: "amber" },
];

export const chartData: ChartPoint[] = [
  { name: "Jan", revenue: 32, scans: 48, orders: 24, network: 36 },
  { name: "Feb", revenue: 38, scans: 54, orders: 29, network: 42 },
  { name: "Mar", revenue: 44, scans: 63, orders: 33, network: 48 },
  { name: "Apr", revenue: 52, scans: 76, orders: 41, network: 57 },
  { name: "May", revenue: 61, scans: 88, orders: 49, network: 66 },
  { name: "Jun", revenue: 73, scans: 104, orders: 58, network: 74 },
];

export const roleDashboards = {
  manufacturer: {
    title: "Manufacturer Command Center",
    subtitle: "Product performance, dealer network, QR scans, campaigns, customer acquisition, and rewards analytics.",
    highlights: [
      ["Product Performance", "Eco Motor X2 leads sell-out with 28% QR activation growth."],
      ["Dealer Network", "North and West dealer cohorts crossed 94% monthly target."],
      ["QR Scans", "Anti-counterfeit scans flagged 128 risky events this week."],
      ["Campaigns", "Warranty registration campaign returned 5.4x ROI."],
      ["Customer Acquisition", "Scan-to-registration conversion improved to 41%."],
      ["Rewards Analytics", "$482K in verified rewards paid across channels."],
    ],
  },
  distributor: {
    title: "Distributor Operations",
    subtitle: "Inventory, orders, delivery, dealer performance, and outstanding payments.",
    highlights: [
      ["Inventory", "42K units available across Mumbai, Pune, Dubai, and Nairobi hubs."],
      ["Orders", "1,284 open orders with 92% SLA adherence."],
      ["Delivery", "Last-mile delivery health improved by 7.8%."],
      ["Dealer Performance", "Prakash Dealer Hub ranks #1 for Q2 purchases."],
      ["Outstanding Payments", "$1.8M receivables, 84% within terms."],
    ],
  },
  dealer: {
    title: "Dealer Growth Desk",
    subtitle: "Multi-brand sales, customer CRM, quotations, inventory, rewards, and marketplace leads.",
    highlights: [
      ["Multi-brand Sales", "Premium fittings and pumps are the fastest moving categories."],
      ["Customer CRM", "2,840 active customers with 312 follow-ups due."],
      ["Quotations", "$680K active quote value across project customers."],
      ["Inventory", "18 SKUs need replenishment in the next 10 days."],
      ["Rewards", "Gold tier unlocked with 842K points."],
      ["Marketplace Leads", "184 verified contractor and retailer leads available."],
    ],
  },
  retailer: {
    title: "Retailer Storefront",
    subtitle: "POS sales, stock, loyalty, offers, and billing.",
    highlights: [
      ["POS Sales", "$92K weekly sell-out across counters."],
      ["Stock", "Fast moving SKUs stocked for 18 days."],
      ["Customer Loyalty", "38% repeat customer contribution."],
      ["Offers", "Festival coupon usage up 16%."],
      ["Billing", "GST-ready billing queue settled at 97%."],
    ],
  },
  contractor: {
    title: "Contractor Project Hub",
    subtitle: "Projects, material estimates, brand rewards, purchase history, and site reports.",
    highlights: [
      ["Projects", "68 active projects across residential and commercial sites."],
      ["Material Estimates", "AI-assisted estimates prepared for 14 sites."],
      ["Brand Rewards", "Milestone rewards unlocked for 10 verified projects."],
      ["Purchase History", "$420K verified purchase value this quarter."],
      ["Site Reports", "26 site reports pending brand review."],
    ],
  },
};

export const marketplaceListings: MarketplaceListing[] = [
  { id: "MKT-1", title: "Himalaya Pumps seeks dealers", category: "Manufacturer looking for dealers", location: "North India, Nepal", description: "Industrial pump manufacturer expanding service-backed dealer network.", verified: true, tags: ["Pumps", "Industrial", "Dealer"] },
  { id: "MKT-2", title: "Prakash Dealer Hub wants premium brands", category: "Dealer looking for brands", location: "Delhi NCR, Jaipur", description: "Multi-brand dealer with strong contractor CRM and retail footfall.", verified: true, tags: ["Dealer", "Retail", "CRM"] },
  { id: "MKT-3", title: "Metro Distribution available", category: "Distributor by location", location: "Mumbai, Pune, Goa", description: "Warehousing, fleet, dealer financing, and retailer reach.", verified: true, tags: ["Distributor", "Logistics", "Finance"] },
  { id: "MKT-4", title: "BuildPro contractor network", category: "Contractors for projects", location: "Bengaluru, Hyderabad", description: "Verified contractor group available for commercial fit-out projects.", verified: false, tags: ["Contractor", "Projects", "Warranty"] },
];

export const qrBatches = [
  { id: "QRB-1001", product: "Eco Motor X2", quantity: "50,000", generated: "48,920", scans: "18,420", risk: "Low", status: "Active" },
  { id: "QRB-1002", product: "Premium Valve Kit", quantity: "24,000", generated: "24,000", scans: "9,812", risk: "Medium", status: "Printing" },
  { id: "QRB-1003", product: "Smart Water Filter", quantity: "80,000", generated: "76,400", scans: "31,840", risk: "High", status: "Review" },
];

export const topCities = ["Mumbai", "Delhi NCR", "Bengaluru", "Dubai", "Singapore", "Nairobi"];
export const topDealers = ["Prakash Dealer Hub", "BuildRight Retail", "Metro Trade Co.", "Apex Tools Mart"];
export const topBrands = ["Himalaya Pumps", "CetraK Industrial", "Nova Fittings", "Aster BuildTech"];
