export type PaymentRecord = {
  id: string;
  paymentId: string;
  customer: string;
  invoice: string;
  method: string;
  amount: string;
  status: string;
  timeline: string;
};

export const payments: PaymentRecord[] = [
  { id: "PAY-1001", paymentId: "PAY-UPI-88201", customer: "Urban Paint Point", invoice: "LT-INV-2026-1002", method: "UPI", amount: "₹5.36L", status: "Paid", timeline: "Settled in 4m" },
  { id: "PAY-1002", paymentId: "PAY-RZP-88202", customer: "Prime Hardware Hub", invoice: "LT-INV-2026-1004", method: "Razorpay", amount: "₹1.82L", status: "Failed", timeline: "Retry pending" },
  { id: "PAY-1003", paymentId: "PAY-BNK-88203", customer: "Metro Build Mart", invoice: "LT-INV-2026-1001", method: "Bank Transfer", amount: "₹10.00L", status: "Partial", timeline: "Manual reconciliation" },
  { id: "PAY-1004", paymentId: "PAY-STR-88204", customer: "Global Adhesives", invoice: "LT-INV-2026-1005", method: "Stripe", amount: "$18.4K", status: "Paid", timeline: "Settled" },
];

export const refunds = [
  { id: "REF-1001", refund: "REF-2026-0701", customer: "Prime Hardware Hub", method: "Razorpay", amount: "₹24K", status: "Processing" },
  { id: "REF-1002", refund: "REF-2026-0702", customer: "Urban Paint Point", method: "UPI", amount: "₹8K", status: "Approved" },
];
