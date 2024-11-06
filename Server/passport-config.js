// Global Variables
// Passport strategy
const LocalStrategy = require("passport-local").Strategy;
// Bcrypt
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      // Get user from email
      const user = (await getUserByEmail(email))[0];
      if (user.length === 0) {
        return done(null, false, { message: "The email is incorrect!" });
      }

      // Found user next check password
      bcrypt.compare(password, user.password, (err, response) => {
        console.log(password, user.password);
        if (err) return done(err);
        if (response) {
          // Is user
          return done(null, user);
        } else {
          return done(null, false, { message: "The password is incorrect!" });
        }
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, getUserById(id));
  });
}

module.exports = initialize;
