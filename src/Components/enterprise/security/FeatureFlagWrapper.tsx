import type { ReactNode } from "react";

type FeatureFlagWrapperProps = {
  flag: string;
  flags?: Record<string, boolean>;
  children: ReactNode;
  fallback?: ReactNode;
};

export const FeatureFlagWrapper = ({ flag, flags = {}, children, fallback = null }: FeatureFlagWrapperProps) =>
  flags[flag] ? children : fallback;
