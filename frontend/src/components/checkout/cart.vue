<template>
  <div>
    <div class="container mx-auto mt-5">
      <div class="w-full px-4">
        <h1 class="mb-4 text-2xl font-bold border-b">Sepetim</h1>
        <div v-if="orderItems && orderItems.length > 0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ürün
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Adet
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fiyat
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Toplam
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in orderItems" :key="item.product._id">
                  <td
                    v-if="item.product.title"
                    class="px-6 py-4 whitespace-nowrap"
                  >
                    {{ item.product.title }}
                  </td>
                  <td v-else class="px-6 py-4 whitespace-nowrap text-red-600">
                    Ürün adı eksik!
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <button
                        @click="decreaseQty(item)"
                        class="bg-red-500 text-white px-3 py-1 rounded mr-2"
                      >
                        -
                      </button>
                      <span>{{ item.qty }}</span>
                      <button
                        @click="increaseQty(item)"
                        class="bg-green-500 text-white px-3 py-1 rounded ml-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.product.price.toFixed(2) }} TL
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ (item.qty * item.product.price).toFixed(2) }} TL
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      @click="removeFromCart(item.product._id)"
                      class="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Kaldır
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right mt-3">
            <h3 class="font-bold text-lg">
              Toplam:
              {{ totalCartPrice ? totalCartPrice.toFixed(2) : "0.00" }} TL
            </h3>
          </div>
        </div>
        <div v-else class="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
          <p>Sepetinizde ürün bulunmamaktadır.</p>
        </div>
        <div
          v-if="!isOrderReady"
          class="mt-4 p-4 bg-red-100 text-red-800 rounded"
        >
          <p>Sipariş oluşturulamaz. Sepette eksik ürün bilgileri var!</p>
        </div>
      </div>
      <div class="w-full px-4 mt-6">
        <h2 class="text-xl font-semibold mb-2">Sipariş Özeti</h2>
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <ul class="space-y-4">
            <li
              v-for="(item, index) in cartItems"
              :key="index"
              class="flex items-center justify-between"
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.description"
                  class="w-16 h-16 object-center object-cover rounded"
                />
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ item.product.title }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ item.qty }} x {{ item.product.price.toFixed(2) }} TL
                  </p>
                </div>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{ (item.qty * item.product.price).toFixed(2) }} TL
              </p>
            </li>
          </ul>
          <div class="border-t border-gray-200 py-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Toplam</p>
              <p class="text-sm font-medium text-gray-900">
                {{ totalCartPrice.toFixed(2) }} TL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCheckoutStore } from "@/stores/checkout.js";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useCheckoutStore, ["orderItems", "totalPrice"]),
    cartItems() {
      return this.orderItems;
    },
    subtotal() {
      return this.totalPrice;
    },
    totalCartPrice() {
      return this.orderItems.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      );
    },
    isOrderReady() {
      return this.orderItems.every(
        (item) => item.product && item.product.title && item.qty && item.price
      );
    },
  },
  methods: {
    ...mapActions(useCheckoutStore, [
      "removeFromCart",
      "updateCartItemQty",
      "loadCartFromLocalStorage",
    ]),
    increaseQty(item) {
      this.updateCartItemQty({ product: item.product, qty: item.qty + 1 });
    },
    decreaseQty(item) {
      if (item.qty > 1) {
        this.updateCartItemQty({ product: item.product, qty: item.qty - 1 });
      }
    },
  },
  mounted() {
    this.loadCartFromLocalStorage();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.table {
  width: 100%;
  margin-bottom: 20px;
}
.total {
  text-align: right;
}
.text-danger {
  color: red;
}
</style>
