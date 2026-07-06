import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Archive,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FileBarChart,
  FileText,
  GripVertical,
  ImagePlus,
  Layers3,
  Package,
  PackageCheck,
  PackageX,
  Pencil,
  Plus,
  QrCode,
  Save,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Tags,
  Trash2,
  TrendingUp,
  Upload,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ActionBar,
  AdvancedFilters,
  Badge,
  ChartCard,
  ColumnVisibility,
  DashboardWidget,
  EmptyState,
  EnterpriseDataTable,
  KPIGrid,
  PrimaryButton,
  ReusableFormLayout,
  SearchInput,
  SecondaryButton,
  Select,
  Stepper,
  Tabs,
  TextInput,
  Textarea,
  Timeline,
  Toggle,
} from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn, TimelineItem } from "../../../Components/enterprise";
import {
  brands,
  categories,
  productAnalyticsData,
  productAuditData,
  productDashboardData,
  productDocumentData,
  productRegionPerformance,
  productTimelineData,
  products,
  statuses,
  type ProductRecord,
} from "../../../data/productDemoData";
import { ProductStatusBadge } from "./ProductStatusBadge";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  BadgeCheck,
  Boxes,
  Package,
  PackageCheck,
  PackageX,
  QrCode,
  ScanLine,
  ShieldCheck,
  Tags,
  TrendingUp,
};

const tooltipStyle = {
  contentStyle: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
  },
  labelStyle: { color: "#f8fafc" },
};

const optionList = (items: string[]) => items.map((item) => ({ label: item, value: item }));

const resolveIcon = (name: string) => iconMap[name] || Package;

const booleanBadge = (enabled?: boolean) => (
  <Badge tone={enabled ? "success" : "warning"}>{enabled ? "Enabled" : "Disabled"}</Badge>
);

export const ProductOverviewCard = ({ product }: { product: ProductRecord }) => (
  <DashboardWidget title="Product Overview" subtitle="Core master data and connected-product readiness.">
    <dl className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {[
        ["Product Code", product.code],
        ["Category", product.category],
        ["Brand", product.brand],
        ["SKU Count", product.skuCount],
        ["MRP", product.mrp || "Not set"],
        ["QR", product.qrEnabled ? "Enabled" : "Disabled"],
        ["Warranty", product.warrantyEnabled ? `${product.warrantyMonths || 0} months` : "Disabled"],
        ["Updated By", product.updatedBy || "Product Ops"],
      ].map(([label, value]) => (
        <div key={label} className="rounded-md border border-slate-800 bg-slate-900/60 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</dt>
          <dd className="mt-2 text-sm font-semibold text-slate-200">{String(value)}</dd>
        </div>
      ))}
    </dl>
  </DashboardWidget>
);

export const ProductPricingCard = ({ product }: { product: ProductRecord }) => (
  <DashboardWidget title="Pricing" subtitle="Static price hierarchy for manufacturer admin review.">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ["MRP", product.mrp || "$0"],
        ["Selling Price", "$132"],
        ["Dealer Price", "$118"],
        ["Distributor Price", "$104"],
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
          <p className="mt-2 text-xl font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  </DashboardWidget>
);

export const ProductQRCard = ({ product }: { product: ProductRecord }) => (
  <DashboardWidget title="QR Configuration" subtitle="Frontend-only QR settings preview.">
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
        <QrCode className="h-5 w-5 text-cyan-200" />
        <p className="mt-3 text-sm font-semibold text-white">QR Required</p>
        <p className="mt-1 text-sm text-cyan-50/80">{product.qrEnabled ? "Yes, secure dynamic QR" : "Not enabled"}</p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
        <Layers3 className="h-5 w-5 text-cyan-300" />
        <p className="mt-3 text-sm font-semibold text-white">Parent Child</p>
        <p className="mt-1 text-sm text-slate-400">Item, box, case and pallet ready</p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
        <FileText className="h-5 w-5 text-cyan-300" />
        <p className="mt-3 text-sm font-semibold text-white">Template</p>
        <p className="mt-1 text-sm text-slate-400">GS1 secure label template</p>
      </div>
    </div>
  </DashboardWidget>
);

export const ProductWarrantyCard = ({ product }: { product: ProductRecord }) => (
  <DashboardWidget title="Warranty" subtitle="Warranty defaults and claim policy summary.">
    <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-6 w-6 text-cyan-300" />
        <div>
          <p className="text-sm font-semibold text-white">{product.warrantyEnabled ? `${product.warrantyMonths || 0} month warranty enabled` : "Warranty disabled"}</p>
          <p className="mt-1 text-sm text-slate-400">Claim rules, extended warranty, and certificates remain static placeholders.</p>
        </div>
      </div>
      {booleanBadge(product.warrantyEnabled)}
    </div>
  </DashboardWidget>
);

export const ProductTimeline = () => (
  <DashboardWidget title="Product Timeline" subtitle="Lifecycle events from product creation to customer engagement.">
    <Timeline items={productTimelineData as TimelineItem[]} />
  </DashboardWidget>
);

export const ProductAnalytics = () => (
  <section className="grid gap-4 xl:grid-cols-2">
    <ChartCard title="QR Scan Trend" description="Verified QR scan trend." framed={false} minHeight="280px" contentClassName="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={productAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Area type="monotone" dataKey="scans" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard title="Product Performance" description="Sales and scan performance." framed={false} minHeight="280px" contentClassName="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={productAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="sales" fill="#34d399" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="scans" stroke="#22d3ee" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard title="Warranty Trend" description="Warranty registration and claim signal." framed={false} minHeight="280px" contentClassName="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={productAnalyticsData}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="warranty" fill="#f472b6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
    <ChartCard title="Region Performance" description="Regional scan and revenue comparison." framed={false} minHeight="280px" contentClassName="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={productRegionPerformance}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="region" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="scans" stroke="#a78bfa" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  </section>
);

export const ProductDocuments = () => {
  const columns: DataTableColumn<(typeof productDocumentData)[number]>[] = [
    { id: "type", header: "Type", accessor: "type", sortable: true },
    { id: "name", header: "Document", accessor: "name", sortable: true },
    { id: "owner", header: "Owner", accessor: "owner" },
    { id: "updated", header: "Updated", accessor: "updated", sortable: true },
    { id: "status", header: "Status", accessor: "status", cell: (row) => <Badge tone={row.status === "Published" ? "success" : "warning"}>{row.status}</Badge> },
  ];

  return (
    <div className="space-y-4">
      <DashboardWidget title="Upload Placeholder" subtitle="Manuals, datasheets, images, certificates, and warranty PDFs.">
        <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
          <Upload className="h-8 w-8 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">Drag and drop product documents</p>
          <p className="mt-1 text-sm text-slate-500">No upload occurs until backend storage is connected.</p>
        </div>
      </DashboardWidget>
      <EnterpriseDataTable rows={productDocumentData} columns={columns} showImportPlaceholder showExportPlaceholder />
    </div>
  );
};

export const ProductAudit = () => {
  const columns: DataTableColumn<(typeof productAuditData)[number]>[] = [
    { id: "action", header: "Action", accessor: "action", sortable: true },
    { id: "actor", header: "Actor", accessor: "actor" },
    { id: "source", header: "Source", accessor: "source" },
    { id: "timestamp", header: "Timestamp", accessor: "timestamp", sortable: true },
  ];

  return <EnterpriseDataTable title="Product Audit" description="Created, updated, deleted, QR generated, and status changed events." rows={productAuditData} columns={columns} showExportPlaceholder />;
};

export const ProductFilters = ({
  query,
  setQuery,
  category,
  setCategory,
  brand,
  setBrand,
  status,
  setStatus,
}: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}) => (
  <div className="space-y-4">
    <section className="rounded-lg border border-slate-800 bg-slate-950/75 p-4">
      <SearchInput value={query} onChange={setQuery} placeholder="Global search by product name, code, category, brand, SKU, or status" />
    </section>
    <AdvancedFilters title="Advanced Filters" activeCount={[category, brand, status].filter(Boolean).length}>
      <Select label="Category" value={category} onChange={setCategory} options={optionList(categories)} />
      <Select label="Brand" value={brand} onChange={setBrand} options={optionList(brands)} />
      <Select label="Status" value={status} onChange={setStatus} options={optionList(statuses)} />
    </AdvancedFilters>
    <DashboardWidget title="Saved Filters" subtitle="Frontend placeholder for user-specific filter presets.">
      <div className="flex flex-wrap gap-2">
        {["QR Enabled", "Warranty Missing", "Low Stock", "Recently Updated"].map((filter) => (
          <Badge key={filter} tone="info">{filter}</Badge>
        ))}
      </div>
    </DashboardWidget>
  </div>
);

export const enterpriseProductColumns: DataTableColumn<ProductRecord>[] = [
  {
    id: "image",
    header: "Image",
    width: "72px",
    cell: (row) => (
      <div className="h-11 w-11 overflow-hidden rounded-md border border-slate-800 bg-slate-900">
        {row.imageUrl ? <img src={row.imageUrl} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="m-3 h-5 w-5 text-slate-500" />}
      </div>
    ),
  },
  {
    id: "name",
    header: "Product Name",
    accessor: "name",
    sortable: true,
    cell: (row) => (
      <div>
        <Link to={`/products/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.name}</Link>
        <p className="mt-1 text-xs text-slate-500">{row.shortDescription}</p>
      </div>
    ),
  },
  { id: "code", header: "Product Code", accessor: "code", sortable: true },
  { id: "category", header: "Category", accessor: "category", sortable: true },
  { id: "brand", header: "Brand", accessor: "brand", sortable: true },
  { id: "skuCount", header: "SKU Count", accessor: "skuCount", sortable: true, align: "right" },
  { id: "mrp", header: "MRP", accessor: "mrp", sortable: true, align: "right" },
  { id: "qrEnabled", header: "QR Enabled", accessor: "qrEnabled", cell: (row) => booleanBadge(row.qrEnabled) },
  { id: "warrantyEnabled", header: "Warranty Enabled", accessor: "warrantyEnabled", cell: (row) => booleanBadge(row.warrantyEnabled) },
  { id: "status", header: "Status", accessor: "status", sortable: true, cell: (row) => <ProductStatusBadge status={row.status} /> },
  { id: "updatedBy", header: "Updated By", accessor: "updatedBy", sortable: true },
  { id: "updatedAt", header: "Updated Date", accessor: "updatedAt", sortable: true },
];

const productActions: DataTableAction<ProductRecord>[] = [
  { id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/products/${row.id}`; } },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => { window.location.href = `/products/${row.id}/edit`; } },
  { id: "clone", label: "Clone", icon: Copy, onClick: (row) => { window.location.href = `/products/${row.id}/clone`; } },
  { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
  { id: "delete", label: "Delete", icon: Trash2, destructive: true, onClick: () => undefined },
];

export const EnterpriseProductTable = ({
  rows,
  visibleColumns,
}: {
  rows: ProductRecord[];
  visibleColumns: string[];
}) => {
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);

  return (
    <EnterpriseDataTable
      title="Enterprise Product Table"
      description="Global search, filters, saved filters, column visibility, reorder placeholder, pin placeholder, sorting, selection, pagination, import and export placeholders."
      rows={rows}
      columns={enterpriseProductColumns}
      actions={productActions}
      visibleColumns={visibleColumns}
      enableSelection
      selectedRowIds={selectedIds}
      onSelectedRowIdsChange={setSelectedIds}
      showImportPlaceholder
      showExportPlaceholder
      bulkActions={[
        { id: "delete", label: "Bulk Delete", icon: Trash2, destructive: true, onClick: () => undefined },
        { id: "export", label: "Bulk Export", icon: Download, onClick: () => undefined },
        { id: "status", label: "Bulk Status Change", icon: CheckCircle2, onClick: () => undefined },
        { id: "qr", label: "Bulk QR Enable", icon: QrCode, onClick: () => undefined },
        { id: "warranty", label: "Bulk Warranty Enable", icon: ShieldCheck, onClick: () => undefined },
      ]}
      pagination={{ page: 1, pageCount: 4, totalLabel: `Showing ${rows.length} demo products`, onPageChange: () => undefined }}
    />
  );
};

export const ProductDashboard = () => {
  const kpis = productDashboardData.kpis.map((item) => ({ ...item, icon: resolveIcon(item.icon) }));

  const smallProductColumns: DataTableColumn<ProductRecord>[] = [
    { id: "name", header: "Product", accessor: "name", cell: (row) => <Link to={`/products/${row.id}`} className="font-semibold text-white hover:text-cyan-200">{row.name}</Link> },
    { id: "brand", header: "Brand", accessor: "brand" },
    { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductStatusBadge status={row.status} /> },
    { id: "updatedAt", header: "Updated", accessor: "updatedAt" },
  ];

  return (
    <div className="space-y-5">
      <KPIGrid items={kpis} />
      <section className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Products by Category" description="Static product distribution by category." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productDashboardData.productsByCategory}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Products by Brand" description="Brand-level product spread." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productDashboardData.productsByBrand}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Product Growth" description="Product creation trend." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productDashboardData.trend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="products" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="QR Activation Trend" description="QR activation trend in millions." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={productDashboardData.trend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="qr" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Product Lifecycle" description="Catalog lifecycle distribution." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productDashboardData.lifecycle}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="stage" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="products" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Warranty Registration Trend" description="Warranty registrations in millions." framed={false} minHeight="280px" contentClassName="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={productDashboardData.trend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="warranty" stroke="#f472b6" fill="#f472b633" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
      <section className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
        <div className="grid gap-4">
          <DashboardWidget title="Recent Products" subtitle="Newly created product masters.">
            <EnterpriseDataTable rows={productDashboardData.recentProducts} columns={smallProductColumns} />
          </DashboardWidget>
          <DashboardWidget title="Recently Updated Products" subtitle="Catalog records changed recently.">
            <EnterpriseDataTable rows={productDashboardData.updatedProducts} columns={smallProductColumns} />
          </DashboardWidget>
        </div>
        <div className="grid gap-4">
          <DashboardWidget title="AI Product Insights" subtitle="Static AI readiness and recommendation cards." actions={<Sparkles className="h-5 w-5 text-cyan-200" />}>
            <div className="space-y-3">
              {productDashboardData.aiInsights.map((insight) => (
                <article key={insight.id} className="rounded-md border border-cyan-400/10 bg-cyan-400/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
                    <Badge tone={insight.severity === "Action" ? "danger" : "info"}>{insight.severity}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-cyan-50/80">{insight.detail}</p>
                </article>
              ))}
            </div>
          </DashboardWidget>
          <DashboardWidget title="Quick Product Actions" subtitle="Frequently used product operations.">
            <div className="grid gap-2">
              {[
                ["Create Product", "/products/create", Plus],
                ["Bulk Import", "/products/import", Upload],
                ["Bulk Export", "/products/export", Download],
                ["Product Analytics", "/products/dashboard", FileBarChart],
              ].map(([label, route, Icon]) => (
                <Link key={String(label)} to={String(route)} className="enterprise-transition flex h-11 items-center gap-3 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white">
                  {typeof Icon !== "string" ? <Icon className="h-4 w-4 text-cyan-300" /> : null}
                  {label}
                </Link>
              ))}
            </div>
          </DashboardWidget>
        </div>
      </section>
    </div>
  );
};

const wizardSteps = [
  "Basic Information",
  "Pricing",
  "SKU",
  "Images",
  "QR Configuration",
  "Warranty",
  "Review",
];

const StepPanel = ({ title, children }: { title: string; children: ReactNode }) => (
  <ReusableFormLayout title={title} description="Static frontend fields for the create product wizard.">
    {children}
  </ReusableFormLayout>
);

export const ProductWizard = ({ product }: { product?: ProductRecord }) => {
  const [step, setStep] = useState(0);

  const stepperItems = wizardSteps.map((title, index) => ({
    id: title,
    title,
    status: index < step ? "complete" : index === step ? "current" : "upcoming",
  })) as Array<{ id: string; title: string; status: "complete" | "current" | "upcoming" }>;

  const stepContent = [
    <StepPanel key="basic" title="Basic Information">
      <TextInput label="Product Name" defaultValue={product?.name || ""} placeholder="Enter product name" />
      <TextInput label="Product Code" defaultValue={product?.code || ""} placeholder="LT-PRODUCT-CODE" />
      <Select label="Category" value={product?.category || ""} onChange={() => undefined} options={optionList(categories)} />
      <Select label="Brand" value={product?.brand || ""} onChange={() => undefined} options={optionList(brands)} />
      <Textarea label="Description" defaultValue={product?.description || ""} className="md:col-span-2" />
      <Textarea label="Short Description" defaultValue={product?.shortDescription || ""} rows={3} className="md:col-span-2" />
      <TextInput label="HSN" defaultValue="3506" />
      <TextInput label="Unit" defaultValue="KG" />
      <Select label="Status" value={product?.status || "Draft"} onChange={() => undefined} options={optionList(statuses)} />
    </StepPanel>,
    <StepPanel key="pricing" title="Pricing">
      <TextInput label="MRP" defaultValue={product?.mrp || ""} />
      <TextInput label="Selling Price" defaultValue="$132" />
      <TextInput label="Dealer Price" defaultValue="$118" />
      <TextInput label="Distributor Price" defaultValue="$104" />
      <TextInput label="GST" defaultValue="18%" />
      <TextInput label="Discount" defaultValue="5%" />
    </StepPanel>,
    <StepPanel key="sku" title="SKU">
      <TextInput label="SKU Code" defaultValue={`${product?.code || "LT-PRODUCT"}-20KG`} />
      <TextInput label="Barcode" defaultValue="8901234567890" />
      <TextInput label="Weight" defaultValue="20 KG" />
      <TextInput label="Dimensions" defaultValue="30 x 24 x 18 cm" />
      <TextInput label="Color" defaultValue="Grey" />
      <TextInput label="Size" defaultValue="20 KG" />
      <TextInput label="Variant" defaultValue="Standard" />
    </StepPanel>,
    <StepPanel key="images" title="Images">
      {["Primary Image", "Gallery", "Thumbnail"].map((label) => (
        <div key={label} className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-4 text-center">
          <ImagePlus className="h-7 w-7 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">{label}</p>
          <p className="mt-1 text-xs text-slate-500">Drag drop placeholder and preview</p>
        </div>
      ))}
    </StepPanel>,
    <StepPanel key="qr" title="QR Configuration">
      <Toggle label="QR Required" checked={product?.qrEnabled ?? true} onChange={() => undefined} />
      <Select label="QR Type" value="Secure" onChange={() => undefined} options={optionList(["Static", "Dynamic", "Secure", "GS1", "Parent Child"])} />
      <Select label="QR Template" value="GS1 Secure Label" onChange={() => undefined} options={optionList(["GS1 Secure Label", "Consumer Verification", "Warranty Label"])} />
    </StepPanel>,
    <StepPanel key="warranty" title="Warranty">
      <Toggle label="Warranty Enabled" checked={product?.warrantyEnabled ?? true} onChange={() => undefined} />
      <TextInput label="Warranty Period" defaultValue={product?.warrantyMonths ? `${product.warrantyMonths} months` : "24 months"} />
      <Toggle label="Extended Warranty" checked onChange={() => undefined} />
      <Textarea label="Claim Rules" defaultValue="Valid invoice, QR scan, product photos and purchase date are required." className="md:col-span-2" />
    </StepPanel>,
    <DashboardWidget key="review" title="Review Everything" subtitle="Validation summary before frontend-only submit.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {["Basic complete", "Pricing complete", "SKU complete", "QR ready", "Warranty ready", "Images pending", "Validation Summary", "Ready to Submit"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-3">
            <CheckCircle2 className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-semibold text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    </DashboardWidget>,
  ];

  return (
    <section className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <DashboardWidget title="Progress Sidebar" subtitle="Auto save and draft placeholders.">
        <div className="space-y-4">
          <Stepper steps={stepperItems} className="grid-cols-1" />
          <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 p-3">
            <p className="text-sm font-semibold text-white">Auto Save Placeholder</p>
            <p className="mt-1 text-xs text-cyan-50/70">Draft saved locally for frontend preview only.</p>
          </div>
        </div>
      </DashboardWidget>
      <div className="space-y-4">
        {stepContent[step]}
        <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950/75 p-4">
          <SecondaryButton disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</SecondaryButton>
          <div className="flex flex-wrap gap-2">
            <SecondaryButton icon={Save}>Save Draft</SecondaryButton>
            {step < wizardSteps.length - 1 ? (
              <PrimaryButton onClick={() => setStep(Math.min(wizardSteps.length - 1, step + 1))}>Continue</PrimaryButton>
            ) : (
              <PrimaryButton icon={CheckCircle2}>Submit</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProductColumnTools = ({
  columns,
  visibleColumns,
  setVisibleColumns,
}: {
  columns: DataTableColumn<ProductRecord>[];
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}) => (
  <div className="space-y-4">
    <ColumnVisibility columns={columns} visibleColumns={visibleColumns} onChange={setVisibleColumns} />
    <DashboardWidget title="Column Reorder" subtitle="Drag handle placeholder for future user preferences.">
      <div className="space-y-2">
        {visibleColumns.slice(0, 6).map((column) => (
          <div key={column} className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
            <GripVertical className="h-4 w-4 text-slate-500" />
            {column}
          </div>
        ))}
      </div>
    </DashboardWidget>
    <DashboardWidget title="Pinned Columns" subtitle="Pin columns placeholder.">
      <div className="flex flex-wrap gap-2">
        {["Image", "Product Name", "Actions"].map((column) => (
          <Badge key={column} tone="info">{column}</Badge>
        ))}
      </div>
    </DashboardWidget>
  </div>
);

export const useProductFiltering = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const haystack = [product.name, product.code, product.brand, product.category, product.status, product.updatedBy || ""].join(" ").toLowerCase();
      const matchesSearch = !normalized || haystack.includes(normalized);
      const matchesCategory = !category || product.category === category;
      const matchesBrand = !brand || product.brand === brand;
      const matchesStatus = !status || product.status === status;
      return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
    });
  }, [brand, category, query, status]);

  return { query, setQuery, category, setCategory, brand, setBrand, status, setStatus, filteredProducts };
};
