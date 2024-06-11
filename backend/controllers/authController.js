// controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    // İstekten gelen verileri al
    const { email, username, password } = req.body;

    // E-posta veya kullanıcı adı zaten kullanımda mı diye kontrol et
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'E-posta veya kullanıcı adı zaten kullanımda.' });
    }

    // Yeni kullanıcıyı oluştur
    const user = new User({
      email,
      username,
      password // Parola burada şifrelenmeden giriliyor, modelde şifrelenecek
    });

    // Kullanıcıyı veritabanına kaydet
    await user.save();

    // Başarılı yanıt gönder
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    // Hata detaylarını yanıt olarak gönder
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu.', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    // İstekten gelen verileri al
    const { email, password } = req.body;

    // E-posta ile kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'E-posta ile bir kullanıcı bulunamadı.' });
    }

    // Kullanıcının şifresini kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz şifre.' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, isAdmin: user.admin }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    }); // Token expiration time



    // Log the generated token and user info to console
    console.log('Generated JWT token:', token);
    console.log('User info:', user);

    // Successful response with the token
    res.status(200).json({
      message: 'User login successful.',
      token,
      user
    });
  } catch (error) {
    // Hata detaylarını yanıt olarak gönder
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.', error: error.message });
  }
};
export { register, login };
