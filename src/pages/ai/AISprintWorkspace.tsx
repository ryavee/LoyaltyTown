import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bot, BrainCircuit, Download, RefreshCw, ShieldAlert, Upload } from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import { AdvancedFilters, EmptyState, KPIGrid, PageToolbar, Pagination, SearchInput, SecondaryButton, Select } from "../../Components/enterprise";
import { cn, panelBase } from "../../Components/enterprise/utils";
import { aiDecisionRows, aiInsights, aiKpis } from "../../data/ai/aiDashboardDemoData";
import { counterfeitAlerts, regionRiskRows } from "../../data/ai/counterfeitDemoData";
import { forecastRows } from "../../data/ai/forecastDemoData";
import { fraudAlerts, riskRules } from "../../data/ai/fraudDemoData";
import { inventoryPredictions } from "../../data/ai/inventoryPredictionDemoData";
import { models, aiReports } from "../../data/ai/modelGovernanceDemoData";
import { ocrRows } from "../../data/ai/ocrDemoData";
import { recommendations } from "../../data/ai/recommendationDemoData";
import { segments } from "../../data/ai/segmentationDemoData";
import { AIChatPanel } from "./components/AIChatPanel";
import { AICharts, ForecastChart } from "./components/AICharts";
import { AIInsightCard, AIReportCard, ModelPerformanceCard, OCRPreviewCard, RecommendationCard, RiskTimeline, SegmentCard } from "./components/AICards";
import { FraudStatusBadge, RiskScoreBadge } from "./components/AIStatusBadges";
import { ForecastTable, FraudAlertTable, GenericAITables, ModelRegistryTable, OCRResultTable } from "./components/AITables";

type AIMode =
  | "dashboard"
  | "fraud"
  | "fraud-details"
  | "counterfeit"
  | "forecasting"
  | "inventory-prediction"
  | "ocr"
  | "segmentation"
  | "recommendations"
  | "assistant"
  | "models"
  | "model-details"
  | "reports";

const meta: Record<AIMode, { title: string; description: string; label: string }> = {
  dashboard: { title: "AI Dashboard", description: "AI predictions, fraud alerts, OCR, recommendations, counterfeit risk, demand alerts, inventory alerts, and model confidence.", label: "AI Dashboard" },
  fraud: { title: "Fraud Detection", description: "Fraud alert list, review queue, risk rules, duplicate scans, geo velocity, device abuse, wallet abuse, warranty fraud, payout risk, and QR clones.", label: "Fraud" },
  "fraud-details": { title: "Fraud Alert Details", description: "Fraud alert details, risk score, matched rules, review queue, and decision timeline.", label: "Fraud" },
  counterfeit: { title: "Counterfeit Detection", description: "Counterfeit alerts, QR clone detection, region risk map placeholder, batch risk, and product risk.", label: "Counterfeit" },
  forecasting: { title: "Demand Forecasting", description: "Demand forecast dashboard, product, SKU, region, dealer forecasts, and forecast details.", label: "Forecasting" },
  "inventory-prediction": { title: "Inventory Prediction", description: "Low stock prediction, stockout risk, dead stock prediction, and reorder suggestions.", label: "Inventory Prediction" },
  ocr: { title: "OCR / Receipt Verification", description: "Receipt upload placeholder, OCR result preview, verification queue, failed OCR cases, and confidence scores.", label: "OCR" },
  segmentation: { title: "Customer Segmentation", description: "AI segments, high value customers, dormant customers, churn risk, and repeat buyers.", label: "Segmentation" },
  recommendations: { title: "Recommendation Engine", description: "Product, reward, campaign, dealer, and reorder recommendations.", label: "Recommendations" },
  assistant: { title: "AI Chat Assistant", description: "AI chat, suggested questions, query history, and insight cards. Static UI only.", label: "AI Assistant" },
  models: { title: "AI Model Governance", description: "Model registry, versions, accuracy, drift, retraining history, and tenant opt-in settings.", label: "Model Governance" },
  "model-details": { title: "Model Details", description: "Model versions, accuracy, drift, retraining history, and tenant opt-in settings.", label: "Model Governance" },
  reports: { title: "AI Reports", description: "Fraud accuracy, forecast accuracy, OCR accuracy, recommendation performance, and AI decision audit reports.", label: "AI Reports" },
};

const useFilteredRows = <T extends Record<string, unknown>>(rows: T[], query: string) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(q)));
  }, [rows, query]);

const Header = ({ mode }: { mode: AIMode }) => {
  const current = meta[mode];
  return (
    <PageToolbar
      title={current.title}
      description={current.description}
      start={
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            {mode.includes("fraud") || mode === "counterfeit" ? <ShieldAlert className="h-5 w-5" /> : mode === "assistant" ? <Bot className="h-5 w-5" /> : <BrainCircuit className="h-5 w-5" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">AI Platform</p>
        </div>
      }
      end={
        <>
          <Link to="/ai-assistant" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            <Bot className="h-4 w-4" />Open Assistant
          </Link>
          <SecondaryButton icon={Upload}>Upload</SecondaryButton>
          <SecondaryButton icon={Download}>Export</SecondaryButton>
          <SecondaryButton icon={RefreshCw}>Refresh</SecondaryButton>
        </>
      }
    />
  );
};

const FilterBar = ({ query, setQuery, label }: { query: string; setQuery: (value: string) => void; label: string }) => (
  <AdvancedFilters title={`${label} filters`} activeCount={0}>
    <SearchInput value={query} onChange={setQuery} placeholder={`Search ${label.toLowerCase()}`} />
    <Select label="Status" value="" onChange={() => undefined} placeholder="All statuses" options={["Ready", "Review", "Monitor", "High", "Active", "Failed"].map((value) => ({ label: value, value }))} />
    <Select label="Risk" value="" onChange={() => undefined} placeholder="All risk levels" options={["Low", "Medium", "High", "Critical"].map((value) => ({ label: value, value }))} />
  </AdvancedFilters>
);

const Dashboard = () => (
  <>
    <KPIGrid items={aiKpis} />
    <AICharts />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {aiInsights.map((item) => <AIInsightCard key={item.id} item={item} />)}
    </section>
    <GenericAITables rows={aiDecisionRows} />
  </>
);

const FraudDetails = () => {
  const { id } = useParams();
  const alert = fraudAlerts.find((item) => item.id === id) || fraudAlerts[0];
  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <section className={cn(panelBase, "p-4")}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{alert.alertId}</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">{alert.fraudType}</h2>
            <p className="mt-2 text-sm text-slate-400">{alert.entity} • {alert.region}</p>
          </div>
          <RiskScoreBadge score={alert.riskScore} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(alert).filter(([key]) => key !== "id").map(([key, value]) => (
            <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <div className="mt-2 text-sm font-semibold text-white">{key === "status" ? <FraudStatusBadge status={String(value)} /> : String(value)}</div>
            </div>
          ))}
        </div>
      </section>
      <RiskTimeline />
      <section className={cn(panelBase, "p-4 xl:col-span-2")}>
        <h3 className="mb-4 text-sm font-semibold text-white">Risk Rules</h3>
        <GenericAITables rows={riskRules} />
      </section>
    </div>
  );
};

const CounterfeitView = () => (
  <>
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <GenericAITables rows={counterfeitAlerts} />
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Region Risk Map Placeholder</h3>
        <div className="mt-4 grid min-h-72 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/60 text-center">
          <div>
            <ShieldAlert className="mx-auto h-8 w-8 text-cyan-300" />
            <p className="mt-2 text-sm font-medium text-slate-200">Geo-risk heatmap placeholder</p>
            <p className="mt-1 text-xs text-slate-500">Static UI only, ready for map provider integration.</p>
          </div>
        </div>
      </section>
    </div>
    <GenericAITables rows={regionRiskRows} />
  </>
);

const OCRView = ({ query }: { query: string }) => {
  const filtered = useFilteredRows(ocrRows, query);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {ocrRows.map((record) => <OCRPreviewCard key={record.id} record={record} />)}
      </div>
      <OCRResultTable rows={filtered} />
    </>
  );
};

const ModelDetails = () => {
  const { id } = useParams();
  const model = models.find((item) => item.id === id) || models[0];
  return (
    <div className="space-y-4">
      <ModelPerformanceCard model={model} />
      <section className={cn(panelBase, "p-4")}>
        <h3 className="text-sm font-semibold text-white">Versions, Accuracy, Drift, Retraining History, Tenant Opt-in Settings</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(model).filter(([key]) => key !== "id").map(([key, value]) => (
            <div key={key} className="rounded-md border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="mt-2 text-sm font-semibold text-white">{String(value)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const AISprintWorkspace = ({ mode = "dashboard" }: { mode?: AIMode }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const current = meta[mode];
  const filteredFraud = useFilteredRows(fraudAlerts, query);
  const filteredForecast = useFilteredRows(forecastRows, query);
  const filteredInventory = useFilteredRows(inventoryPredictions, query);
  const filteredModels = useFilteredRows(models, query);
  const filteredReports = useFilteredRows(aiReports, query);
  const showFilters = ["fraud", "forecasting", "inventory-prediction", "ocr", "models", "reports"].includes(mode);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      {showFilters ? <FilterBar query={query} setQuery={setQuery} label={current.label} /> : null}
      {mode === "dashboard" ? <Dashboard /> : null}
      {mode === "fraud" ? <><FraudAlertTable rows={filteredFraud} /><GenericAITables rows={riskRules} /></> : null}
      {mode === "fraud-details" ? <FraudDetails /> : null}
      {mode === "counterfeit" ? <CounterfeitView /> : null}
      {mode === "forecasting" ? <><ForecastChart /><ForecastTable rows={filteredForecast} /></> : null}
      {mode === "inventory-prediction" ? <GenericAITables rows={filteredInventory} /> : null}
      {mode === "ocr" ? <OCRView query={query} /> : null}
      {mode === "segmentation" ? <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{segments.map((segment) => <SegmentCard key={segment.id} segment={segment} />)}</section> : null}
      {mode === "recommendations" ? <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{recommendations.map((item) => <RecommendationCard key={item.id} item={item} />)}</section> : null}
      {mode === "assistant" ? <><AIChatPanel /><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{aiInsights.map((item) => <AIInsightCard key={item.id} item={item} />)}</section></> : null}
      {mode === "models" ? <><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{models.map((model) => <ModelPerformanceCard key={model.id} model={model} />)}</div><ModelRegistryTable rows={filteredModels} /></> : null}
      {mode === "model-details" ? <ModelDetails /> : null}
      {mode === "reports" ? <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{filteredReports.map((report) => <AIReportCard key={report.id} report={report} />)}</section> : null}
      {showFilters ? <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Static records for ${current.title}`} /> : null}
      {!meta[mode] ? <EmptyState title="AI workspace ready" /> : null}
    </div>
  );
};

export default AISprintWorkspace;
