export const deploymentRows = [
  { id: "DEP-1001", release: "v23.4.0", environment: "Production", notes: "Reports and AI sprint routes", deployedBy: "DevOps", time: "2026-07-05 08:00", status: "Success" },
  { id: "DEP-1002", release: "v23.3.2", environment: "Staging", notes: "White-label preview fix", deployedBy: "DevOps", time: "2026-07-04 18:20", status: "Success" },
  { id: "DEP-1003", release: "v23.3.1", environment: "Development", notes: "Queue dashboard prototype", deployedBy: "Platform", time: "2026-07-04 14:45", status: "Rollback Ready" },
];

export const environments = [
  { id: "ENV-PROD", environment: "Production", branch: "main", health: "99.99%", rollback: "Available", status: "Operational" },
  { id: "ENV-STG", environment: "Staging", branch: "release", health: "99.95%", rollback: "Available", status: "Operational" },
  { id: "ENV-DEV", environment: "Development", branch: "develop", health: "99.80%", rollback: "Manual", status: "Watch" },
];
