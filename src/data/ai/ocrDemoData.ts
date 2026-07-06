export type OCRRecord = {
  id: string;
  receiptImage: string;
  invoiceNumber: string;
  dealer: string;
  product: string;
  amount: string;
  purchaseDate: string;
  confidenceScore: string;
  status: string;
};

export const ocrRows: OCRRecord[] = [
  { id: "OCR-1001", receiptImage: "receipt-1001.jpg", invoiceNumber: "INV-MBM-9011", dealer: "Metro Build Mart", product: "WeatherShield Pro Paint", amount: "₹18,420", purchaseDate: "2026-07-01", confidenceScore: "97%", status: "Verified" },
  { id: "OCR-1002", receiptImage: "receipt-1002.jpg", invoiceNumber: "INV-UPP-3308", dealer: "Urban Paint Point", product: "Luxury Emulsion", amount: "₹8,640", purchaseDate: "2026-06-24", confidenceScore: "91%", status: "Review" },
  { id: "OCR-1003", receiptImage: "receipt-1003.jpg", invoiceNumber: "INV-SCS-7712", dealer: "Southern Contractor Store", product: "TileBond Ultra", amount: "₹42,180", purchaseDate: "2026-06-18", confidenceScore: "74%", status: "Failed" },
];
