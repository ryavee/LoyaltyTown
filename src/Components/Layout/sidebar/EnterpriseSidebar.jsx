import { Fragment, memo, useDeferredValue, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Circle,
  Search,
  X,
} from "lucide-react";
import { sidebarItems } from "../../../constants/sidebar";
import { useKeyboardNavigation } from "../../../hooks/useKeyboardNavigation";
import { useShellStore } from "../../../store/useShellStore";

const filterItem = (item, query) => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) return item;

  const childMatches = item.children
    .map((child) => filterItem(child, query))
    .filter(Boolean);

  if (item.title.toLowerCase().includes(normalized) || item.permission.toLowerCase().includes(normalized)) {
    return { ...item, children: childMatches };
  }

  if (childMatches.length) return { ...item, children: childMatches };

  return null;
};

const SidebarLink = memo(({ item, level = 0, collapsed, onNavigate }) => {
  const location = useLocation();
  const [open, setOpen] = useState(location.pathname.startsWith(item.route));
  const hasChildren = item.children.length > 0;
  const Icon = item.icon || Circle;

  return (
    <div>
      <div className="group relative flex items-center">
        <NavLink
          to={item.route}
          title={collapsed ? item.title : undefined}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              "flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md px-2 text-sm font-medium transition",
              "hover:bg-slate-800/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              isActive || location.pathname.startsWith(`${item.route}/`)
                ? "bg-cyan-400/12 text-cyan-200 ring-1 ring-cyan-400/20"
                : "text-slate-400",
              collapsed ? "justify-center" : "",
            ].join(" ")
          }
          style={{ paddingLeft: collapsed ? undefined : `${8 + level * 14}px` }}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed ? <span className="truncate">{item.title}</span> : null}
        </NavLink>

        {hasChildren && !collapsed ? (
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="ml-1 flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={`Toggle ${item.title}`}
            aria-expanded={open}
          >
            <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
          </button>
        ) : null}
      </div>

      {hasChildren && open && !collapsed ? (
        <div className="mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarLink key={child.id} item={child} level={level + 1} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
});

SidebarLink.displayName = "SidebarLink";

const EnterpriseSidebar = () => {
  const { collapsed, mobileOpen, menuQuery, setMenuQuery, setMobileOpen, toggleCollapsed } = useShellStore();
  const deferredMenuQuery = useDeferredValue(menuQuery);
  const keyboardNavigation = useKeyboardNavigation({ orientation: "vertical" });

  const visibleGroups = useMemo(
    () =>
      sidebarItems
        .map((group) => ({
          ...group,
          items: group.items.map((item) => filterItem(item, deferredMenuQuery)).filter(Boolean),
        }))
        .filter((group) => group.items.length > 0),
    [deferredMenuQuery],
  );

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-800 bg-slate-950 text-slate-100 shadow-2xl shadow-black/30 transition-all duration-300 lg:static lg:translate-x-0",
          collapsed ? "w-[76px]" : "w-[292px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400 text-sm font-black text-slate-950">
            LT
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">LoyaltyTown</p>
              <p className="truncate text-xs text-slate-500">Connected Product Cloud</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={closeMobile}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!collapsed ? (
          <div className="border-b border-slate-800 p-3">
            <label className="relative block">
              <span className="sr-only">Search navigation menu</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={menuQuery}
                onChange={(event) => setMenuQuery(event.target.value)}
                placeholder="Search menu"
                className="h-9 w-full rounded-md border border-slate-800 bg-slate-900 pl-9 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
              />
            </label>
          </div>
        ) : null}

        <nav
          aria-label="Primary navigation"
          className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-4"
          onKeyDown={keyboardNavigation.onKeyDown}
        >
          {visibleGroups.map((group) => (
            <Fragment key={group.id}>
              <section className="space-y-1">
                {!collapsed ? (
                  <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    {group.title}
                  </div>
                ) : null}
                {group.items.map((item) => (
                  <SidebarLink key={item.id} item={item} collapsed={collapsed} onNavigate={closeMobile} />
                ))}
              </section>
            </Fragment>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-800 bg-slate-900 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white lg:flex"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed ? "Collapse" : null}
          </button>
          {!collapsed ? (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-slate-400">
              <ChevronsUpDown className="h-4 w-4 text-cyan-300" />
              <span className="min-w-0 truncate">Global Tenant</span>
            </div>
          ) : null}
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      ) : null}
    </>
  );
};

export default EnterpriseSidebar;
