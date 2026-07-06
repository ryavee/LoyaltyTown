export const auditRows = [
  { id: "AUD-1001", event: "User Audit", actor: "Nisha Kapoor", target: "Role changed", module: "Users", timestamp: "2026-07-05 09:12", status: "Logged" },
  { id: "AUD-1002", event: "Security Audit", actor: "System", target: "Failed login threshold", module: "Security", timestamp: "2026-07-05 09:28", status: "Review" },
  { id: "AUD-1003", event: "Data Changes", actor: "Platform Ops", target: "Tenant restored", module: "Companies", timestamp: "2026-07-05 10:10", status: "Logged" },
  { id: "AUD-1004", event: "Exports", actor: "Finance Ops", target: "Revenue export", module: "Reports", timestamp: "2026-07-05 10:42", status: "Logged" },
  { id: "AUD-1005", event: "Login Events", actor: "Pooja Sen", target: "Blocked user", module: "Auth", timestamp: "2026-07-05 11:05", status: "Blocked" },
];

export const securityRows = [
  { id: "SEC-1", signal: "Failed Login", source: "203.0.113.42", volume: "184 attempts", action: "Blocked IP", status: "Blocked" },
  { id: "SEC-2", signal: "Suspicious Activity", source: "Tenant API", volume: "Rate spike", action: "Rate Limit", status: "Review" },
  { id: "SEC-3", signal: "Fraud Overview", source: "QR Security", volume: "28 alerts", action: "Escalated", status: "Watch" },
];
