import type { ReactNode } from "react";

type PermissionWrapperProps = {
  required: string | string[];
  permissions?: string[];
  children: ReactNode;
  fallback?: ReactNode;
  mode?: "all" | "any";
};

export const PermissionWrapper = ({ required, permissions = [], children, fallback = null, mode = "any" }: PermissionWrapperProps) => {
  const requiredList = Array.isArray(required) ? required : [required];
  const allowed = mode === "all"
    ? requiredList.every((permission) => permissions.includes(permission))
    : requiredList.some((permission) => permissions.includes(permission));

  return allowed ? children : fallback;
};
