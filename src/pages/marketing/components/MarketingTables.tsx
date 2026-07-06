import { Eye } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise/types";
import type { CampaignRecord } from "../../../data/marketing/campaignDemoData";
import { MarketingStatusBadge } from "./MarketingStatusBadge";

const open = (path: string) => { window.location.href = path; };

export const CampaignTable = ({ rows }: { rows: CampaignRecord[] }) => {
  const columns: DataTableColumn<CampaignRecord>[] = [
    { id: "name", header: "Campaign", accessor: "name", sortable: true },
    { id: "type", header: "Type", accessor: "type" },
    { id: "audience", header: "Audience", accessor: "audience" },
    { id: "channel", header: "Channel", accessor: "channel" },
    { id: "region", header: "Region", accessor: "region" },
    { id: "revenue", header: "Revenue", accessor: "revenue", align: "right" },
    { id: "roi", header: "ROI", accessor: "roi", align: "right" },
    { id: "status", header: "Status", cell: (row) => <MarketingStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable rows={rows} columns={columns} actions={[{ id: "view", label: "View", icon: Eye, onClick: (row) => open(`/campaigns/${row.id}`) }]} />;
};

export const GenericMarketingTable = <T extends Record<string, string>>({ rows }: { rows: T[] }) => {
  const columns: DataTableColumn<T>[] = Object.keys(rows[0] || {}).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase()),
    accessor: key,
    cell: key === "status" ? (row) => <MarketingStatusBadge status={String(row[key])} /> : undefined,
  }));
  return <EnterpriseDataTable rows={rows} columns={columns} />;
};
