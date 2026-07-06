export type InvoiceRecord = {
  id: string;
  invoiceNumber: string;
  customer: string;
  company: string;
  gstNumber: string;
  products: string;
  tax: string;
  discount: string;
  total: string;
  dueDate: string;
  paymentStatus: string;
};

export const invoices: InvoiceRecord[] = [
  { id: "INV-1001", invoiceNumber: "LT-INV-2026-1001", customer: "Metro Build Mart", company: "Apex Paints India", gstNumber: "27AABCA1234F1Z5", products: "Enterprise subscription, QR credits", tax: "₹3.24L", discount: "₹42K", total: "₹21.42L", dueDate: "2026-07-15", paymentStatus: "Pending" },
  { id: "INV-1002", invoiceNumber: "LT-INV-2026-1002", customer: "Urban Paint Point", company: "ColorMax Coatings", gstNumber: "27AACCU8841P1Z2", products: "Growth plan, WhatsApp credits", tax: "₹82K", discount: "₹12K", total: "₹5.36L", dueDate: "2026-07-10", paymentStatus: "Paid" },
  { id: "INV-1003", invoiceNumber: "LT-INV-2026-1003", customer: "Southern Contractor Store", company: "TileBond Systems", gstNumber: "33AADCT5590K1Z8", products: "Professional plan, AI analytics", tax: "₹1.18L", discount: "₹0", total: "₹7.74L", dueDate: "2026-07-20", paymentStatus: "Overdue" },
  { id: "INV-1004", invoiceNumber: "LT-INV-2026-1004", customer: "Prime Hardware Hub", company: "FixMate Industries", gstNumber: "07AAECP4418R1Z9", products: "Starter plan", tax: "₹28K", discount: "₹4K", total: "₹1.82L", dueDate: "2026-07-22", paymentStatus: "Failed" },
];

export const creditNotes = [
  { id: "CN-1001", note: "CN-2026-041", invoice: "LT-INV-2026-1002", customer: "Urban Paint Point", amount: "₹18K", reason: "Messaging credit adjustment", status: "Issued" },
  { id: "CN-1002", note: "CN-2026-042", invoice: "LT-INV-2026-1003", customer: "Southern Contractor Store", amount: "₹32K", reason: "Annual plan correction", status: "Review" },
];

export const debitNotes = [
  { id: "DN-1001", note: "DN-2026-018", invoice: "LT-INV-2026-1001", customer: "Metro Build Mart", amount: "₹46K", reason: "Additional QR credits", status: "Pending" },
];
