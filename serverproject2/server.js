const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 用于存储历史数据
let historyData = [];

// 解析 JSON 和 URL 编码的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置跨域
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 接收 textarea 数据并存储
app.post('/submit', (req, res) => {
    const data = req.body.textData;
    if (data) {
        historyData.push(data);
        res.send({ message: 'Data received and stored.' });
    } else {
        res.status(400).send({ message: 'No data received.' });
    }
});

// 获取历史数据
app.get('/history', (req, res) => {
    res.json(historyData);
});

// 监听端口
app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});