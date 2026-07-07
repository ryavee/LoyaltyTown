import { ArrowRight, ShieldCheck, SlidersHorizontal, Sparkles, Users, Workflow } from "lucide-react";

const modules = [
  {
    title: "Workspace configuration",
    description: "Shape regions, defaults, and operating preferences for your rollout.",
    icon: SlidersHorizontal,
  },
  {
    title: "Access & permissions",
    description: "Keep teams, owners, and approval rules aligned across every module.",
    icon: ShieldCheck,
  },
  {
    title: "Automation controls",
    description: "Tune notifications, sync rules, and workflow handoffs in one place.",
    icon: Workflow,
  },
  {
    title: "Team collaboration",
    description: "Coordinate admin, support, and operations with a premium control center.",
    icon: Users,
  },
];

export default function PlatformSettings() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#f4f7fb_100%)] p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-8 shadow-[0_20px_70px_-28px_rgba(15,23,42,0.24)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                <Sparkles className="h-4 w-4" />
                Platform settings
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  A polished control center for your LoyaltyTown workspace.
                </h1>
                <p className="text-base leading-7 text-slate-600">
                  This section is ready for your configuration workflows, permissions, and operating rules without interrupting the rest of the experience.
                </p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Open settings suite
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.title}
                className="rounded-[24px] border border-slate-200 bg-white/80 p-6 shadow-sm shadow-slate-200/60"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
