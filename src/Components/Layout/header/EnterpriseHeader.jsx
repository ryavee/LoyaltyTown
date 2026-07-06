import { Bell, Menu, Moon, Search, ShieldCheck, UserCircle } from "lucide-react";
import AppBreadcrumbs from "../../breadcrumbs/AppBreadcrumbs";
import { useShellStore } from "../../../store/useShellStore";

const EnterpriseHeader = () => {
  const { setMobileOpen } = useShellStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/88 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 flex-1 lg:block">
          <AppBreadcrumbs />
        </div>

        <label className="relative hidden w-full max-w-md md:block">
          <span className="sr-only">Search platform</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search platform"
            className="h-10 w-full rounded-md border border-slate-800 bg-slate-900 pl-9 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
          />
        </label>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:inline-flex">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Enterprise
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" aria-label="Dark mode">
            <Moon className="h-4 w-4" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-2.5 text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" aria-label="User menu">
            <UserCircle className="h-5 w-5" />
            <span className="hidden text-sm font-medium md:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EnterpriseHeader;
