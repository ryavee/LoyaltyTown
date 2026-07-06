export type DealerOrderRecord = {
  id: string;
  orderNumber: string;
  dealer: string;
  supplier: string;
  product: string;
  sku: string;
  quantity: string;
  price: string;
  discount: string;
  tax: string;
  totalAmount: string;
  expectedDelivery: string;
  status: "Draft" | "Submitted" | "Approved" | "Packed" | "Dispatched" | "Delivered" | "Cancelled";
};

export const dealerOrders: DealerOrderRecord[] = [
  { id: "DORD-4401", orderNumber: "DORD-2026-4401", dealer: "Metro Build Mart", supplier: "Apex Industrial Supply", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", quantity: "420", price: "$42", discount: "5%", tax: "18%", totalAmount: "$16,824", expectedDelivery: "2026-07-08", status: "Approved" },
  { id: "DORD-4402", orderNumber: "DORD-2026-4402", dealer: "Prime Hardware Hub", supplier: "Northline Distribution", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", quantity: "860", price: "$58", discount: "6%", tax: "18%", totalAmount: "$46,902", expectedDelivery: "2026-07-09", status: "Packed" },
  { id: "DORD-4403", orderNumber: "DORD-2026-4403", dealer: "Southern Contractor Store", supplier: "Southern Trade Network", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", quantity: "220", price: "$86", discount: "4%", tax: "18%", totalAmount: "$17,458", expectedDelivery: "2026-07-10", status: "Submitted" },
  { id: "DORD-4404", orderNumber: "DORD-2026-4404", dealer: "Eastern Pro Dealer", supplier: "Eastern Channel Co.", product: "Contractor Tool Kit", sku: "KIT-CON-12", quantity: "116", price: "$120", discount: "4%", tax: "18%", totalAmount: "$13,086", expectedDelivery: "2026-07-11", status: "Cancelled" },
];
