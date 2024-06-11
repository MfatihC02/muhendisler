<template>
  <div>
    <h1>Orders</h1>
    <OrderList @order-selected="viewOrderDetail" />
    <OrderDetail v-if="selectedOrderId" :orderId="selectedOrderId" />
  </div>
</template>
  
  <script>
import OrderList from "../../components/admin/OrderList.vue";
import OrderDetail from "../../components/admin/OrderDetail.vue";

export default {
  components: { OrderList, OrderDetail },
  data() {
    return {
      selectedOrderId: null,
    };
  },
  methods: {
    viewOrderDetail(orderId) {
      this.selectedOrderId = orderId;
    },
  },
};
</script>
  
  <style>
</style>
  