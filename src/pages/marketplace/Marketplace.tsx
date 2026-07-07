import { BadgeCheck, MapPin, Send } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { marketplaceListings } from "../../data/loyaltyTownDemoData";

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <PageHeader title="Distribution Marketplace" description="Connect manufacturers, distributors, dealers, retailers, contractors, and suppliers through verified network opportunities." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {marketplaceListings.map((listing) => (
          <article key={listing.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{listing.category}</span>
              {listing.verified ? <BadgeCheck className="h-5 w-5 text-cyan-500" /> : null}
            </div>
            <h2 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{listing.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4" />{listing.location}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{listing.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {listing.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300">{tag}</span>)}
            </div>
            <button className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
              <Send className="h-4 w-4" />
              Connect
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
