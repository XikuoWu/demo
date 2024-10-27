const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let users = {};

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow additional methods
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization"); // Allow custom headers
  next();
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.json({ message: "用户已存在" });
  }
  users[username] = password;
  res.json({ message: "注册成功" });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!users[username]) {
    return res.json({ success: false, message: "没有找到用户" });
  }
  if (users[username] === password) {
    return res.json({ success: true, message: "登录成功" });
  } else {
    return res.json({ success: false, message: "密码错误" });
  }
});

app.listen(3007, () => {
  console.log("Server running at http://localhost:3007");
});
