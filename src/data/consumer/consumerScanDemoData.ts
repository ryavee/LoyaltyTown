export type ConsumerScanState =
  | "genuine"
  | "already-registered"
  | "invalid"
  | "counterfeit"
  | "recalled"
  | "expired-campaign"
  | "reward-available";

export type ConsumerScanRecord = {
  code: string;
  state: ConsumerScanState;
  title: string;
  message: string;
  productId: string;
  rewardPoints: number;
  scanCount: number;
  campaignStatus: string;
};

export const consumerScanResults: ConsumerScanRecord[] = [
  { code: "LT-GENUINE-1001", state: "genuine", title: "Genuine Product", message: "This QR code is authentic and linked to a verified LoyaltyTown product.", productId: "CPR-1001", rewardPoints: 120, scanCount: 1, campaignStatus: "Reward Available" },
  { code: "LT-USED-1002", state: "already-registered", title: "Already Claimed", message: "This product was already registered. You can still view product and warranty details.", productId: "CPR-1002", rewardPoints: 0, scanCount: 5, campaignStatus: "Already Registered" },
  { code: "LT-INVALID-1003", state: "invalid", title: "Invalid QR", message: "We could not verify this QR code. Please check the product packaging or contact the brand.", productId: "CPR-1003", rewardPoints: 0, scanCount: 0, campaignStatus: "Invalid" },
  { code: "LT-FAKE-1004", state: "counterfeit", title: "Counterfeit Suspected", message: "This scan has been flagged for security review. Avoid using the product until verified.", productId: "CPR-1004", rewardPoints: 0, scanCount: 12, campaignStatus: "Security Alert" },
  { code: "LT-RECALL-1005", state: "recalled", title: "Product Recalled", message: "This batch is under recall. Please stop usage and follow brand instructions.", productId: "CPR-1005", rewardPoints: 0, scanCount: 2, campaignStatus: "Recalled" },
  { code: "LT-EXPIRED-1006", state: "expired-campaign", title: "Campaign Expired", message: "This product is genuine, but the reward campaign has expired.", productId: "CPR-1001", rewardPoints: 0, scanCount: 1, campaignStatus: "Expired Campaign" },
];

export const getConsumerScanResult = (code?: string) => {
  const normalized = (code || "LT-GENUINE-1001").toUpperCase();
  if (normalized.includes("FAKE") || normalized.includes("COUNTERFEIT")) return consumerScanResults[3];
  if (normalized.includes("INVALID")) return consumerScanResults[2];
  if (normalized.includes("RECALL")) return consumerScanResults[4];
  if (normalized.includes("USED") || normalized.includes("CLAIMED")) return consumerScanResults[1];
  if (normalized.includes("EXPIRED")) return consumerScanResults[5];
  return consumerScanResults.find((item) => item.code === normalized) || consumerScanResults[0];
};
