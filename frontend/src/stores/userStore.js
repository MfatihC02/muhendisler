import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            username: '',
            email: '',
            password: '',
        },
        loading: false,
        error: null,
        form: {
            username: '',
            email: '',
            password: '',
        },
    }),
    actions: {
        async updateUser(updatedUser, userId) {
            console.log('Kullanıcı güncelleme işlemi başladı');
            console.log('Gönderilen bilgiler:', updatedUser);
            console.log('Kullanıcı ID:', userId);

            this.loading = true;
            this.error = null;

            try {
                console.log('API isteği gönderiliyor...');
                const response = await fetch(`http://localhost:3000/api/updateUser/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API hatası:', response.statusText, errorText);
                    throw new Error('Kullanıcı güncellenemedi');
                }

                console.log('API cevabı alındı');
                const updatedData = await response.json();
                console.log('API cevabı:', updatedData);

                this.user = updatedData;
                this.loading = false;
                console.log('Kullanıcı başarıyla güncellendi!');

            } catch (error) {
                console.error('Hata:', error.message);
                this.loading = false;
                this.error = error.message;
            }
        },

        updateForm(data) {
            this.form = data;
            console.log('Form güncellendi:', data);
        },
    },
    getters: {
        getFormData(state) {
            return state.form;
        },
    },
});
