<template>
  <div>
    <headerapp />
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <h5 class="card-header bg-primary text-white text-center">
              Kayıt Ol
            </h5>
            <div class="card-body">
              <form @submit.prevent="registerUser" novalidate>
                <div class="mb-3">
                  <label for="email" class="form-label">E-posta</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="userData.email"
                    :class="{ 'is-invalid': emailError }"
                    @blur="validateEmail"
                    required
                  />
                  <div v-if="emailError" class="invalid-feedback">
                    {{ emailError }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Kullanıcı Adı</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="userData.username"
                    :class="{ 'is-invalid': usernameError }"
                    @blur="validateUsername"
                    required
                  />
                  <div v-if="usernameError" class="invalid-feedback">
                    {{ usernameError }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Parola</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="userData.password"
                    :class="{ 'is-invalid': passwordError }"
                    @blur="validatePassword"
                    required
                    minlength="6"
                  />
                  <div v-if="passwordError" class="invalid-feedback">
                    {{ passwordError }}
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-success w-100"
                  :disabled="isLoading"
                >
                  Kayıt Ol
                </button>
                <p v-if="error" class="mt-2 text-danger">{{ error }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import headerapp from "@/components/headerapp.vue";

export default {
  components: {
    headerapp,
  },
  data() {
    return {
      userData: {
        email: "",
        username: "",
        password: "",
      },
      error: null,
      isLoading: false,
      emailError: null,
      usernameError: null,
      passwordError: null,
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!this.userData.email) {
        this.emailError = "E-posta adresi zorunludur";
      } else if (!emailPattern.test(this.userData.email)) {
        this.emailError = "Lütfen geçerli bir e-posta adresi giriniz";
      } else {
        this.emailError = null;
      }
    },
    validateUsername() {
      if (!this.userData.username) {
        this.usernameError = "Kullanıcı adı zorunludur";
      } else {
        this.usernameError = null;
      }
    },
    validatePassword() {
      if (!this.userData.password) {
        this.passwordError = "Parola zorunludur";
      } else if (this.userData.password.length < 6) {
        this.passwordError = "Parola en az 6 karakter olmalıdır";
      } else {
        this.passwordError = null;
      }
    },
    async registerUser() {
      this.validateEmail();
      this.validateUsername();
      this.validatePassword();

      if (this.emailError || this.usernameError || this.passwordError) {
        this.error = "Lütfen tüm alanları doğru doldurunuz.";
        return;
      }

      this.isLoading = true;
      const authStore = useAuthStore();
      try {
        await authStore.register(this.userData);
        this.$router.push("/login");
      } catch (e) {
        console.error("Kayıt sırasında bir hata oluştu:", e);
        this.error = authStore.error || e.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
}

.card-header {
  border-bottom: 1px solid #e3e3e3;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}

.invalid-feedback {
  display: block;
}
</style>
