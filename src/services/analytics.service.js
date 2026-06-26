import api from './api';

const getOverview = (params) => api.get('/analytics/overview', { params }).then((res) => res.data);

const getScanTrends = (params) => api.get('/analytics/scan-trends', { params }).then((res) => res.data);

const getProductPerformance = (params) => api.get('/analytics/product-performance', { params }).then((res) => res.data);

const getBatchPerformance = (params) => api.get('/analytics/batch-performance', { params }).then((res) => res.data);

const exportAnalytics = (params) => api.get('/analytics/export', { params, responseType: 'blob' }).then((res) => res.data);

export default {
  getOverview,
  getScanTrends,
  getProductPerformance,
  getBatchPerformance,
  exportAnalytics,
};
