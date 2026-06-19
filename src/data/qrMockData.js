export const qrProducts = [
  { id: "PRD-1001", name: "Premium Cement 50 kg" },
  { id: "PRD-1002", name: "Wall Putty 25 kg" },
  { id: "PRD-1003", name: "Exterior Primer 20 L" },
  { id: "PRD-1004", name: "Tile Adhesive 20 kg" },
];

export const qrDealers = [
  { id: "DLR-1001", name: "Chennai BuildMart" },
  { id: "DLR-1002", name: "Aman Paint House" },
  { id: "DLR-1003", name: "Singh Building Mart" },
];

export const qrDistributors = [
  { id: "DST-1001", name: "South Zone Distribution" },
  { id: "DST-1002", name: "Metro Supply Chain" },
  { id: "DST-1003", name: "NorthStar Wholesale" },
];

export const qrCampaigns = [
  { id: "CMP-1001", name: "Summer Rewards 2026" },
  { id: "CMP-1002", name: "Dealer Growth Drive" },
  { id: "CMP-1003", name: "Monsoon Mega Offer" },
];

export const initialQrBatches = [
  {
    id: "LT-QR-2606-0001",
    batchName: "Summer Rewards - Chennai",
    productId: "PRD-1001",
    product: "Premium Cement 50 kg",
    dealer: "Chennai BuildMart",
    distributor: "South Zone Distribution",
    campaign: "Summer Rewards 2026",
    quantity: 10000,
    generated: 10000,
    scanned: 6820,
    expired: 0,
    status: "Active",
    createdDate: "18 Jun 2026",
    expiryDate: "31 Dec 2026",
    remarks: "Retail packs for Chennai region.",
  },
  {
    id: "LT-QR-2606-0002",
    batchName: "Wall Putty Dealer Stock",
    productId: "PRD-1002",
    product: "Wall Putty 25 kg",
    dealer: "Aman Paint House",
    distributor: "Metro Supply Chain",
    campaign: "Dealer Growth Drive",
    quantity: 7500,
    generated: 7500,
    scanned: 2844,
    expired: 0,
    status: "Active",
    createdDate: "15 Jun 2026",
    expiryDate: "15 Jan 2027",
    remarks: "Dealer incentive batch.",
  },
  {
    id: "LT-QR-2605-0024",
    batchName: "Exterior Primer Launch",
    productId: "PRD-1003",
    product: "Exterior Primer 20 L",
    dealer: "Singh Building Mart",
    distributor: "NorthStar Wholesale",
    campaign: "Monsoon Mega Offer",
    quantity: 5000,
    generated: 5000,
    scanned: 4710,
    expired: 190,
    status: "Completed",
    createdDate: "28 May 2026",
    expiryDate: "15 Jun 2026",
    remarks: "Launch inventory for north region.",
  },
  {
    id: "LT-QR-2605-0018",
    batchName: "Open Stock - Tile Adhesive",
    productId: "PRD-1004",
    product: "Tile Adhesive 20 kg",
    dealer: "—",
    distributor: "South Zone Distribution",
    campaign: "—",
    quantity: 12000,
    generated: 12000,
    scanned: 0,
    expired: 0,
    status: "Draft",
    createdDate: "22 May 2026",
    expiryDate: "No expiry",
    remarks: "Unassigned open stock.",
  },
];

export const initialQrCodes = [
  { code: "LTQR-8F4A-92C1", serial: "SN-260618-000001", batchId: "LT-QR-2606-0001", batch: "Summer Rewards - Chennai", status: "Scanned", scans: 1, createdDate: "18 Jun 2026" },
  { code: "LTQR-1A82-CC91", serial: "SN-260618-000002", batchId: "LT-QR-2606-0001", batch: "Summer Rewards - Chennai", status: "Active", scans: 0, createdDate: "18 Jun 2026" },
  { code: "LTQR-B75D-21EF", serial: "SN-260618-000003", batchId: "LT-QR-2606-0001", batch: "Summer Rewards - Chennai", status: "Scanned", scans: 2, createdDate: "18 Jun 2026" },
  { code: "LTQR-C983-AE42", serial: "SN-260615-000441", batchId: "LT-QR-2606-0002", batch: "Wall Putty Dealer Stock", status: "Blocked", scans: 5, createdDate: "15 Jun 2026" },
  { code: "LTQR-7D13-F20A", serial: "SN-260528-003122", batchId: "LT-QR-2605-0024", batch: "Exterior Primer Launch", status: "Expired", scans: 0, createdDate: "28 May 2026" },
  { code: "LTQR-33BE-71C9", serial: "SN-260615-000442", batchId: "LT-QR-2606-0002", batch: "Wall Putty Dealer Stock", status: "Active", scans: 0, createdDate: "15 Jun 2026" },
  { code: "LTQR-91CD-482B", serial: "SN-260528-003123", batchId: "LT-QR-2605-0024", batch: "Exterior Primer Launch", status: "Scanned", scans: 1, createdDate: "28 May 2026" },
];

export const initialScanLogs = [
  { id: 1, date: "19 Jun 2026, 10:42 AM", qrCode: "LTQR-8F4A-92C1", product: "Premium Cement 50 kg", customer: "Arun Kumar", location: "Chennai, Tamil Nadu", device: "Android • Chrome", result: "Valid" },
  { id: 2, date: "19 Jun 2026, 10:38 AM", qrCode: "LTQR-B75D-21EF", product: "Premium Cement 50 kg", customer: "Priya S.", location: "Coimbatore, Tamil Nadu", device: "iPhone • Safari", result: "Duplicate" },
  { id: 3, date: "19 Jun 2026, 10:21 AM", qrCode: "LTQR-C983-AE42", product: "Wall Putty 25 kg", customer: "Unknown", location: "Pune, Maharashtra", device: "Android • Firefox", result: "Fake" },
  { id: 4, date: "19 Jun 2026, 09:56 AM", qrCode: "LTQR-91CD-482B", product: "Exterior Primer 20 L", customer: "Vikram Singh", location: "Jaipur, Rajasthan", device: "Android • Chrome", result: "Valid" },
  { id: 5, date: "19 Jun 2026, 09:32 AM", qrCode: "LTQR-7D13-F20A", product: "Exterior Primer 20 L", customer: "Meera Joshi", location: "Delhi, NCR", device: "iPhone • Safari", result: "Expired" },
  { id: 6, date: "18 Jun 2026, 08:14 PM", qrCode: "LTQR-33BE-71C9", product: "Wall Putty 25 kg", customer: "Rahul Dev", location: "Mumbai, Maharashtra", device: "Android • Chrome", result: "Valid" },
];

const BATCH_STORAGE_KEY = "loyaltytown_mock_qr_batches";

export const getMockQrBatches = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(BATCH_STORAGE_KEY));
    return Array.isArray(stored) ? stored : initialQrBatches;
  } catch {
    return initialQrBatches;
  }
};

export const saveMockQrBatches = (batches) => {
  localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(batches));
};

export const addMockQrBatch = (batch) => {
  const batches = [batch, ...getMockQrBatches()];
  saveMockQrBatches(batches);
  return batches;
};
