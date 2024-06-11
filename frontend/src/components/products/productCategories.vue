<template>
  <div>
    <headerapp />
    <section class="mt-3 border-top">
      <!-- <ul class="tabs-container">
        <li class="border-end">
          <router-link to="/allProduct/hybridseeds">
            <a :class="{ active: activeTab === 'Hibrit Tohumlar' }"
              >Hibrit Tohumlar</a
            >
          </router-link>
        </li>
        <li class="border-end">
          <router-link to="/allProduct/standartseeds">
            <a :class="{ active: activeTab === 'Standart Tohumlar' }"
              >Standart Tohumlar</a
            >
          </router-link>
        </li>
        <li class="border-end">
          <router-link to="/allProduct/anchorengines">
            <a :class="{ active: activeTab === 'Çapa Motorları' }"
              >Çapa Motorları</a
            >
          </router-link>
        </li>
        <li class="border-end">
          <router-link to="/allProduct/gardenequipment">
            <a :class="{ active: activeTab === 'Bahçe Ekipmanları' }"
              >Bahçe Ekipmanları</a
            >
          </router-link>
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script>
import headerapp from "@/components/headerapp.vue";
export default {
  components: {
    headerapp,
  },
  data() {
    return {
      activeTab: "Hibrit Tohumlar",
    };
  },
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-top: 10px;
}

.tabs-container li {
  list-style: none;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tabs-container li a {
  color: #6c757d;
  text-decoration: none;
}

.tabs-container li.active a {
  background-color: #007bff;
  color: #fff;
}
</style>
