import { BarChart3, FileText, Image, Package, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  ChartCard,
  DashboardWidget,
  EmptyState,
  EnterpriseDataTable,
  Tabs,
} from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import { productTabs, tabRows, type ProductRecord } from "../../../data/productDemoData";
import { ProductStatusBadge } from "./ProductStatusBadge";

type Row = Record<string, string>;

const columnsFor = (row: Row): DataTableColumn<Row>[] =>
  Object.keys(row).map((key) => ({
    id: key,
    header: key.replace(/([A-Z])/g, " $1"),
    accessor: key,
  }));

const DataPanel = ({ rows }: { rows: Row[] }) => (
  rows.length ? <EnterpriseDataTable rows={rows} columns={columnsFor(rows[0])} /> : <EmptyState />
);

export const ProductDetailsTabs = ({ product }: { product: ProductRecord }) => {
  const [tab, setTab] = useState("Overview");

  const tabItems = productTabs.map((label) => ({
    id: label,
    label,
    content:
      label === "Overview" ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <DashboardWidget title="Product Overview" subtitle="Core static product information.">
            <dl className="grid gap-3 md:grid-cols-2">
              {[
                ["Product Code", product.code],
                ["Brand", product.brand],
                ["Category", product.category],
                ["Status", product.status],
                ["SKUs", String(product.skuCount)],
                ["QR Batches", String(product.qrBatches)],
                ["Campaigns", String(product.campaigns)],
                ["Warranty", product.warrantyMonths ? `${product.warrantyMonths} months` : "Missing"],
              ].map(([term, value]) => (
                <div key={term} className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{term}</dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-200">{term === "Status" ? <ProductStatusBadge status={value} /> : value}</dd>
                </div>
              ))}
            </dl>
          </DashboardWidget>
          <ChartCard title="Product Analytics" description="Static scan and revenue profile." framed={false} minHeight="240px">
            <div className="grid w-full gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <QrCode className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-2xl font-semibold text-white">{product.scans}</p>
                <p className="text-sm text-slate-500">Verified scans</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <BarChart3 className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-2xl font-semibold text-white">{product.revenue}</p>
                <p className="text-sm text-slate-500">Attributed revenue</p>
              </div>
            </div>
          </ChartCard>
        </div>
      ) : label === "Images" ? (
        <div className="grid gap-3 md:grid-cols-3">
          {["Primary Image", "Packaging", "Label Artwork"].map((item) => (
            <div key={item} className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60">
              <Image className="h-7 w-7 text-slate-500" />
              <span className="mt-2 text-sm text-slate-400">{item}</span>
            </div>
          ))}
        </div>
      ) : label === "Documents" ? (
        <div className="grid gap-3 md:grid-cols-2">
          {["Specification Sheet.pdf", "Warranty Policy.pdf", "Safety Certificate.pdf", "Dealer Brochure.pdf"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <FileText className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-semibold text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      ) : label === "Warranty" ? (
        <DashboardWidget title="Warranty Defaults" subtitle="Future warranty API data will hydrate this panel.">
          <div className="flex items-center gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
            <ShieldCheck className="h-6 w-6 text-cyan-200" />
            <div>
              <p className="text-sm font-semibold text-white">{product.warrantyMonths ? `${product.warrantyMonths} months default warranty` : "Warranty missing"}</p>
              <p className="mt-1 text-sm text-slate-400">Applies to consumer registration and claim intake by default.</p>
            </div>
          </div>
        </DashboardWidget>
      ) : label === "SKUs" ? (
        <DataPanel rows={tabRows.skus} />
      ) : label === "QR Batches" ? (
        <DataPanel rows={tabRows.qrBatches} />
      ) : label === "Campaigns" ? (
        <DataPanel rows={tabRows.campaigns} />
      ) : label === "History" ? (
        <DataPanel rows={tabRows.history} />
      ) : label === "Audit Log" ? (
        <DataPanel rows={tabRows.auditLog} />
      ) : label === "Analytics" ? (
        <ChartCard title="Product Performance" description="Analytics placeholder for backend integration." minHeight="260px">
          <Package className="h-10 w-10 text-slate-600" />
        </ChartCard>
      ) : null,
  }));

  return <Tabs tabs={tabItems} value={tab} onChange={setTab} />;
};
