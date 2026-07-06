export type DealerProjectRecord = {
  id: string;
  projectName: string;
  customerContractor: string;
  location: string;
  projectType: string;
  estimatedValue: string;
  productsUsed: string;
  status: "Active" | "Proposal" | "Completed" | "On Hold";
  startDate: string;
  endDate: string;
};

export const dealerProjects: DealerProjectRecord[] = [
  { id: "DPRJ-001", projectName: "Industrial Flooring", customerContractor: "Aarav Contractors", location: "Mumbai", projectType: "Commercial", estimatedValue: "$184K", productsUsed: "ADH-PRO-20KG", status: "Active", startDate: "2026-06-20", endDate: "2026-08-30" },
  { id: "DPRJ-002", projectName: "Apartment Paint Supply", customerContractor: "North Interiors", location: "Delhi", projectType: "Residential", estimatedValue: "$96K", productsUsed: "PNT-SQR-10L", status: "Proposal", startDate: "2026-07-10", endDate: "2026-09-15" },
  { id: "DPRJ-003", projectName: "Hotel Laminate Fitout", customerContractor: "Urban Build Co.", location: "Chennai", projectType: "Hospitality", estimatedValue: "$142K", productsUsed: "LAM-PRM-8X4", status: "Active", startDate: "2026-06-15", endDate: "2026-10-01" },
];
