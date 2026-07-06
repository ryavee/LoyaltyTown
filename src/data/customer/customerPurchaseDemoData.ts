export type CustomerPurchaseRecord = {
  id: string;
  invoice: string;
  customer: string;
  product: string;
  sku: string;
  dealer: string;
  retailer: string;
  project: string;
  amount: string;
  purchaseDate: string;
  status: string;
};

export const customerPurchases: CustomerPurchaseRecord[] = [
  { id: "CPU-1001", invoice: "INV-MBM-9011", customer: "Aarav Sharma", product: "WeatherShield Pro", sku: "WSP-20L-EXT", dealer: "Metro Build Mart", retailer: "Urban Paint Point", project: "Skyline Tower Exterior", amount: "$840", purchaseDate: "2026-07-03", status: "Verified" },
  { id: "CPU-1002", invoice: "INV-UPP-3308", customer: "Nisha Kapoor", product: "Smart QR Paint Bucket", sku: "SQR-10L-IV", dealer: "Urban Paint Point", retailer: "Urban Paint Point", project: "Home Renovation", amount: "$320", purchaseDate: "2026-07-02", status: "Warranty Linked" },
  { id: "CPU-1003", invoice: "INV-SCS-7712", customer: "Urban Build Co.", product: "TileBond Ultra", sku: "TBU-25KG", dealer: "Southern Contractor Store", retailer: "South Contractor Counter", project: "OMR Retail Plaza", amount: "$4,820", purchaseDate: "2026-07-01", status: "Verified" },
  { id: "CPU-1004", invoice: "INV-PHH-1190", customer: "Riya Batra", product: "FixMate", sku: "FIX-5KG", dealer: "Prime Hardware Hub", retailer: "Prime Hardware Retail", project: "Noida Modular Block", amount: "$1,240", purchaseDate: "2026-06-30", status: "Review" },
];
