export type LeadRecord = {
  id: string;
  leadName: string;
  company: string;
  industry: string;
  mobile: string;
  email: string;
  source: string;
  status: string;
  assignedTo: string;
  estimatedValue: string;
  followupDate: string;
};

export const leads: LeadRecord[] = [
  { id: "LED-1001", leadName: "Apex Build Channel", company: "Apex Build Co.", industry: "Construction Materials", mobile: "+91 98765 61001", email: "growth@apexbuild.demo", source: "Dealer Referral", status: "Qualified", assignedTo: "Nisha Kapoor", estimatedValue: "$42,000", followupDate: "2026-07-08" },
  { id: "LED-1002", leadName: "Metro Contractor Group", company: "Metro Works", industry: "Contractor Network", mobile: "+91 98765 61002", email: "ops@metroworks.demo", source: "QR Campaign", status: "New", assignedTo: "Amit Batra", estimatedValue: "$18,500", followupDate: "2026-07-09" },
  { id: "LED-1003", leadName: "Eastern Retail Chain", company: "Eastern Retail", industry: "Retail", mobile: "+91 98765 61003", email: "buyers@easternretail.demo", source: "Landing Page", status: "Nurture", assignedTo: "Pooja Sen", estimatedValue: "$26,400", followupDate: "2026-07-11" },
  { id: "LED-1004", leadName: "Prime Dealer Expansion", company: "Prime Hardware", industry: "Dealer", mobile: "+91 98765 61004", email: "principal@primehardware.demo", source: "Field Visit", status: "Proposal", assignedTo: "Rahul Mehta", estimatedValue: "$64,200", followupDate: "2026-07-12" },
];
