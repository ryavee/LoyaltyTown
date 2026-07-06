export type CustomerSupportRecord = {
  id: string;
  ticketNumber: string;
  customer: string;
  topic: string;
  priority: string;
  status: string;
  openedOn: string;
};

export const customerSupportTickets: CustomerSupportRecord[] = [
  { id: "CST-1001", ticketNumber: "SUP-88201", customer: "Aarav Sharma", topic: "Warranty registration", priority: "Medium", status: "Open", openedOn: "2026-07-05" },
  { id: "CST-1002", ticketNumber: "SUP-88202", customer: "Nisha Kapoor", topic: "Reward redemption", priority: "Low", status: "Resolved", openedOn: "2026-07-04" },
  { id: "CST-1003", ticketNumber: "SUP-88203", customer: "Urban Build Co.", topic: "Product verification", priority: "High", status: "Escalated", openedOn: "2026-07-03" },
];
