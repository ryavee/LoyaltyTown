import { Bell, Menu, Search, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300 lg:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
            placeholder="Search companies, dealers, products, QR codes..."
          />
        </div>
        <button className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200 sm:inline-flex">
          <Bell className="h-4 w-4" />
          Alerts
        </button>
        <button className="flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">Pravat</span>
        </button>
      </div>
    </header>
  );
}
