import { AlertTriangle, BadgePercent, CreditCard, HandCoins, MapPinned, PackageSearch, RotateCcw, ShoppingCart, Truck, WalletCards } from "lucide-react";

export type DistributorStatus = "Active" | "Pending Approval" | "On Hold" | "Inactive";

export type DistributorRecord = {
  id: string;
  distributorName: string;
  distributorCode: string;
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
  assignedSalesExecutive: string;
  creditLimit: string;
  paymentTerms: string;
  bankDetails: string;
  status: DistributorStatus;
  monthlyRevenue: string;
  outstandingAmount: string;
  walletBalance: string;
};

export const distributorKpis = [
  { id: "total", label: "Total Distributors", value: 248, target: "18 territories", progress: 86, icon: Truck },
  { id: "active", label: "Active Distributors", value: 214, target: "86% active", progress: 86, icon: MapPinned },
  { id: "pending", label: "Pending Approval", value: 17, target: "KYC queue", progress: 34, icon: AlertTriangle },
  { id: "coverage", label: "Territory Coverage", value: "92%", target: "India network", progress: 92, icon: MapPinned },
  { id: "orders", label: "Monthly Orders", value: "12.8K", target: "+14% MoM", progress: 73, icon: ShoppingCart },
  { id: "revenue", label: "Monthly Revenue", value: "$8.4M", target: "Distributor sales", progress: 78, icon: HandCoins },
  { id: "outstanding", label: "Outstanding Amount", value: "$1.8M", target: "Credit exposure", progress: 48, icon: CreditCard },
  { id: "wallet", label: "Wallet Balance", value: "618K pts", target: "Reward liability", progress: 61, icon: WalletCards },
  { id: "scheme", label: "Scheme Earnings", value: "$284K", target: "Active schemes", progress: 66, icon: BadgePercent },
  { id: "collections", label: "Pending Collections", value: "$420K", target: "Due this week", progress: 42, icon: CreditCard },
  { id: "returns", label: "Return Requests", value: 84, target: "Open RMAs", progress: 28, icon: RotateCcw },
  { id: "low-stock", label: "Low Stock Alerts", value: 132, target: "Priority SKUs", progress: 39, icon: PackageSearch },
];

export const distributors: DistributorRecord[] = [
  {
    id: "DST-1001",
    distributorName: "Apex Industrial Supply",
    distributorCode: "DST-WEST-001",
    companyName: "Apex Industrial Supply Pvt Ltd",
    gstNumber: "27AAXCA1842K1Z8",
    panNumber: "AAXCA1842K",
    contactPerson: "Nisha Kapoor",
    mobile: "+91 98765 31001",
    email: "nisha@apex.demo",
    address: "Plot 18, Western Logistics Park",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pinCode: "400701",
    territory: "West",
    assignedSalesExecutive: "Meera Shah",
    creditLimit: "$1.2M",
    paymentTerms: "Net 30",
    bankDetails: "HDFC Bank / ****4821",
    status: "Active",
    monthlyRevenue: "$1.84M",
    outstandingAmount: "$184K",
    walletBalance: "284,000 pts",
  },
  {
    id: "DST-1002",
    distributorName: "Northline Distribution",
    distributorCode: "DST-NORTH-002",
    companyName: "Northline Distribution LLP",
    gstNumber: "07AANFN4102M1Z5",
    panNumber: "AANFN4102M",
    contactPerson: "Amit Batra",
    mobile: "+91 98765 31002",
    email: "amit@northline.demo",
    address: "NH8 Channel Yard",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    pinCode: "110037",
    territory: "North",
    assignedSalesExecutive: "Ravi Sinha",
    creditLimit: "$860K",
    paymentTerms: "Net 21",
    bankDetails: "ICICI Bank / ****2104",
    status: "Active",
    monthlyRevenue: "$1.12M",
    outstandingAmount: "$96K",
    walletBalance: "142,500 pts",
  },
  {
    id: "DST-1003",
    distributorName: "Southern Trade Network",
    distributorCode: "DST-SOUTH-003",
    companyName: "Southern Trade Network Pvt Ltd",
    gstNumber: "33AASCS7710L1ZD",
    panNumber: "AASCS7710L",
    contactPerson: "Vikram Iyer",
    mobile: "+91 98765 31003",
    email: "vikram@southerntrade.demo",
    address: "SIPCOT Trade Complex",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pinCode: "600119",
    territory: "South",
    assignedSalesExecutive: "Anika Rao",
    creditLimit: "$520K",
    paymentTerms: "Net 15",
    bankDetails: "Axis Bank / ****7842",
    status: "Pending Approval",
    monthlyRevenue: "$740K",
    outstandingAmount: "$218K",
    walletBalance: "88,200 pts",
  },
  {
    id: "DST-1004",
    distributorName: "Eastern Channel Co.",
    distributorCode: "DST-EAST-004",
    companyName: "Eastern Channel Company",
    gstNumber: "19AAECE4102F1Z2",
    panNumber: "AAECE4102F",
    contactPerson: "Pooja Sen",
    mobile: "+91 98765 31004",
    email: "pooja@easternchannel.demo",
    address: "Sector V Supply Hub",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    pinCode: "700091",
    territory: "East",
    assignedSalesExecutive: "Dev Patel",
    creditLimit: "$740K",
    paymentTerms: "Net 30",
    bankDetails: "SBI / ****1184",
    status: "On Hold",
    monthlyRevenue: "$620K",
    outstandingAmount: "$312K",
    walletBalance: "103,800 pts",
  },
];

export const distributorTabs = ["Overview", "Dealers", "Orders", "Inventory", "Payments", "Wallet", "Rewards", "Schemes", "Returns", "Analytics", "Documents", "History", "Audit Log"];

export const distributorTrendData = [
  { month: "Jan", sales: 1.8, orders: 1.2, collections: 1.1, schemes: 0.2, inventory: 72 },
  { month: "Feb", sales: 2.2, orders: 1.5, collections: 1.4, schemes: 0.25, inventory: 76 },
  { month: "Mar", sales: 2.8, orders: 1.9, collections: 1.8, schemes: 0.31, inventory: 81 },
  { month: "Apr", sales: 3.1, orders: 2.2, collections: 2.0, schemes: 0.42, inventory: 79 },
  { month: "May", sales: 3.7, orders: 2.7, collections: 2.5, schemes: 0.52, inventory: 84 },
  { month: "Jun", sales: 4.2, orders: 3.1, collections: 2.9, schemes: 0.61, inventory: 78 },
];

export const distributorWidgets = {
  insights: [
    "Apex Industrial Supply can exceed quarterly target by 12% if dealer activation remains above 70%.",
    "Southern Trade Network has elevated credit exposure; route collections before approving large orders.",
    "Eastern territory return rate is 2.1x network median; review SKU quality and installation training.",
  ],
  lowStock: ["LAM-PRM-8X4 in South", "KIT-CON-12 in East", "PNT-SQR-10L in North"],
};
