<template>
  <div class="container-fliud">
    <headerapp />
    <div class="row">
      <div class="col-12">
        <Categories />
        <productsCard />
      </div>
    </div>
  </div>
</template>
<script>
import productsCard from "@/components/products/productsCard.vue";
import Categories from "@/components/categories.vue";
import Headerapp from "@/components/headerapp.vue";

export default {
  components: {
    productsCard,
    Categories,
    Headerapp,
  },
};
</script>
