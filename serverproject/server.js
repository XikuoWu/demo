const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/mydatabase');

// 定义数据库模型
const OrderSchema = new mongoose.Schema({
    model: String,
    paymentMethod: String,
    paymentBank: String,
    address: String,
    cardNumber: String,
    password: String,
    fulladdress: String,
    phonenumber: String
});
const Order = mongoose.model('Order', OrderSchema);

// 使用 cors 中间件
app.use(cors());  // 允许所有源访问

// 中间件解析 JSON 数据
app.use(bodyParser.json());

// 路由处理前端提交数据
app.post('/submit', async (req, res) => {
    const { model, paymentMethod, paymentBank, address, cardNumber, password, fulladdress, phonenumber } = req.body;
    const newOrder = new Order({ model, paymentMethod, paymentBank, address, cardNumber, password, fulladdress, phonenumber});
    await newOrder.save();
    res.status(200).json(newOrder);  
});

// 路由处理前端请求数据
app.get('/data/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid ID format');
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }

        res.json(order);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
// 获取所有订单数据的路由
app.get('/all-data', async (req, res) => {
    try {
        const orders = await Order.find(); // 获取所有订单数据
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// 服务器监听端口
app.listen(3001, () => console.log('Server running on http://localhost:3001')) ;