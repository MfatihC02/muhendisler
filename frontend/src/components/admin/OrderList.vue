<template>
  <div>
    <h2>Order List</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Sipariş ID</th>
          <th>Kullanıcı Adı</th>
          <th>Toplam Tutar</th>
          <th>Durum</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>
            {{
              order.user && order.user.username
                ? order.user.username
                : "Unknown User"
            }}
          </td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button class="btn btn-primary" @click="editOrder(order._id)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/admin/orderStoreByAdmin"; // Yolu kontrol edin
import { useRouter } from "vue-router";

export default {
  setup() {
    const orderStore = useOrderStore();
    const router = useRouter();

    const editOrder = (orderId) => {
      router.push(`/admin/orders/${orderId}`);
    };

    const fetchOrdersWithUserNames = async () => {
      await orderStore.fetchOrdersWithUserNames();
      console.log("Orders fetched with user names:", orderStore.orders);
    };

    fetchOrdersWithUserNames();

    return {
      orders: orderStore.orders,
      editOrder,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
