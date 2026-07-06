export type QrCodeStatus = "Active" | "Unused" | "Claimed" | "Disabled" | "Voided" | "Expired";

export type QrCodeRecord = {
  id: string;
  qrCode: string;
  serial: string;
  status: QrCodeStatus;
  batch: string;
  product: string;
  sku?: string;
  scanCount: number;
  firstScan?: string;
  lastScan?: string;
  riskScore?: number;
  claimStatus: string;
  activationDate: string;
  warrantyStatus: string;
};

export const qrCodes: QrCodeRecord[] = [
  { id: "QR-000001", qrCode: "https://lt.qr/ADH-2026-000001", serial: "ADH-2026-000001", status: "Claimed", batch: "QRB-2026-001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", scanCount: 12, firstScan: "2026-07-01 10:22", lastScan: "2026-07-05 12:10", riskScore: 18, claimStatus: "Claimed", activationDate: "2026-07-05", warrantyStatus: "Active" },
  { id: "QR-000002", qrCode: "https://lt.qr/ADH-2026-000002", serial: "ADH-2026-000002", status: "Active", batch: "QRB-2026-001", product: "Industrial Adhesive Pro", sku: "ADH-PRO-20KG", scanCount: 4, firstScan: "2026-07-02 09:18", lastScan: "2026-07-05 08:41", riskScore: 24, claimStatus: "Unclaimed", activationDate: "-", warrantyStatus: "Not Started" },
  { id: "QR-000003", qrCode: "https://lt.qr/PNT-2607-008811", serial: "PNT-2607-008811", status: "Claimed", batch: "QRB-2026-002", product: "Smart QR Paint Bucket", sku: "PNT-SQR-10L", scanCount: 21, firstScan: "2026-07-01 14:44", lastScan: "2026-07-04 16:08", riskScore: 46, claimStatus: "Claimed", activationDate: "2026-07-04", warrantyStatus: "Active" },
  { id: "QR-000004", qrCode: "https://lt.qr/LAM-GS1-004210", serial: "LAM-GS1-004210", status: "Voided", batch: "QRB-2026-003", product: "Premium Laminate Sheet", sku: "LAM-PRM-8X4", scanCount: 37, firstScan: "2026-07-03 11:01", lastScan: "2026-07-05 17:52", riskScore: 91, claimStatus: "Security Hold", activationDate: "2026-07-03", warrantyStatus: "Blocked" },
  { id: "QR-000005", qrCode: "https://lt.qr/KIT-SEC-000118", serial: "KIT-SEC-000118", status: "Expired", batch: "QRB-2026-004", product: "Contractor Tool Kit", sku: "KIT-CON-12", scanCount: 2, firstScan: "2026-06-20 12:10", lastScan: "2026-06-22 13:14", riskScore: 12, claimStatus: "Expired", activationDate: "-", warrantyStatus: "Expired" },
];

export const qrTimeline = [
  { id: "tl-1", title: "Generated", description: "QR created from batch serial range.", timestamp: "Jul 01, 2026" },
  { id: "tl-2", title: "Printed", description: "Print job released to Zebra queue.", timestamp: "Jul 01, 2026" },
  { id: "tl-3", title: "Dispatched", description: "Linked to finished goods dispatch.", timestamp: "Jul 02, 2026" },
  { id: "tl-4", title: "Activated", description: "Consumer activation completed via mobile portal.", timestamp: "Jul 05, 2026" },
  { id: "tl-5", title: "Customer Registered", description: "Customer identity attached to QR claim.", timestamp: "Jul 05, 2026" },
  { id: "tl-6", title: "Warranty", description: "Warranty certificate generated.", timestamp: "Jul 05, 2026" },
  { id: "tl-7", title: "Reward", description: "Wallet reward issued for eligible scan.", timestamp: "Jul 05, 2026" },
  { id: "tl-8", title: "Duplicate", description: "Duplicate scan detection evaluated.", timestamp: "Jul 05, 2026" },
  { id: "tl-9", title: "Blocked", description: "Security block state available for high risk scans.", timestamp: "Jul 05, 2026" },
];
