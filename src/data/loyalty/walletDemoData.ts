export type WalletRecord = {
  id: string;
  owner: string;
  ownerType: "Consumer" | "Contractor" | "Dealer" | "Distributor" | "Retailer";
  tier: string;
  balance: string;
  liability: string;
  holds: string;
  status: string;
};

export const wallets: WalletRecord[] = [
  { id: "WLT-1001", owner: "Aarav Sharma", ownerType: "Consumer", tier: "Gold", balance: "18,400 pts", liability: "$184", holds: "0", status: "Active" },
  { id: "WLT-1002", owner: "Aarav Contractors", ownerType: "Contractor", tier: "Platinum", balance: "128,400 pts", liability: "$1,284", holds: "2", status: "Active" },
  { id: "WLT-1003", owner: "Metro Build Mart", ownerType: "Dealer", tier: "Diamond", balance: "184,200 pts", liability: "$1,842", holds: "1", status: "Review" },
  { id: "WLT-1004", owner: "Urban Paint Point", ownerType: "Retailer", tier: "Gold", balance: "84,200 pts", liability: "$842", holds: "0", status: "Active" },
];
