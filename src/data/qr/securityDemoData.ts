import { Ban, Gauge, MapPinned, ShieldAlert, ShieldCheck, TimerReset } from "lucide-react";

export type SecuritySeverity = "Low" | "Medium" | "High" | "Critical";

export type SecurityEvent = {
  id: string;
  event: string;
  serial: string;
  product: string;
  location: string;
  rule: string;
  riskScore: number;
  severity: SecuritySeverity;
  status: string;
};

export const securityCards = [
  { id: "duplicate", label: "Duplicate Detection", value: "384", icon: ShieldAlert },
  { id: "geo", label: "Geo Fence", value: "42", icon: MapPinned },
  { id: "velocity", label: "Velocity Rules", value: "28", icon: TimerReset },
  { id: "blacklist", label: "Blacklist", value: "116", icon: Ban },
  { id: "whitelist", label: "Whitelist", value: "9.8K", icon: ShieldCheck },
  { id: "risk", label: "Risk Score", value: "71", icon: Gauge },
];

export const securityEvents: SecurityEvent[] = [
  { id: "SEC-001", event: "Duplicate scan cluster", serial: "LAM-GS1-004210", product: "Premium Laminate Sheet", location: "Delhi / Jaipur", rule: "Duplicate Detection", riskScore: 91, severity: "Critical", status: "Open" },
  { id: "SEC-002", event: "Impossible travel", serial: "PNT-2607-008811", product: "Smart QR Paint Bucket", location: "Pune / Kolkata", rule: "Velocity Rules", riskScore: 78, severity: "High", status: "Investigating" },
  { id: "SEC-003", event: "Geo fence exception", serial: "ADH-2026-000001", product: "Industrial Adhesive Pro", location: "Export Zone", rule: "Geo Fence", riskScore: 62, severity: "Medium", status: "Review" },
];
