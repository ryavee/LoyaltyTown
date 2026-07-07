import { ArrowRight, BadgeCheck, BrainCircuit, Building2, Factory, Gift, QrCode, Route, Sparkles, Store, UsersRound, Wallet2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

const clouds = [
  {
    title: "Super Admin Cloud",
    description: "Platform operations, tenant control, billing, subscriptions, security, and global settings.",
    modules: ["Platform Dashboard", "Companies", "Users", "Plans", "Billing", "White Label"],
    accent: "from-cyan-500/10 to-slate-50",
  },
  {
    title: "Manufacturer Cloud",
    description: "Products, QR engine, traceability, dealer and distributor network, rewards, wallet, and AI analytics.",
    modules: ["Products", "QR Engine", "Traceability", "Campaigns", "Warranty", "AI Assistant"],
    accent: "from-violet-500/10 to-slate-50",
  },
  {
    title: "Distributor Cloud",
    description: "Inventory, stock movement, orders, collections, dispatch, warehouse workflows, and route planning.",
    modules: ["Inventory", "Orders", "Dispatch", "Collections", "Warehouse", "Forecasting"],
    accent: "from-emerald-500/10 to-slate-50",
  },
  {
    title: "Dealer Cloud",
    description: "Multi-brand retail operations, quotes, invoices, leads, loyalty, wallet, and marketplace connections.",
    modules: ["Inventory", "Quotations", "Invoices", "Leads", "Wallet", "Marketplace"],
    accent: "from-amber-500/10 to-slate-50",
  },
  {
    title: "Retailer Cloud",
    description: "Simple POS, inventory, billing, loyalty, offers, and customer service workflows.",
    modules: ["POS Billing", "Inventory", "Offers", "Wallet", "Invoices", "Reports"],
    accent: "from-rose-500/10 to-slate-50",
  },
  {
    title: "Contractor Cloud",
    description: "Projects, site reports, material estimation, warranty records, rewards, and team coordination.",
    modules: ["Projects", "Estimates", "Site Reports", "Rewards", "Warranty", "Supplier Finder"],
    accent: "from-sky-500/10 to-slate-50",
  },
  {
    title: "Customer Cloud",
    description: "Verification, wallet, rewards, cashback, warranty, support, and trusted seller discovery.",
    modules: ["QR Scanner", "Wallet", "Rewards", "Warranty", "Profile", "Support"],
    accent: "from-fuchsia-500/10 to-slate-50",
  },
];

const layers = [
  "Identity Layer",
  "Organization Layer",
  "Partner Network Layer",
  "Commerce Layer",
  "Supply Chain Layer",
  "QR & Traceability Layer",
  "Loyalty & Wallet Layer",
  "AI Layer",
  "Analytics Layer",
  "Integration Layer",
];

const priorities = [
  ["Core Layout", "Role-based dashboards, app shell, and premium navigation are now in place."],
  ["Business Profiles", "Organizations, partners, and role-specific views are surfaced through the product map."],
  ["Products & QR", "Product management and QR workflows are available as dedicated module experiences."],
  ["Marketplace & Wallet", "Verified network discovery and wallet operations are available as premium module pages."],
  ["AI & Analytics", "Intelligence and reporting are already available through dedicated workspace surfaces."],
];

export default function PlatformArchitecturePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Frontend Architecture"
        title="LoyaltyTown Platform Architecture"
        description="A premium operating-system view for manufacturers, distributors, dealers, retailers, contractors, and customers."
        actions={<StatusBadge status="Frontend-first MVP" tone="success" />}
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-700 dark:text-cyan-300">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">One platform, one identity, one network</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">LoyaltyTown is structured as a shared operating system that spans business identity, commerce, supply chain, loyalty, AI, and analytics.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <QrCode className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-semibold">QR & Traceability</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Generate, verify, track, and protect every product journey.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Wallet2 className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-semibold">Wallet & Rewards</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">A single wallet powers points, cashback, loyalty, and payout flows.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <BrainCircuit className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-semibold">AI Assistant</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Embedded intelligence helps teams make faster decisions across the business network.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Building2 className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-semibold">Business Profiles</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Each partner role has a tailored dashboard and product experience.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Platform layers</h2>
          <div className="mt-5 space-y-2">
            {layers.map((layer) => (
              <div key={layer} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
                <span>{layer}</span>
                <BadgeCheck className="h-4 w-4 text-cyan-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Product clouds</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A role-based view of the core business experience across the platform.</p>
          </div>
          <Link to="/business-profiles" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
            Explore business profiles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {clouds.map((cloud) => (
            <article key={cloud.title} className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${cloud.accent} p-5 shadow-sm dark:border-slate-800`}>
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/80 p-2 shadow-sm dark:bg-slate-900/80">
                  {cloud.title.includes("Manufacturer") ? <Factory className="h-4 w-4 text-cyan-600" /> : cloud.title.includes("Distributor") ? <Route className="h-4 w-4 text-cyan-600" /> : cloud.title.includes("Dealer") ? <Store className="h-4 w-4 text-cyan-600" /> : cloud.title.includes("Retailer") ? <Store className="h-4 w-4 text-cyan-600" /> : cloud.title.includes("Contractor") ? <UsersRound className="h-4 w-4 text-cyan-600" /> : cloud.title.includes("Customer") ? <Gift className="h-4 w-4 text-cyan-600" /> : <Building2 className="h-4 w-4 text-cyan-600" />}
                </div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-white">{cloud.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{cloud.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cloud.modules.map((module) => (
                  <span key={module} className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">{module}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">MVP build order</h2>
          <div className="mt-5 grid gap-3">
            {priorities.map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Frontend experience status</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Core layout is live</p>
              <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-400/90">Premium shell, grouped navigation, and role-aware workspaces are in place.</p>
            </div>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/40">
              <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Role-based dashboards are available</p>
              <p className="mt-1 text-sm text-cyan-700/80 dark:text-cyan-400/90">Super admin, manufacturer, distributor, dealer, retailer, and contractor views are surfaced.</p>
            </div>
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-950/40">
              <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">Marketplace, analytics, and AI are active</p>
              <p className="mt-1 text-sm text-violet-700/80 dark:text-violet-400/90">These modules now feel like part of the same operating system.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
