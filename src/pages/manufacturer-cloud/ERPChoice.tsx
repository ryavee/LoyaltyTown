import { ArrowRight, Cable, CheckCircle2, DatabaseZap } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const choices = [
  {
    title: "Connect Existing ERP",
    description: "Integrate SAP, Oracle, Microsoft Dynamics, Tally, Zoho, NetSuite, or a custom ERP while LoyaltyTown powers QR, rewards, traceability, and channel cloud workflows.",
    href: "/erp/integrations",
    icon: Cable,
    points: ["ERP connector readiness", "API and file sync placeholders", "Data mapping workspace"],
  },
  {
    title: "Use LoyaltyTown ERP",
    description: "Run lightweight manufacturing ERP inside LoyaltyTown for products, procurement, inventory, warehouse, production, finance, and channel operations.",
    href: "/erp/loyaltytown-erp",
    icon: DatabaseZap,
    points: ["Native manufacturing workflows", "Connected QR and loyalty data", "Multi-tenant ready foundation"],
  },
];

export default function ERPChoice() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="ERP Strategy" title="Choose Your ERP Path" description="Decide whether this manufacturer connects an existing ERP or starts with LoyaltyTown ERP as the operational backbone." />
      <section className="grid gap-5 lg:grid-cols-2">
        {choices.map((choice) => {
          const Icon = choice.icon;
          return (
            <Link key={choice.title} to={choice.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-cyan-400/40">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <Icon className="h-7 w-7" />
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-950 dark:text-white">{choice.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{choice.description}</p>
              <div className="mt-5 space-y-2">
                {choice.points.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                    {point}
                  </div>
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
