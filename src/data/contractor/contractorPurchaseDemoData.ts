export type ContractorPurchaseRecord = {
  id: string;
  invoice: string;
  dealer: string;
  product: string;
  sku: string;
  quantity: string;
  amount: string;
  invoiceDate: string;
  uploadStatus: string;
  verificationStatus: string;
};

export const contractorPurchases: ContractorPurchaseRecord[] = [
  { id: "CPU-1001", invoice: "INV-MBM-22891", dealer: "Metro Build Mart", product: "WeatherShield Pro", sku: "WSP-20L-EXT", quantity: "42", amount: "$6,420", invoiceDate: "2026-07-01", uploadStatus: "Uploaded", verificationStatus: "Verified" },
  { id: "CPU-1002", invoice: "INV-UPP-77812", dealer: "Urban Paint Point", product: "Luxury Emulsion", sku: "LUX-10L-IV", quantity: "28", amount: "$3,640", invoiceDate: "2026-06-28", uploadStatus: "Uploaded", verificationStatus: "Pending" },
  { id: "CPU-1003", invoice: "INV-SCS-44128", dealer: "Southern Contractor Store", product: "TileBond Ultra", sku: "TBU-25KG", quantity: "90", amount: "$4,280", invoiceDate: "2026-06-24", uploadStatus: "Uploaded", verificationStatus: "Verified" },
  { id: "CPU-1004", invoice: "INV-PHH-11872", dealer: "Prime Hardware Hub", product: "FixMate", sku: "FIX-5KG", quantity: "54", amount: "$2,180", invoiceDate: "2026-06-19", uploadStatus: "Missing", verificationStatus: "Review" },
];
