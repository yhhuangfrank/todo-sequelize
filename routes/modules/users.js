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
      console.log("User already exists");
      return res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hash });
    return res.redirect("/");
  } catch (error) {
    return console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return next(error);
  });
  return res.redirect("/users/login");
});

module.exports = router;
