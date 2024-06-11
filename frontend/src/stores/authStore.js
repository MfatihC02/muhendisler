//authStore.js 
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router/index.js';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async register(userData) {
      console.log('Kayıt işlemi başlatılıyor:', userData);
      try {
        const response = await axios.post('http://localhost:3000/api/register', userData);
        this.user = response.data;
        console.log('Kayıt işlemi başarılı:', response.data);
        this.error = null;
        router.push('/login');
      } catch (error) {
        console.error('Kayıt işlemi sırasında hata:', error.response.data);
        this.error = error.response.data.message;
      }
    },
    async login(userData) {
      console.log('API isteği:', userData);
      try {
        const response = await axios.post('http://localhost:3000/api/login', userData);
        if (response.data && response.data.user) {
          this.user = response.data.user;
          this.user.token = response.data.token;

          try {
            const userStr = JSON.stringify(this.user);
            localStorage.setItem('user', userStr);
          } catch (error) {
            console.error('localStorage kaydetme hatası:', error);
            this.error = 'localStorage kaydetme hatası: ' + error.message;
            return false;
          }

          axios.defaults.headers.common['Authorization'] = `Bearer ${this.user.token}`;
          router.push('/');
          return true;
        } else {
          console.error('Giriş işlemi sırasında beklenen kullanıcı bilgisi yok.');
          this.error = 'Giriş işlemi sırasında beklenen kullanıcı bilgisi yok.';
          return false;
        }
      } catch (error) {
        console.error('Giriş işlemi sırasında hata:', error.response ? error.response.data : error);
        this.error = error.response ? error.response.data.message : error.message;
        return false;
      }
    },
    logout() {
      if (localStorage.getItem('user')) {
        // Kullanıcıyı çıkış yap
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = undefined;
        router.push('/login');
      } else {
        // Kullanıcı zaten çıkış yapmış
        console.log('Kullanıcı zaten çıkış yapmış');
      }
    },
  },
});
