export type DistributorDealerRecord = {
  id: string;
  dealerName: string;
  dealerCode: string;
  contactPerson: string;
  mobile: string;
  email: string;
  territory: string;
  creditLimit: string;
  status: "Active" | "Review" | "On Hold";
  assignedDistributor: string;
};

export const distributorDealers: DistributorDealerRecord[] = [
  { id: "DDLR-001", dealerName: "Metro Build Mart", dealerCode: "DLR-W-001", contactPerson: "Arjun Mehta", mobile: "+91 98765 41001", email: "arjun@metrobuild.demo", territory: "West", creditLimit: "$120K", status: "Active", assignedDistributor: "Apex Industrial Supply" },
  { id: "DDLR-002", dealerName: "Prime Hardware Hub", dealerCode: "DLR-N-002", contactPerson: "Sonia Batra", mobile: "+91 98765 41002", email: "sonia@primehardware.demo", territory: "North", creditLimit: "$96K", status: "Active", assignedDistributor: "Northline Distribution" },
  { id: "DDLR-003", dealerName: "Southern Contractor Store", dealerCode: "DLR-S-003", contactPerson: "Kannan R", mobile: "+91 98765 41003", email: "kannan@southernstore.demo", territory: "South", creditLimit: "$72K", status: "Review", assignedDistributor: "Southern Trade Network" },
  { id: "DDLR-004", dealerName: "Eastern Pro Dealer", dealerCode: "DLR-E-004", contactPerson: "Riya Sen", mobile: "+91 98765 41004", email: "riya@easternpro.demo", territory: "East", creditLimit: "$84K", status: "On Hold", assignedDistributor: "Eastern Channel Co." },
];
