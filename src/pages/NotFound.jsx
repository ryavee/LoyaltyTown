import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-sm text-slate-400">The route is not registered in the frontend shell.</p>
      <Link to="/dashboard" className="mt-6 inline-flex h-10 items-center rounded-md bg-cyan-400 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
        Go to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
