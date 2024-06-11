<template>
  <div>
    <headerapp />
    <section class="mt-3 border-top">
      <b-tabs type="is-toggle" expanded>
        <b-tab-item label="Hesap Bilgilerim "> <accountInfo /> </b-tab-item>
        <b-tab-item label="Adres Bilgilerim "> <adressInfo /> </b-tab-item>
        <b-tab-item label="Siparişlerim"> <orderInfo /> </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import headerapp from "@/components/headerapp.vue";
import accountInfo from "@/components/dashboardPage/accountInfo.vue";
import adressInfo from "@/components/dashboardPage/adressInfo.vue";
import orderInfo from "@/components/dashboardPage/orderInfo.vue";
export default {
  components: {
    headerapp,
    accountInfo,
    adressInfo,
    orderInfo,
  },
};
</script>

    AccountInfo
<style>
</style>