import { BadgeCheck, ClipboardList, PackageCheck, ReceiptText, RotateCcw, ShieldCheck, Store, Ticket, Users, WalletCards } from "lucide-react";

export type RetailerStatus = "Active" | "Pending Approval" | "On Hold" | "Inactive";

export type RetailerRecord = {
  id: string;
  retailerName: string;
  retailerCode: string;
  storeName: string;
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
  assignedDealer: string;
  assignedDistributor: string;
  assignedSalesExecutive: string;
  storeType: string;
  businessCategory: string;
  creditLimit: string;
  paymentTerms: string;
  bankDetails: string;
  status: RetailerStatus;
  monthlySales: string;
  walletBalance: string;
  customers: string;
};

export const retailerKpis = [
  { id: "total", label: "Total Retailers", value: 3240, target: "All territories", progress: 84, icon: Store },
  { id: "active", label: "Active Retailers", value: 2864, target: "88% active", progress: 88, icon: BadgeCheck },
  { id: "pending", label: "Pending Approval", value: 96, target: "KYC queue", progress: 32, icon: Store },
  { id: "sales", label: "Monthly Sales", value: "$2.7M", target: "+12% MoM", progress: 72, icon: ReceiptText },
  { id: "orders", label: "Monthly Orders", value: "5.8K", target: "Retail orders", progress: 68, icon: ClipboardList },
  { id: "wallet", label: "Wallet Balance", value: "386K pts", target: "Retailer pool", progress: 59, icon: WalletCards },
  { id: "rewards", label: "Reward Points", value: "1.2M", target: "Earned points", progress: 64, icon: BadgeCheck },
  { id: "consumer", label: "Consumer Registrations Assisted", value: "18.4K", target: "This month", progress: 70, icon: Users },
  { id: "verification", label: "Product Verifications", value: "42.8K", target: "Retail scans", progress: 78, icon: PackageCheck },
  { id: "warranty", label: "Warranty Registrations", value: "9.6K", target: "Assisted", progress: 61, icon: ShieldCheck },
  { id: "returns", label: "Pending Returns", value: 128, target: "Open cases", progress: 34, icon: RotateCcw },
  { id: "support", label: "Support Tickets", value: 214, target: "Open tickets", progress: 36, icon: Ticket },
];

export const retailers: RetailerRecord[] = [
  { id: "RTL-1001", retailerName: "Urban Paint Point", retailerCode: "RTL-W-001", storeName: "Urban Paint Point Andheri", gstNumber: "27AAUFU1842K1Z4", panNumber: "AAUFU1842K", contactPerson: "Aarav Shah", mobile: "+91 98765 71001", email: "aarav@urbanpaint.demo", address: "Andheri Link Road", city: "Mumbai", state: "Maharashtra", country: "India", pinCode: "400053", territory: "West", assignedDealer: "Metro Build Mart", assignedDistributor: "Apex Industrial Supply", assignedSalesExecutive: "Nisha Kapoor", storeType: "Flagship", businessCategory: "Paints and Adhesives", creditLimit: "$42K", paymentTerms: "Net 15", bankDetails: "HDFC / ****7101", status: "Active", monthlySales: "$184K", walletBalance: "84,200 pts", customers: "4,820" },
  { id: "RTL-1002", retailerName: "Prime Hardware Retail", retailerCode: "RTL-N-002", storeName: "Prime Hardware Retail Karol Bagh", gstNumber: "07AAPFP4201L1Z8", panNumber: "AAPFP4201L", contactPerson: "Sonia Batra", mobile: "+91 98765 71002", email: "sonia@primeretail.demo", address: "Karol Bagh Market", city: "Delhi", state: "Delhi", country: "India", pinCode: "110005", territory: "North", assignedDealer: "Prime Hardware Hub", assignedDistributor: "Northline Distribution", assignedSalesExecutive: "Amit Batra", storeType: "Store", businessCategory: "Hardware", creditLimit: "$36K", paymentTerms: "Net 10", bankDetails: "ICICI / ****7102", status: "Active", monthlySales: "$96K", walletBalance: "46,400 pts", customers: "3,912" },
  { id: "RTL-1003", retailerName: "South Contractor Counter", retailerCode: "RTL-S-003", storeName: "South Contractor Counter OMR", gstNumber: "33AASFS7290M1Z3", panNumber: "AASFS7290M", contactPerson: "Kannan R", mobile: "+91 98765 71003", email: "kannan@southcounter.demo", address: "OMR Trade Lane", city: "Chennai", state: "Tamil Nadu", country: "India", pinCode: "600097", territory: "South", assignedDealer: "Southern Contractor Store", assignedDistributor: "Southern Trade Network", assignedSalesExecutive: "Vikram Iyer", storeType: "Counter", businessCategory: "Contractor Supplies", creditLimit: "$28K", paymentTerms: "Net 7", bankDetails: "Axis / ****7103", status: "Pending Approval", monthlySales: "$48K", walletBalance: "28,000 pts", customers: "2,184" },
  { id: "RTL-1004", retailerName: "East Home Supply", retailerCode: "RTL-E-004", storeName: "East Home Supply Salt Lake", gstNumber: "19AAEFE4102F1Z9", panNumber: "AAEFE4102F", contactPerson: "Riya Sen", mobile: "+91 98765 71004", email: "riya@easthome.demo", address: "Salt Lake Supply Plaza", city: "Kolkata", state: "West Bengal", country: "India", pinCode: "700091", territory: "East", assignedDealer: "Eastern Pro Dealer", assignedDistributor: "Eastern Channel Co.", assignedSalesExecutive: "Pooja Sen", storeType: "Store", businessCategory: "Home Improvement", creditLimit: "$32K", paymentTerms: "Net 15", bankDetails: "SBI / ****7104", status: "On Hold", monthlySales: "$64K", walletBalance: "34,800 pts", customers: "2,616" },
];

export const retailerTabs = ["Overview", "Sales", "Orders", "Inventory", "Customers", "Wallet", "Rewards", "Warranty Assistance", "Product Verification", "Offers", "Returns", "Analytics", "Documents", "History", "Audit Log"];

export const retailerTrendData = [
  { month: "Jan", sales: 0.8, orders: 0.6, registrations: 1.4, verification: 2.1, wallet: 0.4, rewards: 0.3 },
  { month: "Feb", sales: 1.1, orders: 0.8, registrations: 1.8, verification: 2.7, wallet: 0.6, rewards: 0.4 },
  { month: "Mar", sales: 1.4, orders: 1.1, registrations: 2.2, verification: 3.4, wallet: 0.8, rewards: 0.7 },
  { month: "Apr", sales: 1.8, orders: 1.4, registrations: 2.8, verification: 4.1, wallet: 1.0, rewards: 0.9 },
  { month: "May", sales: 2.2, orders: 1.8, registrations: 3.4, verification: 4.9, wallet: 1.4, rewards: 1.1 },
  { month: "Jun", sales: 2.7, orders: 2.1, registrations: 4.2, verification: 5.8, wallet: 1.8, rewards: 1.5 },
];

export const retailerInsights = [
  "Urban Paint Point is converting offers 18% above the regional average.",
  "Prime Hardware Retail has high wallet engagement but warranty completion can improve.",
  "South Contractor Counter should prioritize assisted registrations for repeat contractors.",
  "East Home Supply return rate is elevated; review product mix and installation guidance.",
];
