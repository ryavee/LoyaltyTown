import { UserCircle } from "lucide-react";
import { cn } from "../utils";

type AvatarProps = {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const initials = (name?: string) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "";

export const Avatar = ({ name, src, size = "md", className }: AvatarProps) => (
  <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-900 font-semibold text-slate-200", sizes[size], className)}>
    {src ? <img src={src} alt={name || "Avatar"} className="h-full w-full object-cover" /> : initials(name) || <UserCircle className="h-5 w-5" />}
  </span>
);
