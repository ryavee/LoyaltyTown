export type AccountRecord = {
  id: string;
  companyName: string;
  industry: string;
  gstNumber: string;
  website: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  accountOwner: string;
  revenue: string;
};

export const accounts: AccountRecord[] = [
  { id: "ACC-2401", companyName: "Apex Industrial Supply", industry: "Distributor", gstNumber: "27AAAPA2401K1Z1", website: "apexsupply.demo", contactPerson: "Riya Malhotra", phone: "+91 98765 62001", email: "riya@apexsupply.demo", address: "Andheri, Mumbai", status: "Active", accountOwner: "Nisha Kapoor", revenue: "$1.8M" },
  { id: "ACC-2402", companyName: "Northline Trade", industry: "Dealer", gstNumber: "07AABCN2402K1Z7", website: "northline.demo", contactPerson: "Karan Shah", phone: "+91 98765 62002", email: "karan@northline.demo", address: "Karol Bagh, Delhi", status: "Review", accountOwner: "Amit Batra", revenue: "$740K" },
  { id: "ACC-2403", companyName: "Urban Build Network", industry: "Contractor", gstNumber: "33AAACU2403L1Z3", website: "urbanbuild.demo", contactPerson: "Meera Iyer", phone: "+91 98765 62003", email: "meera@urbanbuild.demo", address: "OMR, Chennai", status: "Active", accountOwner: "Vikram Iyer", revenue: "$920K" },
];
