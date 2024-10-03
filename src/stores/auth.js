import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

// Initialize axios default headers if token exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: token || '',
    user: safeParse(localStorage.getItem('user'), { id: '' }), // Ensure user has an id
    guardianId: localStorage.getItem('guardianId') || '', // Add guardianId field
    status: '',
  }),
  actions: {
    async login(credentials) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/authenticate', credentials);
        const token = response.data.token;
        const guardianId = response.data.guardianId; // Get guardianId from the response
        localStorage.setItem('token', token);
        localStorage.setItem('guardianId', guardianId); // Store the guardianId
        localStorage.setItem('user', JSON.stringify({ id: guardianId })); // Store the user with guardianId
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.guardianId = guardianId; // Set guardianId in the state
        this.user = { id: guardianId }; // Set user with guardianId in the state
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        localStorage.removeItem('guardianId');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization']; // Remove header on error
        throw error;
      }
    },
    async register(user) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/register', user);
        const token = response.data.token;
        const guardianId = response.data.guardianId; // Get guardianId from the response
        localStorage.setItem('token', token);
        localStorage.setItem('guardianId', guardianId); // Store the guardianId
        localStorage.setItem('user', JSON.stringify({ id: guardianId })); // Store the user with guardianId
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.guardianId = guardianId; // Set guardianId in the state
        this.user = { id: guardianId }; // Set user with guardianId in the state
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        localStorage.removeItem('guardianId');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization']; // Remove header on error
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.guardianId = ''; // Reset guardianId
      this.user = { id: '' }; // Reset user to have an empty id
      this.status = '';
      localStorage.removeItem('token');
      localStorage.removeItem('guardianId');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization']; // Ensure header is removed
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    userId: (state) => state.user?.id, // Access user ID safely
    getGuardianId: (state) => state.guardianId, // Add getter for guardianId
  },
});

export default useAuthStore;
