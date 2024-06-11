import express from "express";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'; // Ürün rotalarını içe aktar
import authRoutes from './routes/authRoute.js'; // Auth rotalarını içe aktar
import adminProductsRoutes from './routes/adminProductsRoutes.js'; // Admin rotalarını içe aktar
import adminAuthRouter from './routes/adminAuthRouter.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import subCategoriesRoutes from './routes/subCategoriesRoutes.js'
import mainCategoriesRoutes from './routes/mainCategoriesRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import cors from 'cors';

const app = express();
const port = 3000;

// CORS ayarlarını güncelle
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Yeni rota için origin ekle
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // JSON istek gövdelerini işlemek için

app.get('/', (req, res) => {
  res.send('Merhaba Dünya');
});

// Auth rotalarını kullan
app.use('/api', authRoutes);

// Ürün rotalarını kullan
app.use('/api', productRoutes);
//user bilgileri güncelleme
app.use('/api', userRoutes);
//admin rotaları
app.use('/admin', adminProductsRoutes);

app.use('/admin', adminAuthRouter);
//alt kategori ekleme
app.use('/admin', subCategoriesRoutes);
//üst kategori ekleme
app.use('/admin', mainCategoriesRoutes);
//order
app.use('/api/orders', orderRoutes);
//address
app.use('/api/address', addressRoutes)

// Asenkron fonksiyon içinde veritabanı bağlantısını ve sunucuyu başlatma işlemini gerçekleştir
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB başarıyla bağlandı");

    app.listen(port, () => {
      console.log(`Sunucu ${port} üzerinden çalışıyor`);
    });
  } catch (error) {
    console.error("Sunucu başlatılamadı", error);
    process.exit(1);
  }
};

startServer();
