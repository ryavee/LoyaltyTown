export type CustomerWalletTransaction = {
  id: string;
  referenceNumber: string;
  customer: string;
  type: "Credit" | "Debit" | "Transfer" | "Expired Points" | "Cashback";
  pointsEarned: string;
  pointsRedeemed: string;
  cashbackEarned: string;
  availableBalance: string;
  expiryDate: string;
  status: string;
};

export const customerWalletSummary = {
  pointsEarned: "684,200",
  pointsRedeemed: "238,600",
  cashbackEarned: "$18,420",
  availableBalance: "445,600 pts",
  pendingRewards: "42,800 pts",
  expiredPoints: "9,200 pts",
};

export const customerWalletTransactions: CustomerWalletTransaction[] = [
  { id: "CWT-1001", referenceNumber: "WLT-882001", customer: "Aarav Sharma", type: "Credit", pointsEarned: "2,400", pointsRedeemed: "0", cashbackEarned: "$42", availableBalance: "18,400 pts", expiryDate: "2027-07-05", status: "Completed" },
  { id: "CWT-1002", referenceNumber: "WLT-882002", customer: "Nisha Kapoor", type: "Debit", pointsEarned: "0", pointsRedeemed: "1,200", cashbackEarned: "$0", availableBalance: "9,640 pts", expiryDate: "2027-06-30", status: "Redeemed" },
  { id: "CWT-1003", referenceNumber: "WLT-882003", customer: "Urban Build Co.", type: "Cashback", pointsEarned: "4,800", pointsRedeemed: "0", cashbackEarned: "$118", availableBalance: "42,800 pts", expiryDate: "2027-06-24", status: "Pending" },
  { id: "CWT-1004", referenceNumber: "WLT-882004", customer: "Riya Batra", type: "Expired Points", pointsEarned: "0", pointsRedeemed: "0", cashbackEarned: "$0", availableBalance: "4,100 pts", expiryDate: "2026-07-31", status: "Expiring Soon" },
];
