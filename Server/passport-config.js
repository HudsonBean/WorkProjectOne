// Imports
const LocalStrategy = require("passport-local").Strategy;

async function initialize(passport) {
  const authenticateUser = (email, password, done) => {};
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}
