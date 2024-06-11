<template>
  <div>
    <headerapp />
    <h1 class="fs-2 fw-bold m-3 border-bottom">Admin Alanı</h1>
    <hr />
    <nav class="navbar bg-body-tertiary">
      <router-link to="product" class="btn btn-primary m-4"
        >Ürünleri yönetmek için tıklayın</router-link
      >
      <router-link to="orders" class="btn btn-primary m-4"
        >Siparişleri yönetmek için tıklayın</router-link
      >
    </nav>
  </div>
</template>

<script>
import headerapp from "@/components/headerapp.vue";
export default {
  components: { headerapp },
};
</script>

<style>
</style>