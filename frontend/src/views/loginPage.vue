<template>
  <div>
    <headerapp />
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <h5 class="card-header bg-primary text-white text-center">
              Giriş Yap
            </h5>
            <div class="card-body">
              <form @submit.prevent="loginUser" novalidate>
                <div class="mb-3">
                  <label for="email" class="form-label">E-posta</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="loginData.email"
                    :class="{ 'is-invalid': emailError }"
                    @blur="validateEmail"
                    required
                  />
                  <div v-if="emailError" class="invalid-feedback">
                    {{ emailError }}
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Parola</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="loginData.password"
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
                  class="btn btn-primary w-100"
                  :disabled="isLoading"
                >
                  Giriş Yap
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
import { useAuthStore } from "@/stores/authStore.js";
import headerapp from "@/components/headerapp.vue";

export default {
  components: { headerapp },
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      error: null,
      isLoading: false,
      emailError: null,
      passwordError: null,
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!this.loginData.email) {
        this.emailError = "E-posta adresi zorunludur";
      } else if (!emailPattern.test(this.loginData.email)) {
        this.emailError = "Lütfen geçerli bir e-posta adresi giriniz";
      } else {
        this.emailError = null;
      }
    },
    validatePassword() {
      if (!this.loginData.password) {
        this.passwordError = "Parola zorunludur";
      } else if (this.loginData.password.length < 6) {
        this.passwordError = "Parola en az 6 karakter olmalıdır";
      } else {
        this.passwordError = null;
      }
    },
    async loginUser() {
      this.validateEmail();
      this.validatePassword();
      if (this.emailError || this.passwordError) {
        this.error = "Lütfen tüm alanları doğru doldurunuz.";
        return;
      }
      this.isLoading = true;
      const authStore = useAuthStore();
      try {
        const result = await authStore.login(this.loginData);
        if (result) {
          this.$router.push("/dashboard");
        } else {
          this.error = authStore.error;
        }
      } catch (error) {
        console.error("Giriş işlemi sırasında hata:", error);
        this.error = "Giriş sırasında bir hata oluştu.";
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

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}

.invalid-feedback {
  display: block;
}
</style>
