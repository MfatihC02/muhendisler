// routes/productRoutes.js
import express from 'express';
import { addProduct } from '../controllers/productsController.js';
import { getProducts } from '../controllers/productsController.js';
import { getProductById } from '../controllers/productsController.js';
import { updateProduct } from '../controllers/productsController.js';
import { deleteProduct } from '../controllers/productsController.js';

const router = express.Router();

router.post('/products', addProduct);
router.get('/products', getProducts);
// ID ile ürün getirme rotası
router.get('/products/:id', getProductById);
// ID ile ürün düzenleme rotası
router.put('/products/:id', updateProduct);
// ID ile ürün silme rotası
router.delete('/products/:id', deleteProduct);




export default router;
