import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orders: [],
        order: null,
    }),
    actions: {
        async fetchOrders() {
            try {
                const response = await axios.get('http://localhost:3000/api/orders/getAll');
                this.orders = response.data;
                console.log('Fetched orders:', this.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async fetchOrdersWithUserNames() {
            try {
                const response = await axios.get('http://localhost:3000/api/orders/with-usernames');
                this.orders = response.data;
                console.log('Fetched orders with user names:', this.orders);
            } catch (error) {
                console.error('Error fetching orders with user names:', error);
            }
        },
        async fetchOrderById(orderId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/orders/get/${orderId}`);
                this.order = response.data;
                console.log('Fetched order:', this.order);
                return this.order;
            } catch (error) {
                console.error('Error fetching order by ID:', error);
                throw error; // Hata durumunda hata fırlatmak
            }
        },
        async updateOrder(orderId, orderData) {
            try {
                await axios.put(`http://localhost:3000/api/orders/update/${orderId}`, orderData);
                await this.fetchOrders();
            } catch (error) {
                console.error('Error updating order:', error);
            }
        },
        async deleteOrder(orderId) {
            try {
                await axios.delete(`http://localhost:3000/api/orders/delete/${orderId}`);
                await this.fetchOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        },
    },
});
