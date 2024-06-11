<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/admin/product.js';
import { useProductStore } from '@/stores/useProduct';

export default {
  name: 'App',
  setup() {
    const adminStore = useAdminStore();
    const productStore = useProductStore();

    onMounted(() => {
      // Uygulama ilk yüklendiğinde bir kere çalışacak
      adminStore.fetchProducts();
      productStore.fetchProducts();
    });
  }
};
</script>
<style>
a{
  text-decoration: none;
}
</style>