import type { ReactNode } from "react";
import type { StepItem } from "../types";
import { cn, panelBase } from "../utils";
import { Stepper } from "./Stepper";

type WizardProps = {
  steps: StepItem[];
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export const Wizard = ({ steps, children, footer, className }: WizardProps) => (
  <section className={cn(panelBase, "overflow-hidden", className)}>
    <div className="border-b border-slate-800 p-4">
      <Stepper steps={steps} />
    </div>
    <div className="p-4">{children}</div>
    {footer ? <div className="border-t border-slate-800 p-4">{footer}</div> : null}
  </section>
);
