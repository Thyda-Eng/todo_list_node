import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const fetchCsrfToken = async () => {
  try {
    const response = await api.get('/csrf-token');
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

export { api, setAuthToken, fetchCsrfToken };