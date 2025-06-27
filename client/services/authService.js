import api from './api';

const authService = {
  // NOTE: Backend harus mengembalikan { token, user } saat login berhasil
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
};

export default authService;