import User from '../models/user.js';

export const updateUser = async (req, res) => {

    try {
        // Kullanıcı ID'sini al
        const id = req.params.id;

        // Kullanıcıyı ID'ye göre bul
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        // Güncelleme verilerini al
        const { username, email, password } = req.body;

        // Kullanıcı bilgilerini güncelle
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        // Kullanıcıyı kaydet
        await user.save();

        res.status(200).json({ message: 'Kullanıcı bilgileri başarıyla güncellendi!' });
    } catch (error) {
        console.error('updateUser işleminde hata oluştu', error);
        return res.status(500).json({ error: 'İç sunucu hatası' });
    }
};


