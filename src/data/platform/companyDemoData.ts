export const companies = [
  { id: "CMP-1001", company: "Apex Industrial Coatings", plan: "Enterprise", region: "India West", owner: "Customer Success", revenue: "₹8.2Cr", qr: "420M", status: "Active" },
  { id: "CMP-1002", company: "ColorMax Coatings", plan: "Growth", region: "India West", owner: "Platform Ops", revenue: "₹2.1Cr", qr: "180M", status: "Trial" },
  { id: "CMP-1003", company: "TileBond Systems", plan: "Professional", region: "India South", owner: "Customer Success", revenue: "₹4.8Cr", qr: "310M", status: "Active" },
  { id: "CMP-1004", company: "FixMate Industries", plan: "Starter", region: "India North", owner: "Finance Ops", revenue: "₹72L", qr: "76M", status: "Suspended" },
];

export const globalUsers = [
  { id: "GUSR-1", user: "Nisha Kapoor", scope: "Tenant Admin", company: "Apex Industrial Coatings", loginHistory: "12 logins", sessions: "2 active", status: "Active" },
  { id: "GUSR-2", user: "Rahul Mehta", scope: "Platform Support", company: "LoyaltyTown", loginHistory: "48 logins", sessions: "1 active", status: "Active" },
  { id: "GUSR-3", user: "Pooja Sen", scope: "Billing Admin", company: "ColorMax Coatings", loginHistory: "Blocked", sessions: "0 active", status: "Blocked" },
];

export const platformBilling = [
  { id: "PBIL-1", invoice: "PLT-INV-1001", company: "Apex Industrial Coatings", subscription: "Enterprise", revenue: "₹8.2Cr", renewal: "2026-09-01", payment: "Paid", status: "Active" },
  { id: "PBIL-2", invoice: "PLT-INV-1002", company: "ColorMax Coatings", subscription: "Growth", revenue: "₹2.1Cr", renewal: "2026-08-18", payment: "Failed", status: "Review" },
  { id: "PBIL-3", invoice: "PLT-INV-1003", company: "TileBond Systems", subscription: "Professional", revenue: "₹4.8Cr", renewal: "2026-10-12", payment: "Paid", status: "Active" },
];
