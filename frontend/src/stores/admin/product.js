import { defineStore } from 'pinia';
import axios from 'axios';

const setupAxios = (token) => {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('Axios setup completed with token:', token);
};

export const useAdminStore = defineStore('admin', {
  state: () => ({
    products: [],
    productDetails: null,
    user: null,
    token: null,
  }),
  actions: {
    async fetchProducts() {
      const token = this.getToken();
      if (!token) {
        console.error('Yetkisiz erişim: Token bulunamadı');
        return;
      }
      setupAxios(token);

      try {
        console.log('Fetching products...');
        const response = await axios.get('/api/products');
        this.products = response.data;
        console.log('Ürünler başarıyla yüklendi:', response.data);
      } catch (error) {
        console.error('Ürünler yüklenirken bir hata oluştu:', error);
      }
    },
    async fetchProductDetails(id) {
      const token = this.getToken();
      if (!token) {
        console.error('Yetkisiz erişim: Token bulunamadı');
        return;
      }
      setupAxios(token);

      try {
        console.log(`Fetching product details for ID: ${id}`);
        const response = await axios.get(`/api/products/${id}`);
        this.productDetails = response.data;
        console.log('Ürün detayları başarıyla yüklendi:', response.data);
      } catch (error) {
        console.error('Ürün detayları yüklenirken bir hata oluştu:', error);
      }
    },
    async addProduct(productData) {
      const token = this.getToken();
      if (!token) {
        console.error('Yetkisiz erişim: Token bulunamadı');
        return;
      }
      setupAxios(token);

      try {
        console.log('Adding product:', productData);
        const response = await axios.post('/admin/product', productData);
        this.products.push(response.data);
        console.log('Ürün başarıyla eklendi:', response.data);
      } catch (error) {
        console.error('Ürün eklenirken bir hata oluştu:', error);
      }
    },
    async updateProduct(id, productData) {
      const token = this.getToken();
      if (!token) {
        console.error('Yetkisiz erişim: Token bulunamadı');
        return;
      }
      setupAxios(token);

      try {
        console.log(`Updating product with ID: ${id}`, productData);
        const response = await axios.put(`/admin/product/${id}`, productData);
        const index = this.products.findIndex((product) => product._id === id);
        if (index !== -1) {
          this.products[index] = response.data;
          console.log('Ürün başarıyla güncellendi:', response.data);
        }
      } catch (error) {
        console.error('Ürün güncellenirken bir hata oluştu:', error);
      }
    },
    async deleteProduct(id) {
      const token = this.getToken();
      if (!token) {
        console.error('Yetkisiz erişim: Token bulunamadı');
        return;
      }
      setupAxios(token);

      try {
        console.log(`Deleting product with ID: ${id}`);
        await axios.delete(`/admin/product/${id}`);
        this.products = this.products.filter((product) => product._id !== id);
        console.log('Ürün başarıyla silindi:', id);
      } catch (error) {
        console.error('Ürün silinirken bir hata oluştu:', error);
      }
    },
    getToken() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return userData.token;
      }
      return null;
    }
  },
  created() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.user = userData;
      this.token = userData.token;
    }
  }
});
