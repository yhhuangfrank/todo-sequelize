const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.User;

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  return res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      const warning_msg = "此使用者已經存在";
      return res.render("register", {
        name,
        email,
        password,
        confirmPassword,
        warning_msg,
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hash });
    req.flash("success_msg", "註冊成功! 可登入系統了!");
    return res.redirect("/users/login");
  } catch (error) {
    return console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return next(error);
  });
  req.flash("success_msg", "已成功登出!");
  return res.redirect("/users/login");
});

module.exports = router;
