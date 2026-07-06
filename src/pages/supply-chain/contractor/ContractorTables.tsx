import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise/types";
import type { CertificateRecord } from "../../../data/contractor/certificateDemoData";
import type { ContractorProjectRecord } from "../../../data/contractor/contractorProjectDemoData";
import type { ContractorPurchaseRecord } from "../../../data/contractor/contractorPurchaseDemoData";
import type { ContractorRecord } from "../../../data/contractor/contractorDemoData";
import type { ContractorScanRecord } from "../../../data/contractor/contractorScanDemoData";
import type { ContractorSupportRecord, ContractorWarrantyRecord } from "../../../data/contractor/contractorSupportDemoData";
import type { ReferralRecord } from "../../../data/contractor/referralDemoData";
import type { TrainingRecord } from "../../../data/contractor/trainingDemoData";
import { ContractorStatusBadge } from "./ContractorStatusBadge";

const open = (path: string) => { window.location.href = path; };

export const ContractorTable = ({ rows }: { rows: ContractorRecord[] }) => {
  const columns: DataTableColumn<ContractorRecord>[] = [
    { id: "contractorCode", header: "Code", accessor: "contractorCode", sortable: true },
    { id: "contractorName", header: "Contractor", accessor: "contractorName", sortable: true },
    { id: "contractorType", header: "Type", accessor: "contractorType" },
    { id: "city", header: "City", accessor: "city" },
    { id: "assignedDealer", header: "Dealer", accessor: "assignedDealer" },
    { id: "monthlyScans", header: "Scans", accessor: "monthlyScans", align: "right" },
    { id: "walletBalance", header: "Wallet", accessor: "walletBalance" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/contractors/${row.id}`) }]} />;
};

export const ContractorProjectTable = ({ rows }: { rows: ContractorProjectRecord[] }) => {
  const columns: DataTableColumn<ContractorProjectRecord>[] = [
    { id: "projectName", header: "Project", accessor: "projectName", sortable: true },
    { id: "projectType", header: "Type", accessor: "projectType" },
    { id: "customerName", header: "Customer", accessor: "customerName" },
    { id: "city", header: "City", accessor: "city" },
    { id: "estimatedValue", header: "Value", accessor: "estimatedValue", align: "right" },
    { id: "qrCodesScanned", header: "QR Scans", accessor: "qrCodesScanned", align: "right" },
    { id: "contractor", header: "Contractor", accessor: "contractor" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/contractor-projects/${row.id}`) }]} />;
};

export const ContractorScanTable = ({ rows }: { rows: ContractorScanRecord[] }) => {
  const columns: DataTableColumn<ContractorScanRecord>[] = [
    { id: "qrCode", header: "QR Code", accessor: "qrCode", sortable: true },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "scanDate", header: "Scan Date", accessor: "scanDate" },
    { id: "project", header: "Project", accessor: "project" },
    { id: "rewardStatus", header: "Reward", cell: (row) => <ContractorStatusBadge status={row.rewardStatus} /> },
    { id: "riskScore", header: "Risk", cell: (row) => <ContractorStatusBadge status={row.riskScore} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ContractorPurchaseTable = ({ rows }: { rows: ContractorPurchaseRecord[] }) => {
  const columns: DataTableColumn<ContractorPurchaseRecord>[] = [
    { id: "invoice", header: "Invoice", accessor: "invoice", sortable: true },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "sku", header: "SKU", accessor: "sku" },
    { id: "quantity", header: "Qty", accessor: "quantity", align: "right" },
    { id: "amount", header: "Amount", accessor: "amount", align: "right" },
    { id: "uploadStatus", header: "Upload", cell: (row) => <ContractorStatusBadge status={row.uploadStatus} /> },
    { id: "verificationStatus", header: "Verification", cell: (row) => <ContractorStatusBadge status={row.verificationStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ReferralTable = ({ rows }: { rows: ReferralRecord[] }) => {
  const columns: DataTableColumn<ReferralRecord>[] = [
    { id: "referralName", header: "Referral", accessor: "referralName", sortable: true },
    { id: "type", header: "Type", accessor: "type" },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "project", header: "Project", accessor: "project" },
    { id: "productInterest", header: "Interest", accessor: "productInterest" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
    { id: "rewardStatus", header: "Reward", cell: (row) => <ContractorStatusBadge status={row.rewardStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ContractorTrainingTable = ({ rows }: { rows: TrainingRecord[] }) => {
  const columns: DataTableColumn<TrainingRecord>[] = [
    { id: "courseName", header: "Course", accessor: "courseName", sortable: true },
    { id: "skillCategory", header: "Skill", accessor: "skillCategory" },
    { id: "duration", header: "Duration", accessor: "duration" },
    { id: "completionStatus", header: "Status", cell: (row) => <ContractorStatusBadge status={row.completionStatus} /> },
    { id: "score", header: "Score", accessor: "score", align: "right" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ContractorCertificateTable = ({ rows }: { rows: CertificateRecord[] }) => {
  const columns: DataTableColumn<CertificateRecord>[] = [
    { id: "certificateId", header: "Certificate", accessor: "certificateId", sortable: true },
    { id: "courseName", header: "Course", accessor: "courseName" },
    { id: "contractor", header: "Contractor", accessor: "contractor" },
    { id: "issueDate", header: "Issued", accessor: "issueDate" },
    { id: "expiryDate", header: "Expires", accessor: "expiryDate" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ContractorSupportTable = ({ rows }: { rows: ContractorSupportRecord[] }) => {
  const columns: DataTableColumn<ContractorSupportRecord>[] = [
    { id: "ticketNumber", header: "Ticket", accessor: "ticketNumber", sortable: true },
    { id: "contractor", header: "Contractor", accessor: "contractor" },
    { id: "category", header: "Category", accessor: "category" },
    { id: "priority", header: "Priority", cell: (row) => <ContractorStatusBadge status={row.priority} /> },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
    { id: "openedOn", header: "Opened", accessor: "openedOn" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const ContractorWarrantyTable = ({ rows }: { rows: ContractorWarrantyRecord[] }) => {
  const columns: DataTableColumn<ContractorWarrantyRecord>[] = [
    { id: "claimNumber", header: "Warranty", accessor: "claimNumber", sortable: true },
    { id: "contractor", header: "Contractor", accessor: "contractor" },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "project", header: "Project", accessor: "project" },
    { id: "status", header: "Status", cell: (row) => <ContractorStatusBadge status={row.status} /> },
    { id: "date", header: "Date", accessor: "date" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
