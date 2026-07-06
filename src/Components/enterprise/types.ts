import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type EnterpriseSize = "sm" | "md" | "lg";
export type EnterpriseTone = "default" | "success" | "warning" | "danger" | "info";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DataTableColumn<T> = {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => ReactNode);
  cell?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  sortable?: boolean;
  hidden?: boolean;
};

export type DataTableAction<T> = {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick: (row: T) => void;
  permission?: string;
  destructive?: boolean;
};

export type DataTableBulkAction = {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick: (selectedIds: Array<string | number>) => void;
  destructive?: boolean;
};

export type StatItem = {
  id: string;
  label: string;
  value: ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  tone?: EnterpriseTone;
};

export type TimelineItem = {
  id: string;
  title: string;
  description?: ReactNode;
  timestamp?: string;
  icon?: LucideIcon;
  tone?: EnterpriseTone;
};

export type StepItem = {
  id: string;
  title: string;
  description?: string;
  status?: "complete" | "current" | "upcoming" | "error";
};

export type PermissionContext = {
  permissions?: string[];
  roles?: string[];
  featureFlags?: Record<string, boolean>;
};
