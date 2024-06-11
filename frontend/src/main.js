import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue';
import router from '@/router/index.js';

import { useAdminStore } from '@/stores/admin/product.js';
import { useProductStore } from '@/stores/useProduct';
import { useAuthStore } from '@/stores/authStore';
import { useCategoryStore } from '@/stores/mainCategorie.js';
import { useOrderStore } from '@/stores/admin/orderStoreByAdmin.js'; // Order store'u doğru yoldan import edin
import { useCheckoutStore } from "@/stores/checkout.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Buefy);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

// Kullanıcı verisini localStorage'dan al ve auth store'a yükle
const storedUser = localStorage.getItem('user');
if (storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData;
}

// AdminStore, ProductStore ve diğer store'ları başlatma
const adminStore = useAdminStore(pinia);
const productStore = useProductStore(pinia);
const mainCategoriesStore = useCategoryStore(pinia);
const orderStore = useOrderStore(pinia);
const addressStore = useCheckoutStore(pinia);

// Store'ları yükleyip uygulamayı başlatma
Promise.all([
  adminStore.fetchProducts(),
  productStore.fetchProducts(),
  mainCategoriesStore.fetchMainCategories(),
  orderStore.fetchOrders(),
  addressStore.fetchAddresses()
]).then(() => {
  app.mount('#app');
});
