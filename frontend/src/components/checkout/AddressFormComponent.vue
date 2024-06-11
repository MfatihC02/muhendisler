<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Adres Bilgileri</h2>
    <form @submit.prevent="createAddressHandler" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700"
            >Ad Soyad</label
          >
          <input
            v-model="addressData.fullName"
            type="text"
            id="fullName"
            name="fullName"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            for="phoneNumber"
            class="block text-sm font-medium text-gray-700"
            >Telefon Numarası</label
          >
          <input
            v-model="addressData.phoneNumber"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+90 (555) 555-5555"
            required
          />
        </div>
      </div>
      <div>
        <label
          for="addressLine1"
          class="block text-sm font-medium text-gray-700"
          >Açık Adres</label
        >
        <input
          v-model="addressData.addressLine1"
          type="text"
          id="addressLine1"
          name="addressLine1"
          class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            for="neighborhood"
            class="block text-sm font-medium text-gray-700"
            >Mahalle</label
          >
          <input
            v-model="addressData.neighborhood"
            type="text"
            id="neighborhood"
            name="neighborhood"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label for="street" class="block text-sm font-medium text-gray-700"
            >Sokak</label
          >
          <input
            v-model="addressData.street"
            type="text"
            id="street"
            name="street"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            for="doorNumber"
            class="block text-sm font-medium text-gray-700"
            >Kapı No</label
          >
          <input
            v-model="addressData.doorNumber"
            type="text"
            id="doorNumber"
            name="doorNumber"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700"
            >İl</label
          >
          <input
            v-model="addressData.city"
            type="text"
            id="city"
            name="city"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Konya"
            required
          />
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-gray-700"
            >İlçe</label
          >
          <input
            v-model="addressData.state"
            type="text"
            id="state"
            name="state"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Meram"
            required
          />
        </div>
        <div>
          <label
            for="postalCode"
            class="block text-sm font-medium text-gray-700"
            >Posta Kodu</label
          >
          <input
            v-model="addressData.postalCode"
            type="text"
            id="postalCode"
            name="postalCode"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="06000"
            required
          />
        </div>
        <div>
          <label for="tcNumber" class="block text-sm font-medium text-gray-700"
            >TC Kimlik No</label
          >
          <input
            v-model="addressData.tcNumber"
            type="text"
            id="tcNumber"
            name="tcNumber"
            class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <label for="companyName" class="block text-sm font-medium text-gray-700"
          >Firma Adı (isteğe bağlı)</label
        >
        <input
          v-model="addressData.companyName"
          type="text"
          id="companyName"
          name="companyName"
          class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md shadow-lg"
        >
          Adres Ekle
        </button>
      </div>
      <div v-if="loading" class="text-center">Loading...</div>
    </form>
  </div>
</template>
  
  <script>
import { mapActions, mapState } from "pinia";
import { useCheckoutStore } from "@/stores/checkout.js";

export default {
  data() {
    return {
      addressData: {
        fullName: "",
        addressLine1: "",
        neighborhood: "",
        street: "",
        doorNumber: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
        tcNumber: "",
        companyName: "",
      },
    };
  },
  computed: {
    ...mapState(useCheckoutStore, ["loading", "error"]),
  },
  methods: {
    ...mapActions(useCheckoutStore, ["createAddress"]),
    async createAddressHandler() {
      console.log("Form data gönderildi:", this.addressData);
      await this.createAddress(this.addressData);
      alert("Adres eklendi!");
    },
  },
};
</script>
  
  <style scoped>
/* Eğer özel stil eklemek isterseniz buraya ekleyebilirsiniz */
</style>
  @/stores/checkout