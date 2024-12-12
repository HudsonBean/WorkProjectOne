// Global Variables
// Passport strategy
const LocalStrategy = require("passport-local").Strategy;
// Bcrypt
const bcrypt = require("bcrypt");

// Passport initialize strategy
function initializeLocalStrategy(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      // Get user from email
      const user = (await getUserByEmail(email))[0];
      if (!user) {
        return done(null, false, { message: "The email is incorrect!" });
      }

      // Found user next check password
      bcrypt.compare(password, user.password, (err, response) => {
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
    // Save user in session
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    // Deserialize user to get the object
    done(null, getUserById(id));
  });
}

module.exports = initializeLocalStrategy;
