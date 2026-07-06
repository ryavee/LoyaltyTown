import type { EnterpriseTone } from "./types";

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const toneClasses: Record<EnterpriseTone, string> = {
  default: "border-slate-800 bg-slate-900 text-slate-100",
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  danger: "border-rose-400/20 bg-rose-400/10 text-rose-200",
  info: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
};

export const buttonBase =
  "enterprise-transition inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants = {
  primary: "bg-cyan-400 px-3 text-slate-950 shadow-sm shadow-cyan-950/30 hover:bg-cyan-300 active:translate-y-px",
  secondary: "border border-slate-800 bg-slate-900 px-3 text-slate-200 hover:border-slate-700 hover:bg-slate-800 active:translate-y-px",
  ghost: "px-3 text-slate-300 hover:bg-slate-800 hover:text-white active:translate-y-px",
  danger: "bg-rose-500 px-3 text-white shadow-sm shadow-rose-950/30 hover:bg-rose-400 active:translate-y-px",
};

export const fieldBase =
  "enterprise-transition h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60";

export const panelBase = "rounded-lg border border-slate-800 bg-slate-950/75 shadow-sm shadow-black/10 backdrop-blur";
