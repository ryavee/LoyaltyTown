import { BadgeCheck, Building2, Eye, Handshake, MapPin, Search, Send, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { partnerNetworkData, type PartnerRecord, type PartnerType } from "../../data/partnerNetworkDemoData";

type PartnerNetworkPageProps = {
  type: PartnerType;
};

const scoreTone = (score: number) => {
  if (score >= 90) return "success";
  if (score >= 84) return "info";
  return "warning";
};

export default function PartnerNetworkPage({ type }: PartnerNetworkPageProps) {
  const page = partnerNetworkData[type];
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPartners = useMemo(() => {
    const search = query.trim().toLowerCase();

    return page.rows.filter((partner) => {
      const matchesSearch = !search || [partner.name, partner.category, partner.location, partner.specialty, partner.businessCategories.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search);

      const matchesCategory = categoryFilter === "all" || partner.businessCategories.some((item) => item.toLowerCase() === categoryFilter.toLowerCase());
      const matchesStatus = statusFilter === "all" || partner.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [categoryFilter, page.rows, query, statusFilter]);

  const stats = [
    { label: "Verified Partners", value: `${filteredPartners.filter((partner) => partner.verified).length}/${page.rows.length}`, icon: ShieldCheck },
    { label: "Avg. Trust Score", value: `${Math.round(filteredPartners.reduce((sum, partner) => sum + partner.trustScore, 0) / Math.max(filteredPartners.length, 1))}/100`, icon: TrendingUp },
    { label: "Connected Brands", value: `${filteredPartners.reduce((sum, partner) => sum + partner.connectedBrands.length, 0)}`, icon: Users },
    { label: "Coverage Zones", value: `${new Set(filteredPartners.map((partner) => partner.coverage)).size}`, icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Partner Network"
        title={page.title}
        description={page.description}
        actions={
          <>
            <button type="button" className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Saved Filters</button>
            <button type="button" className="h-10 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Invite Partner</button>
          </>
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 text-white shadow-lg dark:border-slate-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Business Network
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">A LinkedIn-style distribution network with trust, reach, and commercial readiness.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Explore trusted manufacturers, distributors, dealers, retailers, contractors, and architects with proof of onboarding, service coverage, and connected brand ecosystems.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Live view</p>
            <p className="mt-2 text-3xl font-semibold">{filteredPartners.length}</p>
            <p className="mt-1 text-sm text-slate-300">profiles shown in this workspace</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                <div className="rounded-xl bg-cyan-50 p-2 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by company, specialty, or location"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
            >
              <option value="all">All categories</option>
              {Array.from(new Set(page.rows.flatMap((partner) => partner.businessCategories))).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
            >
              <option value="all">All statuses</option>
              <option value="open network">Open Network</option>
              <option value="expanding">Expanding</option>
              <option value="available">Available</option>
              <option value="active">Active</option>
              <option value="review">Review</option>
              <option value="screening">Screening</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredPartners.map((partner) => (
          <article key={partner.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Handshake className="h-6 w-6" />
              </div>
              {partner.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-200">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              ) : (
                <StatusBadge status="Verification Pending" tone="warning" />
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{partner.name}</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{partner.category}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-cyan-700 dark:text-cyan-300">{partner.specialty}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="h-4 w-4" />
              {partner.location}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Trust Score</p>
                <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{partner.trustScore}/100</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Headquarters</p>
                <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{partner.headquarters}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Business Categories</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {partner.businessCategories.map((category) => (
                  <span key={category} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">{category}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Connected Brands</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {partner.connectedBrands.map((brand) => (
                  <span key={brand} className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{brand}</span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                {partner.coverage}
              </div>
              <div className="flex gap-2">
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
                  <Send className="h-4 w-4" />
                  Connect
                </button>
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">
                  <Eye className="h-4 w-4" />
                  View Profile
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <DataTable<PartnerRecord>
        title={`${page.title} Directory`}
        description="Mock partner records with verification, trust score, location, categories, connected brands, and network status."
        rows={filteredPartners}
        columns={[
          { key: "name", header: "Business" },
          { key: "category", header: "Category" },
          { key: "location", header: "Location" },
          { key: "businessCategories", header: "Business Categories", render: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.businessCategories.join(" • ")}</span> },
          { key: "connectedBrands", header: "Partners", render: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.connectedBrands.join(", ")}</span> },
          { key: "trustScore", header: "Trust Score", align: "right", render: (row) => <StatusBadge status={`${row.trustScore}`} tone={scoreTone(row.trustScore)} /> },
          { key: "verified", header: "Verified", render: (row) => row.verified ? <StatusBadge status="Verified" tone="success" /> : <StatusBadge status="Pending" tone="warning" /> },
          { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} tone={row.status === "Review" || row.status === "Screening" ? "warning" : "info"} /> },
        ]}
      />
    </div>
  );
}
