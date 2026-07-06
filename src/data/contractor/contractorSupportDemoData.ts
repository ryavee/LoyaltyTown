export type ContractorSupportRecord = {
  id: string;
  ticketNumber: string;
  contractor: string;
  category: string;
  priority: string;
  status: string;
  openedOn: string;
};

export type ContractorWarrantyRecord = {
  id: string;
  claimNumber: string;
  contractor: string;
  customer: string;
  product: string;
  project: string;
  status: string;
  date: string;
};

export const contractorSupportTickets: ContractorSupportRecord[] = [
  { id: "CST-1001", ticketNumber: "TCK-88201", contractor: "Aman Verma", category: "Payout", priority: "High", status: "Open", openedOn: "2026-07-05" },
  { id: "CST-1002", ticketNumber: "TCK-88202", contractor: "Sonia Fernandes", category: "Training", priority: "Medium", status: "In Progress", openedOn: "2026-07-04" },
  { id: "CST-1003", ticketNumber: "TCK-88203", contractor: "R. Kannan", category: "KYC", priority: "High", status: "Pending", openedOn: "2026-07-03" },
];

export const contractorWarranties: ContractorWarrantyRecord[] = [
  { id: "CWA-1001", claimNumber: "WRN-77101", contractor: "Aman Verma", customer: "Skyline Developers", product: "WeatherShield Pro", project: "Skyline Tower Exterior", status: "Registered", date: "2026-07-01" },
  { id: "CWA-1002", claimNumber: "WRN-77102", contractor: "Sonia Fernandes", customer: "Mehta Residence", product: "Luxury Emulsion", project: "Bandra Premium Villa", status: "Claim Open", date: "2026-06-26" },
  { id: "CWA-1003", claimNumber: "WRN-77103", contractor: "R. Kannan", customer: "OMR Properties", product: "TileBond Ultra", project: "OMR Retail Plaza", status: "Closed", date: "2026-06-12" },
];
