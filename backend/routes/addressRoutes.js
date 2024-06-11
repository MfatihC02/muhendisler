import express from 'express';
import { createAddress, getAllAddresses, deleteAddress, matchAddressWithOrder } from '../controllers/addressController.js';
import authMiddleware from '../middlewares/jwtAuthMiddleware.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';
import { validateAddress } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, validateAddress, createAddress);
router.get('/getAll', authMiddleware, adminAuthMiddleware, getAllAddresses);
router.delete('/delete/:id', authMiddleware, adminAuthMiddleware, deleteAddress);
router.post('/match', authMiddleware, matchAddressWithOrder);

export default router;
