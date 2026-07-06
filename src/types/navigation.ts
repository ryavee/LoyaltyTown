import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  route: string;
  permission: string;
  children: SidebarItem[];
};

export type SidebarGroup = {
  id: string;
  title: string;
  items: SidebarItem[];
};

export type EnterpriseRoute = {
  id: string;
  title: string;
  route: string;
  permission: string;
  group: string;
  icon: LucideIcon;
  mode: "list" | "create" | "detail";
};
