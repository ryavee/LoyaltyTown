import { CalendarClock, CheckCircle2, FileBadge, Map, Route, ShieldCheck, Ticket, UserRound, Wrench } from "lucide-react";
import { SecondaryButton } from "../../../Components/enterprise";
import type { WarrantyRecord } from "../../../data/service/warrantyDemoData";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

const panel = "rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow-sm shadow-black/10";

type TimelineItem = {
  title: string;
  description: string;
  time: string;
};

const defaultTimeline: TimelineItem[] = [
  { title: "Registered", description: "Warranty linked with verified QR and invoice.", time: "Jul 05, 2026" },
  { title: "Inspection", description: "Technician assessment queued for field visit.", time: "Jul 06, 2026" },
  { title: "Resolution", description: "Approval, repair, replacement, or closure outcome.", time: "Pending" },
];

export const WarrantyCard = ({ warranty }: { warranty: WarrantyRecord }) => (
  <article className={panel}>
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{warranty.id}</p>
        <h3 className="mt-1 text-base font-semibold text-white">{warranty.product}</h3>
        <p className="mt-1 text-sm text-slate-400">{warranty.customer} • {warranty.sku}</p>
      </div>
      <ServiceStatusBadge status={warranty.status} />
    </div>
    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <div><dt className="text-slate-500">Serial</dt><dd className="font-medium text-slate-200">{warranty.serialNumber}</dd></div>
      <div><dt className="text-slate-500">QR Code</dt><dd className="font-medium text-slate-200">{warranty.qrCode}</dd></div>
      <div><dt className="text-slate-500">Warranty End</dt><dd className="font-medium text-slate-200">{warranty.warrantyEnd}</dd></div>
      <div><dt className="text-slate-500">Dealer</dt><dd className="font-medium text-slate-200">{warranty.dealer}</dd></div>
    </dl>
  </article>
);

export const WarrantyTimeline = ({ items = defaultTimeline }: { items?: TimelineItem[] }) => (
  <div className={panel}>
    <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><CalendarClock className="h-4 w-4 text-cyan-300" />Warranty Timeline</h3>
    <div className="mt-4 space-y-4">
      {items.map((item) => (
        <div key={item.title} className="relative border-l border-slate-800 pl-4">
          <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-cyan-300" />
          <p className="text-sm font-semibold text-slate-100">{item.title}</p>
          <p className="mt-1 text-sm text-slate-400">{item.description}</p>
          <p className="mt-1 text-xs text-slate-500">{item.time}</p>
        </div>
      ))}
    </div>
  </div>
);

export const WarrantyCertificate = ({ warranty }: { warranty: WarrantyRecord }) => (
  <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-5">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">Warranty Certificate</p>
        <h3 className="mt-1 text-xl font-semibold text-white">{warranty.product}</h3>
      </div>
      <FileBadge className="h-8 w-8 text-cyan-300" />
    </div>
    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
      <div><p className="text-slate-500">Customer</p><p className="font-medium text-slate-100">{warranty.customer}</p></div>
      <div><p className="text-slate-500">Serial</p><p className="font-medium text-slate-100">{warranty.serialNumber}</p></div>
      <div><p className="text-slate-500">Start</p><p className="font-medium text-slate-100">{warranty.warrantyStart}</p></div>
      <div><p className="text-slate-500">End</p><p className="font-medium text-slate-100">{warranty.warrantyEnd}</p></div>
    </div>
  </section>
);

export const ClaimTimeline = WarrantyTimeline;

export const TicketTimeline = ({ status = "Open" }: { status?: string }) => (
  <WarrantyTimeline
    items={[
      { title: "Ticket Created", description: "Issue captured with requester context.", time: "09:20 AM" },
      { title: status, description: "Owner review and SLA timer active.", time: "Now" },
      { title: "Resolution", description: "Knowledge article or service workflow will be linked.", time: "Pending" },
    ]}
  />
);

export const ServiceRequestCard = ({ title, value, subtitle }: { title: string; value: string; subtitle: string }) => (
  <article className={panel}>
    <Wrench className="h-5 w-5 text-cyan-300" />
    <p className="mt-3 text-sm text-slate-500">{title}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
  </article>
);

export const TechnicianCard = ({ technician }: { technician: { technician: string; region: string; todayJobs: string; attendance: string; route: string; performance: string; status: string } }) => (
  <article className={panel}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10 text-blue-200"><UserRound className="h-5 w-5" /></div>
        <div>
          <h3 className="text-sm font-semibold text-white">{technician.technician}</h3>
          <p className="text-xs text-slate-500">{technician.region} • {technician.route}</p>
        </div>
      </div>
      <ServiceStatusBadge status={technician.status} />
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Jobs</p><p className="font-semibold text-white">{technician.todayJobs}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Attend.</p><p className="font-semibold text-white">{technician.attendance}</p></div>
      <div className="rounded-md bg-slate-900 p-2"><p className="text-slate-500">Score</p><p className="font-semibold text-white">{technician.performance}</p></div>
    </div>
  </article>
);

export const RoutePlannerPlaceholder = () => (
  <section className={`${panel} min-h-80`}>
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white"><Route className="h-4 w-4 text-cyan-300" />Route Planner</h3>
      <SecondaryButton icon={Map}>Optimize Route</SecondaryButton>
    </div>
    <div className="mt-4 grid h-56 place-items-center rounded-lg border border-dashed border-slate-800 bg-slate-900/50 text-center">
      <div>
        <CheckCircle2 className="mx-auto h-8 w-8 text-cyan-300" />
        <p className="mt-2 text-sm font-medium text-slate-200">Map and route sequencing placeholder</p>
        <p className="mt-1 text-xs text-slate-500">Static UI only, ready for routing provider integration.</p>
      </div>
    </div>
  </section>
);

export const AMCCard = ({ plan }: { plan: { plan: string; customer: string; coverage: string; renewal: string; paymentStatus: string; status: string } }) => (
  <article className={panel}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-semibold text-white">{plan.plan}</h3>
        <p className="mt-1 text-sm text-slate-400">{plan.customer}</p>
      </div>
      <ServiceStatusBadge status={plan.status} />
    </div>
    <p className="mt-4 text-sm text-slate-300">{plan.coverage}</p>
    <p className="mt-2 text-xs text-slate-500">Renewal: {plan.renewal} • Payment: {plan.paymentStatus}</p>
  </article>
);

export const KnowledgeBaseCard = ({ article }: { article: { title: string; category: string; audience: string; status: string } }) => (
  <article className={panel}>
    <Ticket className="h-5 w-5 text-cyan-300" />
    <h3 className="mt-3 text-sm font-semibold text-white">{article.title}</h3>
    <p className="mt-2 text-sm text-slate-400">{article.category} • {article.audience}</p>
    <div className="mt-4"><ServiceStatusBadge status={article.status} /></div>
  </article>
);
