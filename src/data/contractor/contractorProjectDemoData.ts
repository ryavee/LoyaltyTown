export type ContractorProjectRecord = {
  id: string;
  projectName: string;
  projectType: string;
  customerName: string;
  siteLocation: string;
  city: string;
  state: string;
  estimatedValue: string;
  productsUsed: string;
  qrCodesScanned: string;
  dealer: string;
  contractor: string;
  startDate: string;
  endDate: string;
  status: "Planned" | "Active" | "Completed" | "On Hold" | "Cancelled";
};

export const contractorProjects: ContractorProjectRecord[] = [
  { id: "CPR-1001", projectName: "Skyline Tower Exterior", projectType: "Residential Tower", customerName: "Skyline Developers", siteLocation: "Andheri West", city: "Mumbai", state: "Maharashtra", estimatedValue: "$86K", productsUsed: "WeatherShield Pro, Primer X", qrCodesScanned: "386", dealer: "Metro Build Mart", contractor: "Aman Verma", startDate: "2026-06-02", endDate: "2026-08-15", status: "Active" },
  { id: "CPR-1002", projectName: "Bandra Premium Villa", projectType: "Villa Interior", customerName: "Mehta Residence", siteLocation: "Bandra", city: "Mumbai", state: "Maharashtra", estimatedValue: "$42K", productsUsed: "Luxury Emulsion, Sealant Max", qrCodesScanned: "178", dealer: "Urban Paint Point", contractor: "Sonia Fernandes", startDate: "2026-05-18", endDate: "2026-07-30", status: "Active" },
  { id: "CPR-1003", projectName: "OMR Retail Plaza", projectType: "Commercial", customerName: "OMR Properties", siteLocation: "OMR", city: "Chennai", state: "Tamil Nadu", estimatedValue: "$58K", productsUsed: "TileBond Ultra, Grout Pro", qrCodesScanned: "244", dealer: "Southern Contractor Store", contractor: "R. Kannan", startDate: "2026-04-12", endDate: "2026-06-28", status: "Completed" },
  { id: "CPR-1004", projectName: "Noida Modular Block", projectType: "Commercial Fitout", customerName: "Innova Workspaces", siteLocation: "Sector 62", city: "Noida", state: "Uttar Pradesh", estimatedValue: "$36K", productsUsed: "FixMate, Adhesive Pro", qrCodesScanned: "92", dealer: "Prime Hardware Hub", contractor: "Riya Patel", startDate: "2026-07-04", endDate: "2026-09-14", status: "Planned" },
];
