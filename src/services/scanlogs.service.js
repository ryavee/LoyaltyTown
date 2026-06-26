import api from './api';

const BASE = '/scan-logs';

const getScanLogs = (params) => api.get(BASE, { params }).then((res) => res.data);

const getScanLogById = (id) => api.get(`${BASE}/${id}`).then((res) => res.data);

const exportScanCsv = (params) => api.get(`${BASE}/export`, { params, responseType: 'blob' }).then((res) => res.data);

export default {
  getScanLogs,
  getScanLogById,
  exportScanCsv,
};
