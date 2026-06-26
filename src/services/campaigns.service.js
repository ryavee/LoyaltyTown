import api from './api';

const BASE = '/campaigns';

const getCampaigns = (params) => api.get(BASE, { params }).then((res) => res.data);

const getCampaignById = (id) => api.get(`${BASE}/${id}`).then((res) => res.data);

const createCampaign = (data) => api.post(BASE, data).then((res) => res.data);

const updateCampaign = (id, data) => api.put(`${BASE}/${id}`, data).then((res) => res.data);

const deleteCampaign = (id) => api.delete(`${BASE}/${id}`).then((res) => res.data);

const exportCampaignAnalytics = (id, params) => api.get(`${BASE}/${id}/export`, { params, responseType: 'blob' }).then((res) => res.data);

export default {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  exportCampaignAnalytics,
};
