<template>
  <div>
    <headerapp />
    <hr />
    <div class="container my-5">
      <div class="row">
        <div class="col-12 col-md-6 mv">
          <img :src="product.imageUrl" class="img-top" style="height: 400px" />
        </div>
        <div class="col-md-6">
          <h1 class="mb-5 border-bottom fs-1">{{ product.title }}</h1>
          <img :src="product.companyImgURL" alt="" />
          <div class="mt-3 mb-5 fs-5">
            <span
              class="text-decoration-underline fw-semibold text-danger-emphasis"
              >{{ product.title }}:</span
            >
            {{ product.description[0] }}
          </div>
          <h2 class="text-dark fs-4 fw-bold">{{ totalPrice.toFixed(2) }} TL</h2>
          <p v-if="product.stock === 0" class="text-danger">Stokta yok</p>
          <div class="d-flex align-items-center mt-5">
            <button
              class="btn btn-secondary"
              @click="decrementQty"
              :disabled="quantity <= 1"
            >
              -
            </button>
            <span class="mx-3">{{ quantity }}</span>
            <button
              class="btn btn-secondary"
              @click="incrementQty"
              :disabled="quantity >= product.stock"
            >
              +
            </button>
          </div>
          <button
            class="btn btn-success mt-3"
            @click="addToCart"
            :disabled="product.stock === 0"
          >
            Sepete Ekle
          </button>
        </div>
      </div>

      <hr class="mt-5" />

      <ul
        class="nav nav-pills mb-3 mt-5 justify-content-center"
        id="pills-tab"
        role="tablist"
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Ürün açıklaması
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Kargo gönderim
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-contact-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-contact"
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Contact
          </button>
        </li>
      </ul>

      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          tabindex="0"
        >
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              v-for="(specification, index) in product.specifications"
              :key="index"
            >
              {{ specification.key }} : {{ specification.value }}
            </li>
          </ul>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
          tabindex="0"
        >
          ...
        </div>
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
          tabindex="0"
        >
          ...
        </div>
      </div>
    </div>
    <hr />
    <app-footer />
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProduct.js";
import { useCheckoutStore } from "@/stores/checkout.js";
import { mapState } from "pinia";
import headerapp from "@/components/headerapp.vue";
import AppFooter from "@/components/footer/appFooter.vue";

export default {
  components: {
    headerapp,
    AppFooter,
  },
  computed: {
    ...mapState(useProductStore, ["products"]),
    product() {
      return useProductStore().getProductById(this.$route.params.id);
    },
    totalPrice() {
      return this.product ? this.quantity * this.product.price : 0;
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    incrementQty() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    },
    decrementQty() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async addToCart() {
      if (this.quantity > this.product.stock) {
        alert("Stok yetersiz");
        return;
      }
      try {
        const checkoutStore = useCheckoutStore();
        await checkoutStore.addToCart(this.product, this.quantity);
        this.$router.push("/checkout");
      } catch (error) {
        console.error("Sepete Ekleme Hatası:", error);
        alert("Ürün sepete eklenirken bir hata oluştu");
      }
    },
  },
};
</script>

<style scoped>
/* Stil bilgileri */
</style>
