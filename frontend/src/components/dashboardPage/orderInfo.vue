<template>
  <div class="container-fluid mt-5">
    <h1 class="mb-4 fs-2 fw-bold">Kullanıcı Siparişleri</h1>
    <div v-if="windowWidth >= 1000">
      <div v-if="orders.length === 0" class="alert alert-warning">
        Sipariş bulunamadı.
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover table-striped table-bordered">
          <thead class="table-info">
            <tr>
              <th scope="col">Sipariş ID</th>
              <th scope="col">Toplam Fiyat</th>
              <th scope="col">Durum</th>
              <th scope="col">Oluşturulma Zamanı</th>
              <th scope="col">Ürünler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td class="align-middle text-dark">{{ order._id }}</td>
              <td class="align-middle text-dark">{{ order.totalPrice }} TL</td>
              <td class="align-middle text-dark">{{ order.status }}</td>
              <td class="align-middle text-dark">
                {{ formatDate(order.createdAt) }}
              </td>
              <td>
                <table class="table table-sm table-warning">
                  <thead>
                    <tr>
                      <th scope="col">Ürün Adı</th>
                      <th scope="col">Miktar</th>
                      <th scope="col">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.orderItems" :key="item._id">
                      <td class="text-dark">{{ item.name }}</td>
                      <td class="text-dark">{{ item.qty }}</td>
                      <td class="text-dark">{{ item.price }} TL</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <!-- Mobil tasarım -->
      <div v-if="orders.length === 0" class="alert alert-warning">
        Sipariş bulunamadı.
      </div>
      <div v-else>
        <div v-for="order in orders" :key="order._id">
          <div class="card mb-3" style="background-color: #f8f9fa">
            <div class="card-body">
              <h5 class="card-title" style="color: #343a40">
                Sipariş ID: {{ order._id }}
              </h5>
              <p class="card-text" style="color: #6c757d">
                Toplam Fiyat: {{ order.totalPrice }} TL
              </p>
              <p class="card-text" style="color: #6c757d">
                Durum: {{ order.status }}
              </p>
              <p class="card-text" style="color: #6c757d">
                Oluşturulma Zamanı: {{ formatDate(order.createdAt) }}
              </p>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item"
                  v-for="item in order.orderItems"
                  :key="item._id"
                >
                  <div class="d-flex justify-content-between">
                    <span style="color: #343a40"
                      >Ürün Adı: {{ item.name }}</span
                    >
                    <span style="color: #6c757d">Miktar: {{ item.qty }}</span>
                    <span style="color: #6c757d"
                      >Fiyat: {{ item.price }} TL</span
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useOrderStore } from "@/stores/orderStoreByUser";

export default {
  name: "OrderInfo",
  data() {
    return {
      userId: null,
      windowWidth: window.innerWidth, // Ekran genişliğini izlemek için
    };
  },
  computed: {
    ...mapState(useOrderStore, ["orders"]),
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      this.userId = user._id;
      this.fetchOrdersByUserId(this.userId);
    } else {
      console.error(
        "localStorage'da kullanıcı bilgisi bulunamadı veya kullanıcı ID'si eksik"
      );
    }

    // Ekran genişliği değiştiğinde yeniden hesapla
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    // Listener'ı kaldır
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions(useOrderStore, ["fetchOrdersByUserId"]),
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleDateString("tr-TR", options);
    },
  },
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table {
  word-wrap: break-word;
}

.table thead th {
  vertical-align: middle;
  text-align: center;
}

.table tbody td {
  vertical-align: middle;
  text-align: center;
  background-color: #f8f9fa;
}

.table-sm thead th {
  background-color: #f0ad4e;
}

.table-sm tbody td {
  background-color: #fcf8e3;
}

h1 {
  color: #333;
  text-align: center;
}
</style>
