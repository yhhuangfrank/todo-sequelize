const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered!",
            });
          }
          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, {
                message: "Email or Password incorrect.",
              });
            }
            return done(null, user);
          });
        })
        .catch((err) => done(err, false));
    })
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRECT,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["displayName", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json;
          const foundUser = await User.findOne({ where: { email } });
          if (foundUser) return done(null, foundUser);
          const randomPassword = Math.random().toString(36).slice(-8);
          const hash = bcrypt.hashSync(randomPassword, 10);
          const newUser = await User.create({ name, email, password: hash });
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        user = user.toJSON(); //! 將user轉為plain object繼續使用
        done(null, user);
      })
      .catch((err) => done(err, null));
  });
};
