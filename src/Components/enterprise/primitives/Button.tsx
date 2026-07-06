import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { buttonBase, buttonVariants, cn } from "../utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type EnterpriseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  variant?: ButtonVariant;
  children: ReactNode;
};

export const EnterpriseButton = ({
  icon: Icon,
  rightIcon: RightIcon,
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: EnterpriseButtonProps) => (
  <button type={type} className={cn(buttonBase, buttonVariants[variant], className)} {...props}>
    {Icon ? <Icon className="h-4 w-4" /> : null}
    {children}
    {RightIcon ? <RightIcon className="h-4 w-4" /> : null}
  </button>
);

export const PrimaryButton = (props: Omit<EnterpriseButtonProps, "variant">) => (
  <EnterpriseButton variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<EnterpriseButtonProps, "variant">) => (
  <EnterpriseButton variant="secondary" {...props} />
);
