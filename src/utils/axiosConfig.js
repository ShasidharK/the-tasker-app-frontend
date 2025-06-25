import axios from 'axios';

const URL = import.meta.env.VITE_API_URL
// Create an axios instance with default config
const api = axios.create({
  baseURL: `${URL}/api`
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (401) or forbidden (403), redirect to login
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear local storage
      localStorage.removeItem('token');
      
      // Redirect to login page
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;