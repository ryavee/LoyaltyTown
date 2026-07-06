import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("Route render failed", error, info);
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <section className="w-full max-w-lg rounded-lg border border-rose-400/20 bg-slate-900 p-6 text-center shadow-xl shadow-black/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-rose-400/20 bg-rose-400/10 text-rose-200">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-white">Workspace could not load</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The page hit a rendering error. Refresh the workspace to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </button>
        </section>
      </div>
    );
  }
}

export default RouteErrorBoundary;
