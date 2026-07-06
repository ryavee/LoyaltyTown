export const companySubscriptions = [
  { id: "CSUB-1001", company: "Apex Industrial Coatings", plan: "Enterprise", renewal: "2026-09-01", invoices: "12 paid", usage: "82%", action: "Renewal", status: "Active" },
  { id: "CSUB-1002", company: "ColorMax Coatings", plan: "Growth", renewal: "2026-08-18", invoices: "2 pending", usage: "61%", action: "Upgrade", status: "Trial" },
  { id: "CSUB-1003", company: "TileBond Systems", plan: "Professional", renewal: "2026-10-12", invoices: "8 paid", usage: "74%", action: "Downgrade available", status: "Active" },
];

export const subscriptionPlans = [
  { id: "PLAN-1", plan: "Starter", qrLimit: "100K / mo", storage: "1TB", api: "2M calls", support: "Standard", status: "Active" },
  { id: "PLAN-2", plan: "Growth", qrLimit: "1M / mo", storage: "8TB", api: "12M calls", support: "Priority", status: "Active" },
  { id: "PLAN-3", plan: "Professional", qrLimit: "10M / mo", storage: "32TB", api: "48M calls", support: "Priority+", status: "Active" },
  { id: "PLAN-4", plan: "Enterprise", qrLimit: "Custom", storage: "Custom", api: "Custom", support: "SLA", status: "Active" },
];
