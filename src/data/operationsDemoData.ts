export type OperationType = "orders" | "dispatch" | "finance" | "fieldSales" | "warrantyService" | "customers";

export type OperationKpi = {
  label: string;
  value: string;
  change: string;
  tone: "cyan" | "emerald" | "violet" | "amber" | "rose";
};

export type OperationRow = {
  id: string;
  name: string;
  owner: string;
  location: string;
  category: string;
  value: string;
  status: string;
};

export const operationsDemoData: Record<OperationType, { title: string; description: string; kpis: OperationKpi[]; filters: string[]; rows: OperationRow[] }> = {
  orders: {
    title: "Orders",
    description: "Track manufacturer, distributor, dealer, retailer, and project orders across the network.",
    filters: ["All Orders", "Pending Approval", "Packed", "Dispatched", "Delivered"],
    kpis: [
      { label: "Open Orders", value: "1,284", change: "+142 this week", tone: "cyan" },
      { label: "Order Value", value: "$12.8M", change: "+8.4% MoM", tone: "emerald" },
      { label: "Pending Approval", value: "186", change: "42 urgent", tone: "amber" },
      { label: "Delivered", value: "92%", change: "SLA adherence", tone: "violet" },
    ],
    rows: [
      { id: "ORD-1001", name: "Eco Motor X2 bulk order", owner: "Prakash Dealer Hub", location: "Delhi NCR", category: "Dealer Order", value: "$84K", status: "Packed" },
      { id: "ORD-1002", name: "Premium fittings replenishment", owner: "BuildRight Retail", location: "Bengaluru", category: "Retail Order", value: "$32K", status: "Delivered" },
      { id: "ORD-1003", name: "Distributor quarterly stock", owner: "Metro Distribution Co.", location: "Mumbai", category: "Distributor Order", value: "$420K", status: "Pending Approval" },
    ],
  },
  dispatch: {
    title: "Dispatch",
    description: "Monitor dispatch planning, loading, route readiness, delivery status, and exceptions.",
    filters: ["All Dispatches", "Ready", "In Transit", "Delayed", "Delivered"],
    kpis: [
      { label: "Dispatches", value: "842", change: "128 today", tone: "cyan" },
      { label: "In Transit", value: "312", change: "Across 28 routes", tone: "violet" },
      { label: "Delayed", value: "24", change: "-6 vs yesterday", tone: "amber" },
      { label: "Delivered SLA", value: "94%", change: "+3.2%", tone: "emerald" },
    ],
    rows: [
      { id: "DSP-501", name: "North dealer route", owner: "Fleet Ops", location: "Delhi NCR", category: "Dealer Dispatch", value: "18 stops", status: "In Transit" },
      { id: "DSP-502", name: "Retail replenishment run", owner: "Warehouse Ops", location: "Bengaluru", category: "Retail Dispatch", value: "42 cartons", status: "Ready" },
      { id: "DSP-503", name: "Distributor transfer", owner: "Supply Chain", location: "Pune to Goa", category: "Inter-warehouse", value: "12 pallets", status: "Delayed" },
    ],
  },
  finance: {
    title: "Finance",
    description: "Review receivables, invoices, collections, payouts, GST-ready summaries, and settlement signals.",
    filters: ["All Finance", "Invoices", "Collections", "Payouts", "Overdue"],
    kpis: [
      { label: "Revenue", value: "$48.6M", change: "+18.4% YoY", tone: "emerald" },
      { label: "Receivables", value: "$4.2M", change: "84% current", tone: "cyan" },
      { label: "Overdue", value: "$680K", change: "31 accounts", tone: "rose" },
      { label: "Payouts", value: "$920K", change: "Pending settlement", tone: "amber" },
    ],
    rows: [
      { id: "FIN-3001", name: "Dealer invoice batch", owner: "Finance Ops", location: "India", category: "Invoice", value: "$420K", status: "Pending" },
      { id: "FIN-3002", name: "Retailer collection run", owner: "Collections", location: "South India", category: "Collections", value: "$184K", status: "Completed" },
      { id: "FIN-3003", name: "Reward payout settlement", owner: "Loyalty Finance", location: "Global", category: "Payout", value: "$92K", status: "Review" },
    ],
  },
  fieldSales: {
    title: "Field Sales",
    description: "Coordinate sales representatives, visits, leads, follow-ups, beat plans, and territory performance.",
    filters: ["All Reps", "Visits Today", "Follow-ups", "High Value Leads", "Missed Visits"],
    kpis: [
      { label: "Active Reps", value: "1,420", change: "+82 onboarded", tone: "cyan" },
      { label: "Visits Today", value: "8,940", change: "91% completed", tone: "emerald" },
      { label: "Leads Created", value: "2,184", change: "+18% WoW", tone: "violet" },
      { label: "Missed Visits", value: "148", change: "Needs review", tone: "amber" },
    ],
    rows: [
      { id: "FS-901", name: "North dealer beat", owner: "Anika Rao", location: "Delhi NCR", category: "Dealer Visit", value: "42 visits", status: "Active" },
      { id: "FS-902", name: "Retail onboarding drive", owner: "Kabir Mehta", location: "Mumbai", category: "Retail Leads", value: "84 leads", status: "Active" },
      { id: "FS-903", name: "Contractor project follow-up", owner: "Sara Khan", location: "Hyderabad", category: "Project Sales", value: "$240K pipeline", status: "Follow-up" },
    ],
  },
  warrantyService: {
    title: "Warranty Service",
    description: "Track warranty registrations, claims, service tickets, SLA health, technician queues, and product risk.",
    filters: ["All Claims", "Registered", "In Service", "Escalated", "Closed"],
    kpis: [
      { label: "Registered Products", value: "682K", change: "+24K this month", tone: "emerald" },
      { label: "Open Claims", value: "4,820", change: "312 urgent", tone: "amber" },
      { label: "SLA Health", value: "89%", change: "-2.1% WoW", tone: "violet" },
      { label: "Escalations", value: "128", change: "Quality review", tone: "rose" },
    ],
    rows: [
      { id: "WAR-7001", name: "Smart pump warranty claim", owner: "Aarav Sharma", location: "Pune", category: "Claim", value: "2 days open", status: "In Service" },
      { id: "WAR-7002", name: "Valve kit registration", owner: "BuildRight Retail", location: "Bengaluru", category: "Registration", value: "QR verified", status: "Registered" },
      { id: "WAR-7003", name: "Filter failure escalation", owner: "Quality Team", location: "Delhi NCR", category: "Escalation", value: "Batch review", status: "Escalated" },
    ],
  },
  customers: {
    title: "Customers",
    description: "Monitor customer registrations, QR scans, loyalty activity, warranty, support, and lifetime value.",
    filters: ["All Customers", "New", "Active", "High Value", "Support Open"],
    kpis: [
      { label: "Customers", value: "3.8M", change: "+128K this quarter", tone: "cyan" },
      { label: "QR Registered", value: "1.9M", change: "41% scan conversion", tone: "emerald" },
      { label: "Wallet Balance", value: "$4.9M", change: "Outstanding liability", tone: "violet" },
      { label: "Support Open", value: "8,420", change: "92% SLA", tone: "amber" },
    ],
    rows: [
      { id: "CUS-1001", name: "Aarav Sharma", owner: "Customer 360", location: "Pune", category: "Gold Customer", value: "$428 wallet", status: "Active" },
      { id: "CUS-1002", name: "Neha Iyer", owner: "Warranty Journey", location: "Bengaluru", category: "Warranty", value: "3 products", status: "New" },
      { id: "CUS-1003", name: "Omar Al Farsi", owner: "Support Team", location: "Dubai", category: "High Value", value: "$2.8K LTV", status: "Support Open" },
    ],
  },
};
