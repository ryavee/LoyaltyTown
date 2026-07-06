import { Archive, Download, Plus, RefreshCw, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AppBreadcrumbs from "../Components/breadcrumbs/AppBreadcrumbs";
import StatCard from "../Components/cards/StatCard";
import EnterpriseFilters from "../Components/filters/EnterpriseFilters";
import PaginationPlaceholder from "../Components/tables/PaginationPlaceholder";
import TablePlaceholder from "../Components/tables/TablePlaceholder";
import { findNavigationItem } from "../utils/navigation";

const EnterpriseModulePage = ({ route }) => {
  const location = useLocation();
  const navItem = findNavigationItem(location.pathname);
  const Icon = route?.icon || navItem?.icon || Archive;
  const title = route?.title || navItem?.title || "Workspace";
  const baseRoute = navItem?.route || route?.route || location.pathname;
  const group = route?.group || "Workspace";
  const mode = route?.mode || "list";

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />

      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300/80">{group}</p>
              <h1 className="mt-1 truncate text-2xl font-semibold text-white md:text-3xl">{title}</h1>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Frontend shell placeholder for enterprise workflows, permissions, routing, and future backend integration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          {mode === "list" ? (
            <Link to={`${baseRoute}/create`} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              <Plus className="h-4 w-4" />
              Create
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Records" value="--" hint="Waiting for data source" icon={Archive} />
        <StatCard label="Active" value="--" hint="Permission-ready metric" icon={Icon} />
        <StatCard label="Pending" value="--" hint="Workflow placeholder" icon={RefreshCw} />
        <StatCard label="Exceptions" value="--" hint="No backend connected" icon={Archive} />
      </section>

      <EnterpriseFilters searchPlaceholder={`Search ${navItem?.title || title}`} />

      <section className="space-y-4">
        <TablePlaceholder title={navItem?.title || title} />
        <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-slate-400">
            <Archive className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-base font-semibold text-white">No records connected</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            This page is intentionally empty until backend APIs and business workflows are connected.
          </p>
        </div>
        <PaginationPlaceholder />
      </section>
    </div>
  );
};

export default EnterpriseModulePage;
