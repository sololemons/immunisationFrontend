import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

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
    user: safeParse(localStorage.getItem('user'), {}),
    status: '',
  }),
  actions: {
    async login(credentials) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/authenticate', credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
      }
    },
    async register(user) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/register', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = {};
      this.status = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});

export default useAuthStore;
