import api from './api';

const BASE = '/distributors';

const getDistributors = (params) => api.get(BASE, { params }).then((res) => res.data);

const getDistributorById = (id) => api.get(`${BASE}/${id}`).then((res) => res.data);

const createDistributor = (data) => api.post(BASE, data).then((res) => res.data);

const updateDistributor = (id, data) => api.put(`${BASE}/${id}`, data).then((res) => res.data);

const deleteDistributor = (id) => api.delete(`${BASE}/${id}`).then((res) => res.data);

export default {
  getDistributors,
  getDistributorById,
  createDistributor,
  updateDistributor,
  deleteDistributor,
};
