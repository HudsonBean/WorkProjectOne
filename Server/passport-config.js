// Gobal Variables
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail) {
  const authenticator = (email, password, done) => {
    const user = getUserByEmail(email); // Find user with the supplied email address
    if (!user) {
      return done(null, false, {
        message: "Incorrect email address!",
      });
    }

    // Found user with email
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: "Incorrect password!"})
        }
    } catch(e) {
        return done(e)
    }
  };

  passport.use(
    new LocalStrategy({
      usernameField: "emailAddress",
      passwordField: "password",
    })
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((user, done) => {});
}

module.exports = initialize