import {
  BadgeCheck,
  Boxes,
  Globe2,
  Image,
  Layers3,
  Package,
  Palette,
  Tags,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CatalogStatus = "Active" | "Inactive" | "Archived" | "Draft";

export type CategoryRecord = {
  id: string;
  name: string;
  code: string;
  parent: string;
  description: string;
  icon: string;
  image: string;
  status: CatalogStatus;
  displayOrder: string;
  seoTitle: string;
  seoDescription: string;
  products: string;
  createdAt: string;
};

export type BrandRecord = {
  id: string;
  name: string;
  code: string;
  country: string;
  industry: string;
  website: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  status: CatalogStatus;
  products: string;
  countries: string;
  createdAt: string;
};

export type SkuRecord = {
  id: string;
  skuCode: string;
  product: string;
  category: string;
  brand: string;
  mrp: string;
  basePrice: string;
  sellingPrice: string;
  unit: string;
  weight: string;
  dimensions: string;
  color: string;
  size: string;
  warranty: string;
  qrRequired: string;
  batchRequired: string;
  status: CatalogStatus;
};

export type CatalogModule = "categories" | "brands" | "sku-management" | "skus";

export type CatalogConfig = {
  module: CatalogModule;
  title: string;
  singular: string;
  basePath: string;
  icon: LucideIcon;
  description: string;
};

export const catalogConfigs: Record<CatalogModule, CatalogConfig> = {
  categories: {
    module: "categories",
    title: "Category Management",
    singular: "Category",
    basePath: "/categories",
    icon: Tags,
    description: "Manage product hierarchy, parent categories, SEO metadata, icons, images, and catalog display order.",
  },
  brands: {
    module: "brands",
    title: "Brand Management",
    singular: "Brand",
    basePath: "/brands",
    icon: BadgeCheck,
    description: "Manage brand identity, countries, industry alignment, logos, banners, colors, documents, and product portfolios.",
  },
  "sku-management": {
    module: "sku-management",
    title: "SKU Management",
    singular: "SKU",
    basePath: "/sku-management",
    icon: Boxes,
    description: "Manage sellable SKU attributes, pricing, warranty, QR requirements, batch controls, inventory, and lifecycle status.",
  },
  skus: {
    module: "skus",
    title: "SKU Management",
    singular: "SKU",
    basePath: "/skus",
    icon: Boxes,
    description: "Manage sellable SKU attributes, pricing, warranty, QR requirements, batch controls, inventory, and lifecycle status.",
  },
};

export const categories: CategoryRecord[] = [
  { id: "CAT-1001", name: "Industrial Adhesives", code: "ADH", parent: "Root", description: "Adhesives for manufacturing and contractor channels.", icon: "Layers", image: "adhesives.jpg", status: "Active", displayOrder: "10", seoTitle: "Industrial Adhesives", seoDescription: "High-strength industrial adhesive products.", products: "1,284", createdAt: "2026-06-02" },
  { id: "CAT-1002", name: "Construction Chemicals", code: "CHEM", parent: "Root", description: "Chemicals for construction, flooring, and bonding.", icon: "Package", image: "chemicals.jpg", status: "Active", displayOrder: "20", seoTitle: "Construction Chemicals", seoDescription: "Construction-ready chemical products.", products: "2,418", createdAt: "2026-06-08" },
  { id: "CAT-1003", name: "Waterproofing", code: "WTR", parent: "Construction Chemicals", description: "Waterproofing coatings and sealants.", icon: "Shield", image: "waterproofing.jpg", status: "Inactive", displayOrder: "30", seoTitle: "Waterproofing Products", seoDescription: "Sealants and waterproofing systems.", products: "842", createdAt: "2026-06-18" },
  { id: "CAT-1004", name: "Tools", code: "TLS", parent: "Root", description: "Contractor and channel kits.", icon: "Wrench", image: "tools.jpg", status: "Archived", displayOrder: "40", seoTitle: "Contractor Tools", seoDescription: "Tools and kits for channel workflows.", products: "316", createdAt: "2026-06-24" },
];

export const brands: BrandRecord[] = [
  { id: "BRD-2001", name: "LoyalChem", code: "LCHEM", country: "India", industry: "Chemicals", website: "https://loyalchem.example", description: "Industrial and construction chemical brand.", primaryColor: "#22d3ee", secondaryColor: "#0f172a", status: "Active", products: "812", countries: "8", createdAt: "2026-05-12" },
  { id: "BRD-2002", name: "LoyalCoat", code: "LCOAT", country: "India", industry: "Coatings", website: "https://loyalcoat.example", description: "Coatings, waterproofing, and surface protection.", primaryColor: "#34d399", secondaryColor: "#111827", status: "Active", products: "1,940", countries: "12", createdAt: "2026-05-20" },
  { id: "BRD-2003", name: "LoyalMech", code: "LMECH", country: "Germany", industry: "Machinery", website: "https://loyalmech.example", description: "Serialized mechanical products and warranty workflows.", primaryColor: "#a78bfa", secondaryColor: "#020617", status: "Draft", products: "284", countries: "4", createdAt: "2026-06-04" },
  { id: "BRD-2004", name: "LoyalTools", code: "LTOOL", country: "UAE", industry: "Tools", website: "https://loyaltools.example", description: "Contractor tools and bundled kits.", primaryColor: "#f59e0b", secondaryColor: "#0f172a", status: "Inactive", products: "156", countries: "3", createdAt: "2026-06-26" },
];

export const skus: SkuRecord[] = [
  { id: "SKU-3001", skuCode: "SHIELD-PRO-20KG", product: "LT Shield Pro", category: "Industrial Adhesives", brand: "LoyalChem", mrp: "$148", basePrice: "$104", sellingPrice: "$128", unit: "Bag", weight: "20 KG", dimensions: "42 x 32 x 12 cm", color: "Grey", size: "20 KG", warranty: "24 months", qrRequired: "Yes", batchRequired: "Yes", status: "Active" },
  { id: "SKU-3002", skuCode: "BOND-MAX-10KG", product: "LT Bond Max", category: "Construction Chemicals", brand: "LoyalChem", mrp: "$82", basePrice: "$56", sellingPrice: "$72", unit: "Bucket", weight: "10 KG", dimensions: "30 x 30 x 28 cm", color: "White", size: "10 KG", warranty: "18 months", qrRequired: "Yes", batchRequired: "Yes", status: "Active" },
  { id: "SKU-3003", skuCode: "SEAL-GUARD-5L", product: "LT Seal Guard", category: "Waterproofing", brand: "LoyalCoat", mrp: "$46", basePrice: "$30", sellingPrice: "$39", unit: "Can", weight: "5 L", dimensions: "22 x 22 x 26 cm", color: "Blue", size: "5 L", warranty: "60 months", qrRequired: "Yes", batchRequired: "No", status: "Draft" },
  { id: "SKU-3004", skuCode: "PUMP-MOTOR-1HP", product: "LT Pump Motor", category: "Machinery", brand: "LoyalMech", mrp: "$220", basePrice: "$160", sellingPrice: "$198", unit: "Piece", weight: "18 KG", dimensions: "48 x 28 x 34 cm", color: "Black", size: "1 HP", warranty: "36 months", qrRequired: "Yes", batchRequired: "Yes", status: "Inactive" },
];

export const analyticsCards = [
  { id: "products", label: "Mapped Products", value: "4,860", icon: Package },
  { id: "images", label: "Assets Ready", value: "92%", icon: Image },
  { id: "regions", label: "Countries", value: "12", icon: Globe2 },
  { id: "identity", label: "Brand Colors", value: "18", icon: Palette },
];

export const categoryTabs = ["Overview", "Products", "Sub Categories", "Analytics", "History", "Audit Log"];
export const brandTabs = ["Overview", "Products", "Categories", "Analytics", "History", "Documents"];
export const skuTabs = ["Overview", "Pricing", "Warranty", "QR", "Inventory", "Batches", "Analytics", "History", "Audit"];

export const historyRows = [
  { id: "HIS-001", event: "Record created", owner: "Catalog Ops", time: "Jun 02, 2026" },
  { id: "HIS-002", event: "Metadata updated", owner: "Product Manager", time: "Jun 12, 2026" },
  { id: "HIS-003", event: "Status changed", owner: "Admin", time: "Jun 22, 2026" },
];
