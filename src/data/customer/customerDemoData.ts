import { Award, BadgeCheck, HeartHandshake, QrCode, ShieldCheck, ShoppingBag, Smile, UserCheck, Users, WalletCards } from "lucide-react";

export type CustomerStatus = "Active" | "Inactive" | "At Risk" | "New";

export type CustomerRecord = {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  occupation: string;
  preferredLanguage: string;
  preferredChannel: string;
  status: CustomerStatus;
  kycStatus: string;
  registrationSource: string;
  customerTier: string;
  lifetimeValue: string;
  walletBalance: string;
  rewardsEarned: string;
  warrantyRegistrations: string;
};

export const customerKpis = [
  { id: "total", label: "Total Customers", value: "3.4M", target: "Global base", progress: 86, icon: Users },
  { id: "new", label: "New Customers", value: "48.2K", target: "This month", progress: 72, icon: UserCheck },
  { id: "active", label: "Active Customers", value: "2.8M", target: "82% active", progress: 82, icon: BadgeCheck },
  { id: "inactive", label: "Inactive Customers", value: "612K", target: "Win-back pool", progress: 38, icon: Users },
  { id: "repeat", label: "Repeat Customers", value: "1.1M", target: "+9% QoQ", progress: 64, icon: ShoppingBag },
  { id: "qr", label: "QR Activations", value: "18.6M", target: "Verified scans", progress: 78, icon: QrCode },
  { id: "wallet", label: "Wallet Balance", value: "82.4M pts", target: "Liability", progress: 67, icon: WalletCards },
  { id: "earned", label: "Rewards Earned", value: "12.8M", target: "Reward points", progress: 74, icon: Award },
  { id: "redeemed", label: "Rewards Redeemed", value: "4.2M", target: "Redemptions", progress: 58, icon: Award },
  { id: "warranty", label: "Warranty Registrations", value: "184K", target: "Active products", progress: 61, icon: ShieldCheck },
  { id: "referrals", label: "Referrals", value: "92K", target: "Referral funnel", progress: 54, icon: HeartHandshake },
  { id: "satisfaction", label: "Customer Satisfaction", value: "92.4%", target: "CSAT", progress: 92, icon: Smile },
];

export const customers: CustomerRecord[] = [
  { id: "CUS-1001", customerId: "CUST-W-1001", firstName: "Aarav", lastName: "Sharma", mobile: "+91 98765 91001", email: "aarav.sharma@customer.demo", gender: "Male", dob: "1988-03-14", address: "Baner Road", city: "Pune", state: "Maharashtra", country: "India", pinCode: "411045", occupation: "Contractor", preferredLanguage: "English", preferredChannel: "WhatsApp", status: "Active", kycStatus: "Verified", registrationSource: "QR Scan", customerTier: "Platinum", lifetimeValue: "$8,420", walletBalance: "18,400 pts", rewardsEarned: "42,800 pts", warrantyRegistrations: "6" },
  { id: "CUS-1002", customerId: "CUST-W-1002", firstName: "Nisha", lastName: "Kapoor", mobile: "+91 98765 91002", email: "nisha.kapoor@customer.demo", gender: "Female", dob: "1992-08-21", address: "Powai", city: "Mumbai", state: "Maharashtra", country: "India", pinCode: "400076", occupation: "Home Owner", preferredLanguage: "Hindi", preferredChannel: "Push", status: "Active", kycStatus: "Verified", registrationSource: "Consumer App", customerTier: "Gold", lifetimeValue: "$3,180", walletBalance: "9,640 pts", rewardsEarned: "18,200 pts", warrantyRegistrations: "2" },
  { id: "CUS-1003", customerId: "CUST-S-1003", firstName: "Urban", lastName: "Build Co.", mobile: "+91 98765 91003", email: "ops@urbanbuild.demo", gender: "Business", dob: "2014-01-10", address: "OMR Trade Lane", city: "Chennai", state: "Tamil Nadu", country: "India", pinCode: "600097", occupation: "Builder", preferredLanguage: "English", preferredChannel: "Email", status: "At Risk", kycStatus: "Verified", registrationSource: "Dealer Upload", customerTier: "Platinum", lifetimeValue: "$24,600", walletBalance: "42,800 pts", rewardsEarned: "86,400 pts", warrantyRegistrations: "11" },
  { id: "CUS-1004", customerId: "CUST-N-1004", firstName: "Riya", lastName: "Batra", mobile: "+91 98765 91004", email: "riya.batra@customer.demo", gender: "Female", dob: "1990-11-02", address: "Karol Bagh", city: "Delhi", state: "Delhi", country: "India", pinCode: "110005", occupation: "Interior Designer", preferredLanguage: "Hindi", preferredChannel: "SMS", status: "New", kycStatus: "Pending", registrationSource: "Referral", customerTier: "Silver", lifetimeValue: "$1,920", walletBalance: "4,100 pts", rewardsEarned: "7,800 pts", warrantyRegistrations: "1" },
];

export const customerTabs = ["Overview", "Purchase History", "QR Scans", "Wallet", "Rewards", "Campaigns", "Warranty", "Projects", "Referrals", "Support", "Analytics", "History", "Audit Log"];

export const customerTrendData = [
  { month: "Jan", growth: 24, acquisition: 18, repeat: 9, wallet: 12, referrals: 4, warranty: 7, cities: 11 },
  { month: "Feb", growth: 30, acquisition: 22, repeat: 12, wallet: 16, referrals: 6, warranty: 9, cities: 14 },
  { month: "Mar", growth: 38, acquisition: 27, repeat: 16, wallet: 21, referrals: 8, warranty: 12, cities: 17 },
  { month: "Apr", growth: 46, acquisition: 32, repeat: 21, wallet: 27, referrals: 11, warranty: 15, cities: 20 },
  { month: "May", growth: 55, acquisition: 38, repeat: 26, wallet: 34, referrals: 14, warranty: 19, cities: 24 },
  { month: "Jun", growth: 64, acquisition: 45, repeat: 31, wallet: 42, referrals: 18, warranty: 23, cities: 29 },
];

export const customerInsights = [
  "QR activation customers are 2.4x more likely to register warranty within seven days.",
  "Pune and Mumbai show the strongest wallet redemption velocity this month.",
  "At-risk high LTV customers should receive warranty education and reward nudges.",
  "Referral conversion is highest for customers who redeemed cashback in the last 30 days.",
  "Premium product buyers respond best to WhatsApp campaigns with warranty reminders.",
];
