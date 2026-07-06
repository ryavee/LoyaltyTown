import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { buildBreadcrumbs } from "../../utils/navigation";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = buildBreadcrumbs(location.pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-xs text-slate-400">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-slate-300 hover:bg-slate-800 hover:text-white">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span key={`${crumb.route}-${index}`} className="flex min-w-0 items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />
            {isLast ? (
              <span className="truncate font-medium text-slate-100">{crumb.title}</span>
            ) : (
              <Link to={crumb.route} className="truncate rounded-md px-1.5 py-1 hover:bg-slate-800 hover:text-white">
                {crumb.title}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default AppBreadcrumbs;
