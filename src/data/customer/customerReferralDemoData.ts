export type CustomerReferralRecord = {
  id: string;
  referralName: string;
  customer: string;
  mobile: string;
  inviteChannel: string;
  referralEarnings: string;
  status: string;
  history: string;
};

export const customerReferrals: CustomerReferralRecord[] = [
  { id: "CRF-1001", referralName: "Prakash Singh", customer: "Aarav Sharma", mobile: "+91 98765 92001", inviteChannel: "WhatsApp", referralEarnings: "1,200 pts", status: "Converted", history: "Rewarded" },
  { id: "CRF-1002", referralName: "Meera Joshi", customer: "Nisha Kapoor", mobile: "+91 98765 92002", inviteChannel: "SMS", referralEarnings: "600 pts", status: "Invited", history: "Pending" },
  { id: "CRF-1003", referralName: "South Design Studio", customer: "Urban Build Co.", mobile: "+91 98765 92003", inviteChannel: "Email", referralEarnings: "2,400 pts", status: "Qualified", history: "Review" },
];
