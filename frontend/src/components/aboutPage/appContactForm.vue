<template>
    <div class="contact-form  mt-4">
      <h3 class="border-bottom">İletişim Formu</h3>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Adınız</label>
          <input type="text" class="form-control" id="name" v-model="form.name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-posta Adresiniz</label>
          <input type="email" class="form-control" id="email" v-model="form.email" required>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Mesajınız</label>
          <textarea class="form-control" id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Gönder</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactForm',
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm() {
        console.log(this.name,this.email, this.message);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  