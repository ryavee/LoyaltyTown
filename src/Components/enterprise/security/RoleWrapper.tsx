import type { ReactNode } from "react";

type RoleWrapperProps = {
  allowedRoles: string[];
  roles?: string[];
  children: ReactNode;
  fallback?: ReactNode;
};

export const RoleWrapper = ({ allowedRoles, roles = [], children, fallback = null }: RoleWrapperProps) => {
  const allowed = roles.some((role) => allowedRoles.includes(role));
  return allowed ? children : fallback;
};
