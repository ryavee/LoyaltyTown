import { Award, BadgeCheck, ClipboardList, GraduationCap, Hammer, ShieldCheck, Ticket, UserCheck, Users, WalletCards } from "lucide-react";

export type ContractorStatus = "Active" | "Pending Verification" | "On Hold" | "Inactive";

export type ContractorRecord = {
  id: string;
  contractorName: string;
  contractorCode: string;
  contractorType: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  specialization: string;
  experienceYears: string;
  licenseNumber: string;
  assignedDealer: string;
  assignedDistributor: string;
  assignedSalesExecutive: string;
  bankDetails: string;
  kycStatus: string;
  tierStatus: string;
  status: ContractorStatus;
  monthlyScans: string;
  walletBalance: string;
  projectsRegistered: string;
};

export const contractorKpis = [
  { id: "total", label: "Total Contractors", value: 8420, target: "All channels", progress: 86, icon: Users },
  { id: "active", label: "Active Contractors", value: 7168, target: "85% active", progress: 85, icon: BadgeCheck },
  { id: "pending", label: "Pending Verification", value: 284, target: "KYC queue", progress: 38, icon: UserCheck },
  { id: "scans", label: "Monthly Scans", value: "182K", target: "Scan-to-earn", progress: 76, icon: Hammer },
  { id: "points", label: "Reward Points", value: "3.8M", target: "Earned points", progress: 74, icon: Award },
  { id: "wallet", label: "Wallet Balance", value: "$428K", target: "Liability", progress: 62, icon: WalletCards },
  { id: "cashback", label: "Cashback Earned", value: "$94K", target: "+14% MoM", progress: 68, icon: WalletCards },
  { id: "projects", label: "Projects Registered", value: 1268, target: "This month", progress: 71, icon: ClipboardList },
  { id: "training", label: "Training Completed", value: 4820, target: "Certified skills", progress: 64, icon: GraduationCap },
  { id: "certificates", label: "Certificates Issued", value: 3316, target: "Valid", progress: 58, icon: ShieldCheck },
  { id: "referrals", label: "Referrals", value: 914, target: "Conversion funnel", progress: 52, icon: Users },
  { id: "tickets", label: "Support Tickets", value: 146, target: "Open tickets", progress: 31, icon: Ticket },
];

export const contractors: ContractorRecord[] = [
  { id: "CON-1001", contractorName: "Aman Verma", contractorCode: "CTR-W-001", contractorType: "Painter", mobile: "+91 98765 82001", email: "aman.verma@contractor.demo", address: "Andheri West", city: "Mumbai", state: "Maharashtra", country: "India", pinCode: "400053", specialization: "Exterior coatings", experienceYears: "12", licenseNumber: "MH-PNT-4501", assignedDealer: "Metro Build Mart", assignedDistributor: "Apex Industrial Supply", assignedSalesExecutive: "Nisha Kapoor", bankDetails: "HDFC / ****8201", kycStatus: "Verified", tierStatus: "Platinum", status: "Active", monthlyScans: "1,284", walletBalance: "$4,820", projectsRegistered: "38" },
  { id: "CON-1002", contractorName: "Sonia Fernandes", contractorCode: "CTR-W-002", contractorType: "Interior Designer", mobile: "+91 98765 82002", email: "sonia.fernandes@contractor.demo", address: "Bandra Reclamation", city: "Mumbai", state: "Maharashtra", country: "India", pinCode: "400050", specialization: "Premium interiors", experienceYears: "9", licenseNumber: "MH-INT-2932", assignedDealer: "Urban Paint Point", assignedDistributor: "Apex Industrial Supply", assignedSalesExecutive: "Rhea Shah", bankDetails: "ICICI / ****8202", kycStatus: "Verified", tierStatus: "Gold", status: "Active", monthlyScans: "946", walletBalance: "$3,240", projectsRegistered: "26" },
  { id: "CON-1003", contractorName: "R. Kannan", contractorCode: "CTR-S-003", contractorType: "Mason", mobile: "+91 98765 82003", email: "kannan.r@contractor.demo", address: "OMR Trade Lane", city: "Chennai", state: "Tamil Nadu", country: "India", pinCode: "600097", specialization: "Tile adhesives", experienceYears: "15", licenseNumber: "TN-MSN-7710", assignedDealer: "Southern Contractor Store", assignedDistributor: "Southern Trade Network", assignedSalesExecutive: "Vikram Iyer", bankDetails: "Axis / ****8203", kycStatus: "Pending", tierStatus: "Silver", status: "Pending Verification", monthlyScans: "612", walletBalance: "$1,960", projectsRegistered: "18" },
  { id: "CON-1004", contractorName: "Riya Patel", contractorCode: "CTR-N-004", contractorType: "Installer", mobile: "+91 98765 82004", email: "riya.patel@contractor.demo", address: "Sector 62", city: "Noida", state: "Uttar Pradesh", country: "India", pinCode: "201309", specialization: "Modular installation", experienceYears: "7", licenseNumber: "UP-INS-5508", assignedDealer: "Prime Hardware Hub", assignedDistributor: "Northline Distribution", assignedSalesExecutive: "Amit Batra", bankDetails: "SBI / ****8204", kycStatus: "Verified", tierStatus: "Gold", status: "On Hold", monthlyScans: "408", walletBalance: "$1,280", projectsRegistered: "12" },
];

export const contractorTabs = ["Overview", "Projects", "Product Scans", "Purchase History", "Wallet", "Rewards", "Training", "Certificates", "Referrals", "Nearby Dealers", "Warranty", "Support", "Analytics", "Documents", "History", "Audit Log"];

export const contractorTrendData = [
  { month: "Jan", growth: 1.2, scans: 18, rewards: 0.7, projects: 0.5, training: 0.4, referrals: 0.2, products: 7 },
  { month: "Feb", growth: 1.5, scans: 24, rewards: 0.9, projects: 0.7, training: 0.6, referrals: 0.3, products: 9 },
  { month: "Mar", growth: 1.9, scans: 31, rewards: 1.3, projects: 1.0, training: 0.8, referrals: 0.5, products: 11 },
  { month: "Apr", growth: 2.4, scans: 39, rewards: 1.7, projects: 1.4, training: 1.1, referrals: 0.7, products: 13 },
  { month: "May", growth: 2.9, scans: 48, rewards: 2.2, projects: 1.8, training: 1.5, referrals: 0.9, products: 16 },
  { month: "Jun", growth: 3.4, scans: 58, rewards: 2.8, projects: 2.3, training: 1.9, referrals: 1.2, products: 19 },
];

export const contractorInsights = [
  "Painter segment scan-to-earn adoption is 21% above the channel average.",
  "Tile adhesive projects in Chennai show higher repeat purchase frequency.",
  "Pending KYC contractors should be prioritized before the next cashback cycle.",
  "Training completion correlates with 16% higher reward redemption accuracy.",
  "North zone installer referrals are converting at the fastest rate this month.",
];
