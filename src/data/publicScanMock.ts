export type MockScanResponse = {
  valid: boolean;
  duplicate: boolean;
  productName: string;
  batchId: string;
  brandName: string;
  scanCount: number;
  rewardPoints: number;
};

export const mockResponse: MockScanResponse = {
  valid: true,
  duplicate: false,
  productName: "Coca Cola 750ml",
  batchId: "LT-BATCH-000001",
  brandName: "Coca-Cola",
  scanCount: 1,
  rewardPoints: 10,
};

export const getMockScanResponse = (code: string): MockScanResponse => {
  const normalizedCode = code.toUpperCase();

  if (normalizedCode.includes("INVALID") || normalizedCode.includes("FAKE")) {
    return { ...mockResponse, valid: false, scanCount: 0 };
  }

  if (normalizedCode.includes("DUP") || normalizedCode.includes("USED")) {
    return { ...mockResponse, duplicate: true, scanCount: 5 };
  }

  return mockResponse;
};

export const walletTransactions = [
  { id: 1, title: "Scan Reward", detail: "Coca Cola 750ml", date: "19 Jun 2026", points: 10 },
  { id: 2, title: "Referral Reward", detail: "Friend joined LoyaltyTown", date: "12 Jun 2026", points: 20 },
  { id: 3, title: "Gift Redemption", detail: "Digital gift voucher", date: "02 Jun 2026", points: -50 },
];
