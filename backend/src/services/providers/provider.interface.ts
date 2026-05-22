// backend/src/services/providers/provider.interface.ts
export interface IProvider {
  sendOrder(params: {
    apiKeyEncrypted: string;
    productCode: string;
    quantity: number;
    orderId: string;
    metadata: any;
  }): Promise<{ success: boolean; data?: any; error?: string }>;
}

export interface ProviderResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  rawResponse?: any;
}