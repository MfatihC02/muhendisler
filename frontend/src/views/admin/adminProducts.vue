<template>
  <div>
    <headerapp />
    <hr />
    <div class="container-fliud">
      <nav class="navbar bg-body-tertiary">
        <div class="d-flex justify-content-center align-items-center">
          <router-link to="addProduct">
            <a class="navbar-brand ms-5 btn btn-primary text-white" href="#"
              >Ürün ekle</a
            >
          </router-link>
          <router-link to="addmaincategories">
            <a class="navbar-brand ms-5 btn btn-primary text-white" href="#"
              >Ana Kategori Ekle</a
            >
          </router-link>
          <router-link to="subcategories">
            <a class="navbar-brand ms-5 btn btn-primary text-white" href="#"
              >alt Kategori Ekle</a
            >
          </router-link>
        </div>
      </nav>
    </div>
    <div class="container mt-5">
      <h2 class="text-title">Ürünler</h2>
      <div class="row">
        <div class="col-md-4" v-for="product in products" :key="product._id">
          <router-link
            :to="{ name: 'adminProductDetails', params: { id: product._id } }"
          >
            <div class="card mb-4">
              <img
                :src="product.imageUrl"
                class="card-img-top"
                alt="Ürün Resmi"
              />
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.price }} TL</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useAdminStore } from "@/stores/admin/product.js";
import headerapp from "@/components/headerapp.vue";

export default {
  components: { headerapp },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const adminStore = useAdminStore();
    await adminStore.fetchProducts();
    this.products = adminStore.products;
  },
};
</script>
  