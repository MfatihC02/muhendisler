import Order from '../models/order.js';
import Product from '../models/products.js';
import User from '../models/user.js';

// Sipariş oluşturma (sepete ekleme)
export const createOrder = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        const order = new Order({
            user: req.user._id, // Kullanıcı kimliğini ekleyin
            orderItems,
            totalPrice,
        });

        const createdOrder = await order.save();

        // Update stock after creating order
        await updateStock(orderItems);

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Stok güncelleme fonksiyonu
const updateStock = async (orderItems) => {
    for (let item of orderItems) {
        await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.qty } }
        );
    }
};

// Siparişi tamamlama ve stok güncelleme
export const completeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            await updateStock(order.orderItems); // order.orderItems kullanarak stok güncelle
            order.status = 'Completed';
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Tüm siparişleri getirme (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        console.log('Fetched orders:', orders);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Tek bir siparişi getirme
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'id name');
        console.log('Fetched order:', order);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Siparişi güncelleme (Admin)
export const updateOrder = async (req, res) => {
    const { orderItems, totalPrice, isPaid, status } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderItems = orderItems || order.orderItems;
        order.totalPrice = totalPrice || order.totalPrice;
        order.isPaid = isPaid !== undefined ? isPaid : order.isPaid;
        order.status = status || order.status;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Siparişi silme (Admin)
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne(); // veya order.deleteMany(); 
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Kullanıcı ID'si ile siparişleri getirme
export const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID not provided' });
    }

    try {
        const orders = await Order.find({ user: userId });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders by user ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Tüm siparişleri kullanıcı adı ile getirme
export const getAllOrdersWithUserNames = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username');
        res.status(200).json(orders);
    } catch (error) {
        console.error('getAllOrdersWithUserNames işleminde hata oluştu', error);
        res.status(500).json({ error: 'İç sunucu hatası' });
    }
};
