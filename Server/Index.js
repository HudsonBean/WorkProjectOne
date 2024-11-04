/// Global Variables
// Flash
const flash = require("express-flash");
// Bcrypt
const bcrypt = require("bcrypt");
// Passport
const passport = require("passport");
// Express Session
const session = require("express-session");
// Express router
const router = require("rout");
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
// Passport initializer
const initializePassport = require("./passport-config");
initializePassport(passport, (email) => {
  User.findOne({ email: email });
});

// Set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(flash());
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

// Routes
const usersRoute = require("./routes/users");
const users = require("./models/users");
app.use("/users", usersRoute);

// Login routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/", // Redirect to a protected route after successful login
    failureRedirect: "/login", // Redirect to login page if authentication fails
    failureFlash: true, // Optional: Enable flash messages if you have flash middleware
  })
);

// Register routes
router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    //prettier-ignore
    password: await bcrypt.hash(req.body.password, 13), // Secure hash encrypt

    // Not required
    profilePicture: req.body.firstName,
    phoneNumber: !req.body.phoneNumber
      ? undefined
      : await encrypt(req.body.phoneNumber), // Encrypt phoneNumber for extra security
    billingInfo: req.body.billingInfo, // Implement later
    websites: req.body.websites, // Implement later
    activePlan: req.body.activePlan, // Implement later
    accountCreationDate: req.body.accountCreationDate,
    preferences: req.body.preferences, // Implement later
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser).redirect("/login");
  } catch (err) {
    res
      .status(400)
      .json({
        message:
          "Oops! Error occured when trying to register the user! Error message: " +
          err.message,
      })
      .redirect("/register");
  }
});

// Logout routes
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

// Main page route
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    // Send data to let router to know to load dashboard instead
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
