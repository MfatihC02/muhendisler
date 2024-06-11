<template>
  <div class="container p-3">
    <div class="row">
      <div class="col-md-6">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Kullanıcı Adı</label>
            <input
              type="text"
              class="form-control border-radius-5"
              id="username"
              :value="user.username"
              :disabled="!editMode"
              @input="updateUsername"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-posta</label>
            <input
              type="email"
              class="form-control border-radius-5"
              id="email"
              :value="user.email"
              :disabled="!editMode"
              @input="updateEmail"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Şifre</label>
            <input
              type="password"
              class="form-control border-radius-5"
              id="password"
              :disabled="!editMode"
              @input="updatePassword"
            />
          </div>

          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-primary"
              v-if="!editMode"
              @click="enableEditMode"
            >
              Düzenle
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              v-if="editMode"
              @click="saveUserInfo"
            >
              Kaydet
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              v-if="editMode"
              @click="cancelEdit"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
    
  <script>
import { useUserStore } from "@/stores/userStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      editMode: false,
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useUserStore, ["updateUser"]),
    enableEditMode() {
      this.editMode = true;
      this.username = this.user.username;
      this.email = this.user.email;
      this.password = this.user.password;
    },
    async saveUserInfo() {
      try {
        const toast = useToast();

        const userId = this.user._id;
        await this.updateUser(this.userInfo, userId);
        toast.success(
          "Hesap bilgileriniz başarıyla güncellenmiştir Giriş sayfasına yönlendiriliyorsunuz",
          {
            position: "top-right",
            timeout: 3000,
            closeButton: "button",
            icon: true,
            rtl: false,
          }
        );
        setTimeout(() => {
          this.$router.push("/login");
        }, 4000);
        console.log("userinfo", this.userInfo, "userıd", userId);
      } catch (error) {}
      this.editMode = false;
    },
    disableEditMode() {
      this.editMode = false;
      // Girilen değerleri kaydetme işlemi burada yapılabilir
      this.$store.updateUser({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
    cancelEdit() {
      this.editMode = false;
    },
    updateUsername(event) {
      this.userInfo.username = event.target.value;
    },
    updateEmail(event) {
      this.userInfo.email = event.target.value;
    },
    updatePassword(event) {
      this.userInfo.password = event.target.value;
    },
  },
};
</script>
    
  <style>
.border-radius-5 {
  border-radius: 5px;
}
/* Form Stili */

.form-container {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  font-weight: bold;
  transition: 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0069d9;
}

.btn-outline-secondary {
  border-color: #ddd;
  color: #333;
  transition: 0.3s ease-in-out;
}

.btn-outline-secondary:hover {
  background-color: #ddd;
  color: #000;
}
</style>
  