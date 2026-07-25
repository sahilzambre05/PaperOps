import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', timeout: 15000 });
export const getHealth = () => api.get('/api/grade-change/health');
export const getPrediction = (payload) => api.post('/api/grade-change/predict', payload);
