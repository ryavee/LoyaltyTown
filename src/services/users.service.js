import api from './api';

const BASE = '/users';

const getUsers = (params) => api.get(BASE, { params }).then((res) => res.data);

const getUserById = (id) => api.get(`${BASE}/${id}`).then((res) => res.data);

const createUser = (data) => api.post(BASE, data).then((res) => res.data);

const updateUser = (id, data) => api.put(`${BASE}/${id}`, data).then((res) => res.data);

const deleteUser = (id) => api.delete(`${BASE}/${id}`).then((res) => res.data);

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
