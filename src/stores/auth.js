import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
  }),
  actions: {
    async login(credentials) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/authenticate', credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';

      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        throw error;
      }
    },
    async register(user) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/register', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = {};
      this.status = '';
      localStorage.removeItem('token'); // Clear token from local storage
      delete axios.defaults.headers.common['Authorization']; // Remove Authorization header

    },   

  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
export default useAuthStore;