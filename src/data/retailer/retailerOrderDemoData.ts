export type RetailerOrderRecord = {
  id: string; orderNumber: string; retailer: string; supplier: string; product: string; sku: string; quantity: string; price: string; discount: string; tax: string; totalAmount: string; expectedDelivery: string; status: "Draft" | "Submitted" | "Approved" | "Packed" | "Dispatched" | "Delivered" | "Cancelled";
};
export const retailerOrders: RetailerOrderRecord[] = [
  { id: "RORD-001", orderNumber: "RORD-2026-001", retailer: "Urban Paint Point", supplier: "Metro Build Mart", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", quantity: "120", price: "$42", discount: "4%", tax: "18%", totalAmount: "$4,748", expectedDelivery: "2026-07-08", status: "Approved" },
  { id: "RORD-002", orderNumber: "RORD-2026-002", retailer: "Prime Hardware Retail", supplier: "Prime Hardware Hub", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", quantity: "220", price: "$58", discount: "5%", tax: "18%", totalAmount: "$11,982", expectedDelivery: "2026-07-09", status: "Packed" },
  { id: "RORD-003", orderNumber: "RORD-2026-003", retailer: "South Contractor Counter", supplier: "Southern Contractor Store", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", quantity: "64", price: "$86", discount: "3%", tax: "18%", totalAmount: "$5,168", expectedDelivery: "2026-07-10", status: "Submitted" },
];
