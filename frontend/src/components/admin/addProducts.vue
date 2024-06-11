<template>
  <div>
    <headerapp />
    <div class="container mt-5">
      <h2 class="mb-4">Ürün Ekle</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <!-- Ürün Adı -->
            <div class="mb-3">
              <label for="title" class="form-label">Ürün Adı</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="productData.title"
                required
              />
            </div>
            <!-- Açıklama -->
            <div class="mb-3">
              <label for="description" class="form-label">Açıklama</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="productData.description"
                required
              ></textarea>
            </div>
            <!-- Fiyat -->
            <div class="mb-3">
              <label for="price" class="form-label">Fiyat</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model.number="productData.price"
                required
              />
            </div>
            <!-- Resim URL -->
            <div class="mb-3">
              <label for="imageUrl" class="form-label">Ürün Resim URL</label>
              <input
                type="text"
                class="form-control"
                id="imageUrl"
                v-model="productData.imageUrl"
                required
              />
            </div>
            <!-- Şirket Resim URL -->
            <div class="mb-3">
              <label for="companyImgURL" class="form-label"
                >Şirket Resim URL</label
              >
              <input
                type="text"
                class="form-control"
                id="companyImgURL"
                v-model="productData.companyImgURL"
              />
            </div>
            <!-- Ana Kategori -->
            <div class="mb-3">
              <label for="mainCategory" class="form-label">Ana Kategori</label>
              <select
                class="form-control"
                id="mainCategory"
                v-model="selectedMainCategory"
                @change="loadSubCategories"
                required
              >
                <option value="">Seçiniz...</option>
                <option
                  v-for="category in mainCategories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.adi }}
                </option>
              </select>
            </div>
            <!-- Alt Kategori -->
            <div class="mb-3">
              <label for="category" class="form-label">Alt Kategori</label>
              <select
                class="form-control"
                id="category"
                v-model="productData.subCategoryName"
                required
              >
                <option value="">Seçiniz...</option>
                <option
                  v-for="subCategory in subCategories"
                  :key="subCategory._id"
                  :value="subCategory.adi"
                >
                  {{ subCategory.adi }}
                </option>
              </select>
            </div>
            <!-- Stok -->
            <div class="mb-3">
              <label for="stock" class="form-label">Stok</label>
              <input
                type="number"
                class="form-control"
                id="stock"
                v-model.number="productData.stock"
                required
              />
            </div>
            <!-- Marka -->
            <div class="mb-3">
              <label for="brand" class="form-label">Marka</label>
              <input
                type="text"
                class="form-control"
                id="brand"
                v-model="productData.brand"
                required
              />
            </div>
            <div class="mb-3">
              <label for="specifications" class="form-label">Özellikler</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="key"
                  v-model="newSpecKey"
                  placeholder="Özellik başlığı"
                />
                <input
                  type="text"
                  class="form-control"
                  id="value"
                  v-model="newSpecValue"
                  placeholder="Özelliği"
                />
                <span class="input-group-btn">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="addSpecification"
                  >
                    Ekle
                  </button>
                </span>
              </div>
              <ul class="list-group mt-2">
                <li
                  class="list-group-item"
                  v-for="(spec, index) in productData.specifications"
                  :key="index"
                >
                  {{ spec.key }}: {{ spec.value }}
                  <button
                    class="btn btn-sm btn-danger float-end"
                    @click="removeSpecification(index)"
                  >
                    Sil
                  </button>
                </li>
              </ul>
            </div>
            <button type="submit" class="btn btn-success">Ekle</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdminStore } from "@/stores/admin/product.js";
import { useCategoryStore } from "@/stores/mainCategorie.js";
import headerapp from "@/components/headerapp.vue";

export default {
  components: {
    headerapp,
  },
  name: "AddProduct",
  data() {
    return {
      productData: {
        title: "",
        description: "",
        price: null,
        imageUrl: "",
        companyImgURL: "",
        subCategory: "", // Changed from subCategoryName to subCategory
        stock: null,
        brand: "",
        specifications: [],
        variants: [],
      },
      newSpecKey: "",
      newSpecValue: "",
      mainCategories: [],
      subCategories: [],
      selectedMainCategory: "",
    };
  },
  async created() {
    const categoryStore = useCategoryStore();
    await categoryStore.fetchMainCategories();
    this.mainCategories = categoryStore.mainCategories;
  },
  methods: {
    async loadSubCategories() {
      console.log("Selected Main Category ID:", this.selectedMainCategory);
      const categoryStore = useCategoryStore();
      await categoryStore.fetchSubCategories(this.selectedMainCategory);
      this.subCategories = categoryStore.subCategories;
      console.log("Loaded Sub Categories:", this.subCategories);
    },
    async submitForm() {
      console.log("submitForm method called.");
      const adminStore = useAdminStore();
      try {
        console.log("Adding product:", this.productData);
        await adminStore.addProduct(this.productData);
        console.log("Product added successfully.");
        this.resetForm();
        console.log("Form reset.");
      } catch (error) {
        console.error("Error adding product: ", error);
      }
    },
    addSpecification() {
      if (this.newSpecKey && this.newSpecValue) {
        this.productData.specifications.push({
          key: this.newSpecKey,
          value: this.newSpecValue,
        });
        this.newSpecKey = "";
        this.newSpecValue = "";
      }
    },
    removeSpecification(index) {
      this.productData.specifications.splice(index, 1);
    },
    resetForm() {
      console.log("resetForm method called.");
      this.productData = {
        title: "",
        description: "",
        price: null,
        imageUrl: "",
        companyImgURL: "",
        subCategory: "", // Reset subCategory to empty string
        stock: null,
        brand: "",
        specifications: [],
        variants: [],
      };
      this.newSpecKey = "";
      this.newSpecValue = "";
      this.selectedMainCategory = "";
      this.subCategories = [];
    },
  },
};
</script>
<style>
/* Burada sayfanızın stilini özelleştirebilirsiniz */
</style>
