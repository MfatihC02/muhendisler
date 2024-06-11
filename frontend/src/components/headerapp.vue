<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Logo için bir link -->
      <RouterLink class="nav-link" :to="{ name: 'home' }"
        ><img src="@/assets/fotos/analogoheader.png" alt=""
      /></RouterLink>
      <!-- Hamburger menü butonu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navbar linkleri -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'home' }"
              >Anasayfa</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'about' }"
              >Hakkımızda</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              v-if="!isLoggedIn"
              :to="{ name: 'register' }"
              >Kayıt ol</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              v-if="!isLoggedIn"
              :to="{ name: 'login' }"
              >Giriş yap</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              v-if="isLoggedIn"
              :to="{ name: 'dashboard' }"
              >Hesabım</RouterLink
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link" @click="logoutUser">Çıkış yap</button>
          </li>
          <router-link :to="{ name: 'adminindexpage' }">
            <li class="nav-item" v-if="isLoggedIn">
              <button class="nav-link">Admin alanı</button>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "isAdmin"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),

    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style>
.nav-link {
  padding-left: 25px !important ;
}
.nav-link:hover {
  color: rgb(146, 228, 140) !important;
}
</style>