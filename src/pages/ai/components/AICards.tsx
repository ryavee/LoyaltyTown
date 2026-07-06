import { Bot, FileText, Lightbulb, ScanText, Sparkles } from "lucide-react";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { FraudStatusBadge, RiskScoreBadge } from "./AIStatusBadges";

export const AIInsightCard = ({ item }: { item: { title: string; insight: string; severity: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <Lightbulb className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{item.insight}</p>
    <div className="mt-4"><FraudStatusBadge status={item.severity} /></div>
  </article>
);

export const OCRPreviewCard = ({ record }: { record: { receiptImage: string; invoiceNumber: string; dealer: string; product: string; amount: string; purchaseDate: string; confidenceScore: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <div className="grid min-h-36 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/60">
      <ScanText className="h-8 w-8 text-cyan-300" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-white">{record.invoiceNumber}</h3>
    <p className="mt-1 text-sm text-slate-400">{record.dealer} • {record.product}</p>
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Amount</p><p className="font-semibold text-white">{record.amount}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Confidence</p><p className="font-semibold text-white">{record.confidenceScore}</p></div>
    </div>
  </article>
);

export const RecommendationCard = ({ item }: { item: { type: string; audience: string; recommendation: string; lift: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <Sparkles className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{item.type}</h3>
    <p className="mt-2 text-sm text-slate-400">{item.recommendation}</p>
    <p className="mt-3 text-xs text-slate-500">{item.audience} • {item.lift}</p>
    <div className="mt-4"><FraudStatusBadge status={item.status} /></div>
  </article>
);

export const SegmentCard = ({ segment }: { segment: { segment: string; audience: string; conversion: string; churnRisk: string; recommendation: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">{segment.segment}</h3>
    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Audience</p><p className="font-semibold text-white">{segment.audience}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Conv.</p><p className="font-semibold text-white">{segment.conversion}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Risk</p><p className="font-semibold text-white">{segment.churnRisk}</p></div>
    </div>
    <p className="mt-3 text-sm text-slate-400">{segment.recommendation}</p>
  </article>
);

export const ModelPerformanceCard = ({ model }: { model: { model: string; accuracy: string; drift: string; version: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <Bot className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{model.model}</h3>
    <p className="mt-1 text-xs text-slate-500">{model.version}</p>
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Accuracy</p><p className="font-semibold text-white">{model.accuracy}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Drift</p><p className="font-semibold text-white">{model.drift}</p></div>
    </div>
  </article>
);

export const AIReportCard = ({ report }: { report: { report: string; metric: string; score: string; owner: string; status: string } }) => (
  <article className={cn(panelBase, "p-4")}>
    <FileText className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{report.report}</h3>
    <p className="mt-2 text-sm text-slate-400">{report.metric}: {report.score}</p>
    <p className="mt-2 text-xs text-slate-500">{report.owner}</p>
    <div className="mt-4"><FraudStatusBadge status={report.status} /></div>
  </article>
);

export const RiskTimeline = () => (
  <section className={cn(panelBase, "p-4")}>
    <h3 className="text-sm font-semibold text-white">Decision Timeline</h3>
    <div className="mt-4 space-y-4">
      {["Signal detected", "Risk rules matched", "Review assigned", "Decision pending"].map((item, index) => (
        <div key={item} className="relative border-l border-slate-800 pl-4">
          <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-cyan-300" />
          <p className="text-sm font-semibold text-slate-100">{item}</p>
          <p className="mt-1 text-xs text-slate-500">Step {index + 1}</p>
        </div>
      ))}
    </div>
  </section>
);

export { RiskScoreBadge };
