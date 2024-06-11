<template>
  <div class="container mt-5">
    <div class="row ms-auto d-flex justify-content-between align-items-center">
      <!-- v-for ile ürün kartlarını döngüye al -->
      <div class="col-md-3 mb-3" v-for="product in products" :key="product.id">
        <router-link :to="'/products/' + product._id">
          <div class="card">
            <!-- Ürün resmi -->
            <img :src="product.imageUrl" class="" style="height: 200px" />
            <!-- Kart içeriği -->
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Detaylarına Git
                  </button>
                </div>
                <small class="fs-6 fw-bold">{{ product.price }} TL</small>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProduct.js";

export default {
  data() {
    return {
      // Pinia store'dan ürünleri al
      products: useProductStore().products,
    };
  },
  created() {
    // Uygulama oluşturulduğunda ürünleri yükle
    this.$nextTick(() => {
      useProductStore().fetchProducts();
    });
  },
};
</script>

<style>
.card-img-top {
  min-height: 400px;
}
</style>
