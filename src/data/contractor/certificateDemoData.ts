export type CertificateRecord = {
  id: string;
  courseName: string;
  certificateId: string;
  issueDate: string;
  expiryDate: string;
  contractor: string;
  status: string;
};

export const certificates: CertificateRecord[] = [
  { id: "CER-1001", courseName: "Premium Paint Application", certificateId: "LT-CER-9001", issueDate: "2026-06-10", expiryDate: "2027-06-10", contractor: "Aman Verma", status: "Valid" },
  { id: "CER-1002", courseName: "Interior Finish Masterclass", certificateId: "LT-CER-9002", issueDate: "2026-05-18", expiryDate: "2027-05-18", contractor: "Sonia Fernandes", status: "Valid" },
  { id: "CER-1003", courseName: "Tile Adhesive Best Practices", certificateId: "LT-CER-9003", issueDate: "2026-04-22", expiryDate: "2027-04-22", contractor: "R. Kannan", status: "Valid" },
  { id: "CER-1004", courseName: "Installer Safety", certificateId: "LT-CER-9004", issueDate: "2025-07-18", expiryDate: "2026-07-18", contractor: "Riya Patel", status: "Expiring Soon" },
];
