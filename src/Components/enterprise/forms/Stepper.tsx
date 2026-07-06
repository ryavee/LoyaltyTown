import { Check, CircleAlert } from "lucide-react";
import type { StepItem } from "../types";
import { cn } from "../utils";

type StepperProps = {
  steps: StepItem[];
  className?: string;
};

export const Stepper = ({ steps, className }: StepperProps) => (
  <ol className={cn("grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]", className)}>
    {steps.map((step, index) => (
      <li key={step.id} className="flex gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
            step.status === "complete" && "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
            step.status === "current" && "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
            step.status === "error" && "border-rose-400/30 bg-rose-400/10 text-rose-200",
            (!step.status || step.status === "upcoming") && "border-slate-800 bg-slate-900 text-slate-500",
          )}
        >
          {step.status === "complete" ? <Check className="h-4 w-4" /> : step.status === "error" ? <CircleAlert className="h-4 w-4" /> : index + 1}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white">{step.title}</h4>
          {step.description ? <p className="mt-1 text-xs leading-5 text-slate-500">{step.description}</p> : null}
        </div>
      </li>
    ))}
  </ol>
);
