<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    <div class="flex flex-wrap -mx-4">
      <!-- Adres Formu -->
      <div class="w-full md:w-1/2 px-4">
        <AddressFormComponent />
      </div>
      <!-- Diğer Bileşenler -->
      <div class="w-full md:w-1/2 px-4 mt-8 md:mt-0">
        <cart />
      </div>
    </div>
  </div>
</template>
  
  <script>
import AddressFormComponent from "@/components/checkout/AddressFormComponent.vue";
import cart from "@/components/checkout/cart.vue";
export default {
  components: {
    AddressFormComponent,
    cart,
  },
};
</script>
  
  <style>
/* Eğer özel stil eklemek isterseniz buraya ekleyebilirsiniz */
</style>
  