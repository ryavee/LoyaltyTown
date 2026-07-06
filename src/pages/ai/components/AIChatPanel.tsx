import { Bot, Send } from "lucide-react";
import { PrimaryButton, TextInput } from "../../../Components/enterprise";
import { cn, panelBase } from "../../../Components/enterprise/utils";
import { chatHistory, suggestedQuestions } from "../../../data/ai/aiChatDemoData";

export const AIChatPanel = () => (
  <section className={cn(panelBase, "p-4")}>
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300"><Bot className="h-5 w-5" /></div>
      <div>
        <h3 className="text-sm font-semibold text-white">AI Chat Assistant</h3>
        <p className="text-xs text-slate-500">Static assistant UI. No real AI calls are connected.</p>
      </div>
    </div>
    <div className="mt-4 grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Suggested Questions</p>
        {suggestedQuestions.map((question) => (
          <button key={question} className="block w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-left text-sm text-slate-300 hover:bg-slate-800">{question}</button>
        ))}
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
        <div className="space-y-3">
          {chatHistory.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-lg px-3 py-2 text-sm ${message.role === "user" ? "bg-cyan-400 text-slate-950" : "bg-slate-900 text-slate-200"}`}>{message.message}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <TextInput aria-label="Ask AI" placeholder="Ask about dealers, SKUs, campaigns, fraud, or inventory" className="flex-1" />
          <PrimaryButton icon={Send}>Send</PrimaryButton>
        </div>
      </div>
    </div>
  </section>
);
