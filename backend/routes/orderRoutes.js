import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    completeOrder,
    getAllOrdersWithUserNames
} from '../controllers/orderController.js';
import orderAuthMiddleware from '../middlewares/orderAuthMiddleware.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';
import jwtAuthMiddleware from '../middlewares/jwtAuthMiddleware.js';

const router = express.Router();

// Sipariş oluşturma (sepete ekleme)
router.post('/create', jwtAuthMiddleware, orderAuthMiddleware, createOrder);

// Tüm siparişleri getirme (Admin)
router.get('/getAll', jwtAuthMiddleware, adminAuthMiddleware, getAllOrders);

// Tek bir siparişi getirme
router.get('/get/:id', jwtAuthMiddleware, orderAuthMiddleware, getOrderById);

// Kullanıcı ID'si ile siparişleri getirme
router.get('/getUserOrders/:userId', jwtAuthMiddleware, orderAuthMiddleware, getOrdersByUserId);

// Siparişi güncelleme (Admin)
router.put('/update/:id', jwtAuthMiddleware, adminAuthMiddleware, updateOrder);

// Siparişi silme (Admin)
router.delete('/delete/:id', jwtAuthMiddleware, adminAuthMiddleware, deleteOrder);

// Siparişi tamamlama (Kullanıcı)
router.post('/complete-order/:orderId', jwtAuthMiddleware, orderAuthMiddleware, completeOrder);

//Tüm siparişleri kullanıcı adları ile birlikte getirme
router.get('/with-usernames', adminAuthMiddleware, getAllOrdersWithUserNames);

export default router;
