import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise/types";
import type { PointsRuleRecord } from "../../../data/loyalty/pointsRuleDemoData";
import type { RewardCatalogRecord } from "../../../data/loyalty/rewardCatalogDemoData";
import type { WalletRecord } from "../../../data/loyalty/walletDemoData";
import { PayoutStatusBadge, RedemptionStatusBadge, StatusBadge, WalletOwnerBadge } from "./LoyaltyBadges";

const open = (path: string) => { window.location.href = path; };

export const PointsRuleTable = ({ rows }: { rows: PointsRuleRecord[] }) => {
  const columns: DataTableColumn<PointsRuleRecord>[] = [
    { id: "ruleName", header: "Rule", accessor: "ruleName", sortable: true },
    { id: "ruleType", header: "Type", accessor: "ruleType" },
    { id: "ownerType", header: "Owner", accessor: "ownerType" },
    { id: "earnValue", header: "Earn", accessor: "earnValue", align: "right" },
    { id: "trigger", header: "Trigger", accessor: "trigger" },
    { id: "region", header: "Region", accessor: "region" },
    { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/points-engine/${row.id}`) }]} />;
};

export const WalletTable = ({ rows }: { rows: WalletRecord[] }) => {
  const columns: DataTableColumn<WalletRecord>[] = [
    { id: "owner", header: "Owner", accessor: "owner", sortable: true },
    { id: "ownerType", header: "Owner Type", cell: (row) => <WalletOwnerBadge ownerType={row.ownerType} /> },
    { id: "tier", header: "Tier", accessor: "tier" },
    { id: "balance", header: "Balance", accessor: "balance", align: "right" },
    { id: "liability", header: "Liability", accessor: "liability", align: "right" },
    { id: "holds", header: "Holds", accessor: "holds", align: "right" },
    { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/wallet/${row.id}`) }]} />;
};

export const RewardCatalogTable = ({ rows }: { rows: RewardCatalogRecord[] }) => {
  const columns: DataTableColumn<RewardCatalogRecord>[] = [
    { id: "reward", header: "Reward", accessor: "reward", sortable: true },
    { id: "rewardType", header: "Type", accessor: "rewardType" },
    { id: "points", header: "Points", accessor: "points", align: "right" },
    { id: "stock", header: "Stock", accessor: "stock", align: "right" },
    { id: "eligibility", header: "Eligibility", accessor: "eligibility" },
    { id: "redemptionSettings", header: "Settings", accessor: "redemptionSettings" },
    { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/rewards-catalog/${row.id}`) }]} />;
};

export const GenericLoyaltyTable = <T extends Record<string, string>>({ rows, statusKind = "status" }: { rows: T[]; statusKind?: "status" | "redemption" | "payout" }) => {
  const columns: DataTableColumn<T>[] = Object.keys(rows[0] || {}).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    accessor: key,
    cell: key === "status" ? (row) => statusKind === "redemption" ? <RedemptionStatusBadge status={String(row[key])} /> : statusKind === "payout" ? <PayoutStatusBadge status={String(row[key])} /> : <StatusBadge status={String(row[key])} /> : undefined,
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
