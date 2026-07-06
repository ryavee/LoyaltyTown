export type PaymentStatus = "Paid" | "Partially Paid" | "Outstanding" | "Overdue";

export type DistributorPaymentRecord = {
  id: string;
  invoiceNumber: string;
  distributor: string;
  amount: string;
  paidAmount: string;
  outstanding: string;
  dueDate: string;
  paymentMode: string;
  paymentStatus: PaymentStatus;
  collectionAgent: string;
};

export const distributorPayments: DistributorPaymentRecord[] = [
  { id: "PAY-001", invoiceNumber: "INV-2026-7720", distributor: "Apex Industrial Supply", amount: "$184,200", paidAmount: "$120,000", outstanding: "$64,200", dueDate: "2026-07-12", paymentMode: "Bank Transfer", paymentStatus: "Partially Paid", collectionAgent: "Finance West" },
  { id: "PAY-002", invoiceNumber: "INV-2026-7721", distributor: "Northline Distribution", amount: "$96,400", paidAmount: "$96,400", outstanding: "$0", dueDate: "2026-07-08", paymentMode: "UPI", paymentStatus: "Paid", collectionAgent: "Finance North" },
  { id: "PAY-003", invoiceNumber: "INV-2026-7722", distributor: "Southern Trade Network", amount: "$218,000", paidAmount: "$0", outstanding: "$218,000", dueDate: "2026-07-04", paymentMode: "Cheque", paymentStatus: "Overdue", collectionAgent: "Collections South" },
  { id: "PAY-004", invoiceNumber: "INV-2026-7723", distributor: "Eastern Channel Co.", amount: "$312,000", paidAmount: "$0", outstanding: "$312,000", dueDate: "2026-07-15", paymentMode: "NEFT", paymentStatus: "Outstanding", collectionAgent: "Collections East" },
];

export const collectionTimeline = [
  { id: "ct-1", title: "Invoice raised", description: "Distributor invoice generated and sent.", timestamp: "Jul 01, 2026" },
  { id: "ct-2", title: "Reminder sent", description: "Automated payment reminder queued.", timestamp: "Jul 04, 2026" },
  { id: "ct-3", title: "Partial payment posted", description: "Bank transfer reconciled with invoice.", timestamp: "Jul 05, 2026" },
  { id: "ct-4", title: "Collection follow-up", description: "Collection agent callback pending.", timestamp: "Today" },
];
