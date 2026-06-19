export interface GenerateQrBatchDto {
  batchName: string;
  productId: string;
  quantity: number;

  dealerId?: string;
  distributorId?: string;
  campaignId?: string;

  expiryDate?: string;
  remarks?: string;
}
