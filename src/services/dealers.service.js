import api from './api';

const BASE = '/dealers';

const getDealers = (params) => api.get(BASE, { params }).then((res) => res.data);

const getDealerById = (id) => api.get(`${BASE}/${id}`).then((res) => res.data);

const createDealer = (data) => api.post(BASE, data).then((res) => res.data);

const updateDealer = (id, data) => api.put(`${BASE}/${id}`, data).then((res) => res.data);

const deleteDealer = (id) => api.delete(`${BASE}/${id}`).then((res) => res.data);

export default {
  getDealers,
  getDealerById,
  createDealer,
  updateDealer,
  deleteDealer,
};
