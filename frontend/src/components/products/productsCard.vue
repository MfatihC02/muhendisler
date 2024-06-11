<template>
  <div>
    <div class="container-fluid mt-5">
      <div class="row ms-auto d-flex justify-content-center align-items-center">
        <div
          class="col-md-12 col-lg-12 mb-4"
          v-for="product in filteredProducts"
          :key="product._id"
        >
          <router-link
            :to="'/products/' + product._id"
            class="text-decoration-none"
          >
            <div class="card h-100 col-6">
              <img
                :src="product.imageUrl"
                class="card-img-top img-fluid"
                style="height: 200px; object-fit: contain"
                alt="Product Image"
              />
              <div class="card-body d-flex flex-column">
                <h5
                  class="card-title text-center fs-3 fw-semibold text-uppercase"
                >
                  {{ product.title }}
                </h5>
                <div
                  class="mt-auto d-flex justify-content-between align-items-center"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Detaylarına Git
                  </button>
                  <small class="fs-6 fw-bold text-nowrap"
                    >{{ product.price }} TL</small
                  >
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProduct.js";

export default {
  props: {
    subCategoryId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      if (!this.subCategoryId) {
        return this.products;
      }
      return this.products.filter(
        (product) => product.subCategory === this.subCategoryId
      );
    },
  },
  async created() {
    await this.fetchProducts(this.subCategoryId);
  },
  methods: {
    async fetchProducts(subCategoryId) {
      try {
        const productStore = useProductStore();
        await productStore.fetchProducts(subCategoryId);
        this.products = productStore.products;
      } catch (error) {
        console.error("Error fetching products", error);
      }
    },
  },
  watch: {
    subCategoryId: {
      immediate: true,
      handler(newSubCategoryId) {
        this.fetchProducts(newSubCategoryId);
      },
    },
  },
};
</script>

<style scoped>
.card-img-top {
  min-height: 200px;
}
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}

/* New rule for responsive overflow handling */
@media (min-width: 768px) and (max-width: 1000px) {
  .card-body {
    overflow: visible; /* Allow overflow within the card body */
    max-height: 250px; /* Set a maximum height to prevent excessive stretching */
  }
}

.mt-auto {
  margin-top: auto;
}
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text-nowrap {
  white-space: nowrap;
}
</style>
