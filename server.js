const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB подключение
mongoose.connect("mongodb://localhost:27017/overboost", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Модель пользователя
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

// Маршрут регистрации
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email уже зарегистрирован." });

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.json({ message: "Пользователь успешно зарегистрирован!" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${port}`);
});
