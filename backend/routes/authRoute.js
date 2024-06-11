// routes/authRoute.js
import express from 'express';
import { register,login } from '../controllers/authController.js';

const router = express.Router();

// Kayıt rotası
router.post('/register', register);
router.post('/login', login);

export default router;
