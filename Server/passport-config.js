/**============================================
 *               IMPORTS
 *=============================================**/
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

/**======================
 *    Initialization strategy
 *========================**/
function initializeLocalStrategy(passport, getUserByEmail, getUserById) {
  passport.use(
    // Creates the new local strategy
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

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await getUserById(id); // Resolve the Promise
      done(null, user[0]); // Pass the resolved user object to req.user
    } catch (err) {
      done(err, null); // Pass the error to Passport
    }
  });
}

module.exports = initializeLocalStrategy;
