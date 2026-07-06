export type ScheduledReportRecord = {
  id: string;
  reportName: string;
  reportType: string;
  frequency: string;
  recipients: string;
  format: string;
  filters: string;
  time: string;
  status: string;
};

export const scheduledReports: ScheduledReportRecord[] = [
  { id: "SCH-1001", reportName: "Daily QR Scan Summary", reportType: "QR Reports", frequency: "Daily", recipients: "qr-ops@loyaltytown.io", format: "XLSX", filters: "Region: All", time: "08:00", status: "Active" },
  { id: "SCH-1002", reportName: "Weekly Dealer Scorecard", reportType: "Dealer Reports", frequency: "Weekly", recipients: "channel@loyaltytown.io", format: "PDF", filters: "Tier: Gold+", time: "09:00", status: "Active" },
  { id: "SCH-1003", reportName: "Monthly Finance Pack", reportType: "Finance Reports", frequency: "Monthly", recipients: "finance@loyaltytown.io", format: "PDF", filters: "FY 2026", time: "07:30", status: "Paused" },
];
