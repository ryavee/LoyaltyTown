export type ClaimRecord = {
  id: string;
  claimNumber: string;
  customer: string;
  product: string;
  qrCode: string;
  issue: string;
  description: string;
  photos: string;
  videos: string;
  priority: string;
  assignedEngineer: string;
  status: string;
};

export const claims: ClaimRecord[] = [
  { id: "CLM-1001", claimNumber: "CLM-88201", customer: "Aarav Sharma", product: "WeatherShield Pro Paint", qrCode: "LT-GENUINE-1001", issue: "Surface peeling", description: "Peeling after monsoon exposure.", photos: "3 photos", videos: "1 video", priority: "High", assignedEngineer: "Priya Nair", status: "Pending" },
  { id: "CLM-1002", claimNumber: "CLM-88202", customer: "Nisha Kapoor", product: "Luxury Emulsion", qrCode: "LT-USED-1002", issue: "Shade mismatch", description: "Mismatch after second coat.", photos: "2 photos", videos: "0 videos", priority: "Medium", assignedEngineer: "Arun Das", status: "Approved" },
  { id: "CLM-1003", claimNumber: "CLM-88203", customer: "Urban Build Co.", product: "TileBond Ultra", qrCode: "LT-TB-441902", issue: "Bond failure", description: "Tiles loosened in wet zone.", photos: "5 photos", videos: "2 videos", priority: "Critical", assignedEngineer: "Maya Krishnan", status: "Inspection" },
];
