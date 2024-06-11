<template>
  <div class="update-product-container">
    <headerapp />
    <h2>Ürün Detaylarını Güncelle</h2>
    <form @submit.prevent="updateProductDetails">
      <div class="mb-3">
        <label for="title" class="form-label">Ürün Adı</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="product.title"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Fiyat</label>
        <input
          type="number"
          id="price"
          class="form-control"
          v-model.number="product.price"
        />
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">Resim URL</label>
        <input
          type="text"
          id="imageUrl"
          class="form-control"
          v-model="product.imageUrl"
        />
      </div>
      <button type="submit" class="btn btn-primary">Güncelle</button>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";
import headerapp from "@/components/headerapp.vue";

export default {
  components: { headerapp },
  props: {
    productId: String,
  },
  data() {
    return {
      product: {
        title: "",
        price: 0,
        imageUrl: "",
      },
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchProductDetails() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/product/${this.productId}`
        );
        this.product = response.data;
      } catch (error) {
        this.error = "Ürün detayları yüklenirken bir hata oluştu.";
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateProductDetails() {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.put(
          `http://localhost:3000/admin/product/${this.productId}`,
          this.product
        );
        alert("Ürün başarıyla güncellendi!");
      } catch (error) {
        this.error = "Ürün güncellenirken bir hata oluştu.";
        console.error(this.error, error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchProductDetails();
  },
};
</script>
  