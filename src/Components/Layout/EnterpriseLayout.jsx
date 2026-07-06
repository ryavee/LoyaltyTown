import { Outlet, useLocation } from "react-router-dom";
import EnterpriseHeader from "./header/EnterpriseHeader";
import EnterpriseSidebar from "./sidebar/EnterpriseSidebar";

const EnterpriseLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex min-h-screen">
        <EnterpriseSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <EnterpriseHeader />
          <main
            id="main-content"
            tabIndex={-1}
            className="custom-scrollbar flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_34%),linear-gradient(180deg,#0f172a_0%,#020617_100%)] p-4 outline-none md:p-6"
          >
            <div key={location.pathname} className="mx-auto w-full max-w-[1600px] animate-enterprise-slide-up">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLayout;
