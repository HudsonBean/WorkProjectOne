/// Global Variables
// Bcrypt
const bcrypt = require("bcrypt");
// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Express Session
const session = require("express-session");
// Dotenv
require("dotenv").config();
// Express Server
const express = require("express");
const app = express();
// MongoDB Database
const mongoose = require("mongoose"); //brew services start mongodb/brew/mongodb-community
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () =>
  console.log(`Database is open on ${process.env.DATABASE_URL}`)
);
// Models
const User = require("./models/users");

// Start the Server
// Passport session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS in production
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Configure local strategy
passport.use(
  new LocalStrategy(
    {
      emailField: "emailAdress",
      passwordField: "password",
    },
    async (emailAdress, password, done) => {
      try {
        const user = await User.findOne({ emailAdress }); // Adjust based on your model
        if (!user) {
          return done(null, false, { message: "Incorrect email adress." });
        }
        const isMatch = await bcrypt.compare(
          password,
          user.password,
          (err, response) => {
            if (!response) {
              return done(null, false, { message: "Incorrect password." });
            }
          }
        );
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Serialization functions
passport.serializeUser((user, done) => {
  done(null, user._id); // Store user ID in the session
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // user._id
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
// Set decoding
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

// Main route
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    // User is already signed in
    res.redirect("/dashboard");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
