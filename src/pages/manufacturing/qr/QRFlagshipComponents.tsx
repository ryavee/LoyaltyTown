import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  FileText,
  Gift,
  Globe2,
  Layers3,
  Paintbrush,
  QrCode,
  ShieldAlert,
  Sparkles,
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  ChartCard,
  DashboardWidget,
  EnterpriseDataTable,
  KPIGrid,
  PrimaryButton,
  ReusableFormLayout,
  Select,
  TextInput,
  Toggle,
} from "../../../Components/enterprise";
import type { DataTableColumn } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { qrBatches } from "../../../data/qr/qrBatchDemoData";
import { securityEvents } from "../../../data/qr/securityDemoData";
import {
  qrAiInsights,
  qrDeviceTypes,
  qrExecutiveKpis,
  qrGenerationTrend,
  qrPrintJobs,
  qrRecentScans,
  qrRegionWiseScans,
  qrScanSources,
  qrTemplateData,
  qrTopCampaigns,
  qrTopDealers,
  qrTopProducts,
  qrWarrantyActivations,
} from "../../../data/qr/qrPlatformDemoData";
import { QrStatusBadge } from "./QrStatusBadge";

const tooltipStyle = {
  contentStyle: { background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" },
  labelStyle: { color: "#f8fafc" },
};

const ChartShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <ChartCard title={title} description={description} framed={false} minHeight="300px" contentClassName="h-[300px]">
    {children}
  </ChartCard>
);

const CompactTable = <T extends { id: string }>({ title, subtitle, rows, columns }: { title: string; subtitle: string; rows: T[]; columns: DataTableColumn<T>[] }) => (
  <DashboardWidget title={title} subtitle={subtitle}>
    <EnterpriseDataTable rows={rows} columns={columns} className="border-slate-800 bg-slate-950/40" />
  </DashboardWidget>
);

export const QRDashboard = () => {
  const productColumns: DataTableColumn<(typeof qrTopProducts)[number]>[] = [
    { id: "name", header: "Product", accessor: "name" },
    { id: "scans", header: "Scans", accessor: "scans", align: "right" },
    { id: "activations", header: "Activations", accessor: "activations", align: "right" },
    { id: "risk", header: "Risk", accessor: "risk", cell: (row) => <QrStatusBadge status={row.risk} /> },
  ];
  const dealerColumns: DataTableColumn<(typeof qrTopDealers)[number]>[] = [
    { id: "name", header: "Dealer", accessor: "name" },
    { id: "region", header: "Region", accessor: "region" },
    { id: "scans", header: "Scans", accessor: "scans", align: "right" },
    { id: "conversion", header: "Conversion", accessor: "conversion", align: "right" },
  ];
  const campaignColumns: DataTableColumn<(typeof qrTopCampaigns)[number]>[] = [
    { id: "name", header: "Campaign", accessor: "name" },
    { id: "scans", header: "Scans", accessor: "scans", align: "right" },
    { id: "rewards", header: "Rewards", accessor: "rewards", align: "right" },
    { id: "roi", header: "ROI", accessor: "roi", align: "right" },
  ];

  return (
    <div className="space-y-5">
      <KPIGrid items={qrExecutiveKpis} />
      <section className="grid gap-4 xl:grid-cols-2">
        <ChartShell title="QR Generation Trend" description="Monthly QR generation in millions.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={qrGenerationTrend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="generated" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartShell>
        <ChartShell title="Scan Trend" description="Scan and activation trend.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={qrGenerationTrend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="scans" fill="#34d399" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="activations" stroke="#f472b6" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartShell>
        <ChartShell title="Region Wise Scans" description="Regional scans and unique customer participation.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qrRegionWiseScans}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="scans" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              <Bar dataKey="customers" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
        <ChartShell title="Device Type" description="Device type split by scan volume.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qrDeviceTypes}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="scans" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
        <ChartShell title="Scan Source" description="Scan source and conversion quality.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={qrScanSources}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="source" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="scans" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="conversion" stroke="#f472b6" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartShell>
        <ChartShell title="Risk Trend" description="Fraud and counterfeit risk score movement.">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={qrGenerationTrend}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="risk" stroke="#fb7185" fill="#fb718533" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartShell>
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <CompactTable title="Top Products" subtitle="Protected products by scan performance." rows={qrTopProducts} columns={productColumns} />
        <CompactTable title="Top Dealers" subtitle="Dealer scans and conversion." rows={qrTopDealers} columns={dealerColumns} />
        <CompactTable title="Top Campaigns" subtitle="Campaign performance from scan journeys." rows={qrTopCampaigns} columns={campaignColumns} />
      </section>
      <section className="grid gap-4 xl:grid-cols-5">
        <DashboardWidget title="Recent QR Batches" subtitle="Latest batch activity.">
          <div className="space-y-3">
            {qrBatches.slice(0, 4).map((batch) => <MiniRow key={batch.id} title={batch.batchName} detail={`${batch.generated} generated / ${batch.activated} activated`} status={batch.status} />)}
          </div>
        </DashboardWidget>
        <DashboardWidget title="Recent Scans" subtitle="Live scan registry preview.">
          <div className="space-y-3">
            {qrRecentScans.map((scan) => <MiniRow key={scan.id} title={scan.serial} detail={`${scan.product} / ${scan.city} / ${scan.time}`} status={scan.risk} />)}
          </div>
        </DashboardWidget>
        <DashboardWidget title="Recent Fraud Alerts" subtitle="High signal events.">
          <div className="space-y-3">
            {securityEvents.map((event) => <MiniRow key={event.id} title={event.event} detail={`${event.serial} / ${event.location}`} status={event.severity} />)}
          </div>
        </DashboardWidget>
        <DashboardWidget title="Recent Warranty Activations" subtitle="QR-assisted warranty starts.">
          <div className="space-y-3">
            {qrWarrantyActivations.map((item) => <MiniRow key={item.id} title={item.customer} detail={`${item.product} / ${item.serial}`} status={item.status} />)}
          </div>
        </DashboardWidget>
        <DashboardWidget title="AI QR Insights" subtitle="Static QR intelligence cards." actions={<Sparkles className="h-5 w-5 text-cyan-200" />}>
          <div className="space-y-3">
            {qrAiInsights.map((insight) => <MiniRow key={insight.id} title={insight.title} detail={insight.detail} status={insight.severity} />)}
          </div>
        </DashboardWidget>
      </section>
    </div>
  );
};

const MiniRow = ({ title, detail, status }: { title: string; detail: string; status?: string }) => (
  <div className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-200">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
      </div>
      {status ? <QrStatusBadge status={status} /> : null}
    </div>
  </div>
);

export const BatchProgressCard = ({ generated = "0", printed = "0", activated = "0", claimed = "0" }) => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">Batch Progress Visualization</h3>
    <div className="mt-4 grid gap-3 md:grid-cols-4">
      {[
        ["Generated", generated, "bg-cyan-400"],
        ["Printed", printed, "bg-violet-400"],
        ["Activated", activated, "bg-emerald-400"],
        ["Claimed", claimed, "bg-amber-400"],
      ].map(([label, value, color]) => (
        <div key={label} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-semibold text-white">{value}</p>
          <div className="mt-3 h-1.5 rounded-full bg-slate-800">
            <div className={cn("h-full rounded-full", color)} style={{ width: label === "Generated" ? "100%" : label === "Printed" ? "86%" : label === "Activated" ? "58%" : "42%" }} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const QRPrintJobTable = () => {
  const columns: DataTableColumn<(typeof qrPrintJobs)[number]>[] = [
    { id: "job", header: "Print Job", accessor: "job" },
    { id: "printer", header: "Printer", accessor: "printer" },
    { id: "batch", header: "Batch", accessor: "batch" },
    { id: "quantity", header: "Quantity", accessor: "quantity", align: "right" },
    { id: "status", header: "Status", cell: (row) => <QrStatusBadge status={row.status} /> },
  ];
  return <EnterpriseDataTable title="Print Jobs" description="Queue, PDF, CSV, ZIP, templates and label preview jobs." rows={qrPrintJobs} columns={columns} showExportPlaceholder />;
};

export const QRTemplateEditor = () => {
  const columns: DataTableColumn<(typeof qrTemplateData)[number]>[] = [
    { id: "name", header: "Template", accessor: "name" },
    { id: "logoPosition", header: "Logo Position", accessor: "logoPosition" },
    { id: "color", header: "Color", accessor: "color" },
    { id: "frame", header: "Frame", accessor: "frame" },
    { id: "label", header: "Label", accessor: "label" },
    { id: "status", header: "Status", cell: (row) => <QrStatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-5">
      <ReusableFormLayout title="Create QR Template" description="Logo position, color, frame, label, branding and live preview." columns={3}>
        <TextInput label="Template Name" defaultValue="GS1 Secure Label" />
        <Select label="Logo Position" value="Top" onChange={() => undefined} options={["Top", "Center", "Bottom"].map((value) => ({ label: value, value }))} />
        <TextInput label="Color" defaultValue="#22d3ee" />
        <Select label="Frame" value="Rounded" onChange={() => undefined} options={["Rounded", "Square", "Industrial"].map((value) => ({ label: value, value }))} />
        <TextInput label="Label" defaultValue="Scan to Verify" />
        <Toggle label="Branding" checked onChange={() => undefined} />
      </ReusableFormLayout>
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <EnterpriseDataTable rows={qrTemplateData} columns={columns} />
        <GS1PreviewCard title="Template Preview" />
      </section>
    </div>
  );
};

export const GS1PreviewCard = ({ title = "GS1 Digital Link Preview" }: { title?: string }) => (
  <section className={cn(panelBase, "p-5")}>
    <div className="flex items-center gap-2">
      <Globe2 className="h-5 w-5 text-cyan-300" />
      <h3 className="text-base font-semibold text-white">{title}</h3>
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-[140px_1fr]">
      <div className="grid h-32 w-32 grid-cols-8 gap-1 rounded-lg border border-slate-700 bg-white p-3">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index} className={cn("rounded-[2px]", index % 3 === 0 || [0, 1, 8, 56, 57, 63].includes(index) ? "bg-slate-950" : "bg-slate-100")} />
        ))}
      </div>
      <div className="space-y-3">
        <Badge tone="success">GTIN Valid</Badge>
        <p className="break-all rounded-md border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-300">https://id.gs1.org/01/08901234567890/21/ADH-2026-000001/10/BCH-2026-001</p>
        <p className="text-sm text-slate-500">Resolver, GTIN validation, parser, and product landing preview placeholder.</p>
      </div>
    </div>
  </section>
);

export const ScanHeatmapPlaceholder = () => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">Heatmap Placeholder</h3>
    <div className="mt-4 grid h-72 grid-cols-12 gap-1 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
      {Array.from({ length: 144 }).map((_, index) => (
        <span key={index} className={cn("rounded-sm", index % 11 === 0 ? "bg-rose-400/80" : index % 7 === 0 ? "bg-amber-400/70" : index % 5 === 0 ? "bg-cyan-400/70" : "bg-slate-800/80")} />
      ))}
    </div>
  </section>
);

export const QRSecurityCard = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <ShieldAlert className="h-5 w-5 text-rose-300" />
        <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
      </div>
      <QrStatusBadge status={status} />
    </div>
  </article>
);

export const PublicLandingPreview = () => (
  <section className="grid gap-4 lg:grid-cols-[0.75fr_1fr]">
    <div className={cn(panelBase, "overflow-hidden")}>
      <div className="border-b border-slate-800 p-4">
        <h3 className="text-sm font-semibold text-white">Public Landing Page Preview</h3>
        <p className="mt-1 text-xs text-slate-500">Product, registration, reward, warranty and success states.</p>
      </div>
      <div className="p-4">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/30">
          <div className="bg-cyan-400 p-4 text-slate-950">
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Genuine Product</p>
            <h3 className="mt-2 text-xl font-black">Premium Cement 50kg</h3>
          </div>
          <div className="space-y-3 p-4">
            {[
              ["Product", PackageIcon],
              ["Registration", BadgeCheck],
              ["Reward", Gift],
              ["Warranty", FileText],
              ["Success", ShieldAlert],
            ].map(([label, Icon]) => (
              <div key={String(label)} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3">
                {typeof Icon !== "string" ? <Icon className="h-4 w-4 text-cyan-300" /> : null}
                <span className="text-sm font-semibold text-slate-200">{String(label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <DashboardWidget title="Preview Actions" subtitle="Brandable public scan states for future consumer experiences.">
      <div className="grid gap-3 md:grid-cols-2">
        {["Product", "Registration", "Reward", "Warranty", "Success"].map((state) => (
          <Link key={state} to="/public-scan" className="enterprise-transition rounded-md border border-slate-800 bg-slate-900 p-4 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white">
            {state} preview
          </Link>
        ))}
      </div>
      <PrimaryButton className="mt-4" icon={Paintbrush}>Open Branding Preview</PrimaryButton>
    </DashboardWidget>
  </section>
);

const PackageIcon = Layers3;
