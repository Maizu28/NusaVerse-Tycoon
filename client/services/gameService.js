import api from './api';

const gameService = {
  getDashboardData: async () => {
    const response = await api.get('/game/dashboard');
    return response.data;
  },
  
  performProfessionAction: async () => {
    const response = await api.post('/game/perform-action');
    return response.data;
  },
  
  // Tambahkan fungsi lain seperti getBankInfo, deposit, withdraw, etc.
  getBankInfo: async () => {
    const response = await api.get('/bank/info');
    return response.data;
  },

  deposit: async (amount) => {
    const response = await api.post('/bank/deposit', { amount });
    return response.data;
  }
};

export default gameService;