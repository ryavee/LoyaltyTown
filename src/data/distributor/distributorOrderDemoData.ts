export type DistributorOrderStatus = "Draft" | "Submitted" | "Approved" | "Packed" | "Dispatched" | "Delivered" | "Cancelled";

export type DistributorOrderRecord = {
  id: string;
  orderNumber: string;
  distributor: string;
  products: string;
  sku: string;
  quantity: string;
  price: string;
  discount: string;
  tax: string;
  totalAmount: string;
  status: DistributorOrderStatus;
  expectedDeliveryDate: string;
  remarks: string;
};

export const distributorOrders: DistributorOrderRecord[] = [
  { id: "DORD-9001", orderNumber: "DORD-2026-9001", distributor: "Apex Industrial Supply", products: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", quantity: "4,200", price: "$42", discount: "6%", tax: "18%", totalAmount: "$184,200", status: "Approved", expectedDeliveryDate: "2026-07-08", remarks: "Priority west replenishment" },
  { id: "DORD-9002", orderNumber: "DORD-2026-9002", distributor: "Northline Distribution", products: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", quantity: "8,100", price: "$58", discount: "8%", tax: "18%", totalAmount: "$431,800", status: "Packed", expectedDeliveryDate: "2026-07-09", remarks: "Campaign stock" },
  { id: "DORD-9003", orderNumber: "DORD-2026-9003", distributor: "Southern Trade Network", products: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", quantity: "2,400", price: "$86", discount: "5%", tax: "18%", totalAmount: "$196,080", status: "Submitted", expectedDeliveryDate: "2026-07-10", remarks: "Requires credit approval" },
  { id: "DORD-9004", orderNumber: "DORD-2026-9004", distributor: "Eastern Channel Co.", products: "Contractor Tool Kit", sku: "KIT-CON-12", quantity: "640", price: "$120", discount: "4%", tax: "18%", totalAmount: "$72,840", status: "Cancelled", expectedDeliveryDate: "2026-07-11", remarks: "Credit hold" },
];
