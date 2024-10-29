const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/userDB");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the Login and signup server!");
});

app.use("/favicon.ico", express.static("favicon.ico"));

app.get("/favicon.ico", (req, res) => res.status(204).end());

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
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "用户已存在" });
    }
    // Save the new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "注册成功" });
  } catch (error) {
    res.status(500).json({ message: "注册失败", error });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "没有找到用户" });
    }
    // Check password
    if (user.password === password) {
      res.json({ success: true, message: "登录成功" });
    } else {
      res.json({ success: false, message: "密码错误" });
    }
  } catch (error) {
    res.status(500).json({ message: "登录失败", error });
  }
});

app.listen(3007, () => {
  console.log("Server running at http://localhost:3007");
});
