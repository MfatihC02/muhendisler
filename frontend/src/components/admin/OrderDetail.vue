<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="order" class="card">
          <div class="card-header">
            <h2>Sipariş Detayı</h2>
          </div>
          <div class="card-body">
            <p><strong>ID:</strong> {{ order._id }}</p>
            <p><strong>Durum:</strong> {{ order.status }}</p>
            <label for="status">Durumu Güncelle:</label>
            <select v-model="updatedStatus" class="form-select">
              <option value="Pending">Beklemede</option>
              <option value="Shipped">Gönderildi</option>
              <option value="Delivered">Teslim Edildi</option>
            </select>
            <button @click="updateOrder" class="btn btn-primary">
              Güncelle
            </button>
            <button @click="deleteOrder" class="btn btn-danger">Sil</button>
          </div>
        </div>
        <div v-else>
          <p>Yükleniyor...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/admin/orderStoreByAdmin";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "OrderDetail",
  data() {
    return {
      order: null,
      updatedStatus: "",
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const orderStore = useOrderStore();

    return { route, router, orderStore };
  },
  watch: {
    "route.params.id": {
      immediate: true,
      async handler(newVal) {
        if (newVal) {
          await this.fetchOrder(newVal);
        }
      },
    },
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        this.order = await this.orderStore.fetchOrderById(orderId);
        if (this.order) {
          this.updatedStatus = this.order.status;
        } else {
          this.router.push("/admin/orders");
        }
      } catch (error) {
        console.error("Sipariş getirilirken hata oluştu:", error);
        // this.router.push("/admin/orders"); // Hata durumunda listeye geri dön
      }
    },
    async updateOrder() {
      const orderData = {
        status: this.updatedStatus,
      };
      try {
        await this.orderStore.updateOrder(this.order._id, orderData);
        this.order = await this.orderStore.fetchOrderById(this.order._id);
      } catch (error) {
        console.error("Sipariş güncellenirken hata oluştu:", error);
      }
    },
    async deleteOrder() {
      try {
        await this.orderStore.deleteOrder(this.order._id);
        this.router.push("/admin/orders");
      } catch (error) {
        console.error("Sipariş silinirken hata oluştu:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Stil tanımlamalarınızı buraya ekleyin */
</style>
