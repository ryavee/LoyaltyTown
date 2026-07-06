export const cashbackRules = [
  { id: "CBR-3001", rule: "Dealer Festival Cashback", audience: "Dealers", value: "3%", cap: "$42K", schedule: "Weekly", status: "Live" },
  { id: "CBR-3002", rule: "Retail QR Cashback", audience: "Retailers", value: "2%", cap: "$18K", schedule: "Monthly", status: "Scheduled" },
  { id: "CBR-3003", rule: "Contractor Project Cashback", audience: "Contractors", value: "5%", cap: "$24K", schedule: "Claim based", status: "Draft" },
];

export const cashbackPayouts = [
  { id: "CBP-1001", owner: "Metro Build Mart", ownerType: "Dealer", amount: "$4,820", payout: "Pending", reconciliation: "Matched", status: "Pending" },
  { id: "CBP-1002", owner: "Urban Paint Point", ownerType: "Retailer", amount: "$1,840", payout: "Paid", reconciliation: "Matched", status: "Paid" },
  { id: "CBP-1003", owner: "Aarav Contractors", ownerType: "Contractor", amount: "$920", payout: "Failed", reconciliation: "Review", status: "Failed" },
];
