export type ProductStatus = "Draft" | "Active" | "Discontinued";

export type ProductRecord = {
  id: string;
  name: string;
  code: string;
  brand: string;
  category: string;
  description: string;
  shortDescription: string;
  consumerDisplayName: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
  imageCount: number;
  documentCount: number;
  warrantyMonths?: number;
  skuCount: number;
  qrBatches: number;
  campaigns: number;
  revenue: string;
  scans: string;
  imageUrl?: string;
  mrp?: string;
  qrEnabled?: boolean;
  warrantyEnabled?: boolean;
  updatedBy?: string;
  stockStatus?: "Healthy" | "Low" | "Critical";
};

export const products: ProductRecord[] = [
  {
    id: "PRD-1001",
    name: "LT Shield Pro",
    code: "LT-SHIELD-PRO",
    brand: "LoyalChem",
    category: "Industrial Adhesives",
    description: "High-bond industrial adhesive for flooring, panels, and contractor-grade applications.",
    shortDescription: "High-bond industrial adhesive with connected product verification.",
    consumerDisplayName: "Shield Pro Industrial Adhesive",
    status: "Active",
    createdAt: "2026-06-02",
    updatedAt: "2026-07-04",
    imageCount: 4,
    documentCount: 5,
    warrantyMonths: 24,
    skuCount: 12,
    qrBatches: 18,
    campaigns: 4,
    revenue: "$2.84M",
    scans: "1.42M",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3f4b99b4?auto=format&fit=crop&w=160&q=80",
    mrp: "$148",
    qrEnabled: true,
    warrantyEnabled: true,
    updatedBy: "Aarav Mehta",
    stockStatus: "Healthy",
  },
  {
    id: "PRD-1002",
    name: "LT Bond Max",
    code: "LT-BOND-MAX",
    brand: "LoyalChem",
    category: "Construction Chemicals",
    description: "Premium construction bonding product with dealer, retailer, and consumer QR journeys.",
    shortDescription: "Premium construction bonding product.",
    consumerDisplayName: "Bond Max Construction Adhesive",
    status: "Active",
    createdAt: "2026-05-18",
    updatedAt: "2026-07-01",
    imageCount: 3,
    documentCount: 4,
    warrantyMonths: 18,
    skuCount: 9,
    qrBatches: 14,
    campaigns: 3,
    revenue: "$2.16M",
    scans: "1.08M",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=160&q=80",
    mrp: "$82",
    qrEnabled: true,
    warrantyEnabled: true,
    updatedBy: "Nisha Rao",
    stockStatus: "Healthy",
  },
  {
    id: "PRD-1003",
    name: "LT Seal Guard",
    code: "LT-SEAL-GUARD",
    brand: "LoyalCoat",
    category: "Waterproofing",
    description: "Waterproofing product for residential and industrial channels.",
    shortDescription: "Waterproofing product with warranty registration.",
    consumerDisplayName: "Seal Guard Waterproofing",
    status: "Active",
    createdAt: "2026-04-22",
    updatedAt: "2026-06-29",
    imageCount: 2,
    documentCount: 3,
    warrantyMonths: 60,
    skuCount: 8,
    qrBatches: 11,
    campaigns: 2,
    revenue: "$1.74M",
    scans: "842K",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=160&q=80",
    mrp: "$64",
    qrEnabled: true,
    warrantyEnabled: true,
    updatedBy: "Kabir Sethi",
    stockStatus: "Low",
  },
  {
    id: "PRD-1004",
    name: "LT Pump Motor",
    code: "LT-PUMP-MOTOR",
    brand: "LoyalMech",
    category: "Machinery",
    description: "Serialized pump motor with warranty, service, and counterfeit-detection workflows.",
    shortDescription: "Serialized pump motor for warranty and service journeys.",
    consumerDisplayName: "Pump Motor",
    status: "Draft",
    createdAt: "2026-06-24",
    updatedAt: "2026-06-28",
    imageCount: 0,
    documentCount: 2,
    warrantyMonths: 36,
    skuCount: 5,
    qrBatches: 3,
    campaigns: 1,
    revenue: "$684K",
    scans: "318K",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=160&q=80",
    mrp: "$420",
    qrEnabled: true,
    warrantyEnabled: true,
    updatedBy: "Maya Iyer",
    stockStatus: "Critical",
  },
  {
    id: "PRD-1005",
    name: "LT Contractor Tool Kit",
    code: "LT-CONTRACTOR-KIT",
    brand: "LoyalTools",
    category: "Tools",
    description: "Bundled contractor kit with reward eligibility and QR lifecycle tracking.",
    shortDescription: "Reward-enabled contractor kit.",
    consumerDisplayName: "Contractor Tool Kit",
    status: "Discontinued",
    createdAt: "2026-02-10",
    updatedAt: "2026-06-12",
    imageCount: 5,
    documentCount: 2,
    skuCount: 3,
    qrBatches: 7,
    campaigns: 0,
    revenue: "$218K",
    scans: "96K",
    imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=160&q=80",
    mrp: "$118",
    qrEnabled: false,
    warrantyEnabled: false,
    updatedBy: "Product Ops",
    stockStatus: "Low",
  },
];

export const productKpis = [
  { id: "total", label: "Total Products", value: "8,420", target: "Across 18 enterprise brands", progress: 84 },
  { id: "active", label: "Active Products", value: "7,812", target: "Published to channel catalog", progress: 92 },
  { id: "draft", label: "Draft Products", value: "284", target: "Awaiting review", progress: 28 },
  { id: "discontinued", label: "Discontinued Products", value: "324", target: "Retained for audit", progress: 16 },
  { id: "missing-images", label: "Products Missing Images", value: "146", target: "Needs content action", progress: 21 },
  { id: "missing-warranty", label: "Products Missing Warranty", value: "98", target: "Needs warranty defaults", progress: 18 },
];

export const brands = ["LoyalChem", "LoyalCoat", "LoyalMech", "LoyalTools"];
export const categories = ["Industrial Adhesives", "Construction Chemicals", "Waterproofing", "Machinery", "Tools"];
export const statuses: ProductStatus[] = ["Draft", "Active", "Discontinued"];

export const productTabs = [
  "Overview",
  "SKUs",
  "Images",
  "Documents",
  "Warranty",
  "QR Batches",
  "Campaigns",
  "Analytics",
  "History",
  "Audit Log",
];

export const tabRows = {
  skus: [
    { id: "SKU-001", sku: "SHIELD-PRO-20KG", pack: "20 KG", mrp: "$148", status: "Active" },
    { id: "SKU-002", sku: "SHIELD-PRO-10KG", pack: "10 KG", mrp: "$82", status: "Active" },
    { id: "SKU-003", sku: "SHIELD-PRO-5KG", pack: "5 KG", mrp: "$46", status: "Draft" },
  ],
  qrBatches: [
    { id: "QRB-90842", quantity: "250K", factory: "Pune Factory", status: "Generated" },
    { id: "QRB-90817", quantity: "180K", factory: "Surat Factory", status: "Printed" },
    { id: "QRB-90788", quantity: "120K", factory: "Chennai Factory", status: "Mapped" },
  ],
  campaigns: [
    { id: "CMP-214", campaign: "Contractor Referral", channel: "WhatsApp", status: "Active" },
    { id: "CMP-208", campaign: "Dealer Rewards Boost", channel: "Portal", status: "Active" },
    { id: "CMP-194", campaign: "Warranty Education", channel: "Email", status: "Completed" },
  ],
  history: [
    { id: "HIS-001", event: "Product created", owner: "Product Ops", time: "Jun 02, 2026" },
    { id: "HIS-002", event: "Warranty defaults updated", owner: "Warranty Admin", time: "Jun 12, 2026" },
    { id: "HIS-003", event: "QR lifecycle enabled", owner: "Factory Admin", time: "Jun 18, 2026" },
  ],
  auditLog: [
    { id: "AUD-001", action: "CREATE", actor: "Product Ops", source: "Admin", time: "Jun 02, 2026 09:15" },
    { id: "AUD-002", action: "UPDATE", actor: "Pricing Manager", source: "Admin", time: "Jun 08, 2026 14:42" },
    { id: "AUD-003", action: "APPROVE", actor: "Compliance", source: "Workflow", time: "Jun 14, 2026 11:08" },
  ],
};

export const importPreviewRows = [
  { id: "ROW-001", product: "LT Surface Primer", code: "LT-SURFACE-PRIMER", brand: "LoyalCoat", category: "Waterproofing", status: "Valid" },
  { id: "ROW-002", product: "LT Tile Bond", code: "LT-TILE-BOND", brand: "LoyalChem", category: "Construction Chemicals", status: "Valid" },
  { id: "ROW-003", product: "LT Gear Motor", code: "LT-GEAR-MOTOR", brand: "LoyalMech", category: "Machinery", status: "Needs Review" },
];

export const validationResults = [
  { id: "VAL-001", rule: "Required product code", passed: "2,482", failed: "0", status: "Passed" },
  { id: "VAL-002", rule: "Known brand mapping", passed: "2,474", failed: "8", status: "Review" },
  { id: "VAL-003", rule: "Warranty duration format", passed: "2,479", failed: "3", status: "Review" },
];

export const exportFields = [
  "Product Name",
  "Product Code",
  "Brand",
  "Category",
  "Description",
  "Status",
  "Warranty",
  "SKU Count",
  "QR Batches",
  "Revenue",
  "Scans",
];

export const productDashboardData = {
  kpis: [
    { id: "total", label: "Total Products", value: "8,420", target: "+8.4%", progress: 84, icon: "Package" },
    { id: "active", label: "Active Products", value: "7,812", target: "Published", progress: 92, icon: "PackageCheck" },
    { id: "inactive", label: "Inactive Products", value: "608", target: "Draft and retired", progress: 18, icon: "PackageX" },
    { id: "categories", label: "Categories", value: "46", target: "12 priority", progress: 72, icon: "Tags" },
    { id: "brands", label: "Brands", value: "18", target: "Enterprise brands", progress: 64, icon: "BadgeCheck" },
    { id: "skus", label: "SKUs", value: "48,216", target: "+5.1%", progress: 76, icon: "Boxes" },
    { id: "qr-enabled", label: "QR Enabled Products", value: "7,106", target: "84% catalog", progress: 84, icon: "QrCode" },
    { id: "warranty-enabled", label: "Warranty Enabled Products", value: "5,884", target: "70% catalog", progress: 70, icon: "ShieldCheck" },
    { id: "top-selling", label: "Top Selling Products", value: "124", target: "A-tier", progress: 88, icon: "TrendingUp" },
    { id: "low-stock", label: "Low Stock Products", value: "318", target: "Needs action", progress: 38, icon: "AlertTriangle" },
    { id: "top-scanned", label: "Top QR Scanned Products", value: "286", target: "High engagement", progress: 79, icon: "ScanLine" },
  ],
  productsByCategory: [
    { name: "Industrial Adhesives", value: 2480 },
    { name: "Construction Chemicals", value: 2180 },
    { name: "Waterproofing", value: 1460 },
    { name: "Machinery", value: 980 },
    { name: "Tools", value: 760 },
  ],
  productsByBrand: [
    { name: "LoyalChem", value: 3840 },
    { name: "LoyalCoat", value: 1780 },
    { name: "LoyalMech", value: 1320 },
    { name: "LoyalTools", value: 940 },
  ],
  trend: [
    { month: "Jan", products: 520, qr: 1.8, warranty: 0.42, lifecycle: 72 },
    { month: "Feb", products: 610, qr: 2.1, warranty: 0.5, lifecycle: 74 },
    { month: "Mar", products: 680, qr: 2.6, warranty: 0.59, lifecycle: 77 },
    { month: "Apr", products: 720, qr: 3.2, warranty: 0.71, lifecycle: 80 },
    { month: "May", products: 810, qr: 3.8, warranty: 0.84, lifecycle: 83 },
    { month: "Jun", products: 920, qr: 4.4, warranty: 0.96, lifecycle: 86 },
  ],
  lifecycle: [
    { stage: "Draft", products: 284 },
    { stage: "Active", products: 7812 },
    { stage: "Review", products: 176 },
    { stage: "Discontinued", products: 324 },
  ],
  recentProducts: products.slice(0, 4),
  updatedProducts: products.slice(1, 5),
  aiInsights: [
    { id: "ai-1", title: "Low Stock Products", severity: "Action", detail: "AquaShield Coat and Pump Motor SKUs may fall below reorder thresholds this week." },
    { id: "ai-2", title: "Top QR Scanned Products", severity: "Opportunity", detail: "Shield Pro scans are 22% above average. Consider dealer incentives in North and West regions." },
    { id: "ai-3", title: "Warranty Enablement Gap", severity: "Watch", detail: "1,222 active products are missing warranty defaults or claim rule mappings." },
  ],
};

export const productAnalyticsData = [
  { month: "Jan", scans: 1.2, sales: 2.4, warranty: 420, customers: 0.18, dealerSales: 1.7 },
  { month: "Feb", scans: 1.5, sales: 2.8, warranty: 460, customers: 0.22, dealerSales: 1.9 },
  { month: "Mar", scans: 1.9, sales: 3.1, warranty: 520, customers: 0.29, dealerSales: 2.2 },
  { month: "Apr", scans: 2.3, sales: 3.8, warranty: 590, customers: 0.36, dealerSales: 2.6 },
  { month: "May", scans: 2.8, sales: 4.2, warranty: 650, customers: 0.43, dealerSales: 2.9 },
  { month: "Jun", scans: 3.4, sales: 4.9, warranty: 730, customers: 0.52, dealerSales: 3.4 },
];

export const productRegionPerformance = [
  { region: "North", scans: 4.2, revenue: 8.6 },
  { region: "West", scans: 3.6, revenue: 7.2 },
  { region: "South", scans: 3.9, revenue: 7.8 },
  { region: "East", scans: 2.1, revenue: 4.4 },
  { region: "Central", scans: 1.8, revenue: 3.8 },
];

export const productTimelineData = [
  { id: "tl-1", title: "Created", description: "Product master created by Product Ops.", timestamp: "Jun 02, 2026", tone: "success" },
  { id: "tl-2", title: "Updated", description: "Pricing and warranty defaults updated.", timestamp: "Jun 08, 2026", tone: "info" },
  { id: "tl-3", title: "QR Generated", description: "250K QR codes generated for primary SKU.", timestamp: "Jun 18, 2026", tone: "success" },
  { id: "tl-4", title: "Dispatched", description: "Batch dispatched to West warehouse.", timestamp: "Jun 22, 2026", tone: "info" },
  { id: "tl-5", title: "Scanned", description: "First consumer verification scan recorded.", timestamp: "Jun 24, 2026", tone: "success" },
  { id: "tl-6", title: "Warranty Activated", description: "Warranty activated through public scan journey.", timestamp: "Jun 25, 2026", tone: "warning" },
  { id: "tl-7", title: "Reward Issued", description: "Contractor reward issued for product scan.", timestamp: "Jun 27, 2026", tone: "info" },
  { id: "tl-8", title: "Campaign Added", description: "Product added to contractor referral campaign.", timestamp: "Jul 01, 2026", tone: "success" },
];

export const productDocumentData = [
  { id: "doc-1", type: "Manual", name: "Installation Manual.pdf", owner: "Product Ops", updated: "Jul 01, 2026", status: "Published" },
  { id: "doc-2", type: "Datasheet", name: "Technical Datasheet.pdf", owner: "R&D", updated: "Jun 28, 2026", status: "Published" },
  { id: "doc-3", type: "Images", name: "Packaging Gallery.zip", owner: "Brand Team", updated: "Jun 24, 2026", status: "Review" },
  { id: "doc-4", type: "Certificates", name: "ISO Certificate.pdf", owner: "Compliance", updated: "Jun 18, 2026", status: "Published" },
  { id: "doc-5", type: "Warranty PDF", name: "Warranty Terms.pdf", owner: "Warranty Admin", updated: "Jun 12, 2026", status: "Published" },
];

export const productAuditData = [
  { id: "aud-1", action: "Created", actor: "Product Ops", source: "Admin", timestamp: "Jun 02, 2026 09:15" },
  { id: "aud-2", action: "Updated", actor: "Pricing Manager", source: "Admin", timestamp: "Jun 08, 2026 14:42" },
  { id: "aud-3", action: "QR Generated", actor: "Factory Admin", source: "QR Platform", timestamp: "Jun 18, 2026 11:02" },
  { id: "aud-4", action: "Status Changed", actor: "Compliance", source: "Workflow", timestamp: "Jun 20, 2026 16:35" },
  { id: "aud-5", action: "Deleted", actor: "System", source: "Retention Policy", timestamp: "Not applicable" },
];
