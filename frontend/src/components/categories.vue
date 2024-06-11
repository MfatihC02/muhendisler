<template>
  <div class="container-fluid">
    <ul
      class="list-group list-group-horizontal list-group-horizontal-sm overflow-auto"
    >
      <router-link
        v-for="category in mainCategories"
        :key="category._id"
        :to="`/allProduct/${category._id}`"
        tag="li"
        class="list-group-item flex-fill text-center mb-4 bg-success"
      >
        {{ category.adi }}
      </router-link>
    </ul>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/mainCategorie.js"; // useCategoryStore'u import edin

export default {
  data() {
    return {
      mainCategories: [],
    };
  },
  created() {
    this.fetchMainCategories();
  },
  methods: {
    async fetchMainCategories() {
      const categoryStore = useCategoryStore(); // Store'u kullanmak için tanımlayın
      await categoryStore.fetchMainCategories(); // Ana kategorileri çekin
      this.mainCategories = categoryStore.mainCategories; // Store'daki ana kategorileri ata
    },
  },
};
</script>

<style scoped>
/* ... Mevcut stil tanımlamalarınız ... */
.list-group-item {
  border: 2px solid #dee2e6;
  border-radius: 30px;
  margin-left: 10px;
  color: #dee2e6;
}
.list-group-item:hover {
  transform: scale(1.1); /* Butonun boyutunu %10 büyüt */
  transition: transform 0.3s ease; /* Animasyon süresini ve tipini belirle */
}
.list-group-horizontal > .list-group-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
}
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
}
.bg-success {
  background-color: #549577;
}
@media (max-width: 576px) {
  .list-group-horizontal-sm {
    flex-wrap: nowrap;
    font-size: 10px;
  }
}
</style>
