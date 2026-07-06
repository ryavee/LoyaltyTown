export type OpportunityRecord = {
  id: string;
  opportunityName: string;
  account: string;
  stage: "New" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost";
  estimatedValue: string;
  probability: string;
  expectedCloseDate: string;
  assignedTo: string;
  status: string;
};

export const opportunities: OpportunityRecord[] = [
  { id: "OPP-1001", opportunityName: "Prime Dealer Expansion", account: "Prime Hardware", stage: "Proposal", estimatedValue: "$64,200", probability: "72%", expectedCloseDate: "2026-08-18", assignedTo: "Rahul Mehta", status: "Active" },
  { id: "OPP-1002", opportunityName: "Apex Wallet Rollout", account: "Apex Industrial Supply", stage: "Negotiation", estimatedValue: "$120,000", probability: "81%", expectedCloseDate: "2026-08-05", assignedTo: "Nisha Kapoor", status: "Active" },
  { id: "OPP-1003", opportunityName: "Metro Contractor Conversion", account: "Metro Works", stage: "Qualified", estimatedValue: "$38,000", probability: "46%", expectedCloseDate: "2026-09-01", assignedTo: "Amit Batra", status: "Review" },
  { id: "OPP-1004", opportunityName: "Eastern Retail Activation", account: "Eastern Retail", stage: "New", estimatedValue: "$26,400", probability: "24%", expectedCloseDate: "2026-09-18", assignedTo: "Pooja Sen", status: "Open" },
];
