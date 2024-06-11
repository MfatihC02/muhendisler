<template>
  <div>
    <headerapp />
    <div class="container py-5">
      <div class="row" v-if="productDetails">
        <div class="col-lg-6 mb-3">
          <img
            :src="productDetails.imageUrl"
            class="img-fluid"
            alt="Ürün Resmi"
          />
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold border-bottom">{{ productDetails.title }}</h2>
          <h3 class="my-3 text-primary">
            Fiyatı: {{ productDetails.price }} TL
          </h3>
          <p class="text-muted">ID: {{ productDetails._id }}</p>
          <div class="my-4">
            <button
              @click="deleteProduct(productDetails._id)"
              class="btn btn-danger"
            >
              Sil
            </button>
            <!-- Güncelleme butonu eklendi -->
            <button
              @click="goToUpdatePage(productDetails._id)"
              class="btn btn-secondary ms-2"
            >
              Güncelle
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Ürün detayları yükleniyor...</p>
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
      productDetails: null,
    };
  },
  methods: {
    async deleteProduct(id) {
      const adminStore = useAdminStore();
      await adminStore.deleteProduct(id);
      this.$router.push({ name: "adminProduct" });
    },
    goToUpdatePage(productId) {
      this.$router.push({
        name: "adminUpdateProductDetails",
        params: { id: productId },
      });
    },
  },
  async created() {
    const adminStore = useAdminStore();
    const productId = this.$route.params.id;
    await adminStore.fetchProductDetails(productId);
    this.productDetails = adminStore.productDetails;
  },
};
</script>
  