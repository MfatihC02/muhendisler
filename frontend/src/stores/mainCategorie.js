import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        mainCategories: [],
        subCategories: [],
        ustKategoriIds: [],
    }),
    actions: {
        // Main Category Actions
        async fetchMainCategories() {
            try {
                const response = await axios.get('http://localhost:3000/admin/maincategories');
                this.mainCategories = response.data;
            } catch (error) {
                console.error('Ana kategorileri yüklerken bir hata oluştu:', error);
            }
        },
        async addMainCategory({ adi }) {
            console.log('addMainCategory fonksiyonu çağrıldı, adi:', adi);
            try {
                console.log('axios.post çağrısı yapılıyor...');
                const response = await axios.post('http://localhost:3000/admin/maincategories', { adi });
                console.log('axios.post başarılı, response:', response);
                if (response && response.data) {
                    this.mainCategories.push(response.data);
                    console.log('Yeni kategori mainCategories listesine eklendi:', this.mainCategories);
                } else {
                    console.log('axios.post yanıtı beklenen formatta değil:', response);
                }
            } catch (error) {
                console.error('Ana kategori eklerken bir hata oluştu:', error);
            }
        },
        async updateMainCategory(id, adi) {
            try {
                await axios.put(`http://localhost:3000/admin/maincategories/${id}`, { adi });
                const index = this.mainCategories.findIndex(category => category._id === id);
                if (index !== -1) {
                    this.mainCategories[index].adi = adi;
                }
            } catch (error) {
                console.error('Ana kategori güncellerken bir hata oluştu:', error);
            }
        },
        async deleteMainCategory(id) {
            try {
                await axios.delete(`http://localhost:3000/admin/maincategories/${id}`);
                this.mainCategories = this.mainCategories.filter(category => category._id !== id);
            } catch (error) {
                console.error('Ana kategori silerken bir hata oluştu:', error);
            }
        },

        // Sub Category Actions
        async fetchSubCategories(ustKategoriId) {
            try {
                const response = await axios.get(`http://localhost:3000/admin/subcategories`, {
                    params: { ustKategoriId }
                });
                this.subCategories = response.data;
            } catch (error) {
                console.error('Alt kategorileri yüklerken bir hata oluştu:', error);
            }
        },
        // Pinia store'unuzda, axios çağrılarınızın her birinde log ekleyin

        // Örnek olarak addSubCategory action'ını güncelliyorum
        async addSubCategory({ adi, ustKategoriAdi }) {
            console.log('addSubCategory action çağrıldı:', { adi, ustKategoriAdi });
            try {
                console.log('axios.post çağrısı yapılıyor...');
                const response = await axios.post('http://localhost:3000/admin/subcategories', { adi, ustKategoriAdi });
                console.log('axios.post başarılı, response:', response);
                this.subCategories.push(response.data);
                console.log('Yeni alt kategori subCategories listesine eklendi:', this.subCategories);
            } catch (error) {
                console.error('Alt kategori eklerken bir hata oluştu:', error);
                console.error('Hata detayı:', error.response ? error.response.data : error.message);
            }
        },
        async updateSubCategory(id, { adi, ustKategoriId }) {
            try {
                const response = await axios.put(`http://localhost:3000/admin/subcategories/${id}`, { adi, ustKategoriId });
                const index = this.subCategories.findIndex(subCategory => subCategory._id === id);
                if (index !== -1) {
                    this.subCategories[index].adi = adi;
                    this.subCategories[index].ustKategoriId = ustKategoriId;
                }
            } catch (error) {
                console.error('Alt kategori güncellerken bir hata oluştu:', error);
            }
        },
        async deleteSubCategory(id) {
            try {
                await axios.delete(`http://localhost:3000/admin/subcategories/${id}`);
                this.subCategories = this.subCategories.filter(subCategory => subCategory._id !== id);
            } catch (error) {
                console.error('Alt kategori silerken bir hata oluştu:', error);
            }
        },

    },
});
