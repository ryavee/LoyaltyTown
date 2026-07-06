import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise/types";
import type { CustomerRecord } from "../../../data/customer/customerDemoData";
import type { CustomerProjectRecord } from "../../../data/customer/customerProjectDemoData";
import type { CustomerPurchaseRecord } from "../../../data/customer/customerPurchaseDemoData";
import type { CustomerReferralRecord } from "../../../data/customer/customerReferralDemoData";
import type { CustomerRewardRecord } from "../../../data/customer/customerRewardDemoData";
import type { CustomerScanRecord } from "../../../data/customer/customerScanDemoData";
import type { CustomerSupportRecord } from "../../../data/customer/customerSupportDemoData";
import type { CustomerWalletTransaction } from "../../../data/customer/customerWalletDemoData";
import type { CustomerWarrantyRecord } from "../../../data/customer/customerWarrantyDemoData";
import { CustomerStatusBadge } from "./CustomerStatusBadge";

const open = (path: string) => { window.location.href = path; };

export const CustomerTable = ({ rows }: { rows: CustomerRecord[] }) => {
  const columns: DataTableColumn<CustomerRecord>[] = [
    { id: "customerId", header: "Customer ID", accessor: "customerId", sortable: true },
    { id: "name", header: "Customer", cell: (row) => `${row.firstName} ${row.lastName}` },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "city", header: "City", accessor: "city" },
    { id: "tier", header: "Tier", accessor: "customerTier" },
    { id: "ltv", header: "Lifetime Value", accessor: "lifetimeValue", align: "right" },
    { id: "wallet", header: "Wallet", accessor: "walletBalance" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/customers/${row.id}`) }]} />;
};

export const CustomerWalletTable = ({ rows }: { rows: CustomerWalletTransaction[] }) => {
  const columns: DataTableColumn<CustomerWalletTransaction>[] = [
    { id: "referenceNumber", header: "Reference", accessor: "referenceNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "type", header: "Type", accessor: "type" },
    { id: "pointsEarned", header: "Earned", accessor: "pointsEarned", align: "right" },
    { id: "pointsRedeemed", header: "Redeemed", accessor: "pointsRedeemed", align: "right" },
    { id: "cashbackEarned", header: "Cashback", accessor: "cashbackEarned", align: "right" },
    { id: "expiryDate", header: "Expiry", accessor: "expiryDate" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerRewardTable = ({ rows }: { rows: CustomerRewardRecord[] }) => {
  const columns: DataTableColumn<CustomerRewardRecord>[] = [
    { id: "reward", header: "Reward", accessor: "reward", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "rewardType", header: "Type", accessor: "rewardType" },
    { id: "points", header: "Points", accessor: "points", align: "right" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerPurchaseTable = ({ rows }: { rows: CustomerPurchaseRecord[] }) => {
  const columns: DataTableColumn<CustomerPurchaseRecord>[] = [
    { id: "invoice", header: "Invoice", accessor: "invoice", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "dealer", header: "Dealer", accessor: "dealer" },
    { id: "retailer", header: "Retailer", accessor: "retailer" },
    { id: "project", header: "Project", accessor: "project" },
    { id: "amount", header: "Amount", accessor: "amount", align: "right" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerScanTable = ({ rows }: { rows: CustomerScanRecord[] }) => {
  const columns: DataTableColumn<CustomerScanRecord>[] = [
    { id: "qrCode", header: "QR Code", accessor: "qrCode", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "scanType", header: "Scan Type", accessor: "scanType" },
    { id: "location", header: "Location", accessor: "location" },
    { id: "device", header: "Device", accessor: "device" },
    { id: "scanDate", header: "Scan Date", accessor: "scanDate" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerWarrantyTable = ({ rows }: { rows: CustomerWarrantyRecord[] }) => {
  const columns: DataTableColumn<CustomerWarrantyRecord>[] = [
    { id: "claimNumber", header: "Warranty", accessor: "claimNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "product", header: "Product", accessor: "product" },
    { id: "registeredDate", header: "Registered", accessor: "registeredDate" },
    { id: "expiryDate", header: "Expiry", accessor: "expiryDate" },
    { id: "timeline", header: "Timeline", accessor: "timeline" },
    { id: "claimStatus", header: "Status", cell: (row) => <CustomerStatusBadge status={row.claimStatus} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerReferralTable = ({ rows }: { rows: CustomerReferralRecord[] }) => {
  const columns: DataTableColumn<CustomerReferralRecord>[] = [
    { id: "referralName", header: "Referral", accessor: "referralName", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "mobile", header: "Mobile", accessor: "mobile" },
    { id: "inviteChannel", header: "Invite", accessor: "inviteChannel" },
    { id: "referralEarnings", header: "Earnings", accessor: "referralEarnings", align: "right" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
    { id: "history", header: "History", cell: (row) => <CustomerStatusBadge status={row.history} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerSupportTable = ({ rows }: { rows: CustomerSupportRecord[] }) => {
  const columns: DataTableColumn<CustomerSupportRecord>[] = [
    { id: "ticketNumber", header: "Ticket", accessor: "ticketNumber", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "topic", header: "Topic", accessor: "topic" },
    { id: "priority", header: "Priority", accessor: "priority" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
    { id: "openedOn", header: "Opened", accessor: "openedOn" },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};

export const CustomerProjectTable = ({ rows }: { rows: CustomerProjectRecord[] }) => {
  const columns: DataTableColumn<CustomerProjectRecord>[] = [
    { id: "projectName", header: "Project", accessor: "projectName", sortable: true },
    { id: "customer", header: "Customer", accessor: "customer" },
    { id: "products", header: "Products", accessor: "products" },
    { id: "scans", header: "Scans", accessor: "scans", align: "right" },
    { id: "warranty", header: "Warranty", accessor: "warranty" },
    { id: "status", header: "Status", cell: (row) => <CustomerStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
