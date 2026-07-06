import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  BrainCircuit,
  Download,
  Eye,
  FileSearch,
  Filter,
  MessageCircle,
  RefreshCw,
  ScanSearch,
  Search,
  SearchCheck,
  Send,
  Sparkles,
  Target,
  Upload,
  WandSparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";

type AIMode =
  | "dashboard"
  | "forecasting"
  | "counterfeit-detection"
  | "ocr"
  | "recommendations"
  | "business-intelligence"
  | "chat"
  | "insights";

type AIRow = Record<string, string>;

const modeMeta: Record<AIMode, { title: string; subtitle: string; icon: typeof BrainCircuit }> = {
  dashboard: { title: "AI Dashboard", subtitle: "Unified AI command center for predictive, generative, detection, OCR, and insight surfaces.", icon: BrainCircuit },
  forecasting: { title: "Forecasting", subtitle: "Demand, inventory, sales, warranty, campaign, and channel forecasts ready for model integration.", icon: Activity },
  "counterfeit-detection": { title: "Counterfeit Detection", subtitle: "Suspicious scan clusters, duplicate QR patterns, device anomalies, and fraud investigation queues.", icon: SearchCheck },
  ocr: { title: "OCR", subtitle: "Document extraction, invoice reading, warranty uploads, image capture, and confidence review workflows.", icon: ScanSearch },
  recommendations: { title: "Recommendations", subtitle: "Next best actions, product suggestions, reward recommendations, and channel optimization.", icon: Sparkles },
  "business-intelligence": { title: "Business Intelligence", subtitle: "Executive narratives, natural-language analytics, KPI explanations, and decision intelligence.", icon: BarChart3 },
  chat: { title: "AI Chat", subtitle: "Enterprise AI chat surface for query, analysis, recommendations, and guided workflows.", icon: MessageCircle },
  insights: { title: "Insights", subtitle: "AI-generated insights, anomaly summaries, opportunity signals, and recommended actions.", icon: WandSparkles },
};

const rows: Record<AIMode, AIRow[]> = {
  dashboard: [
    { id: "AI-001", signal: "Sales forecast drift", area: "Sales", confidence: "94%", impact: "$1.2M", owner: "Revenue Ops", status: "Review" },
    { id: "AI-002", signal: "QR anomaly cluster", area: "Anti-counterfeit", confidence: "91%", impact: "18K scans", owner: "Security Ops", status: "High" },
    { id: "AI-003", signal: "Warranty claim pattern", area: "Warranty", confidence: "87%", impact: "2.4K claims", owner: "Service Ops", status: "Monitor" },
  ],
  forecasting: [
    { id: "FRC-001", signal: "SKU demand forecast", area: "Inventory", confidence: "93%", impact: "+18% demand", owner: "Planning", status: "Ready" },
    { id: "FRC-002", signal: "Dealer sales forecast", area: "Sales", confidence: "89%", impact: "$840K upside", owner: "Sales Ops", status: "Review" },
    { id: "FRC-003", signal: "Campaign conversion forecast", area: "Marketing", confidence: "84%", impact: "42K conversions", owner: "Growth", status: "Ready" },
  ],
  "counterfeit-detection": [
    { id: "CFD-001", signal: "Duplicate QR spike", area: "Mumbai West", confidence: "96%", impact: "4,820 scans", owner: "Fraud Team", status: "High" },
    { id: "CFD-002", signal: "Impossible scan velocity", area: "Delhi North", confidence: "91%", impact: "1,240 scans", owner: "Security Ops", status: "Review" },
    { id: "CFD-003", signal: "Batch mismatch", area: "Warehouse B7", confidence: "88%", impact: "320 units", owner: "Quality", status: "Monitor" },
  ],
  ocr: [
    { id: "OCR-001", signal: "Invoice extraction", area: "Distributor invoices", confidence: "97%", impact: "12K docs", owner: "Finance Ops", status: "Ready" },
    { id: "OCR-002", signal: "Warranty proof reading", area: "Warranty uploads", confidence: "92%", impact: "8.4K claims", owner: "Support Ops", status: "Ready" },
    { id: "OCR-003", signal: "Dealer KYC documents", area: "Onboarding", confidence: "89%", impact: "2.1K docs", owner: "Sales Ops", status: "Review" },
  ],
  recommendations: [
    { id: "REC-001", signal: "Next best reward", area: "Consumers", confidence: "88%", impact: "+14% redemption", owner: "Loyalty", status: "Ready" },
    { id: "REC-002", signal: "Dealer action", area: "Dealers", confidence: "86%", impact: "$420K pipeline", owner: "Channel", status: "Review" },
    { id: "REC-003", signal: "Inventory reorder", area: "Warehouse", confidence: "91%", impact: "12 days coverage", owner: "Supply", status: "Ready" },
  ],
  "business-intelligence": [
    { id: "BI-001", signal: "Executive narrative", area: "Revenue", confidence: "94%", impact: "Board pack", owner: "Analytics", status: "Ready" },
    { id: "BI-002", signal: "Root cause summary", area: "Inventory", confidence: "87%", impact: "Alert triage", owner: "Supply", status: "Review" },
    { id: "BI-003", signal: "Dealer explanation", area: "Channel", confidence: "85%", impact: "Performance review", owner: "Sales Ops", status: "Ready" },
  ],
  chat: [
    { id: "CHT-001", signal: "Ask sales trend", area: "Analytics", confidence: "Live", impact: "Natural language", owner: "AI Assistant", status: "Ready" },
    { id: "CHT-002", signal: "Generate report", area: "Reports", confidence: "Live", impact: "Draft narrative", owner: "AI Assistant", status: "Ready" },
    { id: "CHT-003", signal: "Explain QR anomaly", area: "Fraud", confidence: "Live", impact: "Investigation", owner: "AI Assistant", status: "Ready" },
  ],
  insights: [
    { id: "INS-001", signal: "Margin risk", area: "Finance", confidence: "89%", impact: "$340K", owner: "Finance", status: "Review" },
    { id: "INS-002", signal: "Campaign opportunity", area: "Marketing", confidence: "86%", impact: "+18K users", owner: "Growth", status: "Ready" },
    { id: "INS-003", signal: "Warranty anomaly", area: "Service", confidence: "91%", impact: "2.2K products", owner: "Quality", status: "High" },
  ],
};

const trendData = [
  { month: "Jan", signals: 42, resolved: 28, confidence: 82 },
  { month: "Feb", signals: 48, resolved: 34, confidence: 84 },
  { month: "Mar", signals: 61, resolved: 42, confidence: 86 },
  { month: "Apr", signals: 74, resolved: 51, confidence: 88 },
  { month: "May", signals: 88, resolved: 62, confidence: 89 },
  { month: "Jun", signals: 103, resolved: 74, confidence: 91 },
];

const chatPrompts = [
  "Summarize dealer performance for this quarter.",
  "Explain the counterfeit scan cluster in West region.",
  "Forecast inventory risk for top SKUs next month.",
  "Recommend rewards for inactive contractors.",
];

const fieldClass =
  "h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10";

const statusStyles: Record<string, string> = {
  Ready: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  Review: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  High: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  Monitor: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
};

const StatusBadge = ({ value }: { value: string }) => (
  <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[value] || statusStyles.Ready}`}>{value}</span>
);

const Header = ({ mode }: { mode: AIMode }) => {
  const Icon = modeMeta[mode].icon;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">AI Platform</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{modeMeta[mode].title}</h1>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{modeMeta[mode].subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
};

const Metrics = () => {
  const metrics = [
    ["AI Signals", "103", BrainCircuit, "+18.2%"],
    ["Avg Confidence", "91%", Target, "+4.1%"],
    ["Anomalies", "18", AlertTriangle, "Needs review"],
    ["Automations", "42", Bot, "Ready"],
  ];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, Icon, hint]) => (
        <div key={label as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">{hint}</p>
        </div>
      ))}
    </section>
  );
};

const Toolbar = ({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) => (
  <section className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-3 lg:flex-row lg:items-center">
    <label className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} className={`${fieldClass} pl-9`} placeholder="Search AI signals" />
    </label>
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <Filter className="h-4 w-4" />
        Filters
      </button>
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  </section>
);

const DataTable = ({ rows }: { rows: AIRow[] }) => {
  const columns = ["id", "signal", "area", "confidence", "impact", "owner", "status"];

  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-white">AI Work Queue</h2>
          <p className="mt-1 text-xs text-slate-500">Reusable AI table placeholder ready for model-backed data.</p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[980px] gap-4 border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
          {columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {rows.map((row) => (
          <div key={row.id} className="grid min-w-[980px] gap-4 border-b border-slate-800/80 px-4 py-3 text-sm text-slate-300 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(130px, 1fr))` }}>
            {columns.map((column) => (
              <span key={column} className="min-w-0 truncate">
                {column === "status" ? <StatusBadge value={row[column]} /> : row[column]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-slate-800 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {rows.length} signals</span>
        <span>Pagination placeholder</span>
      </div>
    </section>
  );
};

const Charts = () => (
  <section className="grid gap-4 xl:grid-cols-3">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 xl:col-span-2">
      <h2 className="text-sm font-semibold text-white">AI Signal Trend</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Area dataKey="signals" stroke="#22d3ee" fill="#22d3ee33" strokeWidth={2} />
            <Area dataKey="resolved" stroke="#34d399" fill="#34d39922" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <h2 className="text-sm font-semibold text-white">Confidence</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0" }} />
            <Bar dataKey="confidence" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>
);

const ChatPanel = () => (
  <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
    <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-cyan-300" />
        <h2 className="text-sm font-semibold text-white">AI Chat</h2>
      </div>
      <div className="mt-4 space-y-3">
        <div className="max-w-[80%] rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300">
          Ask a question about products, QR scans, customers, inventory, campaigns, or finance.
        </div>
        <div className="ml-auto max-w-[80%] rounded-lg bg-cyan-400 p-3 text-sm font-medium text-slate-950">
          Show me counterfeit risk by region.
        </div>
        <div className="max-w-[80%] rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300">
          Placeholder answer: West region has the highest duplicate scan velocity and needs investigation.
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <input className={fieldClass} placeholder="Ask LoyaltyTown AI" />
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
    <aside className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
      <Sparkles className="h-5 w-5 text-cyan-200" />
      <h2 className="mt-3 text-sm font-semibold text-white">Suggested Prompts</h2>
      <div className="mt-4 space-y-2">
        {chatPrompts.map((prompt) => (
          <button key={prompt} className="w-full rounded-md border border-cyan-400/10 bg-slate-950/50 p-3 text-left text-sm leading-5 text-cyan-50/90">
            {prompt}
          </button>
        ))}
      </div>
    </aside>
  </section>
);

const DocumentPanel = () => (
  <section className="grid gap-4 lg:grid-cols-3">
    {[
      [FileSearch, "Document Extraction", "Invoice, warranty, and KYC OCR review surface."],
      [Eye, "Image Inspection", "Product image and packaging verification placeholder."],
      [ScanSearch, "Confidence Review", "Human review queue for low-confidence extraction."],
    ].map(([Icon, title, detail]) => (
      <div key={title as string} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
        <Icon className="h-5 w-5 text-cyan-300" />
        <h2 className="mt-4 text-sm font-semibold text-white">{title as string}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{detail as string}</p>
      </div>
    ))}
  </section>
);

const AIPlatformWorkspace = ({ mode = "dashboard" }: { mode?: AIMode }) => {
  const [query, setQuery] = useState("");
  const data = rows[mode];
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(q)));
  }, [data, query]);

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      <Header mode={mode} />
      <Metrics />
      <Toolbar query={query} onQueryChange={setQuery} />
      {mode === "chat" ? <ChatPanel /> : null}
      {mode === "ocr" || mode === "counterfeit-detection" ? <DocumentPanel /> : null}
      <DataTable rows={filteredRows} />
      <Charts />
    </div>
  );
};

export default AIPlatformWorkspace;
