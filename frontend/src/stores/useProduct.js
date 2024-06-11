// store/useProduct.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    productDescription: [],
    isProductsFetched: false // Ürünlerin yüklenip yüklenmediğini kontrol etmek için
  }),
  getters: {
    getProductById: (state) => {
      return (productId) => state.products.find(product => product._id === productId);
    }
  },
  actions: {
    async fetchProducts(subCategoryId = null) {
      if (this.isProductsFetched) return; // Ürünler zaten yüklendiyse, tekrar yükleme

      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: { subCategoryId }
        });
        this.products = response.data;
        this.productDescriptions = response.data.map(product => product.description);

        this.isProductsFetched = true; // Ürünler başarıyla yüklendi
      } catch (error) {
        console.error('Ürünler yüklenirken bir hata oluştu:', error);
      }
    }
  }
});
