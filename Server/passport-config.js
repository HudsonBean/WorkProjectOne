// Global Variables
// Passport strategy
const LocalStrategy = require("passport-local").Strategy;
// User model

function initialize(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      // Get user from email
      const user = getUserByEmail(email);
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect email!" });
      }

      return done(null, user);
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}

module.exports = initialize;
