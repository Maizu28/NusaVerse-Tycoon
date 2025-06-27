import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL backend Anda
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;