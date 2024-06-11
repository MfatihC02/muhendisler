<template>
  <div>
    <Headerapp />
    <br />
    <Categories />
    <div class="container-fluid mt-5 border-top">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <a
              v-for="subCategory in subCategories"
              :key="subCategory._id"
              class="list-group-item list-group-item-action"
              :class="{ active: subCategory._id === selectedSubCategoryId }"
              @click="selectSubCategory(subCategory._id)"
            >
              {{ subCategory.adi }}
            </a>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card border-0">
            <div class="card-body p-0">
              <div
                v-for="subCategory in subCategories"
                :key="subCategory._id"
                class="tab-pane fade"
                :class="{ show: subCategory._id === selectedSubCategoryId }"
              >
                <ProductsCard
                  :subCategoryId="subCategory._id"
                  v-if="subCategory._id === selectedSubCategoryId"
                  @add-to-cart="handleAddToCart"
                  :products="products"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/mainCategorie.js";
import ProductsCard from "@/components/products/productsCard.vue";
import Categories from "@/components/categories.vue";
import Headerapp from "@/components/headerapp.vue";
import { useProductStore } from "@/stores/useProduct.js";

export default {
  components: {
    ProductsCard,
    Categories,
    Headerapp,
  },
  data() {
    return {
      subCategories: [],
      selectedSubCategoryId: null,
      products: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchSubCategories(id);
    }
    this.fetchProducts();
    console.log("Tüm ürünler:", this.products); // Tüm ürünleri konsola yazdır
  },
  methods: {
    async fetchSubCategories(id) {
      try {
        const categoryStore = useCategoryStore();
        await categoryStore.fetchSubCategories(id);
        this.subCategories = categoryStore.subCategories;
        if (this.subCategories.length > 0) {
          this.selectedSubCategoryId = this.subCategories[0]._id;
        }
        console.log("Alt kategoriler yüklendi:", this.subCategories);
      } catch (error) {
        console.error("Alt kategorileri alma hatası", error);
      }
    },
    selectSubCategory(subCategoryId) {
      this.selectedSubCategoryId = subCategoryId;
      this.fetchProducts(subCategoryId); // Alt kategoriye göre ürünleri çek
    },
    async fetchProducts(subCategoryId = null) {
      try {
        const productStore = useProductStore();
        await productStore.fetchProducts(subCategoryId);
        this.products = productStore.products;
        console.log("Ürünler yüklendi:", this.products);
      } catch (error) {
        console.error("Ürünleri alma hatası", error);
      }
    },
    handleAddToCart(product) {
      if (!product || !product.title) {
        console.error("Ürün bilgileri eksik veya geçersiz!");
        return;
      }

      const productInfo = {
        ...product,
        productName: product.title,
      };

      console.log("Ürün adı:", productInfo.productName);
      this.$emit("add-to-cart", productInfo);
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchSubCategories(newId);
          this.fetchProducts();
        }
      },
    },
  },
};
</script>

<style scoped>
.list-group-item.active {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.card {
  border: none;
}

.card-body {
  padding: 0;
}
</style>