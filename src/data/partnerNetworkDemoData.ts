export type PartnerType = "manufacturers" | "distributors" | "dealers" | "retailers" | "contractors" | "architects";

export type PartnerRecord = {
  id: string;
  name: string;
  category: string;
  location: string;
  trustScore: number;
  verified: boolean;
  specialty: string;
  revenue: string;
  status: string;
  businessCategories: string[];
  connectedBrands: string[];
  headquarters: string;
  coverage: string;
};

export const partnerNetworkData: Record<PartnerType, { title: string; description: string; rows: PartnerRecord[] }> = {
  manufacturers: {
    title: "Manufacturers",
    description: "Discover verified manufacturers ready to expand distribution, dealer, retailer, contractor, and product QR networks.",
    rows: [
      { id: "MFG-1", name: "Himalaya Pumps", category: "Industrial Pumps", location: "Pune, India", trustScore: 96, verified: true, specialty: "Smart pump systems", revenue: "$8.4M", status: "Open Network", businessCategories: ["Industrial Equipment", "OEM Supply", "Water Systems"], connectedBrands: ["LoyaltyTown", "Cetrak", "AsterIQ"], headquarters: "Pune, India", coverage: "PAN India" },
      { id: "MFG-2", name: "Nova Fittings Global", category: "Plumbing Fixtures", location: "Dubai, UAE", trustScore: 92, verified: true, specialty: "Premium fittings", revenue: "$6.1M", status: "Expanding", businessCategories: ["Plumbing", "Interior Spec", "Export Supply"], connectedBrands: ["BuildLink", "Cetrak", "TradeHub"], headquarters: "Dubai, UAE", coverage: "GCC + Africa" },
      { id: "MFG-3", name: "Aster BuildTech", category: "Construction Materials", location: "Bengaluru, India", trustScore: 88, verified: true, specialty: "Boards and adhesives", revenue: "$4.8M", status: "Selective", businessCategories: ["Building Materials", "Retail Packaging", "Project Supply"], connectedBrands: ["Cetrak", "NorthStar"], headquarters: "Bengaluru, India", coverage: "South India" },
    ],
  },
  distributors: {
    title: "Distributors",
    description: "Find distributors with warehousing, fleet, dealer financing, and territory coverage.",
    rows: [
      { id: "DST-1", name: "Metro Distribution Co.", category: "Regional Distributor", location: "Mumbai, Pune, Goa", trustScore: 94, verified: true, specialty: "Dealer fulfillment", revenue: "$4.8M", status: "Available", businessCategories: ["Logistics", "Warehousing", "Channel Fulfillment"], connectedBrands: ["LoyaltyTown", "Himalaya", "Nova"], headquarters: "Mumbai, India", coverage: "Western India" },
      { id: "DST-2", name: "Gulf Channel Logistics", category: "Cross-border Distributor", location: "UAE, Oman", trustScore: 91, verified: true, specialty: "GCC imports", revenue: "$7.2M", status: "Available", businessCategories: ["Import Export", "Cold Chain", "Trade Finance"], connectedBrands: ["AsterIQ", "BuildLink", "Cetrak"], headquarters: "Dubai, UAE", coverage: "GCC + Oman" },
      { id: "DST-3", name: "EastLink Supply", category: "Warehouse Network", location: "Kolkata, Bhubaneswar", trustScore: 86, verified: false, specialty: "Retail restocking", revenue: "$2.9M", status: "Review", businessCategories: ["Retail Restock", "Inventory Ops", "Last Mile"], connectedBrands: ["LoyaltyTown", "NorthStar"], headquarters: "Kolkata, India", coverage: "East India" },
    ],
  },
  dealers: {
    title: "Dealers",
    description: "Connect with verified dealers for multi-brand sales, projects, CRM, quotations, and channel rewards.",
    rows: [
      { id: "DLR-1", name: "Prakash Dealer Hub", category: "Multi-brand Dealer", location: "Delhi NCR, Jaipur", trustScore: 95, verified: true, specialty: "Contractor CRM", revenue: "$2.1M", status: "Active", businessCategories: ["B2B Sales", "Project Accounts", "Channel Rewards"], connectedBrands: ["Himalaya", "Nova", "Cetrak"], headquarters: "Delhi NCR", coverage: "North India" },
      { id: "DLR-2", name: "Apex Tools Mart", category: "Industrial Dealer", location: "Chennai, Coimbatore", trustScore: 89, verified: true, specialty: "Tools and fittings", revenue: "$1.4M", status: "Active", businessCategories: ["Industrial Supply", "Service Contracts", "Bulk Orders"], connectedBrands: ["AsterIQ", "TradeHub"], headquarters: "Chennai", coverage: "South India" },
      { id: "DLR-3", name: "NorthStar Building Supply", category: "Project Dealer", location: "Lucknow, Kanpur", trustScore: 83, verified: false, specialty: "Residential projects", revenue: "$780K", status: "Onboarding", businessCategories: ["Residential Projects", "Site Support", "Lead Generation"], connectedBrands: ["BuildLink", "LoyaltyTown"], headquarters: "Lucknow", coverage: "Central India" },
    ],
  },
  retailers: {
    title: "Retailers",
    description: "Browse retail storefronts for POS sales, walk-in loyalty, offers, billing, and stock visibility.",
    rows: [
      { id: "RTL-1", name: "BuildRight Retail", category: "Retail Chain", location: "Bengaluru, Hyderabad", trustScore: 93, verified: true, specialty: "POS loyalty", revenue: "$920K", status: "Active", businessCategories: ["Retail Experience", "Promotions", "Loyalty POS"], connectedBrands: ["LoyaltyTown", "Nova", "Cetrak"], headquarters: "Bengaluru", coverage: "South India" },
      { id: "RTL-2", name: "HomeFix Store", category: "Independent Retailer", location: "Ahmedabad", trustScore: 87, verified: true, specialty: "Warranty activation", revenue: "$410K", status: "Active", businessCategories: ["Home Improvement", "After Sales", "In-store Service"], connectedBrands: ["AsterIQ", "Himalaya"], headquarters: "Ahmedabad", coverage: "Western India" },
      { id: "RTL-3", name: "Urban Hardware", category: "Hardware Retail", location: "Singapore", trustScore: 82, verified: false, specialty: "Premium fixtures", revenue: "$620K", status: "Review", businessCategories: ["Fixtures", "Premium Retail", "Brand Displays"], connectedBrands: ["BuildLink", "Nova"], headquarters: "Singapore", coverage: "SEA" },
    ],
  },
  contractors: {
    title: "Contractors",
    description: "Find contractors for projects, site reports, material estimates, verified purchases, and brand rewards.",
    rows: [
      { id: "CTR-1", name: "Ravi Contractor Network", category: "Civil Contractor", location: "Hyderabad", trustScore: 91, verified: true, specialty: "Commercial sites", revenue: "$420K", status: "Available", businessCategories: ["Civil Works", "Execution", "Site Reporting"], connectedBrands: ["BuildLink", "Cetrak", "Nova"], headquarters: "Hyderabad", coverage: "Telangana" },
      { id: "CTR-2", name: "BuildPro Associates", category: "MEP Contractor", location: "Bengaluru", trustScore: 88, verified: true, specialty: "Fit-out projects", revenue: "$680K", status: "Available", businessCategories: ["MEP", "Fit-Out", "Project Billing"], connectedBrands: ["LoyaltyTown", "AsterIQ"], headquarters: "Bengaluru", coverage: "Karnataka" },
      { id: "CTR-3", name: "Nairobi SiteWorks", category: "Project Contractor", location: "Nairobi, Kenya", trustScore: 80, verified: false, specialty: "Retail outlets", revenue: "$240K", status: "Screening", businessCategories: ["Retail Fit-Out", "Fast Delivery", "Site Ops"], connectedBrands: ["NorthStar", "TradeHub"], headquarters: "Nairobi", coverage: "East Africa" },
    ],
  },
  architects: {
    title: "Architects",
    description: "Engage architects and specifiers influencing product selection, brand preference, and project demand.",
    rows: [
      { id: "ARC-1", name: "Studio Meridian", category: "Architecture Studio", location: "Mumbai", trustScore: 94, verified: true, specialty: "Premium residential", revenue: "$1.2M influenced", status: "Active", businessCategories: ["Residential Design", "Material Spec", "Luxury Interiors"], connectedBrands: ["AsterIQ", "Himalaya", "Nova"], headquarters: "Mumbai", coverage: "Western India" },
      { id: "ARC-2", name: "Gulf Design Works", category: "Specifier Network", location: "Dubai", trustScore: 90, verified: true, specialty: "Commercial interiors", revenue: "$2.8M influenced", status: "Active", businessCategories: ["Commercial Interiors", "Brand Specification", "Project Consulting"], connectedBrands: ["BuildLink", "Cetrak"], headquarters: "Dubai", coverage: "GCC" },
      { id: "ARC-3", name: "Urban Form Lab", category: "Design Consultant", location: "Singapore", trustScore: 84, verified: false, specialty: "Retail formats", revenue: "$760K influenced", status: "Review", businessCategories: ["Retail Design", "Concept Development", "Fit-Out Strategy"], connectedBrands: ["LoyaltyTown", "NorthStar"], headquarters: "Singapore", coverage: "SEA" },
    ],
  },
};
