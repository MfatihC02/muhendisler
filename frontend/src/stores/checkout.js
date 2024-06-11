import { defineStore } from 'pinia';
import axios from 'axios';

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        addresses: [],
        address: null,
        error: null,
        loading: false,
        user: JSON.parse(localStorage.getItem('user')) || null, // Kullanıcı bilgisini localStorage'dan al
        orders: [],
        orderItems: JSON.parse(localStorage.getItem('orderItems')) || [],
        totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
    }),
    actions: {
        // Address actions
        async createAddress(addressData) {
            this.loading = true;
            this.error = null;
            try {
                const token = this.user?.token; // Kullanıcı nesnesinden token alınıyor
                if (!token) {
                    throw new Error('Token not found');
                }
                console.log("Create Address Token:", token);
                console.log("Address Data:", addressData); // Bu satırı ekleyin
                const response = await axios.post('http://localhost:3000/api/address/create', addressData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.addresses.push(response.data);
            } catch (error) {
                console.error("Create Address Error:", error); // Bu satırı ekleyin
                this.error = error.response?.data?.message || error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchAddresses() {
            this.loading = true;
            this.error = null;
            try {
                const token = this.user?.token; // Kullanıcı nesnesinden token alınıyor
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get('http://localhost:3000/admin/addresses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.addresses = response.data;
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
            } finally {
                this.loading = false;
            }
        },
        async deleteAddress(addressId) {
            this.loading = true;
            this.error = null;
            try {
                const token = this.user?.token; // Kullanıcı nesnesinden token alınıyor
                if (!token) {
                    throw new Error('Token not found');
                }
                await axios.delete(`http://localhost:3000/admin/addresses/${addressId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.addresses = this.addresses.filter(address => address._id !== addressId);
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
            } finally {
                this.loading = false;
            }
        },
        async matchAddressWithOrder(addressId, orderId) {
            this.loading = true;
            this.error = null;
            try {
                const token = this.user?.token; // Kullanıcı nesnesinden token alınıyor
                if (!token) {
                    throw new Error('Token not found');
                }
                await axios.post('http://localhost:3000/addresses/match', { addressId, orderId }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
            } finally {
                this.loading = false;
            }
        },
        // Order actions
        async fetchOrders() {
            try {
                const token = this.user?.token;
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get('http://localhost:3000/api/orders/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.orders = response.data;
            } catch (error) {
                console.error('Error fetching orders:', error);
                this.error = error.response?.data?.message || error.message;
            }
        },
        async fetchOrderById(id) {
            try {
                const token = this.user?.token;
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get(`http://localhost:3000/api/orders/get/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching order by ID:', error);
                this.error = error.response?.data?.message || error.message;
            }
        },
        async fetchOrdersByUserId(userId) {
            try {
                const token = this.user?.token;
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get(`http://localhost:3000/api/orders/getUserOrders/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.orders = response.data;
            } catch (error) {
                console.error('Error fetching orders by user ID:', error);
                this.error = error.response?.data?.message || error.message;
            }
        },
        async createOrder(orderData) {
            try {
                const token = this.user?.token;
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.post('http://localhost:3000/api/orders/create', orderData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
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
                this.error = error.response?.data?.message || error.message;
            }
        },
        // Cart actions
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
