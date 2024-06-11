<template>
  <div>
    <headerapp />
    <div class="container mt-3">
      <h2>Alt Kategori Yönetimi</h2>
      <!-- Alt Kategori Ekleme Formu -->
      <div class="mb-3">
        <label for="subCategoryName" class="form-label">Alt Kategori Adı</label>
        <input
          type="text"
          class="form-control"
          id="subCategoryName"
          v-model="subCategoryName"
          required
        />
      </div>
      <div class="mb-3">
        <label for="mainCategorySelect" class="form-label">Üst Kategori</label>
        <select
          class="form-select"
          id="mainCategorySelect"
          v-model="selectedMainCategory"
          @change="fetchSubCategories"
          required
        >
          <option disabled value="">Lütfen bir kategori seçin</option>
          <option
            v-for="category in mainCategories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.adi }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" @click="submitForm">
        Ekle
      </button>

      <!-- Alt Kategorileri Listeleme ve Silme -->
      <ul class="list-group mt-4">
        <li
          v-for="subCategory in filteredSubCategories"
          :key="subCategory._id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ subCategory.adi }}
          <button
            class="btn btn-danger"
            @click="deleteSubCategory(subCategory._id)"
          >
            Sil
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "@/stores/mainCategorie.js";
import headerapp from "@/components/headerapp.vue";

const subCategoryName = ref("");
const selectedMainCategory = ref("");
const categoryStore = useCategoryStore();
const mainCategories = ref([]);

onMounted(async () => {
  await categoryStore.fetchMainCategories();
  mainCategories.value = categoryStore.mainCategories;
  if (mainCategories.value.length > 0) {
    selectedMainCategory.value = mainCategories.value[0]._id; // İlk üst kategoriyi varsayılan olarak seç
  }
});

const submitForm = () => {
  categoryStore.addSubCategory({
    adi: subCategoryName.value,
    ustKategoriAdi: mainCategories.value.find(
      (category) => category._id === selectedMainCategory.value
    )?.adi,
  });
  subCategoryName.value = "";
};

const filteredSubCategories = computed(() => {
  return categoryStore.subCategories.filter(
    (subCategory) => subCategory.ustKategoriId === selectedMainCategory.value
  );
});

const fetchSubCategories = () => {
  categoryStore.fetchSubCategories(selectedMainCategory.value);
};

const deleteSubCategory = (id) => {
  categoryStore.deleteSubCategory(id);
};
</script>
  
  <style>
/* Burada gerekli stil tanımlamalarınız olabilir */
</style>
  