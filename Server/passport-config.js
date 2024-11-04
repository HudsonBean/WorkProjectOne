// Imports
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = (await getUserByEmail(email))[0];
    if (!user) {
      return done(null, false, { message: "Incorrect email adress!" });
    }

    // User found by email check if password is correct
    try {
      if ((await bcrypt.compare(password, user.password), (res) => res)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password!" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id));
  });
}

module.exports = initialize;
