import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Bins API endpoints
export const binsAPI = {
  getBins: () => api.get('/bins'),
  getBin: (id) => api.get(`/bins/${id}`),
  updateBinLevel: (id, level) => api.put(`/bins/${id}`, { level })
};

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  changePassword: (data) => api.put('/auth/change-password', data)
};

// Monitoring API endpoints
export const monitoringAPI = {
  getSummary: () => api.get('/monitoring/summary'),
  getWeeklyData: (date) => api.get('/monitoring/weekly', { params: { date } }),
  getMonthlyData: (date) => api.get('/monitoring/monthly', { params: { date } })
};

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;