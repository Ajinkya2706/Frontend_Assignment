import api from './apiClient';

export const listNotes = async (params = {}) => {
  const { data } = await api.get('/api/notes', { params });
  return data;
};

export const createNote = async (payload) => {
  const { data } = await api.post('/api/notes', payload);
  return data;
};

export const updateNote = async (id, payload) => {
  const { data } = await api.put(`/api/notes/${id}`, payload);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/api/notes/${id}`);
  return data;
};

