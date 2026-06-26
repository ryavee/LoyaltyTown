import api from "./api";

/**
 * Fetch the wallet summary for a customer.
 * GET /v1/customers/:id/wallet
 *
 * @param {string|number} customerId
 * @returns {Promise<{ currentBalance: number, totalEarned: number, totalRedeemed: number }>}
 */
export const getWallet = async (customerId) => {
  const response = await api.get(`/customers/${customerId}/wallet`);
  return response.data;
};

/**
 * Fetch transaction history for a customer.
 * GET /v1/customers/:id/transactions
 *
 * @param {string|number} customerId
 * @param {{ page?: number, limit?: number }} [params]
 * @returns {Promise<{ transactions: Array<{ id: string, date: string, type: string, points: number, description: string }>, total: number, page: number, limit: number }>}
 */
export const getTransactions = async (customerId, params = {}) => {
  const response = await api.get(`/customers/${customerId}/transactions`, {
    params, // pass only what the consumer explicitly provides
  });
  return response.data;
};

export const adjustPoints = async (customerId, data) => {
  const response = await api.post(`/customers/${customerId}/adjust`, data);
  return response.data;
};

export const getExpiry = async (customerId) => {
  const response = await api.get(`/customers/${customerId}/points/expiry`);
  return response.data;
};
