export type ReferralRecord = {
  id: string;
  referralName: string;
  type: string;
  mobile: string;
  project: string;
  productInterest: string;
  status: string;
  rewardStatus: string;
};

export const referrals: ReferralRecord[] = [
  { id: "REF-1001", referralName: "Prakash Singh", type: "Contractor", mobile: "+91 98765 83001", project: "Skyline Tower Exterior", productInterest: "Exterior paints", status: "Converted", rewardStatus: "Rewarded" },
  { id: "REF-1002", referralName: "Nikhil Mehta", type: "Customer", mobile: "+91 98765 83002", project: "Bandra Premium Villa", productInterest: "Premium interiors", status: "In Discussion", rewardStatus: "Pending" },
  { id: "REF-1003", referralName: "Anbu Raj", type: "Contractor", mobile: "+91 98765 83003", project: "OMR Retail Plaza", productInterest: "Tile adhesives", status: "Qualified", rewardStatus: "Review" },
  { id: "REF-1004", referralName: "Kavita Rao", type: "Architect", mobile: "+91 98765 83004", project: "Noida Modular Block", productInterest: "Installation systems", status: "New", rewardStatus: "Pending" },
];
