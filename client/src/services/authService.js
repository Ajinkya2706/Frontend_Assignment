import api from './apiClient';

export const loginRequest = async (payload) => {
  const { data } = await api.post('/api/auth/login', payload);
  return data;
};

export const registerRequest = async (payload) => {
  const { data } = await api.post('/api/auth/register', payload);
  return data;
};

export const fetchProfile = async () => {
  const { data } = await api.get('/api/profile');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put('/api/profile', payload);
  return data;
};

