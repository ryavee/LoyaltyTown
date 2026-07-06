export const backupRows = [
  { id: "BKP-1", backup: "Database Backup", schedule: "Every 6 hours", lastRun: "2026-07-05 06:00", size: "4.8TB", restore: "Ready", status: "Success" },
  { id: "BKP-2", backup: "Storage Backup", schedule: "Daily", lastRun: "2026-07-05 02:00", size: "182TB", restore: "Ready", status: "Success" },
  { id: "BKP-3", backup: "Restore Placeholder", schedule: "Manual", lastRun: "Dry run", size: "N/A", restore: "Placeholder", status: "Review" },
];

export const disasterRecoveryRows = [
  { id: "DR-1", plan: "Primary Region Failover", rto: "30m", rpo: "5m", owner: "SRE", failover: "Placeholder", status: "Ready" },
  { id: "DR-2", plan: "Database Recovery", rto: "20m", rpo: "5m", owner: "DBA", failover: "Placeholder", status: "Ready" },
  { id: "DR-3", plan: "Storage Recovery", rto: "2h", rpo: "30m", owner: "Platform Ops", failover: "Placeholder", status: "Review" },
];
