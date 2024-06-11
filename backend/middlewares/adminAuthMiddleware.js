import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // User modelinin doğru yerden import edildiğinden emin olun

// Admin yetkilendirme middleware'i
const adminAuthMiddleware = async (req, res, next) => {
    try {
        // İstek başlıklarından token'ı al
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid auth header format!' });
        }
        const token = authHeader.split(' ')[1];

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Token verification failed' });
        }

        // ID'ye göre kullanıcıyı bul ve admin olup olmadığını kontrol et
        const user = await User.findOne({ _id: decoded.userId, admin: true });
        if (!user) {
            return res.status(403).json({ message: 'Access denied: admin not found' });
        }

        // Kullanıcı nesnesini isteğe ekleyin, ileride kullanmak için
        req.user = user;

        // Bir sonraki middleware veya route'a devam et
        next();
    } catch (error) {
        console.error('Admin yetkilendirmesi başarısız oldu:', error);
        res.status(401).json({ message: 'Admin yetkilendirmesi başarısız oldu', error: error.message });
    }
};

export default adminAuthMiddleware;
