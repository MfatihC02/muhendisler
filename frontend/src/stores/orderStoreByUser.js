import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [],
        orderItems: [],
        totalPrice: 0,
    }),
    actions: {
        async fetchOrders() {
            try {
                const response = await axios.get('/api/orders/getAll');
                this.orders = response.data;
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async fetchOrderById(id) {
            try {
                const response = await axios.get(`/api/orders/get/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching order by ID:', error);
            }
        },
        async fetchOrdersByUserId(userId) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : '';

                const response = await axios.get(`http://localhost:3000/api/orders/getUserOrders/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.orders = response.data;
            } catch (error) {
                console.error('Error fetching orders by user ID:', error);
            }
        },
        async createOrder(orderData) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : '';

                const response = await axios.post('http://localhost:3000/api/orders/create', orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(this.orders)) {
                    this.orders.push(response.data);
                } else {
                    this.orders = [response.data];
                }

                this.clearCart();
            } catch (error) {
                console.error('Error creating order:', error);
                console.error('Error response:', error.response?.data);
            }
        },
        addToCart(product, qty) {
            const item = this.orderItems.find((item) => item.product._id === product._id);
            if (item) {
                item.qty += qty;
            } else {
                this.orderItems.push({ product, name: product.name, qty, price: product.price });
            }
            this.totalPrice += product.price * qty;
            this.saveCartToLocalStorage();
        },
        removeFromCart(productId) {
            const index = this.orderItems.findIndex((item) => item.product._id === productId);
            if (index !== -1) {
                this.totalPrice -= this.orderItems[index].price * this.orderItems[index].qty;
                this.orderItems.splice(index, 1);
            }
            this.saveCartToLocalStorage();
        },
        updateCartItemQty({ product, qty }) {
            const item = this.orderItems.find((item) => item.product._id === product._id);
            if (item) {
                this.totalPrice += (qty - item.qty) * item.price;
                item.qty = qty;
                this.saveCartToLocalStorage();
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem('orderItems', JSON.stringify(this.orderItems));
            localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
        },
        loadCartFromLocalStorage() {
            this.orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
            this.totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
        },
        clearCart() {
            this.orderItems = [];
            this.totalPrice = 0;
            this.saveCartToLocalStorage();
        },
    },
});
