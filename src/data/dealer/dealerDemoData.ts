import { AlertTriangle, BadgeCheck, ClipboardList, CreditCard, PackageSearch, ShieldCheck, Store, Target, Ticket, WalletCards } from "lucide-react";

export type DealerStatus = "Active" | "Pending Approval" | "On Hold" | "Inactive";

export type DealerRecord = {
  id: string;
  dealerName: string;
  dealerCode: string;
  companyName: string;
  gstNumber: string;
  panNumber: string;
  contactPerson: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  territory: string;
  assignedDistributor: string;
  assignedSalesExecutive: string;
  creditLimit: string;
  paymentTerms: string;
  bankDetails: string;
  status: DealerStatus;
  monthlySales: string;
  walletBalance: string;
  targetAchievement: string;
};

export const dealerKpis = [
  { id: "total", label: "Total Dealers", value: 1840, target: "All territories", progress: 84, icon: Store },
  { id: "active", label: "Active Dealers", value: 1592, target: "86% active", progress: 86, icon: BadgeCheck },
  { id: "pending", label: "Pending Approval", value: 64, target: "KYC queue", progress: 32, icon: AlertTriangle },
  { id: "sales", label: "Monthly Sales", value: "$4.8M", target: "+18% MoM", progress: 78, icon: CreditCard },
  { id: "orders", label: "Monthly Orders", value: "8.2K", target: "Dealer orders", progress: 72, icon: ClipboardList },
  { id: "wallet", label: "Wallet Balance", value: "493K pts", target: "Dealer pool", progress: 61, icon: WalletCards },
  { id: "rewards", label: "Reward Points", value: "1.8M", target: "Earned points", progress: 69, icon: BadgeCheck },
  { id: "outstanding", label: "Outstanding Amount", value: "$612K", target: "Credit exposure", progress: 44, icon: CreditCard },
  { id: "target", label: "Target Achievement", value: "78%", target: "Quarter target", progress: 78, icon: Target },
  { id: "stock", label: "Low Stock Items", value: 218, target: "Priority SKUs", progress: 42, icon: PackageSearch },
  { id: "warranty", label: "Warranty Registrations", value: "12.4K", target: "This month", progress: 66, icon: ShieldCheck },
  { id: "support", label: "Support Tickets", value: 318, target: "Open tickets", progress: 36, icon: Ticket },
];

export const dealers: DealerRecord[] = [
  { id: "DLR-1001", dealerName: "Metro Build Mart", dealerCode: "DLR-W-001", companyName: "Metro Build Mart LLP", gstNumber: "27AAMFM1842K1Z7", panNumber: "AAMFM1842K", contactPerson: "Arjun Mehta", mobile: "+91 98765 51001", email: "arjun@metrobuild.demo", address: "Andheri Industrial Road", city: "Mumbai", state: "Maharashtra", country: "India", pinCode: "400093", territory: "West", assignedDistributor: "Apex Industrial Supply", assignedSalesExecutive: "Nisha Kapoor", creditLimit: "$120K", paymentTerms: "Net 21", bankDetails: "HDFC / ****2101", status: "Active", monthlySales: "$484K", walletBalance: "184,200 pts", targetAchievement: "94%" },
  { id: "DLR-1002", dealerName: "Prime Hardware Hub", dealerCode: "DLR-N-002", companyName: "Prime Hardware Hub Pvt Ltd", gstNumber: "07AAPFP4201L1Z8", panNumber: "AAPFP4201L", contactPerson: "Sonia Batra", mobile: "+91 98765 51002", email: "sonia@primehardware.demo", address: "Karol Bagh Trade Market", city: "Delhi", state: "Delhi", country: "India", pinCode: "110005", territory: "North", assignedDistributor: "Northline Distribution", assignedSalesExecutive: "Amit Batra", creditLimit: "$96K", paymentTerms: "Net 15", bankDetails: "ICICI / ****8820", status: "Active", monthlySales: "$392K", walletBalance: "96,400 pts", targetAchievement: "81%" },
  { id: "DLR-1003", dealerName: "Southern Contractor Store", dealerCode: "DLR-S-003", companyName: "Southern Contractor Store", gstNumber: "33AASFS7290M1Z3", panNumber: "AASFS7290M", contactPerson: "Kannan R", mobile: "+91 98765 51003", email: "kannan@southernstore.demo", address: "OMR Building Supply Lane", city: "Chennai", state: "Tamil Nadu", country: "India", pinCode: "600097", territory: "South", assignedDistributor: "Southern Trade Network", assignedSalesExecutive: "Vikram Iyer", creditLimit: "$72K", paymentTerms: "Net 15", bankDetails: "Axis / ****6604", status: "Pending Approval", monthlySales: "$218K", walletBalance: "48,000 pts", targetAchievement: "54%" },
  { id: "DLR-1004", dealerName: "Eastern Pro Dealer", dealerCode: "DLR-E-004", companyName: "Eastern Pro Dealer Co", gstNumber: "19AAEFE4102F1Z9", panNumber: "AAEFE4102F", contactPerson: "Riya Sen", mobile: "+91 98765 51004", email: "riya@easternpro.demo", address: "Salt Lake Supply Plaza", city: "Kolkata", state: "West Bengal", country: "India", pinCode: "700091", territory: "East", assignedDistributor: "Eastern Channel Co.", assignedSalesExecutive: "Pooja Sen", creditLimit: "$84K", paymentTerms: "Net 30", bankDetails: "SBI / ****5521", status: "On Hold", monthlySales: "$164K", walletBalance: "64,800 pts", targetAchievement: "42%" },
];

export const dealerTabs = ["Overview", "Inventory", "Orders", "Customers", "CRM", "Wallet", "Rewards", "Warranty", "Returns", "Projects", "Analytics", "Documents", "History", "Audit Log"];

export const dealerTrendData = [
  { month: "Jan", sales: 1.2, orders: 0.8, wallet: 0.4, rewards: 0.3, customers: 2.1, target: 58 },
  { month: "Feb", sales: 1.5, orders: 1.0, wallet: 0.6, rewards: 0.4, customers: 2.6, target: 62 },
  { month: "Mar", sales: 2.1, orders: 1.4, wallet: 0.8, rewards: 0.7, customers: 3.2, target: 70 },
  { month: "Apr", sales: 2.4, orders: 1.8, wallet: 1.0, rewards: 0.9, customers: 3.8, target: 74 },
  { month: "May", sales: 2.9, orders: 2.2, wallet: 1.4, rewards: 1.1, customers: 4.4, target: 78 },
  { month: "Jun", sales: 3.4, orders: 2.8, wallet: 1.8, rewards: 1.5, customers: 5.0, target: 82 },
];

export const dealerInsights = [
  "Metro Build Mart is on track to exceed quarterly target by 11% with current contractor project velocity.",
  "Southern Contractor Store needs replenishment within 3 days for LAM-PRM-8X4.",
  "Eastern warranty claim rate is increasing; review installation training and batch data.",
  "Reward redemption can be shifted from cashback to tier boosters for top dealers.",
];
