import { Bot, BrainCircuit, Send, Sparkles, UserRound, Wand2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

const suggestions = [
  "Which dealers are underperforming this week?",
  "Show counterfeit risk by product category",
  "Which ERP sync jobs need attention?",
  "Recommend a campaign for inactive contractors",
  "Summarize reward payout exposure",
];

const messages = [
  {
    role: "assistant",
    text: "Good morning. I reviewed revenue, QR scans, dealer performance, reward payouts, and ERP sync health. Dealer performance is strongest in West, while ERP sync latency needs review for two tenants.",
  },
  {
    role: "user",
    text: "Which actions should I prioritize today?",
  },
  {
    role: "assistant",
    text: "Prioritize three items: resolve ERP sync delays for Metro Distribution, launch WhatsApp nudges for warranty registration, and review reward payout holds above $10K.",
  },
];

const insights = [
  ["Dealer Risk", "31 dealers missed weekly target; 12 are high-value accounts."],
  ["QR Growth", "Scan velocity is up 18% after the latest product verification campaign."],
  ["ERP Health", "98% sync health overall, but two integrations show delayed inventory pushes."],
];

export default function AIAssistant() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Copilot"
        title="AI Assistant"
        description="Premium chat workspace for asking operational questions across revenue, QR scans, partners, campaigns, rewards, ERP sync, and customer journeys."
        actions={<StatusBadge status="Static Demo Mode" tone="info" />}
      />

      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-950 dark:text-white">LoyaltyTown Intelligence</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ask about network health, growth, risk, and recommendations.</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5">
            {messages.map((message, index) => {
              const isAssistant = message.role === "assistant";
              return (
                <div key={index} className={`flex gap-3 ${isAssistant ? "" : "justify-end"}`}>
                  {isAssistant ? (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-700 dark:text-cyan-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  ) : null}
                  <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-6 ${isAssistant ? "bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300" : "bg-slate-950 text-white dark:bg-cyan-400 dark:text-slate-950"}`}>
                    {message.text}
                  </div>
                  {!isAssistant ? (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <UserRound className="h-4 w-4" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap gap-2 pb-4">
              {suggestions.slice(0, 3).map((suggestion) => (
                <button key={suggestion} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950">
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950">
              <input className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none dark:text-white" placeholder="Ask LoyaltyTown AI anything..." />
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-cyan-500" />
              <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Suggested Questions</h2>
            </div>
            <div className="mt-4 space-y-2">
              {suggestions.map((suggestion) => (
                <button key={suggestion} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950">
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-cyan-500" />
              <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Insight Cards</h2>
            </div>
            <div className="mt-4 space-y-3">
              {insights.map(([title, detail]) => (
                <article key={title} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
