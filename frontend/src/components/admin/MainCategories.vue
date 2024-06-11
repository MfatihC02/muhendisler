<template>
  <div>
    <headerapp />
    <hr />
    <div class="container mt-5 mb-5">
      <h1 class="mb-4">Üst Kategori Yönetimi</h1>
      <div class="card p-4 mb-4">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="kategoriAdi" class="form-label">Kategori Adı</label>
            <input
              type="text"
              class="form-control"
              id="kategoriAdi"
              v-model="mainCategoryName"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Ekle</button>
        </form>
      </div>
      <div class="card p-4">
        <h2 class="mb-4">Mevcut Üst Kategoriler</h2>
        <ul class="list-group">
          <li
            v-for="category in mainCategories"
            :key="category._id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ category.adi }}
            <button
              class="btn btn-danger"
              @click="deleteCategory(category._id)"
            >
              Sil
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/mainCategorie";
import headerapp from "@/components/headerapp.vue";
export default {
  components: {
    headerapp,
  },
  data() {
    return {
      mainCategoryName: "",
    };
  },
  computed: {
    mainCategories() {
      const categoryStore = useCategoryStore();
      return categoryStore.mainCategories;
    },
  },
  methods: {
    submitForm() {
      console.log("Form submitted with name:", this.mainCategoryName);
      const categoryStore = useCategoryStore();
      categoryStore
        .addMainCategory({ adi: this.mainCategoryName })
        .then((response) => {
          console.log("Category added successfully:", response);
          this.mainCategoryName = ""; // Formu temizle
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    },
    deleteCategory(id) {
      const categoryStore = useCategoryStore();
      categoryStore.deleteMainCategory(id);
    },
  },
  mounted() {
    const categoryStore = useCategoryStore();
    categoryStore.fetchMainCategories();
  },
};
</script>

<style>
/* Bootstrap 5 stilini buraya ekleyebilirsiniz veya ayrı bir CSS dosyasında tutabilirsiniz */
</style>
