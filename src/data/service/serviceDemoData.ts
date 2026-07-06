export type ServiceRequestRecord = {
  id: string;
  serviceNumber: string;
  customer: string;
  location: string;
  technician: string;
  issue: string;
  priority: string;
  status: string;
  schedule: string;
};

export const serviceRequests: ServiceRequestRecord[] = [
  { id: "SRV-1001", serviceNumber: "SRV-74001", customer: "Aarav Sharma", location: "Pune", technician: "Priya Nair", issue: "Inspection visit", priority: "High", status: "Assigned", schedule: "Today 2:00 PM" },
  { id: "SRV-1002", serviceNumber: "SRV-74002", customer: "Nisha Kapoor", location: "Mumbai", technician: "Arun Das", issue: "Shade validation", priority: "Medium", status: "Completed", schedule: "Yesterday" },
  { id: "SRV-1003", serviceNumber: "SRV-74003", customer: "Urban Build Co.", location: "Chennai", technician: "Maya Krishnan", issue: "Repair assessment", priority: "Critical", status: "Open", schedule: "Jul 08, 2026" },
];

export const serviceContracts = [
  { id: "SCT-1001", contract: "Apex Dealer Care", customer: "Metro Build Mart", coverage: "Priority warranty", renewal: "2026-09-01", payments: "Paid", status: "Active" },
  { id: "SCT-1002", contract: "Urban Retail Coverage", customer: "Urban Paint Point", coverage: "Extended repairs", renewal: "2026-08-18", payments: "Pending", status: "Renewal Due" },
  { id: "SCT-1003", contract: "Builder Project Support", customer: "Urban Build Co.", coverage: "Project site visits", renewal: "2026-10-12", payments: "Paid", status: "Active" },
];
