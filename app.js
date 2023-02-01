const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const db = require("./models");
const Todo = db.Todo;
const User = db.User;
const app = express();
const PORT = 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true,
  }) //! 將資料換轉換成單純的JS物件
    .then((todos) => {
      return res.render("index", { todos });
    })
    .catch((err) => res.status(402).json(err));
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.post("/users/login", (req, res) => {
  res.send("login");
});

app.get("/users/register", (req, res) => {
  return res.render("register");
});

app.post("/users/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    await User.create({ name, email, password });
    return res.redirect("/");
  } catch (error) {
    return console.log(error);
  }
});

app.get("/users/logout", (req, res) => {
  res.send("logout");
});

app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
});
