import axios from 'axios';
import { buildApiUrl } from '../config/api.config';
import { APP_CONFIG } from '../config/constants';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'dd5d2d2d2e52d548dce2a1cd916476a8';

if (!TMDB_API_KEY) {
  console.error('TMDb API key is missing! Please set VITE_TMDB_API_KEY in your .env file');
}

const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_TOKEN);
    }
    return Promise.reject(error);
  }
);

export const fetchData = async (endpoint, params = {}) => {
  try {
    if (!TMDB_API_KEY) {
      return {
        data: null,
        error: 'TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file.'
      };
    }

    const url = buildApiUrl(endpoint);
    const finalParams = {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      ...params
    };
    
    const response = await apiClient.get(url, { params: finalParams });
    
    if (response.data?.status_code === 7) {
      return {
        data: null,
        error: 'Invalid API key. Please check your TMDb API key.'
      };
    }
    
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = 
      error.response?.data?.status_message ||
      error.response?.data?.message ||
      error.message ||
      'An error occurred';
    
    if (errorMessage.includes('Invalid API key') || errorMessage.includes('You must be granted')) {
      return {
        data: null,
        error: 'Invalid API key. Please verify your TMDb API key is correct and active.'
      };
    }
    
    return {
      data: null,
      error: errorMessage
    };
  }
};

export const postData = async (endpoint, payload = {}) => {
  try {
    const url = buildApiUrl(endpoint);
    const response = await apiClient.post(url, payload);
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message || 'An error occurred'
    };
  }
};

export const deleteData = async (endpoint) => {
  try {
    const url = buildApiUrl(endpoint);
    const response = await apiClient.delete(url);
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || error.message || 'An error occurred'
    };
  }
};

export default apiClient;

