const router = require("express").Router();
const passport = require("passport");

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/users/login",
    successRedirect: "/",
  })
);

module.exports = router;
